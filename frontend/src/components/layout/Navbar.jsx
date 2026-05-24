import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import ThemeToggle from '../ui/ThemeToggle';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '#features' },
    { label: 'Contact', href: '#contact' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Fixed Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: 'rgba(13, 13, 13, 0.7)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(124, 58, 237, 0.2)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex-shrink-0 font-bold text-2xl flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <span className="text-white text-sm font-bold">AI</span>
              </div>
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                ChatBot
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="text-gray-300 hover:text-white text-sm font-medium transition-colors relative"
                  whileHover={{ y: -2 }}
                  onClick={(e) => {
                    if (link.href.startsWith('#')) {
                      e.preventDefault();
                      const element = document.querySelector(link.href);
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {link.label}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ transformOrigin: 'left' }}
                  />
                </motion.a>
              ))}

              {/* Login Button */}
              <motion.a
                href="/login"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold hover:shadow-[0_0_20px_rgba(124,58,237,0.4),0_0_30px_rgba(59,130,246,0.2)] transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.a>

              {/* Theme Toggle */}
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <ThemeToggle />
              <motion.button
                onClick={toggleMenu}
                className="p-2 rounded-lg hover:bg-purple-500/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isOpen ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <Menu className="w-6 h-6 text-white" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden"
            style={{
              background: 'rgba(13, 13, 13, 0.9)',
              backdropFilter: 'blur(10px)',
              borderBottom: '1px solid rgba(124, 58, 237, 0.2)',
            }}
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-purple-500/10 transition-colors"
                  onClick={() => {
                    setIsOpen(false);
                    if (link.href.startsWith('#')) {
                      setTimeout(() => {
                        const element = document.querySelector(link.href);
                        element?.scrollIntoView({ behavior: 'smooth' });
                      }, 300);
                    }
                  }}
                  whileHover={{ x: 4 }}
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.a
                href="/login"
                className="block px-4 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center font-semibold hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all"
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Login
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
