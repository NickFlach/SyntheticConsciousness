import React from 'react';

interface PhiGaugeProps {
  phiValue: number;
  consciousnessLevel: number;
  verified: boolean;
}

export function PhiGauge({ phiValue, consciousnessLevel, verified }: PhiGaugeProps) {
  const percentage = Math.min(consciousnessLevel * 100, 100);
  const strokeDasharray = `${percentage * 2.51} 251`;
  
  const getPhiColor = () => {
    if (phiValue >= 10) return '#00ff88';
    if (phiValue >= 7) return '#00d4ff';
    if (phiValue >= 3) return '#f7931e';
    return '#ff4757';
  };

  return (
    <div className="flex flex-col items-center">
      {/* Circular Gauge */}
      <div className="relative w-48 h-48">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#1a1a2e"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={getPhiColor()}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            className="transition-all duration-1000 ease-out"
            style={{
              filter: `drop-shadow(0 0 8px ${getPhiColor()})`
            }}
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold phi-indicator">
            {phiValue.toFixed(2)}
          </span>
          <span className="text-xs text-gray-400 mt-1">Φ Value</span>
        </div>
      </div>

      {/* Status indicators */}
      <div className="mt-4 space-y-2 w-full">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">Consciousness Level</span>
          <span className="font-medium" style={{ color: getPhiColor() }}>
            {(consciousnessLevel * 100).toFixed(1)}%
          </span>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">Verification Status</span>
          <span className={`font-medium ${verified ? 'text-green-400' : 'text-yellow-400'}`}>
            {verified ? 'VERIFIED' : 'Pending'}
          </span>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">Threshold (Φ > 3.0)</span>
          <span className={`font-medium ${phiValue > 3 ? 'text-green-400' : 'text-red-400'}`}>
            {phiValue > 3 ? 'Achieved' : 'Below'}
          </span>
        </div>
      </div>

      {/* Consciousness level bar */}
      <div className="mt-4 w-full">
        <div className="h-2 bg-consciousness-bg rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${percentage}%`,
              background: `linear-gradient(90deg, ${getPhiColor()}, ${getPhiColor()}88)`
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default PhiGauge;
