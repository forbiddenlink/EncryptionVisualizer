export const hmacEducationalContent = {
  whatIsHmac: {
    title: "What is HMAC?",
    content: "HMAC (Hash-based Message Authentication Code) is a mechanism for verifying both the integrity and authenticity of a message using a cryptographic hash function and a secret key. Unlike a plain hash, HMAC proves that the message came from someone who knows the secret key and has not been tampered with.",
    icon: "info",
  },

  whyNotJustHash: {
    title: "Why Not Just Hash(key + message)?",
    items: [
      {
        name: "Length Extension Attacks",
        description: "With many hash functions (MD5, SHA-1, SHA-256), an attacker who knows Hash(key || message) can compute Hash(key || message || attacker_data) without knowing the key.",
        color: "#EF4444",
      },
      {
        name: "HMAC's Two-Pass Design",
        description: "HMAC uses two hash passes with different keys (inner and outer), preventing length extension attacks entirely.",
        color: "#10B981",
      },
      {
        name: "Provable Security",
        description: "HMAC has a mathematical security proof: it is secure as long as the underlying hash function's compression function is a PRF (pseudorandom function).",
        color: "#3B82F6",
      },
    ],
  },

  innerOuterHash: {
    title: "Inner and Outer Hash",
    items: [
      {
        name: "ipad (0x36)",
        description: "The inner padding constant. XORed with the key to create the inner key, which is concatenated with the message before the first hash.",
        color: "#8B5CF6",
      },
      {
        name: "opad (0x5c)",
        description: "The outer padding constant. XORed with the key to create the outer key, which wraps around the inner hash result for the second hash.",
        color: "#F59E0B",
      },
      {
        name: "Two-pass construction",
        description: "Inner hash: H((K XOR ipad) || message). Outer hash: H((K XOR opad) || inner_hash). This nested structure is what makes HMAC resistant to extension attacks.",
        color: "#10B981",
      },
    ],
  },

  hmacVsSignatures: {
    title: "HMAC vs Digital Signatures",
    list: [
      {
        name: "Shared Secret (HMAC)",
        detail: "Both parties must know the same secret key. Fast and efficient, but cannot prove which party created the MAC.",
      },
      {
        name: "Asymmetric Keys (Signatures)",
        detail: "Only the signer has the private key. Anyone can verify with the public key. Provides non-repudiation -- the signer cannot deny signing.",
      },
      {
        name: "Performance",
        detail: "HMAC is significantly faster than RSA or ECDSA signatures, making it ideal for high-throughput scenarios like API authentication.",
      },
      {
        name: "Use Case Distinction",
        detail: "Use HMAC when both parties are trusted and share a key. Use digital signatures when you need third-party verification or non-repudiation.",
      },
    ],
  },

  realWorldUse: {
    title: "Real-World Applications",
    examples: [
      {
        name: "API Authentication",
        description: "AWS, Stripe, and many APIs use HMAC-SHA256 to sign requests. The server verifies the signature to authenticate the caller.",
        icon: "lock",
      },
      {
        name: "JSON Web Tokens (JWT)",
        description: "JWTs signed with HS256 use HMAC-SHA256 to ensure the token payload has not been tampered with.",
        icon: "file",
      },
      {
        name: "TLS / SSL",
        description: "HMAC is used in TLS to verify the integrity of data transmitted over HTTPS connections.",
        icon: "link",
      },
      {
        name: "TOTP / 2FA Codes",
        description: "Time-based one-time passwords (Google Authenticator) use HMAC to generate codes from a shared secret and the current time.",
        icon: "lock",
      },
    ],
  },

  securityNotes: {
    title: "Security Considerations",
    items: [
      {
        name: "Key Length",
        description: "The key should be at least as long as the hash output (e.g., 256 bits for HMAC-SHA256). Short keys are padded, reducing security margin.",
        color: "#F59E0B",
      },
      {
        name: "Timing Attacks",
        description: "Always compare HMAC values using constant-time comparison functions. Standard string equality can leak information through timing differences.",
        color: "#EF4444",
      },
      {
        name: "Key Management",
        description: "HMAC security depends entirely on key secrecy. Use secure key generation, storage, and rotation practices.",
        color: "#3B82F6",
      },
    ],
  },

  commonMistakes: {
    title: "Common Mistakes",
    mistakes: [
      {
        mistake: "Using Hash(key || message) instead of HMAC",
        why: "Vulnerable to length extension attacks with SHA-256, SHA-512, and MD5",
        solution: "Always use proper HMAC construction or a library function like crypto.createHmac()",
      },
      {
        mistake: "Comparing HMAC values with == or ===",
        why: "String comparison short-circuits on first different byte, leaking timing information",
        solution: "Use crypto.timingSafeEqual() or equivalent constant-time comparison",
      },
      {
        mistake: "Using a weak or predictable key",
        why: "An attacker who guesses the key can forge any HMAC",
        solution: "Generate keys with a cryptographically secure random number generator (crypto.randomBytes)",
      },
      {
        mistake: "Reusing HMAC keys across different protocols",
        why: "Cross-protocol attacks can compromise security if the same key is used for different purposes",
        solution: "Derive separate keys for each use case using a KDF like HKDF",
      },
    ],
  },

  furtherLearning: {
    title: "Further Learning",
    resources: [
      {
        type: "Standard",
        name: "RFC 2104",
        description: "The original HMAC specification by Bellare, Canetti, and Krawczyk",
        url: "https://datatracker.ietf.org/doc/html/rfc2104",
      },
      {
        type: "Guide",
        name: "HMAC on Wikipedia",
        description: "Comprehensive overview of HMAC construction, security proofs, and implementations",
        url: "https://en.wikipedia.org/wiki/HMAC",
      },
      {
        type: "Interactive",
        name: "CyberChef HMAC",
        description: "Online tool to compute HMAC with various hash functions",
        url: "https://gchq.github.io/CyberChef/#recipe=HMAC",
      },
    ],
  },
};
