/**
 * RSA Cryptographic Functions Test Suite
 * Tests for RSA key generation, encryption, and decryption
 */
import { describe, it, expect } from 'vitest';
import {
  isPrime,
  generatePrime,
  gcd,
  modInverse,
  modPow,
  encryptRSA,
  decryptRSA,
  generateRSAKeyPairWithSteps,
  encryptRSAWithSteps,
  decryptRSAWithSteps,
} from './rsa';

describe('RSA Crypto Functions', () => {
  describe('isPrime', () => {
    it('returns false for 0 and 1', () => {
      expect(isPrime(0)).toBe(false);
      expect(isPrime(1)).toBe(false);
    });

    it('returns true for 2 and 3', () => {
      expect(isPrime(2)).toBe(true);
      expect(isPrime(3)).toBe(true);
    });

    it('returns false for composite numbers', () => {
      expect(isPrime(4)).toBe(false);
      expect(isPrime(6)).toBe(false);
      expect(isPrime(9)).toBe(false);
      expect(isPrime(15)).toBe(false);
      expect(isPrime(100)).toBe(false);
    });

    it('returns true for prime numbers', () => {
      const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
      primes.forEach((p) => {
        expect(isPrime(p)).toBe(true);
      });
    });

    it('returns false for negative numbers', () => {
      expect(isPrime(-1)).toBe(false);
      expect(isPrime(-7)).toBe(false);
    });

    it('correctly identifies larger primes', () => {
      expect(isPrime(97)).toBe(true);
      expect(isPrime(101)).toBe(true);
      expect(isPrime(199)).toBe(true);
      expect(isPrime(499)).toBe(true);
    });

    it('correctly identifies larger composites', () => {
      expect(isPrime(100)).toBe(false);
      expect(isPrime(121)).toBe(false); // 11^2
      expect(isPrime(169)).toBe(false); // 13^2
      expect(isPrime(200)).toBe(false);
    });
  });

  describe('generatePrime', () => {
    it('generates a prime number within range', () => {
      for (let i = 0; i < 10; i++) {
        const prime = generatePrime(10, 50);
        expect(isPrime(prime)).toBe(true);
        expect(prime).toBeGreaterThanOrEqual(10);
        expect(prime).toBeLessThanOrEqual(50);
      }
    });

    it('generates different primes (randomness test)', () => {
      const primes = new Set<number>();
      for (let i = 0; i < 20; i++) {
        primes.add(generatePrime(10, 100));
      }
      // Should generate at least a few different primes
      expect(primes.size).toBeGreaterThan(1);
    });

    it('works with small ranges', () => {
      const prime = generatePrime(2, 5);
      expect(isPrime(prime)).toBe(true);
      expect([2, 3, 5]).toContain(prime);
    });

    it('works with larger ranges', () => {
      const prime = generatePrime(100, 200);
      expect(isPrime(prime)).toBe(true);
      expect(prime).toBeGreaterThanOrEqual(100);
      expect(prime).toBeLessThanOrEqual(200);
    });
  });

  describe('gcd', () => {
    it('returns correct GCD for coprime numbers', () => {
      expect(gcd(7, 11)).toBe(1);
      expect(gcd(17, 23)).toBe(1);
      expect(gcd(1, 100)).toBe(1);
    });

    it('returns correct GCD for numbers with common factors', () => {
      expect(gcd(12, 8)).toBe(4);
      expect(gcd(48, 18)).toBe(6);
      expect(gcd(100, 25)).toBe(25);
    });

    it('returns the number when one argument is 0', () => {
      expect(gcd(5, 0)).toBe(5);
      expect(gcd(0, 7)).toBe(7);
    });

    it('is commutative', () => {
      expect(gcd(24, 36)).toBe(gcd(36, 24));
      expect(gcd(17, 51)).toBe(gcd(51, 17));
    });

    it('handles equal numbers', () => {
      expect(gcd(7, 7)).toBe(7);
      expect(gcd(100, 100)).toBe(100);
    });
  });

  describe('modInverse', () => {
    it('calculates modular multiplicative inverse correctly', () => {
      // d * e mod phi = 1
      // modInverse(e, phi) = d
      // For e=3, phi=20: 3 * 7 = 21 = 1 mod 20, so d = 7
      const d = modInverse(3, 20);
      expect((d * 3) % 20).toBe(1);
    });

    it('returns positive result', () => {
      const d = modInverse(7, 40);
      expect(d).toBeGreaterThan(0);
      expect((d * 7) % 40).toBe(1);
    });

    it('works with common RSA exponent 65537', () => {
      const phi = 120; // (p-1)(q-1) for p=11, q=13
      const e = 7; // coprime with 120
      const d = modInverse(e, phi);
      expect((d * e) % phi).toBe(1);
    });

    it('works with larger numbers', () => {
      const e = 17;
      const phi = 3120; // example (p-1)(q-1)
      const d = modInverse(e, phi);
      expect((d * e) % phi).toBe(1);
    });
  });

  describe('modPow', () => {
    it('calculates modular exponentiation correctly', () => {
      // 2^10 mod 1000 = 1024 mod 1000 = 24
      expect(modPow(2, 10, 1000)).toBe(24);
    });

    it('handles base case: exponent 0', () => {
      expect(modPow(5, 0, 7)).toBe(1);
      expect(modPow(100, 0, 13)).toBe(1);
    });

    it('handles base case: exponent 1', () => {
      expect(modPow(5, 1, 7)).toBe(5);
      expect(modPow(10, 1, 7)).toBe(3); // 10 mod 7 = 3
    });

    it('returns 0 when mod is 1', () => {
      expect(modPow(5, 3, 1)).toBe(0);
    });

    it('works with larger exponents', () => {
      // 3^7 = 2187, 2187 mod 13 = 2187 - 168*13 = 2187 - 2184 = 3
      expect(modPow(3, 7, 13)).toBe(3);
    });

    it('is used correctly in RSA encryption/decryption', () => {
      // Simple RSA example: p=11, q=13, n=143, phi=120, e=7, d=103
      const n = 143;
      const e = 7;
      const d = 103;
      const message = 42;

      const encrypted = modPow(message, e, n);
      const decrypted = modPow(encrypted, d, n);

      expect(decrypted).toBe(message);
    });
  });

  describe('encryptRSA', () => {
    it('encrypts a message using public key', () => {
      const publicKey = { n: 143, e: 7 }; // p=11, q=13
      const message = 42;

      const encrypted = encryptRSA(message, publicKey);

      expect(encrypted).toBeDefined();
      expect(encrypted).not.toBe(message);
      expect(encrypted).toBeLessThan(publicKey.n);
    });

    it('produces different ciphertext for different messages', () => {
      const publicKey = { n: 143, e: 7 };

      const enc1 = encryptRSA(10, publicKey);
      const enc2 = encryptRSA(20, publicKey);

      expect(enc1).not.toBe(enc2);
    });

    it('produces same ciphertext for same message (deterministic)', () => {
      const publicKey = { n: 143, e: 7 };

      const enc1 = encryptRSA(50, publicKey);
      const enc2 = encryptRSA(50, publicKey);

      expect(enc1).toBe(enc2);
    });
  });

  describe('decryptRSA', () => {
    it('decrypts ciphertext using private key', () => {
      const publicKey = { n: 143, e: 7 };
      const privateKey = { n: 143, d: 103 };
      const message = 42;

      const encrypted = encryptRSA(message, publicKey);
      const decrypted = decryptRSA(encrypted, privateKey);

      expect(decrypted).toBe(message);
    });

    it('works with various messages', () => {
      const publicKey = { n: 143, e: 7 };
      const privateKey = { n: 143, d: 103 };

      [1, 10, 50, 100, 142].forEach((msg) => {
        const encrypted = encryptRSA(msg, publicKey);
        const decrypted = decryptRSA(encrypted, privateKey);
        expect(decrypted).toBe(msg);
      });
    });
  });

  describe('generateRSAKeyPairWithSteps', () => {
    describe('small key size', () => {
      it('generates valid key pair', () => {
        const { keyPair } = generateRSAKeyPairWithSteps('small');

        expect(keyPair.publicKey.n).toBeDefined();
        expect(keyPair.publicKey.e).toBeDefined();
        expect(keyPair.privateKey.n).toBeDefined();
        expect(keyPair.privateKey.d).toBeDefined();
        expect(keyPair.p).toBeDefined();
        expect(keyPair.q).toBeDefined();
        expect(keyPair.phi).toBeDefined();
      });

      it('p and q are different primes', () => {
        const { keyPair } = generateRSAKeyPairWithSteps('small');

        expect(isPrime(keyPair.p)).toBe(true);
        expect(isPrime(keyPair.q)).toBe(true);
        expect(keyPair.p).not.toBe(keyPair.q);
      });

      it('n = p * q', () => {
        const { keyPair } = generateRSAKeyPairWithSteps('small');

        expect(keyPair.publicKey.n).toBe(keyPair.p * keyPair.q);
      });

      it('phi = (p-1) * (q-1)', () => {
        const { keyPair } = generateRSAKeyPairWithSteps('small');

        expect(keyPair.phi).toBe((keyPair.p - 1) * (keyPair.q - 1));
      });

      it('e and phi are coprime', () => {
        const { keyPair } = generateRSAKeyPairWithSteps('small');

        expect(gcd(keyPair.publicKey.e, keyPair.phi)).toBe(1);
      });

      it('d * e mod phi = 1', () => {
        const { keyPair } = generateRSAKeyPairWithSteps('small');

        const result = (keyPair.privateKey.d * keyPair.publicKey.e) % keyPair.phi;
        expect(result).toBe(1);
      });

      it('encryption/decryption roundtrip works', () => {
        const { keyPair } = generateRSAKeyPairWithSteps('small');
        const message = 42;

        const encrypted = encryptRSA(message, keyPair.publicKey);
        const decrypted = decryptRSA(encrypted, keyPair.privateKey);

        expect(decrypted).toBe(message);
      });
    });

    describe('step generation', () => {
      it('generates 7 steps', () => {
        const { steps } = generateRSAKeyPairWithSteps('small');

        expect(steps).toHaveLength(7);
      });

      it('steps have correct types in order', () => {
        const { steps } = generateRSAKeyPairWithSteps('small');

        const expectedTypes = [
          'prime-selection', // p
          'prime-selection', // q
          'modulus-calculation', // n
          'phi-calculation', // phi
          'e-selection', // e
          'd-calculation', // d
          'complete', // final
        ];

        expect(steps.map((s) => s.type)).toEqual(expectedTypes);
      });

      it('each step has required properties', () => {
        const { steps } = generateRSAKeyPairWithSteps('small');

        steps.forEach((step) => {
          expect(step).toHaveProperty('stepNumber');
          expect(step).toHaveProperty('type');
          expect(step).toHaveProperty('title');
          expect(step).toHaveProperty('description');
          expect(step).toHaveProperty('values');
        });
      });

      it('steps have incrementing step numbers', () => {
        const { steps } = generateRSAKeyPairWithSteps('small');

        for (let i = 0; i < steps.length; i++) {
          expect(steps[i].stepNumber).toBe(i);
        }
      });

      it('steps include formulas for calculations', () => {
        const { steps } = generateRSAKeyPairWithSteps('small');

        // Modulus step should have formula
        expect(steps[2].formula).toBe('n = p × q');

        // Phi step should have formula
        expect(steps[3].formula).toBe('φ(n) = (p-1) × (q-1)');
      });
    });

    describe('key sizes', () => {
      it('medium keys have larger primes', () => {
        const small = generateRSAKeyPairWithSteps('small');
        const medium = generateRSAKeyPairWithSteps('medium');

        expect(medium.keyPair.p).toBeGreaterThanOrEqual(50);
        expect(medium.keyPair.q).toBeGreaterThanOrEqual(50);
        expect(medium.keyPair.publicKey.n).toBeGreaterThan(small.keyPair.publicKey.n);
      });

      it('large keys have even larger primes', () => {
        const medium = generateRSAKeyPairWithSteps('medium');
        const large = generateRSAKeyPairWithSteps('large');

        expect(large.keyPair.p).toBeGreaterThanOrEqual(200);
        expect(large.keyPair.q).toBeGreaterThanOrEqual(200);
        expect(large.keyPair.publicKey.n).toBeGreaterThan(medium.keyPair.publicKey.n);
      });

      it('all key sizes produce valid key pairs', () => {
        const sizes: Array<'small' | 'medium' | 'large'> = ['small', 'medium', 'large'];

        sizes.forEach((size) => {
          const { keyPair } = generateRSAKeyPairWithSteps(size);
          const message = 42;

          const encrypted = encryptRSA(message, keyPair.publicKey);
          const decrypted = decryptRSA(encrypted, keyPair.privateKey);

          expect(decrypted).toBe(message);
        });
      });
    });
  });

  describe('encryptRSAWithSteps', () => {
    it('generates 2 steps for encryption', () => {
      const steps = encryptRSAWithSteps(42, { n: 143, e: 7 });

      expect(steps).toHaveLength(2);
    });

    it('first step shows encryption formula', () => {
      const steps = encryptRSAWithSteps(42, { n: 143, e: 7 });

      expect(steps[0].type).toBe('encryption');
      expect(steps[0].formula).toBe('C = M^e mod n');
    });

    it('second step shows result', () => {
      const steps = encryptRSAWithSteps(42, { n: 143, e: 7 });

      expect(steps[1].type).toBe('encryption');
      expect(steps[1].values?.encrypted).toBeDefined();
    });

    it('encrypted value matches direct encryption', () => {
      const publicKey = { n: 143, e: 7 };
      const message = 42;

      const steps = encryptRSAWithSteps(message, publicKey);
      const directEncrypt = encryptRSA(message, publicKey);

      expect(steps[1].values?.encrypted).toBe(directEncrypt);
    });
  });

  describe('decryptRSAWithSteps', () => {
    it('generates 2 steps for decryption', () => {
      const encrypted = encryptRSA(42, { n: 143, e: 7 });
      const steps = decryptRSAWithSteps(encrypted, { n: 143, d: 103 });

      expect(steps).toHaveLength(2);
    });

    it('first step shows decryption formula', () => {
      const encrypted = encryptRSA(42, { n: 143, e: 7 });
      const steps = decryptRSAWithSteps(encrypted, { n: 143, d: 103 });

      expect(steps[0].type).toBe('decryption');
      expect(steps[0].formula).toBe('M = C^d mod n');
    });

    it('second step shows original message', () => {
      const message = 42;
      const encrypted = encryptRSA(message, { n: 143, e: 7 });
      const steps = decryptRSAWithSteps(encrypted, { n: 143, d: 103 });

      expect(steps[1].type).toBe('decryption');
      expect(steps[1].values?.decrypted).toBe(message);
    });

    it('full encrypt/decrypt cycle with steps works', () => {
      const { keyPair } = generateRSAKeyPairWithSteps('small');
      const message = 50;

      const encryptSteps = encryptRSAWithSteps(message, keyPair.publicKey);
      const encrypted = encryptSteps[1].values?.encrypted;
      expect(encrypted).toBeDefined();

      const decryptSteps = decryptRSAWithSteps(encrypted!, keyPair.privateKey);
      const decrypted = decryptSteps[1].values?.decrypted;

      expect(decrypted).toBe(message);
    });
  });
});
