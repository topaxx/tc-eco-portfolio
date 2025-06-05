export interface Profile {
  id: string;
  name: string;
  icon: string;
  addresses: WalletAddress[];
}

export interface WalletAddress {
  id: string;
  address: string;
  label: string;
  network: string;
}

export interface TokenPrice {
  symbol: string;
  price: number;
  change24h: number;
}

export interface Position {
  amount: number;
  value: number;
}

export interface LPPosition extends Position {
  tokenX: {
    symbol: string;
    amount: number;
    price: number;
  };
  tokenY: {
    symbol: string;
    amount: number;
    price: number;
  };
}

export interface BondPosition extends Position {
  nextAward: number;
  nextChurnTime: Date;
  apy: number;
  nodeOperatorFee: number;
}

export interface StakedPosition extends Position {
  nextAward: number;
  nextDistributionTime: Date;
  apy: number;
}

export interface MergePosition {
  amount: number;
}

export interface TokenPositions {
  spot?: Position;
  lp?: LPPosition;
  bond?: BondPosition;
  staked?: StakedPosition;
  merge?: MergePosition;
}
