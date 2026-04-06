export const ROUTES = {
  HOME: '/',
  AES: '/aes',
  RSA: '/rsa',
  BLOCK_MODES: '/block-modes',
  DIFFIE_HELLMAN: '/diffie-hellman',
  HASHING: '/hashing',
  SIGNATURES: '/signatures',
  COMPARE: '/compare',
  GLOSSARY: '/glossary',
  ABOUT: '/about',
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
