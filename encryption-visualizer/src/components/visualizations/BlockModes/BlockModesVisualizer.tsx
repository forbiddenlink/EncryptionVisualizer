import React, { useMemo } from 'react';
import type { BlockModeStep } from '@/lib/types';
import { m } from 'framer-motion';
import { Layers, ArrowRight, Lock, Shield, AlertTriangle } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface BlockModesVisualizerProps {
  steps: BlockModeStep[];
  currentStep: number;
}

export const BlockModesVisualizer: React.FC<BlockModesVisualizerProps> = ({
  steps,
  currentStep,
}) => {
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
        <div className="inline-block p-4 bg-blue-100 dark:bg-blue-500/20 rounded-2xl mb-4">
          <Layers className="w-12 h-12 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Ready to Visualize
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          Enter plaintext and key above, then click Encrypt to see how different block
          cipher modes work
        </p>
      </div>
    );
  }

  const step = steps[currentStep];

  const getModeColor = (mode: BlockModeStep['mode']) => {
    switch (mode) {
      case 'ecb':
        return {
          bg: 'from-red-600 to-orange-500',
          text: 'text-red-400',
          border: 'border-red-500/30',
          light: 'bg-red-100 dark:bg-red-500/20',
        };
      case 'cbc':
        return {
          bg: 'from-blue-600 to-cyan-500',
          text: 'text-blue-400',
          border: 'border-blue-500/30',
          light: 'bg-blue-100 dark:bg-blue-500/20',
        };
      case 'gcm':
        return {
          bg: 'from-green-600 to-emerald-500',
          text: 'text-green-400',
          border: 'border-green-500/30',
          light: 'bg-green-100 dark:bg-green-500/20',
        };
    }
  };

  const getStepIcon = (type: BlockModeStep['type'], mode: BlockModeStep['mode']) => {
    switch (type) {
      case 'output':
        return mode === 'gcm' ? (
          <Shield className="w-7 h-7 text-white" strokeWidth={2.5} />
        ) : (
          <Lock className="w-7 h-7 text-white" strokeWidth={2.5} />
        );
      case 'xor-operation':
        return <span className="text-2xl font-bold text-white">XOR</span>;
      default:
        return <Layers className="w-7 h-7 text-white" strokeWidth={2.5} />;
    }
  };

  const modeColor = getModeColor(step.mode);

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <m.div
        key={currentStep}
        initial={
          prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, filter: 'blur(4px)' }
        }
        animate={
          prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }
        }
        exit={
          prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -20, filter: 'blur(4px)' }
        }
        transition={transition}
        className="glass-card p-6 space-y-4"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-4 bg-gradient-to-br ${modeColor.bg} rounded-2xl shadow-lg`}>
              {getStepIcon(step.type, step.mode)}
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                {step.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold mt-1">
                Step {step.stepNumber + 1} of {steps.length} |{' '}
                <span className={modeColor.text}>{step.mode.toUpperCase()} Mode</span>
              </p>
            </div>
          </div>
          {step.mode === 'ecb' && step.type === 'output' && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-red-100 dark:bg-red-500/20 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
              <span className="text-xs font-bold text-red-600 dark:text-red-400">
                INSECURE
              </span>
            </div>
          )}
        </div>

        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          {step.description}
        </p>

        {/* IV Display */}
        {step.iv && (
          <div
            className={`bg-slate-50 dark:bg-cyber-dark p-4 border-2 ${modeColor.border} rounded-xl`}
          >
            <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">
              IV / NONCE:
            </div>
            <div className={`text-sm font-mono font-bold ${modeColor.text} break-all`}>
              {step.iv}
            </div>
          </div>
        )}

        {/* Auth Tag Display (GCM) */}
        {step.authTag && (
          <div className="bg-green-50 dark:bg-green-500/10 p-4 border-2 border-green-500/30 rounded-xl">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">
              AUTHENTICATION TAG:
            </div>
            <div className="text-sm font-mono font-bold text-green-600 dark:text-green-400 break-all">
              {step.authTag}
            </div>
          </div>
        )}
      </m.div>

      {/* Blocks Visualization */}
      {step.blocks && step.blocks.length > 0 && (
        <div className="glass-card p-6">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-4 uppercase">
            Blocks ({step.blocks.length})
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            {step.blocks.map((block, idx) => (
              <React.Fragment key={idx}>
                <m.div
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
                  animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                  transition={{ ...itemTransition, delay: idx * 0.1 }}
                  className={`relative p-4 rounded-xl border-2 transition-all ${
                    step.currentBlock === idx
                      ? `${modeColor.border} ${modeColor.light}`
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-cyber-dark'
                  }`}
                >
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold mb-1">
                    BLOCK {idx + 1}
                  </div>
                  <div
                    className={`text-xs font-mono break-all max-w-[120px] ${
                      step.currentBlock === idx
                        ? modeColor.text
                        : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {block.slice(0, 16)}...
                  </div>
                  {step.currentBlock === idx && (
                    <m.div
                      className={`absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-br ${modeColor.bg}`}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </m.div>
                {step.blocks && idx < step.blocks.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-slate-400 dark:text-slate-600 flex-shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Values Display */}
      {step.values && Object.keys(step.values).length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.entries(step.values).map(([key, value]) => (
            <m.div
              key={key}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              transition={itemTransition}
              className="glass-card p-4"
            >
              <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase mb-2">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
              <div
                className={`text-sm font-mono font-bold ${modeColor.text} break-all line-clamp-3`}
              >
                {typeof value === 'string' && value.length > 40
                  ? `${value.slice(0, 40)}...`
                  : String(value)}
              </div>
            </m.div>
          ))}
        </div>
      )}

      {/* Counter Display (GCM) */}
      {step.counter !== undefined && (
        <div className="glass-card p-4 flex items-center justify-between">
          <div className="text-sm text-slate-600 dark:text-slate-400">Counter Value:</div>
          <div className="text-2xl font-mono font-bold text-green-600 dark:text-green-400">
            {step.counter}
          </div>
        </div>
      )}

      {/* Previous Ciphertext (CBC) */}
      {step.previousCiphertext && step.type !== 'output' && (
        <div className="glass-card p-4">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-2">
            PREVIOUS CIPHERTEXT (for XOR):
          </div>
          <div className="text-sm font-mono text-blue-600 dark:text-blue-400 break-all">
            {step.previousCiphertext}
          </div>
        </div>
      )}
    </div>
  );
};
