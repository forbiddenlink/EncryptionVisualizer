export const paddingEducationalContent = {
  whyPaddingMatters: {
    title: "Why Padding Matters",
    content: "Block ciphers like AES operate on fixed-size blocks (typically 16 bytes). If the plaintext is not a perfect multiple of the block size, padding must be added to fill the last block. The padding scheme determines how this extra data is added and, crucially, how it is removed after decryption.",
    icon: "info",
  },

  pkcs7: {
    title: "PKCS#7 Padding",
    items: [
      {
        name: "How It Works",
        description: "Each padding byte is set to the number of padding bytes added. If 5 bytes are needed, each padding byte is 0x05. If the data is already aligned, a full block of padding is added.",
        color: "#10B981",
      },
      {
        name: "Unambiguous",
        description: "The last byte always tells you exactly how many bytes to remove. This works even when the original data ends with bytes that look like padding.",
        color: "#3B82F6",
      },
      {
        name: "Most Common",
        description: "PKCS#7 is the standard padding used in TLS, CMS (S/MIME), and most AES implementations. It is defined in RFC 5652.",
        color: "#8B5CF6",
      },
    ],
  },

  zeroPadding: {
    title: "Zero Padding",
    items: [
      {
        name: "How It Works",
        description: "Remaining bytes are filled with 0x00. Simple but problematic -- if the original data ends with zero bytes, you cannot distinguish data from padding.",
        color: "#F59E0B",
      },
      {
        name: "Ambiguous",
        description: "There is no reliable way to determine where the original data ends and padding begins. This makes it unsuitable for binary data.",
        color: "#EF4444",
      },
      {
        name: "Limited Use",
        description: "Acceptable only when the data length is known in advance or the data is guaranteed to never end with zeros (e.g., null-terminated strings).",
        color: "#6B7280",
      },
    ],
  },

  ansiX923: {
    title: "ANSI X.923 Padding",
    items: [
      {
        name: "How It Works",
        description: "All padding bytes are 0x00 except the last byte, which stores the count of padding bytes. A hybrid of zero padding and PKCS#7.",
        color: "#3B82F6",
      },
      {
        name: "Unambiguous",
        description: "Like PKCS#7, the last byte indicates padding length. The intermediate zero bytes provide slightly less redundancy for error detection.",
        color: "#10B981",
      },
      {
        name: "Less Common",
        description: "Used in some Windows APIs and .NET implementations. Less widely adopted than PKCS#7 but functionally equivalent in most scenarios.",
        color: "#8B5CF6",
      },
    ],
  },

  paddingOracle: {
    title: "Padding Oracle Attacks",
    items: [
      {
        name: "The Vulnerability",
        description: "If a server reveals whether decrypted padding is valid (e.g., different error messages), an attacker can decrypt ciphertext one byte at a time without knowing the key.",
        color: "#EF4444",
      },
      {
        name: "How It Works",
        description: "The attacker modifies ciphertext bytes and submits them to the server. By observing which modifications cause padding errors vs other errors, they deduce the plaintext.",
        color: "#F59E0B",
      },
      {
        name: "Prevention",
        description: "Use authenticated encryption (AES-GCM) which verifies integrity before decryption. Never reveal padding validity to untrusted parties. Always MAC-then-encrypt or use AEAD.",
        color: "#10B981",
      },
    ],
  },

  whenNotToPad: {
    title: "When NOT to Pad",
    list: [
      {
        name: "Stream Ciphers (ChaCha20)",
        detail: "Stream ciphers encrypt byte-by-byte. No block alignment is needed, so padding is unnecessary and should not be used.",
      },
      {
        name: "CTR Mode",
        detail: "Counter mode turns a block cipher into a stream cipher. The keystream is XORed with plaintext of any length -- no padding required.",
      },
      {
        name: "GCM Mode",
        detail: "Galois/Counter Mode also operates as a stream cipher internally. Adding padding would waste bandwidth and is not part of the GCM specification.",
      },
      {
        name: "OFB / CFB Modes",
        detail: "Output Feedback and Cipher Feedback modes also generate keystreams. Padding is not needed and not recommended.",
      },
    ],
  },

  commonMistakes: {
    title: "Common Mistakes",
    mistakes: [
      {
        mistake: "Not adding padding when data is already block-aligned",
        why: "With PKCS#7, a full block of padding must be added when data length equals block size, otherwise the receiver cannot determine if the last block is data or padding",
        solution: "Always apply padding, even when data length is a multiple of the block size (for PKCS#7)",
      },
      {
        mistake: "Using zero padding for binary data",
        why: "Binary data may legitimately contain zero bytes, making it impossible to determine the original length",
        solution: "Use PKCS#7 or ANSI X.923, which encode padding length explicitly",
      },
      {
        mistake: "Implementing custom padding schemes",
        why: "Custom schemes may introduce subtle vulnerabilities like padding oracle attack vectors",
        solution: "Use established schemes (PKCS#7) through well-tested library functions",
      },
    ],
  },

  furtherLearning: {
    title: "Further Learning",
    resources: [
      {
        type: "Standard",
        name: "RFC 5652 - PKCS#7",
        description: "The Cryptographic Message Syntax standard that defines PKCS#7 padding",
        url: "https://datatracker.ietf.org/doc/html/rfc5652",
      },
      {
        type: "Article",
        name: "Padding Oracle Attack Explained",
        description: "Detailed walkthrough of how padding oracle attacks work and why they matter",
        url: "https://blog.skullsecurity.org/2013/padding-oracle-attacks-in-depth",
      },
      {
        type: "Interactive",
        name: "CyberChef Padding",
        description: "Online tool to experiment with various padding schemes",
        url: "https://gchq.github.io/CyberChef/",
      },
    ],
  },
};
