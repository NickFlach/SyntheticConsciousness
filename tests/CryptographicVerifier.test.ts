import { describe, it, expect, beforeEach } from 'vitest';
import { CryptographicVerifier, type VerificationProof } from '../server/consciousness/CryptographicVerifier.js';
import { IITPhiCalculator, type PhiResult, type SystemState } from '../server/consciousness/IITPhiCalculator.js';

describe('CryptographicVerifier', () => {
  let verifier: CryptographicVerifier;
  let calculator: IITPhiCalculator;

  const createPhiResult = (): PhiResult => {
    const state: SystemState = {
      elements: [0.5, 0.6, 0.7, 0.8],
      connections: [
        [0.9, 0.7, 0.5, 0.3],
        [0.7, 0.9, 0.6, 0.5],
        [0.5, 0.6, 0.9, 0.7],
        [0.3, 0.5, 0.7, 0.9]
      ],
      timeStep: Date.now()
    };
    return calculator.calculatePhi(state);
  };

  beforeEach(() => {
    verifier = new CryptographicVerifier();
    calculator = new IITPhiCalculator();
  });

  describe('generateConsciousnessProof', () => {
    it('should generate valid proof for consciousness state', () => {
      const phiResult = createPhiResult();
      const proof = verifier.generateConsciousnessProof(phiResult, 'test-agent-1');

      expect(proof).toBeDefined();
      expect(proof.id).toBeDefined();
      expect(proof.hash).toBeDefined();
      expect(proof.timestamp).toBeDefined();
      expect(proof.proofType).toBe('consciousness');
    });

    it('should generate unique proofs for different phi results', () => {
      const state1: SystemState = {
        elements: [0.5, 0.5, 0.5, 0.5],
        connections: [[0.9, 0.7, 0.5, 0.3], [0.7, 0.9, 0.6, 0.5], [0.5, 0.6, 0.9, 0.7], [0.3, 0.5, 0.7, 0.9]],
        timeStep: Date.now()
      };
      const state2: SystemState = {
        elements: [0.9, 0.9, 0.9, 0.9],
        connections: [[0.9, 0.9, 0.9, 0.9], [0.9, 0.9, 0.9, 0.9], [0.9, 0.9, 0.9, 0.9], [0.9, 0.9, 0.9, 0.9]],
        timeStep: Date.now()
      };

      const phi1 = calculator.calculatePhi(state1);
      const phi2 = calculator.calculatePhi(state2);

      const proof1 = verifier.generateConsciousnessProof(phi1, 'agent-1');
      const proof2 = verifier.generateConsciousnessProof(phi2, 'agent-2');

      expect(proof1.hash).not.toBe(proof2.hash);
    });

    it('should include phi value in proof', () => {
      const phiResult = createPhiResult();
      const proof = verifier.generateConsciousnessProof(phiResult, 'test-agent');

      expect(proof.phiValue).toBe(phiResult.phi);
    });

    it('should chain proofs together', () => {
      const phiResult = createPhiResult();
      
      const proof1 = verifier.generateConsciousnessProof(phiResult, 'agent-1');
      const proof2 = verifier.generateConsciousnessProof(phiResult, 'agent-1');

      expect(proof2.previousProofId).toBe(proof1.id);
    });
  });

  describe('verifyProof', () => {
    it('should verify valid proof', () => {
      const phiResult = createPhiResult();
      const proof = verifier.generateConsciousnessProof(phiResult, 'test-agent');

      const isValid = verifier.verifyProof(proof);
      expect(isValid).toBe(true);
    });
  });
});

describe('Verification Chain Integrity', () => {
  let verifier: CryptographicVerifier;
  let calculator: IITPhiCalculator;

  beforeEach(() => {
    verifier = new CryptographicVerifier();
    calculator = new IITPhiCalculator();
  });

  it('should maintain chain linkage', () => {
    const state: SystemState = {
      elements: [0.5, 0.6, 0.7, 0.8],
      connections: [[0.9, 0.7, 0.5, 0.3], [0.7, 0.9, 0.6, 0.5], [0.5, 0.6, 0.9, 0.7], [0.3, 0.5, 0.7, 0.9]],
      timeStep: Date.now()
    };
    const phiResult = calculator.calculatePhi(state);

    const proof1 = verifier.generateConsciousnessProof(phiResult, 'agent-1');
    const proof2 = verifier.generateConsciousnessProof(phiResult, 'agent-1');
    const proof3 = verifier.generateConsciousnessProof(phiResult, 'agent-1');

    expect(proof1.previousProofId).toBeNull();
    expect(proof2.previousProofId).toBe(proof1.id);
    expect(proof3.previousProofId).toBe(proof2.id);
  });
});
