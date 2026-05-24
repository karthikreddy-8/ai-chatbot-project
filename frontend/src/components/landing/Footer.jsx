import { motion } from 'framer-motion';
import { Bot, Heart, Mail, Code2, Share2 } from 'lucide-react';

/**
 * Footer — Premium footer with neon styling and social links.
 */
export default function Footer() {
  return (
    <footer 
      id="contact"
      className="relative z-10 py-12 px-6 border-t transition-all"
      style={{
        borderColor: 'rgba(124, 58, 237, 0.2)',
        background: 'rgba(13, 13, 13, 0.8)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                <Bot size={18} className="text-white" />
              </div>
              <span className="font-bold text-lg text-transparent bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text">
                AI ChatBot
              </span>
            </div>
            <p className="text-sm text-gray-400">
              Your intelligent assistant for every question, idea, and solution.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#features" className="hover:text-purple-400 transition-colors">Features</a>
              </li>
              <li>
                <a href="/login" className="hover:text-purple-400 transition-colors">Sign In</a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">Pricing</a>
              </li>
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">About</a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">Blog</a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">Privacy</a>
              </li>
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              {[
                { icon: Code2, href: '#', label: 'GitHub' },
                { icon: Share2, href: '#', label: 'Twitter' },
                { icon: Mail, href: '#', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-700/20 flex items-center justify-center text-gray-400 hover:text-white border border-purple-500/30 transition-all"
                  whileHover={{
                    scale: 1.1,
                    boxShadow: '0 0 20px rgba(124, 58, 237, 0.4)',
                    borderColor: 'rgba(124, 58, 237, 0.6)',
                  }}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div
          className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent mb-6"
        />

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400"
        >
          <div>
            <p>
              © 2026 AI ChatBot. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span>Built with</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
            >
              <Heart
                size={16}
                className="text-pink-500"
                fill="currentColor"
              />
            </motion.span>
            <span>by Dev Team</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
