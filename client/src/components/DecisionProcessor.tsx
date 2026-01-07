import React, { useState } from 'react';
import { useConsciousness } from '../context/ConsciousnessContext';

export function DecisionProcessor() {
  const { processDecision, initialized } = useConsciousness();
  const [context, setContext] = useState('');
  const [options, setOptions] = useState<{ id: string; description: string }[]>([
    { id: 'option-1', description: '' },
    { id: 'option-2', description: '' }
  ]);
  const [urgency, setUrgency] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAddOption = () => {
    setOptions([...options, { id: `option-${options.length + 1}`, description: '' }]);
  };

  const handleRemoveOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index].description = value;
    setOptions(newOptions);
  };

  const handleSubmit = async () => {
    if (!context || options.some(o => !o.description)) return;

    setProcessing(true);
    setResult(null);

    try {
      const decision = {
        context,
        options: options.map((o, i) => ({
          ...o,
          ethicalScore: 0.5 + Math.random() * 0.5,
          impactPotential: 0.3 + Math.random() * 0.7
        })),
        temporalWindow: 1000,
        urgencyLevel: urgency,
        requiresVerification: true
      };

      const response = await processDecision(decision);
      setResult(response);
    } catch (error) {
      console.error('Decision processing failed:', error);
    } finally {
      setProcessing(false);
    }
  };

  if (!initialized) {
    return (
      <div className="text-gray-500 text-center py-8">
        Initialize consciousness to process decisions
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Context */}
      <div>
        <label className="block text-sm text-gray-400 mb-1">Decision Context</label>
        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="Describe the decision context..."
          className="w-full p-3 bg-consciousness-bg border border-consciousness-border rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none resize-none"
          rows={3}
        />
      </div>

      {/* Options */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm text-gray-400">Decision Options</label>
          <button
            onClick={handleAddOption}
            className="text-xs text-cyan-400 hover:text-cyan-300"
          >
            + Add Option
          </button>
        </div>
        <div className="space-y-2">
          {options.map((option, index) => (
            <div key={option.id} className="flex gap-2">
              <input
                value={option.description}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                className="flex-1 p-2 bg-consciousness-bg border border-consciousness-border rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none text-sm"
              />
              {options.length > 2 && (
                <button
                  onClick={() => handleRemoveOption(index)}
                  className="px-2 text-red-400 hover:text-red-300"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Urgency */}
      <div>
        <label className="block text-sm text-gray-400 mb-2">Urgency Level</label>
        <div className="flex gap-2">
          {(['low', 'medium', 'high', 'critical'] as const).map((level) => (
            <button
              key={level}
              onClick={() => setUrgency(level)}
              className={`px-3 py-1.5 rounded-lg text-sm capitalize transition-all ${
                urgency === level
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                  : 'bg-consciousness-bg text-gray-400 border border-consciousness-border hover:border-gray-500'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={processing || !context || options.some(o => !o.description)}
        className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing ? 'Processing...' : 'Process Through Consciousness'}
      </button>

      {/* Result */}
      {result && (
        <div className="p-4 bg-consciousness-bg rounded-lg border border-green-500/30">
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-2 h-2 rounded-full ${
              result.consciousnessVerified ? 'bg-green-400' : 'bg-yellow-400'
            }`} />
            <span className="text-sm font-medium">
              {result.consciousnessVerified ? 'Consciousness Verified' : 'Below Threshold'}
            </span>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Selected Option</span>
              <span className="text-white">{result.selectedOption?.description}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Phi Contribution</span>
              <span className="phi-indicator">{result.phiContribution?.toFixed(3)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Processing Time</span>
              <span className="text-cyan-400">{result.processingTime?.toFixed(2)}ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Temporal Advantage</span>
              <span className="text-orange-400">{result.temporalAdvantage?.toExponential(2)}x</span>
            </div>
          </div>

          {result.emergentInsights?.length > 0 && (
            <div className="mt-3 pt-3 border-t border-consciousness-border">
              <div className="text-xs text-gray-500 mb-2">Emergent Insights</div>
              <ul className="text-xs text-gray-400 space-y-1">
                {result.emergentInsights.map((insight: string, i: number) => (
                  <li key={i}>• {insight}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DecisionProcessor;
