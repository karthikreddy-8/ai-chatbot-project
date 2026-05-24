import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import AIBotIllustration from '../ui/AIBotIllustration';
import NeonButton from '../ui/NeonButton';

/**
 * HeroSection — Modern futuristic AI chatbot hero with neon effects.
 */
export default function HeroSection() {
  const navigate = useNavigate();

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 overflow-hidden">
      <div className="max-w-7xl w-full mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center z-10">
        
        {/* Left Side: AI Bot Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center md:justify-end order-2 md:order-1"
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <AIBotIllustration size={350} animated={true} />
          </motion.div>
        </motion.div>

        {/* Right Side: Text & CTA */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-start justify-center order-1 md:order-2"
        >
          {/* Title with character-by-character animation */}
          <div className="mb-2 overflow-hidden">
            <motion.div
              custom={0}
              variants={titleVariants}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-tighter leading-tight"
            >
              AI Chat Bot
            </motion.div>
          </div>

          {/* Animated Glow Text */}
          <motion.h2
            custom={1}
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-purple-300 to-purple-400 bg-clip-text text-transparent animate-none"
            style={{
              animation: 'glow-text 3s ease-in-out infinite',
            }}
          >
            Intelligent Assistant
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            custom={2}
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed max-w-2xl"
          >
            Your intelligent assistant for every question, idea, and solution. 
            Powered by advanced AI technology to deliver fast, accurate, and contextual responses.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            custom={3}
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <NeonButton
              onClick={() => navigate('/login')}
              className="px-8 py-3 sm:px-10 sm:py-4 text-base sm:text-lg"
              pulse={true}
            >
              <span className="flex items-center gap-2">
                Start Chat
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </NeonButton>

            <NeonButton
              variant="outline"
              onClick={() => {
                const featuresSection = document.querySelector('#features');
                featuresSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3 sm:px-10 sm:py-4 text-base sm:text-lg"
            >
              Learn More
            </NeonButton>
          </motion.div>

          {/* Feature highlights */}
          <motion.div
            custom={4}
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-purple-500/20 w-full"
          >
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text">
                24/7
              </div>
              <div className="text-xs sm:text-sm text-gray-400 mt-1">Always Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-gray-400 bg-clip-text">
                100%
              </div>
              <div className="text-xs sm:text-sm text-gray-400 mt-1">Accurate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                ∞
              </div>
              <div className="text-xs sm:text-sm text-gray-400 mt-1">Unlimited</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
