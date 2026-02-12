export const rsaEducationalContent = {
  whatIsRSA: {
    title: "What is RSA?",
    content: "RSA (Rivest–Shamir–Adleman) is a public-key cryptosystem that is widely used for secure data transmission. Unlike symmetric encryption (like AES), RSA uses two keys: a public key for encryption and a private key for decryption.",
    icon: "info",
  },

  keyGeneration: {
    title: "Key Generation Steps",
    steps: [
      {
        name: "1. Choose Primes",
        description: "Select two distinct prime numbers, p and q.",
        detail: "In practice, these are very large random primes.",
        color: "#8B5CF6", // Violet
      },
      {
        name: "2. Compute n",
        description: "n = p × q",
        detail: "n is the modulus for the public and private keys. Its length in bits is the key length.",
        color: "#6366F1", // Indigo
      },
      {
        name: "3. Compute φ(n)",
        description: "φ(n) = (p-1) × (q-1)",
        detail: "Euler's totient function. It counts the positive integers up to n that are relatively prime to n.",
        color: "#EC4899", // Pink
      },
      {
        name: "4. Choose Public Exponent (e)",
        description: "Choose an integer e such that 1 < e < φ(n) and gcd(e, φ(n)) = 1.",
        detail: "Common choice is 65537 (2¹⁶ + 1).",
        color: "#10B981", // Emerald
      },
      {
        name: "5. Compute Private Exponent (d)",
        description: "d = e⁻¹ mod φ(n)",
        detail: "d is the modular multiplicative inverse of e modulo φ(n).",
        color: "#F59E0B", // Amber
      },
    ],
  },

  securitySecurity: {
    title: "Security & Math",
    notes: [
      {
        type: "strength",
        text: "Relies on the difficulty of factoring the product of two large prime numbers.",
      },
      {
        type: "warning",
        text: "Much slower than AES. Usually used to encrypt a symmetric key, which then encrypts the actual message.",
      },
      {
        type: "info",
        text: "Minimum recommended key size today is 2048 bits. 4096 bits is better for long-term security.",
      },
    ],
  },

  realWorldUse: {
    title: "Where is RSA Used?",
    examples: [
      {
        name: "SSL/TLS Certificates",
        description: "Authenticating servers and exchanging symmetric keys for HTTPS.",
        icon: "globe",
      },
      {
        name: "Digital Signatures",
        description: "Verifying the authenticity and integrity of software or documents.",
        icon: "file",
      },
      {
        name: "SSH",
        description: "Secure remote login protocols often use RSA for authentication.",
        icon: "terminal",
      },
    ],
  },
};
