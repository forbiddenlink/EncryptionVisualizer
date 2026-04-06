import React, { useState } from 'react';
import { Sparkles, Users, Zap } from 'lucide-react';
import { m } from 'framer-motion';

interface DHInputPanelProps {
  onGenerate: (keySize: 'small' | 'medium' | 'large') => void;
}

export const DHInputPanel: React.FC<DHInputPanelProps> = ({ onGenerate }) => {
  const [selectedSize, setSelectedSize] = useState<'small' | 'medium' | 'large'>('small');

  const keySizes = [
    {
      size: 'small' as const,
      label: 'Small (Educational)',
      primeRange: '23-97',
      description: 'Fast generation, easy to follow',
      recommended: true,
    },
    {
      size: 'medium' as const,
      label: 'Medium',
      primeRange: '101-499',
      description: 'Balanced complexity',
      recommended: false,
    },
    {
      size: 'large' as const,
      label: 'Large',
      primeRange: '503-997',
      description: 'More realistic numbers',
      recommended: false,
    },
  ];

  return (
    <div className="glass-card p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 bg-indigo-600 rounded-lg sm:rounded-xl">
            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          Diffie-Hellman Key Exchange
        </h3>
      </div>

      <div className="space-y-4">
        <fieldset>
          <legend className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3 block">
            Select Prime Size:
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" role="radiogroup" aria-label="Prime size selection">
            {keySizes.map((keySize) => (
              <m.button
                key={keySize.size}
                onClick={() => setSelectedSize(keySize.size)}
                className={`relative p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                  selectedSize === keySize.size
                    ? 'border-indigo-500 bg-indigo-100 dark:bg-indigo-500/20'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-cyber-dark border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-100 dark:hover:bg-cyber-surface'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {keySize.recommended && (
                  <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-blue-600 rounded-full text-[10px] font-bold text-white">
                    RECOMMENDED
                  </div>
                )}
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{keySize.label}</h4>
                  {selectedSize === keySize.size && (
                    <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                  )}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Prime range: {keySize.primeRange}</p>
                <p className="text-xs text-slate-500 dark:text-slate-500">{keySize.description}</p>
              </m.button>
            ))}
          </div>
        </fieldset>

        <button
          onClick={() => onGenerate(selectedSize)}
          className="w-full btn-primary justify-center py-3 sm:py-4 text-sm sm:text-base bg-indigo-600 hover:bg-indigo-700"
        >
          <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
          Start Key Exchange
        </button>
      </div>

      {/* Info Box */}
      <div className="bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 rounded-xl p-3 sm:p-4 space-y-2">
        <div className="flex items-start gap-2">
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
          <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">How it Works:</span> Alice and Bob can
            create a shared secret even though an eavesdropper sees all their public communications. The magic lies in
            the math: knowing g, p, A, and B isn't enough to calculate the shared secret without knowing the private keys.
          </div>
        </div>
      </div>
    </div>
  );
};
