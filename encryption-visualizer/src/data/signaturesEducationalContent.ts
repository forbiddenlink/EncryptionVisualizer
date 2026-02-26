export const signaturesEducationalContent = {
  whatIsSignature: {
    title: "What is a Digital Signature?",
    content: "A digital signature is a mathematical technique used to validate the authenticity and integrity of a message. Unlike encryption (which hides data), signatures prove WHO sent a message and that it hasn't been TAMPERED with. It's like a handwritten signature, but impossible to forge.",
    icon: "info",
  },

  howSigningWorks: {
    title: "How Signing Works",
    steps: [
      {
        name: "1. Hash the Message",
        description: "Create a fixed-size 'fingerprint' of the message",
        detail: "The hash uniquely represents the message content",
        color: "#10B981", // Emerald
      },
      {
        name: "2. Encrypt with Private Key",
        description: "Sign the hash using your PRIVATE key",
        detail: "Only you can create this signature (you have the private key)",
        color: "#F59E0B", // Amber
      },
      {
        name: "3. Attach Signature",
        description: "Send the message with the signature attached",
        detail: "The signature proves authenticity without hiding the message",
        color: "#8B5CF6", // Violet
      },
      {
        name: "4. Anyone Can Verify",
        description: "Recipients verify using your PUBLIC key",
        detail: "Public key decrypts the signature to reveal the original hash",
        color: "#3B82F6", // Blue
      },
    ],
  },

  howVerificationWorks: {
    title: "How Verification Works",
    steps: [
      {
        name: "1. Receive Message + Signature",
        description: "Get the message and its attached signature",
        detail: "Both pieces are needed for verification",
        color: "#3B82F6", // Blue
      },
      {
        name: "2. Hash the Message",
        description: "Compute the hash of the received message",
        detail: "This gives you the expected hash value",
        color: "#10B981", // Emerald
      },
      {
        name: "3. Decrypt the Signature",
        description: "Use sender's PUBLIC key to decrypt",
        detail: "This reveals the hash that was originally signed",
        color: "#F59E0B", // Amber
      },
      {
        name: "4. Compare Hashes",
        description: "If hashes match, signature is valid!",
        detail: "A match proves authenticity and integrity",
        color: "#22C55E", // Green
      },
    ],
  },

  securityProperties: {
    title: "Security Properties",
    notes: [
      {
        type: "strength",
        text: "Authentication: Proves the message came from the claimed sender (only they have the private key).",
      },
      {
        type: "strength",
        text: "Integrity: Any change to the message invalidates the signature (hash will differ).",
      },
      {
        type: "strength",
        text: "Non-repudiation: Signer cannot deny signing (mathematical proof exists).",
      },
      {
        type: "warning",
        text: "The signature does NOT hide the message. Use encryption for confidentiality.",
      },
      {
        type: "info",
        text: "Often combined with encryption: sign-then-encrypt for confidentiality + authenticity.",
      },
    ],
  },

  realWorldUse: {
    title: "Real-World Uses",
    examples: [
      {
        name: "Code Signing",
        description: "Software updates are signed to prove they came from the developer, not malware.",
        icon: "code",
      },
      {
        name: "HTTPS/TLS Certificates",
        description: "Websites prove their identity with certificate signatures.",
        icon: "globe",
      },
      {
        name: "Document Signing",
        description: "Legal contracts, PDFs, and official documents use digital signatures.",
        icon: "file",
      },
      {
        name: "Blockchain & Crypto",
        description: "Every Bitcoin transaction is signed to prove ownership of funds.",
        icon: "bitcoin",
      },
      {
        name: "Email (S/MIME, PGP)",
        description: "Signed emails prove the sender's identity and message integrity.",
        icon: "mail",
      },
    ],
  },

  commonMistakes: {
    title: "Common Mistakes to Avoid",
    mistakes: [
      {
        mistake: "Confusing signing with encrypting",
        why: "Signing proves authenticity; encrypting hides content. They're different operations!",
        solution: "Use signing for proof of identity, encryption for confidentiality, or both together",
      },
      {
        mistake: "Using the wrong key",
        why: "Sign with PRIVATE key (only you have it), verify with PUBLIC key (anyone can verify)",
        solution: "Remember: Private to sign, Public to verify (opposite of encryption)",
      },
      {
        mistake: "Signing the message directly",
        why: "RSA can only sign data smaller than the modulus; large messages would fail",
        solution: "Always hash the message first, then sign the hash",
      },
      {
        mistake: "Ignoring timestamp/expiration",
        why: "Old signatures can be replayed; no proof of when signing occurred",
        solution: "Include timestamps and use certificate expiration in production systems",
      },
    ],
  },

  furtherLearning: {
    title: "Want to Learn More?",
    resources: [
      {
        type: "Standard",
        name: "NIST Digital Signature Standard",
        description: "Official U.S. government standard for digital signatures (DSS/FIPS 186)",
        url: "https://csrc.nist.gov/publications/detail/fips/186/5/final",
      },
      {
        type: "Interactive",
        name: "How HTTPS Works",
        description: "Visual explanation of TLS certificates and signatures",
        url: "https://howhttps.works/",
      },
      {
        type: "Video",
        name: "Public Key Cryptography",
        description: "Computerphile's accessible explanation of digital signatures",
        url: "https://www.youtube.com/watch?v=GSIDS_lvRv4",
      },
    ],
  },

  signingVsEncrypting: {
    title: "Signing vs Encrypting",
    comparison: [
      {
        aspect: "Purpose",
        signing: "Prove identity & integrity",
        encrypting: "Hide message content",
      },
      {
        aspect: "Private Key Used For",
        signing: "Creating signature",
        encrypting: "Decrypting messages",
      },
      {
        aspect: "Public Key Used For",
        signing: "Verifying signature",
        encrypting: "Encrypting messages",
      },
      {
        aspect: "Message Visibility",
        signing: "Message is readable by anyone",
        encrypting: "Message is hidden",
      },
      {
        aspect: "Who Can Create",
        signing: "Only private key holder",
        encrypting: "Anyone with public key",
      },
      {
        aspect: "Who Can Verify/Read",
        signing: "Anyone with public key",
        encrypting: "Only private key holder",
      },
    ],
  },
};
