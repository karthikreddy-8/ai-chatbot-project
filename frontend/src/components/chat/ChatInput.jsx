import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send, Mic, MicOff, Plus, X, ImagePlus, FileText,
  Loader2, Square
} from 'lucide-react';

export default function ChatInput({ onSend, disabled, isStreaming, onStop, showActions, onActionClick }) {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [attachedFile, setAttachedFile] = useState(null);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const textareaRef = useRef(null);
  const recognitionRef = useRef(null);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = 'auto';
      ta.style.height = Math.min(ta.scrollHeight, 200) + 'px';
    }
  }, [message]);

  // Speech recognition
  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SR) {
      const r = new SR();
      r.continuous = false;
      r.interimResults = true;
      r.lang = 'en-US';
      r.onresult = e => setMessage(Array.from(e.results).map(x => x[0].transcript).join(''));
      r.onend = () => setIsListening(false);
      r.onerror = () => setIsListening(false);
      recognitionRef.current = r;
    }
  }, []);

  const toggleVoice = () => {
    if (!recognitionRef.current) return;
    if (isListening) { recognitionRef.current.stop(); setIsListening(false); }
    else { recognitionRef.current.start(); setIsListening(true); }
  };

  const handleSend = async () => {
    const trimmed = message.trim();
    if ((!trimmed && !attachedFile) || disabled) return;
    try {
      await onSend(trimmed, attachedFile);
      setMessage('');
      setAttachedFile(null);
      if (textareaRef.current) textareaRef.current.style.height = 'auto';
    } catch (err) {
      console.error('[ChatInput] Send error:', err);
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const handleFileChange = e => {
    const file = e.target.files?.[0];
    if (file) setAttachedFile(file);
    e.target.value = '';
    setShowAttachMenu(false);
  };

  const hasContent = message.trim() || attachedFile;

  return (
    <div className="w-full space-y-3">
      {/* Attached file preview */}
      <AnimatePresence>
        {attachedFile && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            className="inline-flex items-center gap-3 px-4 py-2.5 glass-card rounded-xl"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--brand-purple)]/20 to-[var(--brand-cyan)]/20 border border-[var(--border-subtle)] flex items-center justify-center shrink-0">
              {attachedFile.type?.startsWith('image/')
                ? <ImagePlus size={15} className="text-[var(--brand-purple)]" />
                : <FileText size={15} className="text-[var(--brand-cyan)]" />
              }
            </div>
            <div className="text-xs">
              <div className="font-medium text-[var(--text-primary)] truncate max-w-[180px]">{attachedFile.name}</div>
              <div className="text-[var(--text-muted)]">{(attachedFile.size / 1024).toFixed(1)} KB</div>
            </div>
            <button
              onClick={() => setAttachedFile(null)}
              className="ml-1 p-1 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-all"
              aria-label="Remove attachment"
            >
              <X size={13} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input bar */}
      <div
        className="relative flex flex-col rounded-2xl transition-all duration-200"
        style={{
          background: 'var(--bg-surface)',
          border: `1px solid ${isFocused ? 'rgba(59,130,246,0.5)' : 'var(--border-strong)'}`,
          boxShadow: isFocused
            ? '0 0 0 3px rgba(59,130,246,0.1), var(--shadow-card)'
            : 'var(--shadow-card)',
        }}
      >
        <div className="flex items-end gap-1 px-3 py-2">
          {/* Attach button + dropdown */}
          <div className="relative mb-0.5">
            <button
              onClick={() => setShowAttachMenu(!showAttachMenu)}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--brand-primary)] hover:bg-[rgba(59,130,246,0.08)] transition-all"
              aria-label="Attach file"
              aria-expanded={showAttachMenu}
            >
              <Plus size={19} />
            </button>

            <AnimatePresence>
              {showAttachMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute bottom-12 left-0 glass-card rounded-2xl p-2 w-48 z-20 shadow-[var(--shadow-elevated)]"
                >
                  {[
                    { icon: FileText, label: 'Upload PDF / File', ref: fileInputRef, color: 'text-[var(--brand-cyan)]' },
                    { icon: ImagePlus, label: 'Upload Image', ref: imageInputRef, color: 'text-[var(--brand-pink)]' },
                  ].map(item => (
                    <button
                      key={item.label}
                      onClick={() => item.ref.current?.click()}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-all"
                    >
                      <item.icon size={15} className={item.color} />
                      {item.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.txt,.doc,.docx,.csv,.json,.md" />
          <input type="file" ref={imageInputRef} onChange={handleFileChange} className="hidden" accept={"image/*"} />

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Ask anything about engineering..."
            rows={1}
            id="chat-input"
            aria-label="Chat message input"
            className="flex-1 bg-transparent text-[var(--text-primary)] placeholder-[var(--text-muted)] resize-none focus:outline-none py-2.5 text-[15px] leading-relaxed max-h-[200px]"
            style={{ fontFamily: 'var(--font-sans)' }}
          />

          {/* Right buttons */}
          <div className="flex items-center gap-1 mb-0.5">
            {/* Voice */}
            <button
              onClick={toggleVoice}
              id="voice-btn"
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                isListening
                  ? 'text-[var(--brand-red)] bg-[rgba(239,68,68,0.1)] animate-pulse'
                  : 'text-[var(--text-muted)] hover:text-[var(--brand-cyan)] hover:bg-[rgba(6,182,212,0.08)]'
              }`}
              aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
            >
              {isListening ? <MicOff size={17} /> : <Mic size={17} />}
            </button>

            {/* Send / Stop button */}
            {isStreaming ? (
              <button
                onClick={onStop}
                id="stop-btn"
                aria-label="Stop generating"
                title="Stop generating"
                className="w-9 h-9 rounded-xl flex items-center justify-center bg-[var(--brand-red)] text-white shadow-lg hover:scale-105 transition-all duration-200"
              >
                <Square size={14} className="fill-white" />
              </button>
            ) : (
              <button
                onClick={handleSend}
                disabled={!hasContent || disabled}
                id="send-btn"
                aria-label="Send message"
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  hasContent && !disabled
                    ? 'bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-purple)] text-white shadow-[var(--shadow-glow-blue)] hover:scale-105 hover:brightness-110'
                    : 'bg-[rgba(255,255,255,0.05)] text-[var(--text-muted)] cursor-not-allowed'
                }`}
              >
                {disabled ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-center text-[11px] text-[var(--text-muted)]">
        NexusAI can make mistakes. Verify important information. · <kbd className="px-1 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[10px]">Shift+Enter</kbd> for new line
      </p>
    </div>
  );
}
