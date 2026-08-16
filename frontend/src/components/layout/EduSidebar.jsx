import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu, PenLine, Search, ChevronDown, MoreHorizontal,
  Pin, Trash2, Pencil, Settings, LogOut, User,
  Code2, FileText, Mic, BookOpen, FolderOpen, Image,
  MessageSquare, Layers, ChevronLeft, ChevronRight,
  Clock, Star, Hash, GraduationCap
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Tooltip from '../ui/Tooltip';

const SUBJECTS = [
  { emoji: '🐍', label: 'Python', prompt: 'You are a Python tutor. Help me master Python programming.' },
  { emoji: '☕', label: 'Java', prompt: 'You are a Java expert. Help me understand Java and OOP concepts.' },
  { emoji: '⚡', label: 'C / C++', prompt: 'You are a C/C++ expert. Help me with systems programming.' },
  { emoji: '🌲', label: 'DSA', prompt: 'You are a DSA mentor. Teach me data structures and algorithms.' },
  { emoji: '🧮', label: 'Algorithms', prompt: 'You are an algorithms expert. Help me with time complexity and algorithmic thinking.' },
  { emoji: '🗄️', label: 'DBMS & SQL', prompt: 'You are a database expert. Help me with DBMS, SQL, and normalization.' },
  { emoji: '💻', label: 'OS', prompt: 'You are an OS expert. Help me understand operating system concepts.' },
  { emoji: '🌐', label: 'Networks', prompt: 'You are a networking expert. Help me with computer networks and protocols.' },
  { emoji: '🤖', label: 'AI / ML', prompt: 'You are an AI/ML expert. Help me learn machine learning and deep learning.' },
  { emoji: '🚀', label: 'Web Dev', prompt: 'You are a web development expert. Help me build modern web applications.' },
  { emoji: '🔐', label: 'Cyber Security', prompt: 'You are a cybersecurity expert. Help me understand network security concepts.' },
];

const TOOLS = [
  { icon: FileText, label: 'PDF Assistant', module: 'pdf', color: 'text-purple-400' },
  { icon: Image, label: 'Image Analysis', module: 'analyzer', color: 'text-pink-400' },
  { icon: Pencil, label: 'Resume Builder', module: 'resume', color: 'text-cyan-400' },
  { icon: Mic, label: 'Mock Interview', module: 'interview', color: 'text-amber-400' },
  { icon: FolderOpen, label: 'Project Guide', module: 'project', color: 'text-indigo-400' },
];

export default function EduSidebar({
  isOpen, onToggle,
  conversations = [], activeConversation,
  onNewChat, onSelectConversation, onDeleteConversation,
  activeModule, onSelectModule, selectedSubject,
  onOpenSettings, onOpenProfile,
}) {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectsOpen, setSubjectsOpen] = useState(true);
  const [toolsOpen, setToolsOpen] = useState(true);
  const [contextMenu, setContextMenu] = useState(null); // { id, x, y }

  const filteredConversations = conversations.filter(c =>
    !searchQuery || c.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinnedConversations = filteredConversations.filter(c => c.pinned);
  const recentConversations = filteredConversations.filter(c => !c.pinned);

  // Close context menu on outside click
  useEffect(() => {
    const close = () => setContextMenu(null);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  const handleSubjectClick = (subject) => {
    onSelectModule?.('subject');
    onNewChat?.();
  };

  // Icon-only rail label helper
  const navLabel = (label) => isOpen ? null : (
    <Tooltip label={label} position="right"><span className="sr-only">{label}</span></Tooltip>
  );

  return (
    <motion.aside
      animate={{ width: isOpen ? 260 : 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="workspace-sidebar relative flex flex-col"
      aria-label="Navigation sidebar"
      role="navigation"
    >
      {/* ── Logo Zone ── */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-[var(--border-subtle)] shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-purple)] flex items-center justify-center shrink-0 shadow-[var(--shadow-glow-blue)]">
            <Cpu size={16} className="text-white" />
          </div>
          {isOpen && (
            <span className="font-bold text-base tracking-tight whitespace-nowrap overflow-hidden">
              Nexus<span className="gradient-text">AI</span>
            </span>
          )}
        </div>
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-all shrink-0"
          aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* ── New Chat Button ── */}
        <div className={`${isOpen ? 'px-3' : 'px-2'} pt-3 pb-2 shrink-0`}>
          <button
            onClick={onNewChat}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group"
            style={{
              background: 'rgba(59,130,246,0.08)',
              border: '1px solid rgba(59,130,246,0.2)',
              color: 'var(--brand-primary)',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,130,246,0.14)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(59,130,246,0.08)'}
            aria-label="New Chat"
          >
            <PenLine size={16} className="shrink-0" />
            {isOpen && <span>New Chat</span>}
          </button>
        </div>

        {/* ── Search Bar ── */}
        {isOpen && (
          <div className="px-3 pb-2 shrink-0">
            <div className="flex items-center gap-2 px-3 h-9 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[var(--border-subtle)]">
              <Search size={13} className="text-[var(--text-muted)] shrink-0" />
              <input
                type="search"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none"
                aria-label="Search conversations"
              />
            </div>
          </div>
        )}

        {/* ── Scrollable content ── */}
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-1 px-2 pb-2">

          {/* Pinned chats */}
          {pinnedConversations.length > 0 && (
            <div>
              {isOpen && (
                <div className="px-2 pt-2 pb-1">
                  <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-semibold flex items-center gap-1.5">
                    <Pin size={10} /> Pinned
                  </span>
                </div>
              )}
              {pinnedConversations.map(c => (
                <ChatItem
                  key={c.id}
                  conversation={c}
                  isActive={activeConversation === c.id}
                  isOpen={isOpen}
                  onSelect={() => onSelectConversation(c.id)}
                  onDelete={() => onDeleteConversation(c.id)}
                  contextMenu={contextMenu}
                  setContextMenu={setContextMenu}
                />
              ))}
            </div>
          )}

          {/* Recent chats */}
          {recentConversations.length > 0 && (
            <div>
              {isOpen && (
                <div className="px-2 pt-2 pb-1">
                  <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-semibold flex items-center gap-1.5">
                    <Clock size={10} /> Recent
                  </span>
                </div>
              )}
              {recentConversations.map(c => (
                <ChatItem
                  key={c.id}
                  conversation={c}
                  isActive={activeConversation === c.id}
                  isOpen={isOpen}
                  onSelect={() => onSelectConversation(c.id)}
                  onDelete={() => onDeleteConversation(c.id)}
                  contextMenu={contextMenu}
                  setContextMenu={setContextMenu}
                />
              ))}
            </div>
          )}

          {/* No conversations state */}
          {filteredConversations.length === 0 && isOpen && (
            <div className="text-center py-6 space-y-1">
              <MessageSquare size={20} className="mx-auto text-[var(--text-muted)]" />
              <p className="text-xs text-[var(--text-muted)]">No conversations yet</p>
              <button onClick={onNewChat} className="text-xs text-[var(--brand-primary)] hover:underline">Start a new chat</button>
            </div>
          )}

          {/* ── Subjects ── */}
          <div className="pt-2">
            {isOpen ? (
              <button
                onClick={() => setSubjectsOpen(!subjectsOpen)}
                className="w-full flex items-center justify-between px-2 py-1.5 text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-semibold hover:text-[var(--text-primary)] transition-colors rounded-lg hover:bg-[var(--bg-hover)]"
              >
                <span className="flex items-center gap-1.5"><Hash size={10} /> Subjects</span>
                <ChevronDown size={12} className={`transition-transform ${subjectsOpen ? 'rotate-180' : ''}`} />
              </button>
            ) : (
              <div className="px-2 py-1">
                <div className="w-full h-px bg-[var(--border-subtle)]" />
              </div>
            )}

            <AnimatePresence>
              {(subjectsOpen || !isOpen) && (
                <motion.div
                  initial={isOpen ? { height: 0, opacity: 0 } : false}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  {SUBJECTS.map(s => (
                    <button
                      key={s.label}
                      onClick={() => handleSubjectClick(s)}
                      title={!isOpen ? s.label : undefined}
                      className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-medium transition-all ${
                        selectedSubject?.label === s.label
                          ? 'bg-[rgba(59,130,246,0.1)] text-[var(--brand-primary)] border border-[rgba(59,130,246,0.2)]'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
                      }`}
                      aria-label={s.label}
                    >
                      <span className="shrink-0 text-base">{s.emoji}</span>
                      {isOpen && <span className="truncate">{s.label}</span>}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Tools ── */}
          <div className="pt-1">
            {isOpen && (
              <button
                onClick={() => setToolsOpen(!toolsOpen)}
                className="w-full flex items-center justify-between px-2 py-1.5 text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-semibold hover:text-[var(--text-primary)] transition-colors rounded-lg hover:bg-[var(--bg-hover)]"
              >
                <span className="flex items-center gap-1.5"><Layers size={10} /> Tools</span>
                <ChevronDown size={12} className={`transition-transform ${toolsOpen ? 'rotate-180' : ''}`} />
              </button>
            )}
            <AnimatePresence>
              {(toolsOpen || !isOpen) && (
                <motion.div
                  initial={isOpen ? { height: 0, opacity: 0 } : false}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  {TOOLS.map(t => (
                    <button
                      key={t.label}
                      onClick={() => onSelectModule(t.module)}
                      title={!isOpen ? t.label : undefined}
                      className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-medium transition-all ${
                        activeModule === t.module
                          ? 'bg-[rgba(59,130,246,0.1)] text-[var(--text-primary)] border border-[rgba(59,130,246,0.15)]'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
                      }`}
                      aria-label={t.label}
                    >
                      <t.icon size={15} className={`shrink-0 ${t.color}`} />
                      {isOpen && <span className="truncate">{t.label}</span>}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Bottom Zone (pinned) ── */}
        <div className="shrink-0 border-t border-[var(--border-subtle)] px-2 py-3 space-y-1">
          {/* Settings */}
          <button
            onClick={onOpenSettings}
            className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-all"
            aria-label="Settings"
          >
            <Settings size={15} className="shrink-0 text-[var(--text-muted)]" />
            {isOpen && <span>Settings</span>}
          </button>

          {/* User profile card */}
          <button
            onClick={onOpenProfile}
            className="w-full flex items-center gap-2.5 px-2.5 py-2.5 rounded-xl hover:bg-[var(--bg-hover)] transition-all group"
            aria-label="Account profile"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-purple)] flex items-center justify-center text-xs font-bold text-white shrink-0">
              {user?.username?.[0]?.toUpperCase() || 'U'}
            </div>
            {isOpen && (
              <div className="flex-1 min-w-0 text-left">
                <div className="text-xs font-semibold text-[var(--text-primary)] truncate">{user?.username || 'B.Tech Student'}</div>
                <div className="text-[10px] text-[var(--text-muted)] truncate">CSE · NexusAI Pro</div>
              </div>
            )}
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs text-[var(--text-muted)] hover:text-[var(--brand-red)] hover:bg-[rgba(239,68,68,0.08)] transition-all"
            aria-label="Sign out"
          >
            <LogOut size={14} className="shrink-0" />
            {isOpen && <span>Sign Out</span>}
          </button>
        </div>
      </div>
    </motion.aside>
  );
}

/* ── Chat item component ── */
function ChatItem({ conversation, isActive, isOpen, onSelect, onDelete, contextMenu, setContextMenu }) {
  const menuRef = useRef(null);

  return (
    <div className="relative group">
      <button
        onClick={onSelect}
        className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-left transition-all ${
          isActive
            ? 'bg-[rgba(59,130,246,0.1)] border border-l-2 border-[var(--brand-primary)] border-r-transparent border-t-transparent border-b-transparent text-[var(--text-primary)]'
            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
        }`}
        aria-label={conversation.title || 'Untitled conversation'}
        aria-current={isActive ? 'page' : undefined}
      >
        <MessageSquare size={13} className="shrink-0 text-[var(--text-muted)]" />
        {isOpen && (
          <span className="flex-1 text-xs truncate">{conversation.title || 'New conversation'}</span>
        )}
      </button>

      {/* 3-dot menu — shown on hover */}
      {isOpen && (
        <button
          onClick={e => {
            e.stopPropagation();
            setContextMenu(contextMenu?.id === conversation.id ? null : { id: conversation.id });
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md opacity-0 group-hover:opacity-100 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-all"
          aria-label="Conversation options"
        >
          <MoreHorizontal size={13} />
        </button>
      )}

      {/* Context menu dropdown */}
      <AnimatePresence>
        {contextMenu?.id === conversation.id && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.12 }}
            className="absolute right-0 top-8 z-50 w-40 glass-card rounded-xl p-1.5 shadow-[var(--shadow-elevated)]"
            onClick={e => e.stopPropagation()}
          >
            {[
              { icon: Pencil, label: 'Rename', action: () => setContextMenu(null) },
              { icon: Pin, label: 'Pin chat', action: () => setContextMenu(null) },
              { icon: Trash2, label: 'Delete', action: () => { onDelete(); setContextMenu(null); }, danger: true },
            ].map(item => (
              <button
                key={item.label}
                onClick={item.action}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  item.danger
                    ? 'text-[var(--brand-red)] hover:bg-[rgba(239,68,68,0.08)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
                }`}
              >
                <item.icon size={13} />
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
