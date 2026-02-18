## Troubleshooting

### "StacksTestnet is not exported" Error

If you see this error, clear Vite cache:

```bash
cd frontend
rm -rf node_modules/.vite
npm run dev
```

### Module Not Found

Reinstall dependencies:

```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Contract Call Fails

1. Check wallet is connected
2. Verify contract address is correct
3. Ensure sufficient STX balance
4. Check network (testnet vs mainnet)
