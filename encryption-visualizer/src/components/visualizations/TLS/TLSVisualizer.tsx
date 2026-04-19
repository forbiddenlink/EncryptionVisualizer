import React, { useMemo } from 'react';
import type { TLSStep } from '@/lib/types/tls';
import { m } from 'framer-motion';
import { Lock, Unlock, Monitor, Server, ArrowRight, ArrowLeft, Shield, Key, FileCheck } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { TLSMessageFlow } from './TLSMessageFlow';

interface TLSVisualizerProps {
  steps: TLSStep[];
  currentStep: number;
}

const algorithmLinks: Record<string, { label: string; path: string }> = {
  'Diffie-Hellman': { label: 'DH Key Exchange', path: '/diffie-hellman' },
  'AES-128-GCM': { label: 'AES Encryption', path: '/aes' },
  'AES-GCM': { label: 'AES Encryption', path: '/aes' },
  'ECDSA-SHA256': { label: 'Digital Signatures', path: '/signatures' },
  'RSA/ECDSA': { label: 'Digital Signatures', path: '/signatures' },
  'HKDF-SHA256': { label: 'SHA-256 Hashing', path: '/sha256' },
  'HMAC-SHA256': { label: 'SHA-256 Hashing', path: '/sha256' },
};

function getStepIcon(type: TLSStep['type']) {
  switch (type) {
    case 'client-hello':
    case 'server-hello':
      return <Monitor className="w-5 h-5 text-white" />;
    case 'key-share':
    case 'derive-keys':
      return <Key className="w-5 h-5 text-white" />;
    case 'certificate':
    case 'verify':
      return <FileCheck className="w-5 h-5 text-white" />;
    case 'finished':
      return <Shield className="w-5 h-5 text-white" />;
    case 'application-data':
      return <Lock className="w-5 h-5 text-white" />;
    default:
      return <Monitor className="w-5 h-5 text-white" />;
  }
}

function getStepGradient(type: TLSStep['type']): string {
  switch (type) {
    case 'client-hello':
      return 'from-blue-600 to-blue-400';
    case 'server-hello':
      return 'from-violet-600 to-violet-400';
    case 'key-share':
      return 'from-pink-600 to-pink-400';
    case 'derive-keys':
      return 'from-fuchsia-600 to-fuchsia-400';
    case 'certificate':
      return 'from-amber-600 to-amber-400';
    case 'verify':
      return 'from-orange-600 to-orange-400';
    case 'finished':
      return 'from-teal-600 to-teal-400';
    case 'application-data':
      return 'from-emerald-600 to-emerald-400';
    default:
      return 'from-gray-600 to-gray-400';
  }
}

function getActorBorder(actor: TLSStep['actor']): string {
  switch (actor) {
    case 'client':
      return 'border-blue-500/50';
    case 'server':
      return 'border-violet-500/50';
    case 'both':
      return 'border-pink-500/50';
    default:
      return 'border-transparent';
  }
}

export const TLSVisualizer: React.FC<TLSVisualizerProps> = ({ steps, currentStep }) => {
  const prefersReducedMotion = useReducedMotion();

  const transition = useMemo(
    () =>
      prefersReducedMotion
        ? { duration: 0 }
        : { type: 'spring' as const, stiffness: 400, damping: 40 },
    [prefersReducedMotion]
  );

  const itemTransition = useMemo(
    () => (prefersReducedMotion ? { duration: 0 } : { duration: 0.3 }),
    [prefersReducedMotion]
  );

  if (steps.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <div className="inline-block p-4 bg-indigo-100 dark:bg-indigo-500/20 rounded-2xl mb-4">
          <Shield className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Ready for TLS Handshake</h3>
        <p className="text-slate-600 dark:text-slate-400">
          Click "Start Handshake" above to simulate a TLS 1.3 connection
        </p>
      </div>
    );
  }

  const step = steps[currentStep];
  const isEncrypted = step.dataExchanged?.encrypted ?? (step.stepNumber >= 4);
  const gradient = getStepGradient(step.type);

  // Find algorithm used at this step
  const algorithmUsed = step.values?.['Algorithm'] as string | undefined;
  const encryptionAlgorithm = step.values?.['Encryption'] as string | undefined;
  const signatureAlgorithm = step.values?.['Signature Algorithm'] as string | undefined;
  const activeAlgorithm = algorithmUsed || encryptionAlgorithm || signatureAlgorithm;
  const algorithmInfo = activeAlgorithm ? algorithmLinks[activeAlgorithm] : null;

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <m.div
        key={currentStep}
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, filter: 'blur(4px)' }}
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={transition}
        className="glass-card p-6 space-y-4"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-4 bg-gradient-to-br ${gradient} rounded-2xl shadow-lg`}>
              {getStepIcon(step.type)}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{step.title}</h3>
                <span
                  className={`text-xs font-bold uppercase px-2 py-1 rounded-full ${
                    step.actor === 'client'
                      ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400'
                      : step.actor === 'server'
                      ? 'bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400'
                      : 'bg-pink-100 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400'
                  }`}
                >
                  {step.actor}
                </span>
                {isEncrypted ? (
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/20 px-2 py-1 rounded-full">
                    <Lock className="w-3 h-3" />
                    Encrypted
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs font-bold text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-500/20 px-2 py-1 rounded-full">
                    <Unlock className="w-3 h-3" />
                    Plaintext
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold mt-1">
                Step {step.stepNumber + 1} of {steps.length}
              </p>
            </div>
          </div>
        </div>

        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{step.description}</p>

        {/* Algorithm link */}
        {algorithmInfo && (
          <div className="bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 p-3 rounded-xl">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase">Algorithm Used</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm font-mono font-bold text-indigo-600 dark:text-indigo-400">{activeAlgorithm}</span>
              <a
                href={algorithmInfo.path}
                className="text-xs text-indigo-500 dark:text-indigo-300 underline hover:text-indigo-700 dark:hover:text-indigo-200 transition-colors"
              >
                Learn about {algorithmInfo.label} &rarr;
              </a>
            </div>
          </div>
        )}

        {/* Cipher suite display */}
        {step.cipherSuite && (
          <div className="bg-slate-50 dark:bg-cyber-dark border border-slate-200 dark:border-white/5 p-3 rounded-xl">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">CIPHER SUITE</div>
            <div className="text-sm font-mono text-slate-800 dark:text-slate-200">{step.cipherSuite}</div>
          </div>
        )}
      </m.div>

      {/* Client / Server Two-Column View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Client Column */}
        <m.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
          transition={itemTransition}
          className={`glass-card p-6 border-2 ${step.actor === 'client' || step.actor === 'both' ? 'border-blue-500/50' : 'border-transparent'}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
              <Monitor className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">Client</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Browser / Application</p>
            </div>
          </div>

          <div className="space-y-3">
            {step.actor === 'client' || step.actor === 'both' ? (
              <>
                {step.values &&
                  Object.entries(step.values)
                    .filter(([key]) => {
                      if (step.actor === 'client') return true;
                      // For 'both', show client-relevant values
                      return key.toLowerCase().includes('client') || key === 'Shared Secret' || key === 'Algorithm' || key === 'Transcript verified' || key === 'Forward Secrecy' || key === 'Encryption' || key === 'Record Nonce';
                    })
                    .map(([key, value]) => (
                      <div
                        key={key}
                        className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 p-3 rounded-xl"
                      >
                        <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase mb-1">{key}</div>
                        <div className="text-sm font-mono font-bold text-blue-700 dark:text-blue-300 break-all">{String(value)}</div>
                      </div>
                    ))}
              </>
            ) : (
              <div className="text-sm text-slate-400 dark:text-slate-500 italic py-4 text-center">
                Waiting...
              </div>
            )}
          </div>
        </m.div>

        {/* Server Column */}
        <m.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
          transition={itemTransition}
          className={`glass-card p-6 border-2 ${step.actor === 'server' || step.actor === 'both' ? 'border-violet-500/50' : 'border-transparent'}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-violet-500 flex items-center justify-center">
              <Server className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">Server</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Web Server</p>
            </div>
          </div>

          <div className="space-y-3">
            {step.actor === 'server' || step.actor === 'both' ? (
              <>
                {step.values &&
                  Object.entries(step.values)
                    .filter(([key]) => {
                      if (step.actor === 'server') return true;
                      // For 'both', show server-relevant values
                      return key.toLowerCase().includes('server') || key === 'Shared Secret' || key === 'Algorithm' || key === 'Master Secret' || key === 'Transcript verified' || key === 'Forward Secrecy' || key === 'Encryption' || key === 'Record Nonce';
                    })
                    .map(([key, value]) => (
                      <div
                        key={key}
                        className="bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/30 p-3 rounded-xl"
                      >
                        <div className="text-xs font-semibold text-violet-600 dark:text-violet-400 uppercase mb-1">{key}</div>
                        <div className="text-sm font-mono font-bold text-violet-700 dark:text-violet-300 break-all">{String(value)}</div>
                      </div>
                    ))}
              </>
            ) : (
              <div className="text-sm text-slate-400 dark:text-slate-500 italic py-4 text-center">
                Waiting...
              </div>
            )}
          </div>
        </m.div>
      </div>

      {/* Data Exchange Indicator */}
      {step.dataExchanged && (
        <m.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={itemTransition}
          className={`glass-card p-4 border-2 ${
            step.dataExchanged.encrypted
              ? 'border-emerald-500/30 bg-gradient-to-r from-emerald-50/50 to-transparent dark:from-emerald-500/5'
              : 'border-red-500/30 bg-gradient-to-r from-red-50/50 to-transparent dark:from-red-500/5'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-xl ${step.dataExchanged.encrypted ? 'bg-emerald-100 dark:bg-emerald-500/20' : 'bg-red-100 dark:bg-red-500/20'}`}>
              {step.dataExchanged.encrypted ? (
                <Lock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <Unlock className="w-5 h-5 text-red-600 dark:text-red-400" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Data Flow</span>
                {step.dataExchanged.direction === 'client-to-server' ? (
                  <ArrowRight className="w-4 h-4 text-blue-500" />
                ) : (
                  <ArrowLeft className="w-4 h-4 text-violet-500" />
                )}
              </div>
              <p className={`text-sm font-mono ${
                step.dataExchanged.encrypted
                  ? 'text-emerald-700 dark:text-emerald-300'
                  : 'text-red-700 dark:text-red-300'
              }`}>
                {step.dataExchanged.content}
              </p>
            </div>
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${
              step.dataExchanged.encrypted
                ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                : 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400'
            }`}>
              {step.dataExchanged.encrypted ? 'ENCRYPTED' : 'PLAINTEXT'}
            </span>
          </div>
        </m.div>
      )}

      {/* Handshake Complete */}
      {step.type === 'application-data' && (
        <m.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          transition={itemTransition}
          className="glass-card p-6 border-2 border-emerald-500/50 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-500/10 dark:to-teal-500/10"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <Shield className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">TLS Handshake Complete</h4>
          </div>

          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mx-auto mb-2">
                <Monitor className="w-6 h-6 text-white" />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Client</p>
            </div>

            <div className="flex-1 max-w-xs">
              <div className="h-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-violet-500 rounded-full" />
              <div className="text-center mt-3">
                <div className="flex items-center justify-center gap-2">
                  <Lock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">AES-128-GCM</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">All traffic encrypted with forward secrecy</p>
              </div>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-violet-500 flex items-center justify-center mx-auto mb-2">
                <Server className="w-6 h-6 text-white" />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Server</p>
            </div>
          </div>
        </m.div>
      )}

      {/* Message Sequence Diagram */}
      <TLSMessageFlow steps={steps} currentStep={currentStep} />
    </div>
  );
};
