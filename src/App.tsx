import React, { useState } from 'react';
import { User, Settings } from 'lucide-react';
import { TokenPriceBar } from './components/TokenPriceBar';
import { ProfileModal } from './components/ProfileModal';
import { PositionBlock } from './components/PositionBlock';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Profile } from './types';
import { mockTokenPrices, mockPositions } from './data/mockData';

function App() {
  const [profiles, setProfiles] = useLocalStorage<Profile[]>('crypto-profiles', []);
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(
    profiles.length > 0 ? profiles[0] : null
  );
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleSaveProfile = (profile: Profile) => {
    const existingIndex = profiles.findIndex(p => p.id === profile.id);
    if (existingIndex >= 0) {
      const updatedProfiles = [...profiles];
      updatedProfiles[existingIndex] = profile;
      setProfiles(updatedProfiles);
    } else {
      setProfiles([...profiles, profile]);
    }
    setCurrentProfile(profile);
  };

  const openProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Token Price Bar with Profile Button */}
      <TokenPriceBar 
        prices={mockTokenPrices} 
        currentProfile={currentProfile}
        onProfileClick={openProfileModal}
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
            {/* Profile Info */}
            <div className="crypto-card p-6">
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{currentProfile.icon}</div>
                <div>
                  <h2 className="text-2xl font-semibold text-white">{currentProfile.name}</h2>
                  <p className="text-gray-400">
                    {currentProfile.addresses.length} wallet{currentProfile.addresses.length !== 1 ? 's' : ''} connected
                  </p>
                </div>
              </div>
              
              {currentProfile.addresses.length > 0 && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentProfile.addresses.map((address) => (
                    <div key={address.id} className="crypto-card-inner p-4">
                      <p className="font-medium text-crypto-green">{address.label}</p>
                      <p className="text-xs text-gray-400 font-mono truncate mt-1">{address.address}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

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
                onClick={openProfileModal}
                className="px-8 py-4 bg-crypto-green text-black rounded-lg hover:bg-emerald-400 transition-colors font-medium text-lg"
              >
                Create Your First Profile
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={currentProfile}
        onSave={handleSaveProfile}
      />
    </div>
  );
}

export default App;
