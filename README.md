# Fluent

Bitcoin-native media protocol on Stacks where readers unlock premium content with sBTC and creators monetize with transparent onchain proof.

Live app: https://fluent-sage.vercel.app

## At a glance

- Problem: high-friction monetization for independent writers
- Solution: wallet-native pay-to-unlock publishing on Bitcoin rails
- Audience: readers who want premium content, creators who need direct revenue
- Current state: functional MVP with unlock flow, trust surfaces, and utility UX

## Key features

### Reader utility

- Connect Hiro wallet and fetch STX and sBTC balances
- Browse locked and unlocked content
- Search and filter by title, author, and category
- Save articles into a reading list
- Unlock with sBTC in a wallet-confirmed flow
- View unlock history with explorer links

### Trust and conversion

- Onboarding progress strip for clear next steps
- Transaction verification status component
- Security and fee transparency panel
- UI state updates after successful unlock

### Creator-facing signals

- Creator spotlight metrics section
- Clear unlock pricing in feed and paywall
- Foundation for pricing strategy and analytics features

## Product flow

1. Connect wallet
2. Choose article
3. Confirm unlock payment in wallet
4. Track transaction verification
5. Access unlocked article and proof history

## Tech stack

- React
- TypeScript
- Vite
- Tailwind CSS v4
- Hiro wallet session API
- Stacks testnet integration
- Vercel deployment

## Project structure

| Path | Purpose |
| --- | --- |
| src/App.tsx | Main product shell and sections |
| src/index.css | Global visual system and animations |
| src/components/ | UI components for feed, wallet, paywall, status |
| src/context/WalletContext.tsx | Wallet state and balance management |
| src/utils/contractInteractions.ts | Unlock and tx status interactions |
| src/types/index.ts | Shared application types |

## Quick start

### Prerequisites

- Node.js 18+
- npm
- Hiro Wallet extension (for unlock flow testing)

### Install

```bash
npm install
```

### Run local dev server

```bash
npm run dev
```

### Build production bundle

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Network config

- Default network: Stacks testnet
- sBTC token contract: SP3DX3H4FEYZJZ586MFBS25ZM3FTRELAY2RYASF3.sbtc-token

## GitHub About content (copy and paste)

### Description

Bitcoin-native media protocol on Stacks where readers unlock premium content with sBTC and creators monetize with transparent onchain proof.

### Website

https://fluent-sage.vercel.app

### Topics

stacks, bitcoin, sbtc, web3, react, typescript, paywall, creator-economy, blockchain, vercel

## Roadmap

- Creator dashboard for publishing and pricing
- Conversion analytics and unlock funnel insights
- Bundles and creator access passes
- Reader alerts and watchlists
- Mainnet-ready rollout plan

## Contributing

Open an issue first for product ideas, UI improvements, or integration bugs before sending a pull request.

## References

- https://docs.stacks.co
- https://bitcoinlayers.org
- https://github.com/stacksgov/sips/blob/main/sips/sip-010/sip-010-fungible-token-standard.md