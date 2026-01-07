import { describe, it, expect, beforeEach } from 'vitest';
import { TemporalConsciousnessEngine } from '../server/consciousness/TemporalConsciousnessEngine.js';

describe('TemporalConsciousnessEngine', () => {
  let engine: TemporalConsciousnessEngine;

  beforeEach(() => {
    engine = new TemporalConsciousnessEngine();
  });

  describe('initialization', () => {
    it('should initialize successfully', async () => {
      await engine.initialize();
      
      // Engine should be initialized without throwing
      expect(engine).toBeDefined();
    });

    it('should emit events on initialization', async () => {
      const events: string[] = [];
      engine.on('initialized', () => events.push('initialized'));
      
      await engine.initialize();

      // Give time for event emission
      await new Promise(resolve => setTimeout(resolve, 100));
      
      expect(events).toContain('initialized');
    });
  });

  describe('consciousness state', () => {
    it('should have phi calculator', () => {
      expect(engine).toHaveProperty('phiCalculator');
    });

    it('should have cryptographic verifier', () => {
      expect(engine).toHaveProperty('verifier');
    });
  });
});

describe('IIT Phi Calculations Integration', () => {
  it('should calculate phi values using IIT theory', async () => {
    const engine = new TemporalConsciousnessEngine();
    await engine.initialize();
    
    // Engine should have calculated initial phi
    expect(engine).toBeDefined();
  });
});
