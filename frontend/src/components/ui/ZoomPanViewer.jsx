import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2 } from 'lucide-react';

export default function ZoomPanViewer({ baselineImg, modifiedImg }) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.25, 4));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.75));
  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    setIsPanning(true);
    setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (!isPanning) return;
    setPosition({
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y,
    });
  };

  const handleMouseUp = () => setIsPanning(false);

  return (
    <div className="space-y-4">
      {/* Zoom Controls Bar */}
      <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
          <Maximize2 size={16} className="text-cyan-400" />
          Synchronized Dual Pan & Zoom ({Math.round(scale * 100)}%)
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomIn}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-cyan-500/20 hover:text-cyan-400 text-slate-300 transition"
            title="Zoom In"
          >
            <ZoomIn size={16} />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-cyan-500/20 hover:text-cyan-400 text-slate-300 transition"
            title="Zoom Out"
          >
            <ZoomOut size={16} />
          </button>
          <button
            onClick={handleReset}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-violet-500/20 hover:text-violet-400 text-slate-300 transition"
            title="Reset Zoom"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Synchronized Viewports */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Baseline Viewport */}
        <div className="relative h-[400px] rounded-2xl overflow-hidden bg-slate-950 border border-cyan-500/20">
          <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-slate-900/80 border border-cyan-500/30 text-xs font-semibold text-cyan-400">
            Baseline Image
          </div>
          <div
            className="w-full h-full flex items-center justify-center transition-transform duration-75 ease-out"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            }}
          >
            <img src={baselineImg} alt="Baseline" className="max-w-full max-h-full object-contain" />
          </div>
        </div>

        {/* Modified Viewport */}
        <div className="relative h-[400px] rounded-2xl overflow-hidden bg-slate-950 border border-violet-500/20">
          <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-slate-900/80 border border-violet-500/30 text-xs font-semibold text-violet-400">
            Modified Image
          </div>
          <div
            className="w-full h-full flex items-center justify-center transition-transform duration-75 ease-out"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            }}
          >
            <img src={modifiedImg} alt="Modified" className="max-w-full max-h-full object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
}
