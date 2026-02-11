import type { QuizQuestion } from '@/lib/types';

export const rsaQuizQuestions: QuizQuestion[] = [
    {
        id: "rsa-basics-1",
        question: "What type of encryption is RSA?",
        options: ["Symmetric", "Asymmetric", "Hashing", "Linear"],
        correct: 1,
        explanation: "RSA is an asymmetric encryption algorithm, meaning it uses two keys: a public key for encryption and a private key for decryption.",
        difficulty: "beginner",
    },
    {
        id: "rsa-keys-1",
        question: "Which key is shared publicly in RSA?",
        options: ["Private Key", "Public Key", "Both Keys", "Neither Key"],
        correct: 1,
        explanation: "The Public Key is shared openly with everyone, allowing them to encrypt messages that only you can decrypt.",
        difficulty: "beginner",
    },
    {
        id: "rsa-math-1",
        question: "RSA security relies on the difficulty of which mathematical problem?",
        options: ["Discrete Logarithm", "Integer Factorization", "Elliptic Curves", "Knapsack Problem"],
        correct: 1,
        explanation: "RSA relies on the difficulty of factoring the product of two large prime numbers.",
        difficulty: "intermediate",
    },
    {
        id: "rsa-math-2",
        question: "What is the relationship between keys e and d?",
        options: [
            "e * d = 1 mod phi(n)",
            "e + d = n",
            "e = d",
            "e * d = 0 mod n",
        ],
        correct: 0,
        explanation: "e and d are modular multiplicative inverses modulo phi(n), meaning e * d ≡ 1 (mod phi(n)).",
        difficulty: "advanced",
    },
    {
        id: "rsa-usage-1",
        question: "Is RSA typically used to encrypt large files directly?",
        options: ["Yes, always", "No, it's too slow", "Yes, it's very fast", "Only for images"],
        correct: 1,
        explanation: "RSA is computationally expensive and slow. It is usually used to encrypt a symmetric key (like an AES key), which then encrypts the actual data.",
        difficulty: "intermediate",
    },
];
