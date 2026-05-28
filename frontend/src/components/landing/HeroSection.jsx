import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Rocket, ArrowRight, ShieldCheck, Compass, Sparkles } from 'lucide-react';

export default function HeroSection() {
  const navigate = useNavigate();

  const handleLaunch = () => {
    navigate('/login');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden bg-slate-950/20"
    >
      {/* Stars backgrounds */}
      <div className="stars-container">
        <div className="stars-layer-1" />
        <div className="stars-layer-2" />
        
        {/* Warp speed laser lines */}
        <div className="warp-line" style={{ top: '20%', left: '10%', width: '150px', animationDelay: '0s' }} />
        <div className="warp-line" style={{ top: '45%', left: '70%', width: '250px', animationDelay: '1.2s' }} />
        <div className="warp-line" style={{ top: '70%', left: '30%', width: '180px', animationDelay: '2.5s' }} />
        <div className="warp-line" style={{ top: '85%', left: '5%', width: '220px', animationDelay: '0.7s' }} />
      </div>

      {/* Floating glowing background nebulas */}
      <div className="absolute top-[20%] right-[10%] w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-violet-600/10 blur-[80px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] left-[5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-cyan-500/10 blur-[80px] pointer-events-none z-0" />

      {/* Grid line dashboard HUD grid overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(2,6,23,0.85))] pointer-events-none z-2" />

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Side: Cinematic Typography */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-start text-left"
        >
          {/* Tagline pill */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 backdrop-blur-md mb-6 hover:border-cyan-500/30 transition-all duration-300 group cursor-default"
          >
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider text-slate-300 uppercase">
              Interstellar Travel Partner
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl xl:text-8xl font-black tracking-tight text-white leading-none mb-6"
          >
            Voyage Into <br />
            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-500 bg-clip-text text-transparent cosmos-glow-text">
              Deep COSMOS
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed font-light"
          >
            Explore luxury suborbital voyages, deep planetary vacations, and warp-drive interstellar expeditions. Guided by our conversational co-pilot <span className="text-cyan-400 font-semibold">Nexus AI</span> for live navigation and support.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto"
          >
            <button
              onClick={handleLaunch}
              className="px-8 py-4 rounded-full text-base font-bold text-white bg-gradient-to-r from-violet-600 to-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <Rocket className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform" />
              Launch Voyager AI
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#fleet"
              className="px-8 py-4 rounded-full text-base font-semibold text-slate-200 border border-white/10 hover:border-cyan-500/40 hover:text-white bg-slate-900/30 backdrop-blur-sm transition-all duration-300 text-center hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] cursor-pointer"
            >
              Inspect Fleet
            </a>
          </motion.div>

          {/* Micro HUD elements */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10 w-full max-w-xl"
          >
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-black text-cyan-400 flex items-center gap-1.5">
                <Compass className="w-5 h-5" /> Warp 9.8
              </span>
              <span className="text-xs tracking-wider text-slate-400 uppercase">Max Velocity</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-black text-violet-400 flex items-center gap-1.5">
                <ShieldCheck className="w-5 h-5" /> 100%
              </span>
              <span className="text-xs tracking-wider text-slate-400 uppercase">Shield Rating</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-black text-pink-400">22,500</span>
              <span className="text-xs tracking-wider text-slate-400 uppercase">Star Routes</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side: Holographic Spaceship SVG HUD Art */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotateY: 20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="lg:col-span-5 flex justify-center relative select-none"
        >
          {/* Hologram Ring Glows */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-violet-600/10 to-transparent blur-[40px] pointer-events-none rounded-full" />
          
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-full max-w-[400px] h-[400px]"
          >
            {/* SVG Starship and HUD Overlay */}
            <svg
              viewBox="0 0 500 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-[0_0_35px_rgba(6,182,212,0.5)]"
            >
              {/* Outer HUD Rings */}
              <circle cx="250" cy="250" r="230" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1" strokeDasharray="5 15" />
              <circle cx="250" cy="250" r="200" stroke="rgba(124, 58, 237, 0.3)" strokeWidth="1.5" />
              <circle cx="250" cy="250" r="190" stroke="rgba(6, 182, 212, 0.15)" strokeWidth="1" strokeDasharray="40 10" />

              {/* HUD Axis Lines */}
              <line x1="50" y1="250" x2="450" y2="250" stroke="rgba(6, 182, 212, 0.1)" strokeWidth="1" />
              <line x1="250" y1="50" x2="250" y2="450" stroke="rgba(6, 182, 212, 0.1)" strokeWidth="1" />

              {/* Starship paths / vectors */}
              <path d="M250 80 L320 280 L250 250 L180 280 Z" fill="url(#shipGrad)" stroke="rgba(6, 182, 212, 0.8)" strokeWidth="2" />
              <path d="M250 250 L275 320 L250 300 L225 320 Z" fill="rgba(6, 182, 212, 0.3)" stroke="rgba(6, 182, 212, 0.5)" strokeWidth="1" />
              
              {/* Thruster exhaust glow */}
              <circle cx="250" cy="305" r="10" fill="#EC4899" opacity="0.8" className="animate-ping" />
              <path d="M250 300 L265 370 L250 350 L235 370 Z" fill="url(#thrusterGrad)" opacity="0.7" />

              {/* Geometric crosshairs */}
              <rect x="245" y="45" width="10" height="10" stroke="rgba(6, 182, 212, 0.6)" strokeWidth="1" />
              <rect x="245" y="445" width="10" height="10" stroke="rgba(6, 182, 212, 0.6)" strokeWidth="1" />
              <rect x="45" y="245" width="10" height="10" stroke="rgba(6, 182, 212, 0.6)" strokeWidth="1" />
              <rect x="445" y="245" width="10" height="10" stroke="rgba(6, 182, 212, 0.6)" strokeWidth="1" />

              {/* Gradients */}
              <defs>
                <linearGradient id="shipGrad" x1="250" y1="80" x2="250" y2="280" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#020617" stopOpacity="0.6" />
                </linearGradient>
                <linearGradient id="thrusterGrad" x1="250" y1="300" x2="250" y2="370" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#EC4899" />
                  <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Realtime stats hud mock bubble */}
            <div className="absolute top-10 right-4 px-4 py-2 rounded-xl bg-slate-900/80 border border-white/10 backdrop-blur-md shadow-lg text-[10px] font-mono text-cyan-400 flex flex-col gap-0.5 pointer-events-none">
              <span className="text-white font-bold uppercase tracking-wider">NAV CORE ACTIVE</span>
              <span>HDOP: 0.82 | VDOP: 1.04</span>
              <span>PING: 14 ms (COSMOS AI)</span>
            </div>
            
            <div className="absolute bottom-10 left-4 px-4 py-2 rounded-xl bg-slate-900/80 border border-white/10 backdrop-blur-md shadow-lg text-[10px] font-mono text-pink-400 flex flex-col gap-0.5 pointer-events-none">
              <span className="text-white font-bold uppercase tracking-wider">PROPULSION STATS</span>
              <span>WARP INTEGRITY: 99.8%</span>
              <span>FUSION DISSIPATOR: OK</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
