import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Menu, X, LogIn, Activity, Info, Home, ShieldCheck } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';

export default function Navbar({ onOpenAbout, onOpenHealth }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-[var(--border-glass)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo / Brand */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--neon-purple)] via-[var(--neon-blue)] to-[var(--neon-cyan)] flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.4)] group-hover:scale-105 transition-transform">
                <Sparkles size={20} className="text-white animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg text-[var(--text-primary)] tracking-tight leading-none group-hover:text-[var(--neon-purple-light)] transition-colors font-['Poppins']">
                  AI <span className="gradient-text-cyan">CHATBOT</span>
                </span>
                <span className="text-[10px] text-[var(--text-muted)] font-medium tracking-wider uppercase mt-0.5">
                  VisionEvolution AI Platform
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2 bg-[var(--bg-glass)] p-1.5 rounded-xl border border-[var(--border-glass)]">
              <Link
                to="/"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  location.pathname === '/'
                    ? 'bg-[rgba(124,58,237,0.15)] text-[var(--neon-purple-light)] border border-[rgba(124,58,237,0.25)] shadow-sm'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
                }`}
              >
                <Home size={14} />
                Home
              </Link>

              <button
                onClick={onOpenAbout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-all"
              >
                <Info size={14} className="text-[var(--neon-cyan)]" />
                About
              </button>

              <button
                onClick={onOpenHealth}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-all"
              >
                <Activity size={14} className="text-emerald-400" />
                System Health
              </button>
            </div>

            {/* Right Action: Theme Toggle & Login Option */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle className="w-9 h-9" />
              <Link
                to="/login"
                className="btn-primary py-2 px-5 text-xs font-bold rounded-xl flex items-center gap-2"
              >
                <LogIn size={15} />
                <span>Login</span>
              </Link>
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle className="w-9 h-9" />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-xl bg-[var(--bg-glass)] border border-[var(--border-glass)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                aria-label="Toggle Navigation Menu"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden glass-strong border-b border-[var(--border-glass)] p-4 space-y-3"
          >
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"
            >
              <Home size={16} /> Home
            </Link>

            <button
              onClick={() => {
                setIsOpen(false);
                if (onOpenAbout) onOpenAbout();
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] text-left"
            >
              <Info size={16} className="text-[var(--neon-cyan)]" /> About
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                if (onOpenHealth) onOpenHealth();
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] text-left"
            >
              <Activity size={16} className="text-emerald-400" /> System Health
            </button>

            <div className="pt-2">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="btn-primary w-full justify-center py-3 text-sm font-bold rounded-xl"
              >
                <LogIn size={16} />
                <span>Login</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
