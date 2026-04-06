export const diffieHellmanEducationalContent = {
  whatIsDH: {
    title: "What is Diffie-Hellman?",
    content: "Diffie-Hellman (DH) is a key exchange protocol that allows two parties to establish a shared secret over an insecure channel. Unlike RSA, it doesn't encrypt messages directly - it creates a secret key that both parties can use with symmetric encryption like AES.",
    icon: "info",
  },

  keyExchangeSteps: {
    title: "Key Exchange Steps",
    steps: [
      {
        name: "1. Public Parameters",
        description: "Both parties agree on a prime p and generator g.",
        detail: "These values can be shared publicly without compromising security.",
        color: "#6366F1", // Indigo
      },
      {
        name: "2. Private Keys",
        description: "Each party picks a secret random number.",
        detail: "Alice picks 'a', Bob picks 'b'. These are never shared.",
        color: "#8B5CF6", // Violet
      },
      {
        name: "3. Public Values",
        description: "Each computes: A = g^a mod p, B = g^b mod p",
        detail: "These public values are exchanged over the insecure channel.",
        color: "#EC4899", // Pink
      },
      {
        name: "4. Shared Secret",
        description: "Each computes the same secret independently.",
        detail: "Alice: s = B^a mod p. Bob: s = A^b mod p. Both get g^(ab) mod p.",
        color: "#10B981", // Emerald
      },
    ],
  },

  securityInfo: {
    title: "Security & Math",
    notes: [
      {
        type: "strength",
        text: "Security relies on the Discrete Logarithm Problem (DLP) - computing a from g^a mod p is computationally infeasible for large primes.",
      },
      {
        type: "warning",
        text: "Basic DH is vulnerable to man-in-the-middle attacks. Use authenticated key exchange (like TLS) in practice.",
      },
      {
        type: "info",
        text: "Minimum recommended prime size is 2048 bits. Many protocols use 4096-bit primes or switch to Elliptic Curve DH (ECDH).",
      },
    ],
  },

  realWorldUse: {
    title: "Where is Diffie-Hellman Used?",
    examples: [
      {
        name: "TLS/HTTPS",
        description: "Most secure web connections use DH or ECDH for key exchange, enabling Perfect Forward Secrecy.",
        icon: "globe",
      },
      {
        name: "Signal Protocol",
        description: "End-to-end encrypted messaging apps like Signal use DH variants for key agreement.",
        icon: "terminal",
      },
      {
        name: "VPNs & IPSec",
        description: "VPN protocols use DH to establish secure tunnels between networks.",
        icon: "file",
      },
    ],
  },

  commonMistakes: {
    title: "Common Mistakes to Avoid",
    mistakes: [
      {
        mistake: "Using small primes",
        why: "Small primes can be attacked with algorithms like baby-step giant-step or Pohlig-Hellman",
        solution: "Use at least 2048-bit primes, or use ECDH with appropriate curves (P-256 or better)",
      },
      {
        mistake: "Reusing private keys",
        why: "If the same private key is used multiple times, compromising it exposes all sessions",
        solution: "Generate ephemeral (single-use) keys for each session - this provides Perfect Forward Secrecy",
      },
      {
        mistake: "No authentication",
        why: "Plain DH doesn't verify who you're talking to - an attacker can intercept and relay messages",
        solution: "Always combine DH with authentication (certificates, signatures, or pre-shared keys)",
      },
      {
        mistake: "Using weak generators",
        why: "Poor choice of generator g can reduce the effective key space",
        solution: "Use well-known safe primes and verified generators from standards (RFC 3526, etc.)",
      },
    ],
  },

  furtherLearning: {
    title: "Want to Learn More?",
    resources: [
      {
        type: "Original Paper",
        name: "New Directions in Cryptography",
        description: "The 1976 paper by Diffie and Hellman that started public-key cryptography",
        url: "https://ee.stanford.edu/~hellman/publications/24.pdf",
      },
      {
        type: "Interactive Tool",
        name: "DH Key Exchange Calculator",
        description: "Online calculator to experiment with Diffie-Hellman values",
        url: "https://www.cryptool.org/en/cto/dh",
      },
      {
        type: "Video Course",
        name: "Computerphile: Diffie-Hellman",
        description: "Clear visual explanation of how DH key exchange works",
        url: "https://www.youtube.com/watch?v=NmM9HA2MQGI",
      },
    ],
  },

  colorExplainer: {
    title: "Color Guide",
    items: [
      {
        color: "#6366F1",
        label: "Public Values",
        description: "Can be shared openly (p, g, A, B)",
      },
      {
        color: "#10B981",
        label: "Alice's Values",
        description: "Alice's private key and computations",
      },
      {
        color: "#F59E0B",
        label: "Bob's Values",
        description: "Bob's private key and computations",
      },
      {
        color: "#EC4899",
        label: "Shared Secret",
        description: "The final shared secret (identical for both)",
      },
    ],
  },
};
