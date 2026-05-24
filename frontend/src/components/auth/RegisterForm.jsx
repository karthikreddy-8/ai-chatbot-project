import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, Sparkles } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

/**
 * RegisterForm — Premium glassmorphism registration form matching the login page design.
 */
export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await register(username, email, password);
      navigate('/chat');
    } catch (err) {
      console.error('Register error:', err);
      setError(err.response?.data?.detail || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const InputField = ({ icon: Icon, label, id, ...inputProps }) => (
    <motion.div variants={itemVariants}>
      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2 ml-1">{label}</label>
      <div className="relative group">
        <Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--neon-purple)] opacity-60 group-focus-within:opacity-100 transition-opacity" />
        <input
          id={id}
          className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(124,58,237,0.2)] text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--neon-purple)] focus:shadow-[0_0_20px_rgba(124,58,237,0.2)] transition-all duration-300 text-sm"
          {...inputProps}
        />
      </div>
    </motion.div>
  );

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px]"
          style={{ background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 60%)' }} />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px]"
          style={{ background: 'radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, transparent 60%)' }} />
      </div>

      {/* Registration Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md z-10 relative"
      >
        {/* Outer glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[var(--neon-cyan)] via-[var(--neon-purple)] to-[var(--neon-cyan)] rounded-3xl opacity-15 blur-2xl"
          style={{ animation: 'neon-pulse 4s ease-in-out infinite' }} />

        {/* Card */}
        <motion.div
          className="relative p-8 md:p-10 rounded-3xl backdrop-blur-2xl"
          style={{
            background: 'rgba(7, 11, 26, 0.85)',
            border: '1px solid rgba(6, 182, 212, 0.2)',
            boxShadow: '0 0 40px rgba(6, 182, 212, 0.08), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo + Header */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-purple)] mb-4 relative">
              <Sparkles size={28} className="text-white" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--neon-cyan)] to-[var(--neon-purple)] blur-xl opacity-40" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 font-['Poppins']">
              Create Account
            </h1>
            <p className="text-[var(--text-muted)] text-sm">
              Join AI Chat and start exploring
            </p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField icon={User} label="Username" id="register-username"
              type="text" placeholder="Choose a username" value={username}
              onChange={(e) => setUsername(e.target.value)} required />

            <InputField icon={Mail} label="Email Address" id="register-email"
              type="email" placeholder="you@example.com" value={email}
              onChange={(e) => setEmail(e.target.value)} required />

            {/* Password */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2 ml-1">Password</label>
              <div className="relative group">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--neon-purple)] opacity-60 group-focus-within:opacity-100 transition-opacity" />
                <input type={showPassword ? 'text' : 'password'} placeholder="Create a password (min 6 chars)"
                  value={password} onChange={(e) => setPassword(e.target.value)} required id="register-password"
                  className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(124,58,237,0.2)] text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--neon-purple)] focus:shadow-[0_0_20px_rgba(124,58,237,0.2)] transition-all duration-300 text-sm"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-white transition-colors">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </motion.div>

            <InputField icon={Lock} label="Confirm Password" id="register-confirm-password"
              type="password" placeholder="Confirm your password" value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} required />

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-2 text-red-400 text-sm"
              >
                <span>⚠</span>
                {error}
              </motion.div>
            )}

            {/* Submit */}
            <motion.div variants={itemVariants} className="pt-2">
              <button type="submit" disabled={loading} id="register-submit"
                className="neon-btn w-full py-3.5 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Sparkles size={16} />
                    Create Account
                  </>
                )}
              </button>
            </motion.div>
          </form>

          {/* Login Link */}
          <motion.div variants={itemVariants} className="text-center mt-8 pt-6 border-t border-[rgba(6,182,212,0.1)]">
            <p className="text-[var(--text-muted)] text-sm">
              Already have an account?{' '}
              <a href="/login" className="text-[var(--neon-cyan-light)] font-semibold hover:text-[var(--neon-purple-light)] transition-colors">
                Sign in
              </a>
            </p>
          </motion.div>
        </motion.div>

        {/* Bottom accent line */}
        <motion.div
          className="mt-4 h-0.5 mx-12 rounded-full bg-gradient-to-r from-[var(--neon-cyan)] via-[var(--neon-purple)] to-[var(--neon-cyan)]"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </div>
  );
}
