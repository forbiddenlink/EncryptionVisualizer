export const tlsEducationalContent = {
  whatIsTLS: {
    title: 'What is TLS/SSL?',
    content:
      'TLS (Transport Layer Security) is a cryptographic protocol that provides secure communication over a network. It is the successor to SSL (Secure Sockets Layer). When you see the padlock icon in your browser, TLS is protecting your connection. TLS 1.3 (2018) is the latest version, significantly faster and more secure than TLS 1.2.',
  },

  handshakeSteps: {
    title: 'The TLS 1.3 Handshake',
    steps: [
      {
        name: '1. ClientHello',
        description: 'Client sends supported cipher suites, random nonce, and key share.',
        detail: 'TLS 1.3 includes the key share in the first message, saving a round trip vs TLS 1.2.',
        color: '#3B82F6', // Blue
      },
      {
        name: '2. ServerHello',
        description: 'Server chooses cipher suite and sends its own random and key share.',
        detail: 'After this, both sides can compute the shared secret independently.',
        color: '#8B5CF6', // Violet
      },
      {
        name: '3. Key Derivation',
        description: 'Both sides derive encryption keys from the shared secret using HKDF.',
        detail: 'Separate keys are generated for handshake traffic and application data.',
        color: '#EC4899', // Pink
      },
      {
        name: '4. Certificate & Verify',
        description: 'Server proves its identity with a certificate and signature.',
        detail: 'These messages are encrypted with the handshake keys.',
        color: '#F59E0B', // Amber
      },
      {
        name: '5. Finished & Application Data',
        description: 'Both sides confirm the handshake, then encrypt all application data.',
        detail: 'The entire handshake completes in a single round trip (1-RTT).',
        color: '#10B981', // Emerald
      },
    ],
  },

  algorithmsUsed: {
    title: 'How TLS Uses Other Algorithms',
    algorithms: [
      {
        name: 'Diffie-Hellman (ECDHE)',
        role: 'Key Exchange',
        description:
          'Establishes a shared secret between client and server without transmitting it. TLS 1.3 uses ephemeral keys for every connection, providing forward secrecy.',
        link: '/diffie-hellman',
      },
      {
        name: 'AES-GCM',
        role: 'Symmetric Encryption',
        description:
          'Encrypts all data after the handshake. AES-128-GCM or AES-256-GCM provides both confidentiality and integrity in a single operation.',
        link: '/aes',
      },
      {
        name: 'RSA / ECDSA',
        role: 'Digital Signatures',
        description:
          'Used in certificate verification. The server signs the handshake transcript to prove it owns the certificate\'s private key.',
        link: '/signatures',
      },
      {
        name: 'SHA-256 / SHA-384',
        role: 'Hashing',
        description:
          'Used in key derivation (HKDF), certificate fingerprints, and Finished message MACs. Ensures data integrity throughout the handshake.',
        link: '/sha256',
      },
    ],
  },

  cipherSuites: {
    title: 'Cipher Suites Explained',
    content:
      'A cipher suite is a named combination of algorithms used together. TLS 1.3 drastically simplified cipher suites by fixing the key exchange to (EC)DHE and removing insecure options.',
    suites: [
      {
        name: 'TLS_AES_128_GCM_SHA256',
        description: 'AES-128 in GCM mode with SHA-256 for hashing. Most common choice.',
      },
      {
        name: 'TLS_AES_256_GCM_SHA384',
        description: 'AES-256 in GCM mode with SHA-384. Higher security margin.',
      },
      {
        name: 'TLS_CHACHA20_POLY1305_SHA256',
        description: 'ChaCha20 stream cipher with Poly1305 MAC. Faster on devices without AES hardware acceleration.',
      },
    ],
  },

  certificatesPKI: {
    title: 'Certificate Verification & PKI',
    content:
      'Certificates bind a public key to an identity (like a domain name). They are signed by Certificate Authorities (CAs) that browsers trust. When a server presents a certificate, the client verifies the signature chain up to a trusted root CA.',
    chain: [
      {
        level: 'Root CA',
        description: 'Pre-installed in your OS/browser. Self-signed. Trust anchor.',
      },
      {
        level: 'Intermediate CA',
        description: 'Signed by Root CA. Issues end-entity certificates. Adds a layer of protection.',
      },
      {
        level: 'Server Certificate',
        description: 'Signed by Intermediate CA. Contains the server\'s public key and domain name.',
      },
    ],
  },

  forwardSecrecy: {
    title: 'Forward Secrecy',
    content:
      'Forward secrecy (also called Perfect Forward Secrecy or PFS) means that compromising the server\'s long-term private key does not compromise past session keys. TLS 1.3 achieves this by using ephemeral Diffie-Hellman keys for every connection. Even if an attacker records encrypted traffic and later obtains the server\'s private key, they cannot decrypt past sessions.',
  },

  tlsVersions: {
    title: 'TLS 1.2 vs 1.3 Differences',
    differences: [
      {
        aspect: 'Handshake Speed',
        tls12: '2 round trips (2-RTT)',
        tls13: '1 round trip (1-RTT), with 0-RTT resumption',
      },
      {
        aspect: 'Key Exchange',
        tls12: 'RSA key exchange allowed (no forward secrecy)',
        tls13: 'Only (EC)DHE (always forward secrecy)',
      },
      {
        aspect: 'Cipher Suites',
        tls12: '37+ cipher suites, many insecure',
        tls13: 'Only 5 AEAD cipher suites',
      },
      {
        aspect: 'Encryption',
        tls12: 'Certificate sent in plaintext',
        tls13: 'Certificate encrypted with handshake keys',
      },
      {
        aspect: 'Removed in 1.3',
        tls12: 'RC4, DES, 3DES, MD5, SHA-1, static RSA, CBC mode',
        tls13: 'N/A - all removed',
      },
    ],
  },

  securityNotes: {
    title: 'Security Considerations',
    notes: [
      {
        type: 'strength' as const,
        text: 'TLS 1.3 eliminates entire categories of attacks by removing insecure algorithms and simplifying the protocol.',
      },
      {
        type: 'warning' as const,
        text: 'Man-in-the-middle attacks are prevented by certificate verification. Always check the padlock icon and domain name in your browser.',
      },
      {
        type: 'info' as const,
        text: 'Certificate pinning adds extra protection by hard-coding which certificates or CAs a client trusts for a specific server, preventing rogue CA attacks.',
      },
      {
        type: 'warning' as const,
        text: 'Downgrade attacks try to force TLS 1.2 or lower. TLS 1.3 includes anti-downgrade mechanisms in the ServerHello random value.',
      },
      {
        type: 'strength' as const,
        text: '0-RTT resumption enables faster reconnections but must be used carefully as the early data is not protected against replay attacks.',
      },
    ],
  },

  realWorldUse: {
    title: 'Real-World Applications',
    examples: [
      {
        name: 'HTTPS (Web Browsing)',
        description: 'Every secure website uses TLS. Over 95% of web traffic is now encrypted with TLS.',
        icon: 'globe',
      },
      {
        name: 'Email (SMTP/IMAP)',
        description: 'Email servers use STARTTLS to upgrade connections to TLS, protecting emails in transit.',
        icon: 'file',
      },
      {
        name: 'VPN Protocols',
        description: 'OpenVPN and other VPN solutions use TLS for the control channel to establish secure tunnels.',
        icon: 'terminal',
      },
      {
        name: 'Database Connections',
        description: 'PostgreSQL, MySQL, and other databases support TLS to encrypt client-server communication.',
        icon: 'info',
      },
    ],
  },

  commonMistakes: {
    title: 'Common Mistakes',
    mistakes: [
      {
        mistake: 'Using self-signed certificates in production',
        why: 'Browsers will show security warnings, and users cannot verify your identity through a trusted CA chain.',
        solution: "Use free certificates from Let's Encrypt, or purchase from a trusted CA.",
      },
      {
        mistake: 'Allowing expired certificates',
        why: 'Expired certificates break trust. Browsers will block connections or show scary warnings.',
        solution: 'Set up automated certificate renewal with certbot or your hosting provider.',
      },
      {
        mistake: 'Enabling weak cipher suites',
        why: 'Legacy cipher suites (RC4, DES, export-grade) are broken and allow decryption by attackers.',
        solution: 'Only enable TLS 1.2+ with AEAD cipher suites. Prefer TLS 1.3 wherever possible.',
      },
      {
        mistake: 'Not enabling HSTS',
        why: 'Without HSTS, the first request may be over HTTP, vulnerable to SSL stripping attacks.',
        solution: 'Enable HTTP Strict Transport Security (HSTS) to force all connections over HTTPS.',
      },
    ],
  },

  furtherLearning: {
    title: 'Further Learning',
    resources: [
      {
        type: 'Specification',
        name: 'RFC 8446 - TLS 1.3',
        description: 'The official TLS 1.3 specification defining the protocol in full detail.',
        url: 'https://www.rfc-editor.org/rfc/rfc8446',
      },
      {
        type: 'Interactive Tool',
        name: 'TLS 1.3 Illustrated',
        description: 'Every byte of a TLS 1.3 connection explained and annotated.',
        url: 'https://tls13.xargs.org/',
      },
      {
        type: 'Video',
        name: 'Computerphile: TLS Handshake',
        description: 'Clear visual explanation of how TLS establishes a secure connection.',
        url: 'https://www.youtube.com/watch?v=86cQJ0MMses',
      },
      {
        type: 'Tool',
        name: 'SSL Labs Server Test',
        description: 'Test any website\'s TLS configuration and get a grade with recommendations.',
        url: 'https://www.ssllabs.com/ssltest/',
      },
    ],
  },
};
