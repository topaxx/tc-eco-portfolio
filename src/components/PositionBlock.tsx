import React from 'react';
import { Clock, TrendingUp, Coins, Lock, Zap } from 'lucide-react';
import { TokenPositions, TokenPrice } from '../types';

interface PositionBlockProps {
  symbol: string;
  price: TokenPrice;
  positions: TokenPositions;
}

export const PositionBlock: React.FC<PositionBlockProps> = ({
  symbol,
  price,
  positions
}) => {
  const calculateTotalValue = () => {
    let total = 0;
    if (positions.spot) total += positions.spot.value;
    if (positions.lp) total += positions.lp.value;
    if (positions.bond) total += positions.bond.value;
    if (positions.staked) total += positions.staked.value;
    if (positions.merge) total += positions.merge.amount * price.price;
    return total;
  };

  const formatCountdown = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${days > 0 ? days + 'd ' : ''}${hours}h ${minutes}m`;
  };

  const totalValue = calculateTotalValue();

  // RUNE Block
  if (symbol === 'RUNE') {
    return (
      <div className="crypto-card p-6 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-crypto-green text-2xl font-bold mb-6">
            RUNE - ${totalValue.toFixed(2)}
          </h2>
        </div>

        {/* Spot Position */}
        {positions.spot && (
          <div className="crypto-card-inner p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-crypto-green text-lg font-semibold">Spot Position</h3>
              <p className="text-white text-lg font-bold">${(2650 + 2637.5).toFixed(2)}</p>
            </div>
            <div className="space-y-3">
              {/* Position 1 */}
              <div className="bg-gray-800 p-3 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Amount</p>
                    <p className="text-white text-lg font-bold">625 RUNE</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Value</p>
                    <p className="text-white text-lg font-bold">$2,650.00</p>
                  </div>
                </div>
              </div>
              {/* Position 2 */}
              <div className="bg-gray-800 p-3 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Amount</p>
                    <p className="text-white text-lg font-bold">625 RUNE</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Value</p>
                    <p className="text-white text-lg font-bold">$2,637.50</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LP Position */}
        {positions.lp && (
          <div className="crypto-card-inner p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-crypto-green text-lg font-semibold">LP Position</h3>
              <p className="text-white text-lg font-bold">${(1797.75 + 1797.75).toFixed(2)}</p>
            </div>
            <div className="space-y-3">
              {/* LP Position 1 */}
              <div className="bg-gray-800 p-3 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Token X Amount</p>
                    <p className="text-white text-lg font-bold">212 RUNE</p>
                    <p className="text-gray-500 text-sm">$4.23</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Token Y Amount</p>
                    <p className="text-white text-lg font-bold">899 USDC</p>
                    <p className="text-gray-500 text-sm">$1.00</p>
                  </div>
                </div>
              </div>
              {/* LP Position 2 */}
              <div className="bg-gray-800 p-3 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Token X Amount</p>
                    <p className="text-white text-lg font-bold">213 RUNE</p>
                    <p className="text-gray-500 text-sm">$4.23</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Token Y Amount</p>
                    <p className="text-white text-lg font-bold">899 USDC</p>
                    <p className="text-gray-500 text-sm">$1.00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BOND Position */}
        {positions.bond && (
          <div className="crypto-card-inner p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-crypto-green text-lg font-semibold">BOND Position</h3>
              <p className="text-white text-lg font-bold">${(4230 + 4230).toFixed(2)}</p>
            </div>
            <div className="space-y-3">
              {/* Bond Position 1 */}
              <div className="bg-gray-800 p-3 rounded-lg">
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-gray-400 text-sm">Amount</p>
                    <p className="text-white text-lg font-bold">1,000 RUNE</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Next Award</p>
                    <p className="text-white text-lg font-bold">6.25 RUNE</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Next Churn</p>
                    <p className="text-white text-lg font-bold">{formatCountdown(new Date(Date.now() + 2 * 24 * 60 * 60 * 1000))}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">APY</p>
                    <p className="text-white text-lg font-bold">8.2%</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Node Fee</p>
                    <p className="text-white text-lg font-bold">0.25%</p>
                  </div>
                </div>
              </div>
              {/* Bond Position 2 */}
              <div className="bg-gray-800 p-3 rounded-lg">
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-gray-400 text-sm">Amount</p>
                    <p className="text-white text-lg font-bold">1,000 RUNE</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Next Award</p>
                    <p className="text-white text-lg font-bold">6.25 RUNE</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Next Churn</p>
                    <p className="text-white text-lg font-bold">{formatCountdown(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000))}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">APY</p>
                    <p className="text-white text-lg font-bold">8.5%</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Node Fee</p>
                    <p className="text-white text-lg font-bold">0.30%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // TCY Block - Now shows same total portfolio value as RUNE
  if (symbol === 'TCY') {
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
  }

  // RUJI Block
  if (symbol === 'RUJI') {
    return (
      <div className="crypto-card p-6 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-crypto-green text-2xl font-bold mb-2">
            RUJI - ${price.price.toFixed(4)}
          </h2>
          <div className="crypto-card-inner p-4">
            <p className="text-gray-400 text-sm">Total Portfolio Value</p>
            <p className="text-white text-3xl font-bold">${totalValue.toFixed(2)}</p>
          </div>
        </div>

        {/* Merge Contract */}
        {positions.merge && (
          <div className="crypto-card-inner p-4">
            <h3 className="text-crypto-green text-lg font-semibold mb-3">Merge Contract</h3>
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-2">Amount in Merge Contract</p>
              <p className="text-white text-2xl font-bold">{positions.merge.amount.toLocaleString()} RUJI</p>
              <p className="text-gray-500 text-sm mt-2">
                Estimated Value: ${(positions.merge.amount * price.price).toFixed(2)}
              </p>
              <div className="mt-4 p-3 bg-gray-800 rounded-lg">
                <p className="text-yellow-400 text-sm">⏳ Awaiting merge completion</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Default fallback (shouldn't be reached with current data)
  return null;
};
