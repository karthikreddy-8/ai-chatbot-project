import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Eye, HeartHandshake, ThermometerSnowflake, Cpu } from 'lucide-react';

const GEAR_HOTSPOTS = [
  {
    id: 'visor',
    name: 'Smart HUD Visor',
    icon: Eye,
    x: '48%',
    y: '18%',
    description: 'Polarized liquid-glass faceplate embedded with a neural interface. Projects realtime oxygen flow rates, atmospheric scans, and coordinate map directories directly onto the retina.',
    spec: 'Refresh: 240Hz | Shield Rating: Class-IV',
  },
  {
    id: 'chest',
    name: 'Life Support Chestplate',
    icon: Shield,
    x: '48%',
    y: '40%',
    description: 'Equipped with triple-redundant oxygen scrubbers, liquid nitrogen active heating circuits, and a graphene-shielded fusion micro-battery core lasting 72 hours.',
    spec: 'Battery Life: 72 hrs | Reserve O2: 6 hrs',
  },
  {
    id: 'gloves',
    name: 'Telemetry Pulse Gloves',
    icon: HeartHandshake,
    x: '22%',
    y: '55%',
    description: 'Features carbon-nanotube structural fibers providing tactile feedback, active heating, and integrated electromagnetic clamps to secure lines on exterior ship walks.',
    spec: 'Max Grip: 450 kg | Temp Range: -180°C to +120°C',
  },
  {
    id: 'boots',
    name: 'Magnetic Anchoring Boots',
    icon: ThermometerSnowflake,
    x: '38%',
    y: '85%',
    description: 'Dynamic electromagnetic soles that align automatically to starship metal decks. Dampens vibration and facilitates vertical climb mobility in microgravity conditions.',
    spec: 'Clamping Velocity: 0.1s | Surface Grip: Variable HSL',
  },
];

export default function GearSection() {
  const [activeHotspot, setActiveHotspot] = useState(GEAR_HOTSPOTS[0]);

  return (
    <section id="gear" className="py-28 px-6 relative z-10 bg-slate-950/20">
      
      {/* Background radial highlight */}
      <div className="absolute top-[40%] right-[20%] w-[500px] h-[500px] bg-pink-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4"
          >
            Deep-Space <span className="bg-gradient-to-r from-violet-400 to-pink-500 bg-clip-text text-transparent">Telemetry Gear</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto"
          >
            Inspect the high-tech atmospheric armor and equipment designed to protect passengers under extreme extra-vehicular star systems.
          </motion.p>
        </div>

        {/* Blueprint & Interaction Grid */}
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Interactive Suit Blueprint Graphic */}
          <div className="lg:col-span-6 flex justify-center relative bg-slate-950/40 border border-white/5 rounded-3xl p-8 min-h-[500px] overflow-hidden select-none">
            
            {/* HUD Blueprint Grid Lines */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
            
            {/* SVG Astronaut Wireframe Outline */}
            <svg
              viewBox="0 0 200 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-[280px] h-auto opacity-40 drop-shadow-[0_0_10px_rgba(124,58,237,0.3)]"
            >
              {/* Helmet */}
              <circle cx="100" cy="70" r="30" stroke="#7C3AED" strokeWidth="1.5" />
              <ellipse cx="100" cy="70" rx="24" ry="18" fill="rgba(6, 182, 212, 0.15)" stroke="#06B6D4" strokeWidth="1" />

              {/* Neck & Shoulders */}
              <line x1="85" y1="100" x2="115" y2="100" stroke="#7C3AED" strokeWidth="1" />
              <path d="M100 100 L50 130 L45 220 L60 220 L65 145 L100 145 Z" fill="none" stroke="#7C3AED" strokeWidth="1" />
              <path d="M100 100 L150 130 L155 220 L140 220 L135 145 L100 145 Z" fill="none" stroke="#7C3AED" strokeWidth="1" />

              {/* Chest */}
              <rect x="68" y="125" width="64" height="95" rx="8" stroke="#7C3AED" strokeWidth="1.5" />
              <rect x="78" y="135" width="44" height="40" fill="rgba(255,255,255,0.03)" stroke="#7C3AED" strokeWidth="1" />

              {/* Waist & Legs */}
              <line x1="68" y1="220" x2="132" y2="220" stroke="#7C3AED" strokeWidth="1.5" />
              <path d="M68 220 L55 350 L75 350 L85 240 L100 240 Z" fill="none" stroke="#7C3AED" strokeWidth="1" />
              <path d="M132 220 L145 350 L125 350 L115 240 L100 240 Z" fill="none" stroke="#7C3AED" strokeWidth="1" />

              {/* Boots */}
              <rect x="53" y="350" width="22" height="15" rx="3" stroke="#7C3AED" strokeWidth="1" />
              <rect x="125" y="350" width="22" height="15" rx="3" stroke="#7C3AED" strokeWidth="1" />
            </svg>

            {/* Pulsing Hotspots */}
            {GEAR_HOTSPOTS.map((hotspot) => {
              const isActive = activeHotspot.id === hotspot.id;
              const HotspotIcon = hotspot.icon;
              return (
                <button
                  key={hotspot.id}
                  onClick={() => setActiveHotspot(hotspot)}
                  className="absolute p-2 rounded-full cursor-pointer transition-all duration-300"
                  style={{
                    left: hotspot.x,
                    top: hotspot.y,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10,
                  }}
                >
                  {/* Ripple pulse circle */}
                  <span
                    className={`absolute inset-0 rounded-full animate-ping ${
                      isActive ? 'bg-pink-500 opacity-60' : 'bg-cyan-400 opacity-30'
                    }`}
                    style={{ animationDuration: '2s' }}
                  />
                  
                  {/* Center circle */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 relative z-20 ${
                      isActive
                        ? 'bg-pink-600 border-pink-400 text-white shadow-[0_0_15px_rgba(236,72,153,0.6)]'
                        : 'bg-slate-900 border-cyan-500/40 text-cyan-400 hover:border-cyan-400 hover:text-white'
                    }`}
                  >
                    <HotspotIcon className="w-4 h-4" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: High-tech Info Details Panel */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeHotspot.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="liquid-glass p-8 md:p-10 border border-white/10 shimmer-border"
              >
                {/* Icon Header */}
                <div className="flex items-center gap-4 border-b border-white/10 pb-6 mb-6">
                  {(() => {
                    const ActiveIcon = activeHotspot.icon;
                    return (
                      <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.2)]">
                        <ActiveIcon className="w-6 h-6 animate-pulse" />
                      </div>
                    );
                  })()}
                  <div>
                    <h3 className="text-2xl font-bold text-white">{activeHotspot.name}</h3>
                    <span className="text-xs font-mono text-pink-400">TELEMETRY DIAGNOSTIC PASSED</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-300 leading-relaxed mb-8">
                  {activeHotspot.description}
                </p>

                {/* Sub specs */}
                <div className="bg-slate-950/40 p-5 rounded-2xl border border-white/5 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400 font-mono tracking-wider">
                    <Cpu className="w-4 h-4 text-pink-400" />
                    <span>SYSTEM CALIBRATION SPECTRA:</span>
                  </div>
                  <span className="text-sm font-semibold text-white mt-1">
                    {activeHotspot.spec}
                  </span>
                </div>

                {/* Progress bar mock */}
                <div className="mt-8 flex justify-between items-center text-[10px] font-mono text-slate-500 pt-6 border-t border-white/5">
                  <span>MODEL: MARK-VIII INTERSTELLAR HARNESS</span>
                  <span className="text-emerald-400">● CALIBRATED SYSTEM ACTIVE</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
