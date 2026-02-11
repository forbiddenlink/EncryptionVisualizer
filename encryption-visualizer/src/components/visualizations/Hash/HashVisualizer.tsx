import React from 'react';
import type { HashStep } from '@/lib/crypto/hash';
import { motion } from 'framer-motion';
import { Hash, Binary, Cpu, CheckCircle } from 'lucide-react';

interface HashVisualizerProps {
  steps: HashStep[];
  currentStep: number;
}

export const HashVisualizer: React.FC<HashVisualizerProps> = ({ steps, currentStep }) => {
  if (steps.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <div className="inline-block p-4 bg-emerald-500/20 rounded-2xl mb-4">
          <Hash className="w-12 h-12 text-emerald-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Ready to Hash</h3>
        <p className="text-white/60">
          Enter text above to see how hash functions transform input into a fixed-size output
        </p>
      </div>
    );
  }

  const step = steps[currentStep];
  
  const getStepColor = (type: HashStep['type']) => {
    switch (type) {
      case 'input': return { bg: 'from-blue-600 to-cyan-500', text: 'text-blue-400', border: 'border-blue-500/30' };
      case 'preprocessing': return { bg: 'from-purple-600 to-pink-500', text: 'text-purple-400', border: 'border-purple-500/30' };
      case 'initialization': return { bg: 'from-yellow-600 to-orange-500', text: 'text-yellow-400', border: 'border-yellow-500/30' };
      case 'compression': return { bg: 'from-red-600 to-pink-500', text: 'text-red-400', border: 'border-red-500/30' };
      case 'output': return { bg: 'from-emerald-600 to-teal-500', text: 'text-emerald-400', border: 'border-emerald-500/30' };
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
              {step.type === 'output' ? (
                <CheckCircle className="w-7 h-7 text-white" strokeWidth={2.5} />
              ) : step.type === 'preprocessing' ? (
                <Binary className="w-7 h-7 text-white" strokeWidth={2.5} />
              ) : (
                <Cpu className="w-7 h-7 text-white" strokeWidth={2.5} />
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

        {/* Data Display */}
        {step.data && (
          <div className="space-y-3">
            {step.data.input && (
              <div className={`glass-card bg-white/[0.02] p-4 border-2 ${stepColor.border} rounded-xl`}>
                <div className="text-xs text-white/50 font-semibold mb-2">INPUT:</div>
                <div className="text-lg font-mono text-white break-all">{step.data.input}</div>
              </div>
            )}

            {step.data.binary && (
              <div className="glass-card bg-white/[0.02] p-4 rounded-xl">
                <div className="text-xs text-white/50 font-semibold mb-2">BINARY REPRESENTATION:</div>
                <div className="text-sm font-mono text-white/80 break-all overflow-x-auto">
                  {step.data.binary}
                </div>
              </div>
            )}

            {step.data.chunks && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {step.data.chunks.map((chunk, idx) => (
                  <div key={idx} className="glass-card bg-white/[0.02] p-3 text-center">
                    <div className="text-xs text-white/50 mb-1">Chunk {idx + 1}</div>
                    <div className="text-sm font-mono text-white">{chunk}</div>
                  </div>
                ))}
              </div>
            )}

            {step.data.hash && (
              <div className={`glass-card bg-white/[0.02] p-6 border-2 ${stepColor.border} rounded-xl`}>
                <div className="text-xs text-white/50 font-semibold mb-3">HASH OUTPUT:</div>
                <div className={`text-2xl sm:text-3xl font-mono font-bold ${stepColor.text} break-all`}>
                  {step.data.hash}
                </div>
                <div className="mt-3 text-xs text-white/40">
                  {step.data.hash.length * 4} bits • {step.data.hash.length} hex characters
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};
