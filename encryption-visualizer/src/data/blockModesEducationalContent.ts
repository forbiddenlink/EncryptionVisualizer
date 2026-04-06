export const blockModesEducationalContent = {
  whatAreBlockModes: {
    title: 'What are Block Cipher Modes?',
    content: `Block ciphers like AES encrypt fixed-size blocks (128 bits). But real messages are longer! Block cipher modes define HOW to encrypt multiple blocks securely. The wrong mode can leak information even with strong encryption.`,
    icon: 'info',
  },

  ecbMode: {
    title: 'ECB (Electronic Codebook)',
    description: 'The simplest mode - each block encrypted independently.',
    features: [
      {
        name: 'Independent Blocks',
        detail: 'Each plaintext block is encrypted separately with the same key.',
        type: 'info',
      },
      {
        name: 'Parallelizable',
        detail: 'Blocks can be encrypted/decrypted in parallel - very fast!',
        type: 'strength',
      },
      {
        name: 'Pattern Leakage',
        detail: 'CRITICAL FLAW: Identical plaintext blocks produce identical ciphertext.',
        type: 'danger',
      },
      {
        name: 'No IV Required',
        detail: 'Simpler implementation, but less secure.',
        type: 'info',
      },
    ],
  },

  cbcMode: {
    title: 'CBC (Cipher Block Chaining)',
    description: 'Each block XORed with previous ciphertext before encryption.',
    features: [
      {
        name: 'Chained Blocks',
        detail: 'Each block depends on all previous blocks - changes propagate forward.',
        type: 'info',
      },
      {
        name: 'IV Required',
        detail: 'Random Initialization Vector (IV) for first block XOR. IV can be public.',
        type: 'info',
      },
      {
        name: 'Pattern Hidden',
        detail: 'Identical plaintext blocks produce DIFFERENT ciphertext. Much safer!',
        type: 'strength',
      },
      {
        name: 'Sequential',
        detail: 'Encryption must be sequential (each block needs previous). Decryption can parallelize.',
        type: 'warning',
      },
    ],
  },

  gcmMode: {
    title: 'GCM (Galois/Counter Mode)',
    description: 'Modern authenticated encryption with parallelization.',
    features: [
      {
        name: 'Counter Mode',
        detail: 'Encrypts a counter, XORs result with plaintext. Fully parallelizable!',
        type: 'strength',
      },
      {
        name: 'Authentication',
        detail: 'Built-in integrity check (auth tag). Detects ANY tampering!',
        type: 'strength',
      },
      {
        name: 'Nonce Required',
        detail: '96-bit nonce (number used once). NEVER reuse with same key!',
        type: 'warning',
      },
      {
        name: 'Industry Standard',
        detail: 'Recommended for TLS 1.3, widely used in modern protocols.',
        type: 'strength',
      },
    ],
  },

  ecbPenguinProblem: {
    title: 'The ECB Penguin Problem',
    description: 'A famous demonstration of why ECB mode is dangerous.',
    explanation: `When you encrypt an image with ECB mode, the pattern of the original image remains visible! This is because identical pixel blocks (like the penguin's white belly) encrypt to identical ciphertext blocks.

This is called the "ECB Penguin" because it was famously demonstrated with a Linux penguin image. The outline remains visible even after encryption!`,
    lessons: [
      'ECB reveals patterns in structured data (images, database records)',
      'CBC and GCM hide patterns by using IV/nonce and chaining',
      'Never use ECB for anything except single-block encryption',
      'The "penguin problem" applies to ANY repeated data, not just images',
    ],
  },

  modeComparison: {
    title: 'Mode Comparison',
    modes: [
      {
        name: 'ECB',
        parallel: true,
        authenticated: false,
        patternSafe: false,
        useCase: 'Almost never - only for single blocks or key wrapping',
      },
      {
        name: 'CBC',
        parallel: false,
        authenticated: false,
        patternSafe: true,
        useCase: 'Legacy systems, file encryption (with MAC)',
      },
      {
        name: 'GCM',
        parallel: true,
        authenticated: true,
        patternSafe: true,
        useCase: 'TLS, disk encryption, modern protocols',
      },
    ],
  },

  securityNotes: {
    title: 'Security Considerations',
    notes: [
      {
        type: 'danger',
        text: 'NEVER use ECB mode for encrypting more than one block of data.',
      },
      {
        type: 'warning',
        text: 'CBC without authentication is vulnerable to padding oracle attacks.',
      },
      {
        type: 'strength',
        text: 'GCM provides both confidentiality AND integrity in one operation.',
      },
      {
        type: 'warning',
        text: 'GCM nonce reuse is catastrophic - reveals XOR of plaintexts!',
      },
      {
        type: 'info',
        text: 'For disk encryption, XTS mode is often preferred over GCM.',
      },
    ],
  },

  realWorldUse: {
    title: 'Real-World Applications',
    examples: [
      {
        name: 'HTTPS (TLS 1.3)',
        mode: 'GCM',
        description: 'AES-GCM is mandatory for TLS 1.3, securing all modern web traffic.',
        icon: 'globe',
      },
      {
        name: 'File Encryption',
        mode: 'CBC/GCM',
        description: 'Tools like VeraCrypt, BitLocker use various modes for disk/file encryption.',
        icon: 'file',
      },
      {
        name: 'VPN Protocols',
        mode: 'GCM',
        description: 'WireGuard, OpenVPN (modern config) use authenticated encryption.',
        icon: 'shield',
      },
      {
        name: 'Database Encryption',
        mode: 'CBC/GCM',
        description: 'Transparent Data Encryption (TDE) protects data at rest.',
        icon: 'database',
      },
    ],
  },

  commonMistakes: {
    title: 'Common Mistakes to Avoid',
    mistakes: [
      {
        mistake: 'Using ECB mode',
        why: 'Patterns in plaintext leak through to ciphertext',
        solution: 'Use GCM for authenticated encryption, or CBC with HMAC',
      },
      {
        mistake: 'Reusing IV/nonce',
        why: 'CBC: reveals XOR of plaintexts. GCM: catastrophic key recovery possible.',
        solution: 'Generate random IV for CBC, use counter or random nonce for GCM',
      },
      {
        mistake: 'CBC without authentication',
        why: 'Vulnerable to padding oracle attacks (BEAST, POODLE)',
        solution: 'Use GCM, or add HMAC (encrypt-then-MAC)',
      },
      {
        mistake: 'Storing IV as secret',
        why: 'IV can be public - security comes from randomness, not secrecy',
        solution: 'Store/transmit IV with ciphertext, focus on key security',
      },
    ],
  },

  furtherLearning: {
    title: 'Want to Learn More?',
    resources: [
      {
        type: 'Visual Demo',
        name: 'ECB Penguin Wikipedia',
        description: 'See the famous penguin encryption demonstration',
        url: 'https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#ECB',
      },
      {
        type: 'Official Standard',
        name: 'NIST SP 800-38D',
        description: 'GCM specification from NIST',
        url: 'https://csrc.nist.gov/publications/detail/sp/800-38d/final',
      },
      {
        type: 'Security Research',
        name: 'Cryptopals Challenges',
        description: 'Hands-on crypto challenges including CBC attacks',
        url: 'https://cryptopals.com/',
      },
      {
        type: 'Book',
        name: 'Serious Cryptography',
        description: 'Chapter 4 covers block cipher modes in depth',
        url: 'https://nostarch.com/seriouscrypto',
      },
    ],
  },
};
