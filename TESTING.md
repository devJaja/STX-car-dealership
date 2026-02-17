# Testing Guide

## Running Tests

All contracts have comprehensive test coverage using Clarinet.

### Run All Tests
```bash
clarinet test
```

### Run Specific Test File
```bash
clarinet test tests/car-dealership_test.ts
clarinet test tests/car-token_test.ts
clarinet test tests/car-nft_test.ts
```

## Test Coverage

### Car Dealership Contract
- ✅ Add car as owner
- ✅ Prevent non-owner from adding cars
- ✅ Buy car functionality
- ✅ Prevent buying cars not for sale
- ✅ List car for sale
- ✅ Get car details
- ✅ Get total cars count

### Car Token (CDT)
- ✅ Mint tokens as owner
- ✅ Prevent non-owner from minting
- ✅ Transfer tokens
- ✅ Prevent unauthorized transfers
- ✅ Get balance
- ✅ Get total supply
- ✅ Get token metadata (name, symbol, decimals)

### Car NFT
- ✅ Mint NFT with metadata
- ✅ Transfer NFT
- ✅ Prevent unauthorized transfers
- ✅ Get NFT owner
- ✅ Get NFT metadata
- ✅ Get token URI
- ✅ Mint multiple NFTs

## Test Results

Run tests to verify all contracts work correctly before deployment.

```bash
cd /home/jaja/Desktop/projects/car-dealership
clarinet test
```

Expected output: All tests passing ✅
