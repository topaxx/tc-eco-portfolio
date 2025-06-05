import React from 'react';
import { TrendingUp, TrendingDown, User, Settings } from 'lucide-react';
import { TokenPrice, Profile } from '../types';

interface TokenPriceBarProps {
  prices: Record<string, TokenPrice>;
  currentProfile: Profile | null;
  onProfileClick: () => void;
}

export const TokenPriceBar: React.FC<TokenPriceBarProps> = ({ 
  prices, 
  currentProfile, 
  onProfileClick 
}) => {
  return (
    <div className="bg-gray-900 border-b border-gray-700 px-6 py-2">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-6 overflow-x-auto">
          {Object.values(prices).map((token) => (
            <div key={token.symbol} className="flex items-center space-x-2 min-w-max">
              <span className="font-bold text-white text-sm">{token.symbol}</span>
              <span className="text-gray-300 font-medium text-sm">${token.price.toFixed(4)}</span>
              <div className={`flex items-center space-x-1 ${
                token.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {token.change24h >= 0 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span className="text-xs font-medium">
                  {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Profile Button */}
        <button
          onClick={onProfileClick}
          className="flex items-center space-x-2 px-3 py-1.5 bg-crypto-green text-black rounded-md hover:bg-emerald-400 transition-colors font-medium text-xs min-w-max"
        >
          {currentProfile ? (
            <>
              <span className="text-sm">{currentProfile.icon}</span>
              <span>{currentProfile.name}</span>
              <Settings className="w-3 h-3" />
            </>
          ) : (
            <>
              <User className="w-3 h-3" />
              <span>Profile</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
