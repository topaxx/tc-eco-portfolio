import React from 'react';
import { TokenPositions, TokenPrice } from '../types';

interface RunePositionBlockProps {
  price: TokenPrice;
  positions: TokenPositions;
}

export const RunePositionBlock: React.FC<RunePositionBlockProps> = ({
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
};
