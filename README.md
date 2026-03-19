# Fluent — Web3 Native Media Protocol (Stacks / Bitcoin L2)

Fluent is a minimalist “lo-fi high-tech” media prototype on the Stacks blockchain that lets creators lock articles behind a Bitcoin-native pay-to-unlock flow using sBTC (SIP-010).

## What you can do
- Connect a Stacks wallet
- View locked/unlocked articles
- Unlock content by sending an sBTC payment (with user-protecting post-conditions)
- Track transaction status (pending/confirmed/failed)

## Quickstart

### Prerequisites
- Node.js (LTS recommended)
- A Stacks-compatible wallet (for testnet if you’re using testnet)

### Install
```bash
npm install
```

### Run dev server
```bash
npm run dev
```

### Build
```bash
npm run build
```

## How unlocking works
1. Reader clicks **Unlock with Bitcoin**
2. `unlockContent()` is called with:
   - `articleId`
   - `price` (sBTC amount as a string)
   - `recipientAddr` (creator STX address)
   - `userAddress`
3. A post-condition ensures the reader cannot spend more than the intended price
4. Transaction is submitted to the Stacks network
5. UI tracks confirmation via `TransactionStatus`

## Smart contract / token
- Token contract (testnet): `SP3DX3H4FEYZJZ586MFBS25ZM3FTRELAY2RYASF3.sbtc-token`

## Key components (UI kit)

### `ConnectWalletButton`
Handles wallet connection and optionally displays user balances.

```tsx
<ConnectWalletButton showBalance />
```

Props:
- `showBalance?: boolean` — Show STX and sBTC balances
- `className?: string` — Additional CSS classes

### `PaywallModal`
Minimalist overlay for article purchases with sBTC.

```tsx
<PaywallModal
  articleId="article-1"
  articleTitle="Example Article"
  price="0.0005"
  creatorAddress="ST2CY5V39NXBXVKJJ3K6VF4N6J2Y9Q5X8C3YJ2J9C"
  onClose={() => {}}
  onSuccess={(txId) => console.log(txId)}
/> 
```

Props:
- `articleId: string` — Unique article identifier
- `articleTitle: string` — Display title
- `price: string` — Price in sBTC
- `creatorAddress: string` — Creator's STX address (payment recipient)
- `onClose: () => void` — Callback when modal closes
- `onSuccess?: (txId: string) => void` — Success callback

### `ArticleCard`
Display article with locked/unlocked badge.

```tsx
<ArticleCard
  article={mockArticle}
  onClickLocked={() => console.log("Locked")}
  onClickUnlocked={() => console.log("Unlocked")}
/>
```

Props:
- `article: Article` — Article data
- `onClickLocked?: () => void` — Click handler for locked articles
- `onClickUnlocked?: () => void` — Click handler for unlocked articles
- `className?: string` — Additional CSS classes

### `TransactionStatus`
Lo-fi block progress indicator for Nakamoto’s fast blocks (<5s).

```tsx
<TransactionStatus
  txId="0x123..."
  status="pending"
  onComplete={(status) => console.log(status)}
/>
```

Props:
- `txId: string` — Transaction hash
- `status?: "pending" | "confirmed" | "failed"` — Current status
- `onComplete?: (status: "pending" | "confirmed" | "failed") => void` — Completion callback
- `className?: string` — Additional CSS classes

## Project structure
```text
src/
├── components/          # UI Kit components
│   ├── ConnectWalletButton.tsx
│   ├── PaywallModal.tsx
│   ├── ArticleCard.tsx
│   ├── TransactionStatus.tsx
│   └── index.ts
├── context/
│   └── WalletContext.tsx     # Wallet state management
├── hooks/
│   └── useWallet.ts          # Custom wallet hook
├── utils/
│   └── contractInteractions.ts  # Contract logic
├── types/
│   └── index.ts              # Type definitions
├── App.tsx                   # Main app with demo
├── main.tsx
└── index.css                 # Tailwind configuration
```

## Using `WalletContext`
Wrap your app with `WalletProvider`:

```tsx
import { WalletProvider } from "./context/WalletContext";

function App() {
  return (
    <WalletProvider>
      <YourApp />
    </WalletProvider>
  );
}
```

Use the wallet hook in components:

```tsx
import { useWallet } from "./context/WalletContext";

function MyComponent() {
  const { user, connectWallet, isConnecting } = useWallet();

  return (
    <>
      {user ? (
        <p>Connected: {user.stxAddress}</p>
      ) : (
        <button onClick={connectWallet} disabled={isConnecting}>
          Connect
        </button>
      )}
    </>
  );
}
```

## Post-conditions
All transfers include post-conditions to protect users:

```clarity
(asserts! (<= amount-to-transfer maximum-price) error-code)
```

This ensures the user can never lose more sBTC than intended.

## Roadmap
- [ ] Revenue sharing between platform and creators
- [ ] Article analytics and reader statistics
- [ ] Creator dashboard
- [ ] Content versioning and updates
- [ ] Subscription models
- [ ] Community features (comments, tips)
- [ ] IPFS content storage integration
- [ ] Creator royalties on secondary sales

## Networks
- **Testnet**: Stacks 2.1 Testnet
- **Mainnet**: Stacks Nakamoto (Bitcoin L2)

## References
- [Stacks Developer Docs](https://docs.stacks.co)
- [SIP-010 Token Standard](https://github.com/stacksgov/sips/blob/main/sips/sip-010/sip-010-fungible-token-standard.md)
- [Bitcoin Layers Initiative](https://bitcoinlayers.org)