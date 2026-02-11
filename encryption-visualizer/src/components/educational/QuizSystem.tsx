import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Zap } from 'lucide-react';
import { QuizQuestion } from './QuizQuestion';
import { QuizResults } from './QuizResults';
import type { QuizQuestion as QuizQuestionType } from '@/lib/types';

interface QuizSystemProps {
    questions: QuizQuestionType[];
    title?: string;
}

export const QuizSystem: React.FC<QuizSystemProps> = ({
    questions,
    title = "Knowledge Check",
}) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestionType[]>([]);

    const resetQuiz = useCallback(() => {
        // Shuffle logic
        const shuffled = [...questions].sort(() => Math.random() - 0.5).slice(0, 5); // Take random 5 questions
        setShuffledQuestions(shuffled);
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setIsSubmitted(false);
        setScore(0);
        setIsCompleted(false);
    }, [questions]);

    // Shuffle questions on mount or reset
    useEffect(() => {
        resetQuiz();
    }, [resetQuiz]);

    const currentQuestion = shuffledQuestions[currentQuestionIndex];

    const handleSelectOption = (index: number) => {
        setSelectedOption(index);
        setIsSubmitted(true);

        if (index === currentQuestion.correct) {
            setScore((prev) => prev + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < shuffledQuestions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
            setSelectedOption(null);
            setIsSubmitted(false);
        } else {
            setIsCompleted(true);
        }
    };

    if (shuffledQuestions.length === 0) {
        return null;
    }

    return (
        <div className="glass-card overflow-hidden">
            {/* Quiz Header */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500 dark:text-yellow-400" />
                    {title}
                </h3>
                {!isCompleted && (
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                        {currentQuestionIndex + 1} / {shuffledQuestions.length}
                    </span>
                )}
            </div>

            <div className="p-4">
                <AnimatePresence mode="wait">
                    {!isCompleted ? (
                        <motion.div
                            key={currentQuestion.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <QuizQuestion
                                question={currentQuestion}
                                selectedOption={selectedOption}
                                onSelectOption={handleSelectOption}
                                isSubmitted={isSubmitted}
                            />

                            {isSubmitted && (
                                <div className="mt-4 flex justify-end">
                                    <button
                                        onClick={handleNextQuestion}
                                        className="btn-primary"
                                    >
                                        {currentQuestionIndex < shuffledQuestions.length - 1 ? (
                                            <>
                                                Next Question
                                                <ChevronRight className="w-4 h-4 ml-1" />
                                            </>
                                        ) : (
                                            <>
                                                See Results
                                                <Zap className="w-4 h-4 ml-1" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <QuizResults
                            score={score}
                            totalQuestions={shuffledQuestions.length}
                            onRetry={resetQuiz}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
