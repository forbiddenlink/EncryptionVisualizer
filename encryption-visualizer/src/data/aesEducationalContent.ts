export const aesEducationalContent = {
  whatIsAES: {
    title: "What is AES?",
    content: `AES (Advanced Encryption Standard) is a symmetric block cipher that encrypts data in 128-bit blocks. It's the most widely used encryption algorithm today, securing everything from WiFi networks to government communications.`,
    icon: "info",
  },

  fourOperations: {
    title: "The Four Operations",
    operations: [
      {
        name: "SubBytes",
        color: "#FFD700",
        description: "Non-linear substitution using S-Box",
        detail: "Each byte is replaced with another byte from a substitution table (S-Box), providing confusion in the cipher.",
      },
      {
        name: "ShiftRows",
        color: "#00FF7F",
        description: "Cyclically shift rows left",
        detail: "Rows are shifted: Row 0 (0 shifts), Row 1 (1 shift), Row 2 (2 shifts), Row 3 (3 shifts).",
      },
      {
        name: "MixColumns",
        color: "#1E90FF",
        description: "Mix data within columns",
        detail: "Each column is transformed using matrix multiplication in Galois Field GF(2⁸), providing diffusion.",
      },
      {
        name: "AddRoundKey",
        color: "#FF69B4",
        description: "XOR with round key",
        detail: "The state is XORed with a round key derived from the cipher key, adding key-dependent complexity.",
      },
    ],
  },

  keySize: {
    title: "Key Sizes",
    variants: [
      {
        size: 128,
        bits: "128-bit",
        rounds: 10,
        description: "Standard security - suitable for most applications",
        usage: "Common in SSL/TLS, file encryption, VPNs",
      },
      {
        size: 192,
        bits: "192-bit",
        rounds: 12,
        description: "Enhanced security - government use",
        usage: "Banking systems, classified information",
      },
      {
        size: 256,
        bits: "256-bit",
        rounds: 14,
        description: "Maximum security - military grade",
        usage: "Top-secret data, long-term encryption",
      },
    ],
  },

  securityNotes: {
    title: "Security Considerations",
    notes: [
      {
        type: "strength",
        icon: "check",
        text: "AES-128 is considered secure against all known practical attacks",
      },
      {
        type: "strength",
        icon: "check",
        text: "Resistant to differential and linear cryptanalysis",
      },
      {
        type: "warning",
        icon: "alert",
        text: "Key must be truly random and kept secret",
      },
      {
        type: "warning",
        icon: "alert",
        text: "Use proper modes of operation (GCM, CBC with MAC, never ECB)",
      },
      {
        type: "info",
        icon: "info",
        text: "Quantum computers may threaten AES in the future (use AES-256 for long-term security)",
      },
    ],
  },

  realWorldUse: {
    title: "Real-World Applications",
    examples: [
      {
        name: "HTTPS/TLS",
        description: "Secures web traffic between browsers and servers",
        icon: "globe",
      },
      {
        name: "File Encryption",
        description: "Protects files at rest (BitLocker, FileVault, VeraCrypt)",
        icon: "file",
      },
      {
        name: "VPNs",
        description: "Encrypts internet traffic through virtual private networks",
        icon: "shield",
      },
      {
        name: "WiFi Security",
        description: "WPA2 and WPA3 use AES to protect wireless networks",
        icon: "wifi",
      },
      {
        name: "Messaging Apps",
        description: "End-to-end encryption in Signal, WhatsApp, iMessage",
        icon: "message",
      },
      {
        name: "Database Encryption",
        description: "Transparent Data Encryption (TDE) in databases",
        icon: "database",
      },
    ],
  },

  stepByStepGuide: {
    title: "Understanding the Process",
    steps: [
      {
        step: 1,
        title: "Input Preparation",
        description: "Convert plaintext to a 4×4 byte matrix (column-major order)",
      },
      {
        step: 2,
        title: "Key Expansion",
        description: "Generate round keys from the cipher key using key schedule",
      },
      {
        step: 3,
        title: "Initial Round",
        description: "XOR plaintext with first round key (Round 0)",
      },
      {
        step: 4,
        title: "Main Rounds",
        description: "Apply SubBytes → ShiftRows → MixColumns → AddRoundKey (9 times for AES-128)",
      },
      {
        step: 5,
        title: "Final Round",
        description: "Apply SubBytes → ShiftRows → AddRoundKey (no MixColumns)",
      },
      {
        step: 6,
        title: "Output",
        description: "The resulting state matrix is your ciphertext",
      },
    ],
  },

  interactiveTips: {
    title: "Interactive Tips",
    tips: [
      "👆 Click on matrix cells to see their hex and decimal values",
      "⏯️ Use playback controls to pause and examine each step",
      "🔄 Try different keys to see how the encryption changes",
      "📊 Watch how each byte transforms through the rounds",
      "🎨 Color coding shows which operation was last applied",
    ],
  },

  commonMistakes: {
    title: "Common Mistakes to Avoid",
    mistakes: [
      {
        mistake: "Using ECB mode",
        why: "ECB reveals patterns in plaintext",
        solution: "Use CBC, CTR, or GCM mode instead",
      },
      {
        mistake: "Weak key generation",
        why: "Predictable keys can be guessed",
        solution: "Use cryptographically secure random number generators",
      },
      {
        mistake: "Hardcoding keys",
        why: "Keys in source code can be extracted",
        solution: "Use key derivation functions (KDFs) and secure key storage",
      },
      {
        mistake: "No authentication",
        why: "Encryption alone doesn't prevent tampering",
        solution: "Use authenticated encryption (AES-GCM) or HMAC",
      },
    ],
  },

  furtherLearning: {
    title: "Want to Learn More?",
    resources: [
      {
        type: "Official Standard",
        name: "FIPS 197",
        description: "The official AES specification from NIST",
        url: "https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.197.pdf",
      },
      {
        type: "Interactive Tool",
        name: "CrypTool",
        description: "Free e-learning software for cryptography",
        url: "https://www.cryptool.org",
      },
      {
        type: "Video Course",
        name: "Christof Paar's Lectures",
        description: "Introduction to Cryptography on YouTube",
        url: "https://www.youtube.com/channel/UC1usFRN4LCMcfIV7UjHNuQg",
      },
      {
        type: "Book",
        name: "Serious Cryptography",
        description: "By Jean-Philippe Aumasson - Practical cryptography guide",
        url: "https://nostarch.com/seriouscrypto",
      },
    ],
  },
};

