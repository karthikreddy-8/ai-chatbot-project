import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Orbit, Compass, Gauge, Users, Layers, Zap } from 'lucide-react';

const FLEET_SHIPS = [
  {
    id: 'hyperion',
    name: 'COSMOS Hyperion',
    class: 'Cruiser Class (Luxury Travel)',
    description: 'The pinnacle of luxury orbital flight, featuring panoramic stellar dining halls, anti-gravity suites, and dynamic radiation shield curtains.',
    warpSpeed: 'Warp 7.2',
    range: '12.4 Light Years',
    capacity: '240 Voyagers',
    deckCount: '6 Decks',
    color: '#06B6D4',
    gradient: 'from-cyan-500/20 to-blue-500/10',
    iconColor: 'text-cyan-400',
    glowColor: 'rgba(6, 182, 212, 0.4)',
    shuttleSVG: (color) => (
      <svg viewBox="0 0 100 100" fill="none" className="w-24 h-24 drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]">
        <path d="M50 10 L65 50 L50 40 L35 50 Z" fill={color} />
        <path d="M50 40 L60 80 L50 70 L40 80 Z" fill="rgba(255,255,255,0.2)" />
      </svg>
    ),
  },
  {
    id: 'aurora',
    name: 'COSMOS Aurora',
    class: 'Scout Class (Speed & Recon)',
    description: 'Engineered for high-speed interstellar jumps, scout charting, and exotic planet atmosphere atmospheric diving. The swiftest ship in active service.',
    warpSpeed: 'Warp 9.9',
    range: '45.0 Light Years',
    capacity: '8 Crew Members',
    deckCount: '2 Decks',
    color: '#EC4899',
    gradient: 'from-pink-500/20 to-violet-500/10',
    iconColor: 'text-pink-400',
    glowColor: 'rgba(236, 72, 153, 0.4)',
    shuttleSVG: (color) => (
      <svg viewBox="0 0 100 100" fill="none" className="w-24 h-24 drop-shadow-[0_0_15px_rgba(236,72,153,0.4)]">
        <path d="M50 5 L85 70 L50 55 L15 70 Z" fill={color} />
        <circle cx="50" cy="40" r="10" fill="rgba(255,255,255,0.3)" />
      </svg>
    ),
  },
  {
    id: 'orion',
    name: 'COSMOS Orion',
    class: 'Ark Class (Colony Transport)',
    description: 'Designed for long-duration deep-space colony transport, outfitted with state-of-the-art cryo-pods, biosphere farms, and self-repairing nanite hulls.',
    warpSpeed: 'Warp 5.4',
    range: '180.0 Light Years',
    capacity: '1,200 Star Settlers',
    deckCount: '24 Decks',
    color: '#A78BFA',
    gradient: 'from-purple-500/20 to-pink-500/10',
    iconColor: 'text-purple-400',
    glowColor: 'rgba(167, 139, 250, 0.4)',
    shuttleSVG: (color) => (
      <svg viewBox="0 0 100 100" fill="none" className="w-24 h-24 drop-shadow-[0_0_15px_rgba(167,139,250,0.4)]">
        <rect x="35" y="10" width="30" height="50" rx="15" fill={color} />
        <path d="M20 40 L35 50 L35 70 L20 60 Z" fill="rgba(255,255,255,0.15)" />
        <path d="M80 40 L65 50 L65 70 L80 60 Z" fill="rgba(255,255,255,0.15)" />
      </svg>
    ),
  },
];

export default function FleetSection() {
  const [selectedShip, setSelectedShip] = useState(FLEET_SHIPS[0]);
  const [hoveredShipId, setHoveredShipId] = useState(null);

  return (
    <section id="fleet" className="py-28 px-6 relative z-10 bg-slate-950/40">
      {/* Glow effect background */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4"
          >
            The Cosmic <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">Starfleet</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto"
          >
            Engage with our elite fleet of deep-space transport cruisers, designed for unmatched safety, speed, and stellar luxury.
          </motion.p>
        </div>

        {/* 3D-effect Interactive Fleet Presentation */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Hoverable Ship Cards */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {FLEET_SHIPS.map((ship) => {
              const isSelected = selectedShip.id === ship.id;
              const isHovered = hoveredShipId === ship.id;
              
              return (
                <motion.div
                  key={ship.id}
                  onClick={() => setSelectedShip(ship)}
                  onMouseEnter={() => setHoveredShipId(ship.id)}
                  onMouseLeave={() => setHoveredShipId(null)}
                  whileHover={{ scale: 1.02 }}
                  className={`shimmer-border liquid-glass p-6 md:p-8 cursor-pointer relative group flex gap-6 items-center ${
                    isSelected ? 'bg-slate-900/60 border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.15)]' : 'bg-slate-950/20'
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                    perspective: '1000px',
                  }}
                >
                  {/* Card Glow accent */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-[24px]"
                    style={{ background: `radial-gradient(circle at 10% 20%, ${ship.color}, transparent 60%)` }}
                  />

                  {/* Ship Mini SVG graphic */}
                  <div className="flex-shrink-0 relative z-10 bg-slate-900/80 p-3 rounded-2xl border border-white/5 group-hover:border-cyan-500/30 transition-colors duration-300">
                    {ship.shuttleSVG(ship.color)}
                  </div>

                  {/* Info details */}
                  <div className="flex-grow relative z-10">
                    <span className={`text-xs font-bold uppercase tracking-wider ${ship.iconColor} mb-1 block`}>
                      {ship.class}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                      {ship.name}
                    </h3>
                    <p className="text-sm text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                      {ship.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Deep Telemetry Console */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedShip.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="liquid-glass-strong p-8 relative overflow-hidden shimmer-border border border-white/10"
              >
                {/* Visual Accent Nebula */}
                <div
                  className="absolute top-0 right-0 w-[250px] h-[250px] rounded-full blur-[60px] opacity-20 pointer-events-none"
                  style={{ background: selectedShip.color }}
                />

                {/* Subtitle */}
                <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
                  <div>
                    <h3 className="text-2xl font-black text-white">{selectedShip.name}</h3>
                    <p className="text-sm text-slate-400 font-mono mt-1">{selectedShip.class}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-slate-300">
                    Active Mission
                  </span>
                </div>

                {/* Description */}
                <p className="text-slate-300 leading-relaxed mb-8">
                  {selectedShip.description}
                </p>

                {/* Stats Console */}
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-widest font-mono mb-4">
                  STARSHIP TELEMETRY VALUES:
                </h4>
                
                <div className="grid grid-cols-2 gap-6">
                  
                  {/* Stat 1 */}
                  <div className="bg-slate-950/40 p-4 rounded-xl border border-white/5 flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                      <Gauge className="w-4 h-4 text-cyan-400 animate-pulse" />
                      <span>WARP COEFFICIENT</span>
                    </div>
                    <span className="text-lg font-black text-white mt-1">
                      {selectedShip.warpSpeed}
                    </span>
                  </div>

                  {/* Stat 2 */}
                  <div className="bg-slate-950/40 p-4 rounded-xl border border-white/5 flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                      <Orbit className="w-4 h-4 text-violet-400" />
                      <span>CRUISING RANGE</span>
                    </div>
                    <span className="text-lg font-black text-white mt-1">
                      {selectedShip.range}
                    </span>
                  </div>

                  {/* Stat 3 */}
                  <div className="bg-slate-950/40 p-4 rounded-xl border border-white/5 flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                      <Users className="w-4 h-4 text-pink-400" />
                      <span>PASSENGER RATING</span>
                    </div>
                    <span className="text-lg font-black text-white mt-1">
                      {selectedShip.capacity}
                    </span>
                  </div>

                  {/* Stat 4 */}
                  <div className="bg-slate-950/40 p-4 rounded-xl border border-white/5 flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                      <Layers className="w-4 h-4 text-amber-400" />
                      <span>STRUCTURAL DECKS</span>
                    </div>
                    <span className="text-lg font-black text-white mt-1">
                      {selectedShip.deckCount}
                    </span>
                  </div>

                </div>

                {/* Sub-system progress bars mock */}
                <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-4">
                  <span className="text-xs font-bold text-slate-400 tracking-wider font-mono">
                    HULL SHIELD STRUCTURAL INTEGRITY:
                  </span>
                  
                  <div className="flex flex-col gap-3">
                    <div>
                      <div className="flex justify-between text-[10px] text-slate-400 font-mono mb-1">
                        <span>GRAVITY GENERATOR</span>
                        <span>98%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '98%' }}
                          transition={{ duration: 1 }}
                          className="h-full bg-cyan-400"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[10px] text-slate-400 font-mono mb-1">
                        <span>SHIELD MATRIX COIL</span>
                        <span>92%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '92%' }}
                          transition={{ duration: 1, delay: 0.1 }}
                          className="h-full bg-violet-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
