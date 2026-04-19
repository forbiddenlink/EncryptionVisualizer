import React, { useMemo } from 'react';
import type { TLSStep } from '@/lib/types/tls';
import { m } from 'framer-motion';
import { Lock, Unlock } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface TLSMessageFlowProps {
  steps: TLSStep[];
  currentStep: number;
}

const STEP_HEIGHT = 72;
const COLUMN_WIDTH = 120;
const ARROW_START = COLUMN_WIDTH + 20;
const ARROW_END = 380 - 20;
const CENTER_X = (ARROW_START + ARROW_END) / 2;

function getStepColorClass(step: TLSStep): string {
  if (step.dataExchanged?.encrypted) return 'text-emerald-500 dark:text-emerald-400';
  return 'text-red-500 dark:text-red-400';
}

function getArrowStroke(step: TLSStep): string {
  if (step.dataExchanged?.encrypted) return '#10B981';
  if (step.actor === 'both') return '#8B5CF6';
  return '#EF4444';
}

export const TLSMessageFlow: React.FC<TLSMessageFlowProps> = ({ steps, currentStep }) => {
  const prefersReducedMotion = useReducedMotion();

  const totalHeight = useMemo(() => Math.max(steps.length * STEP_HEIGHT + 60, 200), [steps.length]);

  if (steps.length === 0) return null;

  return (
    <div className="glass-card p-4 sm:p-6 overflow-x-auto">
      <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        <div className="w-1.5 h-1.5 bg-cyber-cyan rounded-full" />
        Message Sequence Diagram
      </h3>

      <svg
        viewBox={`0 0 400 ${totalHeight}`}
        className="w-full max-w-md mx-auto"
        style={{ minHeight: `${totalHeight}px` }}
      >
        {/* Column headers */}
        <text
          x={COLUMN_WIDTH / 2}
          y={20}
          textAnchor="middle"
          className="fill-blue-600 dark:fill-blue-400 text-xs font-bold"
          fontSize="13"
          fontWeight="700"
        >
          Client
        </text>
        <text
          x={400 - COLUMN_WIDTH / 2}
          y={20}
          textAnchor="middle"
          className="fill-violet-600 dark:fill-violet-400 text-xs font-bold"
          fontSize="13"
          fontWeight="700"
        >
          Server
        </text>

        {/* Vertical timelines */}
        <line
          x1={COLUMN_WIDTH / 2}
          y1={30}
          x2={COLUMN_WIDTH / 2}
          y2={totalHeight - 10}
          stroke="currentColor"
          strokeWidth={2}
          className="text-slate-300 dark:text-slate-600"
          strokeDasharray="4 4"
        />
        <line
          x1={400 - COLUMN_WIDTH / 2}
          y1={30}
          x2={400 - COLUMN_WIDTH / 2}
          y2={totalHeight - 10}
          stroke="currentColor"
          strokeWidth={2}
          className="text-slate-300 dark:text-slate-600"
          strokeDasharray="4 4"
        />

        {/* Messages */}
        {steps.map((step, idx) => {
          const y = 50 + idx * STEP_HEIGHT;
          const isActive = idx === currentStep;
          const isPast = idx < currentStep;
          const opacity = isActive ? 1 : isPast ? 0.7 : 0.25;
          const arrowColor = getArrowStroke(step);

          const isClientToServer = step.actor === 'client' || step.dataExchanged?.direction === 'client-to-server';
          const isServerToClient = step.actor === 'server' || step.dataExchanged?.direction === 'server-to-client';
          const isBoth = step.actor === 'both';

          const fromX = isClientToServer ? ARROW_START - 40 : ARROW_END + 40;
          const toX = isClientToServer ? ARROW_END + 40 : ARROW_START - 40;

          return (
            <g key={idx} opacity={opacity}>
              {isBoth ? (
                <>
                  {/* Bidirectional indicator */}
                  <rect
                    x={CENTER_X - 70}
                    y={y - 10}
                    width={140}
                    height={28}
                    rx={6}
                    fill={isActive ? arrowColor : 'transparent'}
                    fillOpacity={isActive ? 0.15 : 0}
                    stroke={arrowColor}
                    strokeWidth={isActive ? 2 : 1}
                    strokeDasharray={isActive ? undefined : '4 4'}
                  />
                  <text
                    x={CENTER_X}
                    y={y + 5}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight={isActive ? '700' : '500'}
                    fill={arrowColor}
                  >
                    {step.title}
                  </text>
                  {/* Dots on both timelines */}
                  <circle cx={COLUMN_WIDTH / 2} cy={y + 4} r={4} fill={arrowColor} />
                  <circle cx={400 - COLUMN_WIDTH / 2} cy={y + 4} r={4} fill={arrowColor} />
                  {/* Connecting lines */}
                  <line
                    x1={COLUMN_WIDTH / 2 + 6}
                    y1={y + 4}
                    x2={CENTER_X - 72}
                    y2={y + 4}
                    stroke={arrowColor}
                    strokeWidth={1}
                    strokeDasharray="3 3"
                    opacity={0.5}
                  />
                  <line
                    x1={CENTER_X + 72}
                    y1={y + 4}
                    x2={400 - COLUMN_WIDTH / 2 - 6}
                    y2={y + 4}
                    stroke={arrowColor}
                    strokeWidth={1}
                    strokeDasharray="3 3"
                    opacity={0.5}
                  />
                </>
              ) : (
                <>
                  {/* Directional arrow */}
                  <line
                    x1={fromX}
                    y1={y + 4}
                    x2={toX}
                    y2={y + 4}
                    stroke={arrowColor}
                    strokeWidth={isActive ? 2.5 : 1.5}
                  />
                  {/* Arrowhead */}
                  <polygon
                    points={
                      isClientToServer
                        ? `${toX},${y + 4} ${toX - 8},${y - 2} ${toX - 8},${y + 10}`
                        : `${toX},${y + 4} ${toX + 8},${y - 2} ${toX + 8},${y + 10}`
                    }
                    fill={arrowColor}
                  />
                  {/* Label */}
                  <text
                    x={CENTER_X}
                    y={y - 4}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight={isActive ? '700' : '500'}
                    fill={arrowColor}
                  >
                    {step.title}
                  </text>
                </>
              )}

              {/* Encryption indicator */}
              {step.dataExchanged && (
                <g transform={`translate(${CENTER_X + 75}, ${y - 4})`}>
                  {step.dataExchanged.encrypted ? (
                    <rect x={-2} y={-6} width={14} height={14} rx={2} fill="#10B981" fillOpacity={0.2} />
                  ) : (
                    <rect x={-2} y={-6} width={14} height={14} rx={2} fill="#EF4444" fillOpacity={0.2} />
                  )}
                </g>
              )}

              {/* Active step highlight */}
              {isActive && !prefersReducedMotion && (
                <m.rect
                  x={10}
                  y={y - 16}
                  width={380}
                  height={STEP_HEIGHT - 8}
                  rx={8}
                  fill="currentColor"
                  className="text-indigo-500/5 dark:text-indigo-400/5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}

              {/* Step number */}
              <text
                x={isClientToServer || isBoth ? fromX - 18 : fromX + 18}
                y={y + 24}
                textAnchor="middle"
                fontSize="9"
                className="fill-slate-400 dark:fill-slate-500"
              >
                {idx + 1}
              </text>
            </g>
          );
        })}

        {/* Encryption legend */}
        <g transform={`translate(10, ${totalHeight - 30})`}>
          <rect x={0} y={0} width={8} height={8} rx={2} fill="#EF4444" fillOpacity={0.4} />
          <text x={12} y={7} fontSize="9" className="fill-slate-500 dark:fill-slate-400">
            Unencrypted
          </text>
          <rect x={80} y={0} width={8} height={8} rx={2} fill="#10B981" fillOpacity={0.4} />
          <text x={92} y={7} fontSize="9" className="fill-slate-500 dark:fill-slate-400">
            Encrypted
          </text>
          <rect x={155} y={0} width={8} height={8} rx={2} fill="#8B5CF6" fillOpacity={0.4} />
          <text x={167} y={7} fontSize="9" className="fill-slate-500 dark:fill-slate-400">
            Both sides
          </text>
        </g>
      </svg>
    </div>
  );
};
