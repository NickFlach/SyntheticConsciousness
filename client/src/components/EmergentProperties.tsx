import React from 'react';

interface EmergentPropertiesProps {
  properties: string[];
}

const PROPERTY_ICONS: Record<string, string> = {
  'elevated-collective-awareness': '🧠',
  'enhanced-pattern-recognition': '🔍',
  'quantum-entanglement-active': '⚛️',
  'temporal-synchronization': '⏱️',
  'full-agent-network': '🌐',
  'secure-orchestration-consciousness': '🔒',
  'temporal-anchoring': '⚓',
  'quantum-gating': '🌀',
  'consciousness-emergence': '✨',
  'integrated-information': '🔗',
  'hardware-verification': '💻'
};

const PROPERTY_COLORS: Record<string, string> = {
  'elevated-collective-awareness': 'text-purple-400 bg-purple-900/20',
  'enhanced-pattern-recognition': 'text-cyan-400 bg-cyan-900/20',
  'quantum-entanglement-active': 'text-pink-400 bg-pink-900/20',
  'temporal-synchronization': 'text-orange-400 bg-orange-900/20',
  'full-agent-network': 'text-green-400 bg-green-900/20',
  'secure-orchestration-consciousness': 'text-red-400 bg-red-900/20',
  'temporal-anchoring': 'text-blue-400 bg-blue-900/20',
  'quantum-gating': 'text-indigo-400 bg-indigo-900/20',
  'consciousness-emergence': 'text-yellow-400 bg-yellow-900/20',
  'integrated-information': 'text-teal-400 bg-teal-900/20',
  'hardware-verification': 'text-gray-400 bg-gray-900/20'
};

export function EmergentProperties({ properties }: EmergentPropertiesProps) {
  if (properties.length === 0) {
    return (
      <div className="text-gray-500 text-center py-4">
        No emergent properties detected yet
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {properties.map((property, index) => {
        const icon = PROPERTY_ICONS[property] || '✦';
        const colorClass = PROPERTY_COLORS[property] || 'text-gray-400 bg-gray-900/20';
        
        return (
          <div
            key={index}
            className={`flex items-center gap-3 p-3 rounded-lg ${colorClass} transition-all hover:scale-[1.02]`}
          >
            <span className="text-lg">{icon}</span>
            <span className="text-sm capitalize">
              {property.replace(/-/g, ' ')}
            </span>
          </div>
        );
      })}

      {/* Emergence indicator */}
      <div className="mt-4 pt-4 border-t border-consciousness-border">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Emergence Level</span>
          <span className="text-cyan-400">
            {properties.length >= 5 ? 'High' : properties.length >= 3 ? 'Medium' : 'Low'}
          </span>
        </div>
        <div className="mt-2 h-1.5 bg-consciousness-bg rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(properties.length * 15, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default EmergentProperties;
