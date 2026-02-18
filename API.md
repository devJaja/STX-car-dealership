# API Reference

## Smart Contracts

### Car Dealership Contract

**Address:** `SP19PS42C7R7BR4VCX2YN8KPHXSB0ZC19K6PFEKTC.car-dealership`

#### Public Functions

##### add-car
```clarity
(add-car (make (string-ascii 50)) (model (string-ascii 50)) (year uint) (price uint))
```
Add a new car to the dealership inventory. Owner only.

**Parameters:**
- `make`: Car manufacturer
- `model`: Car model name
- `year`: Manufacturing year
- `price`: Price in microSTX (1 STX = 1,000,000 microSTX)

**Returns:** `(ok uint)` - Car ID

##### buy-car
```clarity
(buy-car (car-id uint))
```
Purchase a car from the dealership.

**Parameters:**
- `car-id`: ID of the car to purchase

**Returns:** `(ok bool)`

##### list-car
```clarity
(list-car (car-id uint) (price uint))
```
List your car for sale.

**Parameters:**
- `car-id`: ID of your car
- `price`: New price in microSTX

**Returns:** `(ok bool)`

##### unlist-car
```clarity
(unlist-car (car-id uint))
```
Remove your car from sale.

**Parameters:**
- `car-id`: ID of your car

**Returns:** `(ok bool)`

#### Read-Only Functions

##### get-car
```clarity
(get-car (car-id uint))
```
Get car details.

**Returns:** Car data or none

##### get-total-cars
```clarity
(get-total-cars)
```
Get total number of cars.

**Returns:** `(ok uint)`

---

### Car Token (CDT)

**Address:** `SP19PS42C7R7BR4VCX2YN8KPHXSB0ZC19K6PFEKTC.car-token`

#### Public Functions

##### mint
```clarity
(mint (amount uint) (recipient principal))
```
Mint new tokens. Owner only.

##### transfer
```clarity
(transfer (amount uint) (sender principal) (recipient principal))
```
Transfer tokens.

#### Read-Only Functions

##### get-balance
```clarity
(get-balance (account principal))
```
Get token balance.

##### get-total-supply
```clarity
(get-total-supply)
```
Get total token supply.

---

### Car NFT

**Address:** `SP19PS42C7R7BR4VCX2YN8KPHXSB0ZC19K6PFEKTC.car-nft`

#### Public Functions

##### mint
```clarity
(mint (recipient principal) (make string) (model string) (year uint) (vin string) (uri string))
```
Mint a car NFT.

##### transfer
```clarity
(transfer (token-id uint) (sender principal) (recipient principal))
```
Transfer NFT.

#### Read-Only Functions

##### get-owner
```clarity
(get-owner (token-id uint))
```
Get NFT owner.

##### get-metadata
```clarity
(get-metadata (token-id uint))
```
Get NFT metadata.

##### get-token-uri
```clarity
(get-token-uri (token-id uint))
```
Get token URI.

---

## Error Codes

- `u100` - Owner only
- `u101` - Not found
- `u102` - Not for sale / Not authorized
- `u103` - Not for sale
- `u104` - Insufficient funds
