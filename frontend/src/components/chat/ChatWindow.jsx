import { useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import WelcomeScreen from './WelcomeScreen';

/**
 * ChatWindow — Main chat area
 */
export default function ChatWindow({
  messages,
  isSending,
  onSuggestionClick,
}) {

  const messagesEndRef = useRef(null);

  // Auto scroll
  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });

  }, [messages, isSending]);

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

          {messages.map((msg, index) => (

            <MessageBubble
              key={index}
              message={{
                role:
                  msg.sender === 'user'
                    ? 'user'
                    : 'assistant',

                content: msg.text,
              }}
            />

          ))}

        </AnimatePresence>

        {/* AI Typing */}
        {isSending && (

          <div className="flex items-center gap-2 my-4">

            <TypingIndicator />

            <span className="text-sm text-gray-400 animate-pulse">

              AI is thinking...

            </span>

          </div>

        )}

        {/* Scroll Bottom */}
        <div ref={messagesEndRef} />

      </div>

    </div>

  );

}