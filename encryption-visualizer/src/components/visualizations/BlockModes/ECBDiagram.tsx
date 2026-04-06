import React, { useMemo } from 'react';
import { m } from 'framer-motion';
import { Lock, ArrowDown } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ECBDiagramProps {
  plaintextBlocks: string[];
  ciphertextBlocks: string[];
  currentBlock?: number;
  showPatternWarning?: boolean;
}

export const ECBDiagram: React.FC<ECBDiagramProps> = ({
  plaintextBlocks,
  ciphertextBlocks,
  currentBlock,
  showPatternWarning = true,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const transition = useMemo(
    () => (prefersReducedMotion ? { duration: 0 } : { duration: 0.3 }),
    [prefersReducedMotion]
  );

  // Check for patterns (identical blocks)
  const hasPatterns = useMemo(() => {
    const uniqueCiphertexts = new Set(ciphertextBlocks);
    return uniqueCiphertexts.size < ciphertextBlocks.length;
  }, [ciphertextBlocks]);

  // Find which blocks are duplicates
  const duplicateIndices = useMemo(() => {
    const seen = new Map<string, number[]>();
    ciphertextBlocks.forEach((block, idx) => {
      if (!seen.has(block)) {
        seen.set(block, []);
      }
      seen.get(block)!.push(idx);
    });

    const duplicates = new Set<number>();
    seen.forEach((indices) => {
      if (indices.length > 1) {
        indices.forEach((idx) => duplicates.add(idx));
      }
    });
    return duplicates;
  }, [ciphertextBlocks]);

  return (
    <div className="glass-card p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-bold text-slate-900 dark:text-white">
          ECB Mode Diagram
        </h4>
        {showPatternWarning && hasPatterns && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-red-100 dark:bg-red-500/20 rounded-lg animate-pulse">
            <span className="text-xs font-bold text-red-600 dark:text-red-400">
              PATTERN DETECTED!
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {plaintextBlocks.map((plainBlock, idx) => (
          <m.div
            key={idx}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ ...transition, delay: idx * 0.1 }}
            className="flex flex-col items-center gap-2"
          >
            {/* Plaintext Block */}
            <div
              className={`w-full p-3 rounded-lg border-2 transition-all ${
                currentBlock === idx
                  ? 'border-red-500 bg-red-50 dark:bg-red-500/10'
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

            {/* Arrow Down */}
            <ArrowDown className="w-4 h-4 text-slate-400" />

            {/* Encryption Block */}
            <div
              className={`w-full p-2 rounded-lg flex items-center justify-center gap-2 ${
                currentBlock === idx
                  ? 'bg-red-600 text-white'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span className="text-xs font-bold">E(K)</span>
            </div>

            {/* Arrow Down */}
            <ArrowDown className="w-4 h-4 text-slate-400" />

            {/* Ciphertext Block */}
            <div
              className={`w-full p-3 rounded-lg border-2 transition-all ${
                duplicateIndices.has(idx)
                  ? 'border-red-500 bg-red-50 dark:bg-red-500/10'
                  : currentBlock === idx
                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-500/10'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-cyber-dark'
              }`}
            >
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold mb-1">
                C{idx + 1}
                {duplicateIndices.has(idx) && (
                  <span className="text-red-500 ml-1">(DUPLICATE!)</span>
                )}
              </div>
              <div
                className={`text-xs font-mono truncate ${
                  duplicateIndices.has(idx)
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                {ciphertextBlocks[idx]?.slice(0, 12) || '...'}...
              </div>
            </div>
          </m.div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
          <div className="w-3 h-3 bg-slate-200 dark:bg-slate-700 rounded" />
          <span>Parallel Processing</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
          <div className="w-3 h-3 bg-red-500 rounded" />
          <span>Pattern Leakage Risk</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
          <Lock className="w-3 h-3" />
          <span>E(K) = Encrypt with Key</span>
        </div>
      </div>
    </div>
  );
};
