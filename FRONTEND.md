# Frontend Integration Guide

## New Features

### Token Manager (CDT)
Manage Car Dealership Tokens directly from the UI.

**Features:**
- Mint tokens to any address
- Check token balance
- View total supply

**Location:** Appears when wallet is connected

### NFT Manager
Create car ownership NFTs with full metadata.

**Features:**
- Mint NFTs with car details (make, model, year, VIN)
- Add IPFS URI for metadata
- Assign to any recipient

**Location:** Below Token Manager when connected

### NFT Gallery
View and manage all minted car NFTs.

**Features:**
- Display all minted NFTs
- View metadata (make, model, year, VIN)
- Transfer NFTs to other addresses
- Filter by ownership

**Location:** Below car listings

## Component Structure

```
App.jsx
├── Header (wallet connection)
├── AddCar (add cars to dealership)
├── TokenManager (mint/manage CDT tokens)
├── NFTManager (mint car NFTs)
├── CarList (buy/sell cars)
└── NFTGallery (view/transfer NFTs)
```

## Usage Flow

1. **Connect Wallet** - Click "Connect Wallet" button
2. **Mint Tokens** - Use Token Manager to create CDT tokens
3. **Mint NFTs** - Create car ownership certificates
4. **View Gallery** - Browse all minted NFTs
5. **Transfer** - Send NFTs to other users
6. **Trade Cars** - Buy/sell cars in the marketplace

## Contract Addresses

Update these in all components:
- `YOUR_CONTRACT_ADDRESS` → Your deployed address

Files to update:
- `App.jsx`
- `AddCar.jsx`
- `CarList.jsx`
- `TokenManager.jsx`
- `NFTManager.jsx`
- `NFTGallery.jsx`

## Running the App

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

## Network Configuration

Currently configured for **Testnet**. To switch to mainnet:

1. Change `StacksTestnet` to `StacksMainnet`
2. Update contract addresses
3. Use mainnet wallet addresses
