export const eccEducationalContent = {
  whatIsECC: {
    title: "What is Elliptic Curve Cryptography?",
    content: "Elliptic Curve Cryptography (ECC) is a public-key cryptosystem based on the algebraic structure of elliptic curves over finite fields. It provides the same level of security as RSA but with significantly smaller key sizes, making it faster and more efficient for mobile devices and constrained environments.",
    icon: "info",
  },

  pointAddition: {
    title: "How Point Addition Works",
    steps: [
      {
        name: "1. The Curve Equation",
        description: "y² = x³ + ax + b (mod p)",
        detail: "Points satisfying this equation over a finite field form a mathematical group.",
        color: "#8B5CF6", // Violet
      },
      {
        name: "2. Point Addition (P + Q)",
        description: "Draw a line through P and Q, find the third intersection, reflect over x-axis.",
        detail: "The slope is (y₂ - y₁) / (x₂ - x₁) mod p. The result R = -(P + Q) is reflected to get P + Q.",
        color: "#6366F1", // Indigo
      },
      {
        name: "3. Point Doubling (P + P)",
        description: "Use the tangent line at P instead of a secant.",
        detail: "The slope is (3x² + a) / (2y) mod p. This handles the case where both points are the same.",
        color: "#EC4899", // Pink
      },
      {
        name: "4. Point at Infinity (O)",
        description: "The identity element: P + O = P for any point P.",
        detail: "When a line is vertical (P + (-P)), it intersects at the 'point at infinity' -- the group identity.",
        color: "#10B981", // Emerald
      },
      {
        name: "5. Scalar Multiplication",
        description: "k × P = P + P + ... + P (k times)",
        detail: "The double-and-add algorithm computes this efficiently in O(log k) steps instead of O(k).",
        color: "#F59E0B", // Amber
      },
    ],
  },

  ecdhExchange: {
    title: "ECDH Key Exchange",
    steps: [
      {
        name: "1. Agree on Curve & G",
        description: "Both parties agree on a curve and generator point G.",
        detail: "These are public parameters, often standardized (e.g., secp256k1, P-256).",
        color: "#8B5CF6",
      },
      {
        name: "2. Generate Private Keys",
        description: "Alice picks d_A, Bob picks d_B (random secret scalars).",
        detail: "Each private key is a random integer in [1, n-1] where n is the order of G.",
        color: "#6366F1",
      },
      {
        name: "3. Compute Public Keys",
        description: "Alice: Q_A = d_A × G, Bob: Q_B = d_B × G",
        detail: "Public keys are points on the curve. They can be shared openly.",
        color: "#EC4899",
      },
      {
        name: "4. Derive Shared Secret",
        description: "Alice: S = d_A × Q_B, Bob: S = d_B × Q_A",
        detail: "Both arrive at the same point S = d_A × d_B × G. An eavesdropper cannot compute this.",
        color: "#10B981",
      },
    ],
  },

  ecdsaSignatures: {
    title: "ECDSA Digital Signatures",
    steps: [
      {
        name: "1. Hash the Message",
        description: "Compute z = hash(message) truncated to bit length of n.",
        detail: "The hash converts arbitrary data to a fixed-size integer.",
        color: "#8B5CF6",
      },
      {
        name: "2. Pick Random k",
        description: "Choose a random k in [1, n-1] for each signature.",
        detail: "CRITICAL: k must be truly random and never reused. Reusing k leaks the private key!",
        color: "#EF4444",
      },
      {
        name: "3. Compute r",
        description: "r = (k × G).x mod n",
        detail: "Take the x-coordinate of the point kG, reduced modulo n.",
        color: "#6366F1",
      },
      {
        name: "4. Compute s",
        description: "s = k⁻¹(z + r·d) mod n",
        detail: "Combines the hash, r value, and private key d with the inverse of k.",
        color: "#EC4899",
      },
      {
        name: "5. Verify",
        description: "Check that (u₁G + u₂Q).x = r where u₁ = zs⁻¹, u₂ = rs⁻¹",
        detail: "Anyone with the public key Q can verify the signature without knowing d.",
        color: "#10B981",
      },
    ],
  },

  eccVsRSA: {
    title: "ECC vs RSA: Key Size Comparison",
    notes: [
      {
        type: "strength",
        text: "A 256-bit ECC key provides equivalent security to a 3072-bit RSA key -- 12x smaller!",
      },
      {
        type: "strength",
        text: "ECC operations are faster and require less memory, making it ideal for IoT and mobile.",
      },
      {
        type: "info",
        text: "ECC security relies on the Elliptic Curve Discrete Logarithm Problem (ECDLP), not integer factorization like RSA.",
      },
      {
        type: "warning",
        text: "Curve selection matters: some curves have known weaknesses. Use standardized curves (P-256, Curve25519).",
      },
    ],
  },

  securityNotes: {
    title: "Security Considerations",
    notes: [
      {
        type: "strength",
        text: "Provides perfect forward secrecy when used in ephemeral ECDH (ECDHE) -- even if long-term keys are compromised, past sessions remain secure.",
      },
      {
        type: "warning",
        text: "Vulnerable to quantum computers running Shor's algorithm. Post-quantum alternatives are being standardized.",
      },
      {
        type: "info",
        text: "Never reuse the random nonce k in ECDSA signing. The PlayStation 3 hack exploited exactly this flaw to extract Sony's private key.",
      },
      {
        type: "warning",
        text: "Invalid curve attacks: always validate that received points lie on the expected curve before performing operations.",
      },
    ],
  },

  realWorldUse: {
    title: "Where is ECC Used?",
    examples: [
      {
        name: "Bitcoin & Ethereum",
        description: "Uses secp256k1 curve for wallet addresses and transaction signing via ECDSA.",
        icon: "globe",
      },
      {
        name: "TLS 1.3 (HTTPS)",
        description: "ECDHE is the default key exchange in modern TLS, securing virtually all web traffic.",
        icon: "globe",
      },
      {
        name: "Signal Protocol",
        description: "Uses Curve25519 for key agreement in end-to-end encrypted messaging (Signal, WhatsApp).",
        icon: "terminal",
      },
      {
        name: "SSH Keys",
        description: "Ed25519 SSH keys (based on Curve25519) are now recommended over RSA for authentication.",
        icon: "terminal",
      },
      {
        name: "Apple & Android",
        description: "Both platforms use ECC for code signing, secure enclave operations, and device authentication.",
        icon: "file",
      },
    ],
  },

  commonMistakes: {
    title: "Common Mistakes to Avoid",
    mistakes: [
      {
        mistake: "Reusing the nonce k in ECDSA",
        why: "Two signatures with the same k allow anyone to compute the private key algebraically",
        solution: "Use RFC 6979 deterministic k generation or a cryptographically secure RNG for every signature",
      },
      {
        mistake: "Using weak or non-standard curves",
        why: "Custom curves may have hidden weaknesses; some NIST curves face backdoor concerns",
        solution: "Use well-vetted curves: P-256 (NIST), Curve25519 (Bernstein), or secp256k1 (Bitcoin)",
      },
      {
        mistake: "Not validating points on the curve",
        why: "Invalid curve attacks can extract the private key by sending malformed points",
        solution: "Always verify that received points satisfy the curve equation before using them",
      },
      {
        mistake: "Implementing your own ECC",
        why: "Side-channel attacks (timing, power analysis) are extremely subtle and hard to prevent",
        solution: "Use audited libraries: libsodium, OpenSSL, or platform-native APIs (CryptoKit, Web Crypto)",
      },
    ],
  },

  furtherLearning: {
    title: "Want to Learn More?",
    resources: [
      {
        type: "Interactive Guide",
        name: "A Primer on Elliptic Curve Cryptography",
        description: "Andrea Corbellini's illustrated blog series on ECC fundamentals",
        url: "https://andrea.corbellini.name/2015/05/17/elliptic-curve-cryptography-a-gentle-introduction/",
      },
      {
        type: "Video Series",
        name: "Computerphile: Elliptic Curves",
        description: "Visual explanations of elliptic curve math and cryptography applications",
        url: "https://www.youtube.com/watch?v=NF1pwjL9-DE",
      },
      {
        type: "Technical Standard",
        name: "SEC 2: Recommended Elliptic Curve Domain Parameters",
        description: "The definitive reference for standardized elliptic curve parameters",
        url: "https://www.secg.org/sec2-v2.pdf",
      },
      {
        type: "Book",
        name: "Serious Cryptography by Jean-Philippe Aumasson",
        description: "Chapter 12 covers ECC with practical security considerations",
        url: "https://nostarch.com/seriouscrypto",
      },
    ],
  },
};
