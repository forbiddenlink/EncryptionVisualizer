import React, { useMemo } from 'react';
import type { DHStep } from '@/lib/types';
import { m } from 'framer-motion';
import { Users, Lock, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface DHVisualizerProps {
  steps: DHStep[];
  currentStep: number;
}

export const DHVisualizer: React.FC<DHVisualizerProps> = ({ steps, currentStep }) => {
  const prefersReducedMotion = useReducedMotion();

  const transition = useMemo(
    () =>
      prefersReducedMotion
        ? { duration: 0 }
        : { type: 'spring' as const, stiffness: 400, damping: 40 },
    [prefersReducedMotion]
  );

  const itemTransition = useMemo(
    () => (prefersReducedMotion ? { duration: 0 } : { duration: 0.3 }),
    [prefersReducedMotion]
  );

  if (steps.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <div className="inline-block p-4 bg-indigo-100 dark:bg-indigo-500/20 rounded-2xl mb-4">
          <Users className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Ready for Key Exchange</h3>
        <p className="text-slate-600 dark:text-slate-400">
          Click "Start Key Exchange" above to see how Alice and Bob establish a shared secret
        </p>
      </div>
    );
  }

  const step = steps[currentStep];

  const getStepColor = (type: DHStep['type']) => {
    switch (type) {
      case 'setup':
        return { bg: 'from-indigo-600 to-blue-500', text: 'text-indigo-400', border: 'border-indigo-500/30' };
      case 'alice-private':
      case 'alice-public':
      case 'alice-shared':
        return { bg: 'from-emerald-600 to-teal-500', text: 'text-emerald-400', border: 'border-emerald-500/30' };
      case 'bob-private':
      case 'bob-public':
      case 'bob-shared':
        return { bg: 'from-amber-600 to-orange-500', text: 'text-amber-400', border: 'border-amber-500/30' };
      case 'complete':
        return { bg: 'from-pink-600 to-rose-500', text: 'text-pink-400', border: 'border-pink-500/30' };
      default:
        return { bg: 'from-gray-600 to-gray-500', text: 'text-gray-400', border: 'border-gray-500/30' };
    }
  };

  const stepColor = getStepColor(step.type);

  const getActorIcon = (actor?: string) => {
    switch (actor) {
      case 'alice':
        return <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">A</div>;
      case 'bob':
        return <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-sm">B</div>;
      default:
        return <Users className="w-7 h-7 text-white" strokeWidth={2.5} />;
    }
  };

  // Extract values for the two-column display
  const publicValues = step.values
    ? Object.entries(step.values).filter(([key]) =>
        ['p', 'g', 'A', 'B', 'Public p', 'Public g', 'Public A', 'Public B'].includes(key)
      )
    : [];

  const aliceValues = step.values
    ? Object.entries(step.values).filter(([key]) =>
        ['a', 's (Alice)'].includes(key)
      )
    : [];

  const bobValues = step.values
    ? Object.entries(step.values).filter(([key]) =>
        ['b', 's (Bob)'].includes(key)
      )
    : [];

  const sharedSecretValue = step.values?.['Shared Secret'];

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <m.div
        key={currentStep}
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, filter: 'blur(4px)' }}
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -20, filter: 'blur(4px)' }}
        transition={transition}
        className="glass-card p-6 space-y-4"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-4 bg-gradient-to-br ${stepColor.bg} rounded-2xl shadow-lg`}>
              {getActorIcon(step.actor)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{step.title}</h3>
                {step.actor && step.actor !== 'system' && (
                  <span className={`text-xs font-bold uppercase px-2 py-1 rounded-full ${
                    step.actor === 'alice'
                      ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                      : 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400'
                  }`}>
                    {step.actor}
                  </span>
                )}
              </div>
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
            <div className={`text-lg font-mono font-bold ${stepColor.text}`}>{step.formula}</div>
          </div>
        )}

        {step.calculation && (
          <div className="bg-slate-50 dark:bg-cyber-dark border border-slate-200 dark:border-white/5 p-4 rounded-xl">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">CALCULATION:</div>
            <div className="text-base font-mono text-slate-800 dark:text-slate-200">{step.calculation}</div>
          </div>
        )}
      </m.div>

      {/* Two-Column Alice/Bob View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Alice's Column */}
        <m.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
          transition={itemTransition}
          className={`glass-card p-6 border-2 ${
            step.actor === 'alice' ? 'border-emerald-500/50' : 'border-transparent'
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">
              A
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">Alice</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Initiator</p>
            </div>
          </div>

          <div className="space-y-3">
            {/* Alice's Private Key */}
            {aliceValues.filter(([key]) => key === 'a').map(([key, value]) => (
              <div key={key} className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 p-3 rounded-xl">
                <div className="flex items-center gap-2 mb-1">
                  <EyeOff className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase">Private Key (a)</span>
                </div>
                <div className="text-2xl font-mono font-bold text-emerald-600 dark:text-emerald-400">{value}</div>
              </div>
            ))}

            {/* Alice's Public Key */}
            {step.values?.A !== undefined && (
              <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-3 rounded-xl">
                <div className="flex items-center gap-2 mb-1">
                  <Eye className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase">Public Value (A)</span>
                </div>
                <div className="text-2xl font-mono font-bold text-indigo-600 dark:text-indigo-400">{step.values.A}</div>
              </div>
            )}

            {/* Alice's Shared Secret */}
            {aliceValues.filter(([key]) => key === 's (Alice)').map(([key, value]) => (
              <div key={key} className="bg-pink-50 dark:bg-pink-500/10 border border-pink-200 dark:border-pink-500/30 p-3 rounded-xl">
                <div className="flex items-center gap-2 mb-1">
                  <Lock className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                  <span className="text-xs font-semibold text-pink-600 dark:text-pink-400 uppercase">Shared Secret</span>
                </div>
                <div className="text-2xl font-mono font-bold text-pink-600 dark:text-pink-400">{value}</div>
              </div>
            ))}
          </div>
        </m.div>

        {/* Bob's Column */}
        <m.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
          transition={itemTransition}
          className={`glass-card p-6 border-2 ${
            step.actor === 'bob' ? 'border-amber-500/50' : 'border-transparent'
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold">
              B
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">Bob</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Responder</p>
            </div>
          </div>

          <div className="space-y-3">
            {/* Bob's Private Key */}
            {bobValues.filter(([key]) => key === 'b').map(([key, value]) => (
              <div key={key} className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 p-3 rounded-xl">
                <div className="flex items-center gap-2 mb-1">
                  <EyeOff className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase">Private Key (b)</span>
                </div>
                <div className="text-2xl font-mono font-bold text-amber-600 dark:text-amber-400">{value}</div>
              </div>
            ))}

            {/* Bob's Public Key */}
            {step.values?.B !== undefined && (
              <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 p-3 rounded-xl">
                <div className="flex items-center gap-2 mb-1">
                  <Eye className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase">Public Value (B)</span>
                </div>
                <div className="text-2xl font-mono font-bold text-indigo-600 dark:text-indigo-400">{step.values.B}</div>
              </div>
            )}

            {/* Bob's Shared Secret */}
            {bobValues.filter(([key]) => key === 's (Bob)').map(([key, value]) => (
              <div key={key} className="bg-pink-50 dark:bg-pink-500/10 border border-pink-200 dark:border-pink-500/30 p-3 rounded-xl">
                <div className="flex items-center gap-2 mb-1">
                  <Lock className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                  <span className="text-xs font-semibold text-pink-600 dark:text-pink-400 uppercase">Shared Secret</span>
                </div>
                <div className="text-2xl font-mono font-bold text-pink-600 dark:text-pink-400">{value}</div>
              </div>
            ))}
          </div>
        </m.div>
      </div>

      {/* Public Channel - Shows values visible to eavesdropper */}
      {(step.values?.p !== undefined || step.values?.['Public p'] !== undefined) && (
        <m.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={itemTransition}
          className="glass-card p-4 border-2 border-indigo-500/30"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-600 rounded-xl">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">Public Channel</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Visible to everyone (including eavesdroppers)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {publicValues.map(([key, value]) => (
              <div key={key} className="bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 p-3 rounded-xl text-center">
                <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase mb-1">{key}</div>
                <div className="text-xl font-mono font-bold text-indigo-600 dark:text-indigo-400">{value}</div>
              </div>
            ))}
          </div>
        </m.div>
      )}

      {/* Final Shared Secret Display (for complete step) */}
      {step.type === 'complete' && sharedSecretValue !== undefined && (
        <m.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          transition={itemTransition}
          className="glass-card p-6 border-2 border-pink-500/50 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-500/10 dark:to-rose-500/10"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <CheckCircle className="w-8 h-8 text-pink-600 dark:text-pink-400" />
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">Shared Secret Established!</h4>
          </div>

          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-lg mx-auto mb-2">
                A
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Alice</p>
            </div>

            <div className="flex-1 max-w-xs">
              <div className="h-1 bg-gradient-to-r from-emerald-500 via-pink-500 to-amber-500 rounded-full" />
              <div className="text-center mt-3">
                <div className="text-4xl font-mono font-bold text-pink-600 dark:text-pink-400">
                  {sharedSecretValue}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Identical Shared Secret</p>
              </div>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-lg mx-auto mb-2">
                B
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Bob</p>
            </div>
          </div>

          <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-4">
            Both parties now have the same secret key, even though they never transmitted it directly!
          </p>
        </m.div>
      )}
    </div>
  );
};
