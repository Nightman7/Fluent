import type { TransactionStatus } from "../types";

// Testnet configuration
const TESTNET_API = "https://api.testnet.hiro.so";

/**
 * Unlock content by initiating an sBTC transfer to the creator
 * Uses post-conditions to ensure the user doesn't spend more than the price
 * 
 * In production, this would use Stacks.js:
 * import { makeFungiblePostCondition, FungibleConditionCode, PostConditionMode } from "@stacks/transactions"
 * import { openContractCall } from "@stacks/connect"
 */
export const unlockContent = async (
  _articleId: string,
  price: string,
  _recipientAddress: string,
  _senderAddress: string
): Promise<TransactionStatus> => {
  try {
    // Mock implementation - in production with Stacks.js:
    // 1. Convert price from sBTC to microBTC (sBTC uses 8 decimals)
    // 2. Create post-condition using makeFungiblePostCondition
    // 3. Call openContractCall with function args and post-conditions
    // 4. Return transaction status with txId

    console.log(`Initiating unlock for article price: ${price} sBTC`);

    return {
      status: "pending",
      txId: "0x" + Math.random().toString(16).substring(2),
      confirmations: 0,
      timestamp: new Date(),
    };
  } catch (error) {
    console.error("Failed to unlock content:", error);
    return {
      status: "failed",
      confirmations: 0,
      timestamp: new Date(),
    };
  }
};

/**
 * Check if user has purchased an article
 * In production, this would query a smart contract or database
 */
export const checkPurchaseStatus = async (
  _articleId: string,
  userAddress: string
): Promise<boolean> => {
  try {
    // Mock implementation - in production, query the contract
    const response = await fetch(
      `${TESTNET_API}/extended/v1/address/${userAddress}/transactions?limit=10`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error("Failed to check purchase status");
      return false;
    }

    // Parse and verify transaction - mock for now
    return false;
  } catch (error) {
    console.error("Error checking purchase status:", error);
    return false;
  }
};

/**
 * Fetch transaction confirmation status
 */
export const getTransactionStatus = async (
  txId: string
): Promise<TransactionStatus> => {
  try {
    const response = await fetch(
      `${TESTNET_API}/extended/v1/tx/${txId}`
    );

    if (!response.ok) {
      return {
        status: "pending",
        txId,
        confirmations: 0,
        timestamp: new Date(),
      };
    }

    const data = await response.json() as { tx_status: string; block_height?: number };

    return {
      status: data.tx_status === "success" ? "confirmed" : "pending",
      txId,
      blockHeight: data.block_height,
      confirmations: data.block_height ? 1 : 0,
      timestamp: new Date(),
    };
  } catch (error) {
    console.error("Failed to fetch transaction status:", error);
    return {
      status: "failed",
      txId,
      confirmations: 0,
      timestamp: new Date(),
    };
  }
};
