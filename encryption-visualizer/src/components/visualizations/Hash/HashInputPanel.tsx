import React, { useState } from 'react';
import { Hash, Zap, Sparkles } from 'lucide-react';

export const HashInputPanel: React.FC<{ onHash: (input: string) => void }> = ({ onHash }) => {
  const [input, setInput] = useState('Hello, World!');
  
  const examples = [
    'Hello, World!',
    'Cryptography',
    'SHA-256',
    'Blockchain',
  ];
  
  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-emerald-600 to-teal-500 rounded-xl">
            <Hash className="w-5 h-5 text-white" />
          </div>
          Hash Function Input
        </h3>
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-sm font-semibold text-white/70 mb-2 block">
            Enter text to hash:
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all"
              placeholder="Enter any text..."
            />
            <button
              onClick={() => onHash(input)}
              className="btn-primary px-6"
            >
              <Zap className="w-4 h-4" />
              Hash It!
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-white/50 font-semibold">Quick examples:</span>
          {examples.map((example) => (
            <button
              key={example}
              onClick={() => {
                setInput(example);
                onHash(example);
              }}
              className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/30 rounded-lg text-xs font-medium text-white/70 hover:text-white transition-all"
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card bg-emerald-500/10 border-emerald-500/30 p-4">
        <div className="flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-white/70 leading-relaxed">
            <span className="font-semibold text-emerald-400">Hash Functions:</span> Transform any input into a fixed-size output. Same input always produces the same hash, but even tiny changes create completely different hashes!
          </div>
        </div>
      </div>
    </div>
  );
};
