// Core types for the Encryption Visualizer

export type Algorithm = 'AES' | 'RSA' | 'SHA-256';

export type KeySize = 128 | 192 | 256;

export interface VisualizationStep {
  id: string;
  name: string;
  description: string;
  data: unknown;
  timestamp: number;
}

export interface VisualizationState {
  algorithm: Algorithm;
  isPlaying: boolean;
  currentStep: number;
  totalSteps: number;
  speed: number; // 0.5x to 4x
  steps: VisualizationStep[];
}

export interface AESState {
  plaintext: string;
  key: string;
  keySize: KeySize;
  ciphertext: string;
  stateMatrix: number[][];
  roundKeys: number[][][];
  currentRound: number;
}

// AES Step type
export interface AESStep {
  stepNumber: number;
  type: 'initial' | 'subBytes' | 'shiftRows' | 'mixColumns' | 'addRoundKey' | 'final';
  title: string;
  description: string;
  state: number[][];
  roundKey?: number[][];
  highlightCells?: { row: number; col: number }[];
  round?: number;
}

// RSA Types
export interface RSAStep {
  stepNumber: number;
  type: 'prime-selection' | 'modulus-calculation' | 'phi-calculation' | 'e-selection' | 'd-calculation' | 'encryption' | 'decryption' | 'complete';
  title: string;
  description: string;
  values?: {
    p?: number;
    q?: number;
    n?: number;
    phi?: number;
    e?: number;
    d?: number;
    message?: number;
    encrypted?: number;
    decrypted?: number;
  };
  formula?: string;
  calculation?: string;
}

export interface RSAKeyPair {
  publicKey: {
    n: number;
    e: number;
  };
  privateKey: {
    n: number;
    d: number;
  };
  p: number;
  q: number;
  phi: number;
}

// Hash Types
export interface HashStep {
  stepNumber: number;
  type: 'input' | 'preprocessing' | 'initialization' | 'compression' | 'output';
  title: string;
  description: string;
  data?: {
    input?: string;
    binary?: string;
    padded?: string;
    chunks?: string[];
    hash?: string;
    roundValues?: string[];
  };
}

// Educational Types
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number; // Index of correct option (0-3)
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}
