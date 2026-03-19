import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { User, WalletBalance } from "../types";
import { NETWORK_CONFIG } from "../config";

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

  const fetchBalance = async (stxAddress: string): Promise<WalletBalance> => {
    try {
      const response = await fetch(
        `${NETWORK_CONFIG.apiUrl}/extended/v1/address/${stxAddress}/balances`
      );
      
      if (!response.ok) {
        return { stx: "0", sBTC: "0" };
      }

      const data = await response.json();
      
      // Parse STX balance (in microSTX, divide by 1,000,000)
      const stxBalance = data.stx?.balance
        ? (parseInt(data.stx.balance) / 1000000).toFixed(2)
        : "0";

      // Parse sBTC balance (in microsBTC, divide by 100,000,000)
      const sbtcToken = data.fungibles?.[
        "SP3DX3H4FEYZJZ586MFBS25ZM3FTRELAY2RYASF3.sbtc-token::sbtc"
      ];
      const sbtcBalance = sbtcToken?.balance
        ? (BigInt(sbtcToken.balance) / BigInt(100000000)).toString()
        : "0";

      return { stx: stxBalance, sBTC: sbtcBalance };
    } catch (error) {
      console.error("Error fetching balance:", error);
      return { stx: "0", sBTC: "0" };
    }
  };

  const connectWallet = useCallback(async () => {
    setIsConnecting(true);
    try {
      // Check for Hiro Wallet (btcSession is injected by the extension)
      if (typeof window !== 'undefined' && (window as any).btcSession) {
        try {
          const response = await (window as any).btcSession.request('getAddr', []);
          const stacksAddress = response.result.address;
          const publicKey = response.result.publicKey;
          
          const balance = await fetchBalance(stacksAddress);

          setUser({
            address: publicKey,
            stxAddress: stacksAddress,
            balances: balance,
            isConnected: true,
          });
          console.log('Wallet connected:', { stacksAddress });
          setIsConnecting(false);
        } catch (error) {
          console.error('Wallet request failed:', error);
          setIsConnecting(false);
          throw error;
        }
      } else {
        throw new Error('Hiro Wallet not detected. Please install the Hiro Wallet extension: https://www.hiro.so/wallet');
      }
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
