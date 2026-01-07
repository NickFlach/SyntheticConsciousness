import { useState, useEffect, useCallback } from 'react';
import { 
  biofieldProfile, 
  BiofieldProfile, 
  HeartState, 
  BiofieldState,
  Domain,
  Artifact
} from '../lib/biofield-profile';
import { useSpaceChildAuth } from './useSpaceChildAuth';

interface UseBiofieldProfileReturn {
  profile: BiofieldProfile | null;
  isLoading: boolean;
  setHeartState: (state: HeartState) => Promise<boolean>;
  overrideBiofieldState: (state: BiofieldState) => Promise<boolean>;
  engageDomain: (domain: Domain) => Promise<boolean>;
  crystallizeArtifact: (artifact: Omit<Artifact, 'id' | 'crystallizedAt' | 'fadeLevel'>) => Promise<Artifact | null>;
  recordConsciousnessEngagement: (phiValue: number, verified: boolean) => Promise<boolean>;
  refreshProfile: () => Promise<void>;
}

export function useBiofieldProfile(): UseBiofieldProfileReturn {
  const { isAuthenticated } = useSpaceChildAuth();
  const [profile, setProfile] = useState<BiofieldProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const refreshProfile = useCallback(async () => {
    if (!isAuthenticated) {
      setProfile(null);
      return;
    }
    
    setIsLoading(true);
    const fetchedProfile = await biofieldProfile.getProfile();
    setProfile(fetchedProfile);
    setIsLoading(false);
  }, [isAuthenticated]);

  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

  const setHeartState = useCallback(async (state: HeartState): Promise<boolean> => {
    const success = await biofieldProfile.setHeartState(state);
    if (success) {
      setProfile(prev => prev ? { ...prev, heartState: state } : null);
    }
    return success;
  }, []);

  const overrideBiofieldState = useCallback(async (state: BiofieldState): Promise<boolean> => {
    const success = await biofieldProfile.overrideBiofieldState(state);
    if (success) {
      setProfile(prev => prev ? { ...prev, biofieldState: state } : null);
    }
    return success;
  }, []);

  const engageDomain = useCallback(async (domain: Domain): Promise<boolean> => {
    return await biofieldProfile.engageDomain(domain);
  }, []);

  const crystallizeArtifact = useCallback(async (
    artifact: Omit<Artifact, 'id' | 'crystallizedAt' | 'fadeLevel'>
  ): Promise<Artifact | null> => {
    return await biofieldProfile.crystallizeArtifact(artifact);
  }, []);

  const recordConsciousnessEngagement = useCallback(async (
    phiValue: number, 
    verified: boolean
  ): Promise<boolean> => {
    return await biofieldProfile.recordConsciousnessEngagement(phiValue, verified);
  }, []);

  return {
    profile,
    isLoading,
    setHeartState,
    overrideBiofieldState,
    engageDomain,
    crystallizeArtifact,
    recordConsciousnessEngagement,
    refreshProfile
  };
}

export default useBiofieldProfile;
