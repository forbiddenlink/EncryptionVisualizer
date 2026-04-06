// Schema.org structured data definitions for SEO

export const websiteSchema = {
  name: 'CryptoViz - Interactive Cryptography Visualizer',
  description: 'Learn cryptography through interactive visualizations. Explore AES, RSA, hash functions, and digital signatures step-by-step.',
  url: 'https://cryptoviz.app',
};

export const algorithmSchemas = {
  aes: {
    name: 'AES Encryption Visualizer - Learn Advanced Encryption Standard',
    description: 'Interactive visualization of AES encryption. Watch SubBytes, ShiftRows, MixColumns, and AddRoundKey transform your data step-by-step.',
    learningResourceType: 'Interactive simulation',
    keywords: ['AES', 'Advanced Encryption Standard', 'symmetric encryption', 'block cipher', 'SubBytes', 'ShiftRows', 'MixColumns', 'AddRoundKey'],
  },
  rsa: {
    name: 'RSA Encryption Visualizer - Learn Public Key Cryptography',
    description: 'Interactive visualization of RSA encryption. See how prime numbers create the mathematical foundation for secure communication.',
    learningResourceType: 'Interactive simulation',
    keywords: ['RSA', 'public key cryptography', 'asymmetric encryption', 'prime numbers', 'modular arithmetic'],
  },
  hashing: {
    name: 'Hash Functions Visualizer - Learn SHA-256 and Avalanche Effect',
    description: 'Interactive visualization of cryptographic hash functions. Experience the avalanche effect and understand why hashes are one-way.',
    learningResourceType: 'Interactive simulation',
    keywords: ['hash function', 'SHA-256', 'cryptographic hash', 'avalanche effect', 'one-way function', 'message digest'],
  },
  signatures: {
    name: 'Digital Signatures Visualizer - Learn Authentication and Integrity',
    description: 'Interactive visualization of digital signatures. See how cryptographic signatures prove authenticity and detect tampering.',
    learningResourceType: 'Interactive simulation',
    keywords: ['digital signature', 'authentication', 'integrity', 'non-repudiation', 'RSA signature'],
  },
};

export const glossaryFAQItems = [
  {
    question: 'What is AES encryption?',
    answer: 'AES (Advanced Encryption Standard) is a symmetric block cipher that encrypts data in fixed-size blocks of 128 bits. It uses key sizes of 128, 192, or 256 bits and is the most widely used encryption algorithm worldwide.',
  },
  {
    question: 'What is RSA encryption?',
    answer: 'RSA is a public-key cryptosystem used for secure data transmission. It uses a pair of keys: a public key for encryption and a private key for decryption, based on the mathematical difficulty of factoring large prime numbers.',
  },
  {
    question: 'What is a hash function?',
    answer: 'A cryptographic hash function is a one-way function that converts input data of any size into a fixed-size output (hash). It is deterministic, fast to compute, and practically impossible to reverse.',
  },
  {
    question: 'What is the avalanche effect?',
    answer: 'The avalanche effect is a property of cryptographic functions where a small change in input (even one bit) causes a significant change in the output, making patterns impossible to detect.',
  },
  {
    question: 'What is a digital signature?',
    answer: 'A digital signature is a cryptographic mechanism that proves the authenticity of a message or document. It uses the sender\'s private key to sign and their public key to verify, ensuring both authenticity and integrity.',
  },
];
