import React, { useEffect, useState } from "react";
import { useWallet } from "../context/WalletContext";
import type { WalletBalance } from "../types";

interface ConnectWalletButtonProps {
  showBalance?: boolean;
  className?: string;
}

export const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({
  showBalance = true,
  className = "",
}) => {
  const { user, isConnecting, connectWallet, disconnectWallet } = useWallet();
  const [displayBalance, setDisplayBalance] = useState<WalletBalance | null>(
    null
  );

  useEffect(() => {
    if (user) {
      setDisplayBalance(user.balances);
    }
  }, [user]);

  const handleConnect = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  if (user && displayBalance) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="hidden min-w-[180px] border border-border-gray bg-dark-grey/60 px-4 py-3 text-right md:block">
          <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-text-gray">
            Wallet
          </p>
          <div className="text-sm font-semibold text-white">
            {user.stxAddress.substring(0, 8)}...{user.stxAddress.substring(user.stxAddress.length - 6)}
          </div>
          {showBalance && (
            <div className="mt-3 space-y-1 border-t border-border-gray pt-2 text-xs text-text-gray">
              <div>STX {displayBalance.stx}</div>
              <div>sBTC {displayBalance.sBTC}</div>
            </div>
          )}
        </div>
        <button
          onClick={disconnectWallet}
          className="border border-border-gray px-4 py-2 text-sm font-medium text-white transition-colors hover:border-text-light-gray"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      disabled={isConnecting}
      className={`border border-white bg-white px-5 py-2.5 text-sm font-semibold text-black transition-all hover:bg-transparent hover:text-white ${
        isConnecting ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {isConnecting ? "Connecting..." : "Connect Wallet"}
    </button>
  );
};
