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
      <div className={`flex items-center gap-4 ${className}`}>
        <div className="flex flex-col gap-1">
          <div className="text-sm font-semibold text-accent">
            {user.stxAddress.substring(0, 8)}...{user.stxAddress.substring(user.stxAddress.length - 6)}
          </div>
          {showBalance && (
            <div className="text-xs text-light-text">
              <div>STX: {displayBalance.stx}</div>
              <div>sBTC: {displayBalance.sBTC}</div>
            </div>
          )}
        </div>
        <button
          onClick={disconnectWallet}
          className="btn-secondary text-xs"
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
      className={`btn-primary font-semibold transition-all ${
        isConnecting ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {isConnecting ? "Connecting..." : "Connect Wallet"}
    </button>
  );
};
