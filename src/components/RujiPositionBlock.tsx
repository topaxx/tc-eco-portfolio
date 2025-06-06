import React from 'react';
import { TokenPositions, TokenPrice } from '../types';

interface RujiPositionBlockProps {
  price: TokenPrice;
  positions: TokenPositions;
}

export const RujiPositionBlock: React.FC<RujiPositionBlockProps> = ({
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

  const totalValue = calculateTotalValue();

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
};
