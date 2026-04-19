export const cryptanalysisEducationalContent = {
  whatIsCryptanalysis: {
    title: 'What is Cryptanalysis?',
    content: `Cryptanalysis is the study of breaking cryptographic systems. Unlike brute force, cryptanalysis looks for mathematical weaknesses, implementation flaws, or side-channel leaks. Understanding attacks is essential for building secure systems -- you can't defend against what you don't understand.`,
    icon: 'info',
  },

  classicalCiphers: {
    title: 'Classical Ciphers',
    description: 'Historical encryption methods that laid the foundation for modern cryptography.',
    ciphers: [
      {
        name: 'Caesar Cipher',
        description: 'Shifts each letter by a fixed number. Only 26 possible keys. Trivially broken by brute force or frequency analysis.',
        strength: 'weak',
        keySpace: '26',
      },
      {
        name: 'Substitution Cipher',
        description: 'Each letter maps to a different letter. 26! possible keys (~4 x 10^26), but frequency analysis still works because letter frequencies are preserved.',
        strength: 'weak',
        keySpace: '26! (~4 x 10^26)',
      },
      {
        name: 'Vigenere Cipher',
        description: 'Uses a keyword to shift each letter by a different amount. Resisted frequency analysis for centuries until Kasiski examination was discovered in 1863.',
        strength: 'moderate',
        keySpace: '26^n (n = key length)',
      },
    ],
  },

  frequencyAnalysis: {
    title: 'Frequency Analysis',
    description: 'The oldest and most elegant cryptanalytic technique.',
    explanation: `In any language, certain letters appear more often than others. In English, E appears ~12.7% of the time, T ~9.1%, and A ~8.2%. A Caesar or simple substitution cipher preserves these frequencies -- it just shifts them. By counting letter frequencies in the ciphertext and comparing to expected English frequencies, we can determine the key.`,
    steps: [
      'Count the frequency of each letter in the ciphertext',
      'Compare the distribution to expected English letter frequencies',
      'The most common ciphertext letter likely maps to E',
      'Use chi-squared analysis to rank all possible shifts',
      'Verify by checking if the decrypted text is readable English',
    ],
    whyItWorks: 'Monoalphabetic substitution ciphers are frequency-preserving. The statistical fingerprint of the language survives encryption.',
  },

  bruteForceAttacks: {
    title: 'Brute Force Attacks',
    description: 'The math of key space and why key length matters.',
    explanation: `A brute force attack tries every possible key until finding the correct one. The security of this approach depends entirely on the key space size. Adding one bit to the key doubles the time required.`,
    comparisons: [
      {
        algorithm: 'Caesar Cipher',
        keyBits: 5,
        timeToBreak: '< 1 microsecond',
        verdict: 'Instant -- never use',
      },
      {
        algorithm: 'DES',
        keyBits: 56,
        timeToBreak: '~1 day (specialized hardware)',
        verdict: 'Broken -- deprecated since 1999',
      },
      {
        algorithm: 'AES-128',
        keyBits: 128,
        timeToBreak: '~10^18 years (all computers on Earth)',
        verdict: 'Secure for most applications',
      },
      {
        algorithm: 'AES-256',
        keyBits: 256,
        timeToBreak: '~10^50 years',
        verdict: 'Quantum-resistant, top-secret classified data',
      },
    ],
  },

  sideChannelAttacks: {
    title: 'Side-Channel Attacks',
    description: 'Attacking the implementation, not the algorithm.',
    attacks: [
      {
        name: 'Timing Attack',
        description: 'Measures how long operations take. Naive string comparison leaks information byte-by-byte through timing differences.',
        defense: 'Use constant-time comparison functions',
        severity: 'high',
      },
      {
        name: 'Power Analysis',
        description: 'Monitors power consumption of a device during encryption. Different operations consume different amounts of power, revealing secret key bits.',
        defense: 'Power-balanced implementations, noise injection',
        severity: 'high',
      },
      {
        name: 'Padding Oracle',
        description: 'Exploits servers that reveal whether ciphertext has valid padding. Allows full plaintext recovery from CBC-encrypted data without the key.',
        defense: 'Use authenticated encryption (GCM), or encrypt-then-MAC',
        severity: 'critical',
      },
      {
        name: 'Cache Timing',
        description: 'Exploits CPU cache behavior. Memory access patterns during table lookups in AES can leak key information.',
        defense: 'AES-NI hardware instructions, constant-time implementations',
        severity: 'high',
      },
    ],
  },

  whyModernCiphersAreSecure: {
    title: 'Why Modern Ciphers Are Secure',
    points: [
      {
        title: 'Large Key Space',
        detail: 'AES-256 has 2^256 possible keys. Even checking a trillion keys per second, brute force would take longer than the lifetime of the universe.',
      },
      {
        title: 'Confusion & Diffusion',
        detail: 'Claude Shannon\'s principles: confusion makes the relationship between key and ciphertext complex; diffusion spreads plaintext influence across the entire ciphertext.',
      },
      {
        title: 'Avalanche Effect',
        detail: 'Changing a single bit of input changes ~50% of output bits. This prevents pattern analysis and makes differential cryptanalysis extremely difficult.',
      },
      {
        title: 'Mathematical Hardness',
        detail: 'RSA relies on factoring large primes. Elliptic curve cryptography relies on the discrete logarithm problem. No efficient algorithms are known for these.',
      },
    ],
  },

  kerckhoffsPrinciple: {
    title: "Kerckhoffs's Principle",
    content: `A cryptographic system should be secure even if everything about the system, except the key, is public knowledge. This is why we use well-studied, open-source algorithms like AES and RSA instead of proprietary "secret" algorithms. Security through obscurity is not security.`,
    corollary: 'The enemy knows the system. The only secret is the key.',
  },

  securityNotes: {
    title: 'Security Considerations',
    notes: [
      {
        type: 'danger',
        text: 'Never implement your own cryptography for production use. Use established libraries like OpenSSL, libsodium, or Web Crypto API.',
      },
      {
        type: 'warning',
        text: 'Side-channel attacks target implementations, not algorithms. Even a perfect algorithm can be broken by a flawed implementation.',
      },
      {
        type: 'strength',
        text: 'Modern authenticated encryption (AES-GCM, ChaCha20-Poly1305) protects against both eavesdropping and tampering.',
      },
      {
        type: 'warning',
        text: 'Quantum computers threaten RSA and ECC. Post-quantum algorithms (CRYSTALS-Kyber, CRYSTALS-Dilithium) are being standardized by NIST.',
      },
      {
        type: 'info',
        text: 'The weakest link is usually not the algorithm -- it\'s key management, random number generation, or human error.',
      },
    ],
  },

  realWorldAttacks: {
    title: 'Real-World Attacks',
    attacks: [
      {
        name: 'POODLE (2014)',
        description: 'Padding Oracle On Downgraded Legacy Encryption. Exploited SSL 3.0\'s CBC padding to recover plaintext, one byte at a time.',
        impact: 'Forced deprecation of SSL 3.0 across the internet.',
        icon: 'alert',
      },
      {
        name: 'BEAST (2011)',
        description: 'Browser Exploit Against SSL/TLS. Exploited predictable IVs in TLS 1.0\'s CBC mode to decrypt HTTPS cookies.',
        impact: 'Accelerated migration to TLS 1.1+ and AES-GCM.',
        icon: 'alert',
      },
      {
        name: 'Heartbleed (2014)',
        description: 'A buffer over-read bug in OpenSSL, not a crypto flaw. Allowed attackers to read server memory, potentially including private keys.',
        impact: 'Affected ~17% of secure web servers. Led to mass certificate revocation.',
        icon: 'alert',
      },
      {
        name: 'DROWN (2016)',
        description: 'Decrypting RSA with Obsolete and Weakened eNcryption. Used SSLv2 support to attack modern TLS connections.',
        impact: 'Affected 33% of all HTTPS servers at disclosure.',
        icon: 'alert',
      },
    ],
  },

  furtherLearning: {
    title: 'Want to Learn More?',
    resources: [
      {
        type: 'Hands-on',
        name: 'Cryptopals Challenges',
        description: 'Work through real crypto attacks step-by-step, from basics to advanced.',
        url: 'https://cryptopals.com/',
      },
      {
        type: 'Book',
        name: 'Serious Cryptography',
        description: 'Jean-Philippe Aumasson\'s practical guide to modern cryptography.',
        url: 'https://nostarch.com/seriouscrypto',
      },
      {
        type: 'Course',
        name: 'Stanford Crypto I (Coursera)',
        description: 'Dan Boneh\'s foundational course covering attacks and defenses.',
        url: 'https://www.coursera.org/learn/crypto',
      },
      {
        type: 'Reference',
        name: 'OWASP Cryptographic Failures',
        description: 'Common crypto mistakes and how to avoid them in web applications.',
        url: 'https://owasp.org/Top10/A02_2021-Cryptographic_Failures/',
      },
    ],
  },
};
