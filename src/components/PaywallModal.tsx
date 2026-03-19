import React, { useState } from "react";
import { useWallet } from "../context/WalletContext";
import { unlockContent } from "../utils/contractInteractions";
import { TransactionStatus } from "./TransactionStatus";

interface PaywallModalProps {
  articleId: string;
  articleTitle: string;
  price: string; // in sBTC
  creatorAddress: string;
  onClose: () => void;
  onSuccess?: (txId: string) => void;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({
  articleId,
  articleTitle,
  price,
  creatorAddress,
  onClose,
  onSuccess,
}) => {
  const { user } = useWallet();
  const [isProcessing, setIsProcessing] = useState(false);
  const [txStatus, setTxStatus] = useState<null | "success" | "error">(null);
  const [txId, setTxId] = useState<string | null>(null);

  const handleUnlock = async () => {
    if (!user) {
      alert("Please connect your wallet first");
      return;
    }

    setIsProcessing(true);
    try {
      const result = await unlockContent(
        articleId,
        price,
        creatorAddress,
        user.stxAddress
      );

      if (result.status === "pending") {
        setTxStatus("success");
        setTxId(result.txId || "processing");
        onSuccess?.(result.txId || "");
        setTimeout(onClose, 3000);
      } else {
        setTxStatus("error");
      }
    } catch (error) {
      console.error("Unlock failed:", error);
      setTxStatus("error");
    } finally {
      setIsProcessing(false);
    }
  };

  const insufficientBalance =
    user && parseFloat(user.balances.sBTC) < parseFloat(price);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="text-2xl font-bold mb-4 font-space-grotesk text-accent">
          Unlock Article
        </h2>
        
        <div className="mb-6 border-b border-accent pb-4">
          <h3 className="text-xl text-light-text mb-2">{articleTitle}</h3>
          <p className="text-sm text-gray-400">Price to unlock</p>
          <div className="text-3xl font-bold text-accent mt-2">
            {price} sBTC
          </div>
        </div>

        {txStatus === "success" && txId && (
          <TransactionStatus txId={txId} status="confirmed" />
        )}

        {txStatus === "error" && (
          <div className="mb-6 p-4 bg-red-900 border border-red-700 text-red-100 rounded-none">
            <p className="font-semibold">Transaction Failed</p>
            <p className="text-sm mt-1">Please try again</p>
          </div>
        )}

        {!txStatus && (
          <>
            <div className="mb-6 p-4 bg-dark-grey border border-accent">
              <p className="text-sm text-gray-400">Your sBTC Balance</p>
              <p className="text-2xl font-bold text-light-text mt-1">
                {user?.balances.sBTC || "0"} sBTC
              </p>
              {insufficientBalance && (
                <p className="text-sm text-red-400 mt-2">
                  Insufficient balance to unlock
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleUnlock}
                disabled={isProcessing || insufficientBalance || !user}
                className={`btn-primary flex-1 ${
                  isProcessing || insufficientBalance || !user
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {isProcessing ? "Unlocking..." : "Unlock with Bitcoin"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
