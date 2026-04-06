import React from 'react';
import { Link } from 'react-router-dom';
import type { ComparableAlgorithm } from '@/store/compareStore';
import { ROUTES } from '@/router/routes';
import { Cpu, Key, Fingerprint, FileSignature, Users, Layers, ExternalLink } from 'lucide-react';

interface ComparePanelProps {
  algorithm: ComparableAlgorithm;
  side: 'left' | 'right';
}

const algorithmInfo: Record<ComparableAlgorithm, {
  name: string;
  type: string;
  description: string;
  keyFeature: string;
  Icon: React.FC<{ className?: string }>;
  color: string;
  route: string;
}> = {
  aes: {
    name: 'AES',
    type: 'Symmetric',
    description: 'Block cipher with substitution-permutation network',
    keyFeature: '128/192/256-bit keys',
    Icon: Cpu,
    color: 'blue',
    route: ROUTES.AES,
  },
  rsa: {
    name: 'RSA',
    type: 'Asymmetric',
    description: 'Public-key cryptosystem based on prime factorization',
    keyFeature: 'Public/Private key pairs',
    Icon: Key,
    color: 'purple',
    route: ROUTES.RSA,
  },
  hashing: {
    name: 'SHA-256',
    type: 'Hash Function',
    description: 'One-way function producing fixed-size output',
    keyFeature: 'Avalanche effect',
    Icon: Fingerprint,
    color: 'emerald',
    route: ROUTES.HASHING,
  },
  signatures: {
    name: 'Digital Signatures',
    type: 'Authentication',
    description: 'Prove authenticity without hiding content',
    keyFeature: 'Non-repudiation',
    Icon: FileSignature,
    color: 'amber',
    route: ROUTES.SIGNATURES,
  },
  'diffie-hellman': {
    name: 'Diffie-Hellman',
    type: 'Key Exchange',
    description: 'Secure key exchange over insecure channel',
    keyFeature: 'Shared secret',
    Icon: Users,
    color: 'indigo',
    route: ROUTES.DIFFIE_HELLMAN,
  },
  'block-modes': {
    name: 'Block Modes',
    type: 'Cipher Modes',
    description: 'ECB, CBC, GCM - how to handle multiple blocks',
    keyFeature: 'Pattern hiding',
    Icon: Layers,
    color: 'red',
    route: ROUTES.BLOCK_MODES,
  },
};

const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
  blue: { bg: 'bg-blue-100 dark:bg-blue-500/20', border: 'border-blue-500', text: 'text-blue-600 dark:text-blue-400' },
  purple: { bg: 'bg-purple-100 dark:bg-purple-500/20', border: 'border-purple-500', text: 'text-purple-600 dark:text-purple-400' },
  emerald: { bg: 'bg-emerald-100 dark:bg-emerald-500/20', border: 'border-emerald-500', text: 'text-emerald-600 dark:text-emerald-400' },
  amber: { bg: 'bg-amber-100 dark:bg-amber-500/20', border: 'border-amber-500', text: 'text-amber-600 dark:text-amber-400' },
  indigo: { bg: 'bg-indigo-100 dark:bg-indigo-500/20', border: 'border-indigo-500', text: 'text-indigo-600 dark:text-indigo-400' },
  red: { bg: 'bg-red-100 dark:bg-red-500/20', border: 'border-red-500', text: 'text-red-600 dark:text-red-400' },
};

export const ComparePanel: React.FC<ComparePanelProps> = ({ algorithm }) => {
  const info = algorithmInfo[algorithm];
  const colors = colorClasses[info.color];

  return (
    <div className={`glass-card p-4 sm:p-6 border-t-4 ${colors.border}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${colors.bg}`}>
            <info.Icon className={`w-6 h-6 ${colors.text}`} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {info.name}
            </h3>
            <span className={`text-xs font-semibold ${colors.text}`}>
              {info.type}
            </span>
          </div>
        </div>

        <Link
          to={info.route}
          className={`p-2 rounded-lg ${colors.bg} hover:scale-110 transition-transform`}
          title={`Open ${info.name} visualizer`}
        >
          <ExternalLink className={`w-4 h-4 ${colors.text}`} />
        </Link>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
        {info.description}
      </p>

      {/* Key Feature */}
      <div className={`p-3 rounded-xl ${colors.bg}`}>
        <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
          Key Feature
        </div>
        <div className={`font-bold ${colors.text}`}>
          {info.keyFeature}
        </div>
      </div>

      {/* Comparison Stats */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="bg-slate-50 dark:bg-cyber-dark p-3 rounded-xl">
          <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase mb-1">
            Direction
          </div>
          <div className="text-sm font-semibold text-slate-900 dark:text-white">
            {algorithm === 'hashing' ? 'One-way' : 'Reversible'}
          </div>
        </div>
        <div className="bg-slate-50 dark:bg-cyber-dark p-3 rounded-xl">
          <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase mb-1">
            Key Sharing
          </div>
          <div className="text-sm font-semibold text-slate-900 dark:text-white">
            {['aes', 'block-modes'].includes(algorithm) ? 'Same key' : algorithm === 'hashing' ? 'No key' : 'Different keys'}
          </div>
        </div>
      </div>
    </div>
  );
};
