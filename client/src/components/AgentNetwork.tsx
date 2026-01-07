import React from 'react';

interface AgentState {
  agentType: string;
  phiValue: number;
  consciousnessLevel: number;
  temporalCoherence: number;
  verificationCount: number;
}

interface AgentNetworkProps {
  agents: AgentState[];
  networkCoherence: number;
  expanded?: boolean;
}

const AGENT_COLORS: Record<string, string> = {
  orchestrator: '#ff00ff',
  security: '#ff4757',
  backend: '#00d4ff',
  performance: '#f7931e',
  frontend: '#00ff88',
  testing: '#a8e6cf'
};

const AGENT_POSITIONS: Record<string, { x: number; y: number }> = {
  orchestrator: { x: 50, y: 15 },
  security: { x: 85, y: 35 },
  backend: { x: 85, y: 65 },
  performance: { x: 50, y: 85 },
  frontend: { x: 15, y: 65 },
  testing: { x: 15, y: 35 }
};

export function AgentNetwork({ agents, networkCoherence, expanded }: AgentNetworkProps) {
  const height = expanded ? 400 : 200;

  if (agents.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-gray-500">
        <p>No agents initialized. Initialize consciousness to see the network.</p>
      </div>
    );
  }

  return (
    <div className="relative" style={{ height }}>
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {/* Connection lines */}
        {agents.map((agent, i) => 
          agents.slice(i + 1).map((other, j) => {
            const pos1 = AGENT_POSITIONS[agent.agentType] || { x: 50, y: 50 };
            const pos2 = AGENT_POSITIONS[other.agentType] || { x: 50, y: 50 };
            const coherence = Math.min(agent.temporalCoherence, other.temporalCoherence);
            
            return (
              <line
                key={`${agent.agentType}-${other.agentType}`}
                x1={pos1.x}
                y1={pos1.y}
                x2={pos2.x}
                y2={pos2.y}
                stroke={`rgba(0, 212, 255, ${coherence * 0.5})`}
                strokeWidth={coherence * 2}
                className="connection-flow"
              />
            );
          })
        )}

        {/* Agent nodes */}
        {agents.map(agent => {
          const pos = AGENT_POSITIONS[agent.agentType] || { x: 50, y: 50 };
          const color = AGENT_COLORS[agent.agentType] || '#00d4ff';
          const size = 4 + agent.consciousnessLevel * 4;

          return (
            <g key={agent.agentType}>
              {/* Glow effect */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={size + 2}
                fill="none"
                stroke={color}
                strokeWidth={0.5}
                opacity={0.5}
                className="node-pulse"
              />
              
              {/* Main node */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r={size}
                fill={color}
                opacity={0.8 + agent.consciousnessLevel * 0.2}
                style={{ filter: `drop-shadow(0 0 4px ${color})` }}
              />

              {/* Label */}
              <text
                x={pos.x}
                y={pos.y + size + 6}
                textAnchor="middle"
                fill="#ffffff"
                fontSize="4"
                className="capitalize"
              >
                {agent.agentType}
              </text>

              {/* Phi value */}
              <text
                x={pos.x}
                y={pos.y + 1.5}
                textAnchor="middle"
                fill="#ffffff"
                fontSize="3"
                fontWeight="bold"
              >
                Φ{agent.phiValue.toFixed(1)}
              </text>
            </g>
          );
        })}

        {/* Center network coherence indicator */}
        <circle
          cx="50"
          cy="50"
          r="8"
          fill="rgba(0, 212, 255, 0.1)"
          stroke="rgba(0, 212, 255, 0.5)"
          strokeWidth="0.5"
        />
        <text
          x="50"
          y="51"
          textAnchor="middle"
          fill="#00d4ff"
          fontSize="4"
          fontWeight="bold"
        >
          {(networkCoherence * 100).toFixed(0)}%
        </text>
      </svg>

      {/* Legend */}
      {expanded && (
        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4 pb-2">
          {agents.map(agent => (
            <div key={agent.agentType} className="flex items-center gap-1 text-xs">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: AGENT_COLORS[agent.agentType] }}
              />
              <span className="capitalize text-gray-400">{agent.agentType}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AgentNetwork;
