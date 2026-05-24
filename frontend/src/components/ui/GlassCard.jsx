import { motion } from 'framer-motion';

/**
 * GlassCard — A reusable glassmorphism container component.
 */
export default function GlassCard({ children, className = '', hover = true, onClick, ...props }) {
  return (
    <motion.div
      className={`glass rounded-2xl p-6 ${hover ? 'hover:bg-[var(--bg-glass-strong)] cursor-pointer' : ''} transition-all duration-300 ${className}`}
      whileHover={hover ? { scale: 1.02, y: -2 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
}
