export interface WalletBalance {
  stx: string;
  sBTC: string;
}

export interface User {
  address: string;
  name?: string;
  stxAddress: string;
  balances: WalletBalance;
  isConnected: boolean;
}

export interface Article {
  id: string;
  title: string;
  content?: string;
  author: string;
  price: string; // in sBTC
  isLocked: boolean;
  isPurchased: boolean;
  createdAt: Date;
  preview?: string;
}

export interface PaymentRequest {
  articleId: string;
  price: string;
  recipientAddress: string;
}

export interface TransactionStatus {
  status: "pending" | "confirmed" | "failed";
  txId?: string;
  blockHeight?: number;
  confirmations: number;
  timestamp: Date;
}

export interface StacksNetwork {
  chainId: number;
  version: number;
  coreApiUrl: string;
}
