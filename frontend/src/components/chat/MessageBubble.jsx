import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, User, Copy, Check, ThumbsUp, ThumbsDown, Download, Sparkles, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * MessageBubble — Styled chat message with avatar, markdown rendering,
 * code blocks, image display, timestamps, and action buttons.
 */
export default function MessageBubble({ message }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Format timestamp
  const formatTime = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  // Check if message contains an image URL
  const imageMatch = message.content?.match(/!\[.*?\]\((https?:\/\/[^\s)]+)\)/);
  const hasImage = imageMatch && imageMatch[1];

  // Extract text content without the image markdown
  const textContent = hasImage
    ? message.content.replace(/!\[.*?\]\(https?:\/\/[^\s)]+\)/, '').trim()
    : message.content;

  const CodeBlock = ({ children, className }) => {
    const [codeCopied, setCodeCopied] = useState(false);
    const language = className?.replace('language-', '') || '';
    const codeString = String(children).replace(/\n$/, '');

    return (
      <div className="relative group my-4">
        {/* Code Header */}
        <div className="flex items-center justify-between px-4 py-2.5 rounded-t-xl bg-[#0D1117] border border-[rgba(124,58,237,0.15)] border-b-0">
          <span className="text-xs text-[var(--neon-purple-light)] font-mono font-medium">{language || 'code'}</span>
          <button
            onClick={async () => {
              await navigator.clipboard.writeText(codeString);
              setCodeCopied(true);
              setTimeout(() => setCodeCopied(false), 2000);
            }}
            className="text-xs text-[var(--text-muted)] hover:text-white flex items-center gap-1.5 transition-colors px-2 py-1 rounded-md hover:bg-[rgba(124,58,237,0.1)]"
          >
            {codeCopied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
            {codeCopied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        {/* Code Body */}
        <pre className="!mt-0 !rounded-t-none bg-[#0D1117] p-4 overflow-x-auto text-[13px] leading-relaxed border border-[rgba(124,58,237,0.15)] border-t-0 rounded-b-xl">
          <code className={className}>{codeString}</code>
        </pre>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full flex justify-center py-5"
    >
      <div className="w-full max-w-3xl flex items-start gap-4 px-4">
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
          isUser
            ? 'bg-gradient-to-br from-indigo-600 to-purple-600'
            : 'bg-gradient-to-br from-[var(--neon-purple)] to-[var(--neon-cyan)]'
        }`}
          style={!isUser ? {
            boxShadow: '0 0 15px rgba(124, 58, 237, 0.3)',
          } : {}}
        >
          {isUser ? <User size={16} className="text-white" /> : <Sparkles size={16} className="text-white" />}
        </div>

        {/* Message Content */}
        <div className="flex-1 min-w-0 flex flex-col gap-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-white font-['Poppins']">
              {isUser ? 'You' : 'AI Chat'}
            </span>
            {message.timestamp && (
              <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                <Clock size={12} />
                {formatTime(message.timestamp)}
              </span>
            )}
          </div>

          {/* Image Display */}
          {hasImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-3"
            >
              <img
                src={imageMatch[1]}
                alt="AI Generated Image"
                className="chat-image"
                loading="lazy"
              />
              <a
                href={imageMatch[1]}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 rounded-lg text-xs text-[var(--neon-cyan)] bg-[rgba(6,182,212,0.08)] border border-[rgba(6,182,212,0.2)] hover:bg-[rgba(6,182,212,0.15)] transition-all"
              >
                <Download size={12} />
                Download Image
              </a>
            </motion.div>
          )}

          {/* Text Content */}
          <div className="markdown-content text-[14px] leading-7">
            {isUser ? (
              <p className="whitespace-pre-wrap text-[var(--text-secondary)]">{message.content}</p>
            ) : (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    if (inline) {
                      return (
                        <code className="bg-[rgba(124,58,237,0.12)] text-[var(--neon-purple-light)] px-1.5 py-0.5 rounded-md text-[13px] font-mono" {...props}>
                          {children}
                        </code>
                      );
                    }
                    return <CodeBlock className={className}>{children}</CodeBlock>;
                  },
                }}
              >
                {textContent || ''}
              </ReactMarkdown>
            )}
          </div>

          {/* Action Buttons for AI messages */}
          {!isUser && (
            <div className="flex items-center gap-1 mt-2">
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-lg hover:bg-[rgba(124,58,237,0.08)] transition-all text-[var(--text-muted)] hover:text-white"
                title="Copy response"
              >
                {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
              </button>
              <button className="p-1.5 rounded-lg hover:bg-[rgba(124,58,237,0.08)] transition-all text-[var(--text-muted)] hover:text-white" title="Good response">
                <ThumbsUp size={14} />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-[rgba(124,58,237,0.08)] transition-all text-[var(--text-muted)] hover:text-white" title="Bad response">
                <ThumbsDown size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
