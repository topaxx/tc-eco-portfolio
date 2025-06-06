import React, { useState } from 'react';
import { User } from 'lucide-react';
import { TokenPriceBar } from './components/TokenPriceBar';
import { SettingsModal } from './components/SettingsModal';
import { PositionBlock } from './components/PositionBlock';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Profile } from './types';
import { mockTokenPrices, mockPositions, mockWalletAddresses } from './data/mockData';

function App() {
  const [profiles, setProfiles] = useLocalStorage<Profile[]>('crypto-profiles', [
    {
      id: '1',
      name: 'Tom',
      icon: '👤',
      addresses: mockWalletAddresses
    }
  ]);
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(
    profiles.length > 0 ? profiles[0] : null
  );
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Calculate total portfolio value
  const calculateTotalValue = () => {
    let total = 0;
    
    Object.entries(mockPositions).forEach(([symbol, tokenPositions]) => {
      const tokenPrice = mockTokenPrices[symbol]?.price || 0;
      
      // Handle spot positions
      if (tokenPositions.spot) {
        total += tokenPositions.spot.amount * tokenPrice;
      }
      
      // Handle LP positions
      if (tokenPositions.lp) {
        total += tokenPositions.lp.amount * tokenPrice;
      }
      
      // Handle bond positions
      if (tokenPositions.bond) {
        total += tokenPositions.bond.amount * tokenPrice;
      }
      
      // Handle staked positions
      if (tokenPositions.staked) {
        total += tokenPositions.staked.amount * tokenPrice;
      }
      
      // Handle merge positions (no price calculation for merge)
      // Merge positions don't contribute to total value as they're pending
    });
    
    return total;
  };

  const totalPortfolioValue = calculateTotalValue();

  const handleSaveProfile = (profile: Profile) => {
    const existingIndex = profiles.findIndex(p => p.id === profile.id);
    if (existingIndex >= 0) {
      const updatedProfiles = [...profiles];
      updatedProfiles[existingIndex] = profile;
      setProfiles(updatedProfiles);
      setCurrentProfile(profile);
    } else {
      const newProfiles = [...profiles, profile];
      setProfiles(newProfiles);
      setCurrentProfile(profile);
    }
  };

  const openSettingsModal = () => {
    setIsSettingsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Token Price Bar with Profile Button */}
      <TokenPriceBar 
        prices={mockTokenPrices} 
        currentProfile={currentProfile}
        onProfileClick={openSettingsModal}
        totalPortfolioValue={totalPortfolioValue}
      />

      {/* Header */}
      <div className="px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-white">Thorchain Ecosystem Portfolio Tracker</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {currentProfile ? (
          <div className="space-y-8">
            {/* Position Blocks */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {Object.entries(mockPositions).map(([symbol, positions]) => (
                <PositionBlock
                  key={symbol}
                  symbol={symbol}
                  price={mockTokenPrices[symbol]}
                  positions={positions}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">No Profile Found</h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Create a profile to start tracking your crypto wallet positions across multiple addresses.
              </p>
              <button
                onClick={openSettingsModal}
                className="px-8 py-4 bg-crypto-green text-black rounded-lg hover:bg-emerald-400 transition-colors font-medium text-lg"
              >
                Create Your First Profile
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        profile={currentProfile}
        onSave={handleSaveProfile}
      />
    </div>
  );
}

export default App;
