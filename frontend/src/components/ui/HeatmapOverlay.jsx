import React, { useState } from 'react';
import { Layers, Flame, Box, Key, Binary } from 'lucide-react';

export default function HeatmapOverlay({
  heatmapImg,
  contoursImg,
  binaryMaskImg,
  keypointsImg,
  modifiedImg
}) {
  const [activeLayer, setActiveLayer] = useState('heatmap'); // 'heatmap' | 'contours' | 'binary' | 'keypoints'
  const [opacity, setOpacity] = useState(0.85);

  const layerOptions = [
    { id: 'heatmap', label: 'Difference Heatmap', icon: Flame, color: 'from-amber-500 to-red-500', img: heatmapImg },
    { id: 'contours', label: 'Contour Bounding Boxes', icon: Box, color: 'from-cyan-500 to-blue-500', img: contoursImg },
    { id: 'binary', label: 'Binary Difference Mask', icon: Binary, color: 'from-emerald-500 to-teal-500', img: binaryMaskImg },
    { id: 'keypoints', label: 'ORB Feature Matches', icon: Key, color: 'from-purple-500 to-violet-500', img: keypointsImg },
  ];

  const currentLayer = layerOptions.find((l) => l.id === activeLayer);

  return (
    <div className="space-y-4">
      {/* Layer Selection Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
          {layerOptions.map((layer) => {
            const Icon = layer.icon;
            const isActive = activeLayer === layer.id;
            return (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? `bg-gradient-to-r ${layer.color} text-white shadow-lg shadow-cyan-500/20`
                    : 'bg-slate-800/60 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon size={15} />
                {layer.label}
              </button>
            );
          })}
        </div>

        {/* Opacity Slider */}
        <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
          <Layers size={14} className="text-cyan-400" />
          <span>Opacity: {Math.round(opacity * 100)}%</span>
          <input
            type="range"
            min="0.1"
            max="1.0"
            step="0.05"
            value={opacity}
            onChange={(e) => setOpacity(parseFloat(e.target.value))}
            className="w-24 accent-cyan-400 cursor-pointer"
          />
        </div>
      </div>

      {/* Visual Overlay Container */}
      <div className="relative w-full h-[450px] md:h-[550px] rounded-2xl overflow-hidden bg-slate-950 border border-cyan-500/20 shadow-2xl">
        {/* Base Image */}
        <img
          src={modifiedImg}
          alt="Modified Base"
          className="absolute inset-0 w-full h-full object-contain"
        />

        {/* Layer Overlay */}
        {currentLayer && (
          <img
            src={currentLayer.img}
            alt={currentLayer.label}
            className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 pointer-events-none"
            style={{ opacity: opacity }}
          />
        )}

        <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 text-xs font-semibold text-cyan-300 shadow-lg flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          {currentLayer?.label} Active
        </div>
      </div>
    </div>
  );
}
