import { useRef, useEffect } from 'react';

/**
 * Tooltip — Hover tooltip for icon-only buttons
 * Usage: <Tooltip label="Copy"><button>...</button></Tooltip>
 */
export default function Tooltip({ label, children, position = 'top' }) {
  return (
    <div className="relative group inline-flex">
      {children}
      <span
        role="tooltip"
        className={`
          absolute z-50 px-2.5 py-1.5 text-xs font-medium text-white
          bg-gray-900 rounded-lg border border-white/10 whitespace-nowrap
          opacity-0 group-hover:opacity-100 pointer-events-none
          transition-opacity duration-150
          ${position === 'top' ? 'bottom-full mb-2 left-1/2 -translate-x-1/2' : ''}
          ${position === 'bottom' ? 'top-full mt-2 left-1/2 -translate-x-1/2' : ''}
          ${position === 'left' ? 'right-full mr-2 top-1/2 -translate-y-1/2' : ''}
          ${position === 'right' ? 'left-full ml-2 top-1/2 -translate-y-1/2' : ''}
        `}
      >
        {label}
      </span>
    </div>
  );
}
