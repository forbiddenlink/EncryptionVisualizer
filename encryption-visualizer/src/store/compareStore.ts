import { create } from 'zustand';

export type ComparableAlgorithm = 'aes' | 'rsa' | 'hashing' | 'signatures' | 'diffie-hellman' | 'block-modes';

interface CompareStore {
  leftAlgorithm: ComparableAlgorithm;
  rightAlgorithm: ComparableAlgorithm;
  syncPlayback: boolean;
  setLeftAlgorithm: (algorithm: ComparableAlgorithm) => void;
  setRightAlgorithm: (algorithm: ComparableAlgorithm) => void;
  toggleSyncPlayback: () => void;
}

export const useCompareStore = create<CompareStore>((set) => ({
  leftAlgorithm: 'aes',
  rightAlgorithm: 'rsa',
  syncPlayback: true,
  setLeftAlgorithm: (algorithm) => set({ leftAlgorithm: algorithm }),
  setRightAlgorithm: (algorithm) => set({ rightAlgorithm: algorithm }),
  toggleSyncPlayback: () => set((state) => ({ syncPlayback: !state.syncPlayback })),
}));
