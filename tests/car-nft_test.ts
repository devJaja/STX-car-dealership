import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.0.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

Clarinet.test({
    name: "Can mint NFT",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const wallet1 = accounts.get('wallet_1')!;
        
        let block = chain.mineBlock([
            Tx.contractCall('car-nft', 'mint', [
                types.principal(wallet1.address),
                types.ascii("Toyota"),
                types.ascii("Camry"),
                types.uint(2024),
                types.ascii("1HGBH41JXMN109186"),
                types.ascii("ipfs://QmTest123")
            ], deployer.address)
        ]);
        
        block.receipts[0].result.expectOk().expectUint(0);
    },
});

Clarinet.test({
    name: "Can transfer NFT",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const wallet1 = accounts.get('wallet_1')!;
        const wallet2 = accounts.get('wallet_2')!;
        
        let block = chain.mineBlock([
            Tx.contractCall('car-nft', 'mint', [
                types.principal(wallet1.address),
                types.ascii("Toyota"),
                types.ascii("Camry"),
                types.uint(2024),
                types.ascii("1HGBH41JXMN109186"),
                types.ascii("ipfs://QmTest123")
            ], deployer.address),
            Tx.contractCall('car-nft', 'transfer', [
                types.uint(0),
                types.principal(wallet1.address),
                types.principal(wallet2.address)
            ], wallet1.address)
        ]);
        
        block.receipts[1].result.expectOk().expectBool(true);
    },
});

Clarinet.test({
    name: "Cannot transfer NFT from another account",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const wallet1 = accounts.get('wallet_1')!;
        const wallet2 = accounts.get('wallet_2')!;
        
        let block = chain.mineBlock([
            Tx.contractCall('car-nft', 'mint', [
                types.principal(wallet1.address),
                types.ascii("Toyota"),
                types.ascii("Camry"),
                types.uint(2024),
                types.ascii("1HGBH41JXMN109186"),
                types.ascii("ipfs://QmTest123")
            ], deployer.address),
            Tx.contractCall('car-nft', 'transfer', [
                types.uint(0),
                types.principal(wallet1.address),
                types.principal(wallet2.address)
            ], wallet2.address)
        ]);
        
        block.receipts[1].result.expectErr().expectUint(102);
    },
});

Clarinet.test({
    name: "Can get NFT owner",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const wallet1 = accounts.get('wallet_1')!;
        
        let block = chain.mineBlock([
            Tx.contractCall('car-nft', 'mint', [
                types.principal(wallet1.address),
                types.ascii("Toyota"),
                types.ascii("Camry"),
                types.uint(2024),
                types.ascii("1HGBH41JXMN109186"),
                types.ascii("ipfs://QmTest123")
            ], deployer.address)
        ]);
        
        let owner = chain.callReadOnlyFn('car-nft', 'get-owner', [
            types.uint(0)
        ], deployer.address);
        
        owner.result.expectOk().expectSome().expectPrincipal(wallet1.address);
    },
});

Clarinet.test({
    name: "Can get NFT metadata",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const wallet1 = accounts.get('wallet_1')!;
        
        let block = chain.mineBlock([
            Tx.contractCall('car-nft', 'mint', [
                types.principal(wallet1.address),
                types.ascii("Toyota"),
                types.ascii("Camry"),
                types.uint(2024),
                types.ascii("1HGBH41JXMN109186"),
                types.ascii("ipfs://QmTest123")
            ], deployer.address)
        ]);
        
        let metadata = chain.callReadOnlyFn('car-nft', 'get-metadata', [
            types.uint(0)
        ], deployer.address);
        
        metadata.result.expectOk().expectSome();
    },
});

Clarinet.test({
    name: "Can get token URI",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const wallet1 = accounts.get('wallet_1')!;
        
        let block = chain.mineBlock([
            Tx.contractCall('car-nft', 'mint', [
                types.principal(wallet1.address),
                types.ascii("Toyota"),
                types.ascii("Camry"),
                types.uint(2024),
                types.ascii("1HGBH41JXMN109186"),
                types.ascii("ipfs://QmTest123")
            ], deployer.address)
        ]);
        
        let uri = chain.callReadOnlyFn('car-nft', 'get-token-uri', [
            types.uint(0)
        ], deployer.address);
        
        uri.result.expectOk().expectAscii("ipfs://QmTest123");
    },
});

Clarinet.test({
    name: "Can mint multiple NFTs",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const wallet1 = accounts.get('wallet_1')!;
        
        let block = chain.mineBlock([
            Tx.contractCall('car-nft', 'mint', [
                types.principal(wallet1.address),
                types.ascii("Toyota"),
                types.ascii("Camry"),
                types.uint(2024),
                types.ascii("1HGBH41JXMN109186"),
                types.ascii("ipfs://QmTest1")
            ], deployer.address),
            Tx.contractCall('car-nft', 'mint', [
                types.principal(wallet1.address),
                types.ascii("Honda"),
                types.ascii("Accord"),
                types.uint(2023),
                types.ascii("2HGBH41JXMN109187"),
                types.ascii("ipfs://QmTest2")
            ], deployer.address)
        ]);
        
        block.receipts[0].result.expectOk().expectUint(0);
        block.receipts[1].result.expectOk().expectUint(1);
        
        let lastId = chain.callReadOnlyFn('car-nft', 'get-last-token-id', [], deployer.address);
        lastId.result.expectOk().expectUint(2);
    },
});
