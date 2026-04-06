import React, { useMemo } from 'react';
import type { SignatureStep } from '@/lib/types';
import { m } from 'framer-motion';
import { FileSignature, Hash, Key, CheckCircle, XCircle, Shield } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface SignatureVisualizerProps {
  steps: SignatureStep[];
  currentStep: number;
}

export const SignatureVisualizer: React.FC<SignatureVisualizerProps> = ({ steps, currentStep }) => {
  const prefersReducedMotion = useReducedMotion();

  const transition = useMemo(() =>
    prefersReducedMotion
      ? { duration: 0 }
      : { type: 'spring' as const, stiffness: 400, damping: 40 },
    [prefersReducedMotion]
  );

  const itemTransition = useMemo(() =>
    prefersReducedMotion
      ? { duration: 0 }
      : { duration: 0.3 },
    [prefersReducedMotion]
  );

  if (steps.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <div className="inline-block p-4 bg-amber-100 dark:bg-amber-500/20 rounded-2xl mb-4">
          <FileSignature className="w-12 h-12 text-amber-600 dark:text-amber-400" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Ready to Sign</h3>
        <p className="text-slate-600 dark:text-slate-400">
          Enter a message above and click "Sign Message" to see how digital signatures work step-by-step
        </p>
      </div>
    );
  }

  const step = steps[currentStep];

  const getStepColor = (type: SignatureStep['type']) => {
    switch (type) {
      case 'message-input':
      case 'verify-input':
        return { bg: 'from-blue-600 to-indigo-500', text: 'text-blue-400', border: 'border-blue-500/30' };
      case 'hash-generation':
      case 'verify-hash':
        return { bg: 'from-emerald-600 to-teal-500', text: 'text-emerald-400', border: 'border-emerald-500/30' };
      case 'sign-hash':
      case 'decrypt-signature':
        return { bg: 'from-amber-500 to-orange-500', text: 'text-amber-400', border: 'border-amber-500/30' };
      case 'signature-complete':
        return { bg: 'from-violet-600 to-purple-500', text: 'text-violet-400', border: 'border-violet-500/30' };
      case 'compare-hashes':
        return { bg: 'from-yellow-500 to-amber-500', text: 'text-yellow-400', border: 'border-yellow-500/30' };
      case 'verify-result':
        return step.values?.isValid
          ? { bg: 'from-green-600 to-emerald-500', text: 'text-green-400', border: 'border-green-500/30' }
          : { bg: 'from-red-600 to-rose-500', text: 'text-red-400', border: 'border-red-500/30' };
      default:
        return { bg: 'from-gray-600 to-gray-500', text: 'text-gray-400', border: 'border-gray-500/30' };
    }
  };

  const getStepIcon = (type: SignatureStep['type']) => {
    switch (type) {
      case 'message-input':
      case 'verify-input':
        return <FileSignature className="w-7 h-7 text-white" strokeWidth={2.5} />;
      case 'hash-generation':
      case 'verify-hash':
        return <Hash className="w-7 h-7 text-white" strokeWidth={2.5} />;
      case 'sign-hash':
      case 'decrypt-signature':
        return <Key className="w-7 h-7 text-white" strokeWidth={2.5} />;
      case 'signature-complete':
        return <Shield className="w-7 h-7 text-white" strokeWidth={2.5} />;
      case 'compare-hashes':
        return <Hash className="w-7 h-7 text-white" strokeWidth={2.5} />;
      case 'verify-result':
        return step.values?.isValid
          ? <CheckCircle className="w-7 h-7 text-white" strokeWidth={2.5} />
          : <XCircle className="w-7 h-7 text-white" strokeWidth={2.5} />;
      default:
        return <FileSignature className="w-7 h-7 text-white" strokeWidth={2.5} />;
    }
  };

  const stepColor = getStepColor(step.type);

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <m.div
        key={currentStep}
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, filter: "blur(4px)" }}
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -20, filter: "blur(4px)" }}
        transition={transition}
        className="glass-card p-6 space-y-4"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-4 bg-gradient-to-br ${stepColor.bg} rounded-2xl shadow-lg`}>
              {getStepIcon(step.type)}
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{step.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold mt-1">
                Step {step.stepNumber + 1} of {steps.length}
              </p>
            </div>
          </div>
        </div>

        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{step.description}</p>

        {step.formula && (
          <div className={`bg-slate-50 dark:bg-cyber-dark p-4 border-2 ${stepColor.border} rounded-xl`}>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">FORMULA:</div>
            <div className={`text-lg font-mono font-bold ${stepColor.text}`}>
              {step.formula}
            </div>
          </div>
        )}

        {step.calculation && (
          <div className="bg-slate-50 dark:bg-cyber-dark border border-slate-200 dark:border-white/5 p-4 rounded-xl">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">CALCULATION:</div>
            <div className="text-base font-mono text-slate-800 dark:text-slate-200">{step.calculation}</div>
          </div>
        )}
      </m.div>

      {/* Values Display */}
      {step.values && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {Object.entries(step.values).map(([key, value]) => {
            // Special styling for isValid
            if (key === 'isValid') {
              return (
                <m.div
                  key={key}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
                  animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                  transition={itemTransition}
                  className={`glass-card p-4 text-center col-span-2 sm:col-span-1 ${
                    value ? 'border-2 border-green-500/30' : 'border-2 border-red-500/30'
                  }`}
                >
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase mb-2">
                    Result
                  </div>
                  <div className={`text-2xl font-bold ${value ? 'text-green-500' : 'text-red-500'}`}>
                    {value ? 'VALID' : 'INVALID'}
                  </div>
                </m.div>
              );
            }

            // Skip displaying long messages in the grid
            if (key === 'message' && typeof value === 'string' && value.length > 30) {
              return null;
            }

            return (
              <m.div
                key={key}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                transition={itemTransition}
                className="glass-card p-4 text-center"
              >
                <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase mb-2">{key}</div>
                <div className={`text-lg sm:text-2xl font-bold font-mono ${stepColor.text} break-all`}>
                  {typeof value === 'string' && value.length > 12
                    ? value.slice(0, 12) + '...'
                    : String(value)}
                </div>
              </m.div>
            );
          })}
        </div>
      )}

      {/* Signature Complete Display */}
      {step.type === 'signature-complete' && step.values && (
        <div className="glass-card p-6 border-2 border-amber-500/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-amber-500 rounded-xl">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">Your Digital Signature</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">Send this with your message</p>
            </div>
          </div>
          <div className="space-y-3">
            {step.values.message && (
              <div className="bg-slate-50 dark:bg-cyber-dark border border-slate-200 dark:border-white/5 p-3 rounded-lg">
                <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Message:</span>
                <span className="text-sm text-slate-700 dark:text-slate-300 break-all">
                  {step.values.message.length > 100 ? step.values.message.slice(0, 100) + '...' : step.values.message}
                </span>
              </div>
            )}
            <div className="bg-slate-50 dark:bg-cyber-dark border border-slate-200 dark:border-white/5 p-3 rounded-lg">
              <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Hash:</span>
              <span className="text-lg font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {step.values.messageHash}
              </span>
            </div>
            <div className="bg-amber-50 dark:bg-amber-500/10 p-3 rounded-lg border border-amber-200 dark:border-amber-500/30">
              <span className="text-xs text-amber-600 dark:text-amber-400 block mb-1">Signature:</span>
              <span className="text-2xl font-mono font-bold text-amber-600 dark:text-amber-400">
                {step.values.signature}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Verification Result Display */}
      {step.type === 'verify-result' && (
        <div className={`glass-card p-6 border-2 ${step.values?.isValid ? 'border-green-500/30' : 'border-red-500/30'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-3 rounded-xl ${step.values?.isValid ? 'bg-green-500' : 'bg-red-500'}`}>
              {step.values?.isValid ? (
                <CheckCircle className="w-6 h-6 text-white" />
              ) : (
                <XCircle className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                {step.values?.isValid ? 'Signature Verified!' : 'Verification Failed!'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {step.values?.isValid
                  ? 'The message is authentic and unmodified'
                  : 'The message may have been tampered with or was not signed by the claimed sender'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
