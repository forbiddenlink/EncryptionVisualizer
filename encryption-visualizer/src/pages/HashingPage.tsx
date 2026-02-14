import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { HashInputPanel } from '@/components/visualizations/Hash/HashInputPanel';
import { HashVisualizer } from '@/components/visualizations/Hash/HashVisualizer';
import { AvalancheEffectDemo } from '@/components/visualizations/Hash/AvalancheEffectDemo';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { hashWithSteps, type HashStep } from '@/lib/crypto/hash';
import { BookOpen } from 'lucide-react';
import { QuizSystem } from '@/components/educational/QuizSystem';
import { hashingQuizQuestions } from '@/data/quizzes/hashingQuiz';
import { EducationalCard } from '@/components/educational/EducationalCard';
import { hashingEducationalContent } from '@/data/hashingEducationalContent';
import { Info, Link, Lock, FileText, Globe } from 'lucide-react';

const iconMap = {
  info: Info,
  lock: Lock,
  file: FileText,
  link: Link,
};

interface HashingPageProps {
  onNavigate?: (page: 'home' | 'aes' | 'rsa' | 'hashing' | 'glossary' | 'about') => void;
}

export const HashingPage: React.FC<HashingPageProps> = ({ onNavigate }) => {
  const [steps, setSteps] = useState<HashStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['whatIsHashing', 'properties']));

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
              <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                Hash Functions Visualizer
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Explore one-way functions and the avalanche effect
              </p>
            </div>
            <button className="btn-secondary text-sm">
              <BookOpen className="w-4 h-4" />
              Learn More
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
           {/* Left Column: Input & Visualization */}
           <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Input Panel */}
            <HashInputPanel onHash={handleHash} />

        {/* Playback Controls */}
        {steps.length > 0 && (
          <div className="glass-card p-6 space-y-4">
            <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentStep(0)}
                  aria-label="Go to first step"
                  className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl transition-all"
                >
                  ⏮️
                </button>
                <button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  aria-label="Previous step"
                  className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl transition-all disabled:opacity-30"
                >
                  ◀️
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label={isPlaying ? 'Pause visualization' : 'Play visualization'}
                  className="px-8 py-3 bg-emerald-600 rounded-2xl text-white font-bold hover:scale-105 transition-all"
                >
                  {isPlaying ? '⏸️ Pause' : '▶️ Play'}
                </button>
                <button
                  onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                  disabled={currentStep >= steps.length - 1}
                  aria-label="Next step"
                  className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl transition-all disabled:opacity-30"
                >
                  ▶️
                </button>
              </div>

              <div className="text-sm font-mono text-slate-500 dark:text-slate-400">
                Step {currentStep + 1} / {steps.length}
              </div>
            </div>
          </div>
        )}

        {/* Visualizer */}
        <ErrorBoundary>
          <HashVisualizer steps={steps} currentStep={currentStep} />
        </ErrorBoundary>

            {/* Avalanche Effect Demo */}
            <AvalancheEffectDemo />
          </div>

          {/* Right Column: Educational Content */}
          <div className="lg:col-span-1 space-y-4">
            {/* What is Hashing? */}
            <EducationalCard
              title={hashingEducationalContent.whatIsHashing.title}
              isExpanded={expandedSections.has('whatIsHashing')}
              onToggle={() => toggleSection('whatIsHashing')}
            >
               <div className="flex items-start gap-3">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-500/20 rounded-lg">
                  <Info className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {hashingEducationalContent.whatIsHashing.content}
                </p>
              </div>
            </EducationalCard>

            {/* Properties */}
            <EducationalCard
               title={hashingEducationalContent.properties.title}
               isExpanded={expandedSections.has('properties')}
               onToggle={() => toggleSection('properties')}
            >
              <div className="space-y-3">
                {hashingEducationalContent.properties.items.map((item, idx) => (
                  <div key={idx} className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                       <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{item.name}</h4>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">{item.description}</p>
                  </div>
                ))}
              </div>
            </EducationalCard>

            {/* Algorithms */}
            <EducationalCard
               title={hashingEducationalContent.algorithms.title}
               isExpanded={expandedSections.has('algorithms')}
               onToggle={() => toggleSection('algorithms')}
            >
                <div className="space-y-3">
                {hashingEducationalContent.algorithms.list.map((item, idx) => (
                  <div key={idx} className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{item.name}</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{item.detail}</p>
                  </div>
                ))}
              </div>
            </EducationalCard>

            {/* Real World Use */}
             <EducationalCard
              title={hashingEducationalContent.realWorldUse.title}
              isExpanded={expandedSections.has('realWorld')}
              onToggle={() => toggleSection('realWorld')}
            >
              <div className="grid grid-cols-1 gap-2">
                {hashingEducationalContent.realWorldUse.examples.map((example, idx) => {
                  const Icon = iconMap[example.icon as keyof typeof iconMap] || Globe;
                  return (
                    <div key={idx} className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 dark:bg-emerald-500/20 rounded-lg flex-shrink-0">
                          <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
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
            <QuizSystem questions={hashingQuizQuestions} title="Hashing Knowledge Check" />
          </div>
        </div>
      </div>
    </Layout>
  );
};
