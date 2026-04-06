import React, { useMemo } from 'react';
import { m } from 'framer-motion';
import { Lock, ArrowDown, ArrowRight } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface CBCDiagramProps {
  plaintextBlocks: string[];
  ciphertextBlocks: string[];
  iv: string;
  currentBlock?: number;
}

export const CBCDiagram: React.FC<CBCDiagramProps> = ({
  plaintextBlocks,
  ciphertextBlocks,
  iv,
  currentBlock,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const transition = useMemo(
    () => (prefersReducedMotion ? { duration: 0 } : { duration: 0.3 }),
    [prefersReducedMotion]
  );

  return (
    <div className="glass-card p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-bold text-slate-900 dark:text-white">
          CBC Mode Diagram
        </h4>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 dark:bg-blue-500/20 rounded-lg">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
            CHAINED
          </span>
        </div>
      </div>

      {/* IV Display */}
      <div className="flex items-center gap-4">
        <div className="p-3 bg-cyan-100 dark:bg-cyan-500/20 rounded-lg border-2 border-cyan-500/30">
          <div className="text-[10px] text-cyan-600 dark:text-cyan-400 font-semibold mb-1">
            IV (Initialization Vector)
          </div>
          <div className="text-xs font-mono text-cyan-700 dark:text-cyan-300 truncate max-w-[150px]">
            {iv.slice(0, 16)}...
          </div>
        </div>
        <ArrowRight className="w-5 h-5 text-cyan-500" />
        <span className="text-xs text-slate-500 dark:text-slate-400">
          XOR with first block
        </span>
      </div>

      <div className="overflow-x-auto">
        <div className="flex gap-4 min-w-max">
          {plaintextBlocks.map((plainBlock, idx) => (
            <m.div
              key={idx}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
              transition={{ ...transition, delay: idx * 0.15 }}
              className="flex flex-col items-center gap-2 relative"
            >
              {/* Plaintext Block */}
              <div
                className={`w-32 p-3 rounded-lg border-2 transition-all ${
                  currentBlock === idx
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-cyber-dark'
                }`}
              >
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold mb-1">
                  P{idx + 1}
                </div>
                <div className="text-xs font-mono text-slate-700 dark:text-slate-300 truncate">
                  {plainBlock.slice(0, 12)}...
                </div>
              </div>

              {/* XOR Operation */}
              <div className="flex items-center gap-2">
                <ArrowDown className="w-4 h-4 text-slate-400" />
              </div>

              <div
                className={`w-full p-2 rounded-lg flex items-center justify-center ${
                  currentBlock === idx
                    ? 'bg-cyan-600 text-white'
                    : 'bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300'
                }`}
              >
                <span className="text-xs font-bold">XOR</span>
              </div>

              {/* Arrow from XOR */}
              <ArrowDown className="w-4 h-4 text-slate-400" />

              {/* Encryption Block */}
              <div
                className={`w-full p-2 rounded-lg flex items-center justify-center gap-2 ${
                  currentBlock === idx
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                <Lock className="w-4 h-4" />
                <span className="text-xs font-bold">E(K)</span>
              </div>

              {/* Arrow Down to Ciphertext */}
              <ArrowDown className="w-4 h-4 text-slate-400" />

              {/* Ciphertext Block */}
              <div
                className={`w-32 p-3 rounded-lg border-2 transition-all ${
                  currentBlock === idx
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-cyber-dark'
                }`}
              >
                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold mb-1">
                  C{idx + 1}
                </div>
                <div className="text-xs font-mono text-blue-600 dark:text-blue-400 truncate">
                  {ciphertextBlocks[idx]?.slice(0, 12) || '...'}...
                </div>
              </div>

              {/* Chain Arrow to Next Block */}
              {idx < plaintextBlocks.length - 1 && (
                <m.div
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0 }}
                  animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                  transition={{ ...transition, delay: (idx + 1) * 0.15 }}
                  className="absolute -right-6 top-[140px] flex items-center"
                >
                  <div className="w-8 h-0.5 bg-blue-500" />
                  <div className="absolute -right-2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-blue-500" />
                </m.div>
              )}

              {/* XOR Input Label */}
              <div className="absolute -left-14 top-[100px] text-[10px] text-cyan-600 dark:text-cyan-400 font-semibold whitespace-nowrap">
                {idx === 0 ? 'IV' : `C${idx}`} →
              </div>
            </m.div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
          <div className="w-3 h-3 bg-cyan-500 rounded" />
          <span>XOR Operation</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
          <div className="w-8 h-0.5 bg-blue-500" />
          <span>Chaining (C→XOR)</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
          <Lock className="w-3 h-3" />
          <span>E(K) = Encrypt with Key</span>
        </div>
      </div>

      {/* Key Insight */}
      <div className="p-4 bg-blue-50 dark:bg-blue-500/10 rounded-xl border border-blue-200 dark:border-blue-500/30">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          <strong>Key Insight:</strong> Each ciphertext block depends on ALL previous
          blocks. Changing one plaintext byte affects all following ciphertext blocks.
        </p>
      </div>
    </div>
  );
};
