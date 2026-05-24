import { motion } from 'framer-motion';
import {
  Code2, Search, Bug, PenTool, Languages, ImagePlus,
  FileText, Mic, GraduationCap, Microscope
} from 'lucide-react';

/**
 * WelcomeScreen — Futuristic welcome dashboard with animated heading,
 * AI avatar, and glowing feature cards.
 */

const featureCards = [
  { icon: Code2, title: 'Coding Assistant', desc: 'Generate, debug & optimize code', color: 'from-violet-500 to-purple-600', glow: 'rgba(124, 58, 237, 0.3)' },
  { icon: Search, title: 'AI Research', desc: 'Deep research & analysis', color: 'from-blue-500 to-cyan-500', glow: 'rgba(6, 182, 212, 0.3)' },
  { icon: Bug, title: 'Error Debugging', desc: 'Find & fix bugs instantly', color: 'from-red-500 to-orange-500', glow: 'rgba(239, 68, 68, 0.3)' },
  { icon: PenTool, title: 'Essay Writing', desc: 'Essays, blogs & content', color: 'from-emerald-500 to-teal-500', glow: 'rgba(16, 185, 129, 0.3)' },
  { icon: Languages, title: 'Translation', desc: 'Multi-language translation', color: 'from-amber-500 to-yellow-500', glow: 'rgba(245, 158, 11, 0.3)' },
  { icon: ImagePlus, title: 'Image Generation', desc: 'AI-powered art creation', color: 'from-pink-500 to-rose-500', glow: 'rgba(236, 72, 153, 0.3)' },
  { icon: FileText, title: 'PDF Chat', desc: 'Upload & chat with PDFs', color: 'from-indigo-500 to-blue-600', glow: 'rgba(99, 102, 241, 0.3)' },
  { icon: Mic, title: 'Voice Assistant', desc: 'Voice input & responses', color: 'from-cyan-500 to-sky-500', glow: 'rgba(6, 182, 212, 0.3)' },
  { icon: GraduationCap, title: 'Interview Prep', desc: 'Practice & prepare', color: 'from-purple-500 to-indigo-500', glow: 'rgba(124, 58, 237, 0.3)' },
  { icon: Microscope, title: 'Deep Research', desc: 'In-depth analysis & insights', color: 'from-teal-500 to-emerald-500', glow: 'rgba(20, 184, 166, 0.3)' },
];

export default function WelcomeScreen({ onSuggestionClick }) {
  return (
    <div className="w-full flex flex-col items-center justify-center px-4 py-8">
      {/* Animated AI Avatar */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
        className="relative mb-6"
      >
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[var(--neon-purple)] to-[var(--neon-cyan)] flex items-center justify-center relative z-10">
          <span className="text-3xl font-bold text-white font-['Poppins']">AI</span>
        </div>
        <motion.div
          className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--neon-purple)] to-[var(--neon-cyan)]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ filter: 'blur(20px)' }}
        />
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-3 font-['Poppins'] tracking-tight"
      >
        <span className="text-white">How Can I </span>
        <span className="gradient-text-mixed">Help You</span>
        <span className="text-white"> Today?</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="text-[var(--text-muted)] text-sm md:text-base text-center mb-10 max-w-lg"
      >
        Your AI-powered assistant for coding, research, writing, image generation, and more.
      </motion.p>

      {/* Feature Cards Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-w-4xl w-full"
      >
        {featureCards.map((card, index) => (
          <motion.button
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSuggestionClick?.(`Help me with ${card.title.toLowerCase()}`)}
            className="feature-card p-4 rounded-2xl text-left glass-card group cursor-pointer"
            style={{
              boxShadow: `0 0 0 rgba(0,0,0,0)`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 8px 30px ${card.glow}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `0 0 0 rgba(0,0,0,0)`;
            }}
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
              <card.icon size={18} className="text-white" />
            </div>
            <h3 className="text-xs font-semibold text-white mb-1 font-['Poppins']">{card.title}</h3>
            <p className="text-[10px] text-[var(--text-muted)] leading-relaxed">{card.desc}</p>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
