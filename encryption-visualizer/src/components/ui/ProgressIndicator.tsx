import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ProgressIndicatorProps {
  percentage: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  percentage,
  size = 'md',
  showLabel = true,
}) => {
  const sizeConfig = {
    sm: { ring: 32, stroke: 3, text: 'text-xs' },
    md: { ring: 48, stroke: 4, text: 'text-sm' },
    lg: { ring: 64, stroke: 5, text: 'text-base' },
  };

  const config = sizeConfig[size];
  const radius = (config.ring - config.stroke) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const isComplete = percentage >= 100;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={config.ring}
        height={config.ring}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={config.ring / 2}
          cy={config.ring / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={config.stroke}
          className="text-slate-200 dark:text-slate-700"
        />
        {/* Progress circle */}
        <circle
          cx={config.ring / 2}
          cy={config.ring / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={config.stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={isComplete ? 'text-emerald-500' : 'text-cyber-blue'}
          style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          {isComplete ? (
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          ) : (
            <span className={`font-bold ${config.text} text-slate-700 dark:text-slate-300`}>
              {percentage}%
            </span>
          )}
        </div>
      )}
    </div>
  );
};

interface CompletionBadgeProps {
  isComplete: boolean;
  quizScore?: { score: number; total: number } | null;
}

export const CompletionBadge: React.FC<CompletionBadgeProps> = ({
  isComplete,
  quizScore,
}) => {
  if (!isComplete && !quizScore) return null;

  return (
    <div className="absolute top-3 right-3 flex flex-col items-end gap-1">
      {isComplete && (
        <div className="flex items-center gap-1 px-2 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
          <CheckCircle className="w-3 h-3 text-emerald-500" />
          <span className="text-[10px] font-semibold text-emerald-500">Completed</span>
        </div>
      )}
      {quizScore && (
        <div className="px-2 py-1 bg-cyber-blue/10 border border-cyber-blue/30 rounded-full">
          <span className="text-[10px] font-semibold text-cyber-blue">
            Quiz: {quizScore.score}/{quizScore.total}
          </span>
        </div>
      )}
    </div>
  );
};
