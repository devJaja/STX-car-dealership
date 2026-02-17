import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.0.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

Clarinet.test({
    name: "Can add car as owner",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        
        let block = chain.mineBlock([
            Tx.contractCall('car-dealership', 'add-car', [
                types.ascii("Toyota"),
                types.ascii("Camry"),
                types.uint(2024),
                types.uint(25000000000)
            ], deployer.address)
        ]);
        
        block.receipts[0].result.expectOk().expectUint(0);
    },
});

Clarinet.test({
    name: "Cannot add car as non-owner",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const wallet1 = accounts.get('wallet_1')!;
        
        let block = chain.mineBlock([
            Tx.contractCall('car-dealership', 'add-car', [
                types.ascii("Toyota"),
                types.ascii("Camry"),
                types.uint(2024),
                types.uint(25000000000)
            ], wallet1.address)
        ]);
        
        block.receipts[0].result.expectErr().expectUint(100);
    },
});

Clarinet.test({
    name: "Can buy car",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const wallet1 = accounts.get('wallet_1')!;
        
        let block = chain.mineBlock([
            Tx.contractCall('car-dealership', 'add-car', [
                types.ascii("Toyota"),
                types.ascii("Camry"),
                types.uint(2024),
                types.uint(25000000000)
            ], deployer.address),
            Tx.contractCall('car-dealership', 'buy-car', [
                types.uint(0)
            ], wallet1.address)
        ]);
        
        block.receipts[0].result.expectOk();
        block.receipts[1].result.expectOk().expectBool(true);
    },
});

Clarinet.test({
    name: "Cannot buy car not for sale",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const wallet1 = accounts.get('wallet_1')!;
        
        let block = chain.mineBlock([
            Tx.contractCall('car-dealership', 'add-car', [
                types.ascii("Toyota"),
                types.ascii("Camry"),
                types.uint(2024),
                types.uint(25000000000)
            ], deployer.address),
            Tx.contractCall('car-dealership', 'buy-car', [
                types.uint(0)
            ], wallet1.address),
            Tx.contractCall('car-dealership', 'buy-car', [
                types.uint(0)
            ], deployer.address)
        ]);
        
        block.receipts[2].result.expectErr().expectUint(102);
    },
});

Clarinet.test({
    name: "Can list car for sale",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        const wallet1 = accounts.get('wallet_1')!;
        
        let block = chain.mineBlock([
            Tx.contractCall('car-dealership', 'add-car', [
                types.ascii("Toyota"),
                types.ascii("Camry"),
                types.uint(2024),
                types.uint(25000000000)
            ], deployer.address),
            Tx.contractCall('car-dealership', 'buy-car', [
                types.uint(0)
            ], wallet1.address),
            Tx.contractCall('car-dealership', 'list-car', [
                types.uint(0),
                types.uint(30000000000)
            ], wallet1.address)
        ]);
        
        block.receipts[2].result.expectOk().expectBool(true);
    },
});

Clarinet.test({
    name: "Can get car details",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        
        let block = chain.mineBlock([
            Tx.contractCall('car-dealership', 'add-car', [
                types.ascii("Toyota"),
                types.ascii("Camry"),
                types.uint(2024),
                types.uint(25000000000)
            ], deployer.address)
        ]);
        
        let car = chain.callReadOnlyFn('car-dealership', 'get-car', [
            types.uint(0)
        ], deployer.address);
        
        car.result.expectSome();
    },
});

Clarinet.test({
    name: "Can get total cars",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        const deployer = accounts.get('deployer')!;
        
        let block = chain.mineBlock([
            Tx.contractCall('car-dealership', 'add-car', [
                types.ascii("Toyota"),
                types.ascii("Camry"),
                types.uint(2024),
                types.uint(25000000000)
            ], deployer.address),
            Tx.contractCall('car-dealership', 'add-car', [
                types.ascii("Honda"),
                types.ascii("Accord"),
                types.uint(2023),
                types.uint(22000000000)
            ], deployer.address)
        ]);
        
        let total = chain.callReadOnlyFn('car-dealership', 'get-total-cars', [], deployer.address);
        total.result.expectOk().expectUint(2);
    },
});
