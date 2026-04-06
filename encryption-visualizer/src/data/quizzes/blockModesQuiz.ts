import type { QuizQuestion } from '@/lib/types';

export const blockModesQuizQuestions: QuizQuestion[] = [
  {
    id: 'block-modes-basics-1',
    question: 'Why do we need block cipher modes?',
    options: [
      'To make encryption faster',
      'To encrypt messages longer than one block',
      'To reduce key size',
      'To replace the encryption algorithm',
    ],
    correct: 1,
    explanation:
      'Block ciphers like AES encrypt fixed-size blocks (128 bits). Modes define how to securely encrypt longer messages by handling multiple blocks.',
    difficulty: 'beginner',
  },
  {
    id: 'ecb-problem-1',
    question: 'What is the main security flaw of ECB mode?',
    options: [
      'It requires an IV',
      'It is too slow',
      'Identical plaintext blocks produce identical ciphertext',
      'It cannot be parallelized',
    ],
    correct: 2,
    explanation:
      'ECB encrypts each block independently with the same key. Identical plaintext blocks produce identical ciphertext, revealing patterns in the data.',
    difficulty: 'beginner',
  },
  {
    id: 'ecb-penguin-1',
    question: 'What does the "ECB Penguin Problem" demonstrate?',
    options: [
      'ECB is faster than other modes',
      'Patterns remain visible in ECB-encrypted images',
      'Penguins are used in cryptography',
      'ECB provides better compression',
    ],
    correct: 1,
    explanation:
      'The ECB Penguin shows that when encrypting an image with ECB mode, the outline and patterns of the original image remain visible because identical pixel blocks encrypt to identical ciphertext.',
    difficulty: 'beginner',
  },
  {
    id: 'cbc-iv-1',
    question: 'What is the IV (Initialization Vector) used for in CBC mode?',
    options: [
      'To encrypt the key',
      'To XOR with the first plaintext block',
      'To authenticate the message',
      'To compress the data',
    ],
    correct: 1,
    explanation:
      "The IV is XORed with the first plaintext block before encryption. This ensures that even identical messages with the same key produce different ciphertexts when using different IVs.",
    difficulty: 'intermediate',
  },
  {
    id: 'cbc-chaining-1',
    question: 'In CBC mode, what does each plaintext block get XORed with?',
    options: [
      'The key',
      'The next plaintext block',
      'The previous ciphertext block (or IV for first block)',
      'A random number',
    ],
    correct: 2,
    explanation:
      'CBC "chains" blocks by XORing each plaintext block with the previous ciphertext block. The first block is XORed with the IV. This hides patterns.',
    difficulty: 'intermediate',
  },
  {
    id: 'gcm-auth-1',
    question: 'What additional feature does GCM mode provide that CBC does not?',
    options: [
      'Faster encryption',
      'Built-in authentication (integrity check)',
      'Smaller ciphertext size',
      'No IV requirement',
    ],
    correct: 1,
    explanation:
      "GCM provides authenticated encryption - it includes an authentication tag that detects any tampering with the ciphertext. CBC alone doesn't verify integrity.",
    difficulty: 'intermediate',
  },
  {
    id: 'gcm-nonce-1',
    question: 'What happens if you reuse a nonce with the same key in GCM mode?',
    options: [
      'Nothing, nonces can be reused',
      'Encryption is slightly slower',
      'Catastrophic security failure - plaintexts can be recovered',
      'The authentication tag becomes longer',
    ],
    correct: 2,
    explanation:
      "Reusing a GCM nonce with the same key is catastrophic. It reveals the XOR of the plaintexts and can allow key recovery. Never reuse nonces!",
    difficulty: 'advanced',
  },
  {
    id: 'parallel-1',
    question: 'Which mode(s) allow parallel encryption of blocks?',
    options: [
      'Only ECB',
      'Only CBC',
      'ECB and GCM (counter mode)',
      'All modes support parallel encryption',
    ],
    correct: 2,
    explanation:
      'ECB encrypts blocks independently, so they can be parallelized. GCM uses counter mode, which also allows parallel encryption. CBC requires sequential encryption due to chaining.',
    difficulty: 'intermediate',
  },
  {
    id: 'iv-secrecy-1',
    question: 'Does the IV (Initialization Vector) need to be kept secret?',
    options: [
      'Yes, it must be as secret as the key',
      'No, it can be public but must be unpredictable/random',
      'Yes, but only for GCM mode',
      'No, it should always be zero',
    ],
    correct: 1,
    explanation:
      "The IV doesn't need to be secret - it's typically transmitted with the ciphertext. However, for CBC it should be unpredictable/random to prevent certain attacks.",
    difficulty: 'advanced',
  },
  {
    id: 'best-practice-1',
    question: 'Which mode is recommended for modern secure applications?',
    options: [
      'ECB for speed',
      'CBC with a fixed IV',
      'GCM (Galois/Counter Mode)',
      'Raw block cipher without any mode',
    ],
    correct: 2,
    explanation:
      "GCM is the modern standard. It provides authenticated encryption (confidentiality + integrity), is fast (parallelizable), and is required for TLS 1.3.",
    difficulty: 'beginner',
  },
];
