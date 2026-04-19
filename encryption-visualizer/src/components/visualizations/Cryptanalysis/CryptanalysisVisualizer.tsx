import React, { useMemo } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Search, Shield, Clock, Key, Layers } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { FrequencyAnalysisChart } from './FrequencyAnalysisChart';
import { BruteForceDemo } from './BruteForceDemo';
import { getLetterCount } from '@/lib/crypto/cryptanalysis';
import type { CryptanalysisStep, AttackType } from '@/lib/types/cryptanalysis';

interface CryptanalysisVisualizerProps {
  steps: CryptanalysisStep[];
  currentStep: number;
  activeAttack: AttackType;
}

export const CryptanalysisVisualizer: React.FC<CryptanalysisVisualizerProps> = ({
  steps,
  currentStep,
  activeAttack,
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
        <div className="inline-block p-4 bg-amber-100 dark:bg-amber-500/20 rounded-2xl mb-4">
          <Search className="w-12 h-12 text-amber-600 dark:text-amber-400" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Ready to Attack
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          Enter plaintext above, then launch an attack to see how cryptanalysis techniques
          can break weak ciphers
        </p>
      </div>
    );
  }

  const step = steps[currentStep];

  const getAttackColor = (attack: AttackType) => {
    switch (attack) {
      case 'frequency-analysis':
        return {
          bg: 'from-amber-600 to-orange-500',
          text: 'text-amber-400',
          border: 'border-amber-500/30',
          light: 'bg-amber-100 dark:bg-amber-500/20',
        };
      case 'brute-force':
        return {
          bg: 'from-red-600 to-pink-500',
          text: 'text-red-400',
          border: 'border-red-500/30',
          light: 'bg-red-100 dark:bg-red-500/20',
        };
      case 'padding-oracle':
        return {
          bg: 'from-purple-600 to-violet-500',
          text: 'text-purple-400',
          border: 'border-purple-500/30',
          light: 'bg-purple-100 dark:bg-purple-500/20',
        };
      case 'timing-attack':
        return {
          bg: 'from-cyan-600 to-blue-500',
          text: 'text-cyan-400',
          border: 'border-cyan-500/30',
          light: 'bg-cyan-100 dark:bg-cyan-500/20',
        };
    }
  };

  const getStepIcon = (type: CryptanalysisStep['type']) => {
    switch (type) {
      case 'setup':
        return <Layers className="w-7 h-7 text-white" strokeWidth={2.5} />;
      case 'analyze':
        return <Search className="w-7 h-7 text-white" strokeWidth={2.5} />;
      case 'attempt':
        return <Key className="w-7 h-7 text-white" strokeWidth={2.5} />;
      case 'breakthrough':
        return <Shield className="w-7 h-7 text-white" strokeWidth={2.5} />;
      case 'result':
        return <Clock className="w-7 h-7 text-white" strokeWidth={2.5} />;
    }
  };

  const getStepLabel = (type: CryptanalysisStep['type']): string => {
    switch (type) {
      case 'setup':
        return 'SETUP';
      case 'analyze':
        return 'ANALYZING';
      case 'attempt':
        return 'ATTACKING';
      case 'breakthrough':
        return 'BREAKTHROUGH';
      case 'result':
        return 'COMPLETE';
    }
  };

  const attackColor = getAttackColor(activeAttack);

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <AnimatePresence mode="wait">
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
              <div className={`p-4 bg-gradient-to-br ${attackColor.bg} rounded-2xl shadow-lg`}>
                {getStepIcon(step.type)}
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold mt-1">
                  Step {step.stepNumber + 1} of {steps.length} |{' '}
                  <span className={attackColor.text}>
                    {getStepLabel(step.type)}
                  </span>
                </p>
              </div>
            </div>

            {step.type === 'breakthrough' && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-500/20 rounded-lg animate-pulse">
                <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-xs font-bold text-green-600 dark:text-green-400">
                  KEY FOUND
                </span>
              </div>
            )}
          </div>

          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            {step.description}
          </p>

          {/* Progress Bar */}
          {step.progress !== undefined && (
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
                <span>Attack Progress</span>
                <span>{step.progress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <m.div
                  className={`h-full bg-gradient-to-r ${attackColor.bg} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${step.progress}%` }}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8 }}
                />
              </div>
            </div>
          )}
        </m.div>
      </AnimatePresence>

      {/* Frequency Analysis Chart */}
      {step.frequencyData && step.frequencyData.length > 0 && (
        <FrequencyAnalysisChart
          data={step.frequencyData}
          totalLetters={step.frequencyData.reduce((sum, d) => sum + d.count, 0)}
          highlightTop={3}
        />
      )}

      {/* Brute Force Visualization */}
      {activeAttack === 'brute-force' && (
        <BruteForceDemo
          attempts={step.attempts}
          progress={step.progress}
          isActive={step.type === 'attempt'}
        />
      )}

      {/* Attempts for non-brute-force attacks */}
      {activeAttack !== 'brute-force' && step.attempts && step.attempts.length > 0 && (
        <div className="glass-card p-4 space-y-2">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
            Attempts
          </h4>
          <div className="space-y-1">
            {step.attempts.map((attempt, idx) => (
              <m.div
                key={idx}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -10 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                transition={{ ...itemTransition, delay: idx * 0.1 }}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-mono ${
                  attempt.isCorrect
                    ? 'bg-green-100 dark:bg-green-500/20 border border-green-300 dark:border-green-500/40'
                    : 'bg-slate-50 dark:bg-cyber-dark border border-slate-200 dark:border-white/5'
                }`}
              >
                <span className={`font-bold min-w-[80px] ${
                  attempt.isCorrect
                    ? 'text-green-700 dark:text-green-400'
                    : 'text-slate-500 dark:text-slate-400'
                }`}>
                  {attempt.key}
                </span>
                <span className={`flex-1 ${
                  attempt.isCorrect
                    ? 'text-green-700 dark:text-green-300'
                    : 'text-slate-600 dark:text-slate-400'
                }`}>
                  {attempt.result}
                </span>
                {attempt.isCorrect && (
                  <span className="px-2 py-0.5 bg-green-600 text-white rounded text-[10px] font-bold flex-shrink-0">
                    MATCH
                  </span>
                )}
              </m.div>
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
                className={`text-sm font-mono font-bold ${attackColor.text} break-all line-clamp-3`}
              >
                {typeof value === 'string' && value.length > 50
                  ? `${value.slice(0, 50)}...`
                  : String(value)}
              </div>
            </m.div>
          ))}
        </div>
      )}
    </div>
  );
};
