import { motion } from 'framer-motion';

/**
 * NeonButton — A button with neon glow hover effect and pulse animation.
 */
export default function NeonButton({
  children,
  onClick,
  className = '',
  variant = 'primary',
  disabled = false,
  type = 'button',
  pulse = false,
  ...props
}) {
  const variants = {
    primary: 'bg-gradient-to-r from-[#7C3AED] to-[#3B82F6] text-white shadow-lg hover:shadow-[0_0_40px_rgba(124,58,237,0.6),0_0_60px_rgba(59,130,246,0.4)] border border-purple-400/30',
    secondary: 'glass text-[var(--text-primary)] hover:bg-[var(--bg-glass-strong)] hover:shadow-[var(--shadow-neon-blue)] border border-blue-400/20',
    ghost: 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-glass)] border border-transparent hover:border-purple-400/40',
    danger: 'bg-gradient-to-r from-red-600 to-red-500 text-white hover:shadow-[0_0_40px_rgba(239,68,68,0.6),0_0_60px_rgba(239,68,68,0.3)] border border-red-400/30',
    outline: 'bg-transparent border-2 border-[#7C3AED] text-white hover:bg-[rgba(124,58,237,0.1)] hover:shadow-[0_0_40px_rgba(124,58,237,0.5),0_0_60px_rgba(59,130,246,0.3)]',
  };

  const pulseAnimation = pulse
    ? {
        animate: { boxShadow: ['0_0_20px_rgba(124,58,237,0.4)', '0_0_40px_rgba(59,130,246,0.6)', '0_0_20px_rgba(124,58,237,0.4)'] },
        transition: { duration: 2, repeat: Infinity },
      }
    : {};

  return (
    <motion.button
      type={type}
      className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      whileHover={!disabled ? { scale: 1.05, y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      {...pulseAnimation}
      {...props}
    >
      {children}
    </motion.button>
  );
}
