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
    <div className={`p-6 bg-space-grey border border-accent ${className}`}>
      <div className="mb-4">
        <h3 className="text-lg font-bold text-light-text font-space-grotesk mb-2">
          Transaction Status
        </h3>
        <p className="text-sm text-gray-400 break-all">{txId.substring(0, 16)}...</p>
      </div>

      {/* Lo-fi block indicator */}
      <div className="mb-6 flex gap-1">
        {blocks.map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-8 transition-all ${
              i < filledBlocks
                ? "bg-accent"
                : "bg-dark-grey border border-accent"
            }`}
          />
        ))}
      </div>

      {/* Status text */}
      <div className="mb-4">
        {isProcessing && (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent animate-pulse"></div>
            <span className="text-light-text font-semibold">
              Processing... ({elapsedSeconds}s)
            </span>
          </div>
        )}
        {isConfirmed && (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-spike-blue"></div>
            <span className="text-spike-blue font-semibold">
              Confirmed ({confirmations} blocks)
            </span>
          </div>
        )}
        {isFailed && (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500"></div>
            <span className="text-red-400 font-semibold">Failed</span>
          </div>
        )}
      </div>

      {/* Additional info */}
      {isProcessing && (
        <p className="text-xs text-gray-400">
          Nakamoto blocks (sub-5 seconds) · Est. confirmation in ~10s
        </p>
      )}
      {isConfirmed && (
        <p className="text-xs text-spike-blue">
          ✓ Content unlocked. You can now read the full article.
        </p>
      )}
    </div>
  );
};
