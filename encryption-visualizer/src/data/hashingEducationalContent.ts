export const hashingEducationalContent = {
  whatIsHashing: {
    title: "What is Hashing?",
    content: "A hash function takes an input (or 'message') and returns a fixed-size string of bytes. The output is typically a 'digest' that is unique to each unique input. It is a one-way function, meaning you cannot practically reverse it to get the input from the hash.",
    icon: "info",
  },

  properties: {
    title: "Key Properties",
    items: [
      {
        name: "Deterministic",
        description: "The same message always results in the same hash.",
        color: "#10B981", // Emerald
      },
      {
        name: "Avalanche Effect",
        description: "A small change to a message should change the hash value so extensively that the new hash appears uncorrelated with the old hash.",
        color: "#3B82F6", // Blue
      },
      {
        name: "Pre-image Resistance",
        description: "It should be computationally infeasible to determine the original message from its hash.",
        color: "#F59E0B", // Amber
      },
      {
        name: "Collision Resistance",
        description: "It should be hard to find two different messages that hash to the same value.",
        color: "#EF4444", // Red
      },
    ],
  },

  algorithms: {
    title: "Common Algorithms",
    list: [
      {
        name: "SHA-256",
        detail: "Part of the SHA-2 family. 256-bit output. Used everywhere (Bitcoin, TLS).",
      },
      {
        name: "MD5 (Insecure)",
        detail: "128-bit output. Broken and should not be used for security. Still used for checksums.",
      },
      {
        name: "SHA-3",
        detail: "The latest member of the Secure Hash Algorithm family. standard.",
      },
      {
        name: "Bcrypt/Argon2",
        detail: "Slow hash functions designed specifically for password hashing to resist brute-force attacks.",
      },
    ],
  },

  realWorldUse: {
    title: "Applications",
    examples: [
      {
        name: "Password Storage",
        description: "Storing hash(password) instead of the password itself.",
        icon: "lock",
      },
      {
        name: "Data Integrity",
        description: "Verifying files have not been corrupted or tampered with.",
        icon: "file",
      },
      {
        name: "Blockchain",
        description: "Linking blocks together and proving work (e.g., Bitcoin uses SHA-256).",
        icon: "link",
      },
    ],
  },
};
