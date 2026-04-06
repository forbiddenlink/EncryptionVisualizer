import type { QuizQuestion } from '@/lib/types';

export const diffieHellmanQuizQuestions: QuizQuestion[] = [
  {
    id: "dh-basics-1",
    question: "What is the primary purpose of Diffie-Hellman?",
    options: [
      "Encrypting messages directly",
      "Establishing a shared secret key",
      "Creating digital signatures",
      "Hashing data"
    ],
    correct: 1,
    explanation: "Diffie-Hellman is a key exchange protocol. Its purpose is to allow two parties to establish a shared secret key over an insecure channel, which can then be used for symmetric encryption.",
    difficulty: "beginner",
  },
  {
    id: "dh-basics-2",
    question: "In Diffie-Hellman, which values are publicly shared?",
    options: [
      "Private keys only",
      "Prime p, generator g, and public values A and B",
      "The shared secret",
      "All keys and secrets"
    ],
    correct: 1,
    explanation: "The prime p, generator g, and computed public values A and B are all shared publicly. Only the private keys (a and b) and the final shared secret remain private.",
    difficulty: "beginner",
  },
  {
    id: "dh-math-1",
    question: "What mathematical problem makes Diffie-Hellman secure?",
    options: [
      "Integer Factorization",
      "Discrete Logarithm Problem",
      "Elliptic Curve Problem",
      "Knapsack Problem"
    ],
    correct: 1,
    explanation: "DH security relies on the Discrete Logarithm Problem (DLP). Given g and g^a mod p, it's computationally infeasible to determine a when using large enough primes.",
    difficulty: "intermediate",
  },
  {
    id: "dh-math-2",
    question: "Why do Alice and Bob compute the same shared secret?",
    options: [
      "They use the same private key",
      "Because (g^a)^b = (g^b)^a mod p",
      "The server sends it to both",
      "They exchange secrets directly"
    ],
    correct: 1,
    explanation: "The math works because of the associative property of exponentiation. Alice computes B^a = (g^b)^a = g^(ab) mod p, and Bob computes A^b = (g^a)^b = g^(ab) mod p - both get the same result!",
    difficulty: "intermediate",
  },
  {
    id: "dh-security-1",
    question: "What vulnerability does basic Diffie-Hellman have?",
    options: [
      "Quantum attacks only",
      "Man-in-the-middle attacks",
      "No vulnerabilities",
      "Side-channel attacks only"
    ],
    correct: 1,
    explanation: "Basic DH doesn't authenticate the parties. An attacker could intercept communications and perform separate key exchanges with both parties, relaying messages between them (man-in-the-middle attack).",
    difficulty: "intermediate",
  },
  {
    id: "dh-practical-1",
    question: "What is 'Perfect Forward Secrecy' (PFS) in the context of DH?",
    options: [
      "Using the same key forever",
      "Using ephemeral (single-use) keys for each session",
      "Encrypting keys with RSA",
      "Storing keys securely"
    ],
    correct: 1,
    explanation: "PFS means using new, ephemeral DH keys for each session. Even if a long-term key is compromised later, past session keys remain secure because they were unique and temporary.",
    difficulty: "advanced",
  },
  {
    id: "dh-usage-1",
    question: "Where is Diffie-Hellman commonly used today?",
    options: [
      "Password storage",
      "TLS/HTTPS for secure websites",
      "Email formatting",
      "File compression"
    ],
    correct: 1,
    explanation: "DH (and its elliptic curve variant ECDH) is a fundamental part of TLS, which secures HTTPS connections. It's used to establish session keys with Perfect Forward Secrecy.",
    difficulty: "beginner",
  },
  {
    id: "dh-advanced-1",
    question: "What is ECDH?",
    options: [
      "Extended Cryptographic DH",
      "Elliptic Curve Diffie-Hellman",
      "Encrypted Channel DH",
      "Error-Correcting DH"
    ],
    correct: 1,
    explanation: "ECDH (Elliptic Curve Diffie-Hellman) uses elliptic curve mathematics instead of modular exponentiation. It provides equivalent security with smaller key sizes, making it more efficient.",
    difficulty: "advanced",
  },
];
