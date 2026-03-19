# Fluent - Web3 Media Protocol Development Guidelines

## Project Overview

Fluent is a Web3-native media protocol on the Stacks blockchain enabling creators to lock articles behind a Bitcoin-native pay-to-unlock mechanism using sBTC.

**Tech Stack**: React 18 + TypeScript + Tailwind CSS + Stacks.js

## Architecture

### Directory Structure

```
src/
├── components/          # Reusable UI components
├── context/            # React Context (WalletContext)
├── hooks/              # Custom React hooks
├── utils/              # Utility functions (contract interactions)
├── types/              # TypeScript type definitions
├── App.tsx             # Main application component
└── main.tsx            # Entry point
```

### Key Components

1. **ConnectWalletButton**: Handles Stacks wallet connection and balance display
2. **PaywallModal**: Article unlock overlay with price display
3. **ArticleCard**: Article preview with locked/unlocked badge
4. **TransactionStatus**: Lo-fi block progress indicator

### Design System

- **Colors**: 
  - Accent: `#F2A900` (Bitcoin Orange)
  - Space Grey: `#0f1419`
  - Dark Grey: `#1a1f2e`
  - Light Text: `#e4e6eb`
  - Spike Blue: `#3b82f6`

- **Typography**: Inter (body), Space Grotesk (headings)
- **Layout**: Sharp borders, no rounded corners
- **Aesthetic**: Lo-fi high-tech, Cowboy Bebop-inspired

## Web3 Integration

### Current Status
- Mock implementations in place
- Ready for Stacks.js integration

### Next Steps for Stacks Integration

1. Install Stacks packages:
   ```bash
   npm install @stacks/connect @stacks/transactions @stacks/wallet-sdk
   ```

2. Update `src/context/WalletContext.tsx`:
   - Import from `@stacks/connect`
   - Replace mock `setTimeout` with actual `connect()` call

3. Update `src/utils/contractInteractions.ts`:
   - Import from `@stacks/transactions`
   - Implement post-conditions
   - Call `openContractCall()` with sbtc-token transfer

### Contract Details

- **Network**: Stacks Testnet & Mainnet (Nakamoto)
- **sBTC Contract**: `SP3DX3H4FEYZJZ586MFBS25ZM3FTRELAY2RYASF3.sbtc-token`
- **Function**: SIP-010 token transfer with post-conditions

## Development Workflow

### Running the Project

```bash
npm install      # Install dependencies
npm run dev      # Start dev server (http://localhost:5173)
npm run build    # Build for production
```

### Code Style

- TypeScript for type safety
- React hooks for state management
- Type-only imports for types (using `type` keyword)
- Clean, modular components
- Utility functions for business logic

### Component Guidelines

1. **Props**: Use TypeScript interfaces
2. **State**: Use React hooks (useState, useContext)
3. **Side Effects**: Use useEffect for API calls
4. **Styling**: Use Tailwind utilities + custom CSS classes
5. **Error Handling**: Try-catch blocks + console logging

## Testing

TODO: Add Jest + React Testing Library setup

## Deployment

Built files are in `dist/` directory. Deploy using:
```bash
npm run build
```

## Known Issues & TODOs

- [ ] Install @stacks/connect packages
- [ ] Integrate actual Stacks wallet connection
- [ ] Add test suite
- [ ] Creator dashboard
- [ ] Revenue splitting logic
- [ ] IPFS content storage
- [ ] Analytics tracking

## References

- [Stacks Docs](https://docs.stacks.co)
- [SIP-010 Token Standard](https://github.com/stacksgov/sips/blob/main/sips/sip-010/)
