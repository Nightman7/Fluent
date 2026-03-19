import type { TransactionStatus } from "../types";
import { getSBTCContract, NETWORK_CONFIG, MAX_TX_POLLS, TX_CONFIRMATION_TIME } from "../config";

/**
 * Unlock content by initiating an sBTC transfer to the creator
 * The actual transaction is handled by the Hiro Wallet extension
 */
export const unlockContent = async (
  articleId: string,
  price: string,
  recipientAddress: string,
  senderAddress: string
): Promise<TransactionStatus> => {
  try {
    const sbtcContract = getSBTCContract();

    // Convert price from sBTC to microsBTC (sBTC uses 8 decimals)
    const priceInMicrosBTC = BigInt(
      Math.floor(parseFloat(price) * 100000000)
    );

    console.log(`Unlocking article ${articleId} for ${price} sBTC`);
    console.log(`From: ${senderAddress}`);
    console.log(`To: ${recipientAddress}`);

    // Use Hiro Wallet to send the transaction
    if (typeof window !== 'undefined' && (window as any).btcSession) {
      // Create the contract call through the Hiro Wallet
      const callContractResponse = await (window as any).btcSession.request('callContract', [{
        network: 'testnet',
        contractAddress: sbtcContract.address,
        contractName: sbtcContract.name,
        functionName: 'transfer',
        functionArgs: [
          { type: 'principal', value: recipientAddress },
          { type: 'uint', value: priceInMicrosBTC.toString() },
          { type: 'optional', value: null },
        ],
        postConditionMode: 'Deny',
        postConditions: [],
      }]);

      const txId = callContractResponse.result?.txId || Math.random().toString(36).substring(7);
      
      return {
        status: "pending",
        txId,
        confirmations: 0,
        timestamp: new Date(),
      };
    } else {
      throw new Error('Hiro Wallet not available. Please connect your wallet first.');
    }
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
  articleId: string,
  userAddress: string
): Promise<boolean> => {
  try {
    console.log(`Checking purchase status for article ${articleId} by ${userAddress}`);

    // In production, query your backend API or smart contract
    // For now, return false (mock)
    return false;
  } catch (error) {
    console.error("Error checking purchase status:", error);
    return false;
  }
};

/**
 * Fetch transaction confirmation status from Stacks API
 */
export const getTransactionStatus = async (
  txId: string,
  pollCount = 0
): Promise<TransactionStatus> => {
  try {
    const response = await fetch(
      `${NETWORK_CONFIG.apiUrl}/extended/v1/tx/${txId}`
    );

    if (!response.ok) {
      // Transaction not found yet, keep polling
      if (pollCount < MAX_TX_POLLS) {
        await new Promise(resolve => setTimeout(resolve, TX_CONFIRMATION_TIME));
        return getTransactionStatus(txId, pollCount + 1);
      }
      return {
        status: "pending",
        txId,
        confirmations: 0,
        timestamp: new Date(),
      };
    }

    const data = await response.json();
    console.log("Transaction status:", data.tx_status, "Block:", data.block_height);

    // Determine confirmation status
    let status: "pending" | "confirmed" | "failed" = "pending";
    if (data.tx_status === "success") {
      status = "confirmed";
    } else if (data.tx_status === "failed" || data.tx_status === "abort_by_response") {
      status = "failed";
    }

    return {
      status,
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
