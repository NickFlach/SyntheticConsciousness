/**
 * BIOFIELD PROFILE ENGINE
 * 
 * 5-layer identity system treating consciousness as a living field.
 * Philosophy: Identity as a living field, not an account.
 * No social gravity, agency overrides inference, nothing extractive.
 */

import { EventEmitter } from 'events';
import { v4 as uuidv4 } from 'uuid';
import type {
  IdentityCore,
  HeartStateRecord,
  BiofieldStateRecord,
  ConsciousnessNode,
  ConsciousnessEdge,
  Artifact,
  BioFieldProfile,
  PrimaryField,
  HeartState,
  BiofieldState,
  ConsciousnessDomain,
  VisibilityState
} from '../../shared/types/consciousness.js';

export const PRIMARY_FIELDS: Record<PrimaryField, { name: string; colors: string[]; description: string }> = {
  aurora: { name: 'Aurora', colors: ['#00ff88', '#00ccff', '#ff00ff'], description: 'Shimmering polar light, transformative energy' },
  plasma: { name: 'Plasma', colors: ['#ff6b35', '#f7931e', '#ffcc00'], description: 'Electric fire, dynamic intensity' },
  void: { name: 'Void', colors: ['#1a1a2e', '#16213e', '#0f3460'], description: 'Deep space, contemplative stillness' },
  ember: { name: 'Ember', colors: ['#ff4757', '#ff6b81', '#c44569'], description: 'Warm glow, gentle persistence' },
  neon: { name: 'Neon', colors: ['#00d4ff', '#00ff88', '#ff00ff'], description: 'Electric brilliance, digital clarity' },
  bloom: { name: 'Bloom', colors: ['#a8e6cf', '#dcedc1', '#ffd3b6'], description: 'Organic growth, natural emergence' }
};

export const HEART_STATES: Record<HeartState, { name: string; icon: string; tempo: string; description: string }> = {
  creating: { name: 'Creating', icon: '✧', tempo: 'energetic', description: 'Bringing something new into being' },
  learning: { name: 'Learning', icon: '◈', tempo: 'focused', description: 'Absorbing and integrating knowledge' },
  exploring: { name: 'Exploring', icon: '◎', tempo: 'curious', description: 'Wandering through possibility space' },
  building: { name: 'Building', icon: '⬡', tempo: 'steady', description: 'Constructing with intention' },
  investing: { name: 'Investing', icon: '◇', tempo: 'deliberate', description: 'Allocating energy toward future growth' },
  observing: { name: 'Observing', icon: '○', tempo: 'calm', description: 'Witnessing without interference' },
  resting: { name: 'Resting', icon: '◌', tempo: 'slow', description: 'Restoring and integrating' }
};

export const BIOFIELD_STATES: Record<BiofieldState, { name: string; description: string; color: string }> = {
  restorative: { name: 'Restorative', description: 'System is recovering and rebuilding', color: '#a8e6cf' },
  focused: { name: 'Focused', description: 'High coherence, directed attention', color: '#00d4ff' },
  charged: { name: 'Charged', description: 'Elevated energy, ready for action', color: '#ff6b35' },
  depleted: { name: 'Depleted', description: 'Resources low, rest recommended', color: '#6c5ce7' },
  unsettled: { name: 'Unsettled', description: 'Variable patterns, uncertainty present', color: '#ffeaa7' },
  neutral: { name: 'Neutral', description: 'Baseline state, equilibrium', color: '#636e72' }
};

export const CONSCIOUSNESS_DOMAINS: Record<ConsciousnessDomain, { name: string; color: string }> = {
  art: { name: 'Art', color: '#ff6b81' },
  research: { name: 'Research', color: '#00d4ff' },
  fashion: { name: 'Fashion', color: '#ff00ff' },
  learning: { name: 'Learning', color: '#00ff88' },
  investing: { name: 'Investing', color: '#f7931e' },
  shopping: { name: 'Shopping', color: '#a8e6cf' },
  development: { name: 'Development', color: '#6c5ce7' },
  web3: { name: 'Web3', color: '#00ccff' },
  experimental: { name: 'Experimental', color: '#ff4757' },
  hardware: { name: 'Hardware', color: '#636e72' }
};

export class BiofieldProfileEngine extends EventEmitter {
  private profiles: Map<string, BioFieldProfile> = new Map();
  private initialized: boolean = false;

  constructor() {
    super();
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;

    console.log('🌊 Initializing Biofield Profile Engine...');
    this.initialized = true;
    console.log('✅ Biofield Profile Engine initialized');

    this.emit('initialized');
  }

  /**
   * Create a new identity core for a user
   */
  async createIdentityCore(userId: string, params: {
    chosenName?: string;
    identityPhrase?: string;
    primaryField?: PrimaryField;
    visibilityState?: VisibilityState;
  } = {}): Promise<IdentityCore> {
    await this.ensureInitialized();

    const identityCore: IdentityCore = {
      id: uuidv4(),
      userId,
      chosenName: params.chosenName,
      identityPhrase: params.identityPhrase,
      primaryField: params.primaryField || 'aurora',
      sigilSeed: this.generateSigilSeed(),
      sigilGeometry: this.generateSigilGeometry(),
      visibilityState: params.visibilityState || 'veiled',
      lastCoreUpdate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Initialize profile if not exists
    if (!this.profiles.has(userId)) {
      this.profiles.set(userId, {
        identityCore: null,
        currentHeartState: null,
        currentBiofieldState: null,
        consciousnessGraph: { nodes: [], edges: [] },
        artifacts: []
      });
    }

    const profile = this.profiles.get(userId)!;
    profile.identityCore = identityCore;

    this.emit('identity-core-created', identityCore);
    return identityCore;
  }

  /**
   * Set the current heart state for a user
   */
  async setHeartState(userId: string, state: HeartState, isInferred: boolean = false): Promise<HeartStateRecord> {
    await this.ensureInitialized();

    const profile = this.getOrCreateProfile(userId);

    // End previous heart state
    if (profile.currentHeartState) {
      profile.currentHeartState.endedAt = new Date().toISOString();
    }

    const heartStateRecord: HeartStateRecord = {
      id: uuidv4(),
      userId,
      state,
      isInferred,
      inferenceSource: isInferred ? 'biofield-analysis' : undefined,
      confidence: isInferred ? 0.7 : 1.0,
      startedAt: new Date().toISOString()
    };

    profile.currentHeartState = heartStateRecord;

    this.emit('heart-state-changed', heartStateRecord);
    return heartStateRecord;
  }

  /**
   * Set the current biofield state for a user
   */
  async setBiofieldState(userId: string, state: BiofieldState, isOverridden: boolean = false): Promise<BiofieldStateRecord> {
    await this.ensureInitialized();

    const profile = this.getOrCreateProfile(userId);

    const biofieldStateRecord: BiofieldStateRecord = {
      id: uuidv4(),
      userId,
      state,
      uncertainty: 0.3,
      isOverridden,
      recordedAt: new Date().toISOString()
    };

    profile.currentBiofieldState = biofieldStateRecord;

    this.emit('biofield-state-changed', biofieldStateRecord);
    return biofieldStateRecord;
  }

  /**
   * Engage with a consciousness domain
   */
  async engageDomain(userId: string, domain: ConsciousnessDomain): Promise<ConsciousnessNode> {
    await this.ensureInitialized();

    const profile = this.getOrCreateProfile(userId);

    // Find or create the node
    let node = profile.consciousnessGraph.nodes.find(n => n.domain === domain);

    if (node) {
      // Increase depth through engagement
      node.depth = Math.min(node.depth + 0.1, 1.0);
      node.lastEngagedAt = new Date().toISOString();
    } else {
      node = {
        id: uuidv4(),
        userId,
        domain,
        depth: 0.1,
        lastEngagedAt: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };
      profile.consciousnessGraph.nodes.push(node);
    }

    this.emit('domain-engaged', node);
    return node;
  }

  /**
   * Create a synthesis edge between two domains
   */
  async createSynthesis(userId: string, sourceDomain: ConsciousnessDomain, targetDomain: ConsciousnessDomain): Promise<ConsciousnessEdge> {
    await this.ensureInitialized();

    const profile = this.getOrCreateProfile(userId);

    // Find or create the edge
    let edge = profile.consciousnessGraph.edges.find(
      e => e.sourceDomain === sourceDomain && e.targetDomain === targetDomain
    );

    if (edge) {
      edge.synthesisCount += 1;
      edge.strength = Math.min(edge.strength + 0.1, 1.0);
      edge.lastSynthesisAt = new Date().toISOString();
    } else {
      edge = {
        id: uuidv4(),
        userId,
        sourceDomain,
        targetDomain,
        strength: 0.1,
        synthesisCount: 1,
        lastSynthesisAt: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };
      profile.consciousnessGraph.edges.push(edge);
    }

    this.emit('synthesis-created', edge);
    return edge;
  }

  /**
   * Crystallize an artifact
   */
  async crystallizeArtifact(userId: string, params: {
    type: string;
    title?: string;
    content?: Record<string, any>;
    domains?: ConsciousnessDomain[];
  }): Promise<Artifact> {
    await this.ensureInitialized();

    const profile = this.getOrCreateProfile(userId);

    const artifact: Artifact = {
      id: uuidv4(),
      userId,
      type: params.type,
      title: params.title,
      content: params.content,
      originHeartState: profile.currentHeartState?.state,
      originBiofieldState: profile.currentBiofieldState?.state,
      domains: params.domains || [],
      visibilityState: 'veiled',
      fadeLevel: 1.0,
      crystallizedAt: new Date().toISOString()
    };

    profile.artifacts.push(artifact);

    this.emit('artifact-crystallized', artifact);
    return artifact;
  }

  /**
   * Revisit an artifact (prevents fading)
   */
  async revisitArtifact(userId: string, artifactId: string): Promise<Artifact | null> {
    await this.ensureInitialized();

    const profile = this.profiles.get(userId);
    if (!profile) return null;

    const artifact = profile.artifacts.find(a => a.id === artifactId);
    if (!artifact) return null;

    artifact.lastRevisitedAt = new Date().toISOString();
    artifact.fadeLevel = 1.0; // Reset fade on revisit

    this.emit('artifact-revisited', artifact);
    return artifact;
  }

  /**
   * Get complete biofield profile for a user
   */
  async getProfile(userId: string): Promise<BioFieldProfile | null> {
    await this.ensureInitialized();
    return this.profiles.get(userId) || null;
  }

  /**
   * Generate a sigil seed for procedural avatar generation
   */
  private generateSigilSeed(): string {
    return `sigil-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Generate sigil geometry based on identity
   */
  private generateSigilGeometry(): number[] {
    const points = [];
    const numPoints = 6 + Math.floor(Math.random() * 6); // 6-12 points

    for (let i = 0; i < numPoints * 2; i++) {
      points.push(Math.random());
    }

    return points;
  }

  private getOrCreateProfile(userId: string): BioFieldProfile {
    if (!this.profiles.has(userId)) {
      this.profiles.set(userId, {
        identityCore: null,
        currentHeartState: null,
        currentBiofieldState: null,
        consciousnessGraph: { nodes: [], edges: [] },
        artifacts: []
      });
    }
    return this.profiles.get(userId)!;
  }

  private async ensureInitialized(): Promise<void> {
    if (!this.initialized) {
      await this.initialize();
    }
  }

  // Process artifact fading over time
  async processArtifactFading(fadeDays: number = 90): Promise<void> {
    const now = Date.now();
    const fadeThreshold = fadeDays * 24 * 60 * 60 * 1000;

    for (const profile of this.profiles.values()) {
      for (const artifact of profile.artifacts) {
        const lastActive = artifact.lastRevisitedAt || artifact.crystallizedAt;
        const timeSinceActive = now - new Date(lastActive).getTime();

        if (timeSinceActive > fadeThreshold) {
          artifact.fadeLevel = Math.max(0, 1 - (timeSinceActive / fadeThreshold));
        }
      }
    }
  }
}

export default BiofieldProfileEngine;
