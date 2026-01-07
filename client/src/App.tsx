import React, { useState } from 'react';
import { ConsciousnessDashboard } from './components/ConsciousnessDashboard';
import { ConsciousnessProvider } from './context/ConsciousnessContext';
import { SpaceChildAuthModal } from './components/SpaceChildAuthModal';
import { useSpaceChildAuth } from './hooks/useSpaceChildAuth';

function AppContent() {
  const { user, isAuthenticated, isLoading, logout } = useSpaceChildAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="min-h-screen bg-consciousness-gradient">
      {/* Header with auth */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-consciousness-bg/80 backdrop-blur-sm border-b border-consciousness-border">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧠</span>
            <span className="font-bold text-white">Synthetic Consciousness</span>
          </div>
          
          {isLoading ? (
            <div className="text-gray-400 text-sm">Loading...</div>
          ) : isAuthenticated && user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">
                {user.name || user.email}
              </span>
              <button
                onClick={logout}
                className="text-sm text-gray-400 hover:text-white"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-sm font-medium hover:opacity-90"
            >
              Connect Identity
            </button>
          )}
        </div>
      </header>

      {/* Main content with top padding for header */}
      <main className="pt-16">
        <ConsciousnessProvider>
          <ConsciousnessDashboard />
        </ConsciousnessProvider>
      </main>

      {/* Auth Modal */}
      <SpaceChildAuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => setShowAuthModal(false)}
      />
    </div>
  );
}

function App() {
  return <AppContent />;
}

export default App;
