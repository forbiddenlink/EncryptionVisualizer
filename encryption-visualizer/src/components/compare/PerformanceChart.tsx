import React from 'react';
import { motion } from 'framer-motion';
import { Gauge } from 'lucide-react';

interface PerformanceEntry {
  name: string;
  category: 'hash' | 'symmetric' | 'asymmetric';
  opsPerSecond: number;
  color: string;
  description: string;
}

const performanceData: PerformanceEntry[] = [
  {
    name: 'SHA-256',
    category: 'hash',
    opsPerSecond: 2_000_000,
    color: 'bg-emerald-500',
    description: 'Fastest category - no key operations needed',
  },
  {
    name: 'AES-128-GCM',
    category: 'symmetric',
    opsPerSecond: 1_500_000,
    color: 'bg-blue-500',
    description: 'Hardware-accelerated on modern CPUs (AES-NI)',
  },
  {
    name: 'AES-256-CBC',
    category: 'symmetric',
    opsPerSecond: 1_200_000,
    color: 'bg-blue-400',
    description: 'Slightly slower due to larger key schedule',
  },
  {
    name: 'HMAC-SHA256',
    category: 'hash',
    opsPerSecond: 1_000_000,
    color: 'bg-emerald-400',
    description: 'Hash-based authentication is very fast',
  },
  {
    name: 'ECC Sign (P-256)',
    category: 'asymmetric',
    opsPerSecond: 30_000,
    color: 'bg-indigo-500',
    description: 'Much faster than RSA at equivalent security',
  },
  {
    name: 'ECC Verify (P-256)',
    category: 'asymmetric',
    opsPerSecond: 15_000,
    color: 'bg-indigo-400',
    description: 'Verification slightly slower than signing',
  },
  {
    name: 'RSA-2048 Sign',
    category: 'asymmetric',
    opsPerSecond: 1_000,
    color: 'bg-purple-500',
    description: 'Large number exponentiation is expensive',
  },
  {
    name: 'RSA-2048 Verify',
    category: 'asymmetric',
    opsPerSecond: 20_000,
    color: 'bg-purple-400',
    description: 'Verification faster due to small public exponent',
  },
  {
    name: 'DH Key Exchange',
    category: 'asymmetric',
    opsPerSecond: 2_000,
    color: 'bg-amber-500',
    description: 'One-time cost per session establishment',
  },
];

const maxOps = Math.max(...performanceData.map((d) => d.opsPerSecond));

const categoryLabels: Record<string, { label: string; color: string }> = {
  hash: { label: 'Hash Functions', color: 'text-emerald-400' },
  symmetric: { label: 'Symmetric Ciphers', color: 'text-blue-400' },
  asymmetric: { label: 'Asymmetric / Key Exchange', color: 'text-purple-400' },
};

function formatOps(ops: number): string {
  if (ops >= 1_000_000) return `${(ops / 1_000_000).toFixed(1)}M`;
  if (ops >= 1_000) return `${(ops / 1_000).toFixed(0)}K`;
  return ops.toString();
}

export const PerformanceChart: React.FC = () => {
  const grouped = (['hash', 'symmetric', 'asymmetric'] as const).map((cat) => ({
    ...categoryLabels[cat],
    category: cat,
    entries: performanceData.filter((d) => d.category === cat),
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <Gauge className="w-5 h-5 text-cyber-cyan" />
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Relative Performance
        </h3>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-400">
        Approximate operations per second on modern hardware. Hash and symmetric operations
        are orders of magnitude faster than asymmetric ones.
      </p>

      {grouped.map((group, groupIndex) => (
        <motion.div
          key={group.category}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: groupIndex * 0.15 }}
          className="space-y-3"
        >
          <h4 className={`text-sm font-bold ${group.color}`}>{group.label}</h4>

          <div className="space-y-2">
            {group.entries.map((entry, entryIndex) => {
              const widthPercent = Math.max(
                (Math.log(entry.opsPerSecond + 1) / Math.log(maxOps + 1)) * 100,
                6
              );

              return (
                <div key={entry.name} className="group">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 font-mono w-36 flex-shrink-0 text-right">
                      {entry.name}
                    </span>
                    <div className="flex-1 h-7 bg-slate-900/50 rounded-lg overflow-hidden">
                      <motion.div
                        className={`h-full ${entry.color} rounded-lg flex items-center justify-end pr-2`}
                        initial={{ width: 0 }}
                        animate={{ width: `${widthPercent}%` }}
                        transition={{
                          delay: groupIndex * 0.15 + entryIndex * 0.05,
                          duration: 0.7,
                          ease: 'easeOut',
                        }}
                      >
                        <span className="text-[10px] font-bold text-white/90 whitespace-nowrap">
                          {formatOps(entry.opsPerSecond)} ops/s
                        </span>
                      </motion.div>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-500 ml-[9.5rem] mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    {entry.description}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>
      ))}

      <div className="p-4 rounded-xl bg-cyber-blue/5 border border-cyber-blue/20">
        <p className="text-xs text-slate-400">
          <span className="font-bold text-cyber-cyan">Key insight:</span> Symmetric encryption
          (AES) can be 1000x faster than asymmetric (RSA). This is why TLS uses RSA/DH only
          for key exchange, then switches to AES for bulk data.
        </p>
      </div>
    </div>
  );
};
