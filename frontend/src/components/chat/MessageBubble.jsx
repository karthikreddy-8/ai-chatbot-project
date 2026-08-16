import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User, Copy, Check, ThumbsUp, ThumbsDown, RefreshCw,
  ChevronDown, Sparkles, Clock
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import AnalysisResultBubble from './AnalysisResultBubble';

/* ── Code block with language label + copy ── */
function CodeBlock({ children, className }) {
  const [copied, setCopied] = useState(false);
  const language = className?.replace('language-', '') || 'code';
  const codeStr = String(children).replace(/\n$/, '');

  const copy = async () => {
    await navigator.clipboard.writeText(codeStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-4 rounded-xl overflow-hidden border border-[rgba(255,255,255,0.08)] shadow-lg">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          </div>
          <span className="text-xs text-[var(--brand-cyan)] font-mono font-medium ml-1">{language}</span>
        </div>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors px-2 py-1 rounded-md hover:bg-[rgba(255,255,255,0.06)]"
          aria-label={copied ? 'Copied' : 'Copy code'}
        >
          {copied
            ? <><Check size={12} className="text-[var(--brand-green)]" /> <span className="text-[var(--brand-green)]">Copied!</span></>
            : <><Copy size={12} /> Copy</>
          }
        </button>
      </div>
      {/* Code */}
      <pre className="bg-[#0D1117] p-4 overflow-x-auto text-[13px] leading-relaxed font-mono">
        <code className={className}>{codeStr}</code>
      </pre>
    </div>
  );
}

/* ── Main MessageBubble ── */
export default function MessageBubble({ message, isStreaming }) {
  const [liked, setLiked] = useState(null); // 'up' | 'down' | null
  const [copied, setCopied] = useState(false);

  const isUser = message.role === 'user' || message.sender === 'user';
  const content = message.content || message.text || '';
  const hasAnalysis = !!message.analysisResult;

  const imageMatch = content?.match(/!\[.*?\]\((https?:\/\/[^\s)]+)\)/);
  const hasImage = imageMatch && imageMatch[1];
  const textContent = hasImage ? content.replace(/!\[.*?\]\(https?:\/\/[^\s)]+\)/, '').trim() : content;

  const copyAll = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (ts) => {
    if (!ts) return '';
    return new Date(ts).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  /* ── User bubble ── */
  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="flex justify-end py-2 px-3 md:px-4"
      >
        <div className="max-w-[75%] flex items-end gap-2.5">
          <div className="flex flex-col items-end gap-1">
            {message.timestamp && (
              <span className="text-[10px] text-[var(--text-muted)] flex items-center gap-1 pr-1">
                <Clock size={10} />{formatTime(message.timestamp)}
              </span>
            )}
            <div
              className="px-4 py-3 text-sm leading-relaxed text-white font-[450] whitespace-pre-wrap break-words"
              style={{
                background: 'linear-gradient(135deg, #1E3A5F, #1D2D50)',
                borderRadius: '18px 18px 4px 18px',
                border: '1px solid rgba(59,130,246,0.2)',
              }}
            >
              {content}
            </div>
          </div>
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shrink-0">
            <User size={15} className="text-white" />
          </div>
        </div>
      </motion.div>
    );
  }

  /* ── AI message ── */
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="py-3 px-3 md:px-4"
    >
      <div className="max-w-[760px] mx-auto flex items-start gap-3">
        {/* Avatar */}
        <div
          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-purple)] ${isStreaming ? 'pulse-ring' : ''}`}
          style={{ boxShadow: '0 0 15px rgba(59,130,246,0.25)' }}
        >
          <Sparkles size={15} className="text-white" />
        </div>

        <div className="flex-1 min-w-0 space-y-2">
          {/* Name + time */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[var(--text-primary)]">NexusAI</span>
            {message.timestamp && (
              <span className="text-[10px] text-[var(--text-muted)] flex items-center gap-1">
                <Clock size={10} />{formatTime(message.timestamp)}
              </span>
            )}
            {isStreaming && (
              <span className="text-[10px] text-[var(--brand-cyan)] animate-pulse">● generating</span>
            )}
          </div>

          {/* Content */}
          {hasAnalysis ? (
            <AnalysisResultBubble result={message.analysisResult} />
          ) : (
            <>
              {hasImage && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                  <img src={imageMatch[1]} alt="Generated" className="chat-image" loading="lazy" />
                </motion.div>
              )}
              <div className="markdown-content">
                {isUser ? (
                  <p className="text-sm">{content}</p>
                ) : (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        if (inline) {
                          return (
                            <code
                              className="bg-[rgba(139,92,246,0.12)] text-[var(--neon-purple-light)] px-1.5 py-0.5 rounded-md text-[13px] font-mono border border-[rgba(139,92,246,0.15)]"
                              {...props}
                            >
                              {children}
                            </code>
                          );
                        }
                        return <CodeBlock className={className}>{children}</CodeBlock>;
                      },
                      table({ children }) {
                        return <div className="overflow-x-auto my-4"><table className="w-full text-sm">{children}</table></div>;
                      },
                    }}
                  >
                    {textContent}
                  </ReactMarkdown>
                )}
                {isStreaming && <span className="streaming-cursor" aria-hidden="true" />}
              </div>
            </>
          )}

          {/* Action row — fades in after streaming complete */}
          {!isUser && !isStreaming && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-0.5 pt-1"
            >
              <ActionBtn
                onClick={copyAll}
                aria-label={copied ? 'Copied' : 'Copy response'}
                title={copied ? 'Copied!' : 'Copy'}
              >
                {copied ? <Check size={14} className="text-[var(--brand-green)]" /> : <Copy size={14} />}
              </ActionBtn>
              <ActionBtn
                onClick={() => setLiked(liked === 'up' ? null : 'up')}
                aria-label="Good response"
                title="Good response"
                active={liked === 'up'}
              >
                <ThumbsUp size={14} className={liked === 'up' ? 'text-[var(--brand-green)] fill-[var(--brand-green)]' : ''} />
              </ActionBtn>
              <ActionBtn
                onClick={() => setLiked(liked === 'down' ? null : 'down')}
                aria-label="Bad response"
                title="Bad response"
                active={liked === 'down'}
              >
                <ThumbsDown size={14} className={liked === 'down' ? 'text-[var(--brand-red)] fill-[var(--brand-red)]' : ''} />
              </ActionBtn>
              <ActionBtn aria-label="Regenerate response" title="Regenerate">
                <RefreshCw size={14} />
              </ActionBtn>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ActionBtn({ children, onClick, active, ...props }) {
  return (
    <button
      onClick={onClick}
      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
        active
          ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)]'
          : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
      }`}
      {...props}
    >
      {children}
    </button>
  );
}
