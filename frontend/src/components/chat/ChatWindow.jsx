import { useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import WelcomeScreen from './WelcomeScreen';

/**
 * ChatWindow — Main chat area with fast response, thinking indicator & streaming updates
 */
export default function ChatWindow({
  messages,
  isSending,
  isThinking,
  isStreaming,
  streamingMessageId,
  onSuggestionClick,
}) {
  const messagesEndRef = useRef(null);

  // Auto scroll while streaming or receiving messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: isStreaming ? 'auto' : 'smooth',
    });
  }, [messages, isSending, isThinking, isStreaming]);

  // Welcome Screen
  if (messages.length === 0) {
    return (
      <WelcomeScreen
        onSuggestionClick={onSuggestionClick}
      />
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-2 md:px-4 py-6 space-y-1">
      <div className="max-w-4xl mx-auto">
        <AnimatePresence>
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id || msg.timestamp || Math.random()}
              message={{
                role: msg.sender === 'user' ? 'user' : 'assistant',
                content: msg.text,
                timestamp: msg.timestamp,
                analysisResult: msg.analysisResult,
              }}
              isStreaming={isStreaming && msg.id === streamingMessageId}
            />
          ))}
        </AnimatePresence>

        {/* 150-500ms Thinking Indicator (shown before first token arrives) */}
        {isThinking && !isStreaming && (
          <div className="flex items-center gap-3 my-4 px-4 py-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-purple)] flex items-center justify-center shrink-0 animate-pulse">
              <span className="text-white text-xs">✨</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
              <div className="w-2 h-2 rounded-full bg-[var(--brand-cyan)] animate-ping" />
              <span className="text-sm font-medium text-[var(--text-secondary)]">
                NexusAI is thinking...
              </span>
            </div>
          </div>
        )}

        {/* Scroll Bottom Anchor */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}