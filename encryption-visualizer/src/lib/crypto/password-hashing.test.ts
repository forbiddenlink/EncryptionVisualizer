/**
 * Password Hashing Functions Test Suite
 * Tests for iterated hashing, salt generation, and verification
 */
import { describe, it, expect } from 'vitest';
import {
  generateSalt,
  iteratedHash,
  fastHash,
  demonstrateSaltPurpose,
  demonstrateWorkFactor,
  verifyPassword,
  passwordHashWithSteps,
} from './password-hashing';

describe('Password Hashing Functions', () => {
  describe('generateSalt', () => {
    it('generates deterministic salt with seed', () => {
      const salt1 = generateSalt('test-seed');
      const salt2 = generateSalt('test-seed');
      expect(salt1).toBe(salt2);
    });

    it('different seeds produce different salts', () => {
      const salt1 = generateSalt('seed-a');
      const salt2 = generateSalt('seed-b');
      expect(salt1).not.toBe(salt2);
    });

    it('salt has consistent length', () => {
      const salt = generateSalt('test');
      expect(salt.length).toBeGreaterThan(0);
      // simpleHash returns 8-char hex, sliced to 16 but hash output may be shorter
      expect(salt.length).toBeLessThanOrEqual(16);
    });

    it('generates salt without seed (pseudo-random)', () => {
      const salt = generateSalt();
      expect(typeof salt).toBe('string');
      expect(salt.length).toBe(16);
    });
  });

  describe('iteratedHash', () => {
    it('same password + same salt = same hash', () => {
      const { hash: h1 } = iteratedHash('password', 'salt123', 10);
      const { hash: h2 } = iteratedHash('password', 'salt123', 10);
      expect(h1).toBe(h2);
    });

    it('same password + different salt = different hash', () => {
      const { hash: h1 } = iteratedHash('password', 'salt-a', 10);
      const { hash: h2 } = iteratedHash('password', 'salt-b', 10);
      expect(h1).not.toBe(h2);
    });

    it('different passwords = different hashes', () => {
      const { hash: h1 } = iteratedHash('password1', 'salt', 10);
      const { hash: h2 } = iteratedHash('password2', 'salt', 10);
      expect(h1).not.toBe(h2);
    });

    it('returns intermediate hashes', () => {
      const { intermediates } = iteratedHash('pass', 'salt', 10);
      expect(intermediates.length).toBeGreaterThan(0);
    });

    it('higher iterations produces different hash', () => {
      const { hash: h1 } = iteratedHash('pass', 'salt', 5);
      const { hash: h2 } = iteratedHash('pass', 'salt', 10);
      expect(h1).not.toBe(h2);
    });
  });

  describe('fastHash', () => {
    it('produces consistent output', () => {
      expect(fastHash('pass', 'salt')).toBe(fastHash('pass', 'salt'));
    });

    it('different inputs produce different outputs', () => {
      expect(fastHash('a', 'salt')).not.toBe(fastHash('b', 'salt'));
    });
  });

  describe('verifyPassword', () => {
    it('returns true for correct password', () => {
      const password = 'mypassword';
      const salt = generateSalt('test');
      const iterations = 10;
      const { hash } = iteratedHash(password, salt, iterations);
      expect(verifyPassword(password, salt, hash, iterations)).toBe(true);
    });

    it('returns false for wrong password', () => {
      const salt = generateSalt('test');
      const iterations = 10;
      const { hash } = iteratedHash('correct', salt, iterations);
      expect(verifyPassword('wrong', salt, hash, iterations)).toBe(false);
    });
  });

  describe('demonstrateSaltPurpose', () => {
    it('same password with different salts produces different hashes', () => {
      const result = demonstrateSaltPurpose('password');
      expect(result.hash1).not.toBe(result.hash2);
      expect(result.hash2).not.toBe(result.hash3);
      expect(result.hash1).not.toBe(result.hash3);
    });

    it('each salt is unique', () => {
      const result = demonstrateSaltPurpose('password');
      const salts = new Set([result.salt1, result.salt2, result.salt3]);
      expect(salts.size).toBe(3);
    });

    it('noSalt hash is different from salted hashes', () => {
      const result = demonstrateSaltPurpose('password');
      expect(result.noSalt).not.toBe(result.hash1);
    });
  });

  describe('demonstrateWorkFactor', () => {
    it('returns entries for each cost factor', () => {
      const results = demonstrateWorkFactor('pass', 'salt', [1, 2, 3]);
      expect(results).toHaveLength(3);
    });

    it('higher cost means more iterations', () => {
      const results = demonstrateWorkFactor('pass', 'salt', [1, 2, 3]);
      expect(results[0].iterations).toBe(2);
      expect(results[1].iterations).toBe(4);
      expect(results[2].iterations).toBe(8);
    });

    it('different cost factors produce different hashes', () => {
      const results = demonstrateWorkFactor('pass', 'salt', [1, 2]);
      expect(results[0].hash).not.toBe(results[1].hash);
    });
  });

  describe('passwordHashWithSteps', () => {
    it('generates steps with correct first and last types', () => {
      const steps = passwordHashWithSteps('password', 2);
      expect(steps[0].type).toBe('input');
      expect(steps[steps.length - 1].type).toBe('verify');
      expect(steps[steps.length - 2].type).toBe('output');
    });

    it('each step has required properties', () => {
      const steps = passwordHashWithSteps('test', 1);
      steps.forEach((step) => {
        expect(step).toHaveProperty('stepNumber');
        expect(step).toHaveProperty('type');
        expect(step).toHaveProperty('title');
        expect(step).toHaveProperty('description');
      });
    });

    it('steps have incrementing step numbers', () => {
      const steps = passwordHashWithSteps('test', 1);
      for (let i = 0; i < steps.length; i++) {
        expect(steps[i].stepNumber).toBe(i);
      }
    });

    it('verify step shows match', () => {
      const steps = passwordHashWithSteps('password', 1);
      const verifyStep = steps.find((s) => s.type === 'verify');
      expect(verifyStep?.values?.match).toContain('YES');
    });

    it('includes salt generation step', () => {
      const steps = passwordHashWithSteps('test', 1);
      const saltStep = steps.find((s) => s.type === 'generate-salt');
      expect(saltStep).toBeDefined();
      expect(saltStep?.values?.salt).toBeDefined();
    });

    it('includes stretch iterations', () => {
      const steps = passwordHashWithSteps('test', 2);
      const stretchSteps = steps.filter((s) => s.type === 'stretch');
      expect(stretchSteps.length).toBeGreaterThan(0);
    });
  });
});
