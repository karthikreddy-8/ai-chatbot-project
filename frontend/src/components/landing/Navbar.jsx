import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowRight, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Voyage', href: '#hero' },
    { name: 'Fleet', href: '#fleet' },
    { name: 'Destinations', href: '#destinations' },
    { name: 'COSMOS AI', href: '#cosmos-ai' },
    { name: 'Telemetry Gear', href: '#gear' },
    { name: 'Missions', href: '#testimonials' },
    { name: 'Voyage Tiers', href: '#pricing' },
    { name: 'Cockpit FAQ', href: '#launch-dashboard' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'py-4 bg-slate-950/40 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center relative overflow-hidden shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            <Activity className="text-white w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <span className="text-2xl font-black tracking-widest bg-gradient-to-r from-white via-cyan-300 to-white bg-clip-text text-transparent group-hover:cosmos-glow-text transition-all duration-300">
            COSMOS
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors py-2 relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* Action button */}
          <Link
            to="/login"
            className="px-5 py-2.5 rounded-full text-sm font-bold text-white relative group overflow-hidden border border-cyan-500/30 bg-slate-900/60 shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              Launch Portal
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-all duration-300" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white hover:text-cyan-400 p-2 rounded-lg bg-slate-950/20 border border-white/5 transition-all duration-300"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-slate-950/95 backdrop-blur-lg border-b border-white/10 shadow-2xl py-6 px-8 flex flex-col gap-6 lg:hidden"
          >
            <ul className="flex flex-col gap-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-slate-300 hover:text-cyan-400 block py-1.5 transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>

            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="w-full text-center px-6 py-3 rounded-full text-base font-bold text-white bg-gradient-to-r from-violet-600 to-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2"
            >
              Launch Portal
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
