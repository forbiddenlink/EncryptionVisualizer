import type { QuizQuestion } from '@/lib/types';

export const hashingQuizQuestions: QuizQuestion[] = [
    {
        id: "hash-basics-1",
        question: "What is a key characteristic of a cryptographic hash function?",
        options: ["Reversible", "One-way usually", "Two-way", "Random output always"],
        correct: 1,
        explanation: "Cryptographic hash functions are one-way: it is computationally infeasible to determine the original input from the hash output.",
        difficulty: "beginner",
    },
    {
        id: "hash-sha256-1",
        question: "What is the output size of SHA-256?",
        options: ["128 bits", "192 bits", "256 bits", "512 bits"],
        correct: 2,
        explanation: "SHA-256 produces a fixed-size output of 256 bits (32 bytes), regardless of the input size.",
        difficulty: "beginner",
    },
    {
        id: "hash-collision-1",
        question: "What is a collision?",
        options: [
            "When two hash functions run at once",
            "When two different inputs produce the same hash",
            "When encryption fails",
            "When the hash is too long",
        ],
        correct: 1,
        explanation: "A collision occurs when two distinct inputs result in the exact same hash output. Good hash functions make this statistically improbable.",
        difficulty: "intermediate",
    },
    {
        id: "hash-avalanche-1",
        question: "What is the avalanche effect?",
        options: [
            "Hashes get larger like a snowball",
            "A small input change causes a massive output change",
            "The hash breaks down",
            "Inputs must be large",
        ],
        correct: 1,
        explanation: "The avalanche effect means that changing just one bit of the input should change approximately 50% of the output bits.",
        difficulty: "intermediate",
    },
    {
        id: "hash-usage-1",
        question: "Which of these is a common use for hashing?",
        options: [
            "Encrypting emails",
            "Storing passwords securely",
            "Compressing files",
            "Speeding up internet",
        ],
        correct: 1,
        explanation: "Hashing is widely used to store passwords securely. The password is hashed, and only the hash is stored, so the original password is never saved in the database.",
        difficulty: "beginner",
    },
];
