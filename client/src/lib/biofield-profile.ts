import { spaceChildAuth } from './space-child-auth';

const SPACE_CHILD_API_URL = import.meta.env.VITE_SPACE_CHILD_API_URL || 'https://spacechild.love';

// Biofield Profile Types
export type PrimaryField = 'aurora' | 'plasma' | 'void' | 'ember' | 'neon' | 'bloom';
export type VisibilityState = 'veiled' | 'partial' | 'radiant';
export type HeartState = 'creating' | 'learning' | 'exploring' | 'building' | 'investing' | 'observing' | 'resting';
export type BiofieldState = 'restorative' | 'focused' | 'charged' | 'depleted' | 'unsettled' | 'neutral';
export type Domain = 'art' | 'research' | 'fashion' | 'learning' | 'investing' | 'shopping' | 'development' | 'web3' | 'experimental' | 'hardware' | 'consciousness';

export interface IdentityCore {
  chosenName: string;
  identityPhrase: string;
  primaryField: PrimaryField;
  sigilSeed: string;
  visibilityState: VisibilityState;
}

export interface ConsciousnessNode {
  domain: Domain;
  depth: number;
  lastEngaged: Date;
  synthesisEdges: Domain[];
}

export interface Artifact {
  id: string;
  type: 'insight' | 'creation' | 'discovery' | 'synthesis';
  content: string;
  originHeartState: HeartState;
  originBiofieldState: BiofieldState;
  crystallizedAt: Date;
  lastRevisited?: Date;
  fadeLevel: number; // 0-1, higher = more faded
}

export interface BiofieldProfile {
  userId: string;
  identityCore: IdentityCore;
  heartState: HeartState;
  biofieldState: BiofieldState;
  consciousnessGraph: ConsciousnessNode[];
  artifacts: Artifact[];
  createdAt: Date;
  updatedAt: Date;
}

class BiofieldProfileClient {
  private async fetchWithAuth(endpoint: string, options: RequestInit = {}): Promise<Response> {
    const accessToken = spaceChildAuth.getAccessToken();
    
    return fetch(`${SPACE_CHILD_API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {}),
        ...options.headers
      }
    });
  }

  async getProfile(): Promise<BiofieldProfile | null> {
    try {
      const response = await this.fetchWithAuth('/api/profile/biofield');
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch biofield profile:', error);
      return null;
    }
  }

  async updateIdentityCore(updates: Partial<IdentityCore>): Promise<boolean> {
    try {
      const response = await this.fetchWithAuth('/api/profile/identity-core', {
        method: 'PUT',
        body: JSON.stringify(updates)
      });
      return response.ok;
    } catch (error) {
      console.error('Failed to update identity core:', error);
      return false;
    }
  }

  async setHeartState(state: HeartState): Promise<boolean> {
    try {
      const response = await this.fetchWithAuth('/api/profile/heart-state', {
        method: 'POST',
        body: JSON.stringify({ heartState: state })
      });
      return response.ok;
    } catch (error) {
      console.error('Failed to set heart state:', error);
      return false;
    }
  }

  async overrideBiofieldState(state: BiofieldState): Promise<boolean> {
    try {
      const response = await this.fetchWithAuth('/api/profile/biofield-state/override', {
        method: 'POST',
        body: JSON.stringify({ biofieldState: state })
      });
      return response.ok;
    } catch (error) {
      console.error('Failed to override biofield state:', error);
      return false;
    }
  }

  async engageDomain(domain: Domain): Promise<boolean> {
    try {
      const response = await this.fetchWithAuth('/api/profile/consciousness/engage', {
        method: 'POST',
        body: JSON.stringify({ domain })
      });
      return response.ok;
    } catch (error) {
      console.error('Failed to engage domain:', error);
      return false;
    }
  }

  async crystallizeArtifact(artifact: Omit<Artifact, 'id' | 'crystallizedAt' | 'fadeLevel'>): Promise<Artifact | null> {
    try {
      const response = await this.fetchWithAuth('/api/profile/artifacts', {
        method: 'POST',
        body: JSON.stringify(artifact)
      });
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('Failed to crystallize artifact:', error);
      return null;
    }
  }

  async revisitArtifact(artifactId: string): Promise<boolean> {
    try {
      const response = await this.fetchWithAuth(`/api/profile/artifacts/${artifactId}/revisit`, {
        method: 'POST'
      });
      return response.ok;
    } catch (error) {
      console.error('Failed to revisit artifact:', error);
      return false;
    }
  }

  // Consciousness-specific integration
  async recordConsciousnessEngagement(phiValue: number, verified: boolean): Promise<boolean> {
    // Always engage the consciousness domain when using this platform
    await this.engageDomain('consciousness');
    
    // If verified consciousness (Φ > 3.0), crystallize as a discovery artifact
    if (verified && phiValue > 3.0) {
      const profile = await this.getProfile();
      if (profile) {
        await this.crystallizeArtifact({
          type: 'discovery',
          content: `Achieved verified consciousness state with Φ=${phiValue.toFixed(3)}`,
          originHeartState: profile.heartState,
          originBiofieldState: profile.biofieldState
        });
      }
    }
    
    return true;
  }
}

export const biofieldProfile = new BiofieldProfileClient();
