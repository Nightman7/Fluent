# Fluent

**Fluent** is a Bitcoin-native media MVP built on **Stacks**, where readers unlock premium content with **sBTC** and creators monetize with transparent, on-chain proof of payment.

Live app: https://fluent-sage.vercel.app

---

## About

Independent writers and small publications often rely on subscriptions, ads, or centralized platforms—each adding friction, fees, or platform risk.

Fluent explores a simpler model:

- **Reader experience:** connect a wallet, browse content, and unlock an article with a small sBTC payment.
- **Creator experience:** receive payments directly to a Stacks address with a verifiable transaction trail.
- **Bitcoin alignment:** payments run on **Stacks (Bitcoin L2)**, using **sBTC** for fast settlement and low-friction unlocks.

This repo is currently an **MVP** meant to validate UX, trust surfaces, and the unlock flow end-to-end.

---

## At a glance

- **Problem:** high-friction monetization for independent writers
- **Solution:** wallet-native pay-to-unlock publishing on Bitcoin rails
- **Audience:** readers who want premium content, creators who want direct revenue
- **State:** functional MVP with wallet connect + unlock flow + transaction status

---

## Key features

### Reader utility

- Connect Hiro wallet and fetch **STX** + **sBTC** balances
- Browse locked/unlocked content
- Search + filter articles (title/author/category)
- Save articles to a reading list
- Unlock paid content with a wallet-confirmed sBTC transfer
- View unlock history with explorer links

### Trust + conversion UX

- Onboarding progress strip for clear next steps
- Transaction verification/status component
- Security & fee transparency panel
- UI updates after successful unlock

### Creator-facing signals (early)

- Creator spotlight / metrics section
- Clear unlock pricing in feed + paywall
- Foundation for future pricing + analytics features

---

## How unlocking works (high-level)

1. Reader connects Hiro Wallet
2. Reader selects a locked article
3. Reader confirms a **sBTC token transfer** in-wallet
4. App tracks confirmation via the Stacks API
5. Once confirmed, the article is treated as unlocked

**Safety:** transfers are intended to include **post-conditions** so the user can’t spend more than the unlock price.

---

## Tech stack

- React + TypeScript
- Vite
- Tailwind CSS (v4)
- Hiro wallet session API
- Stacks testnet integration
- Vercel deployment

---

## Project structure

| Path | Purpose |
| --- | --- |
| `src/App.tsx` | Main product shell and sections |
| `src/index.css` | Global visual system and animations |
| `src/components/` | UI components for feed, wallet, paywall, status |
| `src/context/WalletContext.tsx` | Wallet state + balance management |
| `src/utils/contractInteractions.ts` | Unlock + tx status interactions |
| `src/types/index.ts` | Shared application types |

---

## Quick start

### Prerequisites

- Node.js 18+
- npm
- Hiro Wallet extension (for testing the unlock flow)

### Install

```bash
npm install
```

### Run local dev server

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview build

```bash
npm run preview
```

---

## Environment variables

Copy the example file and edit as needed:

```bash
cp .env.local.example .env.local
```

Example values live in `.env.local.example`.

---

## Network config

- Default network: **Stacks testnet**
- sBTC token contract (testnet):
  `SP3DX3H4FEYZJZ586MFBS25ZM3FTRELAY2RYASF3.sbtc-token`

See `src/config.ts`.

---

## Roadmap

- Creator dashboard (publish + price + manage content)
- Conversion analytics + unlock funnel insights
- Bundles / creator passes
- Reader alerts and watchlists
- Mainnet-ready rollout plan
- Optional: IPFS / decentralized storage integration

---

## Contributing

Open an issue first for product ideas, UI improvements, or integration bugs before sending a pull request.

---

## References

- https://docs.stacks.co
- https://bitcoinlayers.org
- https://github.com/stacksgov/sips/blob/main/sips/sip-010/sip-010-fungible-token-standard.md