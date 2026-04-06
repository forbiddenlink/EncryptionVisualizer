import React, { useMemo } from 'react';
import type { HashStep } from '@/lib/crypto/hash';
import { m } from 'framer-motion';
import { Hash, Binary, Cpu, CheckCircle } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface HashVisualizerProps {
  steps: HashStep[];
  currentStep: number;
}

export const HashVisualizer: React.FC<HashVisualizerProps> = ({ steps, currentStep }) => {
  const prefersReducedMotion = useReducedMotion();

  const transition = useMemo(() =>
    prefersReducedMotion
      ? { duration: 0 }
      : { type: 'spring' as const, stiffness: 400, damping: 40 },
    [prefersReducedMotion]
  );

  if (steps.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <div className="inline-block p-4 bg-emerald-100 dark:bg-emerald-500/20 rounded-2xl mb-4">
          <Hash className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Ready to Hash</h3>
        <p className="text-slate-600 dark:text-slate-400">
          Enter text above to see how hash functions transform input into a fixed-size output
        </p>
      </div>
    );
  }

  const step = steps[currentStep];

  const getStepColor = (type: HashStep['type']) => {
    switch (type) {
      case 'input': return { bg: 'bg-blue-600', text: 'text-blue-600 dark:text-cyber-cyan', border: 'border-blue-300 dark:border-blue-500/30' };
      case 'preprocessing': return { bg: 'bg-purple-600', text: 'text-purple-600 dark:text-purple-400', border: 'border-purple-300 dark:border-purple-500/30' };
      case 'initialization': return { bg: 'bg-yellow-600', text: 'text-yellow-600 dark:text-yellow-400', border: 'border-yellow-300 dark:border-yellow-500/30' };
      case 'compression': return { bg: 'bg-red-600', text: 'text-red-600 dark:text-red-400', border: 'border-red-300 dark:border-red-500/30' };
      case 'output': return { bg: 'bg-emerald-600', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-300 dark:border-emerald-500/30' };
      default: return { bg: 'bg-slate-600', text: 'text-slate-600 dark:text-slate-400', border: 'border-slate-300 dark:border-slate-500/30' };
    }
  };

  const stepColor = getStepColor(step.type);

  const getStepIcon = (type: HashStep['type']) => {
    switch (type) {
      case 'output': return <CheckCircle className="w-7 h-7 text-white" strokeWidth={2.5} />;
      case 'preprocessing': return <Binary className="w-7 h-7 text-white" strokeWidth={2.5} />;
      default: return <Cpu className="w-7 h-7 text-white" strokeWidth={2.5} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <m.div
        key={currentStep}
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, filter: "blur(4px)" }}
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -20, filter: "blur(4px)" }}
        transition={transition}
        className="glass-card p-6 space-y-4"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-4 ${stepColor.bg} rounded-2xl shadow-lg`}>
              {getStepIcon(step.type)}
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{step.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold mt-1">
                Step {step.stepNumber + 1} of {steps.length}
              </p>
            </div>
          </div>
        </div>

        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{step.description}</p>

        {/* Data Display */}
        {step.data && (
          <div className="space-y-3">
            {step.data.input && (
              <div className={`bg-slate-100 dark:bg-slate-800 p-4 border-2 ${stepColor.border} rounded-xl`}>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-2">INPUT:</div>
                <div className="text-lg font-mono text-slate-900 dark:text-white break-all">{step.data.input}</div>
              </div>
            )}

            {step.data.binary && (
              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl">
                <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-2">BINARY REPRESENTATION:</div>
                <div className="text-sm font-mono text-slate-700 dark:text-slate-300 break-all overflow-x-auto">
                  {step.data.binary}
                </div>
              </div>
            )}

            {step.data.chunks && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {step.data.chunks.map((chunk, idx) => (
                  <div key={`chunk-${idx}-${chunk}`} className="bg-slate-100 dark:bg-slate-800 p-3 text-center rounded-lg">
                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Chunk {idx + 1}</div>
                    <div className="text-sm font-mono text-slate-900 dark:text-white">{chunk}</div>
                  </div>
                ))}
              </div>
            )}

            {step.data.hash && (
              <div className={`bg-slate-100 dark:bg-slate-800 p-6 border-2 ${stepColor.border} rounded-xl`}>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-3">HASH OUTPUT:</div>
                <div className={`text-2xl sm:text-3xl font-mono font-bold ${stepColor.text} break-all`}>
                  {step.data.hash}
                </div>
                <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                  {step.data.hash.length * 4} bits - {step.data.hash.length} hex characters
                </div>
              </div>
            )}
          </div>
        )}
      </m.div>
    </div>
  );
};
