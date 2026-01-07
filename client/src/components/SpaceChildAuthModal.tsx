import React, { useState } from 'react';
import { useSpaceChildAuth } from '../hooks/useSpaceChildAuth';

interface SpaceChildAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function SpaceChildAuthModal({ isOpen, onClose, onSuccess }: SpaceChildAuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, register, initiateSSO } = useSpaceChildAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const result = mode === 'login'
        ? await login(email, password)
        : await register(email, password, name);

      if (result.success) {
        onSuccess?.();
        onClose();
      } else {
        setError(result.error || 'Authentication failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-consciousness-surface border border-consciousness-border rounded-xl p-6 w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">
            {mode === 'login' ? 'Welcome Back' : 'Join Space Child'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        {/* SSO Button */}
        <button
          onClick={initiateSSO}
          className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-medium hover:opacity-90 transition-opacity mb-4"
        >
          Continue with Space Child
        </button>

        <div className="flex items-center gap-4 my-4">
          <div className="flex-1 h-px bg-consciousness-border" />
          <span className="text-gray-500 text-sm">or</span>
          <div className="flex-1 h-px bg-consciousness-border" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-sm text-gray-400 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 bg-consciousness-bg border border-consciousness-border rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
                placeholder="Your name"
              />
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-consciousness-bg border border-consciousness-border rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-consciousness-bg border border-consciousness-border rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
              placeholder="••••••••"
              required
              minLength={8}
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm p-2 bg-red-900/20 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-consciousness-bg border border-cyan-500/50 text-cyan-400 rounded-lg font-medium hover:bg-cyan-500/10 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="mt-4 text-center text-sm text-gray-400">
          {mode === 'login' ? (
            <>
              Don't have an account?{' '}
              <button
                onClick={() => setMode('register')}
                className="text-cyan-400 hover:underline"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                onClick={() => setMode('login')}
                className="text-cyan-400 hover:underline"
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SpaceChildAuthModal;
