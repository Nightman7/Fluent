/**
 * Stacks Network Configuration
 * Switch between testnet and mainnet as needed
 */

export type NetworkType = "testnet" | "mainnet";

export const NETWORKS = {
  testnet: {
    apiUrl: "https://api.testnet.hiro.so",
    chainId: 2147483648,
    networkVersion: 0,
    rpcUrl: "https://testnet-api.stacks.co",
    name: "Stacks Testnet",
    bnsContractId: "ST000000000000000000002AMW42H.bns",
  },
  mainnet: {
    apiUrl: "https://api.hiro.so",
    chainId: 1,
    networkVersion: 1,
    rpcUrl: "https://mainnet-api.stacks.co",
    name: "Stacks Mainnet",
    bnsContractId: "SP000000000000000000002Q6GF78.bns",
  },
};

// Use testnet by default
export const CURRENT_NETWORK: NetworkType = "testnet";
export const NETWORK_CONFIG = NETWORKS[CURRENT_NETWORK];

/**
 * Smart Contract Configuration
 */
export const CONTRACTS = {
  // sBTC token on testnet
  SBTC_TESTNET: {
    principal: "SP3DX3H4FEYZJZ586MFBS25ZM3FTRELAY2RYASF3.sbtc-token",
    address: "SP3DX3H4FEYZJZ586MFBS25ZM3FTRELAY2RYASF3",
    name: "sbtc-token",
  },
  // Add mainnet contract when ready
  SBTC_MAINNET: {
    principal: "SP3DX3H4FEYZJZ586MFBS25ZM3FTRELAY2RYASF3.sbtc-token",
    address: "SP3DX3H4FEYZJZ586MFBS25ZM3FTRELAY2RYASF3",
    name: "sbtc-token",
  },
};

export const getSBTCContract = () => {
  return CURRENT_NETWORK === "testnet"
    ? CONTRACTS.SBTC_TESTNET
    : CONTRACTS.SBTC_MAINNET;
};

/**
 * Constants for transaction handling
 */
export const TX_CONFIRMATION_TIME = 5000; // 5 seconds between API polls
export const MAX_TX_POLLS = 60; // Poll for up to 5 minutes
