import React, { useState, useEffect } from "react";
import { getTransactionStatus } from "../utils/contractInteractions";

interface TransactionStatusProps {
  txId: string;
  status?: "pending" | "confirmed" | "failed";
  onComplete?: (status: "confirmed" | "failed") => void;
  className?: string;
}

export const TransactionStatus: React.FC<TransactionStatusProps> = ({
  txId,
  status: initialStatus = "pending",
  onComplete,
  className = "",
}) => {
  const [status, setStatus] = useState<"pending" | "confirmed" | "failed">(
    initialStatus
  );
  const [confirmations, setConfirmations] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (status === "confirmed" || status === "failed") {
      return;
    }

    // Simulate fast block updates (Nakamoto blocks)
    const interval = setInterval(async () => {
      try {
        const txStatus = await getTransactionStatus(txId);
        setStatus(txStatus.status as "pending" | "confirmed" | "failed");
        setConfirmations(txStatus.confirmations || 0);

        if (txStatus.status !== "pending") {
          onComplete?.(txStatus.status as "confirmed" | "failed");
        }
      } catch (error) {
        console.error("Error fetching tx status:", error);
      }
    }, 1000);

    // Track elapsed time
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(timer);
    };
  }, [status, txId, onComplete]);

  const isConfirmed = status === "confirmed";
  const isFailed = status === "failed";
  const isProcessing = status === "pending";

  // Lo-fi progress indicators
  const blocks = [1, 2, 3, 4, 5];
  const filledBlocks = Math.min(confirmations || Math.floor(elapsedSeconds / 1), 5);

  return (
    <div className={`border border-border-gray bg-space-grey p-6 ${className}`}>
      <div className="mb-6">
        <h3 className="mb-2 font-space-grotesk text-sm font-semibold tracking-[0.18em] text-text-light-gray uppercase">
          Transaction Status
        </h3>
        <p className="break-all font-mono text-xs text-text-gray">{txId.substring(0, 24)}...</p>
      </div>

      <div className="mb-6 flex gap-1.5">
        {blocks.map((_, i) => (
          <div
            key={i}
            className={`h-10 flex-1 border transition-all ${
              i < filledBlocks
                ? "border-white bg-white"
                : "border-border-gray bg-dark-grey/20"
            }`}
          />
        ))}
      </div>

      <div className="mb-4 space-y-2">
        {isProcessing && (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-white animate-pulse"></div>
              <span className="text-sm font-semibold text-white">
                Processing
              </span>
            </div>
            <p className="text-xs text-text-gray">
              {elapsedSeconds}s elapsed
            </p>
          </div>
        )}
        {isConfirmed && (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-white text-sm">✓</span>
              <span className="text-sm font-semibold text-white">
                Confirmed
              </span>
            </div>
            <p className="text-xs text-text-gray">
              {confirmations} blocks
            </p>
          </div>
        )}
        {isFailed && (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-red-400 text-sm">✗</span>
              <span className="text-red-400 font-semibold text-sm">Failed</span>
            </div>
            <p className="text-text-gray text-xs">
              Please try again
            </p>
          </div>
        )}
      </div>

      {/* Additional info */}
      {isProcessing && (
        <p className="border-t border-border-gray pt-4 text-xs text-text-gray">
          Waiting for confirmation...
        </p>
      )}
      {isConfirmed && (
        <p className="border-t border-border-gray pt-4 text-xs text-white">
          ✓ Content unlocked. You can now read the full article.
        </p>
      )}
    </div>
  );
};
