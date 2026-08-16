import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, Sparkles, Layers, MessageSquare, RefreshCw, UploadCloud,
  FileImage, X, Settings, LogOut, User, Moon, Sun, PanelRight,
  Share2, Download, Trash2, Pencil, Bot, Cpu
} from 'lucide-react';
import EduSidebar from '../components/layout/EduSidebar';
import EduContextPanel from '../components/layout/EduContextPanel';
import ChatWindow from '../components/chat/ChatWindow';
import ChatInput from '../components/chat/ChatInput';
import WelcomeScreen from '../components/chat/WelcomeScreen';
import { useChat } from '../hooks/useChat';
import { useAnalysis } from '../hooks/useAnalysis';
import { useEduAssistant } from '../hooks/useEduAssistant';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

export default function EduWorkspace() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mode, setMode] = useState('chat');
  const [activeModal, setActiveModal] = useState(null);
  const [chatTitle, setChatTitle] = useState('New conversation');
  const [editingTitle, setEditingTitle] = useState(false);

  // Image Analyzer state
  const [baselineFile, setBaselineFile] = useState(null);
  const [modifiedFile, setModifiedFile] = useState(null);
  const [baselinePreview, setBaselinePreview] = useState(null);
  const [modifiedPreview, setModifiedPreview] = useState(null);
  const [analysisTitle, setAnalysisTitle] = useState('');

  const baselineInputRef = useRef(null);
  const modifiedInputRef = useRef(null);
  const titleInputRef = useRef(null);

  const toast = useToast();
  const { user, logout } = useAuth();
  const { theme, themeMode, cycleTheme } = useTheme();

  const {
    activeModule, selectedSubject, rightPanelOpen, activeTabRight,
    codeAnalysis, pdfData, projectViva, notes,
    setRightPanelOpen, setActiveTabRight, selectModule, setSelectedSubject,
    addNote, removeNote,
  } = useEduAssistant();

  const {
    conversations, activeConversation, messages, isLoading, isSending,
    isThinking, isStreaming, streamingMessageId, stopGeneration,
    loadConversations, selectConversation, sendMessage, deleteConversation,
    newChat, setMessages,
  } = useChat();

  const { analyzing, history, runAnalysis, fetchHistory, removeRecord } = useAnalysis();

  useEffect(() => {
    loadConversations();
    fetchHistory();
  }, [loadConversations, fetchHistory]);

  // Responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
        setRightPanelOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setRightPanelOpen]);

  // Mobile: close sidebar on overlay click
  const handleMobileOverlayClick = () => {
    if (window.innerWidth < 640) setSidebarOpen(false);
  };

  const handleLoadDemo = () => {
    const c1 = document.createElement('canvas'); c1.width = c1.height = 500;
    const ctx1 = c1.getContext('2d');
    ctx1.fillStyle = '#070B1A'; ctx1.fillRect(0,0,500,500);
    ctx1.fillStyle = '#3B82F6'; ctx1.fillRect(100,100,200,200);
    ctx1.fillStyle = '#8B5CF6'; ctx1.beginPath(); ctx1.arc(380,200,50,0,Math.PI*2); ctx1.fill();

    const c2 = document.createElement('canvas'); c2.width = c2.height = 500;
    const ctx2 = c2.getContext('2d');
    ctx2.fillStyle = '#070B1A'; ctx2.fillRect(0,0,500,500);
    ctx2.fillStyle = '#3B82F6'; ctx2.fillRect(100,100,200,200);
    ctx2.fillStyle = '#8B5CF6'; ctx2.beginPath(); ctx2.arc(380,200,50,0,Math.PI*2); ctx2.fill();
    ctx2.fillStyle = '#EF4444'; ctx2.beginPath(); ctx2.arc(150,380,45,0,Math.PI*2); ctx2.fill();

    c1.toBlob(b1 => c2.toBlob(b2 => {
      const f1 = new File([b1], 'circuit_baseline.png', { type: 'image/png' });
      const f2 = new File([b2], 'circuit_modified.png', { type: 'image/png' });
      setBaselineFile(f1); setModifiedFile(f2);
      setBaselinePreview(URL.createObjectURL(f1));
      setModifiedPreview(URL.createObjectURL(f2));
      setAnalysisTitle('Circuit Evolution Audit');
      toast.info('Sample test pair loaded!');
    }));
  };

  const handleFileSelect = (file, type) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    if (type === 'baseline') { setBaselineFile(file); setBaselinePreview(url); }
    else { setModifiedFile(file); setModifiedPreview(url); }
  };

  const handleExecuteCVAnalysis = async () => {
    if (!baselineFile || !modifiedFile) { toast.error('Please upload both images.'); return; }
    try {
      toast.info('Running OpenCV Computer Vision pipeline...');
      const result = await runAnalysis(baselineFile, modifiedFile, analysisTitle || 'Image Analysis');
      const userMsg = {
        sender: 'user', timestamp: new Date().toISOString(),
        text: `Compared images: "${result.title}" (${baselineFile.name} vs ${modifiedFile.name})`,
      };
      const aiMsg = {
        sender: 'ai', timestamp: new Date().toISOString(),
        text: `Analysis complete! SSIM: ${result.metrics.ssim_score}%, Δ: ${result.metrics.change_ratio_pct}%.`,
        analysisResult: result,
      };
      setMessages(p => [...p, userMsg, aiMsg]);
      toast.success('Analysis rendered in workspace!');
      setBaselineFile(null); setModifiedFile(null); setBaselinePreview(null); setModifiedPreview(null); setAnalysisTitle('');
    } catch (err) { toast.error(err.message || 'Analysis failed.'); }
  };

  const handleSendChatMessage = async (content, file) => {
    if (!content?.trim() && !file) return;
    await sendMessage(content);
  };

  const isNewChat = messages.length === 0;

  return (
    <div className="workspace-layout font-sans">

      {/* Mobile overlay (close sidebar when clicking outside on mobile) */}
      {sidebarOpen && window.innerWidth < 640 && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.6)] backdrop-blur-sm z-40 md:hidden"
          onClick={handleMobileOverlayClick}
          aria-hidden="true"
        />
      )}

      {/* ═══ LEFT SIDEBAR ════════════════════════════════════════ */}
      <EduSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        activeModule={activeModule}
        onSelectModule={selectModule}
        selectedSubject={selectedSubject}
        conversations={conversations}
        activeConversation={activeConversation}
        onNewChat={() => { newChat(); setChatTitle('New conversation'); }}
        onSelectConversation={selectConversation}
        onDeleteConversation={deleteConversation}
        onOpenSettings={() => setActiveModal('settings')}
        onOpenProfile={() => setActiveModal('profile')}
      />

      {/* ═══ CENTER CHAT PANEL ═══════════════════════════════════ */}
      <div className="workspace-center">

        {/* Header */}
        <header className="h-16 flex items-center justify-between px-4 border-b border-[var(--border-subtle)] glass shrink-0 z-20">
          <div className="flex items-center gap-3 min-w-0">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-all shrink-0"
                aria-label="Open sidebar"
              >
                <Menu size={20} />
              </button>
            )}

            {/* Chat title — editable on click */}
            {editingTitle ? (
              <input
                ref={titleInputRef}
                value={chatTitle}
                onChange={e => setChatTitle(e.target.value)}
                onBlur={() => setEditingTitle(false)}
                onKeyDown={e => e.key === 'Enter' && setEditingTitle(false)}
                className="bg-transparent border-b border-[var(--brand-primary)] text-sm font-semibold text-[var(--text-primary)] focus:outline-none px-1 max-w-[200px]"
                autoFocus
              />
            ) : (
              <button
                onClick={() => setEditingTitle(true)}
                className="text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--brand-primary)] transition-colors truncate max-w-[200px]"
                title="Click to rename"
              >
                {isNewChat ? 'New conversation' : chatTitle}
              </button>
            )}

            {/* Model badge */}
            <span className="badge badge-blue shrink-0">
              <Bot size={10} /> Ollama · llama3.2
            </span>

            {/* Mode switcher */}
            <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
              <ModeBtn active={mode === 'chat'} onClick={() => setMode('chat')} icon={<MessageSquare size={13} />} label="Chat" />
              <ModeBtn active={mode === 'analyzer'} onClick={() => setMode('analyzer')} icon={<Layers size={13} />} label="Vision" />
            </div>
          </div>

          {/* Right header actions */}
          <div className="flex items-center gap-1.5">
            {mode === 'analyzer' && (
              <button onClick={handleLoadDemo} className="btn-secondary py-1.5 px-3 text-xs gap-1.5">
                <RefreshCw size={12} /> <span className="hidden sm:inline">Sample Pair</span>
              </button>
            )}
            <button className="p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-all" aria-label="Share" title="Share conversation">
              <Share2 size={17} />
            </button>
            <button
              onClick={() => { newChat(); setChatTitle('New conversation'); }}
              className="p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--brand-red)] hover:bg-[rgba(239,68,68,0.08)] transition-all"
              aria-label="Clear chat"
              title="Clear chat"
            >
              <Trash2 size={17} />
            </button>
            <button
              onClick={() => setRightPanelOpen(!rightPanelOpen)}
              className={`p-2 rounded-xl transition-all ${
                rightPanelOpen
                  ? 'bg-[rgba(59,130,246,0.12)] text-[var(--brand-primary)] border border-[rgba(59,130,246,0.2)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
              }`}
              aria-label="Toggle context panel"
              title="Toggle context panel"
            >
              <PanelRight size={17} />
            </button>
          </div>
        </header>

        {/* Messages area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto" id="messages-area">

            {/* Analyzer upload card */}
            {mode === 'analyzer' && (
              <div className="max-w-4xl mx-auto p-4 md:p-6 mt-4">
                <div className="glass-card p-6 space-y-4 border border-[rgba(59,130,246,0.15)]">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-bold text-[var(--brand-primary)] flex items-center gap-2">
                      <Sparkles size={16} /> Computer Vision Workbench
                    </div>
                    <span className="badge badge-cyan text-[10px]">OpenCV + SSIM</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Baseline */}
                    <ImageDropZone
                      label="Baseline Image (t0)"
                      badge="Reference"
                      badgeClass="badge-cyan"
                      preview={baselinePreview}
                      inputRef={baselineInputRef}
                      onFileSelect={f => handleFileSelect(f, 'baseline')}
                      accentColor="var(--brand-cyan)"
                    />
                    {/* Modified */}
                    <ImageDropZone
                      label="Modified Image (t1)"
                      badge="Evolution"
                      badgeClass="badge-purple"
                      preview={modifiedPreview}
                      inputRef={modifiedInputRef}
                      onFileSelect={f => handleFileSelect(f, 'modified')}
                      accentColor="var(--brand-purple)"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-1">
                    <input
                      type="text"
                      placeholder="Analysis title (e.g. PCB Rev 2, UI Audit)..."
                      value={analysisTitle}
                      onChange={e => setAnalysisTitle(e.target.value)}
                      className="input-field flex-1 py-2.5 text-sm"
                    />
                    <button
                      onClick={handleExecuteCVAnalysis}
                      disabled={analyzing || !baselineFile || !modifiedFile}
                      className="btn-primary py-2.5 px-6 text-sm disabled:opacity-50 shrink-0"
                    >
                      {analyzing
                        ? <><RefreshCw size={14} className="animate-spin" /> Analyzing...</>
                        : <><Sparkles size={14} /> Execute Comparison</>
                      }
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Welcome or chat messages */}
            {isNewChat ? (
              <div className="flex-1 flex items-center justify-center min-h-[400px]">
                <WelcomeScreen mode={mode} onSuggestionClick={text => handleSendChatMessage(text)} />
              </div>
            ) : (
              <ChatWindow
                messages={messages}
                isSending={isSending}
                isThinking={isThinking}
                isStreaming={isStreaming}
                streamingMessageId={streamingMessageId}
                onSuggestionClick={text => handleSendChatMessage(text)}
              />
            )}
          </div>

          {/* Input bar */}
          <div className="w-full flex justify-center px-3 md:px-4 pb-4 pt-2 border-t border-[var(--border-subtle)] shrink-0">
            <div className="w-full max-w-3xl">
              <ChatInput
                onSend={handleSendChatMessage}
                disabled={isSending}
                isStreaming={isStreaming || isThinking}
                onStop={stopGeneration}
                showActions={false}
                onActionClick={text => handleSendChatMessage(text)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ═══ RIGHT CONTEXT PANEL ═════════════════════════════════ */}
      <EduContextPanel
        isOpen={rightPanelOpen}
        onClose={() => setRightPanelOpen(false)}
        activeTab={activeTabRight}
        setActiveTab={setActiveTabRight}
        activeModule={activeModule}
        selectedSubject={selectedSubject}
        codeAnalysis={codeAnalysis}
        pdfData={pdfData}
        projectViva={projectViva}
        notes={notes}
        onAddNote={addNote}
        onRemoveNote={removeNote}
      />

      {/* ═══ MODALS ══════════════════════════════════════════════ */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(0,0,0,0.7)] backdrop-blur-md"
            onClick={() => setActiveModal(null)}
            aria-modal="true"
            role="dialog"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
              className="glass-card p-8 max-w-md w-full space-y-5 border border-[var(--border-strong)] relative"
            >
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-all"
                aria-label="Close modal"
              >
                <X size={17} />
              </button>

              {activeModal === 'settings' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-[var(--border-subtle)]">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-purple)] flex items-center justify-center">
                      <Settings size={18} className="text-white" />
                    </div>
                    <div>
                      <h2 className="font-bold text-[var(--text-primary)]">Settings</h2>
                      <p className="text-xs text-[var(--text-muted)]">Appearance and model preferences</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold">Theme</div>
                      <div className="text-xs text-[var(--text-muted)] mt-0.5">Dark, Light, or System</div>
                    </div>
                    <button
                      onClick={cycleTheme}
                      className="btn-secondary py-1.5 px-4 text-xs gap-2"
                    >
                      {themeMode === 'dark' ? <Moon size={13} /> : themeMode === 'light' ? <Sun size={13} /> : <Sparkles size={13} />}
                      <span className="capitalize">{themeMode}</span>
                    </button>
                  </div>
                  <div className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold">AI Model</div>
                      <div className="text-xs text-[var(--text-muted)] mt-0.5">Currently connected to Ollama</div>
                    </div>
                    <span className="badge badge-blue">llama3.2</span>
                  </div>
                  <button onClick={() => setActiveModal(null)} className="btn-primary w-full justify-center py-2.5 text-sm">
                    Save & Close
                  </button>
                </div>
              )}

              {activeModal === 'profile' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-[var(--border-subtle)]">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-purple)] flex items-center justify-center text-xl font-bold text-white">
                      {user?.username?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <h2 className="font-bold text-[var(--text-primary)]">{user?.username || 'B.Tech Student'}</h2>
                      <p className="text-xs text-[var(--text-muted)]">{user?.email || 'student@nexusai.dev'}</p>
                    </div>
                  </div>
                  {[
                    ['Branch', 'Computer Science & Engineering'],
                    ['Plan', 'NexusAI Pro — Full Access'],
                    ['Sessions', 'Active workspace session'],
                  ].map(([label, value]) => (
                    <div key={label} className="p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-between">
                      <span className="text-xs text-[var(--text-muted)]">{label}</span>
                      <span className="text-xs font-semibold text-[var(--text-primary)]">{value}</span>
                    </div>
                  ))}
                  <div className="flex gap-3 pt-1">
                    <button
                      onClick={logout}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[rgba(239,68,68,0.3)] text-[var(--brand-red)] text-sm font-semibold hover:bg-[rgba(239,68,68,0.08)] transition-all"
                    >
                      <LogOut size={15} /> Sign Out
                    </button>
                    <button onClick={() => setActiveModal(null)} className="flex-1 btn-primary justify-center py-2.5 text-sm">Done</button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Helper components ── */
function ModeBtn({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
        active
          ? 'bg-[rgba(59,130,246,0.15)] text-[var(--brand-primary)] border border-[rgba(59,130,246,0.2)]'
          : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
      }`}
    >
      {icon}<span>{label}</span>
    </button>
  );
}

function ImageDropZone({ label, badge, badgeClass, preview, inputRef, onFileSelect, accentColor }) {
  return (
    <div className="p-4 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[var(--border-subtle)] space-y-2">
      <div className="flex items-center justify-between text-xs font-semibold" style={{ color: accentColor }}>
        <span className="flex items-center gap-1.5"><FileImage size={13} /> {label}</span>
        <span className={`badge ${badgeClass}`}>{badge}</span>
      </div>
      {preview ? (
        <div className="relative h-40 rounded-lg overflow-hidden border border-[var(--border-subtle)] bg-[rgba(0,0,0,0.3)] group">
          <img src={preview} alt={label} className="w-full h-full object-contain" />
          <button
            onClick={() => inputRef.current?.click()}
            className="absolute inset-0 bg-[rgba(0,0,0,0.6)] opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs font-semibold text-white transition-opacity"
          >
            Change Image
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          className="dropzone h-40 flex flex-col items-center justify-center gap-2 cursor-pointer"
        >
          <UploadCloud size={28} style={{ color: accentColor }} />
          <p className="text-xs font-semibold text-[var(--text-primary)]">Upload Image</p>
          <p className="text-[10px] text-[var(--text-muted)]">PNG, JPG, WEBP</p>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={"image/*"}
        className="hidden"
        onChange={e => onFileSelect(e.target.files?.[0])}
      />
    </div>
  );
}
