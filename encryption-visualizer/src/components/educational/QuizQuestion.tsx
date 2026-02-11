import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import type { QuizQuestion as QuizQuestionType } from '@/lib/types';

interface QuizQuestionProps {
    question: QuizQuestionType;
    selectedOption: number | null;
    onSelectOption: (index: number) => void;
    isSubmitted: boolean;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
    question,
    selectedOption,
    onSelectOption,
    isSubmitted,
}) => {
    return (
        <div className="space-y-4">
            <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-500/20 rounded-lg flex-shrink-0">
                    <HelpCircle className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white">{question.question}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${question.difficulty === 'beginner' ? 'border-green-500/30 text-green-400 bg-green-500/10' :
                            question.difficulty === 'intermediate' ? 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10' :
                                'border-red-500/30 text-red-400 bg-red-500/10'
                        }`}>
                        {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                    </span>
                </div>
            </div>

            <div className="space-y-2 pl-0 sm:pl-2">
                {question.options.map((option, index) => {
                    const isSelected = selectedOption === index;
                    const isCorrect = index === question.correct;
                    const showResult = isSubmitted;

                    let borderColor = 'border-white/10';
                    let bgColor = 'bg-white/5';
                    let textColor = 'text-white/70';

                    if (showResult) {
                        if (isCorrect) {
                            borderColor = 'border-green-500';
                            bgColor = 'bg-green-500/20';
                            textColor = 'text-green-300';
                        } else if (isSelected && !isCorrect) {
                            borderColor = 'border-red-500';
                            bgColor = 'bg-red-500/20';
                            textColor = 'text-red-300';
                        } else {
                            bgColor = 'bg-white/[0.02]';
                            textColor = 'text-white/30';
                        }
                    } else if (isSelected) {
                        borderColor = 'border-purple-500';
                        bgColor = 'bg-purple-500/20';
                        textColor = 'text-purple-300';
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => !isSubmitted && onSelectOption(index)}
                            disabled={isSubmitted}
                            className={`w-full text-left p-3 rounded-xl border ${borderColor} ${bgColor} transition-all duration-200 flex items-center justify-between group ${!isSubmitted ? 'hover:bg-white/10' : ''}`}
                        >
                            <span className={`text-sm ${textColor} font-medium`}>{option}</span>
                            {showResult && isCorrect && (
                                <CheckCircle className="w-5 h-5 text-green-400" />
                            )}
                            {showResult && isSelected && !isCorrect && (
                                <XCircle className="w-5 h-5 text-red-400" />
                            )}
                        </button>
                    );
                })}
            </div>

            {isSubmitted && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className={`p-3 rounded-xl border ${selectedOption === question.correct ? 'border-green-500/30 bg-green-500/10' : 'border-red-500/30 bg-red-500/10'
                        }`}
                >
                    <div className="flex items-start gap-2">
                        <div className="mt-0.5">
                            {selectedOption === question.correct ? (
                                <CheckCircle className="w-4 h-4 text-green-400" />
                            ) : (
                                <XCircle className="w-4 h-4 text-red-400" />
                            )}
                        </div>
                        <div>
                            <p className={`text-sm font-bold ${selectedOption === question.correct ? 'text-green-400' : 'text-red-400'
                                } mb-1`}>
                                {selectedOption === question.correct ? 'Correct!' : 'Incorrect'}
                            </p>
                            <p className="text-xs text-white/70 leading-relaxed">
                                {question.explanation}
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};
