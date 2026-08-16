/**
 * Skeleton — Shimmer loading placeholder
 */
export default function Skeleton({ className = '', width, height, rounded = 'md' }) {
  const radiusMap = {
    sm: 'rounded',
    md: 'rounded-xl',
    lg: 'rounded-2xl',
    full: 'rounded-full',
  };
  return (
    <div
      className={`skeleton ${radiusMap[rounded] || 'rounded-xl'} ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}

export function SkeletonText({ lines = 3, className = '' }) {
  const widths = ['100%', '85%', '65%'];
  return (
    <div className={`space-y-2.5 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} height={14} style={{ width: widths[i % widths.length] }} />
      ))}
    </div>
  );
}

export function SkeletonMessage() {
  return (
    <div className="flex gap-3 items-start p-4">
      <Skeleton width={32} height={32} rounded="md" />
      <div className="flex-1 space-y-2">
        <Skeleton height={12} style={{ width: '30%' }} />
        <Skeleton height={14} style={{ width: '100%' }} />
        <Skeleton height={14} style={{ width: '80%' }} />
        <Skeleton height={14} style={{ width: '60%' }} />
      </div>
    </div>
  );
}
