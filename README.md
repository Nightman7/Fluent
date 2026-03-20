# Fluent

Bitcoin-native media protocol on Stacks where readers unlock premium content with sBTC and creators monetize directly.

Live app: https://fluent-sage.vercel.app

## Why Fluent

Fluent is designed to make paid publishing on Bitcoin practical and transparent.

- Reader-first unlock flow with wallet-native confirmation
- Creator monetization with onchain payment proof
- Trust-focused UX with clear transaction visibility
- Minimal, high-clarity interface with animated ambient gradients

## Current product capabilities

### Reader experience

- Connect Hiro wallet and fetch STX/sBTC balances
- Browse locked and unlocked articles
- Search and filter by title, author, and category
- Save articles into a reading list
- Unlock articles with sBTC through wallet flow
- View unlock history with explorer links

### Creator and trust surfaces

- Creator spotlight section with monetization metrics
- Security and fee transparency panel
- Transaction verification component with status progression
- Onboarding progress strip for conversion clarity

## Core user flow

1. Connect wallet
2. Select a locked article
3. Confirm sBTC payment in wallet
4. Track transaction state
5. Article unlock state updates in UI and history

## Tech stack

- React + TypeScript + Vite
- Tailwind CSS v4
- Stacks-compatible wallet integration (Hiro)
- sBTC contract interactions via Stacks RPC and extension session APIs
- Vercel deployment

## Project structure

```text
src/
  components/
    ArticleCard.tsx
    ConnectWalletButton.tsx
    PaywallModal.tsx
    TransactionStatus.tsx
  context/
    WalletContext.tsx
  utils/
    contractInteractions.ts
  types/
    index.ts
  App.tsx
  index.css
```

## Local development

### Prerequisites

- Node.js 18+
- npm
- Hiro Wallet browser extension (for unlock flow testing)

### Install dependencies

```bash
npm install
```

### Start development server

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

## Network and contracts

- Current default: Stacks testnet
- sBTC token contract: SP3DX3H4FEYZJZ586MFBS25ZM3FTRELAY2RYASF3.sbtc-token

## Product roadmap

- Creator dashboard for publishing and pricing
- Dynamic pricing recommendations based on conversion
- Unlock bundles and access passes
- Reader notifications and watchlists
- Analytics for creators and platform operators
- Mainnet-ready transaction and fee strategy

## Contributing

Contributions are welcome. Open an issue for feature ideas, UX improvements, or integration fixes before submitting a PR.

## References

- https://docs.stacks.co
- https://bitcoinlayers.org
- https://github.com/stacksgov/sips/blob/main/sips/sip-010/sip-010-fungible-token-standard.md