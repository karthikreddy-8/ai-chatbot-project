import { motion } from 'framer-motion';

export default function AIBotIllustration({ size = 300, animated = true }) {
  const floatVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const pulseVariants = {
    animate: {
      opacity: [0.4, 0.8, 0.4],
      r: [85, 100, 85],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const spinVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  };

  const waveVariants = {
    animate: {
      d: ['M0 50 Q 12 30, 25 50 T 50 50', 'M0 50 Q 12 70, 25 50 T 50 50', 'M0 50 Q 12 30, 25 50 T 50 50'],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.div
      variants={floatVariants}
      animate={animated ? 'animate' : ''}
      className="flex items-center justify-center"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 300 300"
        className="drop-shadow-2xl"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="purpleGlow" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.2" />
          </radialGradient>
          <linearGradient id="botGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="50%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
          <linearGradient id="headGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
        </defs>

        {/* Background Glow Ring */}
        <motion.circle
          cx="150"
          cy="150"
          r="120"
          fill="url(#purpleGlow)"
          opacity="0.2"
          variants={pulseVariants}
          animate={animated ? 'animate' : ''}
          filter="url(#glow)"
        />

        {/* Rotating Ring Border */}
        <motion.circle
          cx="150"
          cy="150"
          r="115"
          fill="none"
          stroke="#A78BFA"
          strokeWidth="2"
          opacity="0.3"
          variants={spinVariants}
          animate={animated ? 'animate' : ''}
          strokeDasharray="360"
          strokeDashoffset="0"
        />

        {/* Core Glow Circle */}
        <circle
          cx="150"
          cy="150"
          r="100"
          fill="url(#botGradient)"
          opacity="0.15"
          filter="url(#glow)"
        />

        {/* Bot Head - Rounded Square */}
        <rect
          x="110"
          y="80"
          width="80"
          height="85"
          rx="20"
          fill="url(#headGradient)"
          opacity="0.9"
        />

        {/* Left Eye */}
        <circle
          cx="130"
          cy="110"
          r="8"
          fill="#06B6D4"
          opacity="0.8"
        />
        <motion.circle
          cx="130"
          cy="110"
          r="12"
          fill="none"
          stroke="#06B6D4"
          strokeWidth="1.5"
          opacity="0.4"
          animate={animated ? { r: [12, 18, 12] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Right Eye */}
        <circle
          cx="170"
          cy="110"
          r="8"
          fill="#06B6D4"
          opacity="0.8"
        />
        <motion.circle
          cx="170"
          cy="110"
          r="12"
          fill="none"
          stroke="#06B6D4"
          strokeWidth="1.5"
          opacity="0.4"
          animate={animated ? { r: [12, 18, 12] } : {}}
          transition={{ duration: 2, repeat: Infinity, delay: 0.1 }}
        />

        {/* Smile */}
        <path
          d="M 135 135 Q 150 145 165 135"
          stroke="#06B6D4"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* Circuit Lines */}
        <line
          x1="110"
          y1="120"
          x2="105"
          y2="120"
          stroke="#A78BFA"
          strokeWidth="1.5"
          opacity="0.5"
        />
        <line
          x1="190"
          y1="120"
          x2="195"
          y2="120"
          stroke="#A78BFA"
          strokeWidth="1.5"
          opacity="0.5"
        />

        {/* Neck */}
        <rect
          x="135"
          y="162"
          width="30"
          height="15"
          fill="url(#headGradient)"
          opacity="0.7"
        />

        {/* Bot Body - Rectangular */}
        <rect
          x="120"
          y="180"
          width="60"
          height="70"
          rx="12"
          fill="url(#botGradient)"
          opacity="0.6"
        />

        {/* Center Chest Panel */}
        <rect
          x="130"
          y="195"
          width="40"
          height="45"
          rx="8"
          fill="none"
          stroke="#06B6D4"
          strokeWidth="1.5"
          opacity="0.5"
        />

        {/* Animated Pulsing Core */}
        <motion.circle
          cx="150"
          cy="220"
          r="6"
          fill="#06B6D4"
          animate={animated ? { r: [6, 9, 6], opacity: [0.6, 1, 0.6] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        />

        {/* Left Arm */}
        <g>
          <line
            x1="120"
            y1="200"
            x2="90"
            y2="200"
            stroke="url(#botGradient)"
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.7"
          />
          <circle
            cx="85"
            cy="200"
            r="5"
            fill="url(#botGradient)"
            opacity="0.7"
          />
        </g>

        {/* Right Arm */}
        <g>
          <line
            x1="180"
            y1="200"
            x2="210"
            y2="200"
            stroke="url(#botGradient)"
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.7"
          />
          <circle
            cx="215"
            cy="200"
            r="5"
            fill="url(#botGradient)"
            opacity="0.7"
          />
        </g>

        {/* Data Stream - Left */}
        <motion.g
          animate={animated ? { opacity: [0, 1, 0] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <circle cx="80" cy="180" r="2" fill="#06B6D4" />
          <circle cx="75" cy="190" r="2" fill="#06B6D4" />
          <circle cx="70" cy="200" r="2" fill="#06B6D4" />
        </motion.g>

        {/* Data Stream - Right */}
        <motion.g
          animate={animated ? { opacity: [0, 1, 0] } : {}}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        >
          <circle cx="220" cy="180" r="2" fill="#06B6D4" />
          <circle cx="225" cy="190" r="2" fill="#06B6D4" />
          <circle cx="230" cy="200" r="2" fill="#06B6D4" />
        </motion.g>

        {/* Connecting Orbits */}
        <motion.circle
          cx="150"
          cy="150"
          r="60"
          fill="none"
          stroke="#7C3AED"
          strokeWidth="1"
          opacity="0.2"
          strokeDasharray="10 5"
          variants={spinVariants}
          animate={animated ? 'animate' : ''}
        />

        {/* Orbiting Dots */}
        <motion.g
          animate={animated ? { rotate: 360 } : {}}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '150px 150px' }}
        >
          <circle cx="205" cy="150" r="2" fill="#06B6D4" opacity="0.6" />
          <circle cx="150" cy="95" r="2" fill="#06B6D4" opacity="0.6" />
          <circle cx="95" cy="150" r="2" fill="#06B6D4" opacity="0.6" />
        </motion.g>

        {/* Ambient Light Effects */}
        <circle
          cx="150"
          cy="150"
          r="130"
          fill="none"
          stroke="#A78BFA"
          strokeWidth="0.5"
          opacity="0.1"
        />
      </svg>
    </motion.div>
  );
}
