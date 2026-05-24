import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * NeonInput — A premium input field with neon glow effects.
 */
export default function NeonInput({
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  onFocus,
  onBlur,
  icon: Icon,
  label,
  error,
  disabled = false,
  className = '',
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-200 mb-2 ml-1">
          {label}
        </label>
      )}

      <div className="relative">
        {/* Icon container */}
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 pointer-events-none">
            <Icon size={20} />
          </div>
        )}

        {/* Input field */}
        <motion.input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          animate={
            isFocused
              ? {
                  boxShadow: [
                    '0 0 0 1px rgba(124, 58, 237, 0.3), inset 0 0 0 1px rgba(124, 58, 237, 0.2)',
                    '0 0 20px rgba(124, 58, 237, 0.5), 0 0 30px rgba(59, 130, 246, 0.3), inset 0 0 0 1px rgba(124, 58, 237, 0.4)',
                  ],
                }
              : {
                  boxShadow: '0 0 0 1px rgba(124, 58, 237, 0.2), inset 0 0 0 1px rgba(124, 58, 237, 0.1)',
                }
          }
          transition={{ duration: 0.3 }}
          className={`
            w-full px-4 py-3 ${Icon ? 'pl-12' : ''} rounded-lg
            bg-gradient-to-br from-slate-900/50 to-slate-800/50
            border border-purple-500/30
            text-white placeholder-gray-500
            focus:outline-none focus:border-purple-400/50
            backdrop-blur-xl
            transition-all duration-300
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            ${error ? 'border-red-500/50' : ''}
            ${className}
          `}
          {...props}
        />

        {/* Animated underline */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-full"
          animate={isFocused ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ transformOrigin: 'center' }}
        />

        {/* Focus glow border */}
        {isFocused && (
          <motion.div
            className="absolute inset-0 rounded-lg pointer-events-none"
            animate={{
              boxShadow: [
                '0 0 10px rgba(124, 58, 237, 0.3), inset 0 0 10px rgba(124, 58, 237, 0.1)',
                '0 0 30px rgba(124, 58, 237, 0.5), inset 0 0 10px rgba(124, 58, 237, 0.2)',
                '0 0 10px rgba(124, 58, 237, 0.3), inset 0 0 10px rgba(124, 58, 237, 0.1)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>

      {/* Error message */}
      {error && (
        <motion.p
          className="mt-2 text-sm text-red-400 ml-1"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
