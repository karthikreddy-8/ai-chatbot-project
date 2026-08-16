import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, MoveHorizontal } from 'lucide-react';

export default function ImageCompareSlider({
  baselineImg,
  modifiedImg,
  baselineLabel = "Baseline (Original)",
  modifiedLabel = "Modified (Evolution)"
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let pos = (x / rect.width) * 100;
    if (pos < 0) pos = 0;
    if (pos > 100) pos = 100;
    setSliderPosition(pos);
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (e) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[450px] md:h-[550px] rounded-2xl overflow-hidden select-none cursor-ew-resize border border-cyan-500/20 bg-slate-950 shadow-2xl"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
    >
      {/* Base Layer: Baseline Image */}
      <img
        src={baselineImg}
        alt={baselineLabel}
        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
      />
      <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 text-xs font-semibold text-cyan-300 shadow-md">
        {baselineLabel}
      </div>

      {/* Top Layer: Modified Image (Clipped by slider position) */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <img
          src={modifiedImg}
          alt={modifiedLabel}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        />
        <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-violet-500/30 text-xs font-semibold text-violet-300 shadow-md">
          {modifiedLabel}
        </div>
      </div>

      {/* Vertical Slider Divider Line */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 via-white to-violet-500 pointer-events-none z-20 shadow-[0_0_15px_rgba(6,182,212,0.8)]"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Drag Handle Knob */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-950/90 border-2 border-cyan-400 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.6)] backdrop-blur-md">
          <MoveHorizontal size={18} />
        </div>
      </div>
    </div>
  );
}
