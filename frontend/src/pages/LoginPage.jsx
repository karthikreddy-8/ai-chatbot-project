import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Mail, Lock, Eye, EyeOff, User, ArrowRight, Cpu,
  Check, ChevronDown, BookOpen, Code2, Users, Globe,
  Sparkles, GraduationCap, Brain, Zap
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../context/ToastContext';
import ParticleCanvas from '../components/ui/ParticleCanvas';

/* ── Password strength ── */
function getStrength(pw) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}
const STRENGTH_LABELS = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const STRENGTH_COLORS = ['', '#EF4444', '#F59E0B', '#3B82F6', '#10B981'];

/* ── Neural network SVG illustration ── */
function NeuralSVG() {
  return (
    <svg viewBox="0 0 240 160" className="w-full max-w-xs mx-auto opacity-60" aria-hidden="true">
      {/* Layer 1 */}
      {[30, 60, 90, 120].map((y, i) => (
        <g key={`l1-${i}`}>
          <circle cx="40" cy={y} r="7" fill="rgba(59,130,246,0.5)" stroke="#3B82F6" strokeWidth="1" />
        </g>
      ))}
      {/* Layer 2 */}
      {[45, 80, 115].map((y, i) => (
        <g key={`l2-${i}`}>
          <circle cx="120" cy={y} r="8" fill="rgba(139,92,246,0.5)" stroke="#8B5CF6" strokeWidth="1" />
        </g>
      ))}
      {/* Layer 3 */}
      {[60, 100].map((y, i) => (
        <g key={`l3-${i}`}>
          <circle cx="200" cy={y} r="9" fill="rgba(6,182,212,0.5)" stroke="#06B6D4" strokeWidth="1" />
        </g>
      ))}
      {/* Connections L1→L2 */}
      {[30, 60, 90, 120].map(y1 =>
        [45, 80, 115].map(y2 => (
          <line key={`${y1}-${y2}`} x1="47" y1={y1} x2="112" y2={y2} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        ))
      )}
      {/* Connections L2→L3 */}
      {[45, 80, 115].map(y1 =>
        [60, 100].map(y2 => (
          <line key={`${y1}-${y2}-r`} x1="128" y1={y1} x2="191" y2={y2} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        ))
      )}
    </svg>
  );
}

const BRANCHES = ['CSE', 'ECE', 'ME', 'CE', 'EEE', 'IT', 'Chemical', 'Other'];
const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

export default function LoginPage() {
  const [tab, setTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [username, setUsername] = useState('');
  const [branch, setBranch] = useState('');
  const [year, setYear] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const { login, register } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const strength = tab === 'register' ? getStrength(password) : 0;

  const validate = () => {
    const errors = {};
    if (!email) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Invalid email address';
    if (!password) errors.password = 'Password is required';
    else if (password.length < 6) errors.password = 'Minimum 6 characters';
    if (tab === 'register') {
      if (!username.trim()) errors.username = 'Name is required';
      if (confirmPass !== password) errors.confirmPass = 'Passwords do not match';
      if (!branch) errors.branch = 'Please select your branch';
      if (!year) errors.year = 'Please select your year';
      if (!agreed) errors.agreed = 'Please accept the terms';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      if (tab === 'login') {
        await login(email, password);
        toast.success('Welcome back to NexusAI!');
      } else {
        await register(username, email, password);
        toast.success('Account created! Welcome to NexusAI.');
      }
      navigate('/workspace');
    } catch (err) {
      toast.error(err?.message || 'Authentication failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] font-sans flex overflow-hidden">

      {/* ═══ LEFT PANEL (60%) ══════════════════════════════════ */}
      <div className="hidden lg:flex flex-col items-center justify-center w-3/5 relative overflow-hidden">
        <ParticleCanvas />
        <div className="absolute inset-0 cosmos-grid opacity-50 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-md mx-auto px-10 space-y-10"
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-purple)] flex items-center justify-center shadow-[var(--shadow-glow-blue)]">
              <Cpu size={26} className="text-white" />
            </div>
            <div>
              <div className="text-2xl font-extrabold tracking-tight">Nexus<span className="gradient-text">AI</span></div>
              <div className="text-xs text-[var(--text-muted)]">Engineering Intelligence Platform</div>
            </div>
          </div>

          {/* Tagline */}
          <div>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight mb-3">
              Your Intelligent<br /><span className="gradient-text">Co-Pilot</span> for<br />Engineering Excellence
            </h1>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              The AI workspace built exclusively for B.Tech students. Premium. Powerful. Free.
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-4">
            {[
              { icon: Brain, text: 'Personalized AI for your engineering subjects', color: 'from-blue-600 to-blue-500' },
              { icon: Code2, text: 'Code help, DSA, projects — all in one place', color: 'from-purple-600 to-purple-500' },
              { icon: Users, text: 'Join 2,000+ engineering students already learning', color: 'from-cyan-600 to-cyan-500' },
            ].map(({ icon: Icon, text, color }) => (
              <div key={text} className="flex items-center gap-4">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shrink-0`}>
                  <Icon size={16} className="text-white" />
                </div>
                <span className="text-sm text-[var(--text-secondary)]">{text}</span>
              </div>
            ))}
          </div>

          {/* Neural SVG */}
          <div className="opacity-80">
            <NeuralSVG />
          </div>
        </motion.div>
      </div>

      {/* ═══ RIGHT PANEL (40%) ═════════════════════════════════ */}
      <div className="flex-1 lg:w-2/5 flex items-center justify-center p-6 lg:p-10 relative z-10">
        {/* Mobile background */}
        <div className="lg:hidden absolute inset-0">
          <ParticleCanvas />
          <div className="absolute inset-0 cosmos-grid opacity-30" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-[440px] glass-card p-8 sm:p-10 space-y-6"
          style={{ background: 'rgba(17,24,39,0.85)' }}
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-purple)] flex items-center justify-center">
              <Cpu size={18} className="text-white" />
            </div>
            <span className="font-bold text-lg">Nexus<span className="gradient-text">AI</span></span>
          </div>

          {/* Tab toggle */}
          <div className="flex border-b border-[var(--border-subtle)]">
            {[
              { id: 'login', label: 'Sign In' },
              { id: 'register', label: 'Create Account' },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => { setTab(t.id); setFieldErrors({}); }}
                className={`flex-1 pb-3 text-sm font-semibold transition-all relative ${
                  tab === t.id
                    ? 'text-[var(--text-primary)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                }`}
              >
                {t.label}
                {tab === t.id && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-purple)] rounded-full"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Heading */}
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-xl font-bold">
                {tab === 'login' ? 'Welcome back 👋' : 'Join NexusAI — It\'s Free'}
              </h2>
              <p className="text-sm text-[var(--text-muted)] mt-1">
                {tab === 'login'
                  ? 'Sign in to continue your learning journey'
                  : 'Create your account to access the AI workspace'}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <AnimatePresence mode="wait">
              {tab === 'register' && (
                <motion.div
                  key="name-field"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FieldWrapper label="Full Name" icon={User} error={fieldErrors.username}>
                    <input
                      type="text"
                      placeholder="e.g. Arjun Mehta"
                      value={username}
                      onChange={e => { setUsername(e.target.value); setFieldErrors(p => ({ ...p, username: '' })); }}
                      className={`input-field pl-10 ${fieldErrors.username ? 'error' : ''}`}
                      autoComplete="name"
                    />
                  </FieldWrapper>
                </motion.div>
              )}
            </AnimatePresence>

            <FieldWrapper label="Email Address" icon={Mail} error={fieldErrors.email}>
              <input
                type="email"
                placeholder="student@college.edu"
                value={email}
                onChange={e => { setEmail(e.target.value); setFieldErrors(p => ({ ...p, email: '' })); }}
                className={`input-field pl-10 ${fieldErrors.email ? 'error' : email && !fieldErrors.email ? 'success' : ''}`}
                autoComplete="email"
              />
            </FieldWrapper>

            <FieldWrapper label="Password" icon={Lock} error={fieldErrors.password}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••"
                value={password}
                onChange={e => { setPassword(e.target.value); setFieldErrors(p => ({ ...p, password: '' })); }}
                className={`input-field pl-10 pr-10 ${fieldErrors.password ? 'error' : ''}`}
                autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </FieldWrapper>

            <AnimatePresence mode="wait">
              {tab === 'register' && (
                <motion.div
                  key="register-extra"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  {/* Password strength */}
                  {password && (
                    <div className="space-y-1.5">
                      <div className="flex gap-1">
                        {[1,2,3,4].map(i => (
                          <div
                            key={i}
                            className="flex-1 h-1 rounded-full transition-all duration-300"
                            style={{ background: i <= strength ? STRENGTH_COLORS[strength] : 'rgba(255,255,255,0.1)' }}
                          />
                        ))}
                      </div>
                      {strength > 0 && (
                        <p className="text-xs" style={{ color: STRENGTH_COLORS[strength] }}>
                          {STRENGTH_LABELS[strength]} password
                        </p>
                      )}
                    </div>
                  )}

                  {/* Confirm password */}
                  <FieldWrapper label="Confirm Password" icon={Lock} error={fieldErrors.confirmPass}>
                    <input
                      type={showConfirmPass ? 'text' : 'password'}
                      placeholder="Re-enter your password"
                      value={confirmPass}
                      onChange={e => { setConfirmPass(e.target.value); setFieldErrors(p => ({ ...p, confirmPass: '' })); }}
                      className={`input-field pl-10 pr-10 ${fieldErrors.confirmPass ? 'error' : confirmPass && confirmPass === password ? 'success' : ''}`}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPass(!showConfirmPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                      aria-label="Toggle confirm password"
                    >
                      {showConfirmPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </FieldWrapper>

                  {/* Branch & Year */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-[var(--text-muted)] mb-1.5 font-medium">Branch</label>
                      <div className="relative">
                        <select
                          value={branch}
                          onChange={e => { setBranch(e.target.value); setFieldErrors(p => ({ ...p, branch: '' })); }}
                          className={`input-field pr-8 appearance-none ${fieldErrors.branch ? 'error' : ''}`}
                        >
                          <option value="">Select</option>
                          {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
                      </div>
                      {fieldErrors.branch && <p className="text-xs text-[var(--brand-red)] mt-1">{fieldErrors.branch}</p>}
                    </div>
                    <div>
                      <label className="block text-xs text-[var(--text-muted)] mb-1.5 font-medium">Year</label>
                      <div className="relative">
                        <select
                          value={year}
                          onChange={e => { setYear(e.target.value); setFieldErrors(p => ({ ...p, year: '' })); }}
                          className={`input-field pr-8 appearance-none ${fieldErrors.year ? 'error' : ''}`}
                        >
                          <option value="">Select</option>
                          {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
                      </div>
                      {fieldErrors.year && <p className="text-xs text-[var(--brand-red)] mt-1">{fieldErrors.year}</p>}
                    </div>
                  </div>

                  {/* Terms */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={e => { setAgreed(e.target.checked); setFieldErrors(p => ({ ...p, agreed: '' })); }}
                      className="mt-0.5 rounded border-[var(--border-strong)] bg-[var(--bg-input)] accent-[var(--brand-primary)]"
                    />
                    <span className="text-xs text-[var(--text-muted)] leading-relaxed">
                      I agree to the <button type="button" className="text-[var(--brand-primary)] underline underline-offset-2">Terms of Service</button> and <button type="button" className="text-[var(--brand-primary)] underline underline-offset-2">Privacy Policy</button>
                    </span>
                  </label>
                  {fieldErrors.agreed && <p className="text-xs text-[var(--brand-red)]">{fieldErrors.agreed}</p>}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Remember me / Forgot password */}
            {tab === 'login' && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="rounded border-[var(--border-strong)] bg-[var(--bg-input)] accent-[var(--brand-primary)]"
                  />
                  <span className="text-xs text-[var(--text-secondary)]">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => toast.info('Password reset link will be sent to your email.')}
                  className="text-xs text-[var(--brand-primary)] hover:underline underline-offset-2 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 text-sm font-semibold justify-center"
            >
              {loading
                ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Authenticating...</span>
                : tab === 'login'
                  ? <>Sign In to NexusAI <ArrowRight size={16} /></>
                  : <>Create My Account <ArrowRight size={16} /></>
              }
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-[var(--border-subtle)]" />
            <span className="text-xs text-[var(--text-muted)]">or continue with</span>
            <div className="flex-1 h-px bg-[var(--border-subtle)]" />
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => { login('google@nexusai.dev', 'google-demo'); navigate('/workspace'); }}
              className="btn-secondary justify-center py-2.5 text-xs gap-2"
            >
              <Globe size={15} className="text-red-400" /> Google
            </button>
            <button
              type="button"
              onClick={() => { login('github@nexusai.dev', 'github-demo'); navigate('/workspace'); }}
              className="btn-secondary justify-center py-2.5 text-xs gap-2"
            >
              <Zap size={15} /> GitHub
            </button>
          </div>

          {/* Switch tab */}
          <p className="text-center text-sm text-[var(--text-muted)]">
            {tab === 'login'
              ? <>Don't have an account? <button onClick={() => setTab('register')} className="text-[var(--brand-primary)] font-medium hover:underline underline-offset-2">Create one →</button></>
              : <>Already have an account? <button onClick={() => setTab('login')} className="text-[var(--brand-primary)] font-medium hover:underline underline-offset-2">Sign in →</button></>
            }
          </p>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Reusable field wrapper with floating icon + error ── */
function FieldWrapper({ label, icon: Icon, error, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-[var(--text-muted)]">{label}</label>
      <div className="relative">
        <Icon size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
        {children}
      </div>
      {error && (
        <p className="text-xs text-[var(--brand-red)]" role="alert" aria-live="polite">{error}</p>
      )}
    </div>
  );
}
