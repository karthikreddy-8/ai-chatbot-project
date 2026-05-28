import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Thermometer, Orbit, Wind, ArrowRight } from 'lucide-react';

const DESTINATIONS = [
  {
    id: 'mars',
    name: 'Mars Olympus Colony',
    subTitle: 'The Red Frontier',
    description: 'Walk through the grand Olympus Dome, scale the largest volcano in the solar system, and witness double Martian sunsets over the rust-red sands.',
    temp: '-63°C Average',
    gravity: '0.38 g',
    distance: '225 Million km',
    atmosphere: '95% CO2 (Bio-domes Active)',
    color: '#EF4444',
    bgClass: 'rgba(239, 68, 68, 0.05)',
    avatar: '🔴',
  },
  {
    id: 'saturn',
    name: 'Saturn Ring Resort',
    subTitle: 'Titan Orbit Base',
    description: 'Park your cruiser in orbital lock with Saturn\'s gorgeous icy rings, take sub-orbital shuttle excursions to the methane lakes of Titan, or relax in the anti-gravity spa cabins.',
    temp: '-139°C Average',
    gravity: '1.04 g (Simulated)',
    distance: '1.4 Billion km',
    atmosphere: 'Pressurized Dome Ecosystem',
    color: '#F59E0B',
    bgClass: 'rgba(245, 158, 11, 0.05)',
    avatar: '🪐',
  },
  {
    id: 'kepler',
    name: 'Kepler-186f Oasis',
    subTitle: 'First Earth Cousin',
    description: 'COSMOS\' first deep-space colony target. Bask under the deep crimson light of a red dwarf star, walk through massive red pine forests, and sail warm oceanic tides.',
    temp: '0°C to +30°C',
    gravity: '1.12 g',
    distance: '582 Light Years',
    atmosphere: 'Nitrogen-Oxygen (Breathable)',
    color: '#10B981',
    bgClass: 'rgba(16, 185, 129, 0.05)',
    avatar: '👽',
  },
  {
    id: 'gliese',
    name: 'Gliese 581g Outpost',
    subTitle: 'The Tidally Locked Jewel',
    description: 'Settle in the twilight zone - a perpetual sunset band between freezing dark ice sheets and sun-scorched dunes. Enjoy everlasting crimson horizons and solar wind sails.',
    temp: '-12°C Average',
    gravity: '1.38 g',
    distance: '20 Light Years',
    atmosphere: 'High Carbon Dioxide (Suit Required)',
    color: '#6366F1',
    bgClass: 'rgba(99, 102, 241, 0.05)',
    avatar: '☄️',
  },
];

export default function DestinationsSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="destinations" className="py-28 px-6 relative z-10 bg-slate-950/20">
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
            Cosmic <span className="bg-gradient-to-r from-pink-400 to-amber-400 bg-clip-text text-transparent">Destinations</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto"
          >
            Book your passage to active human colonies, luxury orbital retreats, and mysterious earth-like exoplanets.
          </motion.p>
        </div>

        {/* Timeline & Detail Panel Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Galactic Route Navigation (Timeline style) */}
          <div className="lg:col-span-5 flex flex-col gap-4 relative">
            {/* Connecting laser timeline path */}
            <div className="absolute left-[33px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-pink-500/40 via-violet-500/20 to-cyan-500/40 z-0 hidden sm:block" />

            {DESTINATIONS.map((dest, index) => {
              const isActive = activeTab === index;
              return (
                <button
                  key={dest.id}
                  onClick={() => setActiveTab(index)}
                  className={`text-left p-5 rounded-2xl flex items-center gap-6 relative z-10 transition-all duration-500 border group ${
                    isActive
                      ? 'bg-slate-900/60 border-pink-500/30 shadow-[0_0_20px_rgba(236,72,153,0.15)]'
                      : 'bg-slate-950/20 border-white/5 hover:border-white/10'
                  }`}
                >
                  {/* Planet Avatar Sphere */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all duration-500 flex-shrink-0 ${
                      isActive ? 'scale-110 shadow-lg' : 'opacity-70 group-hover:opacity-100'
                    }`}
                    style={{
                      background: isActive ? `radial-gradient(circle, ${dest.color}80 10%, #0c1524 80%)` : 'rgba(255,255,255,0.05)',
                      boxShadow: isActive ? `0 0 15px ${dest.color}50` : 'none',
                    }}
                  >
                    {dest.avatar}
                  </div>

                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-white group-hover:text-pink-400 transition-colors duration-300">
                      {dest.name}
                    </h3>
                    <span className="text-xs text-slate-400 tracking-wide font-mono">
                      {dest.subTitle}
                    </span>
                  </div>

                  <ArrowRight
                    className={`w-5 h-5 text-slate-500 transition-all duration-300 ${
                      isActive ? 'translate-x-1 text-pink-400' : 'group-hover:translate-x-1 group-hover:text-slate-300'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Side: Orbital Map HUD Console / Details Card */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={DESTINATIONS[activeTab].id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="liquid-glass p-8 md:p-10 relative overflow-hidden border border-white/10"
                style={{
                  background: `linear-gradient(135deg, rgba(13, 27, 42, 0.3) 0%, ${DESTINATIONS[activeTab].bgClass} 100%)`,
                }}
              >
                {/* Glow ring overlay mimicking orbital coordinate lines */}
                <div className="absolute -top-10 -right-10 w-[200px] h-[200px] rounded-full border border-dashed border-white/5 animate-spin" style={{ animationDuration: '40s' }} />

                <span className="text-xs font-bold uppercase tracking-widest text-pink-400 font-mono mb-2 block">
                  COSMOS EXPEDITION CHART
                </span>

                <h3 className="text-3xl font-black text-white mb-2">
                  {DESTINATIONS[activeTab].name}
                </h3>
                <span className="text-sm font-mono text-slate-400 block mb-6">
                  CLASSIFICATION: {DESTINATIONS[activeTab].subTitle.toUpperCase()}
                </span>

                <p className="text-slate-300 leading-relaxed mb-8">
                  {DESTINATIONS[activeTab].description}
                </p>

                {/* Telemetry specs grid */}
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-widest font-mono mb-4">
                  ENVIRONMENTAL SPECTRAL TELEMETRY:
                </h4>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  
                  {/* Temp */}
                  <div className="bg-slate-950/40 p-4 rounded-xl border border-white/5 flex flex-col gap-1">
                    <Thermometer className="w-5 h-5 text-red-400" />
                    <span className="text-[10px] text-slate-400 font-mono">EST. TEMP</span>
                    <span className="text-xs font-bold text-white truncate">
                      {DESTINATIONS[activeTab].temp}
                    </span>
                  </div>

                  {/* Gravity */}
                  <div className="bg-slate-950/40 p-4 rounded-xl border border-white/5 flex flex-col gap-1">
                    <Orbit className="w-5 h-5 text-cyan-400" />
                    <span className="text-[10px] text-slate-400 font-mono">GRAV COEFFICIENT</span>
                    <span className="text-xs font-bold text-white truncate">
                      {DESTINATIONS[activeTab].gravity}
                    </span>
                  </div>

                  {/* Distance */}
                  <div className="bg-slate-950/40 p-4 rounded-xl border border-white/5 flex flex-col gap-1">
                    <Compass className="w-5 h-5 text-amber-400" />
                    <span className="text-[10px] text-slate-400 font-mono">SOLAR DIST</span>
                    <span className="text-xs font-bold text-white truncate">
                      {DESTINATIONS[activeTab].distance}
                    </span>
                  </div>

                  {/* Atmosphere */}
                  <div className="bg-slate-950/40 p-4 rounded-xl border border-white/5 flex flex-col gap-1">
                    <Wind className="w-5 h-5 text-indigo-400" />
                    <span className="text-[10px] text-slate-400 font-mono">ATMOSPHERE</span>
                    <span className="text-xs font-bold text-white truncate">
                      {DESTINATIONS[activeTab].atmosphere}
                    </span>
                  </div>

                </div>

                {/* Simulated coordinate scanner overlay */}
                <div className="mt-8 flex justify-between items-center text-[10px] font-mono text-slate-500 pt-6 border-t border-white/5">
                  <span>LAT: 44° 22\' 12" N | LONG: 122° 45\' 9" W</span>
                  <span className="text-pink-400 animate-pulse">● SIGNAL CONNECTED</span>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
