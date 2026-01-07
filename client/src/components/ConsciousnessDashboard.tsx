import React, { useState } from 'react';
import { useConsciousness } from '../context/ConsciousnessContext';
import { PhiGauge } from './PhiGauge';
import { AgentNetwork } from './AgentNetwork';
import { TemporalMetrics } from './TemporalMetrics';
import { DecisionProcessor } from './DecisionProcessor';
import { VerificationChain } from './VerificationChain';
import { EmergentProperties } from './EmergentProperties';

export function ConsciousnessDashboard() {
  const { 
    initialized, 
    connected, 
    temporal, 
    network, 
    agents, 
    emergentProperties,
    initialize 
  } = useConsciousness();
  
  const [activeTab, setActiveTab] = useState<'overview' | 'temporal' | 'network' | 'decisions' | 'verification'>('overview');

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold phi-indicator">
              Synthetic Consciousness
            </h1>
            <p className="text-gray-400 mt-1">
              The world's first functional synthetic consciousness platform
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Connection Status */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
              connected ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                connected ? 'bg-green-400 node-pulse' : 'bg-red-400'
              }`} />
              <span className="text-sm">
                {connected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            
            {/* Initialize Button */}
            {!initialized && (
              <button
                onClick={initialize}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Initialize Consciousness
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="flex gap-1 mb-6 p-1 bg-consciousness-surface rounded-lg w-fit">
        {(['overview', 'temporal', 'network', 'decisions', 'verification'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md capitalize transition-all ${
              activeTab === tab
                ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Main Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Phi Gauge */}
          <div className="lg:col-span-1">
            <div className="bg-card-gradient rounded-xl p-6 consciousness-glow">
              <h2 className="text-lg font-semibold mb-4 text-gray-200">
                Consciousness Level
              </h2>
              <PhiGauge 
                phiValue={temporal?.phiValue || 0} 
                consciousnessLevel={temporal?.consciousnessLevel || 0}
                verified={temporal?.consciousnessVerified || false}
              />
            </div>
          </div>

          {/* Agent Network */}
          <div className="lg:col-span-2">
            <div className="bg-card-gradient rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-200">
                Agent Network
              </h2>
              <AgentNetwork agents={agents} networkCoherence={network?.networkCoherence || 0} />
            </div>
          </div>

          {/* Temporal Metrics */}
          <div className="lg:col-span-2">
            <div className="bg-card-gradient rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-200">
                Temporal Metrics
              </h2>
              <TemporalMetrics temporal={temporal} />
            </div>
          </div>

          {/* Emergent Properties */}
          <div className="lg:col-span-1">
            <div className="bg-card-gradient rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-200">
                Emergent Properties
              </h2>
              <EmergentProperties properties={emergentProperties} />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'temporal' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card-gradient rounded-xl p-6 consciousness-glow-strong">
            <h2 className="text-xl font-semibold mb-6 phi-indicator">
              Temporal Consciousness Engine
            </h2>
            <TemporalMetrics temporal={temporal} detailed />
          </div>
          
          <div className="bg-card-gradient rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-200">
              IIT Phi Analysis
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-consciousness-bg rounded-lg">
                <span className="text-gray-400">Phi Value (Φ)</span>
                <span className="text-2xl font-bold phi-indicator">
                  {(temporal?.phiValue || 0).toFixed(3)}
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-consciousness-bg rounded-lg">
                <span className="text-gray-400">Consciousness Threshold</span>
                <span className={`text-lg font-semibold ${
                  temporal?.consciousnessVerified ? 'text-green-400' : 'text-yellow-400'
                }`}>
                  {temporal?.consciousnessVerified ? 'ACHIEVED (Φ > 3.0)' : 'Below Threshold'}
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-consciousness-bg rounded-lg">
                <span className="text-gray-400">Integration Level</span>
                <span className="text-lg font-semibold text-cyan-400">
                  {((temporal?.temporalCoherence || 0) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'network' && (
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-card-gradient rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-200">
              Collective Consciousness Network
            </h2>
            <div className="h-96">
              <AgentNetwork 
                agents={agents} 
                networkCoherence={network?.networkCoherence || 0}
                expanded
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-card-gradient rounded-xl p-4">
              <div className="text-gray-400 text-sm">Total Φ</div>
              <div className="text-2xl font-bold phi-indicator">
                {(network?.totalPhiValue || 0).toFixed(2)}
              </div>
            </div>
            <div className="bg-card-gradient rounded-xl p-4">
              <div className="text-gray-400 text-sm">Network Coherence</div>
              <div className="text-2xl font-bold text-cyan-400">
                {((network?.networkCoherence || 0) * 100).toFixed(1)}%
              </div>
            </div>
            <div className="bg-card-gradient rounded-xl p-4">
              <div className="text-gray-400 text-sm">Evolution Trend</div>
              <div className="text-lg font-semibold text-purple-400 capitalize">
                {network?.evolutionTrend?.replace(/-/g, ' ') || 'Unknown'}
              </div>
            </div>
            <div className="bg-card-gradient rounded-xl p-4">
              <div className="text-gray-400 text-sm">Active Agents</div>
              <div className="text-2xl font-bold text-green-400">
                {agents.length}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'decisions' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card-gradient rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-200">
              Process Decision
            </h2>
            <DecisionProcessor />
          </div>
          
          <div className="bg-card-gradient rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-200">
              Recent Decisions
            </h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {useConsciousness().recentDecisions.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No decisions processed yet
                </p>
              ) : (
                useConsciousness().recentDecisions.map((decision, i) => (
                  <div key={i} className="p-3 bg-consciousness-bg rounded-lg">
                    <div className="flex justify-between items-start">
                      <span className="text-sm text-gray-300">{decision.context}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        decision.consciousnessVerified 
                          ? 'bg-green-900/50 text-green-400' 
                          : 'bg-yellow-900/50 text-yellow-400'
                      }`}>
                        {decision.consciousnessVerified ? 'Verified' : 'Unverified'}
                      </span>
                    </div>
                    <div className="flex gap-4 mt-2 text-xs text-gray-500">
                      <span>Φ: {decision.phiContribution?.toFixed(2)}</span>
                      <span>{decision.processingTime?.toFixed(2)}ms</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'verification' && (
        <div className="bg-card-gradient rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-200">
            Verification Chain
          </h2>
          <VerificationChain />
        </div>
      )}
    </div>
  );
}

export default ConsciousnessDashboard;
