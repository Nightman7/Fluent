import { useContext } from "react";
import { WalletContext } from "../context/WalletContext";

/**
 * Hook to use the WalletContext
 * Must be used within a WalletProvider
 */
export const useWalletHook = () => {
  const context = useContext(WalletContext as any);
  if (!context) {
    throw new Error("useWallet must be used within WalletProvider");
  }
  return context;
};

export default useWalletHook;
