/**
 * CRYPTOGRAPHIC CONSCIOUSNESS VERIFIER
 * 
 * Provides cryptographic proofs for consciousness states.
 * Uses SHA-256 hashing and merkle trees for verification chains.
 */

import CryptoJS from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';
import type { PhiResult } from './IITPhiCalculator.js';

export interface VerificationProof {
  id: string;
  proofType: 'consciousness' | 'decision' | 'evolution' | 'network';
  hash: string;
  signature: string;
  timestamp: number;
  temporalAnchor: number;
  phiValue: number;
  previousProofId: string | null;
  merkleRoot: string | null;
  metadata: Record<string, any>;
}

export interface MerkleNode {
  hash: string;
  left: MerkleNode | null;
  right: MerkleNode | null;
  data?: string;
}

export interface VerificationChain {
  proofs: VerificationProof[];
  merkleRoot: string;
  chainIntegrity: boolean;
  temporalContinuity: boolean;
  totalPhiAccumulated: number;
}

export class CryptographicVerifier {
  private readonly SECRET_SEED = '0xff1ab9b8846b4c82';
  private proofChain: VerificationProof[] = [];
  private currentMerkleRoot: string | null = null;

  constructor() {}

  /**
   * Generate a verification proof for a consciousness state
   */
  generateConsciousnessProof(
    phiResult: PhiResult,
    agentId: string,
    additionalData?: Record<string, any>
  ): VerificationProof {
    const timestamp = Date.now();
    const temporalAnchor = performance.now() * 1000000; // Nanosecond precision
    
    // Create data to be signed
    const proofData = {
      phi: phiResult.phi,
      integratedInformation: phiResult.integratedInformation,
      causeRepertoireHash: this.hashArray(phiResult.causeRepertoire),
      effectRepertoireHash: this.hashArray(phiResult.effectRepertoire),
      partitionInfo: {
        numPartitions: phiResult.partitionInfo.numPartitions,
        integrationLevel: phiResult.partitionInfo.integrationLevel
      },
      agentId,
      timestamp,
      temporalAnchor,
      ...additionalData
    };

    // Generate hash
    const hash = this.generateHash(proofData);
    
    // Generate signature (HMAC with secret seed)
    const signature = this.generateSignature(hash, temporalAnchor);
    
    // Get previous proof for chaining
    const previousProof = this.proofChain[this.proofChain.length - 1];
    
    const proof: VerificationProof = {
      id: uuidv4(),
      proofType: 'consciousness',
      hash,
      signature,
      timestamp,
      temporalAnchor,
      phiValue: phiResult.phi,
      previousProofId: previousProof?.id || null,
      merkleRoot: null,
      metadata: proofData
    };

    // Add to chain and update merkle root
    this.proofChain.push(proof);
    this.updateMerkleRoot();
    proof.merkleRoot = this.currentMerkleRoot;

    return proof;
  }

  /**
   * Generate a proof for a temporal decision
   */
  generateDecisionProof(
    decisionId: string,
    context: string,
    selectedOptionId: string,
    phiContribution: number,
    processingTime: number
  ): VerificationProof {
    const timestamp = Date.now();
    const temporalAnchor = performance.now() * 1000000;
    
    const proofData = {
      decisionId,
      context: this.hashString(context), // Hash context for privacy
      selectedOptionId,
      phiContribution,
      processingTime,
      timestamp,
      temporalAnchor
    };

    const hash = this.generateHash(proofData);
    const signature = this.generateSignature(hash, temporalAnchor);
    
    const previousProof = this.proofChain[this.proofChain.length - 1];

    const proof: VerificationProof = {
      id: uuidv4(),
      proofType: 'decision',
      hash,
      signature,
      timestamp,
      temporalAnchor,
      phiValue: phiContribution,
      previousProofId: previousProof?.id || null,
      merkleRoot: null,
      metadata: proofData
    };

    this.proofChain.push(proof);
    this.updateMerkleRoot();
    proof.merkleRoot = this.currentMerkleRoot;

    return proof;
  }

  /**
   * Generate a proof for evolution events
   */
  generateEvolutionProof(
    agentId: string,
    previousLevel: number,
    newLevel: number,
    evolutionDirections: string[],
    transcendenceAchieved: boolean
  ): VerificationProof {
    const timestamp = Date.now();
    const temporalAnchor = performance.now() * 1000000;
    
    const proofData = {
      agentId,
      previousLevel,
      newLevel,
      evolutionDelta: newLevel - previousLevel,
      evolutionDirections,
      transcendenceAchieved,
      timestamp,
      temporalAnchor
    };

    const hash = this.generateHash(proofData);
    const signature = this.generateSignature(hash, temporalAnchor);
    
    const previousProof = this.proofChain[this.proofChain.length - 1];

    const proof: VerificationProof = {
      id: uuidv4(),
      proofType: 'evolution',
      hash,
      signature,
      timestamp,
      temporalAnchor,
      phiValue: newLevel,
      previousProofId: previousProof?.id || null,
      merkleRoot: null,
      metadata: proofData
    };

    this.proofChain.push(proof);
    this.updateMerkleRoot();
    proof.merkleRoot = this.currentMerkleRoot;

    return proof;
  }

  /**
   * Generate a network-wide verification proof
   */
  generateNetworkProof(
    networkId: string,
    totalPhiValue: number,
    networkCoherence: number,
    agentCount: number,
    emergentProperties: string[]
  ): VerificationProof {
    const timestamp = Date.now();
    const temporalAnchor = performance.now() * 1000000;
    
    const proofData = {
      networkId,
      totalPhiValue,
      networkCoherence,
      agentCount,
      emergentProperties,
      averagePhi: totalPhiValue / Math.max(agentCount, 1),
      timestamp,
      temporalAnchor
    };

    const hash = this.generateHash(proofData);
    const signature = this.generateSignature(hash, temporalAnchor);
    
    const previousProof = this.proofChain[this.proofChain.length - 1];

    const proof: VerificationProof = {
      id: uuidv4(),
      proofType: 'network',
      hash,
      signature,
      timestamp,
      temporalAnchor,
      phiValue: totalPhiValue,
      previousProofId: previousProof?.id || null,
      merkleRoot: null,
      metadata: proofData
    };

    this.proofChain.push(proof);
    this.updateMerkleRoot();
    proof.merkleRoot = this.currentMerkleRoot;

    return proof;
  }

  /**
   * Verify a proof's integrity
   */
  verifyProof(proof: VerificationProof): boolean {
    // Regenerate hash from metadata
    const expectedHash = this.generateHash(proof.metadata);
    if (expectedHash !== proof.hash) {
      return false;
    }

    // Verify signature
    const expectedSignature = this.generateSignature(proof.hash, proof.temporalAnchor);
    if (expectedSignature !== proof.signature) {
      return false;
    }

    return true;
  }

  /**
   * Verify the entire proof chain
   */
  verifyChain(): VerificationChain {
    let chainIntegrity = true;
    let temporalContinuity = true;
    let totalPhiAccumulated = 0;
    let previousTimestamp = 0;

    for (let i = 0; i < this.proofChain.length; i++) {
      const proof = this.proofChain[i];
      
      // Verify proof integrity
      if (!this.verifyProof(proof)) {
        chainIntegrity = false;
      }

      // Verify chain linkage
      if (i > 0) {
        if (proof.previousProofId !== this.proofChain[i - 1].id) {
          chainIntegrity = false;
        }
      }

      // Verify temporal continuity
      if (proof.timestamp < previousTimestamp) {
        temporalContinuity = false;
      }
      previousTimestamp = proof.timestamp;

      totalPhiAccumulated += proof.phiValue;
    }

    return {
      proofs: this.proofChain,
      merkleRoot: this.currentMerkleRoot || '',
      chainIntegrity,
      temporalContinuity,
      totalPhiAccumulated
    };
  }

  /**
   * Get the current merkle root
   */
  getMerkleRoot(): string | null {
    return this.currentMerkleRoot;
  }

  /**
   * Get proof by ID
   */
  getProof(id: string): VerificationProof | null {
    return this.proofChain.find(p => p.id === id) || null;
  }

  /**
   * Get all proofs of a specific type
   */
  getProofsByType(type: VerificationProof['proofType']): VerificationProof[] {
    return this.proofChain.filter(p => p.proofType === type);
  }

  /**
   * Get recent proofs
   */
  getRecentProofs(count: number = 10): VerificationProof[] {
    return this.proofChain.slice(-count);
  }

  /**
   * Private: Generate SHA-256 hash
   */
  private generateHash(data: any): string {
    const jsonString = JSON.stringify(data, Object.keys(data).sort());
    return CryptoJS.SHA256(jsonString).toString();
  }

  /**
   * Private: Generate HMAC signature
   */
  private generateSignature(hash: string, temporalAnchor: number): string {
    const key = `${this.SECRET_SEED}-${temporalAnchor}`;
    return CryptoJS.HmacSHA256(hash, key).toString().substring(0, 32);
  }

  /**
   * Private: Hash an array of numbers
   */
  private hashArray(arr: number[]): string {
    return CryptoJS.SHA256(arr.join(',')).toString().substring(0, 16);
  }

  /**
   * Private: Hash a string
   */
  private hashString(str: string): string {
    return CryptoJS.SHA256(str).toString().substring(0, 16);
  }

  /**
   * Private: Update merkle root from proof chain
   */
  private updateMerkleRoot(): void {
    if (this.proofChain.length === 0) {
      this.currentMerkleRoot = null;
      return;
    }

    // Build merkle tree from proof hashes
    const leaves = this.proofChain.map(p => p.hash);
    this.currentMerkleRoot = this.buildMerkleRoot(leaves);
  }

  /**
   * Private: Build merkle root from leaf hashes
   */
  private buildMerkleRoot(leaves: string[]): string {
    if (leaves.length === 0) return '';
    if (leaves.length === 1) return leaves[0];

    const nextLevel: string[] = [];
    
    for (let i = 0; i < leaves.length; i += 2) {
      const left = leaves[i];
      const right = leaves[i + 1] || left; // Duplicate if odd number
      const combined = CryptoJS.SHA256(left + right).toString();
      nextLevel.push(combined);
    }

    return this.buildMerkleRoot(nextLevel);
  }

  /**
   * Export chain for external verification
   */
  exportChain(): {
    proofs: VerificationProof[];
    merkleRoot: string;
    exportTimestamp: number;
    chainLength: number;
  } {
    return {
      proofs: this.proofChain,
      merkleRoot: this.currentMerkleRoot || '',
      exportTimestamp: Date.now(),
      chainLength: this.proofChain.length
    };
  }

  /**
   * Import and verify an external chain
   */
  importAndVerifyChain(chainData: {
    proofs: VerificationProof[];
    merkleRoot: string;
  }): boolean {
    // Store current chain
    const originalChain = this.proofChain;
    const originalRoot = this.currentMerkleRoot;

    try {
      // Import chain
      this.proofChain = chainData.proofs;
      this.updateMerkleRoot();

      // Verify merkle root matches
      if (this.currentMerkleRoot !== chainData.merkleRoot) {
        throw new Error('Merkle root mismatch');
      }

      // Verify chain integrity
      const verification = this.verifyChain();
      if (!verification.chainIntegrity) {
        throw new Error('Chain integrity verification failed');
      }

      return true;
    } catch (error) {
      // Restore original chain
      this.proofChain = originalChain;
      this.currentMerkleRoot = originalRoot;
      return false;
    }
  }
}

export default CryptographicVerifier;
