import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, RotateCcw, Award } from 'lucide-react';

interface QuizResultsProps {
    score: number;
    totalQuestions: number;
    onRetry: () => void;
}

export const QuizResults: React.FC<QuizResultsProps> = ({
    score,
    totalQuestions,
    onRetry,
}) => {
    const percentage = Math.round((score / totalQuestions) * 100);

    let message = "";
    let color = "";

    if (percentage >= 80) {
        message = "Outstanding! You're a cryptography master!";
        color = "text-yellow-400";
    } else if (percentage >= 60) {
        message = "Great job! You have a solid understanding.";
        color = "text-green-400";
    } else {
        message = "Keep practicing! Review the educational content and try again.";
        color = "text-blue-400";
    }

    return (
        <div className="text-center space-y-6 py-6">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="inline-block"
            >
                <div className="w-24 h-24 rounded-full bg-yellow-100 dark:bg-yellow-500/20 flex items-center justify-center border-4 border-yellow-500/30 mb-4 mx-auto">
                    <Trophy className="w-12 h-12 text-yellow-500 dark:text-yellow-400" />
                </div>
            </motion.div>

            <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">Quiz Complete!</h3>
                <p className={`text-sm ${color} font-medium`}>{message}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
                <div className="glass-card p-3 rounded-xl bg-green-100 dark:bg-green-500/10 border-green-500/20">
                    <div className="text-2xl font-black text-green-600 dark:text-green-400">{score}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Correct</div>
                </div>
                <div className="glass-card p-3 rounded-xl bg-blue-100 dark:bg-blue-500/10 border-blue-500/20">
                    <div className="text-2xl font-black text-blue-600 dark:text-blue-400">{totalQuestions}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Total</div>
                </div>
            </div>

            <div className="pt-4">
                <button
                    onClick={onRetry}
                    className="btn-primary w-full justify-center"
                >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Try Again
                </button>
            </div>

            {percentage === 100 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="glass-card p-3 rounded-xl border-yellow-500/30 bg-yellow-100 dark:bg-yellow-500/5 mt-4 flex items-center justify-center gap-3"
                >
                    <Award className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
                    <span className="text-sm text-yellow-700 dark:text-yellow-200">Perfect Score Achievement Unlocked!</span>
                </motion.div>
            )}
        </div>
    );
};
