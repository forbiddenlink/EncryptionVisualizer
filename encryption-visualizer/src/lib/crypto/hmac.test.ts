/**
 * HMAC Functions Test Suite
 * Tests for HMAC computation, verification, and step generation
 */
import { describe, it, expect } from 'vitest';
import {
  hmac,
  verifyHmac,
  hmacWithSteps,
  demonstrateLengthExtension,
} from './hmac';

describe('HMAC Functions', () => {
  describe('hmac', () => {
    it('produces consistent output for same inputs', () => {
      const result1 = hmac('mykey', 'hello');
      const result2 = hmac('mykey', 'hello');
      expect(result1).toBe(result2);
    });

    it('different keys produce different HMACs', () => {
      const h1 = hmac('key1', 'hello');
      const h2 = hmac('key2', 'hello');
      expect(h1).not.toBe(h2);
    });

    it('different messages produce different HMACs', () => {
      const h1 = hmac('key', 'message1');
      const h2 = hmac('key', 'message2');
      expect(h1).not.toBe(h2);
    });

    it('returns a string', () => {
      const result = hmac('key', 'msg');
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('handles empty message', () => {
      const result = hmac('key', '');
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('handles empty key', () => {
      const result = hmac('', 'message');
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('handles long key (longer than block size)', () => {
      const longKey = 'a'.repeat(100);
      const result = hmac(longKey, 'message');
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('verifyHmac', () => {
    it('returns true for correct key and message', () => {
      const key = 'secret';
      const message = 'test message';
      const tag = hmac(key, message);
      expect(verifyHmac(key, message, tag)).toBe(true);
    });

    it('returns false for wrong key', () => {
      const tag = hmac('correct-key', 'message');
      expect(verifyHmac('wrong-key', 'message', tag)).toBe(false);
    });

    it('returns false for wrong message', () => {
      const tag = hmac('key', 'original');
      expect(verifyHmac('key', 'tampered', tag)).toBe(false);
    });

    it('returns false for wrong tag', () => {
      expect(verifyHmac('key', 'message', 'fakehash')).toBe(false);
    });
  });

  describe('demonstrateLengthExtension', () => {
    it('returns different HMAC for extended message', () => {
      const result = demonstrateLengthExtension('key', 'data');
      expect(result.hmacHash).not.toBe(result.extendedHmacHash);
    });

    it('extended message includes appended data', () => {
      const result = demonstrateLengthExtension('key', 'data');
      expect(result.extendedMessage).toBe('data&admin=true');
    });
  });

  describe('hmacWithSteps', () => {
    it('generates 8 steps', () => {
      const steps = hmacWithSteps('key', 'message');
      expect(steps).toHaveLength(8);
    });

    it('steps have correct types in order', () => {
      const steps = hmacWithSteps('key', 'message');
      const expectedTypes = [
        'input',
        'key-padding',
        'inner-hash',
        'inner-hash',
        'outer-hash',
        'outer-hash',
        'output',
        'verify',
      ];
      expect(steps.map((s) => s.type)).toEqual(expectedTypes);
    });

    it('each step has required properties', () => {
      const steps = hmacWithSteps('key', 'msg');
      steps.forEach((step) => {
        expect(step).toHaveProperty('stepNumber');
        expect(step).toHaveProperty('type');
        expect(step).toHaveProperty('title');
        expect(step).toHaveProperty('description');
      });
    });

    it('steps have incrementing step numbers', () => {
      const steps = hmacWithSteps('key', 'msg');
      for (let i = 0; i < steps.length; i++) {
        expect(steps[i].stepNumber).toBe(i);
      }
    });

    it('output step contains the HMAC value', () => {
      const key = 'testkey';
      const message = 'testmsg';
      const steps = hmacWithSteps(key, message);
      const outputStep = steps.find((s) => s.type === 'output');
      expect(outputStep?.values?.hmac).toBe(hmac(key, message));
    });

    it('verify step shows match for valid input', () => {
      const steps = hmacWithSteps('key', 'msg');
      const verifyStep = steps.find((s) => s.type === 'verify');
      expect(verifyStep?.values?.match).toContain('YES');
    });

    it('key-padding step indicates long key handling', () => {
      const longKey = 'a'.repeat(100);
      const steps = hmacWithSteps(longKey, 'msg');
      const padStep = steps.find((s) => s.type === 'key-padding');
      expect(padStep?.values?.action).toBe('Hashed then padded');
    });

    it('key-padding step indicates short key zero-padding', () => {
      const steps = hmacWithSteps('k', 'msg');
      const padStep = steps.find((s) => s.type === 'key-padding');
      expect(padStep?.values?.action).toBe('Zero-padded');
    });
  });
});
