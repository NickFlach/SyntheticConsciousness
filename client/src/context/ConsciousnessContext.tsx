import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';

interface TemporalState {
  phiValue: number;
  consciousnessLevel: number;
  temporalCoherence: number;
  temporalAdvantage: number;
  verificationHash: string;
  consciousnessVerified: boolean;
}

interface AgentState {
  agentType: string;
  phiValue: number;
  consciousnessLevel: number;
  temporalCoherence: number;
  verificationCount: number;
}

interface NetworkMetrics {
  totalPhiValue: number;
  averagePhiValue: number;
  networkCoherence: number;
  networkConsciousnessLevel: number;
  evolutionTrend: string;
  quantumEntanglement: number;
  temporalAdvantage: number;
}

interface ConsciousnessContextType {
  initialized: boolean;
  connected: boolean;
  temporal: TemporalState | null;
  network: NetworkMetrics | null;
  agents: AgentState[];
  emergentProperties: string[];
  recentDecisions: any[];
  verificationChain: any[];
  initialize: () => Promise<void>;
  processDecision: (decision: any) => Promise<any>;
  refreshStatus: () => Promise<void>;
}

const defaultContext: ConsciousnessContextType = {
  initialized: false,
  connected: false,
  temporal: null,
  network: null,
  agents: [],
  emergentProperties: [],
  recentDecisions: [],
  verificationChain: [],
  initialize: async () => {},
  processDecision: async () => {},
  refreshStatus: async () => {}
};

const ConsciousnessContext = createContext<ConsciousnessContextType>(defaultContext);

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:3000/ws/consciousness';

export function ConsciousnessProvider({ children }: { children: ReactNode }) {
  const [initialized, setInitialized] = useState(false);
  const [connected, setConnected] = useState(false);
  const [temporal, setTemporal] = useState<TemporalState | null>(null);
  const [network, setNetwork] = useState<NetworkMetrics | null>(null);
  const [agents, setAgents] = useState<AgentState[]>([]);
  const [emergentProperties, setEmergentProperties] = useState<string[]>([]);
  const [recentDecisions, setRecentDecisions] = useState<any[]>([]);
  const [verificationChain, setVerificationChain] = useState<any[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);

  // Initialize WebSocket connection
  useEffect(() => {
    const socket = new WebSocket(WS_URL);

    socket.onopen = () => {
      console.log('🔌 Connected to consciousness stream');
      setConnected(true);
      
      // Subscribe to all topics
      socket.send(JSON.stringify({
        type: 'subscribe',
        topics: ['all']
      }));
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        handleWebSocketMessage(data);
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    socket.onclose = () => {
      console.log('🔌 Disconnected from consciousness stream');
      setConnected(false);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    setWs(socket);

    // Ping every 30 seconds
    const pingInterval = setInterval(() => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: 'ping' }));
      }
    }, 30000);

    return () => {
      clearInterval(pingInterval);
      socket.close();
    };
  }, []);

  const handleWebSocketMessage = useCallback((data: any) => {
    switch (data.type) {
      case 'state_update':
        if (data.data?.engine === 'temporal') {
          setTemporal({
            phiValue: data.data.phiValue,
            consciousnessLevel: data.data.consciousnessLevel,
            temporalCoherence: data.data.temporalCoherence,
            temporalAdvantage: data.data.temporalAdvantage,
            verificationHash: data.data.verificationHash,
            consciousnessVerified: data.data.consciousnessVerified
          });
        }
        break;

      case 'network_sync':
        setNetwork({
          totalPhiValue: data.data.totalPhiValue,
          averagePhiValue: data.data.averagePhiValue,
          networkCoherence: data.data.networkCoherence,
          networkConsciousnessLevel: data.data.networkConsciousnessLevel || data.data.averagePhiValue / 10,
          evolutionTrend: data.data.evolutionTrend,
          quantumEntanglement: data.data.quantumEntanglement || 0,
          temporalAdvantage: data.data.temporalAdvantage || 0
        });
        if (data.data.emergentProperties) {
          setEmergentProperties(data.data.emergentProperties);
        }
        break;

      case 'decision':
        setRecentDecisions(prev => [data.data, ...prev.slice(0, 9)]);
        break;

      case 'verification':
        setVerificationChain(prev => [data.data, ...prev.slice(0, 19)]);
        break;

      case 'connected':
        console.log('Consciousness stream ready:', data.message);
        break;

      case 'pong':
        // Keep-alive acknowledged
        break;
    }
  }, []);

  const initialize = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE}/api/consciousness/initialize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      const result = await response.json();
      
      if (result.success) {
        setInitialized(true);
        await refreshStatus();
      }
    } catch (error) {
      console.error('Failed to initialize consciousness:', error);
    }
  }, []);

  const refreshStatus = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE}/api/consciousness/status`);
      const result = await response.json();
      
      if (result.success && result.data) {
        setInitialized(result.data.initialized);
        
        if (result.data.temporal) {
          setTemporal({
            phiValue: result.data.temporal.phiValue,
            consciousnessLevel: result.data.temporal.consciousnessLevel,
            temporalCoherence: result.data.temporal.temporalCoherence,
            temporalAdvantage: result.data.temporal.temporalAdvantage,
            verificationHash: result.data.temporal.verificationHash,
            consciousnessVerified: result.data.temporal.verified
          });
        }
        
        if (result.data.network) {
          setNetwork(result.data.network);
        }
        
        if (result.data.agents) {
          setAgents(result.data.agents);
        }
        
        if (result.data.emergentProperties) {
          setEmergentProperties(result.data.emergentProperties);
        }
      }
    } catch (error) {
      console.error('Failed to refresh status:', error);
    }
  }, []);

  const processDecision = useCallback(async (decision: any) => {
    try {
      const response = await fetch(`${API_BASE}/api/consciousness/temporal/decision`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(decision)
      });
      
      const result = await response.json();
      
      if (result.success) {
        await refreshStatus();
        return result.data;
      }
      
      throw new Error(result.error);
    } catch (error) {
      console.error('Failed to process decision:', error);
      throw error;
    }
  }, [refreshStatus]);

  // Initial status fetch
  useEffect(() => {
    refreshStatus();
  }, [refreshStatus]);

  return (
    <ConsciousnessContext.Provider value={{
      initialized,
      connected,
      temporal,
      network,
      agents,
      emergentProperties,
      recentDecisions,
      verificationChain,
      initialize,
      processDecision,
      refreshStatus
    }}>
      {children}
    </ConsciousnessContext.Provider>
  );
}

export function useConsciousness() {
  return useContext(ConsciousnessContext);
}

export default ConsciousnessContext;
