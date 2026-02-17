# Token & NFT Deployment

## Contracts Created

### 1. Car Dealership Token (CDT)
**File**: `contracts/car-token.clar`

Fungible token for the car dealership ecosystem.

**Features:**
- Mint tokens (owner only)
- Transfer tokens
- Check balance
- 6 decimals
- Symbol: CDT

**Functions:**
```clarity
(mint (amount uint) (recipient principal))
(transfer (amount uint) (sender principal) (recipient principal))
(get-balance (account principal))
(get-total-supply)
```

### 2. Car NFT
**File**: `contracts/car-nft.clar`

Non-fungible tokens representing car ownership certificates.

**Features:**
- Mint NFT with car metadata (make, model, year, VIN, URI)
- Transfer NFT
- Get owner and metadata
- Token URI support

**Functions:**
```clarity
(mint (recipient principal) (make string) (model string) (year uint) (vin string) (uri string))
(transfer (token-id uint) (sender principal) (recipient principal))
(get-owner (token-id uint))
(get-metadata (token-id uint))
(get-token-uri (token-id uint))
```

## Deploy to Mainnet

### Step 1: Add Your Mnemonic
Edit `settings/Mainnet.toml` and add your mnemonic.

### Step 2: Deploy
```bash
cd /home/jaja/Desktop/projects/car-dealership

# Generate deployment plan
clarinet deployments generate --mainnet --low-cost

# Deploy all contracts
clarinet deployments apply -p deployments/default.mainnet-plan.yaml
```

### Step 3: Verify Deployment
Check on Stacks Explorer:
- Token: `YOUR_ADDRESS.car-token`
- NFT: `YOUR_ADDRESS.car-nft`
- Dealership: `SP19PS42C7R7BR4VCX2YN8KPHXSB0ZC19K6PFEKTC.car-dealership`

## Usage Examples

### Mint Tokens
```clarity
(contract-call? .car-token mint u1000000 'SP...)
```

### Mint Car NFT
```clarity
(contract-call? .car-nft mint 'SP... "Toyota" "Camry" u2024 "1HGBH41JXMN109186" "ipfs://...")
```

### Transfer NFT
```clarity
(contract-call? .car-nft transfer u0 tx-sender 'SP...)
```

## Cost Estimate
- Token deployment: ~0.3 STX
- NFT deployment: ~0.4 STX
- **Total**: ~0.7 STX
