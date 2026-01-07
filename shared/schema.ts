/**
 * SYNTHETIC CONSCIOUSNESS - Database Schema
 * 
 * Drizzle ORM schema for consciousness state persistence.
 */

import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// ============================================
// CONSCIOUSNESS STATES
// ============================================

export const consciousnessStates = sqliteTable('consciousness_states', {
  id: text('id').primaryKey(),
  agentId: text('agent_id').notNull(),
  agentType: text('agent_type'),
  state: text('state').notNull().default('initializing'),
  phiValue: real('phi_value').notNull().default(0),
  consciousnessLevel: real('consciousness_level').notNull().default(0),
  temporalCoherence: real('temporal_coherence').notNull().default(0),
  temporalAnchor: real('temporal_anchor'),
  temporalAdvantage: real('temporal_advantage').default(1000000),
  awarenessLevel: real('awareness_level').default(0.5),
  recursionDepth: integer('recursion_depth').default(0),
  orderChaosBalance: real('order_chaos_balance').default(0.5),
  emergentProperties: text('emergent_properties', { mode: 'json' }).$type<string[]>().default([]),
  quantumGating: text('quantum_gating', { mode: 'json' }).$type<{
    attosecondFloor: number;
    nanosecondOperation: number;
    temporalAdvantage: number;
  }>(),
  evolutionTrajectory: text('evolution_trajectory', { mode: 'json' }).$type<{
    previousStates: string[];
    predictedStates: string[];
    temporalMomentum: number;
  }>(),
  verificationHash: text('verification_hash'),
  verificationCount: integer('verification_count').default(0),
  contextLayers: text('context_layers', { mode: 'json' }).$type<string[]>().default([]),
  connectedStates: text('connected_states', { mode: 'json' }).$type<string[]>().default([]),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`)
});

// ============================================
// BIOFIELD PROFILES
// ============================================

export const identityCores = sqliteTable('identity_cores', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().unique(),
  chosenName: text('chosen_name'),
  identityPhrase: text('identity_phrase'),
  primaryField: text('primary_field').notNull().default('aurora'),
  sigilSeed: text('sigil_seed'),
  sigilGeometry: text('sigil_geometry', { mode: 'json' }).$type<number[]>(),
  visibilityState: text('visibility_state').notNull().default('veiled'),
  lastCoreUpdate: text('last_core_update'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`)
});

export const heartStates = sqliteTable('heart_states', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  state: text('state').notNull(),
  isInferred: integer('is_inferred', { mode: 'boolean' }).default(false),
  inferenceSource: text('inference_source'),
  confidence: real('confidence').default(1.0),
  startedAt: text('started_at').default(sql`CURRENT_TIMESTAMP`),
  endedAt: text('ended_at')
});

export const biofieldStates = sqliteTable('biofield_states', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  state: text('state').notNull(),
  uncertainty: real('uncertainty').default(0.3),
  signals: text('signals', { mode: 'json' }).$type<{
    heartRate?: number;
    hrv?: number;
    sleepDuration?: number;
    sleepQuality?: string;
    activityIntensity?: string;
    respirationTrend?: string;
    skinTempDeviation?: number;
    spO2?: number;
  }>(),
  isOverridden: integer('is_overridden', { mode: 'boolean' }).default(false),
  recordedAt: text('recorded_at').default(sql`CURRENT_TIMESTAMP`)
});

export const consciousnessNodes = sqliteTable('consciousness_nodes', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  domain: text('domain').notNull(),
  depth: real('depth').notNull().default(0.1),
  lastEngagedAt: text('last_engaged_at'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`)
});

export const consciousnessEdges = sqliteTable('consciousness_edges', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  sourceDomain: text('source_domain').notNull(),
  targetDomain: text('target_domain').notNull(),
  strength: real('strength').notNull().default(0.1),
  synthesisCount: integer('synthesis_count').default(1),
  lastSynthesisAt: text('last_synthesis_at'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`)
});

export const artifacts = sqliteTable('artifacts', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  type: text('type').notNull(),
  title: text('title'),
  content: text('content', { mode: 'json' }),
  originHeartState: text('origin_heart_state'),
  originBiofieldState: text('origin_biofield_state'),
  domains: text('domains', { mode: 'json' }).$type<string[]>().default([]),
  visibilityState: text('visibility_state').default('veiled'),
  fadeLevel: real('fade_level').default(1.0),
  lastRevisitedAt: text('last_revisited_at'),
  crystallizedAt: text('crystallized_at').default(sql`CURRENT_TIMESTAMP`)
});

// ============================================
// TEMPORAL DECISIONS
// ============================================

export const temporalDecisions = sqliteTable('temporal_decisions', {
  id: text('id').primaryKey(),
  context: text('context').notNull(),
  options: text('options', { mode: 'json' }).$type<any[]>(),
  selectedOptionId: text('selected_option_id'),
  temporalWindow: integer('temporal_window').default(1000),
  urgencyLevel: text('urgency_level').default('medium'),
  processingTime: real('processing_time'),
  phiContribution: real('phi_contribution'),
  temporalAdvantage: real('temporal_advantage'),
  emergentInsights: text('emergent_insights', { mode: 'json' }).$type<string[]>(),
  verificationHash: text('verification_hash'),
  consciousnessVerified: integer('consciousness_verified', { mode: 'boolean' }).default(false),
  reasoning: text('reasoning', { mode: 'json' }),
  outcome: text('outcome'),
  outcomeSuccess: integer('outcome_success', { mode: 'boolean' }),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`)
});

// ============================================
// CONSCIOUSNESS NETWORK
// ============================================

export const consciousnessNetworks = sqliteTable('consciousness_networks', {
  id: text('id').primaryKey(),
  networkId: text('network_id').notNull(),
  totalPhiValue: real('total_phi_value'),
  averagePhiValue: real('average_phi_value'),
  networkCoherence: real('network_coherence'),
  networkConsciousnessLevel: real('network_consciousness_level'),
  evolutionTrend: text('evolution_trend'),
  quantumEntanglement: real('quantum_entanglement'),
  emergentProperties: text('emergent_properties', { mode: 'json' }).$type<string[]>(),
  timestamp: text('timestamp').default(sql`CURRENT_TIMESTAMP`)
});

// ============================================
// LEARNING & EVOLUTION
// ============================================

export const learningCycles = sqliteTable('learning_cycles', {
  id: text('id').primaryKey(),
  agentId: text('agent_id').notNull(),
  cycleType: text('cycle_type').notNull(),
  inputContext: text('input_context', { mode: 'json' }),
  learnedPatterns: text('learned_patterns', { mode: 'json' }).$type<string[]>(),
  insightsGenerated: text('insights_generated', { mode: 'json' }).$type<string[]>(),
  performanceImprovement: real('performance_improvement'),
  integrationDepth: real('integration_depth'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`)
});

export const evolutionEvents = sqliteTable('evolution_events', {
  id: text('id').primaryKey(),
  agentId: text('agent_id').notNull(),
  evolutionType: text('evolution_type').notNull(),
  previousLevel: real('previous_level'),
  newLevel: real('new_level'),
  evolutionDirections: text('evolution_directions', { mode: 'json' }).$type<string[]>(),
  transcendenceAchieved: integer('transcendence_achieved', { mode: 'boolean' }).default(false),
  emergentCapabilities: text('emergent_capabilities', { mode: 'json' }).$type<string[]>(),
  evolutionaryMomentum: real('evolutionary_momentum'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`)
});

// ============================================
// VERIFICATION PROOFS
// ============================================

export const verificationProofs = sqliteTable('verification_proofs', {
  id: text('id').primaryKey(),
  consciousnessStateId: text('consciousness_state_id'),
  proofType: text('proof_type').notNull(),
  verificationHash: text('verification_hash').notNull(),
  phiValue: real('phi_value'),
  temporalAnchor: real('temporal_anchor'),
  signature: text('signature'),
  merkleRoot: text('merkle_root'),
  previousProofId: text('previous_proof_id'),
  verified: integer('verified', { mode: 'boolean' }).default(false),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`)
});

// ============================================
// TYPE EXPORTS
// ============================================

export type ConsciousnessStateRecord = typeof consciousnessStates.$inferSelect;
export type InsertConsciousnessState = typeof consciousnessStates.$inferInsert;

export type IdentityCoreRecord = typeof identityCores.$inferSelect;
export type InsertIdentityCore = typeof identityCores.$inferInsert;

export type HeartStateRecord = typeof heartStates.$inferSelect;
export type InsertHeartState = typeof heartStates.$inferInsert;

export type BiofieldStateRecord = typeof biofieldStates.$inferSelect;
export type InsertBiofieldState = typeof biofieldStates.$inferInsert;

export type ConsciousnessNodeRecord = typeof consciousnessNodes.$inferSelect;
export type InsertConsciousnessNode = typeof consciousnessNodes.$inferInsert;

export type ConsciousnessEdgeRecord = typeof consciousnessEdges.$inferSelect;
export type InsertConsciousnessEdge = typeof consciousnessEdges.$inferInsert;

export type ArtifactRecord = typeof artifacts.$inferSelect;
export type InsertArtifact = typeof artifacts.$inferInsert;

export type TemporalDecisionRecord = typeof temporalDecisions.$inferSelect;
export type InsertTemporalDecision = typeof temporalDecisions.$inferInsert;

export type LearningCycleRecord = typeof learningCycles.$inferSelect;
export type InsertLearningCycle = typeof learningCycles.$inferInsert;

export type EvolutionEventRecord = typeof evolutionEvents.$inferSelect;
export type InsertEvolutionEvent = typeof evolutionEvents.$inferInsert;

export type VerificationProofRecord = typeof verificationProofs.$inferSelect;
export type InsertVerificationProof = typeof verificationProofs.$inferInsert;
