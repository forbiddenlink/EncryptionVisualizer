export type AttackType = 'frequency-analysis' | 'brute-force' | 'padding-oracle' | 'timing-attack';

export interface CryptanalysisStep {
  stepNumber: number;
  type: 'setup' | 'analyze' | 'attempt' | 'breakthrough' | 'result';
  attackType: AttackType;
  title: string;
  description: string;
  values?: Record<string, string | number>;
  frequencyData?: { letter: string; count: number; expected: number }[];
  attempts?: { key: string | number; result: string; isCorrect: boolean }[];
  progress?: number; // 0-100
}
