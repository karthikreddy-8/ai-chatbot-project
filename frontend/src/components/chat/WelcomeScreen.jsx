import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { Cpu, Code2, FileText, GitBranch, Mic, FolderOpen, BookOpen, Image, ArrowRight } from 'lucide-react';

const SUGGESTIONS = [
  { icon: Code2,     text: 'Explain Python generators',      prompt: 'Explain Python generators with examples and use cases' },
  { icon: GitBranch, text: 'Solve a DP problem',             prompt: 'Teach me how to solve dynamic programming problems with an example' },
  { icon: Cpu,       text: 'Review my C++ code',             prompt: 'Review my C++ code and suggest improvements' },
  { icon: BookOpen,  text: 'Explain OS scheduling',          prompt: 'Explain CPU scheduling algorithms: FCFS, SJF, Round Robin with examples' },
  { icon: FolderOpen,text: 'Build a CRUD project in Node',   prompt: 'Guide me to build a CRUD REST API project using Node.js and Express' },
  { icon: Mic,       text: 'Prepare me for TCS interview',   prompt: 'Prepare me for a TCS interview: technical questions, aptitude, and HR rounds' },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return { text: 'Good morning', emoji: '☀️' };
  if (h < 17) return { text: 'Good afternoon', emoji: '🌤️' };
  return { text: 'Good evening', emoji: '🌙' };
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};
const chipVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

export default function WelcomeScreen({ onSuggestionClick, mode }) {
  const { user } = useAuth();
  const { text: greeting, emoji } = getGreeting();

  return (
    <div className="flex flex-col items-center justify-center min-h-full py-12 px-4 text-center">
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-2 mb-10"
      >
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-purple)] flex items-center justify-center shadow-[var(--shadow-glow-blue)] mb-6">
          <Cpu size={30} className="text-white" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          {greeting} {emoji}
        </h1>
        <p className="text-[var(--text-secondary)] text-base sm:text-lg">
          Welcome back, <span className="text-[var(--text-primary)] font-semibold">{user?.username?.split(' ')[0] || 'Engineer'}</span>
        </p>
        <p className="text-[var(--text-muted)] text-sm">What would you like to learn today?</p>
      </motion.div>

      {/* Suggestion grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-3"
      >
        {SUGGESTIONS.map(chip => (
          <motion.button
            key={chip.text}
            variants={chipVariants}
            whileHover={{ y: -2, transition: { duration: 0.15 } }}
            onClick={() => onSuggestionClick(chip.prompt)}
            className="flex items-center gap-3 p-4 rounded-2xl text-left transition-all duration-200 group"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--border-subtle)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(59,130,246,0.25)';
              e.currentTarget.style.background = 'rgba(59,130,246,0.05)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
            }}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--brand-primary)]/20 to-[var(--brand-purple)]/20 border border-[var(--border-subtle)] flex items-center justify-center shrink-0 group-hover:border-[rgba(59,130,246,0.3)] transition-colors">
              <chip.icon size={15} className="text-[var(--brand-primary)]" />
            </div>
            <span className="flex-1 text-sm font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">{chip.text}</span>
            <ArrowRight size={14} className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
          </motion.button>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-xs text-[var(--text-muted)]"
      >
        NexusAI · Powered by Ollama llama3.2 · Press <kbd className="px-1.5 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[10px]">↵</kbd> to send
      </motion.p>
    </div>
  );
}
