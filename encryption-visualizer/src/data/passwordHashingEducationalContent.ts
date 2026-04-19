export const passwordHashingEducationalContent = {
  whyNotSha256: {
    title: "Why Not SHA-256 for Passwords?",
    content: "SHA-256 is designed to be fast -- a modern GPU can compute over 10 billion SHA-256 hashes per second. That speed is great for data integrity checks, but catastrophic for password storage. An attacker can try every 8-character lowercase password in under 3 minutes. Password hashing algorithms are intentionally slow, making brute-force attacks impractical.",
    icon: "info",
  },

  saltPurpose: {
    title: "What is a Salt?",
    items: [
      {
        name: "Unique Per Password",
        description: "A salt is a random value generated for each password. It is stored alongside the hash (it is not secret). Its purpose is to ensure that identical passwords produce different hashes.",
        color: "#10B981",
      },
      {
        name: "Defeats Rainbow Tables",
        description: "Without salts, attackers can precompute hashes for common passwords (rainbow tables). Salts make precomputation infeasible because each password needs its own table.",
        color: "#3B82F6",
      },
      {
        name: "Prevents Hash Comparison",
        description: "Without salts, if two users have the same password, their hashes are identical. An attacker who cracks one gets both. Salts eliminate this problem.",
        color: "#F59E0B",
      },
    ],
  },

  workFactor: {
    title: "Work Factor / Cost Parameter",
    items: [
      {
        name: "Exponential Cost",
        description: "The cost parameter determines iteration count as 2^cost. Cost 10 = 1,024 iterations. Cost 12 = 4,096. Each increment doubles the time required.",
        color: "#8B5CF6",
      },
      {
        name: "Adaptive Security",
        description: "As hardware gets faster, you increase the cost parameter. A hash that took 100ms in 2015 can be increased to still take 100ms on 2025 hardware.",
        color: "#10B981",
      },
      {
        name: "Balancing Act",
        description: "Too low: attackers can brute-force easily. Too high: legitimate logins become slow. Target 100-250ms per hash for web applications.",
        color: "#F59E0B",
      },
    ],
  },

  algorithms: {
    title: "Password Hashing Algorithms",
    list: [
      {
        name: "bcrypt",
        detail: "The classic choice since 1999. Based on Blowfish cipher. CPU-hard with configurable cost. Maximum 72-byte password length. Still widely used and recommended.",
      },
      {
        name: "scrypt",
        detail: "Adds memory-hardness to CPU-hardness. Designed to be expensive on GPUs and ASICs by requiring large amounts of RAM. Used by Litecoin and many modern systems.",
      },
      {
        name: "Argon2id (Recommended)",
        detail: "Winner of the 2015 Password Hashing Competition. Combines CPU-hardness, memory-hardness, and parallelism resistance. Argon2id is the recommended variant for most use cases.",
      },
      {
        name: "PBKDF2",
        detail: "NIST-approved standard. Simple iterated HMAC. Lacks memory-hardness, so it is weaker against GPU attacks. Still acceptable when bcrypt/Argon2 are unavailable.",
      },
    ],
  },

  rainbowTables: {
    title: "Rainbow Tables",
    items: [
      {
        name: "What Are They?",
        description: "Precomputed lookup tables mapping common passwords to their hash values. An attacker can look up a hash and instantly find the password.",
        color: "#EF4444",
      },
      {
        name: "Scale of the Threat",
        description: "Rainbow tables for unsalted MD5 covering all 8-character passwords exist and are freely downloadable. They take seconds to search.",
        color: "#F59E0B",
      },
      {
        name: "Salts Neutralize Them",
        description: "A 128-bit salt means an attacker would need 2^128 separate rainbow tables -- one for each possible salt. This is computationally infeasible.",
        color: "#10B981",
      },
    ],
  },

  realWorldUse: {
    title: "Real-World Applications",
    examples: [
      {
        name: "User Authentication",
        description: "Every login system should store password hashes, never plaintext. The hash is recomputed on login and compared to the stored value.",
        icon: "lock",
      },
      {
        name: "Key Derivation",
        description: "Password hashing functions are used to derive encryption keys from passwords (e.g., encrypting a file with a password).",
        icon: "file",
      },
      {
        name: "Token Generation",
        description: "Password hashing concepts underpin TOTP/HOTP two-factor authentication and password reset token generation.",
        icon: "link",
      },
    ],
  },

  commonMistakes: {
    title: "Common Mistakes",
    mistakes: [
      {
        mistake: "Storing passwords in plaintext",
        why: "A single database breach exposes every user's password. Users often reuse passwords across sites.",
        solution: "Always hash passwords with bcrypt, scrypt, or Argon2id before storage",
      },
      {
        mistake: "Using MD5 or SHA-256 for password hashing",
        why: "These are fast general-purpose hashes. A GPU can try billions per second.",
        solution: "Use a purpose-built password hashing function with a work factor (bcrypt, Argon2id)",
      },
      {
        mistake: "Using a single global salt",
        why: "If all passwords share one salt, an attacker can still build a rainbow table for that salt",
        solution: "Generate a unique random salt for every individual password",
      },
      {
        mistake: "Setting cost factor too low",
        why: "Cost factor 4 means only 16 iterations -- barely slower than a plain hash",
        solution: "Set cost factor so that hashing takes 100-250ms on your server hardware (typically cost 10-12 for bcrypt)",
      },
    ],
  },

  furtherLearning: {
    title: "Further Learning",
    resources: [
      {
        type: "Guide",
        name: "OWASP Password Storage Cheat Sheet",
        description: "Industry best practices for secure password storage with specific recommendations",
        url: "https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html",
      },
      {
        type: "Standard",
        name: "Argon2 RFC 9106",
        description: "The official specification for Argon2, the recommended password hashing algorithm",
        url: "https://datatracker.ietf.org/doc/html/rfc9106",
      },
      {
        type: "Article",
        name: "How To Safely Store A Password",
        description: "Coda Hale's seminal article on why bcrypt matters",
        url: "https://codahale.com/how-to-safely-store-a-password/",
      },
    ],
  },
};
