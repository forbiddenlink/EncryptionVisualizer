import React from 'react';

interface SkeletonProps {
  variant?: 'text' | 'card' | 'matrix' | 'chart';
  className?: string;
  lines?: number;
  rows?: number;
  cols?: number;
}

const TextSkeleton: React.FC<{ lines: number; className?: string }> = ({ lines, className }) => (
  <div className={`space-y-3 ${className ?? ''}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className="h-4 bg-slate-200 dark:bg-slate-700/50 rounded animate-pulse"
        style={{ width: i === lines - 1 ? '60%' : '100%' }}
      />
    ))}
  </div>
);

const CardSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`glass-card p-6 space-y-4 ${className ?? ''}`}>
    <div className="flex items-start justify-between">
      <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700/50 rounded-lg animate-pulse" />
      <div className="w-16 h-6 bg-slate-200 dark:bg-slate-700/50 rounded animate-pulse" />
    </div>
    <div className="space-y-2">
      <div className="h-5 w-3/4 bg-slate-200 dark:bg-slate-700/50 rounded animate-pulse" />
      <div className="h-4 w-full bg-slate-200 dark:bg-slate-700/50 rounded animate-pulse" />
      <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-700/50 rounded animate-pulse" />
    </div>
    <div className="flex gap-2">
      <div className="h-6 w-20 bg-slate-200 dark:bg-slate-700/50 rounded animate-pulse" />
    </div>
  </div>
);

const MatrixSkeleton: React.FC<{ rows: number; cols: number; className?: string }> = ({
  rows,
  cols,
  className,
}) => (
  <div className={`glass-card p-4 ${className ?? ''}`}>
    <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {Array.from({ length: rows * cols }).map((_, i) => (
        <div
          key={i}
          className="aspect-square bg-slate-200 dark:bg-slate-700/50 rounded-md animate-pulse"
          style={{ animationDelay: `${(i % cols) * 75 + Math.floor(i / cols) * 75}ms` }}
        />
      ))}
    </div>
  </div>
);

const ChartSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`glass-card p-6 ${className ?? ''}`}>
    <div className="h-5 w-32 bg-slate-200 dark:bg-slate-700/50 rounded animate-pulse mb-4" />
    <div className="flex items-end gap-2 h-40">
      {[40, 65, 30, 80, 55, 70, 45, 90, 60, 35].map((height, i) => (
        <div
          key={i}
          className="flex-1 bg-slate-200 dark:bg-slate-700/50 rounded-t animate-pulse"
          style={{
            height: `${height}%`,
            animationDelay: `${i * 100}ms`,
          }}
        />
      ))}
    </div>
    <div className="mt-3 flex justify-between">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-3 w-8 bg-slate-200 dark:bg-slate-700/50 rounded animate-pulse" />
      ))}
    </div>
  </div>
);

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  className,
  lines = 3,
  rows = 4,
  cols = 4,
}) => {
  switch (variant) {
    case 'text':
      return <TextSkeleton lines={lines} className={className} />;
    case 'card':
      return <CardSkeleton className={className} />;
    case 'matrix':
      return <MatrixSkeleton rows={rows} cols={cols} className={className} />;
    case 'chart':
      return <ChartSkeleton className={className} />;
    default:
      return <TextSkeleton lines={lines} className={className} />;
  }
};
