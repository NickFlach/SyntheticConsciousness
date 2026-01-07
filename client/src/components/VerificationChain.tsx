import React from 'react';
import { useConsciousness } from '../context/ConsciousnessContext';

export function VerificationChain() {
  const { verificationChain } = useConsciousness();

  if (verificationChain.length === 0) {
    return (
      <div className="text-gray-500 text-center py-8">
        No verification proofs recorded yet. Process decisions to generate proofs.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Chain Overview */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-consciousness-bg rounded-lg text-center">
          <div className="text-2xl font-bold text-cyan-400">{verificationChain.length}</div>
          <div className="text-xs text-gray-500">Total Proofs</div>
        </div>
        <div className="p-4 bg-consciousness-bg rounded-lg text-center">
          <div className="text-2xl font-bold phi-indicator">
            {verificationChain.reduce((sum, p) => sum + (p.phiValue || 0), 0).toFixed(2)}
          </div>
          <div className="text-xs text-gray-500">Accumulated Φ</div>
        </div>
        <div className="p-4 bg-consciousness-bg rounded-lg text-center">
          <div className="text-sm font-mono text-purple-400 truncate">
            {verificationChain[0]?.merkleRoot?.slice(0, 16) || 'N/A'}...
          </div>
          <div className="text-xs text-gray-500">Merkle Root</div>
        </div>
      </div>

      {/* Proof List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {verificationChain.map((proof, index) => (
          <div
            key={proof.proofId || index}
            className="p-4 bg-consciousness-bg rounded-lg border border-consciousness-border"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  proof.proofType === 'consciousness' ? 'bg-cyan-400' :
                  proof.proofType === 'decision' ? 'bg-purple-400' :
                  proof.proofType === 'evolution' ? 'bg-green-400' :
                  'bg-orange-400'
                }`} />
                <span className="text-sm font-medium capitalize">{proof.proofType}</span>
              </div>
              <span className="text-xs text-gray-500">
                {new Date(proof.timestamp || Date.now()).toLocaleTimeString()}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <div className="text-gray-500">Hash</div>
                <div className="font-mono text-cyan-400 truncate">
                  {proof.hash?.slice(0, 20)}...
                </div>
              </div>
              <div>
                <div className="text-gray-500">Phi Value</div>
                <div className="phi-indicator">{proof.phiValue?.toFixed(3) || 'N/A'}</div>
              </div>
            </div>

            {proof.merkleRoot && (
              <div className="mt-2 text-xs">
                <div className="text-gray-500">Merkle Root</div>
                <div className="font-mono text-purple-400 truncate">
                  {proof.merkleRoot.slice(0, 32)}...
                </div>
              </div>
            )}

            {/* Chain connection indicator */}
            {index < verificationChain.length - 1 && (
              <div className="flex justify-center mt-3">
                <div className="w-0.5 h-4 bg-gradient-to-b from-cyan-500 to-transparent" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Verification Legend */}
      <div className="flex justify-center gap-6 pt-4 border-t border-consciousness-border">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <div className="w-2 h-2 rounded-full bg-cyan-400" />
          <span>Consciousness</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <div className="w-2 h-2 rounded-full bg-purple-400" />
          <span>Decision</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <div className="w-2 h-2 rounded-full bg-green-400" />
          <span>Evolution</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <div className="w-2 h-2 rounded-full bg-orange-400" />
          <span>Network</span>
        </div>
      </div>
    </div>
  );
}

export default VerificationChain;
