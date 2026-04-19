export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'completion' | 'quiz' | 'speed' | 'exploration';
}

export const achievements: Achievement[] = [
  {
    id: 'first-steps',
    title: 'First Steps',
    description: 'Complete your first algorithm',
    icon: 'Footprints',
    category: 'completion',
  },
  {
    id: 'hash-master',
    title: 'Hash Master',
    description: 'Score 100% on the hashing quiz',
    icon: 'Fingerprint',
    category: 'quiz',
  },
  {
    id: 'symmetric-scholar',
    title: 'Symmetric Scholar',
    description: 'Complete AES and Block Modes',
    icon: 'Cpu',
    category: 'completion',
  },
  {
    id: 'asymmetric-expert',
    title: 'Asymmetric Expert',
    description: 'Complete RSA, Diffie-Hellman, and Signatures',
    icon: 'Key',
    category: 'completion',
  },
  {
    id: 'cryptographer',
    title: 'Cryptographer',
    description: 'Complete all algorithms',
    icon: 'Shield',
    category: 'completion',
  },
  {
    id: 'quiz-champion',
    title: 'Quiz Champion',
    description: 'Score 90%+ on all quizzes',
    icon: 'Trophy',
    category: 'quiz',
  },
  {
    id: 'explorer',
    title: 'Explorer',
    description: 'Visit all algorithm pages',
    icon: 'Compass',
    category: 'exploration',
  },
  {
    id: 'speed-demon',
    title: 'Speed Demon',
    description: 'Complete a visualization at 4x speed',
    icon: 'Zap',
    category: 'speed',
  },
];
