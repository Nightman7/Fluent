import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { User, WalletBalance } from "../types";

interface WalletContextType {
  user: User | null;
  isConnecting: boolean;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  updateBalance: (balance: WalletBalance) => void;
}

export const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = useCallback(async () => {
    setIsConnecting(true);
    try {
      // Mock wallet connection
      // In production, use: import { connect } from "@stacks/connect"
      setTimeout(() => {
        const mockAddress = "SP3DX3H4FEYZJZ586MFBS25ZM3FTRELAY2RYASF3";
        const mockBalance: WalletBalance = {
          stx: "1000.00",
          sBTC: "0.05",
        };

        setUser({
          address: mockAddress,
          stxAddress: mockAddress,
          balances: mockBalance,
          isConnected: true,
        });
        setIsConnecting(false);
      }, 1000);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      setIsConnecting(false);
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setUser(null);
  }, []);

  const updateBalance = useCallback((balance: WalletBalance) => {
    if (user) {
      setUser({ ...user, balances: balance });
    }
  }, [user]);

  const value: WalletContextType = {
    user,
    isConnecting,
    isConnected: !!user,
    connectWallet,
    disconnectWallet,
    updateBalance,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within WalletProvider");
  }
  return context;
};
