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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
      <div className="w-full max-w-xl border border-border-gray bg-space-grey p-7 md:p-10">
        <div className="mb-8 flex items-start justify-between gap-4 border-b border-border-gray pb-6">
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-text-gray">
              Premium Unlock
            </p>
            <h2 className="font-space-grotesk text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
              Unlock Article
            </h2>
          </div>
          <button
            onClick={onClose}
            className="border border-border-gray px-3 py-1 text-xs uppercase tracking-[0.18em] text-text-light-gray transition-colors hover:border-text-light-gray hover:text-white"
          >
            Close
          </button>
        </div>

        <div className="mb-8 border border-border-gray bg-dark-grey/40 p-5">
          <h3 className="mb-4 font-space-grotesk text-lg text-white">{articleTitle}</h3>
          <div className="flex items-end justify-between gap-3">
            <span className="text-xs uppercase tracking-[0.2em] text-text-gray">
              Price to unlock
            </span>
            <span className="font-mono text-2xl font-semibold text-white">
              {price} sBTC
            </span>
          </div>
        </div>

        {txStatus === "success" && txId && (
          <TransactionStatus txId={txId} status="confirmed" />
        )}

        {txStatus === "error" && (
          <div className="mb-6 border border-red-500/50 bg-red-950/20 p-4 text-red-300">
            <p className="text-sm font-semibold">Transaction Failed</p>
            <p className="mt-1 text-xs">Please try again</p>
          </div>
        )}

        {!txStatus && (
          <>
            <div className="mb-8 border border-border-gray bg-dark-grey/40 p-5">
              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-text-gray">
                Your sBTC balance
              </p>
              <p className="text-2xl font-semibold text-white">
                {user?.balances.sBTC || "0"} sBTC
              </p>
              {insufficientBalance && (
                <p className="mt-3 text-xs font-semibold text-red-400">
                  Insufficient balance to unlock
                </p>
              )}
            </div>

            <div className="flex gap-4">
              <button
                onClick={onClose}
                className="flex-1 border border-border-gray px-4 py-3 text-sm font-semibold text-white transition-colors hover:border-text-light-gray"
              >
                Cancel
              </button>
              <button
                onClick={handleUnlock}
                disabled={isProcessing || insufficientBalance || !user}
                className={`flex-1 border border-white bg-white px-4 py-3 text-sm font-semibold text-black transition-all hover:bg-transparent hover:text-white ${
                  isProcessing || insufficientBalance || !user
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {isProcessing ? "Processing..." : "Unlock"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
