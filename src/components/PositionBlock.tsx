import React from 'react';
import { TokenPositions, TokenPrice } from '../types';
import { RunePositionBlock } from './RunePositionBlock';
import { TcyPositionBlock } from './TcyPositionBlock';
import { RujiPositionBlock } from './RujiPositionBlock';

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
  switch (symbol) {
    case 'RUNE':
      return <RunePositionBlock price={price} positions={positions} />;
    case 'TCY':
      return <TcyPositionBlock price={price} positions={positions} />;
    case 'RUJI':
      return <RujiPositionBlock price={price} positions={positions} />;
    default:
      return null;
  }
};
