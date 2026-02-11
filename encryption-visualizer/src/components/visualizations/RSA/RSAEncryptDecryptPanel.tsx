import React, { useState } from 'react';
import { encryptRSA, decryptRSA } from '@/lib/crypto/rsa';
import type { RSAKeyPair } from '@/lib/types';
import { Lock, Unlock, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface RSAEncryptDecryptPanelProps {
  keyPair: RSAKeyPair | null;
}

export const RSAEncryptDecryptPanel: React.FC<RSAEncryptDecryptPanelProps> = ({ keyPair }) => {
  const [message, setMessage] = useState('42');
  const [encrypted, setEncrypted] = useState<number | null>(null);
  const [decrypted, setDecrypted] = useState<number | null>(null);

  if (!keyPair) {
    return (
      <div className="glass-card p-6 text-center opacity-50">
        <Lock className="w-12 h-12 text-white/30 mx-auto mb-3" />
        <p className="text-white/50">Generate a key pair first to encrypt and decrypt messages</p>
      </div>
    );
  }

  const handleEncrypt = () => {
    const messageNum = parseInt(message);
    if (isNaN(messageNum) || messageNum < 0 || messageNum >= keyPair.publicKey.n) {
      alert(`Message must be a number between 0 and ${keyPair.publicKey.n - 1}`);
      return;
    }
    const ciphertext = encryptRSA(messageNum, keyPair.publicKey);
    setEncrypted(ciphertext);
    setDecrypted(null);
  };

  const handleDecrypt = () => {
    if (encrypted === null) return;
    const plaintext = decryptRSA(encrypted, keyPair.privateKey);
    setDecrypted(plaintext);
  };

  return (
    <div className="space-y-6">
      <div className="glass-card p-6 space-y-4">
        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-green-600 to-emerald-500 rounded-xl">
            <Lock className="w-5 h-5 text-white" />
          </div>
          Encrypt & Decrypt Messages
        </h3>

        {/* Message Input */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-white/70">
            Enter a number to encrypt (0 to {keyPair.publicKey.n - 1}):
          </label>
          <div className="flex gap-3">
            <input
              type="number"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              min="0"
              max={keyPair.publicKey.n - 1}
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-green-500/50 focus:bg-white/10 transition-all font-mono"
              placeholder="Enter a number..."
            />
            <button
              onClick={handleEncrypt}
              className="btn-primary px-6"
            >
              <Lock className="w-4 h-4" />
              Encrypt
            </button>
          </div>
        </div>

        {/* Encryption Flow */}
        {encrypted !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Encrypted Value */}
            <div className="glass-card bg-red-500/10 border-2 border-red-500/30 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">Encrypted Message</h4>
                  <p className="text-xs text-white/50">Using public key (e={keyPair.publicKey.e}, n={keyPair.publicKey.n})</p>
                </div>
                <Lock className="w-8 h-8 text-red-400" />
              </div>
              <div className="bg-white/5 p-4 rounded-xl">
                <div className="text-sm text-white/50 mb-1">Ciphertext:</div>
                <div className="text-3xl font-bold font-mono text-red-400">{encrypted}</div>
              </div>
              <div className="mt-4 text-xs text-white/50">
                Formula: C = M^e mod n = {message}^{keyPair.publicKey.e} mod {keyPair.publicKey.n} = {encrypted}
              </div>
            </div>

            {/* Decrypt Button */}
            <div className="flex justify-center">
              <button
                onClick={handleDecrypt}
                className="btn-primary px-8 py-4"
              >
                <Unlock className="w-5 h-5" />
                Decrypt with Private Key
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Decrypted Value */}
            {decrypted !== null && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card bg-green-500/10 border-2 border-green-500/30 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">Decrypted Message</h4>
                    <p className="text-xs text-white/50">Using private key (d={keyPair.privateKey.d}, n={keyPair.privateKey.n})</p>
                  </div>
                  <Unlock className="w-8 h-8 text-green-400" />
                </div>
                <div className="bg-white/5 p-4 rounded-xl">
                  <div className="text-sm text-white/50 mb-1">Original message recovered:</div>
                  <div className="text-3xl font-bold font-mono text-green-400">{decrypted}</div>
                </div>
                <div className="mt-4 text-xs text-white/50">
                  Formula: M = C^d mod n = {encrypted}^{keyPair.privateKey.d} mod {keyPair.privateKey.n} = {decrypted}
                </div>
                {decrypted === parseInt(message) && (
                  <div className="mt-4 flex items-center gap-2 p-3 bg-green-500/20 border border-green-500/30 rounded-xl">
                    <Sparkles className="w-5 h-5 text-green-400" />
                    <span className="text-sm font-bold text-green-300">
                      ✓ Successfully decrypted! Original message matches.
                    </span>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </div>

      {/* Info Box */}
      <div className="glass-card bg-purple-500/10 border-purple-500/30 p-4">
        <div className="flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-white/70 leading-relaxed">
            <span className="font-semibold text-purple-400">The Magic of RSA:</span> Anyone can encrypt a message with your public key, but only you (with the private key) can decrypt it. This is the foundation of secure communication!
          </div>
        </div>
      </div>
    </div>
  );
};
