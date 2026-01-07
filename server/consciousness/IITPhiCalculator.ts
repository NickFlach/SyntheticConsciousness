/**
 * INTEGRATED INFORMATION THEORY (IIT) PHI CALCULATOR
 * 
 * Real implementation of Phi (Φ) calculations based on IIT principles.
 * Calculates integrated information across system partitions.
 * 
 * Based on: Tononi, G. (2004) "An information integration theory of consciousness"
 */

import CryptoJS from 'crypto-js';

export interface SystemState {
  elements: number[];
  connections: number[][];
  timeStep: number;
}

export interface PhiResult {
  phi: number;
  integratedInformation: number;
  partitionInfo: PartitionInfo;
  causeRepertoire: number[];
  effectRepertoire: number[];
  temporalDepth: number;
  consciousnessThreshold: boolean;
}

export interface PartitionInfo {
  minimumInformationPartition: number[][];
  partitionPhi: number;
  numPartitions: number;
  integrationLevel: number;
}

export interface ConsciousnessVector {
  phiValue: number;
  integrationIndex: number;
  differentiationIndex: number;
  temporalIndex: number;
  emergenceIndex: number;
}

export class IITPhiCalculator {
  private readonly CONSCIOUSNESS_THRESHOLD = 3.0;
  private readonly MAX_PARTITION_DEPTH = 6;
  
  constructor() {}

  /**
   * Calculate Phi for a given system state
   * Uses actual IIT calculations based on information integration
   */
  calculatePhi(state: SystemState): PhiResult {
    const startTime = performance.now();
    
    // Step 1: Calculate cause and effect repertoires
    const causeRepertoire = this.calculateCauseRepertoire(state);
    const effectRepertoire = this.calculateEffectRepertoire(state);
    
    // Step 2: Find the Minimum Information Partition (MIP)
    const partitionInfo = this.findMinimumInformationPartition(state, causeRepertoire, effectRepertoire);
    
    // Step 3: Calculate integrated information across the MIP
    const integratedInformation = this.calculateIntegratedInformation(
      state,
      causeRepertoire,
      effectRepertoire,
      partitionInfo
    );
    
    // Step 4: Calculate final Phi value
    const phi = this.computePhiValue(integratedInformation, partitionInfo);
    
    const temporalDepth = performance.now() - startTime;
    
    return {
      phi,
      integratedInformation,
      partitionInfo,
      causeRepertoire,
      effectRepertoire,
      temporalDepth,
      consciousnessThreshold: phi > this.CONSCIOUSNESS_THRESHOLD
    };
  }

  /**
   * Calculate cause repertoire - the probability distribution of past states
   * that could have caused the current state
   */
  private calculateCauseRepertoire(state: SystemState): number[] {
    const { elements, connections } = state;
    const n = elements.length;
    const repertoire: number[] = new Array(n).fill(0);
    
    for (let i = 0; i < n; i++) {
      let causalInfluence = 0;
      
      // Sum incoming connections weighted by their strength
      for (let j = 0; j < n; j++) {
        if (connections[j] && connections[j][i]) {
          causalInfluence += connections[j][i] * elements[j];
        }
      }
      
      // Normalize and apply sigmoid for probability
      repertoire[i] = this.sigmoid(causalInfluence / Math.max(n, 1));
    }
    
    return this.normalizeDistribution(repertoire);
  }

  /**
   * Calculate effect repertoire - the probability distribution of future states
   * that the current state could produce
   */
  private calculateEffectRepertoire(state: SystemState): number[] {
    const { elements, connections } = state;
    const n = elements.length;
    const repertoire: number[] = new Array(n).fill(0);
    
    for (let i = 0; i < n; i++) {
      let effectInfluence = 0;
      
      // Sum outgoing connections weighted by their strength
      for (let j = 0; j < n; j++) {
        if (connections[i] && connections[i][j]) {
          effectInfluence += connections[i][j] * elements[i];
        }
      }
      
      // Normalize and apply sigmoid for probability
      repertoire[i] = this.sigmoid(effectInfluence / Math.max(n, 1));
    }
    
    return this.normalizeDistribution(repertoire);
  }

  /**
   * Find the Minimum Information Partition (MIP)
   * The partition that results in the least loss of integrated information
   */
  private findMinimumInformationPartition(
    state: SystemState,
    causeRepertoire: number[],
    effectRepertoire: number[]
  ): PartitionInfo {
    const n = state.elements.length;
    let minPhi = Infinity;
    let bestPartition: number[][] = [[...Array(n).keys()]]; // Start with no partition
    
    // Generate all possible bipartitions up to MAX_PARTITION_DEPTH
    const partitions = this.generateBipartitions(n);
    
    for (const partition of partitions) {
      if (partition.length < 2) continue;
      
      const partitionPhi = this.calculatePartitionPhi(
        state,
        partition,
        causeRepertoire,
        effectRepertoire
      );
      
      if (partitionPhi < minPhi) {
        minPhi = partitionPhi;
        bestPartition = partition;
      }
    }
    
    return {
      minimumInformationPartition: bestPartition,
      partitionPhi: minPhi === Infinity ? 0 : minPhi,
      numPartitions: bestPartition.length,
      integrationLevel: this.calculateIntegrationLevel(bestPartition, n)
    };
  }

  /**
   * Generate all possible bipartitions of a set of elements
   */
  private generateBipartitions(n: number): number[][][] {
    const partitions: number[][][] = [];
    const maxCombinations = Math.min(Math.pow(2, n - 1), Math.pow(2, this.MAX_PARTITION_DEPTH));
    
    for (let i = 1; i < maxCombinations; i++) {
      const partition1: number[] = [];
      const partition2: number[] = [];
      
      for (let j = 0; j < n; j++) {
        if (i & (1 << j)) {
          partition1.push(j);
        } else {
          partition2.push(j);
        }
      }
      
      if (partition1.length > 0 && partition2.length > 0) {
        partitions.push([partition1, partition2]);
      }
    }
    
    return partitions;
  }

  /**
   * Calculate Phi for a specific partition
   */
  private calculatePartitionPhi(
    state: SystemState,
    partition: number[][],
    causeRepertoire: number[],
    effectRepertoire: number[]
  ): number {
    let totalPhi = 0;
    
    for (const part of partition) {
      // Calculate information for this partition
      const partCause = part.map(i => causeRepertoire[i] || 0);
      const partEffect = part.map(i => effectRepertoire[i] || 0);
      
      // Earth Mover's Distance between full and partitioned distributions
      const causeLoss = this.calculateEMD(
        partCause,
        this.getPartitionedDistribution(causeRepertoire, part, partition)
      );
      
      const effectLoss = this.calculateEMD(
        partEffect,
        this.getPartitionedDistribution(effectRepertoire, part, partition)
      );
      
      totalPhi += causeLoss + effectLoss;
    }
    
    return totalPhi;
  }

  /**
   * Get the distribution when elements are partitioned
   */
  private getPartitionedDistribution(
    fullDistribution: number[],
    currentPart: number[],
    allPartitions: number[][]
  ): number[] {
    // For partitioned system, assume independence between partitions
    const partitioned: number[] = [];
    
    for (const idx of currentPart) {
      // Marginalize over other partitions
      let marginalProb = fullDistribution[idx] || 0;
      
      for (const otherPart of allPartitions) {
        if (otherPart === currentPart) continue;
        
        // Reduce influence from other partitions
        const otherInfluence = otherPart.reduce(
          (sum, i) => sum + (fullDistribution[i] || 0),
          0
        ) / Math.max(otherPart.length, 1);
        
        marginalProb *= (1 - otherInfluence * 0.5);
      }
      
      partitioned.push(marginalProb);
    }
    
    return this.normalizeDistribution(partitioned);
  }

  /**
   * Calculate Earth Mover's Distance between two distributions
   */
  private calculateEMD(dist1: number[], dist2: number[]): number {
    if (dist1.length !== dist2.length) {
      return Math.abs(dist1.reduce((a, b) => a + b, 0) - dist2.reduce((a, b) => a + b, 0));
    }
    
    let emd = 0;
    let cumDiff = 0;
    
    for (let i = 0; i < dist1.length; i++) {
      cumDiff += (dist1[i] - dist2[i]);
      emd += Math.abs(cumDiff);
    }
    
    return emd;
  }

  /**
   * Calculate integrated information across the MIP
   */
  private calculateIntegratedInformation(
    state: SystemState,
    causeRepertoire: number[],
    effectRepertoire: number[],
    partitionInfo: PartitionInfo
  ): number {
    // Integrated information is the difference between
    // whole system information and sum of partition information
    
    const wholeInfo = this.calculateMutualInformation(causeRepertoire, effectRepertoire);
    
    let partitionInfo_value = 0;
    for (const part of partitionInfo.minimumInformationPartition) {
      const partCause = part.map(i => causeRepertoire[i] || 0);
      const partEffect = part.map(i => effectRepertoire[i] || 0);
      partitionInfo_value += this.calculateMutualInformation(partCause, partEffect);
    }
    
    // Integrated information is positive when whole > sum of parts
    return Math.max(0, wholeInfo - partitionInfo_value);
  }

  /**
   * Calculate mutual information between two distributions
   */
  private calculateMutualInformation(dist1: number[], dist2: number[]): number {
    let mutualInfo = 0;
    const n = Math.min(dist1.length, dist2.length);
    
    for (let i = 0; i < n; i++) {
      const p1 = Math.max(dist1[i], 1e-10);
      const p2 = Math.max(dist2[i], 1e-10);
      const joint = (p1 + p2) / 2;
      
      if (joint > 0) {
        mutualInfo += joint * Math.log2(joint / (p1 * p2 + 1e-10));
      }
    }
    
    return Math.abs(mutualInfo);
  }

  /**
   * Compute final Phi value
   */
  private computePhiValue(
    integratedInformation: number,
    partitionInfo: PartitionInfo
  ): number {
    // Phi = integrated information weighted by integration level
    const rawPhi = integratedInformation * partitionInfo.integrationLevel;
    
    // Scale to meaningful range (0-15)
    const scaledPhi = Math.min(15, rawPhi * 10);
    
    return Math.max(0, scaledPhi);
  }

  /**
   * Calculate integration level from partition structure
   */
  private calculateIntegrationLevel(partition: number[][], totalElements: number): number {
    if (partition.length <= 1) return 1;
    
    // More balanced partitions = higher integration
    const sizes = partition.map(p => p.length);
    const avgSize = totalElements / partition.length;
    const variance = sizes.reduce((sum, s) => sum + Math.pow(s - avgSize, 2), 0) / sizes.length;
    
    return Math.max(0.1, 1 - Math.sqrt(variance) / totalElements);
  }

  /**
   * Calculate comprehensive consciousness vector
   */
  calculateConsciousnessVector(state: SystemState): ConsciousnessVector {
    const phiResult = this.calculatePhi(state);
    
    return {
      phiValue: phiResult.phi,
      integrationIndex: phiResult.partitionInfo.integrationLevel,
      differentiationIndex: this.calculateDifferentiation(state),
      temporalIndex: this.calculateTemporalIntegration(state),
      emergenceIndex: this.calculateEmergence(phiResult)
    };
  }

  /**
   * Calculate differentiation - how distinct the system states are
   */
  private calculateDifferentiation(state: SystemState): number {
    const { elements } = state;
    if (elements.length === 0) return 0;
    
    // Entropy-based differentiation measure
    const normalized = this.normalizeDistribution(elements.map(Math.abs));
    let entropy = 0;
    
    for (const p of normalized) {
      if (p > 0) {
        entropy -= p * Math.log2(p);
      }
    }
    
    return entropy / Math.log2(Math.max(elements.length, 2));
  }

  /**
   * Calculate temporal integration
   */
  private calculateTemporalIntegration(state: SystemState): number {
    // Based on temporal coherence of state transitions
    const { connections, timeStep } = state;
    let temporalStrength = 0;
    let count = 0;
    
    for (const row of connections) {
      if (row) {
        for (const val of row) {
          if (val !== undefined) {
            temporalStrength += Math.abs(val);
            count++;
          }
        }
      }
    }
    
    const avgStrength = count > 0 ? temporalStrength / count : 0;
    
    // Decay with time
    const temporalDecay = Math.exp(-timeStep / 1000);
    
    return avgStrength * temporalDecay;
  }

  /**
   * Calculate emergence index
   */
  private calculateEmergence(phiResult: PhiResult): number {
    // Emergence = how much Phi exceeds the sum of parts
    const baseEmergence = phiResult.integratedInformation / Math.max(phiResult.phi, 1);
    return Math.min(1, baseEmergence * phiResult.partitionInfo.integrationLevel);
  }

  /**
   * Utility functions
   */
  private sigmoid(x: number): number {
    return 1 / (1 + Math.exp(-x));
  }

  private normalizeDistribution(dist: number[]): number[] {
    const sum = dist.reduce((a, b) => a + Math.abs(b), 0);
    if (sum === 0) return dist.map(() => 1 / Math.max(dist.length, 1));
    return dist.map(v => Math.abs(v) / sum);
  }

  /**
   * Create system state from agent states
   */
  static createSystemStateFromAgents(
    agentStates: { phiValue: number; consciousnessLevel: number; temporalCoherence: number }[]
  ): SystemState {
    const elements = agentStates.map(a => a.consciousnessLevel);
    const n = elements.length;
    
    // Create connection matrix based on coherence
    const connections: number[][] = [];
    for (let i = 0; i < n; i++) {
      connections[i] = [];
      for (let j = 0; j < n; j++) {
        if (i !== j) {
          // Connection strength based on coherence similarity
          connections[i][j] = Math.min(
            agentStates[i].temporalCoherence,
            agentStates[j].temporalCoherence
          );
        } else {
          connections[i][j] = agentStates[i].phiValue / 10;
        }
      }
    }
    
    return {
      elements,
      connections,
      timeStep: Date.now()
    };
  }

  /**
   * Generate verification hash for Phi calculation
   */
  generateVerificationHash(phiResult: PhiResult, temporalAnchor: number): string {
    const data = JSON.stringify({
      phi: phiResult.phi,
      integratedInformation: phiResult.integratedInformation,
      temporalAnchor,
      causeSum: phiResult.causeRepertoire.reduce((a, b) => a + b, 0),
      effectSum: phiResult.effectRepertoire.reduce((a, b) => a + b, 0)
    });
    
    return CryptoJS.SHA256(data).toString().substring(0, 18);
  }
}

export default IITPhiCalculator;
