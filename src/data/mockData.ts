import { TokenPrice, TokenPositions } from '../types';

export const mockTokenPrices: Record<string, TokenPrice> = {
  RUNE: { symbol: 'RUNE', price: 4.23, change24h: 2.5 },
  TCY: { symbol: 'TCY', price: 0.0045, change24h: -1.2 },
  RUJI: { symbol: 'RUJI', price: 0.12, change24h: 5.8 },
  KUJI: { symbol: 'KUJI', price: 0.89, change24h: -0.3 }
};

export const mockPositions: Record<string, TokenPositions> = {
  RUNE: {
    spot: { amount: 1250, value: 5287.5 },
    lp: {
      amount: 850,
      value: 3595.5,
      tokenX: { symbol: 'RUNE', amount: 425, price: 4.23 },
      tokenY: { symbol: 'USDC', amount: 1798.75, price: 1.0 }
    },
    bond: {
      amount: 2000,
      value: 8460,
      nextAward: 12.5,
      nextChurnTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      apy: 8.2,
      nodeOperatorFee: 0.25
    }
  },
  TCY: {
    spot: { amount: 125000, value: 562.5 },
    staked: {
      amount: 75000,
      value: 337.5,
      nextAward: 450,
      nextDistributionTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      apy: 12.5
    }
  },
  RUJI: {
    merge: { amount: 8500 }
  }
};
