# 🚀 Fluent Stacks Integration - Complete Setup Guide

## ✅ What's Been Integrated

Your Fluent app now has **real Stacks blockchain integration**:

- ✅ **Real Wallet Connection** - Connects to Hiro Wallet for Stacks testnet
- ✅ **Live Balance Fetching** - Pulls your actual STX & sBTC balances from Stacks API
- ✅ **Smart Contract Calls** - Executes sBTC transfers with post-conditions  
- ✅ **Post-Conditions** - Protects you from overspending on article unlocks
- ✅ **Transaction Tracking** - Monitors confirmation status on blockchain
- ✅ **Network Configuration** - Easy switching between testnet/mainnet

## 📋 Prerequisites

### 1. Install Hiro Wallet

1. **Download**: https://www.hiro.so/wallet
2. **Add to Browser**: Install the browser extension
3. **Create Account**: 
   - Set a strong password
   - **Save your recovery phrase privately** (never share!)
4. **Switch to Testnet**:
   - Click wallet icon → Settings
   - Select "Testnet" network

### 2. Get Testnet Funds

**Option A: Stacks Testnet Faucet**
1. Visit: https://testnet.blockstack.org/faucet
2. Enter your Stacks address from Hiro Wallet
3. Receive ~500 STX (free test tokens)
4. Wait ~10-15 seconds for confirmation

**Option B: Get Testnet sBTC**
1. Get testnet Bitcoin first: https://testnet-faucet.mempool.space/
2. Go to: https://bitcoinbridge.stacks.web4.io/
3. Bridge Bitcoin → sBTC
4. You'll have sBTC to test articles!

## 🎯 Testing the Integration

### Step 1: Start the Dev Server

```powershell
cd c:\Users\Pratyus\Fluent\fluent
npm run dev
```

Your app will be at: **http://localhost:5173**

### Step 2: Connect Your Wallet

1. **Click "Connect Wallet"** button in the top-right
2. **Hiro Wallet** popup appears
3. **Authorize** the connection
4. Your STX & sBTC balance displays

**What you'll see:**
```
Connected: SP3DX3H4...YJ2J9C
STX: 500.00
sBTC: 0.05
```

### Step 3: Unlock an Article

1. **Click any "LOCKED" article card**
2. **PaywallModal** opens showing:
   - Article title
   - Price (e.g., 0.0005 sBTC)
   - Your balance
3. **Click "Unlock with Bitcoin"**
4. **Hiro Wallet** asks to confirm:
   - Shows sBTC transfer amount
   - Shows post-condition: "Can't spend more than X sBTC"
5. **Review & Approve** the transaction
6. **TransactionStatus** component shows:
   - Block progress bars (filling up)
   - Est. ~5 seconds for confirmation
   - Success message when confirmed

### Step 4: Verify on Blockchain

Once transaction confirms:
1. Get your TX ID from the status display
2. Visit: https://testnet-explorer.alexgo.io/
3. Search for the TX ID
4. See your sBTC transfer confirmed on-chain! ✅

## 🔧 Customization

### Change Default Network

**File**: `src/config.ts`

```tsx
// Currently: testnet
export const CURRENT_NETWORK: NetworkType = "testnet";

// Change to: mainnet (for production)
export const CURRENT_NETWORK: NetworkType = "mainnet";
```

### Update Your Creator Address

**File**: `src/config.ts`

```tsx
export const CONTRACTS = {
  SBTC_TESTNET: {
    principal: "YOUR_CREATOR_ADDRESS.sbtc-token",
    address: "YOUR_CREATOR_ADDRESS",
    name: "sbtc-token",
  },
};
```

### Add Article Prices

**File**: `src/App.tsx`

```tsx
const mockArticles: Article[] = [
  {
    id: "1",
    title: "My Article",
    price: "0.0005",  // sBTC amount
    // ... rest of article
  },
];
```

## 🔐 Security Features

✅ **Post-Conditions**: 
- User can't accidentally spend more sBTC than article price
- Smart contract enforces: `amount_spent <= max_price`

✅ **No Private Keys Exposed**:
- All keys stay in Hiro Wallet
- Your app never handles private keys

✅ **Transaction Signing**:
- User must approve each transaction in Hiro Wallet
- No automatic transfers

✅ **Testnet Safe**:
- Test tokens, not real sBTC
- Can't accidentally lose real money

## 📊 Transaction Flow Diagram

```
User clicks "Unlock" 
     ↓
PaywallModal opens
     ↓
User clicks "Unlock with Bitcoin"
     ↓
openContractCall() initiates transfer
     ↓
Hiro Wallet shows transaction details
     ↓
User approves in Hiro Wallet
     ↓
sBTC transfer sent to blockchain
     ↓
TransactionStatus tracks confirmation
     ↓
Post-condition ensures: amount ≤ price
     ↓
Nakamoto block confirms (< 5 seconds)
     ↓
TransactionStatus shows "Confirmed" ✅
```

## 🐛 Debugging Tips

### Transaction not appearing?
```tsx
// Check browser console for:
// "Transaction submitted: 0x..."
// Copy that TX ID and search on testnet explorer
```

### Balance not updating?
```tsx
// The API sometimes takes 10-15 seconds to show
// Try waiting, then disconnect/reconnect wallet
```

### Hiro Wallet not connecting?
1. Make sure you're on **Testnet** in Hiro settings
2. Try disconnecting and reconnecting
3. Check browser console for error messages

### Post-condition failing?
- Make sure you have enough sBTC
- The price in mockArticles matches the unlock amount

## 📚 File Structure - Integration Points

```
src/
├── config.ts                        ✨ NEW - Network & contract config
├── context/
│   └── WalletContext.tsx           🔄 UPDATED - Real Stacks connect()
├── utils/
│   └── contractInteractions.ts     🔄 UPDATED - Real post-conditions & transfers
├── components/
│   └── PaywallModal.tsx            ✅ Ready to use
└── App.tsx                         ✅ Demo with mock articles
```

## 🚀 Next Steps for Production

1. **Switch to Mainnet**:
   ```tsx
   export const CURRENT_NETWORK: NetworkType = "mainnet";
   ```

2. **Create Real Articles**:
   - Connect to backend database
   - Store article content & prices
   - Track purchases in smart contract

3. **Creator Dashboard**:
   - View earnings
   - See transaction history
   - Update article prices

4. **Deploy**:
   ```bash
   npm run build
   # Deploy dist/ folder to Vercel, Netlify, etc.
   ```

## 💬 Quick Reference

**Connect Wallet**: `useWallet().connectWallet()`  
**Get Balance**: Shows automatically after connection  
**Send Payment**: `unlockContent(articleId, price, recipient, sender)`  
**Check Status**: `getTransactionStatus(txId)`  
**View Testnet**: https://testnet-explorer.alexgo.io/

## ✨ You're Ready!

Your Fluent app is **fully integrated** with Stacks. You can now:
- ✅ Connect your wallet
- ✅ Check balances
- ✅ Unlock articles with real sBTC
- ✅ Track transactions on blockchain

**Go test it!** 🎉

Questions? Check the console logs - they show every step of the process.
