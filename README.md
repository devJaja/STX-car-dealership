# Car Dealership dApp

[![Tests](https://github.com/devJaja/STX-car-dealership/actions/workflows/test.yml/badge.svg)](https://github.com/devJaja/STX-car-dealership/actions/workflows/test.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Stacks](https://img.shields.io/badge/Stacks-Mainnet-5546FF)](https://www.stacks.co/)

A decentralized car dealership application built on the Stacks blockchain using Clarity smart contracts and React.

## Project Structure

```
car-dealership/
├── contracts/
│   ├── car-dealership.clar    # Clarity smart contract
│   ├── car-token.clar         # Fungible token (CDT)
│   ├── car-nft.clar           # NFT contract
│   └── Clarinet.toml          # Clarinet configuration
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Header.jsx      # Header with wallet connection
    │   │   ├── AddCar.jsx      # Add car form
    │   │   ├── CarList.jsx     # Display and interact with cars
    │   │   ├── TokenManager.jsx # Token management
    │   │   ├── NFTManager.jsx  # NFT minting
    │   │   └── NFTGallery.jsx  # NFT display
    │   ├── App.jsx             # Main app component
    │   ├── main.jsx            # React entry point
    │   └── index.css           # Tailwind CSS
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── postcss.config.js
```

## Smart Contract Features

- **Car Dealership**: Add, buy, list, and unlist cars
- **Fungible Token (CDT)**: Mint and transfer tokens
- **NFT**: Create car ownership certificates with metadata
- **Access Control**: Owner-only functions for sensitive operations
- **STX Payments**: Native STX token integration for purchases

## Setup Instructions

### 1. Install Dependencies

**Frontend:**
```bash
cd frontend
npm install
```

**Clarinet (for contract development):**
```bash
curl -L https://github.com/hirosystems/clarinet/releases/download/v2.0.0/clarinet-linux-x64.tar.gz | tar xz
sudo mv clarinet /usr/local/bin/
```

### 2. Test Contracts

```bash
clarinet test
```

### 3. Deploy Smart Contract

```bash
cd contracts
clarinet check
clarinet console
```

Deploy to testnet:
```bash
clarinet deployments generate --testnet
clarinet deployments apply -p deployments/default.testnet-plan.yaml
```

### 3. Update Contract Address

After deployment, update the contract address in:
- `frontend/src/App.jsx`
- `frontend/src/components/AddCar.jsx`
- `frontend/src/components/CarList.jsx`

Replace the placeholder contract address with your deployed contract address.

### 4. Run Frontend

```bash
cd frontend
npm run dev
```

Open http://localhost:5173

## Usage

1. **Connect Wallet**: Click "Connect Wallet" and use Hiro Wallet or Leather
2. **Add Car**: Owner can add cars with make, model, year, and price (in microSTX)
3. **Buy Car**: Users can purchase cars listed for sale
4. **List/Unlist**: Owners can list or unlist their cars

## Tech Stack

- **Blockchain**: Stacks (Bitcoin Layer 2)
- **Smart Contract**: Clarity
- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Wallet Integration**: Stacks Connect (@stacks/connect)

## Contract Functions

### Public Functions
- `add-car` - Add new car (owner only)
- `buy-car` - Purchase a car
- `list-car` - List car for sale
- `unlist-car` - Remove from sale

### Read-Only Functions
- `get-car` - Get car details
- `get-total-cars` - Get total number of cars

## Additional Contracts

- **Car Token (CDT)**: Fungible token for the ecosystem
- **Car NFT**: Non-fungible tokens representing car ownership

See [TOKEN_NFT.md](TOKEN_NFT.md) for details.
