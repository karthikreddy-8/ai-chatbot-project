import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send, Mic, MicOff, Plus, X, ImagePlus, FileText,
  Code2, PenTool, Search, Languages, Sparkles
} from 'lucide-react';

/**
 * ChatInput — Premium glassmorphism chat input with file upload,
 * voice input, image generation button, suggestion chips.
 */
export default function ChatInput({ onSend, disabled, showActions, onActionClick }) {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [attachedFile, setAttachedFile] = useState(null);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const textareaRef = useRef(null);
  const recognitionRef = useRef(null);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
    }
  }, [message]);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setMessage(transcript);
      };

      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      recognitionRef.current = recognition;
    }
  }, []);

  const toggleVoice = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleSend = async () => {
    const trimmed = message.trim();
    console.log('[ChatInput] handleSend called', { messageLength: trimmed.length, hasFile: !!attachedFile, disabled });
    
    // Validate message
    if ((!trimmed && !attachedFile) || disabled) {
      console.warn('[ChatInput] Message validation failed', { trimmed: !!trimmed, hasFile: !!attachedFile, disabled });
      return;
    }

    try {
      console.log('[ChatInput] Sending message:', trimmed.substring(0, 50));
      await onSend(trimmed, attachedFile);
      
      // Clear input after successful send
      setMessage('');
      setAttachedFile(null);
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
      console.log('[ChatInput] Message cleared after send');
    } catch (err) {
      console.error('[ChatInput] Error sending message:', err);
      // Error will be handled by parent component
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      console.log('[ChatInput] Enter key pressed (without Shift)');
      handleSend();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setAttachedFile(file);
    e.target.value = '';
    setShowAttachMenu(false);
  };

  const handleImageGenerate = () => {
    setMessage(prev => prev ? prev : 'Generate an image of ');
    textareaRef.current?.focus();
    setShowAttachMenu(false);
  };

  const suggestionChips = [
    { icon: ImagePlus, text: 'Generate an image', prompt: 'Generate an image of a futuristic cityscape at night' },
    { icon: Code2, text: 'Write code', prompt: 'Write a Python function to sort a list using merge sort' },
    { icon: PenTool, text: 'Write an essay', prompt: 'Write a professional essay about artificial intelligence' },
    { icon: Search, text: 'Research topic', prompt: 'Research the latest developments in quantum computing' },
    { icon: Languages, text: 'Translate text', prompt: 'Translate "Hello, how are you?" to French, Spanish, and Japanese' },
  ];

  const hasContent = message.trim() || attachedFile;

  return (
    <div className="w-full">
      {/* File Preview */}
      <AnimatePresence>
        {attachedFile && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mb-3 p-3 glass-card rounded-xl inline-flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--neon-purple)]/20 to-[var(--neon-cyan)]/20 border border-[rgba(124,58,237,0.2)] flex items-center justify-center">
              {attachedFile.type?.startsWith('image/') ? <ImagePlus size={18} className="text-[var(--neon-purple-light)]" /> : <FileText size={18} className="text-[var(--neon-cyan)]" />}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-white">{attachedFile.name}</span>
              <span className="text-[10px] text-[var(--text-muted)]">{(attachedFile.size / 1024).toFixed(1)} KB</span>
            </div>
            <button onClick={() => setAttachedFile(null)} className="p-1 hover:bg-[var(--bg-glass-hover)] rounded-full text-[var(--text-muted)] hover:text-white transition-all">
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Bar */}
      <div className="relative flex flex-col rounded-2xl transition-all duration-300 glass-card"
        style={{
          boxShadow: '0 0 30px rgba(124, 58, 237, 0.05)',
        }}
      >
        <div className="flex items-end p-2 px-3 gap-1">
          {/* Attach button */}
          <div className="relative">
            <button
              onClick={() => setShowAttachMenu(!showAttachMenu)}
              className="p-2.5 rounded-xl text-[var(--text-muted)] hover:text-[var(--neon-purple-light)] hover:bg-[rgba(124,58,237,0.08)] transition-all mb-0.5"
              id="attach-btn"
            >
              <Plus size={20} />
            </button>

            {/* Attach menu dropdown */}
            <AnimatePresence>
              {showAttachMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute bottom-14 left-0 glass-card rounded-xl p-2 min-w-[180px] z-20"
                  style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.4)' }}
                >
                  <button onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[var(--text-secondary)] hover:text-white hover:bg-[rgba(124,58,237,0.08)] transition-all">
                    <FileText size={16} className="text-[var(--neon-cyan)]" />
                    Upload File / PDF
                  </button>
                  <button onClick={() => imageInputRef.current?.click()}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[var(--text-secondary)] hover:text-white hover:bg-[rgba(124,58,237,0.08)] transition-all">
                    <ImagePlus size={16} className="text-[var(--neon-pink)]" />
                    Upload Image
                  </button>
                  <button onClick={handleImageGenerate}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[var(--text-secondary)] hover:text-white hover:bg-[rgba(124,58,237,0.08)] transition-all">
                    <Sparkles size={16} className="text-[var(--neon-purple-light)]" />
                    Generate AI Image
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.txt,.doc,.docx,.csv,.json,.md" />
          <input type="file" ref={imageInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message AI Chat..."
            rows={1}
            disabled={disabled}
            id="chat-input"
            className="flex-1 bg-transparent text-white placeholder-[var(--text-muted)] resize-none focus:outline-none py-3 text-[14px] max-h-[200px] leading-normal"
          />

          {/* Action buttons */}
          <div className="flex items-center gap-1 mb-1">
            {/* Voice button */}
            <button
              onClick={toggleVoice}
              id="voice-btn"
              className={`p-2.5 rounded-xl transition-all ${
                isListening
                  ? 'text-red-400 bg-red-500/10 animate-pulse'
                  : 'text-[var(--text-muted)] hover:text-[var(--neon-cyan)] hover:bg-[rgba(6,182,212,0.08)]'
              }`}
              title={isListening ? 'Stop recording' : 'Voice input'}
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>

            {/* Send button */}
            <button
              onClick={handleSend}
              disabled={!hasContent || disabled}
              id="send-btn"
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
                hasContent
                  ? 'bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] text-white shadow-lg hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]'
                  : 'bg-[rgba(255,255,255,0.05)] text-[var(--text-muted)]'
              }`}
            >
              <Send size={16} className={hasContent ? '' : ''} />
            </button>
          </div>
        </div>
      </div>

      {/* Suggestion Chips */}
      {showActions && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-2 mt-4"
        >
          {suggestionChips.map((chip) => (
            <button
              key={chip.text}
              onClick={() => onActionClick(chip.prompt)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[rgba(124,58,237,0.15)] text-xs font-medium text-[var(--text-secondary)] hover:text-white hover:bg-[rgba(124,58,237,0.06)] hover:border-[rgba(124,58,237,0.3)] transition-all duration-300 group"
            >
              <chip.icon size={14} className="text-[var(--text-muted)] group-hover:text-[var(--neon-purple-light)] transition-colors" />
              <span>{chip.text}</span>
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
