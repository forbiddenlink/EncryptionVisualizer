import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { AESInputPanel } from '@/components/visualizations/AES/AESInputPanel';
import { AESVisualizer } from '@/components/visualizations/AES/AESVisualizer';
import { encryptAESWithSteps } from '@/lib/crypto/aes';
import { useVisualizationStore } from '@/store/visualizationStore';
import { aesEducationalContent } from '@/data/aesEducationalContent';
import {
  BookOpen,
  AlertTriangle,
  CheckCircle,
  Info,
  Globe,
  FileText,
  Shield,
  Wifi,
  MessageSquare,
  Database,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizSystem } from '@/components/educational/QuizSystem';
import { aesQuizQuestions } from '@/data/quizzes/aesQuiz';

const iconMap = {
  globe: Globe,
  file: FileText,
  shield: Shield,
  wifi: Wifi,
  message: MessageSquare,
  database: Database,
};

interface AESPageProps {
  onNavigate?: (page: 'home' | 'aes' | 'rsa' | 'hashing' | 'glossary') => void;
}

export const AESPage: React.FC<AESPageProps> = ({ onNavigate }) => {
  const setSteps = useVisualizationStore((state) => state.setSteps);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['whatIsAES', 'fourOperations']));

  const handleEncrypt = (plaintext: string, key: string) => {
    const steps = encryptAESWithSteps(plaintext, key);
    setSteps(steps);
  };

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

  return (
    <Layout onNavigate={onNavigate}>
      <div className="space-y-6 sm:space-y-8">
        {/* Page Header */}
        <div className="glass-card p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-2">
                AES Encryption Visualizer
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
                Explore the Advanced Encryption Standard step-by-step
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
            <AESInputPanel onEncrypt={handleEncrypt} />
            <AESVisualizer />
          </div>

          {/* Right Column: Educational Content */}
          <div className="lg:col-span-1 space-y-4">
            {/* What is AES? */}
            <EducationalCard
              title={aesEducationalContent.whatIsAES.title}
              isExpanded={expandedSections.has('whatIsAES')}
              onToggle={() => toggleSection('whatIsAES')}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-500/20 rounded-lg">
                  <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {aesEducationalContent.whatIsAES.content}
                </p>
              </div>
            </EducationalCard>

            {/* The Four Operations */}
            <EducationalCard
              title={aesEducationalContent.fourOperations.title}
              isExpanded={expandedSections.has('fourOperations')}
              onToggle={() => toggleSection('fourOperations')}
            >
              <div className="space-y-3">
                {aesEducationalContent.fourOperations.operations.map((op, idx) => (
                  <div key={idx} className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: op.color }}
                      />
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{op.name}</h4>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">{op.description}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-500">{op.detail}</p>
                  </div>
                ))}
              </div>
            </EducationalCard>

            {/* Key Sizes */}
            <EducationalCard
              title={aesEducationalContent.keySize.title}
              isExpanded={expandedSections.has('keySizes')}
              onToggle={() => toggleSection('keySizes')}
            >
              <div className="space-y-3">
                {aesEducationalContent.keySize.variants.map((variant, idx) => (
                  <div key={idx} className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-blue-600 dark:text-cyan-400">{variant.bits}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{variant.rounds} rounds</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mb-1">{variant.description}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{variant.usage}</p>
                  </div>
                ))}
              </div>
            </EducationalCard>

            {/* Security Notes */}
            <EducationalCard
              title={aesEducationalContent.securityNotes.title}
              isExpanded={expandedSections.has('security')}
              onToggle={() => toggleSection('security')}
            >
              <div className="space-y-2">
                {aesEducationalContent.securityNotes.notes.map((note, idx) => (
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
              title={aesEducationalContent.realWorldUse.title}
              isExpanded={expandedSections.has('realWorld')}
              onToggle={() => toggleSection('realWorld')}
            >
              <div className="grid grid-cols-2 gap-2">
                {aesEducationalContent.realWorldUse.examples.map((example, idx) => {
                  const Icon = iconMap[example.icon as keyof typeof iconMap] || Globe;
                  return (
                    <div key={idx} className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl text-center">
                      <div className="flex justify-center mb-2">
                        <div className="p-2 bg-blue-100 dark:bg-cyan-500/20 rounded-lg">
                          <Icon className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                        </div>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1">{example.name}</h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">{example.description}</p>
                    </div>
                  );
                })}

              </div>
            </EducationalCard>

            {/* Interactive Quiz */}
            <QuizSystem questions={aesQuizQuestions} title="AES Knowledge Check" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Educational Card Component
interface EducationalCardProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const EducationalCard: React.FC<EducationalCardProps> = ({
  title,
  isExpanded,
  onToggle,
  children,
}) => {
  return (
    <div className="glass-card overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
      >
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-blue-500 dark:bg-cyan-400 rounded-full" />
          {title}
        </h3>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-slate-400 dark:text-slate-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400 dark:text-slate-500" />
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 border-t border-slate-200 dark:border-slate-700">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
