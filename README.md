# Fluent - Web3 Native Media Protocol

A minimalist, "Lo-fi high-tech" media platform on the Stacks blockchain (Bitcoin L2) enabling creators to lock articles behind a Bitcoin-native pay-to-unlock mechanism using sBTC (SIP-010).

## Aesthetic

- **Theme**: Dark, deep-space greys (#0f1419)
- **Accent Color**: Bitcoin Orange (#F2A900) or Spike Spiegel Blue (#3b82f6)
- **Typography**: Inter (body), Space Grotesk (headings)
- **Layout**: Sharp borders, no rounded corners
- **Inspiration**: Cowboy Bebop meets Web3

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: @stacks/connect, @stacks/transactions
- **Network**: Stacks Nakamoto (Bitcoin L2)
- **Build**: Vite

## Project Structure

```
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

## Components

### ConnectWalletButton

Handles wallet connection and displays user balances.

```tsx
<ConnectWalletButton showBalance={true} />
```

**Props**:
- `showBalance?: boolean` - Show STX and sBTC balances
- `className?: string` - Additional CSS classes

### PaywallModal

Minimalist overlay for article purchases with sBTC.

```tsx
<PaywallModal
  articleId="article-1"
  articleTitle="Example Article"
  price="0.0005"  // sBTC
  creatorAddress="ST2CY5V39NXBXVKJJ3K6VF4N6J2Y9Q5X8C3YJ2J9C"
  onClose={() => {}}
  onSuccess={(txId) => console.log(txId)}
/>
```

**Props**:
- `articleId: string` - Unique article identifier
- `articleTitle: string` - Display title
- `price: string` - Price in sBTC
- `creatorAddress: string` - Creator's STX address (payment recipient)
- `onClose: () => void` - Callback when modal closes
- `onSuccess?: (txId: string) => void` - Success callback

### ArticleCard

Display article with locked/unlocked badge.

```tsx
<ArticleCard
  article={mockArticle}
  onClickLocked={() => console.log("Locked")}
  onClickUnlocked={() => console.log("Unlocked")}
/>
```

**Props**:
- `article: Article` - Article data
- `onClickLocked?: () => void` - Click handler for locked articles
- `onClickUnlocked?: () => void` - Click handler for unlocked articles
- `className?: string` - Additional CSS classes

### TransactionStatus

Lo-fi block progress indicator for Nakamoto's fast blocks (<5s).

```tsx
<TransactionStatus
  txId="0x123..."
  status="pending"
  onComplete={(status) => console.log(status)}
/>
```

**Props**:
- `txId: string` - Transaction hash
- `status?: "pending" | "confirmed" | "failed"` - Current status
- `onComplete?: (status) => void` - Completion callback
- `className?: string` - Additional CSS classes

## Usage

### Setup

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

### Using WalletContext

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

### Unlocking Content

```tsx
import { unlockContent } from "./utils/contractInteractions";

const result = await unlockContent(
  articleId,      // string
  price,          // sBTC amount as string
  recipientAddr,  // creator's STX address
  userAddress     // user's STX address
);

// Returns TransactionStatus with pending/confirmed/failed state
```

## Smart Contract Integration

**Contract**: `SP3DX3H4FEYZJZ586MFBS25ZM3FTRELAY2RYASF3.sbtc-token` (testnet)

The unlock flow:
1. User clicks "Unlock with Bitcoin"
2. `unlockContent()` is called with article details
3. Post-condition ensures user can't spend more than the price
4. Transaction is submitted to Stacks network
5. Confirmation tracked via TransactionStatus component
6. Content unlocked after block confirmation

## Post-Conditions

All transfers include post-conditions to protect users:

```clarity
(asserts! (<= amount-to-transfer maximum-price) error-code)
```

This ensures the user can never lose more sBTC than intended.

## Future Enhancements

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
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
