import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

/**
 * TypingIndicator — Animated dots shown while AI generates a response.
 * Uses gradient-colored dots matching the AI Chat theme.
 */
export default function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full flex justify-center py-5"
    >
      <div className="w-full max-w-3xl flex items-start gap-4 px-4">
        {/* AI Avatar */}
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--neon-purple)] to-[var(--neon-cyan)] flex items-center justify-center shrink-0"
          style={{ boxShadow: '0 0 15px rgba(124, 58, 237, 0.3)' }}>
          <Sparkles size={16} className="text-white" />
        </div>

        {/* Typing Dots */}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold text-white font-['Poppins']">AI Chat</span>
          <div className="glass-card rounded-2xl rounded-bl-sm px-5 py-3.5 flex items-center gap-2">
            <div className="typing-dot" />
            <div className="typing-dot" />
            <div className="typing-dot" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
