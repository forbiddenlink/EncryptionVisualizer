import React, { useMemo } from 'react';
import type { RSAStep } from '@/lib/types';
import { m } from 'framer-motion';
import { Key, Lock, Hash, CheckCircle } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface RSAVisualizerProps {
  steps: RSAStep[];
  currentStep: number;
}

export const RSAVisualizer: React.FC<RSAVisualizerProps> = ({ steps, currentStep }) => {
  const prefersReducedMotion = useReducedMotion();

  const transition = useMemo(() =>
    prefersReducedMotion
      ? { duration: 0 }
      : { type: 'spring' as const, stiffness: 400, damping: 40 },
    [prefersReducedMotion]
  );

  const itemTransition = useMemo(() =>
    prefersReducedMotion
      ? { duration: 0 }
      : { duration: 0.3 },
    [prefersReducedMotion]
  );

  if (steps.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <div className="inline-block p-4 bg-purple-100 dark:bg-purple-500/20 rounded-2xl mb-4">
          <Key className="w-12 h-12 text-purple-600 dark:text-purple-400" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Ready to Generate Keys</h3>
        <p className="text-slate-600 dark:text-slate-400">
          Click "Generate RSA Key Pair" above to see how RSA encryption works step-by-step
        </p>
      </div>
    );
  }

  const step = steps[currentStep];
  
  const getStepColor = (type: RSAStep['type']) => {
    switch (type) {
      case 'prime-selection': return { bg: 'from-blue-600 to-indigo-500', text: 'text-blue-400', border: 'border-blue-500/30' };
      case 'modulus-calculation': return { bg: 'from-purple-600 to-pink-500', text: 'text-purple-400', border: 'border-purple-500/30' };
      case 'phi-calculation': return { bg: 'from-green-600 to-emerald-500', text: 'text-green-400', border: 'border-green-500/30' };
      case 'e-selection': return { bg: 'from-yellow-600 to-orange-500', text: 'text-yellow-400', border: 'border-yellow-500/30' };
      case 'd-calculation': return { bg: 'from-red-600 to-pink-500', text: 'text-red-400', border: 'border-red-500/30' };
      case 'complete': return { bg: 'from-emerald-600 to-teal-500', text: 'text-emerald-400', border: 'border-emerald-500/30' };
      default: return { bg: 'from-gray-600 to-gray-500', text: 'text-gray-400', border: 'border-gray-500/30' };
    }
  };

  const stepColor = getStepColor(step.type);

  const getStepIcon = (type: RSAStep['type']) => {
    switch (type) {
      case 'complete': return <CheckCircle className="w-7 h-7 text-white" strokeWidth={2.5} />;
      case 'prime-selection': return <Hash className="w-7 h-7 text-white" strokeWidth={2.5} />;
      default: return <Key className="w-7 h-7 text-white" strokeWidth={2.5} />;
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
            <div className={`p-4 bg-gradient-to-br ${stepColor.bg} rounded-2xl shadow-lg`}>
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

        {step.formula && (
          <div className={`bg-slate-50 dark:bg-cyber-dark p-4 border-2 ${stepColor.border} rounded-xl`}>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">FORMULA:</div>
            <div className={`text-lg font-mono font-bold ${stepColor.text}`}>
              {step.formula}
            </div>
          </div>
        )}

        {step.calculation && (
          <div className="bg-slate-50 dark:bg-cyber-dark border border-slate-200 dark:border-white/5 p-4 rounded-xl">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">CALCULATION:</div>
            <div className="text-base font-mono text-slate-800 dark:text-slate-200">{step.calculation}</div>
          </div>
        )}
      </m.div>

      {/* Values Display */}
      {step.values && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {Object.entries(step.values).map(([key, value]) => (
            <m.div
              key={key}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              transition={itemTransition}
              className="glass-card p-4 text-center"
            >
              <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase mb-2">{key}</div>
              <div className={`text-2xl font-bold font-mono ${stepColor.text}`}>{value}</div>
            </m.div>
          ))}
        </div>
      )}

      {/* Key Pair Display (for final step) */}
      {step.type === 'complete' && step.values && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-card p-6 border-2 border-green-500/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-green-600 rounded-xl">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">Public Key</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Share this openly</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600 dark:text-slate-400">e:</span>
                <span className="text-lg font-mono font-bold text-green-600 dark:text-green-400">{step.values.e}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600 dark:text-slate-400">n:</span>
                <span className="text-lg font-mono font-bold text-green-600 dark:text-green-400">{step.values.n}</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 border-2 border-red-500/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-red-600 rounded-xl">
                <Key className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">Private Key</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">Keep this secret!</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600 dark:text-slate-400">d:</span>
                <span className="text-lg font-mono font-bold text-red-600 dark:text-red-400">{step.values.d}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600 dark:text-slate-400">n:</span>
                <span className="text-lg font-mono font-bold text-red-600 dark:text-red-400">{step.values.n}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
