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
        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-orange-600 to-red-500 rounded-xl">
            <Zap className="w-5 h-5 text-white" />
          </div>
          Avalanche Effect
        </h3>
      </div>

      <div className="glass-card bg-orange-500/10 border-orange-500/30 p-4">
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-white/70 leading-relaxed">
            <span className="font-semibold text-orange-400">The Avalanche Effect:</span> Even the tiniest change to the input (like adding a space or changing capitalization) should cause about half of the output bits to flip. This makes hashes unpredictable and secure!
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all"
          placeholder="Enter text to test..."
        />
        <button
          onClick={handleDemonstrate}
          className="btn-primary px-6"
          style={{ background: 'linear-gradient(45deg, #ea580c, #dc2626)' }}
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
              className={`glass-card p-4 ${idx === 0 ? 'border-2 border-emerald-500/30 bg-emerald-500/5' : 'bg-white/[0.02]'}`}
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex-1">
                  <div className="text-xs text-white/50 font-semibold mb-1">
                    {idx === 0 ? 'ORIGINAL INPUT:' : `VARIATION ${idx}:`}
                  </div>
                  <div className="text-sm font-mono text-white mb-2">"{result.input}"</div>
                  <div className="text-xs text-white/50 font-semibold mb-1">HASH:</div>
                  <div className="text-base font-mono text-emerald-400 break-all">{result.hash}</div>
                </div>
                {idx > 0 && (
                  <div className="text-right">
                    <div className="text-xs text-white/50 mb-1">Bits Changed:</div>
                    <div className="text-2xl font-bold text-orange-400">{result.bitsChanged}</div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          <div className="glass-card bg-blue-500/10 border-blue-500/30 p-4 text-center">
            <div className="text-sm text-white/70">
              Average bits changed: <span className="font-bold text-blue-400">
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
