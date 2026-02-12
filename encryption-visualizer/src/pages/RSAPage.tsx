import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { RSAInputPanel } from '@/components/visualizations/RSA/RSAInputPanel';
import { RSAVisualizer } from '@/components/visualizations/RSA/RSAVisualizer';
import { RSAEncryptDecryptPanel } from '@/components/visualizations/RSA/RSAEncryptDecryptPanel';
import { generateRSAKeyPairWithSteps } from '@/lib/crypto/rsa';
import type { RSAStep, RSAKeyPair } from '@/lib/types';
import { BookOpen, Key, Info, AlertTriangle, CheckCircle, Globe, Terminal, FileText } from 'lucide-react';
import { QuizSystem } from '@/components/educational/QuizSystem';
import { rsaQuizQuestions } from '@/data/quizzes/rsaQuiz';
import { EducationalCard } from '@/components/educational/EducationalCard';
import { rsaEducationalContent } from '@/data/rsaEducationalContent';

const iconMap = {
  info: Info,
  globe: Globe,
  terminal: Terminal,
  file: FileText,
};

interface RSAPageProps {
  onNavigate?: (page: 'home' | 'aes' | 'rsa' | 'hashing' | 'glossary' | 'about') => void;
}

export const RSAPage: React.FC<RSAPageProps> = ({ onNavigate }) => {
  const [steps, setSteps] = useState<RSAStep[]>([]);
  const [keyPair, setKeyPair] = useState<RSAKeyPair | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['whatIsRSA', 'keyGeneration']));

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

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
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-2">
                RSA Encryption Visualizer
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                Explore public-key cryptography step-by-step
              </p>
            </div>
            <button className="btn-secondary text-sm self-end sm:self-auto">
              <BookOpen className="w-4 h-4" />
              Learn More
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Column: Input & Visualization */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <RSAInputPanel onGenerate={handleGenerate} />

        {/* Playback Controls */}
        {steps.length > 0 && (
          <div className="glass-card p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Progress Bar */}
            <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-600 transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center sm:justify-start">
                <button
                  onClick={reset}
                  className="p-2 sm:p-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95"
                >
                  <Key className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
                </button>

                <button
                  onClick={previousStep}
                  disabled={currentStep === 0}
                  aria-label="Previous step"
                  className="p-2 sm:p-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed text-slate-700 dark:text-slate-300"
                >
                  ←
                </button>

                <button
                  onClick={isPlaying ? pause : play}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-purple-600 rounded-2xl text-white font-bold hover:scale-105 active:scale-95 transition-all"
                >
                  {isPlaying ? 'Pause' : 'Play'}
                </button>

                <button
                  onClick={nextStep}
                  disabled={currentStep >= steps.length - 1}
                  aria-label="Next step"
                  className="p-2 sm:p-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed text-slate-700 dark:text-slate-300"
                >
                  →
                </button>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 glass-card px-3 sm:px-4 py-2 sm:py-3">
                <span className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400">Speed</span>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {[0.5, 1, 2, 4].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSpeed(s)}
                      className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-bold transition-all ${speed === s
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center text-sm font-mono text-slate-500 dark:text-slate-400">
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
          </div>

          {/* Right Column: Educational Content */}
          <div className="lg:col-span-1 space-y-4">
            {/* What is RSA? */}
            <EducationalCard
              title={rsaEducationalContent.whatIsRSA.title}
              isExpanded={expandedSections.has('whatIsRSA')}
              onToggle={() => toggleSection('whatIsRSA')}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-500/20 rounded-lg">
                  <Info className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {rsaEducationalContent.whatIsRSA.content}
                </p>
              </div>
            </EducationalCard>

            {/* Key Generation Steps */}
            <EducationalCard
              title={rsaEducationalContent.keyGeneration.title}
              isExpanded={expandedSections.has('keyGeneration')}
              onToggle={() => toggleSection('keyGeneration')}
            >
              <div className="space-y-3">
                {rsaEducationalContent.keyGeneration.steps.map((step, idx) => (
                  <div key={idx} className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                       <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: step.color }}
                      />
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{step.name}</h4>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">{step.description}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 font-mono">{step.detail}</p>
                  </div>
                ))}
              </div>
            </EducationalCard>

            {/* Security Notes */}
            <EducationalCard
              title={rsaEducationalContent.securitySecurity.title}
              isExpanded={expandedSections.has('security')}
              onToggle={() => toggleSection('security')}
            >
              <div className="space-y-2">
                {rsaEducationalContent.securitySecurity.notes.map((note, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    {note.type === 'strength' && <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />}
                    {note.type === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-500 dark:text-yellow-400 flex-shrink-0 mt-0.5" />}
                    {note.type === 'info' && <Info className="w-4 h-4 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-0.5" />}
                    <p className="text-xs text-slate-600 dark:text-slate-300">{note.text}</p>
                  </div>
                ))}
              </div>
            </EducationalCard>

             {/* Real-World Use */}
            <EducationalCard
              title={rsaEducationalContent.realWorldUse.title}
              isExpanded={expandedSections.has('realWorld')}
              onToggle={() => toggleSection('realWorld')}
            >
              <div className="grid grid-cols-1 gap-2">
                {rsaEducationalContent.realWorldUse.examples.map((example, idx) => {
                  const Icon = iconMap[example.icon as keyof typeof iconMap] || Globe;
                  return (
                    <div key={idx} className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl flex items-center gap-3">
                        <div className="p-2 bg-purple-100 dark:bg-purple-500/20 rounded-lg flex-shrink-0">
                          <Icon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-0.5">{example.name}</h4>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">{example.description}</p>
                        </div>
                    </div>
                  );
                })}
              </div>
            </EducationalCard>

            {/* Interactive Quiz */}
            <QuizSystem questions={rsaQuizQuestions} title="RSA Knowledge Check" />
          </div>
        </div>
      </div>
    </Layout>
  );
};
