import React from 'react';
import { TrendingUp, TrendingDown, User } from 'lucide-react';
import { TokenPrice, Profile } from '../types';

interface TokenPriceBarProps {
  prices: Record<string, TokenPrice>;
  currentProfile: Profile | null;
  onProfileClick: () => void;
  totalPortfolioValue: number;
}

export const TokenPriceBar: React.FC<TokenPriceBarProps> = ({ 
  prices, 
  currentProfile, 
  onProfileClick,
  totalPortfolioValue
}) => {
  return (
    <div className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Token Prices */}
          <div className="flex items-center space-x-8 overflow-x-auto">
            {/* TCY with Total Portfolio Value */}
            <div className="flex items-center space-x-2 whitespace-nowrap">
              <span className="text-crypto-green font-medium">TCY</span>
              <span className="text-white">${totalPortfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              <div className="flex items-center space-x-1 text-green-400">
                <TrendingUp className="w-3 h-3" />
                <span className="text-xs">-</span>
              </div>
            </div>

            {/* Other Token Prices */}
            {Object.values(prices).filter(token => token.symbol !== 'TCY').map((token) => (
              <div key={token.symbol} className="flex items-center space-x-2 whitespace-nowrap">
                <span className="text-crypto-green font-medium">{token.symbol}</span>
                <span className="text-white">${token.price.toFixed(4)}</span>
                <div className={`flex items-center space-x-1 ${
                  token.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {token.change24h >= 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span className="text-xs">{Math.abs(token.change24h).toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Profile Button */}
          <button
            onClick={onProfileClick}
            className="flex items-center space-x-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            <div className="w-6 h-6 bg-crypto-green rounded-full flex items-center justify-center">
              <span className="text-black text-sm">{currentProfile?.icon || '👤'}</span>
            </div>
            <div className="text-left">
              <div className="text-white text-sm font-medium">
                {currentProfile?.name || 'No Profile'}
              </div>
              <div className="text-gray-400 text-xs">
                {currentProfile?.addresses?.length || 0} wallets connected
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
