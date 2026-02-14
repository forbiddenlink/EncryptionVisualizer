import { create } from 'zustand';
import type { VisualizationState, Algorithm, AESStep, RSAStep, HashStep } from '@/lib/types';

// Union type for all visualization step types
type VisualizationSteps = AESStep[] | RSAStep[] | HashStep[];

interface VisualizationStore extends Omit<VisualizationState, 'steps'> {
  steps: VisualizationSteps;
  // Actions
  setAlgorithm: (algorithm: Algorithm) => void;
  play: () => void;
  pause: () => void;
  reset: () => void;
  nextStep: () => void;
  previousStep: () => void;
  setSpeed: (speed: number) => void;
  goToStep: (step: number) => void;
  setCurrentStep: (step: number) => void;
  setTotalSteps: (total: number) => void;
  setSteps: (steps: VisualizationSteps) => void;
}

export const useVisualizationStore = create<VisualizationStore>((set) => ({
  // Initial state
  algorithm: 'AES',
  isPlaying: false,
  currentStep: 0,
  totalSteps: 0,
  speed: 1,
  steps: [],

  // Actions
  setAlgorithm: (algorithm) => set({ algorithm, currentStep: 0, steps: [] }),

  play: () => set({ isPlaying: true }),

  pause: () => set({ isPlaying: false }),

  reset: () => set({ currentStep: 0, isPlaying: false }),

  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, state.totalSteps - 1),
    })),

  previousStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 0),
    })),

  setSpeed: (speed) => set({ speed }),

  goToStep: (step) => set({ currentStep: step }),

  setCurrentStep: (step) => set({ currentStep: step }),

  setTotalSteps: (total) => set({ totalSteps: total }),

  setSteps: (steps) => set({ steps, totalSteps: steps.length }),
}));
