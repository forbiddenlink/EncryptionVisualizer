/**
 * TLS Handshake Simulation Test Suite
 * Tests for TLS 1.3 handshake step generation
 */
import { describe, it, expect } from 'vitest';
import { simulateTLSHandshake } from './tls';

describe('TLS Handshake Simulation', () => {
  describe('simulateTLSHandshake', () => {
    it('generates 8 steps', () => {
      const session = simulateTLSHandshake();
      expect(session.steps).toHaveLength(8);
    });

    it('step types are in correct order', () => {
      const session = simulateTLSHandshake();
      const expectedTypes = [
        'client-hello',
        'server-hello',
        'key-share',
        'derive-keys',
        'certificate',
        'verify',
        'finished',
        'application-data',
      ];
      expect(session.steps.map((s) => s.type)).toEqual(expectedTypes);
    });

    it('steps have incrementing step numbers', () => {
      const session = simulateTLSHandshake();
      for (let i = 0; i < session.steps.length; i++) {
        expect(session.steps[i].stepNumber).toBe(i);
      }
    });

    it('each step has required properties', () => {
      const session = simulateTLSHandshake();
      session.steps.forEach((step) => {
        expect(step).toHaveProperty('stepNumber');
        expect(step).toHaveProperty('type');
        expect(step).toHaveProperty('title');
        expect(step).toHaveProperty('description');
        expect(step).toHaveProperty('actor');
      });
    });

    it('client-hello step has client actor', () => {
      const session = simulateTLSHandshake();
      expect(session.steps[0].actor).toBe('client');
    });

    it('server-hello step has server actor', () => {
      const session = simulateTLSHandshake();
      expect(session.steps[1].actor).toBe('server');
    });

    it('key-share and derive-keys have both actor', () => {
      const session = simulateTLSHandshake();
      expect(session.steps[2].actor).toBe('both');
      expect(session.steps[3].actor).toBe('both');
    });

    it('certificate and verify steps have server actor', () => {
      const session = simulateTLSHandshake();
      expect(session.steps[4].actor).toBe('server');
      expect(session.steps[5].actor).toBe('server');
    });

    it('session contains required fields', () => {
      const session = simulateTLSHandshake();
      expect(session.clientRandom).toBeDefined();
      expect(typeof session.clientRandom).toBe('string');
      expect(session.serverRandom).toBeDefined();
      expect(typeof session.serverRandom).toBe('string');
      expect(session.cipherSuite).toBe('TLS_AES_128_GCM_SHA256');
      expect(typeof session.sharedSecret).toBe('number');
      expect(typeof session.masterSecret).toBe('string');
    });

    it('clientRandom and serverRandom are hex strings of expected length', () => {
      const session = simulateTLSHandshake();
      // 32 bytes -> 64 hex chars
      expect(session.clientRandom).toHaveLength(64);
      expect(session.serverRandom).toHaveLength(64);
      expect(session.clientRandom).toMatch(/^[0-9a-f]+$/);
      expect(session.serverRandom).toMatch(/^[0-9a-f]+$/);
    });

    it('encrypted steps have dataExchanged with encrypted=true', () => {
      const session = simulateTLSHandshake();
      const certStep = session.steps.find((s) => s.type === 'certificate');
      expect(certStep?.dataExchanged?.encrypted).toBe(true);
    });

    it('client-hello is not encrypted', () => {
      const session = simulateTLSHandshake();
      expect(session.steps[0].dataExchanged?.encrypted).toBe(false);
    });

    it('sharedSecret is a positive number', () => {
      const session = simulateTLSHandshake();
      expect(session.sharedSecret).toBeGreaterThan(0);
    });
  });
});
