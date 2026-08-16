import React from 'react';

export default function MetricsGauge({ score = 95.5, label = "SSIM Similarity", sublabel = "Structural Similarity Index" }) {
  const radius = 60;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let colorClass = "text-cyan-400";
  let gradientId = "cyanGradient";
  if (score < 60) {
    colorClass = "text-red-400";
    gradientId = "redGradient";
  } else if (score < 85) {
    colorClass = "text-amber-400";
    gradientId = "amberGradient";
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md relative overflow-hidden group hover:border-cyan-500/30 transition-all">
      <div className="relative w-36 h-36 flex items-center justify-center">
        <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
          <defs>
            <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
            <linearGradient id="amberGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
            <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#b91c1c" />
            </linearGradient>
          </defs>
          <circle
            stroke="rgba(255, 255, 255, 0.08)"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke={`url(#${gradientId})`}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={`text-3xl font-extrabold tracking-tight ${colorClass}`}>
            {score}%
          </span>
          <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase mt-0.5">
            Match
          </span>
        </div>
      </div>

      <div className="mt-3 text-center">
        <h4 className="text-sm font-bold text-white tracking-wide">{label}</h4>
        <p className="text-xs text-slate-400 mt-0.5">{sublabel}</p>
      </div>
    </div>
  );
}
