import React from 'react';
import { TokenPositions, TokenPrice } from '../types';

interface TcyPositionBlockProps {
  price: TokenPrice;
  positions: TokenPositions;
}

export const TcyPositionBlock: React.FC<TcyPositionBlockProps> = ({
  price,
  positions
}) => {
  const formatCountdown = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${days > 0 ? days + 'd ' : ''}${hours}h ${minutes}m`;
  };

  // Use the same total value as RUNE (17343.00)
  const runePortfolioValue = 17343.00;
  
  return (
    <div className="crypto-card p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-crypto-green text-2xl font-bold mb-2">
          TCY - ${price.price.toFixed(4)}
        </h2>
        <div className="crypto-card-inner p-4">
          <p className="text-gray-400 text-sm">Total Portfolio Value</p>
          <p className="text-white text-3xl font-bold">${runePortfolioValue.toFixed(2)}</p>
        </div>
      </div>

      {/* Spot Position */}
      {positions.spot && (
        <div className="crypto-card-inner p-4">
          <h3 className="text-crypto-green text-lg font-semibold mb-3">Spot Position</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400 text-sm">Amount</p>
              <p className="text-white text-xl font-bold">{positions.spot.amount.toLocaleString()} TCY</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Value</p>
              <p className="text-white text-xl font-bold">${positions.spot.value.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}

      {/* Staked Position */}
      {positions.staked && (
        <div className="crypto-card-inner p-4">
          <h3 className="text-crypto-green text-lg font-semibold mb-3">Staked Position</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Amount</p>
                <p className="text-white text-lg font-bold">{positions.staked.amount.toLocaleString()} TCY</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Next Award</p>
                <p className="text-white text-lg font-bold">{positions.staked.nextAward} TCY</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Next Distribution</p>
                <p className="text-white text-lg font-bold">{formatCountdown(positions.staked.nextDistributionTime)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">APY</p>
                <p className="text-white text-lg font-bold">{positions.staked.apy}%</p>
              </div>
            </div>
            <div className="text-center border-t border-gray-700 pt-3">
              <p className="text-gray-400 text-sm">Total Value</p>
              <p className="text-white text-xl font-bold">${positions.staked.value.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
