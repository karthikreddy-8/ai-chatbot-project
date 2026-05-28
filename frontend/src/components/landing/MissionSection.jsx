import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Captain Elena Vance',
    role: 'Starship Hyperion Commander',
    quote: 'Booking warp jumps with COSMOS has completely revolutionized our interstellar transit routes. The Nexus AI companion provided continuous atmospheric scans and slingshot plotting that saved us hours of solar fuel.',
    rating: 5,
    avatarGrad: 'from-cyan-400 to-blue-600',
    avatarInitials: 'EV',
  },
  {
    id: 2,
    name: 'Dr. Marcus Brody',
    role: 'Exobiology Researcher, Kepler Outpost',
    quote: 'Our research team spent 6 weeks in the Kepler-186f Bio-domes. The pressurized suites and telemetry gear provided by COSMOS kept us safe in a high-gravity environment. The flight planning was perfect.',
    rating: 5,
    avatarGrad: 'from-pink-500 to-violet-600',
    avatarInitials: 'MB',
  },
  {
    id: 3,
    name: 'Sylvia Chen',
    role: 'Suborbital Orbital Tourist',
    quote: 'Watching Saturn\'s rings drift past the dining deck of the Voyager cruiser is something I will never forget. True five-star luxury in microgravity. Recommended for anyone looking to escape Earth.',
    rating: 5,
    avatarGrad: 'from-amber-400 to-orange-600',
    avatarInitials: 'SC',
  },
];

export default function MissionSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="testimonials" className="py-28 px-6 relative z-10 bg-slate-950/40">
      
      {/* Background ambient lighting */}
      <div className="absolute top-[30%] left-[20%] w-[450px] h-[450px] bg-violet-600/5 blur-[90px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4"
          >
            Interstellar <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">Mission Logs</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-slate-400"
          >
            Read reviews and logs from ship commanders, planetary researchers, and luxury travelers.
          </motion.p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          
          {/* Main Slide Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.5 }}
              className="liquid-glass p-8 md:p-12 border border-white/10 relative shimmer-border bg-slate-900/40 shadow-2xl"
            >
              {/* Giant quote sign background icon */}
              <Quote className="absolute top-8 right-8 w-28 h-28 text-white/5 pointer-events-none select-none" />

              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
                {/* Avatar Sphere */}
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black text-white bg-gradient-to-tr ${TESTIMONIALS[currentIndex].avatarGrad} shadow-[0_0_20px_rgba(255,255,255,0.05)] border border-white/15 flex-shrink-0`}
                >
                  {TESTIMONIALS[currentIndex].avatarInitials}
                </div>

                {/* Content Details */}
                <div className="flex-grow flex flex-col items-center md:items-start text-center md:text-left">
                  
                  {/* Rating Stars */}
                  <div className="flex gap-1.5 mb-4">
                    {Array.from({ length: TESTIMONIALS[currentIndex].rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                    ))}
                  </div>

                  {/* Quote text */}
                  <p className="text-lg md:text-xl text-slate-200 leading-relaxed italic mb-6">
                    "{TESTIMONIALS[currentIndex].quote}"
                  </p>

                  {/* Author Name */}
                  <h3 className="text-xl font-bold text-white">
                    {TESTIMONIALS[currentIndex].name}
                  </h3>
                  <span className="text-sm font-mono text-cyan-400 mt-1">
                    {TESTIMONIALS[currentIndex].role}
                  </span>

                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            className="absolute left-[-20px] md:left-[-35px] top-1/2 -translate-y-1/2 w-10 md:w-12 h-10 md:h-12 rounded-full border border-white/10 bg-slate-900/60 backdrop-blur-md text-slate-300 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-300 flex items-center justify-center cursor-pointer shadow-lg hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            className="absolute right-[-20px] md:right-[-35px] top-1/2 -translate-y-1/2 w-10 md:w-12 h-10 md:h-12 rounded-full border border-white/10 bg-slate-900/60 backdrop-blur-md text-slate-300 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-300 flex items-center justify-center cursor-pointer shadow-lg hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Dot Indicator Indicators */}
          <div className="flex justify-center gap-2.5 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
                  currentIndex === i ? 'w-8 bg-cyan-400' : 'w-2.5 bg-slate-700 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
