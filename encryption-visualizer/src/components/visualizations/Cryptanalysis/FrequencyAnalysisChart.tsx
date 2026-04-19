import React, { useMemo } from 'react';
import { m } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface FrequencyDatum {
  letter: string;
  count: number;
  expected: number;
}

interface FrequencyAnalysisChartProps {
  data: FrequencyDatum[];
  totalLetters: number;
  highlightTop?: number;
}

export const FrequencyAnalysisChart: React.FC<FrequencyAnalysisChartProps> = ({
  data,
  totalLetters,
  highlightTop = 3,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const sortedByAlpha = useMemo(
    () => [...data].sort((a, b) => a.letter.localeCompare(b.letter)),
    [data]
  );

  const maxCount = useMemo(
    () => Math.max(...sortedByAlpha.map((d) => d.count), 1),
    [sortedByAlpha]
  );

  const maxExpected = useMemo(
    () => Math.max(...sortedByAlpha.map((d) => d.expected), 1),
    [sortedByAlpha]
  );

  const maxValue = Math.max(maxCount, maxExpected);

  // Find top N by count for highlighting
  const topLetters = useMemo(() => {
    const sorted = [...data].sort((a, b) => b.count - a.count);
    return new Set(sorted.slice(0, highlightTop).map((d) => d.letter));
  }, [data, highlightTop]);

  const barWidth = 14;
  const gap = 4;
  const chartHeight = 180;
  const chartWidth = sortedByAlpha.length * (barWidth * 2 + gap + 8);
  const padding = { top: 20, bottom: 30, left: 10, right: 10 };

  return (
    <div className="glass-card p-4 sm:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
          Letter Frequency Comparison
        </h4>
        <div className="flex items-center gap-4 text-[10px]">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-sm bg-amber-500" />
            Ciphertext
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-sm bg-blue-400/50" />
            Expected English
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <svg
          width={chartWidth + padding.left + padding.right}
          height={chartHeight + padding.top + padding.bottom}
          className="mx-auto"
        >
          {/* Gridlines */}
          {[0.25, 0.5, 0.75, 1].map((frac) => (
            <line
              key={frac}
              x1={padding.left}
              x2={chartWidth + padding.left}
              y1={padding.top + chartHeight * (1 - frac)}
              y2={padding.top + chartHeight * (1 - frac)}
              stroke="currentColor"
              className="text-slate-200 dark:text-slate-700"
              strokeDasharray="3 3"
            />
          ))}

          {sortedByAlpha.map((datum, idx) => {
            const x = padding.left + idx * (barWidth * 2 + gap + 8);
            const cipherHeight = maxValue > 0
              ? (datum.count / maxValue) * chartHeight
              : 0;
            const expectedHeight = maxValue > 0
              ? (datum.expected / maxValue) * chartHeight
              : 0;
            const isTop = topLetters.has(datum.letter);

            return (
              <g key={datum.letter}>
                {/* Expected (English) bar */}
                <m.rect
                  x={x}
                  width={barWidth}
                  y={padding.top + chartHeight - expectedHeight}
                  height={expectedHeight}
                  rx={2}
                  className="fill-blue-400/40 dark:fill-blue-500/30"
                  initial={prefersReducedMotion ? {} : { height: 0, y: padding.top + chartHeight }}
                  animate={{ height: expectedHeight, y: padding.top + chartHeight - expectedHeight }}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: idx * 0.02 }}
                />

                {/* Ciphertext bar */}
                <m.rect
                  x={x + barWidth + 2}
                  width={barWidth}
                  y={padding.top + chartHeight - cipherHeight}
                  height={cipherHeight}
                  rx={2}
                  className={isTop
                    ? 'fill-amber-500 dark:fill-amber-400'
                    : 'fill-amber-500/60 dark:fill-amber-400/50'
                  }
                  initial={prefersReducedMotion ? {} : { height: 0, y: padding.top + chartHeight }}
                  animate={{ height: cipherHeight, y: padding.top + chartHeight - cipherHeight }}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: idx * 0.02 + 0.1 }}
                />

                {/* Match indicator */}
                {isTop && (
                  <m.circle
                    cx={x + barWidth + 1}
                    cy={padding.top - 6}
                    r={3}
                    className="fill-red-500"
                    initial={prefersReducedMotion ? {} : { scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, delay: 0.6 }}
                  />
                )}

                {/* Letter label */}
                <text
                  x={x + barWidth}
                  y={padding.top + chartHeight + 16}
                  textAnchor="middle"
                  className={`text-[10px] font-mono ${
                    isTop
                      ? 'fill-amber-600 dark:fill-amber-400 font-bold'
                      : 'fill-slate-500 dark:fill-slate-400'
                  }`}
                >
                  {datum.letter}
                </text>
              </g>
            );
          })}

          {/* Baseline */}
          <line
            x1={padding.left}
            x2={chartWidth + padding.left}
            y1={padding.top + chartHeight}
            y2={padding.top + chartHeight}
            stroke="currentColor"
            className="text-slate-300 dark:text-slate-600"
          />
        </svg>
      </div>

      {/* Top frequencies summary */}
      <div className="grid grid-cols-3 gap-2">
        {[...data]
          .sort((a, b) => b.count - a.count)
          .slice(0, 3)
          .map((d, idx) => (
            <div
              key={d.letter}
              className="bg-slate-50 dark:bg-cyber-dark border border-slate-200 dark:border-white/5 p-2 rounded-lg text-center"
            >
              <div className="text-lg font-mono font-bold text-amber-600 dark:text-amber-400">
                {d.letter}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400">
                {d.count}x ({totalLetters > 0 ? ((d.count / totalLetters) * 100).toFixed(1) : 0}%)
              </div>
              <div className="text-[10px] text-blue-500 dark:text-blue-400">
                #{idx + 1} most frequent
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
