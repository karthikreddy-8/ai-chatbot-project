import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, ShieldAlert, Cpu, HelpCircle, ChevronDown, Rocket } from 'lucide-react';

const FAQS = [
  {
    question: 'How safe is a COSMOS warp-drive voyage?',
    answer: 'COSMOS voyages hold a perfect 100% safety and flight structural integrity rating. Every spaceship is equipped with self-healing nanite composite hulls, magnetic deflector shields, and real-time gravity dampeners monitored by our Nexus AI navigator.',
  },
  {
    question: 'Do passengers require extensive astronaut training?',
    answer: 'No extensive prior training is required. For sub-orbital tours, a 2-hour safety briefing is sufficient. For deep planetary residencies and interstellar warp expeditions, we provide a 48-hour sub-orbital simulator and bio-acclimation program, with dedicated Nexus AI copilot voice guidance throughout.',
  },
  {
    question: 'What is the exact role of the Nexus AI Navigator?',
    answer: 'Nexus AI is the central computer of the flight cruiser. It handles coordinates plotting, monitors fuel mixture efficiency, scans exoplanet weather grid arrays, and communicates directly with passengers to answer queries, translate languages, and manage suite controls.',
  },
];

export default function LaunchDashboardSection() {
  const [warpFactor, setWarpFactor] = useState(5.0);
  const [shieldStatus, setShieldStatus] = useState('Optimal');
  const [fuelRating, setFuelRating] = useState('Efficient');
  const [openFaq, setOpenFaq] = useState(null);
  const [seconds, setSeconds] = useState(124);

  // Simple dynamic dashboard statuses based on warp factor
  useEffect(() => {
    if (warpFactor >= 9.0) {
      setShieldStatus('Warning: Shield Load High');
      setFuelRating('Critical Fuel Consumption');
    } else if (warpFactor >= 7.0) {
      setShieldStatus('Moderate Load');
      setFuelRating('High Fuel Intake');
    } else {
      setShieldStatus('Optimal (100%)');
      setFuelRating('Efficient / Sustainable');
    }
  }, [warpFactor]);

  // Countdown timer micro animation
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 124));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  return (
    <section id="launch-dashboard" className="py-28 px-6 relative z-10 bg-slate-950/20">
      
      {/* Background neon lights */}
      <div className="absolute top-[30%] left-[10%] w-[400px] h-[400px] bg-violet-600/5 blur-[90px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Interactive Cockpit Console */}
          <div className="lg:col-span-6">
            <div className="liquid-glass-strong p-8 border border-white/10 shimmer-border">
              
              {/* Header Title */}
              <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Rocket className="w-6 h-6 text-cyan-400 animate-bounce" />
                    Warp Command Console
                  </h3>
                  <span className="text-xs font-mono text-cyan-400">STARSHIP COCKPIT DIAGNOSTIC UNIT</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-mono block">WARP LAUNCH COUNTDOWN</span>
                  <span className="text-lg font-black text-pink-400 font-mono animate-pulse">
                    T- {formatTime(seconds)}
                  </span>
                </div>
              </div>

              {/* Warp factor slide scale */}
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-200">Adjust Warp Speed Coefficient:</span>
                  <span className="text-2xl font-black text-cyan-400 font-mono">Warp {warpFactor.toFixed(1)}</span>
                </div>
                
                <input
                  type="range"
                  min="1.0"
                  max="9.9"
                  step="0.1"
                  value={warpFactor}
                  onChange={(e) => setWarpFactor(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
                />
                
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>Warp 1.0 (Light Speed)</span>
                  <span>Warp 9.9 (Max Engine Velocity)</span>
                </div>
              </div>

              {/* Dynamic Console Telemetry Values */}
              <h4 className="text-xs font-bold uppercase text-slate-400 tracking-widest font-mono mb-4">
                DYNAMIC COCKPIT DIAGNOSTICS:
              </h4>

              <div className="flex flex-col gap-3">
                
                {/* Shield load value */}
                <div className="p-4 rounded-xl bg-slate-950/40 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Compass className="w-4 h-4 text-violet-400" />
                    <span className="text-xs font-semibold text-slate-300">SHIELD COEFFICIENT LOAD</span>
                  </div>
                  <span className={`text-xs font-mono font-bold ${warpFactor >= 9.0 ? 'text-rose-400 animate-pulse' : 'text-slate-200'}`}>
                    {shieldStatus}
                  </span>
                </div>

                {/* Fuel intake rating */}
                <div className="p-4 rounded-xl bg-slate-950/40 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShieldAlert className="w-4 h-4 text-pink-400" />
                    <span className="text-xs font-semibold text-slate-300">FUSION PROPULSION RATE</span>
                  </div>
                  <span className={`text-xs font-mono font-bold ${warpFactor >= 9.0 ? 'text-rose-400 animate-pulse' : 'text-slate-200'}`}>
                    {fuelRating}
                  </span>
                </div>

                {/* Flight Copilot status */}
                <div className="p-4 rounded-xl bg-slate-950/40 border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
                    <span className="text-xs font-semibold text-slate-300">NEXUS CO-PILOT OS</span>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    ONLINE (ACTIVE VECTOR)
                  </span>
                </div>

              </div>

            </div>
          </div>

          {/* Right Column: Accordion Cockpit FAQs */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div>
              <h3 className="text-3xl font-black text-white mb-2">
                Frequently Asked <span className="bg-gradient-to-r from-pink-400 to-amber-400 bg-clip-text text-transparent">Questions</span>
              </h3>
              <p className="text-sm text-slate-400 mb-8 leading-relaxed">
                Clear answers regarding boarding, deep space orbits, safety shields, and coordinate check-in.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="liquid-glass border border-white/5 overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-white hover:text-cyan-400 transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-3 text-sm md:text-base">
                        <HelpCircle className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-cyan-400' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-6 pb-6 pt-2 text-sm text-slate-300 leading-relaxed font-light border-t border-white/5 bg-slate-900/10">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
