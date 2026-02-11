import React, { useState } from 'react';
import { Key, FileText, Play, Sparkles } from 'lucide-react';

interface AESInputPanelProps {
  onEncrypt: (plaintext: string, key: string) => void;
}

export const AESInputPanel: React.FC<AESInputPanelProps> = ({ onEncrypt }) => {
  const [plaintext, setPlaintext] = useState('Hello AES!');
  const [key, setKey] = useState('SecretKey12345!');

  const handleEncrypt = () => {
    if (plaintext.trim() && key.trim()) {
      onEncrypt(plaintext, key);
    }
  };

  const handleExample = () => {
    setPlaintext('Hello AES!');
    setKey('SecretKey12345!');
  };

  return (
    <div className="glass-card p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
        <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg sm:rounded-xl">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          AES Encryption Input
        </h3>
        <button
          onClick={handleExample}
          className="btn-secondary text-xs sm:text-sm self-end sm:self-auto px-4 py-2"
        >
          Load Example
        </button>
      </div>

      <div className="space-y-4">
        {/* Plaintext Input */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white/70">
            <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
            Plaintext (max 16 characters)
          </label>
          <input
            type="text"
            value={plaintext}
            onChange={(e) => setPlaintext(e.target.value.slice(0, 16))}
            maxLength={16}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/5 border border-white/10 rounded-xl text-sm sm:text-base text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all font-mono"
            placeholder="Enter plaintext..."
          />
          <div className="text-[10px] sm:text-xs text-white/40">
            Length: {plaintext.length}/16 {plaintext.length < 16 && '(will be padded)'}
          </div>
        </div>

        {/* Key Input */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white/70">
            <Key className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
            Encryption Key (16 characters for AES-128)
          </label>
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value.slice(0, 16))}
            maxLength={16}
            className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white/5 border border-white/10 rounded-xl text-sm sm:text-base text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all font-mono"
            placeholder="Enter 16-character key..."
          />
          <div className="text-[10px] sm:text-xs text-white/40">
            Length: {key.length}/16 {key.length < 16 && '(will be padded)'}
          </div>
        </div>

        {/* Encrypt Button */}
        <button
          onClick={handleEncrypt}
          disabled={!plaintext.trim() || !key.trim()}
          className="w-full btn-primary justify-center py-3 sm:py-4 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <Play className="w-4 h-4 sm:w-5 sm:h-5" />
          Start Encryption Visualization
        </button>
      </div>

      {/* Info Box */}
      <div className="glass-card bg-blue-500/10 border-blue-500/30 p-3 sm:p-4 space-y-2">
        <div className="flex items-start gap-2">
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="text-xs sm:text-sm text-white/70 leading-relaxed">
            <span className="font-semibold text-blue-400">Pro Tip:</span> AES-128 uses a 128-bit (16-byte) key. Watch as your plaintext goes through 10 rounds of SubBytes, ShiftRows, MixColumns, and AddRoundKey transformations!
          </div>
        </div>
      </div>
    </div>
  );
};
