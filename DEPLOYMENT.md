# Mainnet Deployment Guide

## Prerequisites

1. **Mainnet STX Wallet** with sufficient balance for deployment fees (~0.5-1 STX)
2. **Wallet Mnemonic** (12 or 24 word seed phrase)

## Steps to Deploy

### 1. Add Your Mainnet Mnemonic

Edit `settings/Mainnet.toml` and replace `YOUR_MAINNET_MNEMONIC_HERE` with your actual mainnet wallet mnemonic:

```toml
[accounts.deployer]
mnemonic = "your twelve or twenty four word mnemonic phrase here"
```

⚠️ **SECURITY WARNING**: Never commit your mnemonic to git. Add `settings/Mainnet.toml` to `.gitignore`

### 2. Verify Contract

```bash
clarinet check
```

### 3. Generate Deployment Plan (Optional - already created)

```bash
clarinet deployments generate --mainnet
```

### 4. Deploy to Mainnet

```bash
clarinet deployments apply -p deployments/default.mainnet-plan.yaml
```

### 5. Verify Deployment

After deployment, you'll receive a transaction ID. Check it on:
- https://explorer.hiro.so/

Your contract address will be: `<SP19PS42C7R7BR4VCX2YN8KPHXSB0ZC19K6PFEKTC>.car-dealership`

### 6. Update Frontend

Update the contract address in these files:
- `frontend/src/App.jsx`
- `frontend/src/components/AddCar.jsx`
- `frontend/src/components/CarList.jsx`

Change:
- Network from `StacksTestnet` to `StacksMainnet`
- Contract address to your deployed mainnet address

Example:
```javascript
import { StacksMainnet } from '@stacks/network'

const network = new StacksMainnet()
const contractAddress = 'SP...' // Your mainnet address
```

## Alternative: Deploy via Hiro Platform

You can also deploy using the Hiro Platform web interface:
1. Go to https://platform.hiro.so/
2. Connect your wallet
3. Upload your contract
4. Deploy with a few clicks

## Cost Estimate

- Contract deployment: ~0.3-0.5 STX
- Transaction fees: ~0.001-0.01 STX
- **Total**: ~0.5-1 STX

## Troubleshooting

- **Insufficient funds**: Ensure your wallet has at least 1 STX
- **Invalid mnemonic**: Double-check your seed phrase
- **Network errors**: Try again or use a different RPC endpoint
