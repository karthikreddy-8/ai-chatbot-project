import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, ArrowUp } from 'lucide-react';

// Import components
import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import FleetSection from '../components/landing/FleetSection';
import DestinationsSection from '../components/landing/DestinationsSection';
import OnboardAISection from '../components/landing/OnboardAISection';
import GearSection from '../components/landing/GearSection';
import MissionSection from '../components/landing/MissionSection';
import PricingSection from '../components/landing/PricingSection';
import LaunchDashboardSection from '../components/landing/LaunchDashboardSection';
import Footer from '../components/landing/Footer';

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  
  // Web Audio API refs for cinematic ambient synthesizer drone
  const audioCtxRef = useRef(null);
  const osc1Ref = useRef(null);
  const osc2Ref = useRef(null);
  const gainNodeRef = useRef(null);

  // Monitor scroll for Scroll-to-Top display
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Web Audio API ambient drone synthesiser logic
  const toggleAmbientAudio = () => {
    if (!isAudioMuted) {
      // Mute audio by stopping/disconnecting nodes
      if (gainNodeRef.current) {
        gainNodeRef.current.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 0.5);
      }
      setIsAudioMuted(true);
    } else {
      // Start or Unmute audio
      try {
        if (!audioCtxRef.current) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          audioCtxRef.current = new AudioContext();
        }

        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }

        // Create main gain node for volume envelope control
        const gainNode = audioCtxRef.current.createGain();
        gainNode.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
        gainNode.connect(audioCtxRef.current.destination);
        gainNodeRef.current = gainNode;

        // Create a low oscillator drone
        const osc1 = audioCtxRef.current.createOscillator();
        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(65.41, audioCtxRef.current.currentTime); // C2 note low frequency
        
        // Lowpass filter to make it a warm, deep drone
        const filter = audioCtxRef.current.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(120, audioCtxRef.current.currentTime);
        
        osc1.connect(filter);
        filter.connect(gainNode);
        osc1.start();
        osc1Ref.current = osc1;

        // Create a secondary harmonic wave
        const osc2 = audioCtxRef.current.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(98.00, audioCtxRef.current.currentTime); // G2 note harmonic perfect fifth
        
        osc2.connect(gainNode);
        osc2.start();
        osc2Ref.current = osc2;

        // Fade volume in smoothly
        gainNode.gain.linearRampToValueAtTime(0.06, audioCtxRef.current.currentTime + 1.5);
        setIsAudioMuted(false);
      } catch (err) {
        console.error('Failed to initialize space ambient synthesizer:', err);
      }
    }
  };

  // Cleanup synthesizer nodes on unmount
  useEffect(() => {
    return () => {
      if (osc1Ref.current) {
        try { osc1Ref.current.stop(); } catch (e) {}
      }
      if (osc2Ref.current) {
        try { osc2Ref.current.stop(); } catch (e) {}
      }
      if (audioCtxRef.current) {
        try { audioCtxRef.current.close(); } catch (e) {}
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="cosmos-bg text-white min-h-screen font-sans antialiased relative selection:bg-cyan-500/30">
      {/* Top fixed scroll progress bar indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 origin-left z-55"
        style={{ scaleX }}
      />

      {/* Shared Space Navigation Header */}
      <Navbar />

      {/* Cinematic Main Section Scroll Container */}
      <main className="relative z-10">
        <HeroSection />
        <FleetSection />
        <DestinationsSection />
        <OnboardAISection />
        <GearSection />
        <MissionSection />
        <PricingSection />
        <LaunchDashboardSection />
      </main>

      {/* Shared Space Navigation Footer */}
      <Footer />

      {/* Floating Left: Ambient Audio Synthesizer Control */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={toggleAmbientAudio}
          className={`p-3 rounded-full border backdrop-blur-md transition-all duration-300 shadow-lg cursor-pointer ${
            isAudioMuted
              ? 'bg-slate-950/60 border-white/10 text-slate-400 hover:text-white'
              : 'bg-gradient-to-r from-cyan-500/20 to-violet-600/20 border-cyan-500/40 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
          }`}
          title={isAudioMuted ? 'Activate Space Ambient Synth' : 'Mute Space Ambient Synth'}
        >
          {isAudioMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 animate-pulse" />}
        </button>
      </div>

      {/* Floating Right: Scroll to top indicator */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <button
              onClick={scrollToTop}
              className="p-3 rounded-full border border-white/10 bg-slate-950/60 backdrop-blur-md text-slate-300 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-300 shadow-lg cursor-pointer hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
              title="Scroll to flight deck"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}