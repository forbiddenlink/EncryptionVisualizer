import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AccessibilityStore {
  // null = follow system preference, true/false = explicit override
  reduceMotion: boolean | null;
  setReduceMotion: (value: boolean | null) => void;
}

export const useAccessibilityStore = create<AccessibilityStore>()(
  persist(
    (set) => ({
      reduceMotion: null,
      setReduceMotion: (value) => set({ reduceMotion: value }),
    }),
    {
      name: 'cryptoviz-accessibility',
    }
  )
);
