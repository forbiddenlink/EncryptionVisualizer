import React, { useState } from 'react';
import { FileSignature, Key, Zap, Sparkles } from 'lucide-react';
import { m } from 'framer-motion';
import type { RSAKeyPair } from '@/lib/types';

interface SignatureInputPanelProps {
  onSign: (message: string, keySize: 'small' | 'medium' | 'large') => void;
  keyPair: RSAKeyPair | null;
}

export const SignatureInputPanel: React.FC<SignatureInputPanelProps> = ({ onSign, keyPair }) => {
  const [message, setMessage] = useState('Hello, this message is from Alice!');
  const [selectedSize, setSelectedSize] = useState<'small' | 'medium' | 'large'>('small');

  const keySizes = [
    {
      size: 'small' as const,
      label: 'Small (Educational)',
      primeRange: '10-50',
      description: 'Fast generation, easy to understand',
      recommended: true,
    },
    {
      size: 'medium' as const,
      label: 'Medium',
      primeRange: '50-200',
      description: 'Balanced speed and complexity',
      recommended: false,
    },
    {
      size: 'large' as const,
      label: 'Large',
      primeRange: '200-500',
      description: 'Slower, more realistic numbers',
      recommended: false,
    },
  ];

  const handleSign = () => {
    if (message.trim()) {
      onSign(message, selectedSize);
    }
  };

  return (
    <div className="glass-card p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 bg-amber-500 rounded-lg sm:rounded-xl">
            <FileSignature className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          Create Digital Signature
        </h3>
      </div>

      <div className="space-y-4">
        {/* Message Input */}
        <div>
          <label
            htmlFor="sign-message"
            className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2 block"
          >
            Message to Sign:
          </label>
          <textarea
            id="sign-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all resize-none"
            placeholder="Enter a message to sign..."
            rows={3}
          />
        </div>

        {/* Key Size Selection */}
        <fieldset>
          <legend className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3 block">
            Select Key Size:
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" role="radiogroup" aria-label="Key size selection">
            {keySizes.map((keySize) => (
              <m.button
                key={keySize.size}
                onClick={() => setSelectedSize(keySize.size)}
                className={`relative p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                  selectedSize === keySize.size
                    ? 'border-amber-500 bg-amber-100 dark:bg-amber-500/20'
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
                    <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center">
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

        {/* Current Key Pair Display */}
        {keyPair && (
          <div className="bg-slate-50 dark:bg-cyber-dark border border-slate-200 dark:border-white/5 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-3">
              <Key className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Current Key Pair</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span className="text-green-600 dark:text-green-400">Public:</span>
                <span className="text-slate-600 dark:text-slate-400 ml-1">e={keyPair.publicKey.e}, n={keyPair.publicKey.n}</span>
              </div>
              <div>
                <span className="text-red-600 dark:text-red-400">Private:</span>
                <span className="text-slate-600 dark:text-slate-400 ml-1">d={keyPair.privateKey.d}</span>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleSign}
          disabled={!message.trim()}
          className="w-full btn-primary justify-center py-3 sm:py-4 text-sm sm:text-base bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
          {keyPair ? 'Sign Message' : 'Generate Keys & Sign'}
        </button>
      </div>

      {/* Info Box */}
      <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-3 sm:p-4 space-y-2">
        <div className="flex items-start gap-2">
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
          <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <span className="font-semibold text-amber-600 dark:text-amber-400">How Signing Works:</span> Your message is first hashed to create a fixed-size fingerprint, then the hash is encrypted with your PRIVATE key. Anyone with your public key can verify it came from you!
          </div>
        </div>
      </div>
    </div>
  );
};
