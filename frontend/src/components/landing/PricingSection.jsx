import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ChevronRight, Activity, Zap, Compass, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PRICING_TIERS = [
  {
    name: 'Suborbital Cruise',
    price: '$4,500',
    description: 'Perfect for travelers seeking a taste of zero gravity and stunning suborbital sights.',
    icon: Compass,
    iconColor: 'text-cyan-400',
    glowClass: 'rgba(6, 182, 212, 0.2)',
    features: [
      '4-Hour low orbital spaceflight',
      'Panoramic earth viewing deck access',
      'Zero-gravity cabin navigation',
      'COSMOS suborbital flight flight suit',
      'Telemetry diagnostics access link',
    ],
    popular: false,
  },
  {
    name: 'Planetary Residency',
    price: '$125,000',
    description: 'Relocate or holiday in the premium bio-domes of Mars or Saturn\'s rings.',
    icon: Zap,
    iconColor: 'text-pink-400',
    glowClass: 'rgba(236, 72, 153, 0.25)',
    features: [
      'Warp-assisted transit to Mars/Saturn Outposts',
      '3-Month pressurized colony dome residency',
      'Active biometric Mark-VIII suit configuration',
      'Nexus AI onboard flight co-pilot integration',
      'Guided orbit spacewalk training',
    ],
    popular: true,
  },
  {
    name: 'Interstellar Expedition',
    price: '$2,500,000',
    description: 'Embark on a deep space colony voyage to exoplanet Kepler-186f.',
    icon: Star,
    iconColor: 'text-purple-400',
    glowClass: 'rgba(167, 139, 250, 0.2)',
    features: [
      'Warp-drive starship voyage (582 Light Years)',
      'Advanced biosphere estate setup package',
      'Integrated nano-cryo hibernation pod',
      'Dedicated 24/7 Nexus AI Navigator core',
      'Colony starting gear & materials package',
    ],
    popular: false,
  },
];

export default function PricingSection() {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleBooking = () => {
    navigate('/login');
  };

  return (
    <section id="pricing" className="py-28 px-6 relative z-10 bg-slate-950/20">
      
      {/* Visual background lights */}
      <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] left-[10%] w-[450px] h-[450px] bg-violet-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4"
          >
            Star Flight <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-500 bg-clip-text text-transparent">Packages</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto"
          >
            Choose your flight coordinates. Every premium package features full telemetry support and Nexus AI assistance.
          </motion.p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch justify-center max-w-6xl mx-auto">
          {PRICING_TIERS.map((tier, idx) => {
            const TierIcon = tier.icon;
            const isHovered = hoveredIndex === idx;

            return (
              <motion.div
                key={tier.name}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                whileHover={{ y: -8 }}
                className={`shimmer-border liquid-glass p-8 flex flex-col justify-between relative transition-all duration-500 ${
                  tier.popular
                    ? 'bg-slate-900/60 border-pink-500/40 shadow-[0_15px_40px_rgba(236,72,153,0.15)] md:scale-105 z-10'
                    : 'bg-slate-950/20 border-white/5'
                }`}
              >
                {/* Gradient Glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-[24px] pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 10%, ${tier.glowClass}, transparent 60%)`,
                    opacity: isHovered ? 1 : 0,
                  }}
                />

                <div>
                  {/* Badge for popular tier */}
                  {tier.popular && (
                    <div className="absolute top-4 right-6 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-[10px] font-black tracking-widest text-pink-400 uppercase">
                      Recommended
                    </div>
                  )}

                  {/* Icon and Title */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-center ${tier.iconColor}`}>
                      <TierIcon className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                      <span className="text-2xl md:text-3xl font-black text-white block mt-1">
                        {tier.price} <span className="text-xs text-slate-400 font-normal">/ flight</span>
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-400 leading-relaxed mb-8">
                    {tier.description}
                  </p>

                  {/* Divider */}
                  <div className="h-[1px] w-full bg-white/10 mb-8" />

                  {/* Features list */}
                  <ul className="flex flex-col gap-4 mb-8">
                    {tier.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-sm text-slate-300">
                        <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Purchase Button */}
                <button
                  onClick={handleBooking}
                  className={`w-full py-4 rounded-full font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer ${
                    tier.popular
                      ? 'bg-gradient-to-r from-pink-500 to-violet-600 text-white shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)]'
                      : 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-cyan-500/40'
                  }`}
                >
                  Book coordinates
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
