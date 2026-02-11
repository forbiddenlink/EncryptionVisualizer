import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { RSAInputPanel } from '@/components/visualizations/RSA/RSAInputPanel';
import { RSAVisualizer } from '@/components/visualizations/RSA/RSAVisualizer';
import { RSAEncryptDecryptPanel } from '@/components/visualizations/RSA/RSAEncryptDecryptPanel';
import { generateRSAKeyPairWithSteps } from '@/lib/crypto/rsa';
import type { RSAStep, RSAKeyPair } from '@/lib/types';
import { BookOpen, Key } from 'lucide-react';
import { QuizSystem } from '@/components/educational/QuizSystem';
import { rsaQuizQuestions } from '@/data/quizzes/rsaQuiz';

interface RSAPageProps {
  onNavigate?: (page: 'home' | 'aes' | 'rsa' | 'hashing' | 'glossary') => void;
}

export const RSAPage: React.FC<RSAPageProps> = ({ onNavigate }) => {
  const [steps, setSteps] = useState<RSAStep[]>([]);
  const [keyPair, setKeyPair] = useState<RSAKeyPair | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const handleGenerate = (keySize: 'small' | 'medium' | 'large') => {
    const { keyPair: newKeyPair, steps: newSteps } = generateRSAKeyPairWithSteps(keySize);
    setKeyPair(newKeyPair);
    setSteps(newSteps);
    setCurrentStep(0);
    setIsPlaying(true);
  };

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);
  const reset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Auto-advance steps when playing
  React.useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 2000 / speed);
      return () => clearTimeout(timer);
    } else if (isPlaying && currentStep === steps.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep, steps.length, speed]);

  return (
    <Layout onNavigate={onNavigate}>
      <div className="space-y-6 sm:space-y-8">
        {/* Page Header */}
        <div className="glass-card p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black gradient-text mb-2">
                RSA Encryption Visualizer
              </h1>
              <p className="text-sm sm:text-base text-white/60">
                Explore public-key cryptography step-by-step
              </p>
            </div>
            <button className="btn-secondary text-sm self-end sm:self-auto">
              <BookOpen className="w-4 h-4" />
              Learn More
            </button>
          </div>
        </div>

        {/* Input Panel */}
        <RSAInputPanel onGenerate={handleGenerate} />

        {/* Playback Controls */}
        {steps.length > 0 && (
          <div className="glass-card p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center sm:justify-start">
                <button
                  onClick={reset}
                  className="p-2 sm:p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95"
                >
                  <Key className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                </button>

                <button
                  onClick={previousStep}
                  disabled={currentStep === 0}
                  className="p-2 sm:p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  ←
                </button>

                <button
                  onClick={isPlaying ? pause : play}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl text-white font-bold hover:scale-105 active:scale-95 transition-all"
                >
                  {isPlaying ? 'Pause' : 'Play'}
                </button>

                <button
                  onClick={nextStep}
                  disabled={currentStep >= steps.length - 1}
                  className="p-2 sm:p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  →
                </button>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 glass-card px-3 sm:px-4 py-2 sm:py-3 border-white/10">
                <span className="text-xs sm:text-sm font-semibold text-white/70">Speed</span>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {[0.5, 1, 2, 4].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSpeed(s)}
                      className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-bold transition-all ${speed === s
                        ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white'
                        : 'bg-white/5 text-white/50 hover:bg-white/10'
                        }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center text-sm font-mono text-gray-400">
              Step {currentStep + 1} / {steps.length}
            </div>
          </div>
        )}

        {/* Visualizer */}
        <RSAVisualizer steps={steps} currentStep={currentStep} />

        {/* Encryption/Decryption Panel */}
        {keyPair && steps.length > 0 && currentStep === steps.length - 1 && (
          <RSAEncryptDecryptPanel keyPair={keyPair} />
        )}

        {/* Interactive Quiz */}
        <div className="max-w-3xl mx-auto w-full">
          <QuizSystem questions={rsaQuizQuestions} title="RSA Knowledge Check" />
        </div>
      </div>
    </Layout>
  );
};
