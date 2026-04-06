import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface QuizScore {
  score: number;
  total: number;
  completedAt: number;
}

interface ProgressStore {
  completedAlgorithms: string[];
  quizScores: Record<string, QuizScore>;

  markAlgorithmComplete: (algorithm: string) => void;
  saveQuizScore: (algorithm: string, score: number, total: number) => void;
  isAlgorithmComplete: (algorithm: string) => boolean;
  getQuizScore: (algorithm: string) => QuizScore | null;
  getCompletionPercentage: () => number;
  resetProgress: () => void;
}

const ALL_ALGORITHMS = ['aes', 'rsa', 'hashing', 'signatures'];

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      completedAlgorithms: [],
      quizScores: {},

      markAlgorithmComplete: (algorithm: string) => {
        set((state) => {
          if (state.completedAlgorithms.includes(algorithm)) {
            return state;
          }
          return {
            completedAlgorithms: [...state.completedAlgorithms, algorithm],
          };
        });
      },

      saveQuizScore: (algorithm: string, score: number, total: number) => {
        set((state) => ({
          quizScores: {
            ...state.quizScores,
            [algorithm]: {
              score,
              total,
              completedAt: Date.now(),
            },
          },
        }));
        // Also mark algorithm as complete if quiz is passed (>= 70%)
        if (score / total >= 0.7) {
          get().markAlgorithmComplete(algorithm);
        }
      },

      isAlgorithmComplete: (algorithm: string) => {
        return get().completedAlgorithms.includes(algorithm);
      },

      getQuizScore: (algorithm: string) => {
        return get().quizScores[algorithm] || null;
      },

      getCompletionPercentage: () => {
        const completed = get().completedAlgorithms.length;
        return Math.round((completed / ALL_ALGORITHMS.length) * 100);
      },

      resetProgress: () => {
        set({
          completedAlgorithms: [],
          quizScores: {},
        });
      },
    }),
    {
      name: 'cryptoviz-progress',
    }
  )
);
