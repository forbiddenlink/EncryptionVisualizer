import React from 'react';
import type { RSAStep } from '@/lib/types';
import { motion } from 'framer-motion';
import { Key, Lock, Hash, CheckCircle } from 'lucide-react';

interface RSAVisualizerProps {
  steps: RSAStep[];
  currentStep: number;
}

export const RSAVisualizer: React.FC<RSAVisualizerProps> = ({ steps, currentStep }) => {
  if (steps.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <div className="inline-block p-4 bg-purple-500/20 rounded-2xl mb-4">
          <Key className="w-12 h-12 text-purple-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Ready to Generate Keys</h3>
        <p className="text-white/60">
          Click "Generate RSA Key Pair" above to see how RSA encryption works step-by-step
        </p>
      </div>
    );
  }

  const step = steps[currentStep];
  
  const getStepColor = (type: RSAStep['type']) => {
    switch (type) {
      case 'prime-selection': return { bg: 'from-blue-600 to-cyan-500', text: 'text-blue-400', border: 'border-blue-500/30' };
      case 'modulus-calculation': return { bg: 'from-purple-600 to-pink-500', text: 'text-purple-400', border: 'border-purple-500/30' };
      case 'phi-calculation': return { bg: 'from-green-600 to-emerald-500', text: 'text-green-400', border: 'border-green-500/30' };
      case 'e-selection': return { bg: 'from-yellow-600 to-orange-500', text: 'text-yellow-400', border: 'border-yellow-500/30' };
      case 'd-calculation': return { bg: 'from-red-600 to-pink-500', text: 'text-red-400', border: 'border-red-500/30' };
      case 'complete': return { bg: 'from-cyan-600 to-blue-500', text: 'text-cyan-400', border: 'border-cyan-500/30' };
      default: return { bg: 'from-gray-600 to-gray-500', text: 'text-gray-400', border: 'border-gray-500/30' };
    }
  };

  const stepColor = getStepColor(step.type);

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-6 space-y-4"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-4 bg-gradient-to-br ${stepColor.bg} rounded-2xl shadow-lg`}>
              {step.type === 'complete' ? (
                <CheckCircle className="w-7 h-7 text-white" strokeWidth={2.5} />
              ) : step.type.includes('prime') ? (
                <Hash className="w-7 h-7 text-white" strokeWidth={2.5} />
              ) : (
                <Key className="w-7 h-7 text-white" strokeWidth={2.5} />
              )}
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">{step.title}</h3>
              <p className="text-sm text-white/50 font-semibold mt-1">
                Step {step.stepNumber + 1} of {steps.length}
              </p>
            </div>
          </div>
        </div>

        <p className="text-white/80 leading-relaxed">{step.description}</p>

        {step.formula && (
          <div className={`glass-card bg-white/[0.02] p-4 border-2 ${stepColor.border} rounded-xl`}>
            <div className="text-xs text-white/50 font-semibold mb-1">FORMULA:</div>
            <div className={`text-lg font-mono font-bold ${stepColor.text}`}>
              {step.formula}
            </div>
          </div>
        )}

        {step.calculation && (
          <div className="glass-card bg-white/[0.02] p-4 rounded-xl">
            <div className="text-xs text-white/50 font-semibold mb-1">CALCULATION:</div>
            <div className="text-base font-mono text-white/90">{step.calculation}</div>
          </div>
        )}
      </motion.div>

      {/* Values Display */}
      {step.values && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {Object.entries(step.values).map(([key, value]) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-4 text-center"
            >
              <div className="text-xs text-white/50 font-semibold uppercase mb-2">{key}</div>
              <div className={`text-2xl font-bold font-mono ${stepColor.text}`}>{value}</div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Key Pair Display (for final step) */}
      {step.type === 'complete' && step.values && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-card p-6 border-2 border-green-500/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-green-600 to-emerald-500 rounded-xl">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Public Key</h4>
                <p className="text-xs text-white/50">Share this openly</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/60">e:</span>
                <span className="text-lg font-mono font-bold text-green-400">{step.values.e}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/60">n:</span>
                <span className="text-lg font-mono font-bold text-green-400">{step.values.n}</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 border-2 border-red-500/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-red-600 to-pink-500 rounded-xl">
                <Key className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Private Key</h4>
                <p className="text-xs text-white/50">Keep this secret!</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/60">d:</span>
                <span className="text-lg font-mono font-bold text-red-400">{step.values.d}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/60">n:</span>
                <span className="text-lg font-mono font-bold text-red-400">{step.values.n}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
