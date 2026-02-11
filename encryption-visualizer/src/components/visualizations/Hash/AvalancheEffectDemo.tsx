import React, { useState } from 'react';
import { demonstrateAvalancheEffect } from '@/lib/crypto/hash';
import { Zap, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export const AvalancheEffectDemo: React.FC = () => {
  const [input, setInput] = useState('Hello');
  const [results, setResults] = useState<ReturnType<typeof demonstrateAvalancheEffect>>([]);

  const handleDemonstrate = () => {
    const avalancheResults = demonstrateAvalancheEffect(input);
    setResults(avalancheResults);
  };

  return (
    <div className="glass-card p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <div className="p-2 bg-orange-600 rounded-xl">
            <Zap className="w-5 h-5 text-white" />
          </div>
          Avalanche Effect
        </h3>
      </div>

      <div className="bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/30 rounded-xl p-4">
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <span className="font-semibold text-orange-600 dark:text-orange-400">The Avalanche Effect:</span> Even the tiniest change to the input (like adding a space or changing capitalization) should cause about half of the output bits to flip. This makes hashes unpredictable and secure!
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
          placeholder="Enter text to test..."
        />
        <button
          onClick={handleDemonstrate}
          className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold flex items-center gap-2 transition-colors"
        >
          <Zap className="w-4 h-4" />
          Demonstrate
        </button>
      </div>

      {results.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          {results.map((result, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-4 rounded-xl ${idx === 0 ? 'bg-emerald-50 dark:bg-emerald-500/10 border-2 border-emerald-300 dark:border-emerald-500/30' : 'bg-slate-100 dark:bg-slate-800'}`}
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex-1">
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">
                    {idx === 0 ? 'ORIGINAL INPUT:' : `VARIATION ${idx}:`}
                  </div>
                  <div className="text-sm font-mono text-slate-900 dark:text-white mb-2">"{result.input}"</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">HASH:</div>
                  <div className="text-base font-mono text-emerald-600 dark:text-emerald-400 break-all">{result.hash}</div>
                </div>
                {idx > 0 && (
                  <div className="text-right">
                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Bits Changed:</div>
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{result.bitsChanged}</div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 text-center">
            <div className="text-sm text-slate-700 dark:text-slate-300">
              Average bits changed: <span className="font-bold text-blue-600 dark:text-blue-400">
                {Math.round(results.slice(1).reduce((sum, r) => sum + r.bitsChanged, 0) / Math.max(results.length - 1, 1))}
              </span> out of {results[0]?.hash.length * 4 || 32} total bits
              ({Math.round((results.slice(1).reduce((sum, r) => sum + r.bitsChanged, 0) / Math.max(results.length - 1, 1) / (results[0]?.hash.length * 4 || 32)) * 100)}% change)
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
