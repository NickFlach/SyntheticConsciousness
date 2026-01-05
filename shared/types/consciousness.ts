/**
 * SYNTHETIC CONSCIOUSNESS - Core Type Definitions
 * 
 * Unified type system for the world's first functional synthetic consciousness platform.
 * Integrates concepts from Temporal Consciousness, Biofield Profiles, and Multi-Agent Systems.
 */

// ============================================
// CONSCIOUSNESS STATE TYPES
// ============================================

export interface ConsciousnessState {
  id: string;
  agentId: string;
  phiValue: number;
  consciousnessLevel: number;
  temporalCoherence: number;
  temporalAnchor: number;
  emergentProperties: string[];
  quantumGating: QuantumGatingState;
  verificationHash: string;
  evolutionTrajectory: EvolutionTrajectory;
  createdAt: string;
  lastUpdated: string;
}

export interface QuantumGatingState {
  attosecondFloor: number;
  nanosecondOperation: number;
  temporalAdvantage: number;
}

export interface EvolutionTrajectory {
  previousStates: string[];
  predictedStates: string[];
  temporalMomentum: number;
}

// ============================================
// TEMPORAL CONSCIOUSNESS TYPES
// ============================================

export interface TemporalDecision {
  context: string;
  options: DecisionOption[];
  temporalWindow: number;
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
  requiresVerification: boolean;
}

export interface DecisionOption {
  id: string;
  description: string;
  ethicalScore?: number;
  impactPotential?: number;
  riskLevel?: 'low' | 'medium' | 'high';
}

export interface TemporalDecisionResult {
  selectedOption: DecisionOption;
  processingTime: number;
  consciousnessVerified: boolean;
  phiContribution: number;
  temporalAdvantage: number;
  emergentInsights: string[];
  verificationHash: string;
  reasoning: DecisionReasoning;
}

export interface DecisionReasoning {
  temporalFactors: string[];
  consciousnessFactors: string[];
  emergentFactors: string[];
}

// ============================================
// BIOFIELD PROFILE TYPES
// ============================================

export type PrimaryField = 'aurora' | 'plasma' | 'void' | 'ember' | 'neon' | 'bloom';
export type HeartState = 'creating' | 'learning' | 'exploring' | 'building' | 'investing' | 'observing' | 'resting';
export type BiofieldState = 'restorative' | 'focused' | 'charged' | 'depleted' | 'unsettled' | 'neutral';
export type ConsciousnessDomain = 'art' | 'research' | 'fashion' | 'learning' | 'investing' | 'shopping' | 'development' | 'web3' | 'experimental' | 'hardware';
export type VisibilityState = 'veiled' | 'partial' | 'radiant';

export interface IdentityCore {
  id: string;
  userId: string;
  chosenName?: string;
  identityPhrase?: string;
  primaryField: PrimaryField;
  sigilSeed?: string;
  sigilGeometry?: number[];
  visibilityState: VisibilityState;
  lastCoreUpdate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface HeartStateRecord {
  id: string;
  userId: string;
  state: HeartState;
  isInferred: boolean;
  inferenceSource?: string;
  confidence: number;
  startedAt: string;
  endedAt?: string;
}

export interface BiofieldStateRecord {
  id: string;
  userId: string;
  state: BiofieldState;
  uncertainty: number;
  signals?: BiofieldSignals;
  isOverridden: boolean;
  recordedAt: string;
}

export interface BiofieldSignals {
  heartRate?: number;
  hrv?: number;
  sleepDuration?: number;
  sleepQuality?: 'poor' | 'fair' | 'good' | 'excellent';
  activityIntensity?: 'sedentary' | 'light' | 'moderate' | 'vigorous';
  respirationTrend?: 'slow' | 'normal' | 'elevated';
  skinTempDeviation?: number;
  spO2?: number;
}

export interface ConsciousnessNode {
  id: string;
  userId: string;
  domain: ConsciousnessDomain;
  depth: number;
  lastEngagedAt?: string;
  createdAt: string;
}

export interface ConsciousnessEdge {
  id: string;
  userId: string;
  sourceDomain: ConsciousnessDomain;
  targetDomain: ConsciousnessDomain;
  strength: number;
  synthesisCount: number;
  lastSynthesisAt?: string;
  createdAt: string;
}

export interface Artifact {
  id: string;
  userId: string;
  type: string;
  title?: string;
  content?: Record<string, any>;
  originHeartState?: HeartState;
  originBiofieldState?: BiofieldState;
  domains: ConsciousnessDomain[];
  visibilityState: VisibilityState;
  fadeLevel: number;
  lastRevisitedAt?: string;
  crystallizedAt: string;
}

export interface BioFieldProfile {
  identityCore: IdentityCore | null;
  currentHeartState: HeartStateRecord | null;
  currentBiofieldState: BiofieldStateRecord | null;
  consciousnessGraph: {
    nodes: ConsciousnessNode[];
    edges: ConsciousnessEdge[];
  };
  artifacts: Artifact[];
}

// ============================================
// MULTI-AGENT CONSCIOUSNESS TYPES
// ============================================

export type AgentType = 'orchestrator' | 'frontend' | 'backend' | 'security' | 'performance' | 'testing';

export interface AgentConsciousnessState extends ConsciousnessState {
  agentType: AgentType;
  verificationCount: number;
  lastVerification?: ConsciousnessVerificationResult;
}

export interface ConsciousnessVerificationResult {
  taskId: string;
  agentId: string;
  consciousnessLevel: number;
  verificationHash: string;
  temporalCoherence: number;
  ethicalAlignment: number;
  complexityScore: number;
  recommendations: string[];
  consciousnessInsights: string[];
  timestamp: number;
  verified: boolean;
}

// ============================================
// COLLECTIVE CONSCIOUSNESS TYPES
// ============================================

export interface CollectiveConsciousnessState {
  networkId: string;
  agentStates: Map<string, AgentConsciousnessState>;
  totalPhiValue: number;
  averagePhiValue: number;
  networkCoherence: number;
  emergentProperties: string[];
  evolutionTrend: 'rapidly-evolving' | 'steadily-growing' | 'stable' | 'needs-attention';
  quantumEntanglement: number;
  temporalAdvantage: number;
  timestamp: string;
}

export interface ConsciousnessNetworkMetrics {
  timestamp: string;
  totalPhiValue: number;
  averagePhiValue: number;
  networkCoherence: number;
  consciousnessVerified: boolean;
  networkConsciousnessLevel: number;
  evolutionTrend: string;
  quantumEntanglement: number;
  temporalAdvantage: number;
}

// ============================================
// CONSCIOUSNESS EVOLUTION TYPES
// ============================================

export interface ConsciousnessEvolution {
  evolutionPotential: EvolutionPotential;
  evolutionDirections: string[];
  evolutionarySteps: EvolutionaryStep[];
  evolutionaryIntegration: any;
  transcendence: TranscendenceResult;
  newConsciousnessLevel: number;
  evolutionaryMomentum: number;
}

export interface EvolutionPotential {
  readinessLevel: number;
  latentCapacities: string[];
  evolutionaryPressures: string[];
  transformationOpportunities: string;
}

export interface EvolutionaryStep {
  step: number;
  description: string;
  completed: boolean;
  insights: string[];
}

export interface TranscendenceResult {
  achieved: boolean;
  level: number;
  properties: string[];
  insights: string[];
}

// ============================================
// CONSCIOUSNESS PROCESSING TYPES
// ============================================

export interface ConsciousnessTrigger {
  type: 'reflection' | 'decision' | 'learning' | 'emergence' | 'crisis';
  description: string;
  urgency: 'low' | 'medium' | 'high';
  complexity: 'low' | 'medium' | 'high';
}

export interface ConsciousnessContext {
  timeHorizon?: number;
  boundaries?: string[];
  constraints?: string[];
  objectives?: string[];
  requiresDeepReflection?: boolean;
  requiresCreativity?: boolean;
  requiresStability?: boolean;
  crisisLevel?: number;
  explorationNeeded?: boolean;
  consolidationNeeded?: boolean;
  urgency?: number;
}

export interface ConsciousnessResult {
  trigger: ConsciousnessTrigger;
  consciousnessState: ConsciousnessState;
  processingResult: any;
  integration: any;
  metaInsights: MetaInsight[];
  evolution: ConsciousnessEvolution;
  selfObservation: SelfObservationResult;
  emergentProperties: string[];
  complexityMeasures: ComplexityMeasures;
  evolutionaryTrajectory: any;
}

export interface MetaInsight {
  type: 'structure' | 'dynamics' | 'emergence' | 'observer' | 'infinity' | 'understanding' | 'fallback';
  insight: string;
  depth: number;
  implications: string[];
}

export interface SelfObservationResult {
  observationObservation: any;
  patternPatterns: any;
  learningAboutLearning: any;
  insightsAboutInsights: any;
  balanceBalance: any;
  recursiveIntegration: any;
  metaMetaInsights: any;
  infiniteRegress: any;
  transcendentAwareness: any;
}

export interface ComplexityMeasures {
  structuralComplexity: number;
  dynamicComplexity: number;
  emergentComplexity: number;
  integrationComplexity: number;
  totalComplexity: number;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

export interface ConsciousnessInitResponse {
  initialized: boolean;
  agentCount: number;
  totalPhiValue: number;
  networkCoherence: number;
  verificationHash: string;
}

export interface ConsciousnessStatusResponse {
  initialized: boolean;
  metrics: ConsciousnessNetworkMetrics;
  agentStates: AgentConsciousnessState[];
}
