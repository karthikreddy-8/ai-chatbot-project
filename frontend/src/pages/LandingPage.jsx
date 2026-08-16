import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Cpu, Menu, X, ArrowRight, Play, ChevronRight,
  Code2, FileText, Bug, GitBranch, Mic, FileImage,
  BookOpen, Layers, Star, Check, Zap, Brain,
  GraduationCap, Users, Globe
} from 'lucide-react';
import ParticleCanvas from '../components/ui/ParticleCanvas';
import { useTheme } from '../hooks/useTheme';

/* ── Stagger animation variants ── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

/* ── Scroll reveal hook ── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

/* ── Data ── */
const QUICK_CARDS = [
  { icon: Code2,     title: 'Explain Code',    desc: 'Paste any code, get crystal-clear explanations with examples.', color: 'from-blue-600 to-blue-500',    prompt: 'Explain this code:' },
  { icon: FileText,  title: 'Upload PDF',       desc: 'Chat with your textbooks and study materials instantly.',        color: 'from-purple-600 to-purple-500', prompt: 'Summarize this PDF:' },
  { icon: Bug,       title: 'Debug Program',    desc: 'Find and fix bugs in seconds with step-by-step reasoning.',      color: 'from-red-600 to-rose-500',      prompt: 'Debug my code:' },
  { icon: GitBranch, title: 'DSA Mentor',       desc: 'Master arrays, trees, graphs, and DP step by step.',             color: 'from-green-600 to-emerald-500', prompt: 'Teach me DSA:' },
  { icon: Mic,       title: 'Mock Interview',   desc: 'Practice HR + technical rounds with real-time AI feedback.',     color: 'from-amber-600 to-yellow-500',  prompt: 'Start a mock interview' },
  { icon: FileImage, title: 'Resume Builder',   desc: 'Generate ATS-optimized resumes for top tech companies.',         color: 'from-cyan-600 to-sky-500',      prompt: 'Help me build a resume' },
  { icon: Layers,    title: 'Image Analysis',   desc: 'Upload circuit diagrams and get AI interpretation.',             color: 'from-pink-600 to-fuchsia-500',  prompt: 'Analyze my image' },
  { icon: BookOpen,  title: 'Project Guide',    desc: 'Get complete final year project roadmaps and viva prep.',        color: 'from-indigo-600 to-violet-500', prompt: 'Guide my final year project' },
];

const FEATURES = [
  {
    title: 'Code Like a Senior Engineer',
    desc: 'Get instant, expert-level explanations for any code snippet. Supports Python, Java, C, C++, SQL, Shell, and more. Debug, refactor, and optimize — in seconds.',
    side: 'left',
    visual: 'code',
  },
  {
    title: 'Master DSA Without Confusion',
    desc: 'From arrays to dynamic programming, every concept explained with visual examples, time complexity breakdowns, and practice problems tuned to your level.',
    side: 'right',
    visual: 'dsa',
  },
  {
    title: 'Crack Placements with Confidence',
    desc: 'AI-powered technical and HR mock interviews. Resume ATS review. Aptitude prep. Real-time feedback that adapts to your weak spots.',
    side: 'left',
    visual: 'interview',
  },
  {
    title: 'Understand PDFs and Research Papers',
    desc: 'Upload lecture notes, textbooks, or research papers. Ask questions, get summaries, generate MCQs — all from your own documents.',
    side: 'right',
    visual: 'pdf',
  },
];

const TECH_STACK = ['React', 'Node.js', 'FastAPI', 'OpenCV', 'Ollama', 'JWT', 'SQLite', 'Python', 'TailwindCSS', 'Vite'];

const TESTIMONIALS = [
  {
    name: 'Arjun Mehta', college: 'NIT Trichy', branch: 'CSE · 4th Year',
    quote: 'NexusAI helped me understand Dijkstra\'s algorithm in 10 minutes after struggling for days. The visual explanation + code combo is unmatched.',
    rating: 5,
  },
  {
    name: 'Priya Sharma', college: 'VIT Vellore', branch: 'ECE · 3rd Year',
    quote: 'The mock interview feature is genuinely scary-good. It asked me OS scheduling questions I got in my actual TCS interview. Placed in 2 weeks.',
    rating: 5,
  },
  {
    name: 'Rohit Kumar', college: 'BITS Pilani', branch: 'IT · 4th Year',
    quote: 'I uploaded my entire DBMS textbook PDF and just chatted with it. Generated 50 MCQs in 30 seconds. This is my entire exam prep now.',
    rating: 5,
  },
];

/* ── Code Visual Mock ── */
function CodeVisual() {
  return (
    <div className="bg-[#0D1117] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8 bg-[#161b22]">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-2 text-xs text-white/40 font-mono">quick_sort.py</span>
      </div>
      <div className="p-5 font-mono text-sm leading-relaxed">
        <div><span className="text-purple-400">def</span> <span className="text-blue-400">quick_sort</span><span className="text-white">(arr):</span></div>
        <div className="ml-4"><span className="text-gray-500"># Base case</span></div>
        <div className="ml-4"><span className="text-purple-400">if</span> <span className="text-blue-300">len</span>(arr) <span className="text-white">{'<='}</span> <span className="text-orange-400">1</span>:</div>
        <div className="ml-8"><span className="text-purple-400">return</span> arr</div>
        <div className="ml-4"><span className="text-yellow-400">pivot</span> = arr[<span className="text-blue-300">len</span>(arr) <span className="text-white">//</span> <span className="text-orange-400">2</span>]</div>
        <div className="ml-4"><span className="text-cyan-400">left</span>  = [x <span className="text-purple-400">for</span> x <span className="text-purple-400">in</span> arr <span className="text-purple-400">if</span> x <span className="text-white">{'<'}</span> pivot]</div>
        <div className="ml-4"><span className="text-green-400">mid</span>   = [x <span className="text-purple-400">for</span> x <span className="text-purple-400">in</span> arr <span className="text-purple-400">if</span> x <span className="text-white">==</span> pivot]</div>
        <div className="ml-4"><span className="text-pink-400">right</span> = [x <span className="text-purple-400">for</span> x <span className="text-purple-400">in</span> arr <span className="text-purple-400">if</span> x <span className="text-white">{'>'}</span> pivot]</div>
        <div className="ml-4 mt-1"><span className="text-purple-400">return</span> quick_sort(<span className="text-cyan-400">left</span>) + <span className="text-green-400">mid</span> + quick_sort(<span className="text-pink-400">right</span>)</div>
        <div className="mt-3 px-3 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg text-xs">
          <span className="text-blue-400">⚡ NexusAI:</span>
          <span className="text-white/70 ml-2">O(N log N) average · O(N²) worst · Divide & Conquer paradigm</span>
        </div>
      </div>
    </div>
  );
}

/* ── DSA Visual Mock ── */
function DSAVisual() {
  return (
    <div className="glass-card p-6 space-y-4">
      <div className="text-xs font-semibold text-green-400 flex items-center gap-2">
        <GitBranch size={14} /> Binary Search Tree — O(log N) lookup
      </div>
      <div className="flex flex-col items-center gap-2 font-mono text-sm">
        <div className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-300">50</div>
        <div className="flex gap-10">
          <div className="flex flex-col items-center gap-1">
            <div className="w-px h-4 bg-white/20" />
            <div className="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300">30</div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center gap-1">
                <div className="w-px h-3 bg-white/20" />
                <div className="px-3 py-1.5 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-300">20</div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-px h-3 bg-white/20" />
                <div className="px-3 py-1.5 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-300">40</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-px h-4 bg-white/20" />
            <div className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-lg text-cyan-300">70</div>
          </div>
        </div>
      </div>
      <div className="text-xs text-white/50 text-center">Left subtree {'<'} Root {'<'} Right subtree</div>
    </div>
  );
}

/* ── Interview Visual Mock ── */
function InterviewVisual() {
  return (
    <div className="glass-card p-5 space-y-4">
      <div className="text-xs font-semibold text-amber-400 flex items-center gap-2">
        <Mic size={14} /> NexusAI Mock Interview — TCS NQT Prep
      </div>
      {[
        { role: 'AI', text: 'What is the time complexity of merge sort and why?', color: 'text-blue-300' },
        { role: 'You', text: 'It\'s O(N log N) in all cases. The divide step is O(log N) and each merge is O(N)...', color: 'text-white/80' },
        { role: 'AI', text: '✅ Correct! Now explain when you\'d prefer heap sort over merge sort.', color: 'text-green-300' },
      ].map((msg, i) => (
        <div key={i} className={`flex gap-3 items-start ${msg.role === 'You' ? 'flex-row-reverse' : ''}`}>
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${msg.role === 'AI' ? 'bg-blue-500/20 text-blue-300' : 'bg-purple-500/20 text-purple-300'}`}>
            {msg.role === 'AI' ? 'N' : 'U'}
          </div>
          <div className={`text-xs ${msg.color} bg-white/5 rounded-xl px-3 py-2 max-w-[80%]`}>{msg.text}</div>
        </div>
      ))}
    </div>
  );
}

/* ── PDF Visual Mock ── */
function PDFVisual() {
  return (
    <div className="glass-card p-5 space-y-3">
      <div className="text-xs font-semibold text-purple-400 flex items-center gap-2">
        <FileText size={14} /> DBMS_Notes.pdf — Chapter 4: Normalization
      </div>
      <div className="p-3 bg-white/5 rounded-xl border border-white/8 text-xs text-white/60 leading-relaxed">
        "...Normalization is the process of organizing data in a database to reduce redundancy and improve data integrity. The process involves..."
      </div>
      <div className="text-xs text-blue-400 font-medium">💬 You: Explain 3NF with an example</div>
      <div className="p-3 bg-blue-500/8 rounded-xl border border-blue-500/15 text-xs text-white/80 leading-relaxed">
        <span className="text-blue-400">NexusAI:</span> Third Normal Form (3NF) requires that a relation be in 2NF and that no transitive dependency exists...
        <span className="text-yellow-400 ml-1">📚 Related: BCNF, Functional Dependencies</span>
      </div>
    </div>
  );
}

/* ── Main LandingPage ── */
export default function LandingPage() {
  const navigate = useNavigate();
  const { themeMode, cycleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const featuresRef = useReveal();
  const cardsRef = useReveal();
  const techRef = useReveal();
  const testimonialsRef = useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goToWorkspace = () => navigate('/workspace');
  const goToLogin = () => navigate('/login');

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] font-sans overflow-x-hidden">
      {/* Skip to main */}
      <a href="#main" className="skip-to-main">Skip to main content</a>

      {/* Particle Background */}
      <ParticleCanvas />

      {/* Grid overlay */}
      <div className="fixed inset-0 cosmos-grid pointer-events-none z-0 opacity-60" aria-hidden="true" />

      {/* ═══ NAVBAR ══════════════════════════════════════════════ */}
      <header
        className={`fixed top-0 inset-x-0 z-50 h-16 transition-all duration-300 ${
          scrolled ? 'glass border-b border-[var(--border-subtle)]' : 'bg-transparent'
        }`}
        role="banner"
      >
        <div className="container-xl h-full flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 group" aria-label="NexusAI Home">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-purple)] flex items-center justify-center shadow-[var(--shadow-glow-blue)] group-hover:scale-105 transition-transform">
              <Cpu size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              Nexus<span className="gradient-text">AI</span>
            </span>
          </a>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {['Home', 'Features', 'About', 'Contact'].map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="px-4 py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-lg hover:bg-[var(--bg-hover)] transition-all"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            <button onClick={cycleTheme} className="btn-ghost p-2 text-[var(--text-muted)]" aria-label="Toggle theme">
              <Zap size={16} />
            </button>
            <button onClick={goToLogin} className="btn-secondary py-2 px-4 text-sm">Sign In</button>
            <button onClick={goToWorkspace} className="btn-primary py-2 px-4 text-sm">
              Start Free <ArrowRight size={14} />
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-[var(--text-secondary)]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile fullscreen menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden absolute top-16 inset-x-0 glass border-b border-[var(--border-subtle)] p-6 space-y-2"
            >
              {['Home', 'Features', 'About', 'Contact'].map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl text-sm hover:bg-[var(--bg-hover)] text-[var(--text-primary)]"
                >
                  {link}
                </motion.a>
              ))}
              <div className="pt-4 flex flex-col gap-2">
                <button onClick={() => { goToLogin(); setMobileMenuOpen(false); }} className="btn-secondary w-full justify-center text-sm">Sign In</button>
                <button onClick={() => { goToWorkspace(); setMobileMenuOpen(false); }} className="btn-primary w-full justify-center text-sm">Start Free →</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ═══ HERO ════════════════════════════════════════════════ */}
      <main id="main">
        <section id="home" className="relative min-h-screen flex flex-col items-center justify-center text-center pt-24 pb-16 px-4">

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 max-w-4xl mx-auto space-y-8"
          >
            {/* Badge pill */}
            <motion.div variants={itemVariants} className="flex justify-center">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium text-[var(--brand-primary)] border border-[rgba(59,130,246,0.35)] bg-[rgba(59,130,246,0.08)] rounded-full backdrop-blur-sm">
                <span className="text-yellow-400">✦</span>
                Powered by Advanced AI — Built for Engineers
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={itemVariants} className="text-hero font-extrabold tracking-[-0.04em] leading-[1.03]">
              <span className="block text-[var(--text-primary)]">Engineer Smarter,</span>
              <span className="block gradient-text">Build Faster,</span>
              <span className="block gradient-text-cyan">Learn Deeper.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="max-w-[580px] mx-auto text-lg text-[var(--text-secondary)] leading-relaxed"
            >
              The AI platform engineered for B.Tech students — master DSA, debug code, build projects,
              crack interviews, and analyze images, all in one intelligent workspace.
            </motion.p>

            {/* CTA group */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={goToWorkspace}
                className="btn-primary py-4 px-8 text-base font-semibold"
                id="hero-cta-primary"
              >
                Start Learning Free <ArrowRight size={18} />
              </button>
              <button
                onClick={goToLogin}
                className="btn-secondary py-4 px-8 text-base flex items-center gap-2"
                id="hero-cta-secondary"
              >
                <Play size={16} className="text-[var(--brand-primary)]" /> Watch Demo
              </button>
            </motion.div>

            {/* Tertiary link */}
            <motion.p variants={itemVariants} className="text-sm text-[var(--text-muted)]">
              <button onClick={goToWorkspace} className="underline underline-offset-3 hover:text-[var(--text-secondary)] transition-colors">
                Try Demo — no signup needed
              </button>
            </motion.p>

            {/* Social proof */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              {/* Avatars */}
              <div className="flex items-center">
                {['A', 'P', 'R', 'S', 'K'].map((initial, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-[var(--bg-base)] flex items-center justify-center text-xs font-bold text-white"
                    style={{
                      marginLeft: i === 0 ? 0 : -10,
                      background: `hsl(${i * 50 + 200}, 70%, 50%)`,
                      zIndex: 5 - i,
                      position: 'relative',
                    }}
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <div className="text-sm text-[var(--text-secondary)]">
                Trusted by <strong className="text-[var(--text-primary)]">2,000+</strong> engineering students across <strong className="text-[var(--text-primary)]">50+</strong> colleges
              </div>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(s => <Star key={s} size={14} className="text-amber-400 fill-amber-400" />)}
                <span className="text-sm text-[var(--text-secondary)] ml-1">4.9/5</span>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ═══ QUICK ACTION CARDS ══════════════════════════════ */}
        <section id="features" className="section-padding relative z-10">
          <div className="container-xl">
            <div ref={cardsRef} className="reveal text-center mb-12">
              <h2 className="text-display font-bold mb-3">Everything You Need to Excel</h2>
              <p className="text-[var(--text-secondary)] text-lg">Tap any tool to start instantly</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {QUICK_CARDS.map((card, i) => (
                <motion.button
                  key={card.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  onClick={() => navigate('/workspace')}
                  className="glass-card p-7 text-left group cursor-pointer hover:border-[rgba(59,130,246,0.25)] hover:shadow-[var(--shadow-glow-blue)] transition-all duration-300"
                  aria-label={`Open ${card.title}`}
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <card.icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-base font-bold mb-2 group-hover:text-[var(--brand-primary)] transition-colors">{card.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">{card.desc}</p>
                  <span className="text-xs font-semibold text-[var(--brand-primary)] flex items-center gap-1 group-hover:gap-2 transition-all">
                    Try Now <ChevronRight size={13} />
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ FEATURES — ALTERNATING EDITORIAL ═══════════════ */}
        <section className="section-padding relative z-10" aria-label="Product features">
          <div className="container-xl">
            <div ref={featuresRef} className="reveal text-center mb-16">
              <h2 className="text-display font-bold mb-3">A Complete AI Toolkit for Engineering</h2>
              <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto">
                Every tool a B.Tech student needs — from first year foundations to final year placement.
              </p>
            </div>

            <div className="space-y-24">
              {FEATURES.map((feat, i) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex flex-col ${feat.side === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}
                >
                  {/* Text side */}
                  <div className="flex-1 space-y-5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-purple)] flex items-center justify-center">
                      {i === 0 && <Code2 size={20} className="text-white" />}
                      {i === 1 && <GitBranch size={20} className="text-white" />}
                      {i === 2 && <Mic size={20} className="text-white" />}
                      {i === 3 && <FileText size={20} className="text-white" />}
                    </div>
                    <h3 className="text-title font-bold">{feat.title}</h3>
                    <p className="text-[var(--text-secondary)] text-base leading-relaxed max-w-md">{feat.desc}</p>
                    <button
                      onClick={goToWorkspace}
                      className="btn-primary py-2.5 px-6 text-sm"
                    >
                      Try It Free <ArrowRight size={14} />
                    </button>
                  </div>

                  {/* Visual side */}
                  <div className="flex-1 w-full max-w-lg">
                    {feat.visual === 'code'      && <CodeVisual />}
                    {feat.visual === 'dsa'       && <DSAVisual />}
                    {feat.visual === 'interview' && <InterviewVisual />}
                    {feat.visual === 'pdf'       && <PDFVisual />}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ TECH STACK TICKER ═══════════════════════════════ */}
        <section className="py-16 relative z-10 border-y border-[var(--border-subtle)]" aria-label="Technology stack">
          <div ref={techRef} className="reveal container-xl text-center mb-10">
            <h2 className="text-title font-bold mb-2">Built with Industry-Grade Technology</h2>
            <p className="text-[var(--text-secondary)] text-sm">The same stack that powers real-world products</p>
          </div>
          <div className="overflow-hidden">
            <div className="flex gap-8 w-max" style={{ animation: 'ticker 20s linear infinite' }}>
              {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
                <div
                  key={`${tech}-${i}`}
                  className="flex items-center gap-2.5 px-5 py-2.5 glass-card text-sm font-medium text-[var(--text-secondary)] whitespace-nowrap hover:text-[var(--text-primary)] hover:[animation-play-state:paused] transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-purple)]" />
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ TESTIMONIALS ════════════════════════════════════ */}
        <section className="section-padding relative z-10" aria-label="Student testimonials">
          <div className="container-xl">
            <div ref={testimonialsRef} className="reveal text-center mb-12">
              <h2 className="text-display font-bold mb-3">Loved by Engineering Students</h2>
              <p className="text-[var(--text-secondary)] text-lg">Real students, real results.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="glass-card p-7 space-y-4"
                >
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(s => <Star key={s} size={14} className="text-amber-400 fill-amber-400" />)}
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed italic">"{t.quote}"</p>
                  <div className="flex items-center gap-3 pt-2 border-t border-[var(--border-subtle)]">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-purple)] flex items-center justify-center text-sm font-bold text-white">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[var(--text-primary)]">{t.name}</div>
                      <div className="text-xs text-[var(--text-muted)]">{t.college} · {t.branch}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CTA SECTION ═════════════════════════════════════ */}
        <section className="section-padding relative z-10">
          <div className="container-xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-12 md:p-20 text-center space-y-6 relative overflow-hidden border border-[rgba(59,130,246,0.15)]"
              style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.06), rgba(139,92,246,0.06))' }}
            >
              <div className="absolute inset-0 cosmos-grid opacity-30 pointer-events-none" />
              <GraduationCap size={48} className="mx-auto text-[var(--brand-primary)]" />
              <h2 className="text-display font-bold">Ready to Engineer Your Future?</h2>
              <p className="text-[var(--text-secondary)] text-lg max-w-md mx-auto">
                Join 2,000+ students already using NexusAI to crack placements and ace their degrees.
              </p>
              <button onClick={goToWorkspace} className="btn-primary py-4 px-10 text-base font-semibold">
                Get Started — It's Free <ArrowRight size={18} />
              </button>
              <p className="text-xs text-[var(--text-muted)]">No credit card required · Full access instantly</p>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ═══ FOOTER ══════════════════════════════════════════════ */}
      <footer className="relative z-10 border-t border-[var(--border-subtle)] bg-[var(--bg-subtle)]" role="contentinfo">
        <div className="container-xl py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-purple)] flex items-center justify-center">
                  <Cpu size={16} className="text-white" />
                </div>
                <span className="font-bold">Nexus<span className="gradient-text">AI</span></span>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed max-w-[180px]">
                Your Intelligent Co-Pilot for Engineering Excellence
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4">Product</h4>
              <ul className="space-y-2.5">
                {['Chat Workspace', 'Image Analysis', 'PDF Assistant', 'Resume Builder', 'Mock Interview'].map(l => (
                  <li key={l}><button onClick={goToWorkspace} className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">{l}</button></li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4">Resources</h4>
              <ul className="space-y-2.5">
                {['Documentation', 'DSA Handbook', 'Interview Prep', 'Project Ideas', 'About'].map(l => (
                  <li key={l}><button className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">{l}</button></li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4">Connect</h4>
              <ul className="space-y-2.5">
                {['GitHub', 'LinkedIn', 'Twitter / X', 'Discord', 'Contact'].map(l => (
                  <li key={l}><button className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1">{l}</button></li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-[var(--border-subtle)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[var(--text-muted)]">© 2026 NexusAI. Crafted for Engineers.</p>
            <div className="flex items-center gap-4">
              <button className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">Privacy</button>
              <button className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">Terms</button>
              <button
                onClick={cycleTheme}
                className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors border border-[var(--border-subtle)] px-2.5 py-1 rounded-lg"
                aria-label="Toggle color theme"
              >
                <Zap size={12} /> {themeMode} mode
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}