import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { HashInputPanel } from '@/components/visualizations/Hash/HashInputPanel';
import { HashVisualizer } from '@/components/visualizations/Hash/HashVisualizer';
import { AvalancheEffectDemo } from '@/components/visualizations/Hash/AvalancheEffectDemo';
import { hashWithSteps, type HashStep } from '@/lib/crypto/hash';
import { BookOpen } from 'lucide-react';
import { QuizSystem } from '@/components/educational/QuizSystem';
import { hashingQuizQuestions } from '@/data/quizzes/hashingQuiz';

interface HashingPageProps {
  onNavigate?: (page: 'home' | 'aes' | 'rsa' | 'hashing' | 'glossary') => void;
}

export const HashingPage: React.FC<HashingPageProps> = ({ onNavigate }) => {
  const [steps, setSteps] = useState<HashStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleHash = (input: string) => {
    const newSteps = hashWithSteps(input);
    setSteps(newSteps);
    setCurrentStep(0);
    setIsPlaying(true);
  };

  // Auto-advance steps when playing
  React.useEffect(() => {
    if (isPlaying && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (isPlaying && currentStep === steps.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep, steps.length]);

  return (
    <Layout onNavigate={onNavigate}>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="glass-card p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black gradient-text mb-2">
                Hash Functions Visualizer
              </h1>
              <p className="text-white/60">
                Explore one-way functions and the avalanche effect
              </p>
            </div>
            <button className="btn-secondary text-sm">
              <BookOpen className="w-4 h-4" />
              Learn More
            </button>
          </div>
        </div>

        {/* Input Panel */}
        <HashInputPanel onHash={handleHash} />

        {/* Playback Controls */}
        {steps.length > 0 && (
          <div className="glass-card p-6 space-y-4">
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-600 to-teal-500 transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentStep(0)}
                  className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all"
                >
                  ⏮️
                </button>
                <button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all disabled:opacity-30"
                >
                  ◀️
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 rounded-2xl text-white font-bold hover:scale-105 transition-all"
                >
                  {isPlaying ? '⏸️ Pause' : '▶️ Play'}
                </button>
                <button
                  onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                  disabled={currentStep >= steps.length - 1}
                  className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all disabled:opacity-30"
                >
                  ▶️
                </button>
              </div>

              <div className="text-sm font-mono text-gray-400">
                Step {currentStep + 1} / {steps.length}
              </div>
            </div>
          </div>
        )}

        {/* Visualizer */}
        <HashVisualizer steps={steps} currentStep={currentStep} />

        {/* Avalanche Effect Demo */}
        <AvalancheEffectDemo />

        {/* Interactive Quiz */}
        <div className="max-w-3xl mx-auto w-full">
          <QuizSystem questions={hashingQuizQuestions} title="Hashing Knowledge Check" />
        </div>
      </div>
    </Layout>
  );
};
