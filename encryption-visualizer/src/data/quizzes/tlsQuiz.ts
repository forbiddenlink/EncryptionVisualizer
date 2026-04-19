import type { QuizQuestion } from '@/lib/types';

export const tlsQuizQuestions: QuizQuestion[] = [
  {
    id: 'tls-basics-1',
    question: 'What is the primary purpose of the TLS handshake?',
    options: [
      'To compress data for faster transmission',
      'To establish encryption keys and verify server identity',
      'To route packets to the correct server',
      'To check if the server is online',
    ],
    correct: 1,
    explanation:
      'The TLS handshake establishes shared encryption keys through key exchange and verifies the server\'s identity through certificate verification, enabling secure communication.',
    difficulty: 'beginner',
  },
  {
    id: 'tls-basics-2',
    question: 'What does the padlock icon in your browser indicate?',
    options: [
      'The website has no viruses',
      'The connection is using TLS encryption',
      'The website is government-approved',
      'Your password is stored securely',
    ],
    correct: 1,
    explanation:
      'The padlock indicates that the connection between your browser and the server is encrypted using TLS. It does not guarantee the website itself is trustworthy or virus-free.',
    difficulty: 'beginner',
  },
  {
    id: 'tls-handshake-1',
    question: 'In TLS 1.3, what is included in the ClientHello message?',
    options: [
      'Only the client\'s certificate',
      'Supported cipher suites, random nonce, and key share',
      'The encrypted application data',
      'The server\'s public key',
    ],
    correct: 1,
    explanation:
      'The ClientHello includes supported cipher suites, a random nonce, and the client\'s ephemeral key share. Including the key share in the first message is a TLS 1.3 optimization that saves a round trip.',
    difficulty: 'intermediate',
  },
  {
    id: 'tls-handshake-2',
    question: 'How many round trips does a TLS 1.3 handshake require?',
    options: [
      '0 round trips',
      '1 round trip (1-RTT)',
      '2 round trips (2-RTT)',
      '3 round trips (3-RTT)',
    ],
    correct: 1,
    explanation:
      'TLS 1.3 completes the handshake in 1 round trip (1-RTT), compared to TLS 1.2\'s 2 round trips. TLS 1.3 also supports 0-RTT resumption for returning clients, though with replay protection caveats.',
    difficulty: 'intermediate',
  },
  {
    id: 'tls-cipher-1',
    question: 'What is a cipher suite in TLS?',
    options: [
      'A physical encryption device',
      'A named combination of cryptographic algorithms used together',
      'A list of blocked websites',
      'A type of digital certificate',
    ],
    correct: 1,
    explanation:
      'A cipher suite specifies which algorithms are used for key exchange, encryption, and hashing. For example, TLS_AES_128_GCM_SHA256 uses AES-128 in GCM mode with SHA-256 for hashing.',
    difficulty: 'beginner',
  },
  {
    id: 'tls-cert-1',
    question: 'What does a Certificate Authority (CA) do?',
    options: [
      'Encrypts all web traffic',
      'Signs certificates to verify server identities',
      'Stores users\' passwords',
      'Routes DNS queries',
    ],
    correct: 1,
    explanation:
      'A CA is a trusted entity that verifies domain ownership and signs digital certificates. Browsers ship with a list of trusted root CAs and verify certificate chains back to these roots.',
    difficulty: 'intermediate',
  },
  {
    id: 'tls-fs-1',
    question: 'What is Forward Secrecy?',
    options: [
      'Encrypting data before sending it',
      'Using ephemeral keys so past sessions stay secure even if long-term keys are compromised',
      'Forwarding encrypted data to another server',
      'Caching encryption keys for future use',
    ],
    correct: 1,
    explanation:
      'Forward secrecy means each session uses unique ephemeral Diffie-Hellman keys. If the server\'s long-term private key is later compromised, previously recorded sessions cannot be decrypted.',
    difficulty: 'advanced',
  },
  {
    id: 'tls-version-1',
    question: 'Which key exchange method did TLS 1.3 remove?',
    options: [
      'Diffie-Hellman',
      'Static RSA key exchange',
      'Elliptic Curve Diffie-Hellman',
      'All key exchange methods',
    ],
    correct: 1,
    explanation:
      'TLS 1.3 removed static RSA key exchange because it does not provide forward secrecy. Only ephemeral (EC)DHE key exchange is allowed, ensuring every session generates unique keys.',
    difficulty: 'advanced',
  },
  {
    id: 'tls-security-1',
    question: 'Why is the server certificate encrypted in TLS 1.3 but not in TLS 1.2?',
    options: [
      'TLS 1.2 certificates are smaller',
      'TLS 1.3 derives handshake keys before sending the certificate',
      'TLS 1.2 does not use certificates',
      'Encrypting certificates was not invented until 2018',
    ],
    correct: 1,
    explanation:
      'In TLS 1.3, the key share is sent in the first message, allowing handshake keys to be derived before the certificate is sent. This encrypts the server\'s identity, preventing passive observers from seeing which site you\'re visiting.',
    difficulty: 'advanced',
  },
  {
    id: 'tls-security-2',
    question: 'What is HSTS (HTTP Strict Transport Security)?',
    options: [
      'A cipher suite for high-security environments',
      'A header that forces browsers to always use HTTPS for a domain',
      'A type of certificate pinning',
      'A TLS extension for faster handshakes',
    ],
    correct: 1,
    explanation:
      'HSTS is a security header that tells browsers to only connect to a domain over HTTPS. This prevents SSL stripping attacks where an attacker downgrades the first request from HTTPS to HTTP.',
    difficulty: 'intermediate',
  },
  {
    id: 'tls-algorithms-1',
    question: 'Which algorithm does TLS use for key derivation?',
    options: [
      'AES-GCM',
      'HKDF (HMAC-based Key Derivation Function)',
      'RSA encryption',
      'Diffie-Hellman',
    ],
    correct: 1,
    explanation:
      'HKDF takes the Diffie-Hellman shared secret and derives multiple specific keys from it: separate keys for handshake traffic, application data, and each direction of communication.',
    difficulty: 'advanced',
  },
  {
    id: 'tls-practical-1',
    question: 'What should you do if a website\'s TLS certificate has expired?',
    options: [
      'Nothing, expired certificates still work fine',
      'Do not submit sensitive data; the connection may not be trustworthy',
      'Refresh the page to renew the certificate',
      'Switch to a different browser',
    ],
    correct: 1,
    explanation:
      'An expired certificate means the site operator has not renewed it. While the encryption still works technically, you cannot verify the server\'s identity is current, so avoid submitting sensitive information.',
    difficulty: 'beginner',
  },
];
