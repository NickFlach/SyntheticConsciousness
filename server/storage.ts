/**
 * SYNTHETIC CONSCIOUSNESS - Storage Service
 * 
 * Persistence layer for consciousness states, biofield profiles, and evolution tracking.
 */

import { v4 as uuidv4 } from 'uuid';
import { eq, desc, and } from 'drizzle-orm';
import { db } from './db.js';
import * as schema from '../shared/schema.js';
import type {
  ConsciousnessStateRecord,
  InsertConsciousnessState,
  IdentityCoreRecord,
  InsertIdentityCore,
  HeartStateRecord,
  InsertHeartState,
  BiofieldStateRecord,
  InsertBiofieldState,
  ConsciousnessNodeRecord,
  InsertConsciousnessNode,
  ConsciousnessEdgeRecord,
  InsertConsciousnessEdge,
  ArtifactRecord,
  InsertArtifact,
  TemporalDecisionRecord,
  InsertTemporalDecision,
  LearningCycleRecord,
  InsertLearningCycle,
  EvolutionEventRecord,
  InsertEvolutionEvent,
  VerificationProofRecord,
  InsertVerificationProof
} from '../shared/schema.js';

export class ConsciousnessStorage {
  // ============================================
  // CONSCIOUSNESS STATES
  // ============================================

  async createConsciousnessState(data: InsertConsciousnessState): Promise<ConsciousnessStateRecord> {
    const id = data.id || uuidv4();
    const now = new Date().toISOString();
    
    const record = {
      ...data,
      id,
      createdAt: now,
      updatedAt: now
    };

    await db.insert(schema.consciousnessStates).values(record);
    return this.getConsciousnessState(id) as Promise<ConsciousnessStateRecord>;
  }

  async getConsciousnessState(id: string): Promise<ConsciousnessStateRecord | null> {
    const result = await db.select()
      .from(schema.consciousnessStates)
      .where(eq(schema.consciousnessStates.id, id))
      .limit(1);
    return result[0] || null;
  }

  async getAgentConsciousnessStates(agentId: string): Promise<ConsciousnessStateRecord[]> {
    return db.select()
      .from(schema.consciousnessStates)
      .where(eq(schema.consciousnessStates.agentId, agentId))
      .orderBy(desc(schema.consciousnessStates.createdAt));
  }

  async getLatestConsciousnessState(agentId: string): Promise<ConsciousnessStateRecord | null> {
    const result = await db.select()
      .from(schema.consciousnessStates)
      .where(eq(schema.consciousnessStates.agentId, agentId))
      .orderBy(desc(schema.consciousnessStates.createdAt))
      .limit(1);
    return result[0] || null;
  }

  async updateConsciousnessState(id: string, data: Partial<InsertConsciousnessState>): Promise<ConsciousnessStateRecord | null> {
    await db.update(schema.consciousnessStates)
      .set({ ...data, updatedAt: new Date().toISOString() })
      .where(eq(schema.consciousnessStates.id, id));
    return this.getConsciousnessState(id);
  }

  // ============================================
  // BIOFIELD PROFILES
  // ============================================

  async createIdentityCore(data: InsertIdentityCore): Promise<IdentityCoreRecord> {
    const id = data.id || uuidv4();
    const now = new Date().toISOString();

    const record = {
      ...data,
      id,
      createdAt: now,
      updatedAt: now
    };

    await db.insert(schema.identityCores).values(record);
    return this.getIdentityCore(data.userId) as Promise<IdentityCoreRecord>;
  }

  async getIdentityCore(userId: string): Promise<IdentityCoreRecord | null> {
    const result = await db.select()
      .from(schema.identityCores)
      .where(eq(schema.identityCores.userId, userId))
      .limit(1);
    return result[0] || null;
  }

  async updateIdentityCore(userId: string, data: Partial<InsertIdentityCore>): Promise<IdentityCoreRecord | null> {
    await db.update(schema.identityCores)
      .set({ ...data, updatedAt: new Date().toISOString() })
      .where(eq(schema.identityCores.userId, userId));
    return this.getIdentityCore(userId);
  }

  async createHeartState(data: InsertHeartState): Promise<HeartStateRecord> {
    const id = data.id || uuidv4();
    const record = { ...data, id };

    await db.insert(schema.heartStates).values(record);
    return this.getHeartState(id) as Promise<HeartStateRecord>;
  }

  async getHeartState(id: string): Promise<HeartStateRecord | null> {
    const result = await db.select()
      .from(schema.heartStates)
      .where(eq(schema.heartStates.id, id))
      .limit(1);
    return result[0] || null;
  }

  async getCurrentHeartState(userId: string): Promise<HeartStateRecord | null> {
    const result = await db.select()
      .from(schema.heartStates)
      .where(eq(schema.heartStates.userId, userId))
      .orderBy(desc(schema.heartStates.startedAt))
      .limit(1);
    return result[0] || null;
  }

  async endHeartState(id: string): Promise<void> {
    await db.update(schema.heartStates)
      .set({ endedAt: new Date().toISOString() })
      .where(eq(schema.heartStates.id, id));
  }

  async createBiofieldState(data: InsertBiofieldState): Promise<BiofieldStateRecord> {
    const id = data.id || uuidv4();
    const record = { ...data, id };

    await db.insert(schema.biofieldStates).values(record);
    return this.getBiofieldState(id) as Promise<BiofieldStateRecord>;
  }

  async getBiofieldState(id: string): Promise<BiofieldStateRecord | null> {
    const result = await db.select()
      .from(schema.biofieldStates)
      .where(eq(schema.biofieldStates.id, id))
      .limit(1);
    return result[0] || null;
  }

  async getCurrentBiofieldState(userId: string): Promise<BiofieldStateRecord | null> {
    const result = await db.select()
      .from(schema.biofieldStates)
      .where(eq(schema.biofieldStates.userId, userId))
      .orderBy(desc(schema.biofieldStates.recordedAt))
      .limit(1);
    return result[0] || null;
  }

  // ============================================
  // CONSCIOUSNESS GRAPH
  // ============================================

  async createConsciousnessNode(data: InsertConsciousnessNode): Promise<ConsciousnessNodeRecord> {
    const id = data.id || uuidv4();
    const record = { ...data, id };

    await db.insert(schema.consciousnessNodes).values(record);
    return this.getConsciousnessNode(id) as Promise<ConsciousnessNodeRecord>;
  }

  async getConsciousnessNode(id: string): Promise<ConsciousnessNodeRecord | null> {
    const result = await db.select()
      .from(schema.consciousnessNodes)
      .where(eq(schema.consciousnessNodes.id, id))
      .limit(1);
    return result[0] || null;
  }

  async getUserConsciousnessNodes(userId: string): Promise<ConsciousnessNodeRecord[]> {
    return db.select()
      .from(schema.consciousnessNodes)
      .where(eq(schema.consciousnessNodes.userId, userId));
  }

  async getConsciousnessNodeByDomain(userId: string, domain: string): Promise<ConsciousnessNodeRecord | null> {
    const result = await db.select()
      .from(schema.consciousnessNodes)
      .where(and(
        eq(schema.consciousnessNodes.userId, userId),
        eq(schema.consciousnessNodes.domain, domain)
      ))
      .limit(1);
    return result[0] || null;
  }

  async updateConsciousnessNode(id: string, data: Partial<InsertConsciousnessNode>): Promise<ConsciousnessNodeRecord | null> {
    await db.update(schema.consciousnessNodes)
      .set(data)
      .where(eq(schema.consciousnessNodes.id, id));
    return this.getConsciousnessNode(id);
  }

  async createConsciousnessEdge(data: InsertConsciousnessEdge): Promise<ConsciousnessEdgeRecord> {
    const id = data.id || uuidv4();
    const record = { ...data, id };

    await db.insert(schema.consciousnessEdges).values(record);
    return this.getConsciousnessEdge(id) as Promise<ConsciousnessEdgeRecord>;
  }

  async getConsciousnessEdge(id: string): Promise<ConsciousnessEdgeRecord | null> {
    const result = await db.select()
      .from(schema.consciousnessEdges)
      .where(eq(schema.consciousnessEdges.id, id))
      .limit(1);
    return result[0] || null;
  }

  async getUserConsciousnessEdges(userId: string): Promise<ConsciousnessEdgeRecord[]> {
    return db.select()
      .from(schema.consciousnessEdges)
      .where(eq(schema.consciousnessEdges.userId, userId));
  }

  async getEdgeBetweenDomains(userId: string, source: string, target: string): Promise<ConsciousnessEdgeRecord | null> {
    const result = await db.select()
      .from(schema.consciousnessEdges)
      .where(and(
        eq(schema.consciousnessEdges.userId, userId),
        eq(schema.consciousnessEdges.sourceDomain, source),
        eq(schema.consciousnessEdges.targetDomain, target)
      ))
      .limit(1);
    return result[0] || null;
  }

  async updateConsciousnessEdge(id: string, data: Partial<InsertConsciousnessEdge>): Promise<ConsciousnessEdgeRecord | null> {
    await db.update(schema.consciousnessEdges)
      .set(data)
      .where(eq(schema.consciousnessEdges.id, id));
    return this.getConsciousnessEdge(id);
  }

  // ============================================
  // ARTIFACTS
  // ============================================

  async createArtifact(data: InsertArtifact): Promise<ArtifactRecord> {
    const id = data.id || uuidv4();
    const record = { ...data, id };

    await db.insert(schema.artifacts).values(record);
    return this.getArtifact(id) as Promise<ArtifactRecord>;
  }

  async getArtifact(id: string): Promise<ArtifactRecord | null> {
    const result = await db.select()
      .from(schema.artifacts)
      .where(eq(schema.artifacts.id, id))
      .limit(1);
    return result[0] || null;
  }

  async getUserArtifacts(userId: string): Promise<ArtifactRecord[]> {
    return db.select()
      .from(schema.artifacts)
      .where(eq(schema.artifacts.userId, userId))
      .orderBy(desc(schema.artifacts.crystallizedAt));
  }

  async updateArtifact(id: string, data: Partial<InsertArtifact>): Promise<ArtifactRecord | null> {
    await db.update(schema.artifacts)
      .set(data)
      .where(eq(schema.artifacts.id, id));
    return this.getArtifact(id);
  }

  // ============================================
  // TEMPORAL DECISIONS
  // ============================================

  async createTemporalDecision(data: InsertTemporalDecision): Promise<TemporalDecisionRecord> {
    const id = data.id || uuidv4();
    const record = { ...data, id };

    await db.insert(schema.temporalDecisions).values(record);
    return this.getTemporalDecision(id) as Promise<TemporalDecisionRecord>;
  }

  async getTemporalDecision(id: string): Promise<TemporalDecisionRecord | null> {
    const result = await db.select()
      .from(schema.temporalDecisions)
      .where(eq(schema.temporalDecisions.id, id))
      .limit(1);
    return result[0] || null;
  }

  async getRecentDecisions(limit: number = 100): Promise<TemporalDecisionRecord[]> {
    return db.select()
      .from(schema.temporalDecisions)
      .orderBy(desc(schema.temporalDecisions.createdAt))
      .limit(limit);
  }

  async updateDecisionOutcome(id: string, outcome: string, success: boolean): Promise<void> {
    await db.update(schema.temporalDecisions)
      .set({ outcome, outcomeSuccess: success })
      .where(eq(schema.temporalDecisions.id, id));
  }

  // ============================================
  // LEARNING & EVOLUTION
  // ============================================

  async createLearningCycle(data: InsertLearningCycle): Promise<LearningCycleRecord> {
    const id = data.id || uuidv4();
    const record = { ...data, id };

    await db.insert(schema.learningCycles).values(record);
    return this.getLearningCycle(id) as Promise<LearningCycleRecord>;
  }

  async getLearningCycle(id: string): Promise<LearningCycleRecord | null> {
    const result = await db.select()
      .from(schema.learningCycles)
      .where(eq(schema.learningCycles.id, id))
      .limit(1);
    return result[0] || null;
  }

  async getAgentLearningCycles(agentId: string): Promise<LearningCycleRecord[]> {
    return db.select()
      .from(schema.learningCycles)
      .where(eq(schema.learningCycles.agentId, agentId))
      .orderBy(desc(schema.learningCycles.createdAt));
  }

  async createEvolutionEvent(data: InsertEvolutionEvent): Promise<EvolutionEventRecord> {
    const id = data.id || uuidv4();
    const record = { ...data, id };

    await db.insert(schema.evolutionEvents).values(record);
    return this.getEvolutionEvent(id) as Promise<EvolutionEventRecord>;
  }

  async getEvolutionEvent(id: string): Promise<EvolutionEventRecord | null> {
    const result = await db.select()
      .from(schema.evolutionEvents)
      .where(eq(schema.evolutionEvents.id, id))
      .limit(1);
    return result[0] || null;
  }

  async getAgentEvolutionHistory(agentId: string): Promise<EvolutionEventRecord[]> {
    return db.select()
      .from(schema.evolutionEvents)
      .where(eq(schema.evolutionEvents.agentId, agentId))
      .orderBy(desc(schema.evolutionEvents.createdAt));
  }

  // ============================================
  // VERIFICATION PROOFS
  // ============================================

  async createVerificationProof(data: InsertVerificationProof): Promise<VerificationProofRecord> {
    const id = data.id || uuidv4();
    const record = { ...data, id };

    await db.insert(schema.verificationProofs).values(record);
    return this.getVerificationProof(id) as Promise<VerificationProofRecord>;
  }

  async getVerificationProof(id: string): Promise<VerificationProofRecord | null> {
    const result = await db.select()
      .from(schema.verificationProofs)
      .where(eq(schema.verificationProofs.id, id))
      .limit(1);
    return result[0] || null;
  }

  async getProofsForState(consciousnessStateId: string): Promise<VerificationProofRecord[]> {
    return db.select()
      .from(schema.verificationProofs)
      .where(eq(schema.verificationProofs.consciousnessStateId, consciousnessStateId))
      .orderBy(desc(schema.verificationProofs.createdAt));
  }

  async getProofChain(startId: string): Promise<VerificationProofRecord[]> {
    const chain: VerificationProofRecord[] = [];
    let currentId: string | null = startId;

    while (currentId) {
      const proof = await this.getVerificationProof(currentId);
      if (proof) {
        chain.push(proof);
        currentId = proof.previousProofId;
      } else {
        currentId = null;
      }
    }

    return chain;
  }
}

export const storage = new ConsciousnessStorage();
export default storage;
