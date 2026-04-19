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
  sectionProgress: Record<string, Record<string, boolean>>;
  missedQuestions: Record<string, string[]>;
  pathProgress: Record<string, string[]>;
  achievements: string[];

  markAlgorithmComplete: (algorithm: string) => void;
  saveQuizScore: (algorithm: string, score: number, total: number) => void;
  isAlgorithmComplete: (algorithm: string) => boolean;
  getQuizScore: (algorithm: string) => QuizScore | null;
  getCompletionPercentage: () => number;
  resetProgress: () => void;

  markSectionViewed: (algorithm: string, sectionId: string) => void;
  getSectionProgress: (algorithm: string) => number;

  addMissedQuestion: (algorithm: string, questionId: string) => void;
  removeMissedQuestion: (algorithm: string, questionId: string) => void;
  getMissedQuestions: (algorithm: string) => string[];

  completeModule: (pathId: string, moduleId: string) => void;
  addAchievement: (achievementId: string) => void;
}

const ALL_ALGORITHMS = ['aes', 'rsa', 'hashing', 'signatures'];

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      completedAlgorithms: [],
      quizScores: {},
      sectionProgress: {},
      missedQuestions: {},
      pathProgress: {},
      achievements: [],

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
        return get().quizScores[algorithm] ?? null;
      },

      getCompletionPercentage: () => {
        const completed = get().completedAlgorithms.length;
        return Math.round((completed / ALL_ALGORITHMS.length) * 100);
      },

      resetProgress: () => {
        set({
          completedAlgorithms: [],
          quizScores: {},
          sectionProgress: {},
          missedQuestions: {},
          pathProgress: {},
          achievements: [],
        });
      },

      markSectionViewed: (algorithm: string, sectionId: string) => {
        set((state) => {
          const existing = state.sectionProgress[algorithm] ?? {};
          if (existing[sectionId]) return state;
          return {
            sectionProgress: {
              ...state.sectionProgress,
              [algorithm]: {
                ...existing,
                [sectionId]: true,
              },
            },
          };
        });
      },

      getSectionProgress: (algorithm: string) => {
        const sections = get().sectionProgress[algorithm];
        if (!sections) return 0;
        const viewed = Object.values(sections).filter(Boolean).length;
        // Return the count; the page knows the total and computes percentage
        return viewed;
      },

      addMissedQuestion: (algorithm: string, questionId: string) => {
        set((state) => {
          const existing = state.missedQuestions[algorithm] ?? [];
          if (existing.includes(questionId)) return state;
          return {
            missedQuestions: {
              ...state.missedQuestions,
              [algorithm]: [...existing, questionId],
            },
          };
        });
      },

      removeMissedQuestion: (algorithm: string, questionId: string) => {
        set((state) => {
          const existing = state.missedQuestions[algorithm] ?? [];
          if (!existing.includes(questionId)) return state;
          return {
            missedQuestions: {
              ...state.missedQuestions,
              [algorithm]: existing.filter((id) => id !== questionId),
            },
          };
        });
      },

      getMissedQuestions: (algorithm: string) => {
        return get().missedQuestions[algorithm] ?? [];
      },

      completeModule: (pathId: string, moduleId: string) => {
        set((state) => {
          const existing = state.pathProgress[pathId] ?? [];
          if (existing.includes(moduleId)) return state;
          return {
            pathProgress: {
              ...state.pathProgress,
              [pathId]: [...existing, moduleId],
            },
          };
        });
      },

      addAchievement: (achievementId: string) => {
        set((state) => {
          if (state.achievements.includes(achievementId)) return state;
          return { achievements: [...state.achievements, achievementId] };
        });
      },
    }),
    {
      name: 'cryptoviz-progress',
    }
  )
);
