import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AESStateMatrix } from './AESStateMatrix';
import { type AESStep } from '@/lib/crypto/aes';
import { useVisualizationStore } from '@/store/visualizationStore';
import { ArrowRight, Info, Cpu } from 'lucide-react';

interface AESVisualizerProps {
  steps?: AESStep[];
}

export const AESVisualizer: React.FC<AESVisualizerProps> = ({ steps: propSteps }) => {
  const { currentStep, totalSteps, isPlaying, setTotalSteps, setCurrentStep, pause, steps: storeSteps } = useVisualizationStore();
  const steps = propSteps || (storeSteps as unknown as AESStep[]);

  useEffect(() => {
    setTotalSteps(steps.length);
  }, [steps.length, setTotalSteps]);

  useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 2000); // 2 seconds per step

      return () => clearTimeout(timer);
    } else if (currentStep >= steps.length - 1) {
      pause();
    }
  }, [isPlaying, currentStep, steps.length, setCurrentStep, pause]);

  if (steps.length === 0 || currentStep >= steps.length) {
    return (
      <div className="glass-card p-12 text-center text-white/50">
        <p>No visualization data available</p>
      </div>
    );
  }

  const step = steps[currentStep];

  // Determine step color scheme and info based on type
  const getStepInfo = (type: AESStep['type']) => {
    switch (type) {
      case 'initial':
        return {
          bg: 'from-slate-600 to-slate-700',
          icon: 'text-slate-300',
          badge: 'INIT',
          color: 'slate'
        };
      case 'subBytes':
        return {
          bg: 'from-blue-600 to-blue-700',
          icon: 'text-blue-300',
          badge: 'SUBSTITUTE',
          color: 'blue'
        };
      case 'shiftRows':
        return {
          bg: 'from-cyan-600 to-cyan-700',
          icon: 'text-cyan-300',
          badge: 'SHIFT',
          color: 'cyan'
        };
      case 'mixColumns':
        return {
          bg: 'from-teal-600 to-teal-700',
          icon: 'text-teal-300',
          badge: 'MIX',
          color: 'teal'
        };
      case 'addRoundKey':
        return {
          bg: 'from-purple-600 to-purple-700',
          icon: 'text-purple-300',
          badge: 'XOR KEY',
          color: 'purple'
        };
      case 'final':
        return {
          bg: 'from-emerald-600 to-emerald-700',
          icon: 'text-emerald-300',
          badge: 'COMPLETE',
          color: 'emerald'
        };
      default:
        return {
          bg: 'from-gray-600 to-gray-700',
          icon: 'text-gray-300',
          badge: 'STEP',
          color: 'gray'
        };
    }
  };

  const stepInfo = getStepInfo(step.type);
  const roundNumber = step.roundNumber !== undefined ? step.roundNumber : 0;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Step Header */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="glass-card p-4 sm:p-6 relative overflow-hidden"
        >
          {/* Background gradient */}
          <div className={`absolute inset-0 bg-gradient-to-r ${stepInfo.bg} opacity-10`} />

          <div className="relative z-10 space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className={`p-3 sm:p-4 bg-gradient-to-br ${stepInfo.bg} rounded-xl sm:rounded-2xl shadow-lg flex-shrink-0`}>
                  <Cpu className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/50 font-semibold mt-1 sm:mt-1.5">
                    Step {step.stepNumber + 1} of {totalSteps} • Round {roundNumber}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`px-3 sm:px-4 py-1.5 sm:py-2 glass-card border-${stepInfo.color}-500/30 rounded-xl bg-${stepInfo.color}-500/10`}>
                  <span className={`text-xs sm:text-sm font-black ${stepInfo.icon} tracking-wider`}>
                    {stepInfo.badge}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2 sm:gap-3 glass-card bg-white/[0.03] p-4 sm:p-5 rounded-xl sm:rounded-2xl border-white/10">
              <div className={`p-1.5 sm:p-2 bg-gradient-to-br ${stepInfo.bg} rounded-lg sm:rounded-xl flex-shrink-0 mt-0.5`}>
                <Info className="w-3 h-3 sm:w-4 sm:h-4 text-white" strokeWidth={2.5} />
              </div>
              <p className="text-white/80 leading-relaxed text-sm sm:text-[15px]">{step.description}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* State Matrix Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`state-${currentStep}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8"
        >
          <AESStateMatrix
            state={step.state}
            title="Current State"
            subtitle={`After ${step.type} transformation`}
            highlightCells={step.highlightCells}
            showAnimation={true}
          />

          {step.roundKey && (
            <>
              <div className="flex flex-row lg:flex-col items-center gap-3 px-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-500 rounded-2xl blur-lg opacity-30 animate-pulse-slow"></div>
                  <div className="relative p-3 sm:p-4 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl shadow-lg">
                    <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 text-white lg:rotate-90" strokeWidth={2.5} />
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs sm:text-sm font-black text-purple-400 tracking-wider">XOR</div>
                  <div className="text-[10px] sm:text-xs text-white/40 font-mono mt-0.5">Bitwise Operation</div>
                </div>
              </div>

              <AESStateMatrix
                state={step.roundKey}
                title="Round Key"
                subtitle={`Derived key for round ${roundNumber}`}
                showAnimation={true}
              />
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Additional Info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="glass-card p-3 sm:p-4 space-y-2">
          <div className="text-xs sm:text-sm font-semibold text-white/50">Transformation</div>
          <div className="text-base sm:text-lg font-bold text-blue-400">{step.type}</div>
        </div>

        <div className="glass-card p-3 sm:p-4 space-y-2">
          <div className="text-xs sm:text-sm font-semibold text-white/50">Progress</div>
          <div className="text-base sm:text-lg font-bold text-cyan-400">
            {Math.round((currentStep / totalSteps) * 100)}%
          </div>
        </div>

        <div className="glass-card p-3 sm:p-4 space-y-2">
          <div className="text-xs sm:text-sm font-semibold text-white/50">Round</div>
          <div className="text-base sm:text-lg font-bold text-teal-400">
            {step.type === 'initial' ? '0 (Initial)' :
              step.type === 'final' ? '10 (Final)' :
                Math.ceil(step.stepNumber / 4)}
          </div>
        </div>
      </div>
    </div>
  );
};
