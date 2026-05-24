import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

/**
 * LoginForm — Premium glassmorphism login form with neon glow effects.
 * Features: email/password fields, Google login button, animated transitions.
 */
export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/chat');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.detail || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden">

      {/* Ambient Background Glows */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px]"
          style={{ background: 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 60%)' }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px]"
          style={{ background: 'radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 60%)' }} />
        <div className="absolute top-[40%] left-[50%] w-[400px] h-[400px] -translate-x-1/2"
          style={{ background: 'radial-gradient(circle, rgba(124, 58, 237, 0.06) 0%, transparent 50%)' }} />
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md z-10 relative"
      >
        {/* Outer glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[var(--neon-purple)] via-[var(--neon-cyan)] to-[var(--neon-purple)] rounded-3xl opacity-15 blur-2xl"
          style={{ animation: 'neon-pulse 4s ease-in-out infinite' }} />

        {/* Card */}
        <motion.div
          className="relative p-8 md:p-10 rounded-3xl backdrop-blur-2xl"
          style={{
            background: 'rgba(7, 11, 26, 0.85)',
            border: '1px solid rgba(124, 58, 237, 0.2)',
            boxShadow: '0 0 40px rgba(124, 58, 237, 0.1), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo + Header */}
          <motion.div variants={itemVariants} className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--neon-purple)] to-[var(--neon-cyan)] mb-4 relative">
              <Sparkles size={28} className="text-white" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--neon-purple)] to-[var(--neon-cyan)] blur-xl opacity-40" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 font-['Poppins']">
              Welcome Back
            </h1>
            <p className="text-[var(--text-muted)] text-sm">
              Sign in to your AI Chat account
            </p>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2 ml-1">Email Address</label>
              <div className="relative group">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--neon-purple)] opacity-60 group-focus-within:opacity-100 transition-opacity" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  id="login-email"
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(124,58,237,0.2)] text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--neon-purple)] focus:shadow-[0_0_20px_rgba(124,58,237,0.2)] transition-all duration-300 text-sm"
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2 ml-1">Password</label>
              <div className="relative group">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--neon-purple)] opacity-60 group-focus-within:opacity-100 transition-opacity" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  id="login-password"
                  className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(124,58,237,0.2)] text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--neon-purple)] focus:shadow-[0_0_20px_rgba(124,58,237,0.2)] transition-all duration-300 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </motion.div>

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

            {/* Remember Me & Forgot Password */}
            <motion.div variants={itemVariants} className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-secondary)] cursor-pointer transition-colors">
                <input type="checkbox" className="w-4 h-4 rounded border-[var(--neon-purple)]/30 bg-transparent accent-[var(--neon-purple)] cursor-pointer" />
                Remember me
              </label>
              <a href="#" className="text-[var(--neon-purple-light)] hover:text-[var(--neon-cyan)] transition-colors">
                Forgot Password?
              </a>
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants} className="pt-2">
              <button
                type="submit"
                disabled={loading}
                id="login-submit"
                className="neon-btn w-full py-3.5 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Sparkles size={16} />
                    Continue
                  </>
                )}
              </button>
            </motion.div>

            {/* Divider */}
            <motion.div variants={itemVariants} className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--neon-purple)]/20 to-transparent" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 text-[var(--text-muted)] bg-[#070B1A]">Or continue with</span>
              </div>
            </motion.div>

            {/* Google Login */}
            <motion.div variants={itemVariants}>
              <button
                type="button"
                onClick={() => console.log('Google login')}
                id="google-login"
                className="w-full py-3.5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] text-white font-medium text-sm flex items-center justify-center gap-3 hover:bg-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.2)] transition-all duration-300"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
            </motion.div>
          </form>

          {/* Sign Up Link */}
          <motion.div variants={itemVariants} className="text-center mt-8 pt-6 border-t border-[rgba(124,58,237,0.1)]">
            <p className="text-[var(--text-muted)] text-sm">
              Don't have an account?{' '}
              <a href="/register" className="text-[var(--neon-purple-light)] font-semibold hover:text-[var(--neon-cyan)] transition-colors">
                Sign up
              </a>
            </p>
          </motion.div>
        </motion.div>

        {/* Bottom accent glow line */}
        <motion.div
          className="mt-4 h-0.5 mx-12 rounded-full bg-gradient-to-r from-[var(--neon-purple)] via-[var(--neon-cyan)] to-[var(--neon-purple)]"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </div>
  );
}
