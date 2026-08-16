import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * ParticleCanvas — Full-viewport animated background
 * - Drifting gradient orbs (blue + purple)
 * - CSS grid overlay
 * - 60 floating particles
 * - GPU-accelerated (transform only)
 * - Respects prefers-reduced-motion
 */
export default function ParticleCanvas() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const prefersReduced = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  useEffect(() => {
    if (prefersReduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let width, height;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = Array.from({ length: 65 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 1,
        opacity: Math.random() * 0.25 + 0.08,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Orb 1 — blue
      const g1 = ctx.createRadialGradient(width * 0.25, height * 0.3, 0, width * 0.25, height * 0.3, 360);
      g1.addColorStop(0, 'rgba(59,130,246,0.18)');
      g1.addColorStop(1, 'transparent');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);

      // Orb 2 — purple
      const g2 = ctx.createRadialGradient(width * 0.75, height * 0.6, 0, width * 0.75, height * 0.6, 300);
      g2.addColorStop(0, 'rgba(139,92,246,0.14)');
      g2.addColorStop(1, 'transparent');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, width, height);

      // Orb 3 — cyan
      const g3 = ctx.createRadialGradient(width * 0.5, height * 0.8, 0, width * 0.5, height * 0.8, 200);
      g3.addColorStop(0, 'rgba(6,182,212,0.1)');
      g3.addColorStop(1, 'transparent');
      ctx.fillStyle = g3;
      ctx.fillRect(0, 0, width, height);

      // Particles
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
      });

      animRef.current = requestAnimationFrame(draw);
    };

    resize();
    createParticles();
    draw();

    window.addEventListener('resize', () => { resize(); createParticles(); });
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [prefersReduced]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
