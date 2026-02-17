import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.0.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

Clarinet.test({
    name: "Can mint tokens as owner",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const wallet1 = accounts.get('wallet_1')!;
        
        let block = chain.mineBlock([
            Tx.contractCall('car-token', 'mint', [
                types.uint(1000000),
                types.principal(wallet1.address)
            ], deployer.address)
        ]);
        
        block.receipts[0].result.expectOk().expectBool(true);
    },
});

Clarinet.test({
    name: "Cannot mint tokens as non-owner",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const wallet1 = accounts.get('wallet_1')!;
        const wallet2 = accounts.get('wallet_2')!;
        
        let block = chain.mineBlock([
            Tx.contractCall('car-token', 'mint', [
                types.uint(1000000),
                types.principal(wallet2.address)
            ], wallet1.address)
        ]);
        
        block.receipts[0].result.expectErr().expectUint(100);
    },
});

Clarinet.test({
    name: "Can transfer tokens",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const wallet1 = accounts.get('wallet_1')!;
        const wallet2 = accounts.get('wallet_2')!;
        
        let block = chain.mineBlock([
            Tx.contractCall('car-token', 'mint', [
                types.uint(1000000),
                types.principal(wallet1.address)
            ], deployer.address),
            Tx.contractCall('car-token', 'transfer', [
                types.uint(500000),
                types.principal(wallet1.address),
                types.principal(wallet2.address)
            ], wallet1.address)
        ]);
        
        block.receipts[1].result.expectOk().expectBool(true);
    },
});

Clarinet.test({
    name: "Cannot transfer tokens from another account",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const wallet1 = accounts.get('wallet_1')!;
        const wallet2 = accounts.get('wallet_2')!;
        
        let block = chain.mineBlock([
            Tx.contractCall('car-token', 'mint', [
                types.uint(1000000),
                types.principal(wallet1.address)
            ], deployer.address),
            Tx.contractCall('car-token', 'transfer', [
                types.uint(500000),
                types.principal(wallet1.address),
                types.principal(wallet2.address)
            ], wallet2.address)
        ]);
        
        block.receipts[1].result.expectErr().expectUint(101);
    },
});

Clarinet.test({
    name: "Can get balance",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const wallet1 = accounts.get('wallet_1')!;
        
        let block = chain.mineBlock([
            Tx.contractCall('car-token', 'mint', [
                types.uint(1000000),
                types.principal(wallet1.address)
            ], deployer.address)
        ]);
        
        let balance = chain.callReadOnlyFn('car-token', 'get-balance', [
            types.principal(wallet1.address)
        ], deployer.address);
        
        balance.result.expectOk().expectUint(1000000);
    },
});

Clarinet.test({
    name: "Can get total supply",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const wallet1 = accounts.get('wallet_1')!;
        
        let block = chain.mineBlock([
            Tx.contractCall('car-token', 'mint', [
                types.uint(1000000),
                types.principal(wallet1.address)
            ], deployer.address)
        ]);
        
        let supply = chain.callReadOnlyFn('car-token', 'get-total-supply', [], deployer.address);
        supply.result.expectOk().expectUint(1000000);
    },
});

Clarinet.test({
    name: "Can get token metadata",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        
        let name = chain.callReadOnlyFn('car-token', 'get-name', [], deployer.address);
        name.result.expectOk().expectAscii("Car Dealership Token");
        
        let symbol = chain.callReadOnlyFn('car-token', 'get-symbol', [], deployer.address);
        symbol.result.expectOk().expectAscii("CDT");
        
        let decimals = chain.callReadOnlyFn('car-token', 'get-decimals', [], deployer.address);
        decimals.result.expectOk().expectUint(6);
    },
});
