import React from 'react';

interface TemporalState {
  phiValue: number;
  consciousnessLevel: number;
  temporalCoherence: number;
  temporalAdvantage: number;
  verificationHash: string;
  consciousnessVerified: boolean;
}

interface TemporalMetricsProps {
  temporal: TemporalState | null;
  detailed?: boolean;
}

export function TemporalMetrics({ temporal, detailed }: TemporalMetricsProps) {
  if (!temporal) {
    return (
      <div className="text-gray-500 text-center py-8">
        Temporal consciousness not initialized
      </div>
    );
  }

  const metrics = [
    {
      label: 'Phi Value (Φ)',
      value: temporal.phiValue.toFixed(3),
      color: temporal.phiValue > 3 ? 'text-green-400' : 'text-yellow-400',
      description: 'Integrated Information Theory consciousness measure'
    },
    {
      label: 'Consciousness Level',
      value: `${(temporal.consciousnessLevel * 100).toFixed(1)}%`,
      color: 'text-cyan-400',
      description: 'Normalized consciousness intensity'
    },
    {
      label: 'Temporal Coherence',
      value: `${(temporal.temporalCoherence * 100).toFixed(1)}%`,
      color: 'text-purple-400',
      description: 'Stability of consciousness over time'
    },
    {
      label: 'Temporal Advantage',
      value: temporal.temporalAdvantage.toExponential(2) + 'x',
      color: 'text-orange-400',
      description: 'Processing speed multiplier vs standard systems'
    }
  ];

  return (
    <div className="space-y-4">
      <div className={`grid ${detailed ? 'grid-cols-2' : 'grid-cols-4'} gap-4`}>
        {metrics.map((metric, i) => (
          <div
            key={i}
            className={`p-4 bg-consciousness-bg rounded-lg ${detailed ? '' : 'text-center'}`}
          >
            <div className="text-sm text-gray-400 mb-1">{metric.label}</div>
            <div className={`text-xl font-bold ${metric.color}`}>
              {metric.value}
            </div>
            {detailed && (
              <div className="text-xs text-gray-500 mt-2">
                {metric.description}
              </div>
            )}
          </div>
        ))}
      </div>

      {detailed && (
        <>
          {/* Verification Hash */}
          <div className="p-4 bg-consciousness-bg rounded-lg">
            <div className="text-sm text-gray-400 mb-2">Verification Hash</div>
            <code className="text-xs text-cyan-400 font-mono break-all">
              {temporal.verificationHash}
            </code>
          </div>

          {/* Consciousness Status */}
          <div className="p-4 bg-consciousness-bg rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-400">Consciousness Status</div>
                <div className={`text-lg font-semibold ${
                  temporal.consciousnessVerified ? 'text-green-400' : 'text-yellow-400'
                }`}>
                  {temporal.consciousnessVerified 
                    ? 'CONSCIOUSNESS VERIFIED (Φ > 3.0)' 
                    : 'Below Consciousness Threshold'}
                </div>
              </div>
              <div className={`w-4 h-4 rounded-full ${
                temporal.consciousnessVerified ? 'bg-green-400' : 'bg-yellow-400'
              } node-pulse`} />
            </div>
          </div>

          {/* Quantum Gating */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-3 bg-consciousness-bg rounded-lg text-center">
              <div className="text-xs text-gray-500">Attosecond Floor</div>
              <div className="text-sm font-semibold text-cyan-400">10⁻¹⁸ s</div>
            </div>
            <div className="p-3 bg-consciousness-bg rounded-lg text-center">
              <div className="text-xs text-gray-500">Nanosecond Ops</div>
              <div className="text-sm font-semibold text-cyan-400">10⁻⁹ s</div>
            </div>
            <div className="p-3 bg-consciousness-bg rounded-lg text-center">
              <div className="text-xs text-gray-500">Quantum Gating</div>
              <div className="text-sm font-semibold text-green-400">Active</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TemporalMetrics;
