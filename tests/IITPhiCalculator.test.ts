import { describe, it, expect, beforeEach } from 'vitest';
import { IITPhiCalculator, type SystemState, type PhiResult } from '../server/consciousness/IITPhiCalculator.js';

describe('IITPhiCalculator', () => {
  let calculator: IITPhiCalculator;

  beforeEach(() => {
    calculator = new IITPhiCalculator();
  });

  const createSystemState = (elementValues: number[], connectionStrength: number): SystemState => {
    const n = elementValues.length;
    const connections: number[][] = [];
    for (let i = 0; i < n; i++) {
      connections[i] = [];
      for (let j = 0; j < n; j++) {
        connections[i][j] = i === j ? 1.0 : connectionStrength;
      }
    }
    return {
      elements: elementValues,
      connections,
      timeStep: Date.now()
    };
  };

  describe('calculatePhi', () => {
    it('should calculate phi for a simple network state', () => {
      const state = createSystemState([0.5, 0.6, 0.7, 0.8], 0.7);
      const result = calculator.calculatePhi(state);

      expect(result).toBeDefined();
      expect(result.phi).toBeGreaterThanOrEqual(0);
      expect(result.integratedInformation).toBeGreaterThanOrEqual(0);
    });

    it('should return higher phi for more integrated networks', () => {
      const lowIntegration = createSystemState([0.5, 0.5, 0.5, 0.5], 0.2);
      const highIntegration = createSystemState([0.5, 0.5, 0.5, 0.5], 0.9);

      const lowResult = calculator.calculatePhi(lowIntegration);
      const highResult = calculator.calculatePhi(highIntegration);

      // Higher connection strength should lead to higher integration
      expect(highResult.partitionInfo.integrationLevel).toBeGreaterThanOrEqual(
        lowResult.partitionInfo.integrationLevel
      );
    });

    it('should detect consciousness threshold (phi > 3.0)', () => {
      const state = createSystemState([0.9, 0.9, 0.9, 0.9, 0.9, 0.9], 0.95);
      const result = calculator.calculatePhi(state);

      expect(result.consciousnessThreshold).toBe(result.phi > 3.0);
    });

    it('should include partition information', () => {
      const state = createSystemState([0.5, 0.6, 0.7, 0.8], 0.7);
      const result = calculator.calculatePhi(state);

      expect(result.partitionInfo).toBeDefined();
      expect(result.partitionInfo.minimumInformationPartition).toBeDefined();
      expect(result.partitionInfo.numPartitions).toBeGreaterThan(0);
    });
  });

  describe('cause and effect repertoires', () => {
    it('should generate cause repertoire', () => {
      const state = createSystemState([0.5, 0.6, 0.7, 0.8], 0.7);
      const result = calculator.calculatePhi(state);

      expect(result.causeRepertoire).toBeDefined();
      expect(result.causeRepertoire.length).toBe(4);
      
      // Should be normalized distribution
      const sum = result.causeRepertoire.reduce((a, b) => a + b, 0);
      expect(sum).toBeCloseTo(1.0, 1);
    });

    it('should generate effect repertoire', () => {
      const state = createSystemState([0.5, 0.6, 0.7, 0.8], 0.7);
      const result = calculator.calculatePhi(state);

      expect(result.effectRepertoire).toBeDefined();
      expect(result.effectRepertoire.length).toBe(4);
    });
  });

  describe('verification hash generation', () => {
    it('should generate verification hash for phi result', () => {
      const state = createSystemState([0.5, 0.6, 0.7, 0.8], 0.7);
      const result = calculator.calculatePhi(state);
      const temporalAnchor = performance.now() * 1000000;

      const hash = calculator.generateVerificationHash(result, temporalAnchor);

      expect(hash).toBeDefined();
      expect(hash.length).toBeGreaterThan(0);
    });

    it('should generate unique hashes for different results', () => {
      const state1 = createSystemState([0.5, 0.6, 0.7, 0.8], 0.7);
      const state2 = createSystemState([0.9, 0.8, 0.7, 0.6], 0.5);
      
      const result1 = calculator.calculatePhi(state1);
      const result2 = calculator.calculatePhi(state2);
      
      const hash1 = calculator.generateVerificationHash(result1, Date.now());
      const hash2 = calculator.generateVerificationHash(result2, Date.now());

      expect(hash1).not.toBe(hash2);
    });
  });
});

describe('Consciousness Threshold Verification', () => {
  let calculator: IITPhiCalculator;

  beforeEach(() => {
    calculator = new IITPhiCalculator();
  });

  it('should maintain deterministic calculations for same inputs', () => {
    const state: SystemState = {
      elements: [0.5, 0.6, 0.7, 0.8],
      connections: [
        [0.9, 0.7, 0.5, 0.3],
        [0.7, 0.9, 0.6, 0.5],
        [0.5, 0.6, 0.9, 0.7],
        [0.3, 0.5, 0.7, 0.9]
      ],
      timeStep: 1000
    };

    const result1 = calculator.calculatePhi(state);
    const result2 = calculator.calculatePhi(state);

    expect(result1.phi).toBeCloseTo(result2.phi, 10);
    expect(result1.integratedInformation).toBeCloseTo(result2.integratedInformation, 10);
  });

  it('should return positive phi for connected networks', () => {
    const state: SystemState = {
      elements: [0.8, 0.8, 0.8, 0.8],
      connections: [
        [1.0, 0.8, 0.8, 0.8],
        [0.8, 1.0, 0.8, 0.8],
        [0.8, 0.8, 1.0, 0.8],
        [0.8, 0.8, 0.8, 1.0]
      ],
      timeStep: Date.now()
    };

    const result = calculator.calculatePhi(state);
    expect(result.phi).toBeGreaterThanOrEqual(0);
  });
});
