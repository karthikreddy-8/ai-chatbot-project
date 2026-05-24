import { motion } from 'framer-motion';
import { useMemo } from 'react';

/**
 * AnimatedBackground — Floating neon orbs and particle system
 * with purple/cyan gradient effects for the futuristic theme.
 */
export default function AnimatedBackground({ particleCount = 40 }) {
  // Generate particles once using useMemo to avoid re-renders
  const particles = useMemo(() =>
    Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 8,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2.5,
      drift: (Math.random() - 0.5) * 80,
    })),
    [particleCount]
  );

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Top-left orb — Purple */}
      <motion.div
        className="absolute w-[600px] h-[600px] -top-[250px] -left-[250px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(124, 58, 237, 0.25), transparent 70%)' }}
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -40, 50, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Top-right orb — Cyan */}
      <motion.div
        className="absolute w-[500px] h-[500px] top-[50px] -right-[200px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(6, 182, 212, 0.2), transparent 70%)' }}
        animate={{
          x: [0, -50, 40, 0],
          y: [0, 50, -30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Bottom-center orb — Purple/Pink */}
      <motion.div
        className="absolute w-[700px] h-[700px] -bottom-[350px] left-[25%] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(124, 58, 237, 0.15), transparent 70%)' }}
        animate={{
          x: [0, 70, -50, 0],
          y: [0, -50, 30, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Center accent — Cyan glow */}
      <motion.div
        className="absolute w-[300px] h-[300px] top-[45%] left-[55%] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.12), transparent 70%)',
        }}
        animate={{
          x: [0, -40, 60, 0],
          y: [0, 60, -40, 0],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            background: particle.id % 3 === 0
              ? 'rgba(124, 58, 237, 0.7)'
              : particle.id % 3 === 1
              ? 'rgba(6, 182, 212, 0.7)'
              : 'rgba(167, 139, 250, 0.7)',
            boxShadow: particle.id % 2 === 0
              ? `0 0 ${particle.size * 4}px rgba(124, 58, 237, 0.6)`
              : `0 0 ${particle.size * 4}px rgba(6, 182, 212, 0.6)`,
          }}
          animate={{
            y: [0, -(typeof window !== 'undefined' ? window.innerHeight : 800) - 100],
            opacity: [0, 0.8, 0.8, 0],
            x: [0, particle.drift],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(124, 58, 237, 0.4) 25%, rgba(124, 58, 237, 0.4) 26%, transparent 27%, transparent 74%, rgba(124, 58, 237, 0.4) 75%, rgba(124, 58, 237, 0.4) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(124, 58, 237, 0.4) 25%, rgba(124, 58, 237, 0.4) 26%, transparent 27%, transparent 74%, rgba(124, 58, 237, 0.4) 75%, rgba(124, 58, 237, 0.4) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}
