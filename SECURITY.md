# Security Policy

## Reporting Security Issues

If you discover a security vulnerability, please email the maintainers directly instead of opening a public issue.

## Smart Contract Security

### Auditing
- All contracts should be audited before mainnet deployment
- Test thoroughly on testnet first
- Review all public functions for access control

### Best Practices
- Never share private keys or mnemonics
- Use hardware wallets for mainnet deployments
- Verify contract addresses before interacting
- Start with small transactions to test

## Known Considerations

### Contract Owner Privileges
- The contract owner can add cars to inventory
- Consider implementing multi-sig for production

### STX Transfers
- All car purchases involve STX transfers
- Ensure sufficient balance before transactions
- Transactions are irreversible

## Responsible Disclosure

We appreciate responsible disclosure of security issues. Please allow reasonable time for fixes before public disclosure.

## Updates

This security policy may be updated. Check regularly for changes.
