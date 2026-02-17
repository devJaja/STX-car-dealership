;; Car Dealership Token (CDT)

(define-fungible-token car-token)

(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-not-authorized (err u101))

;; Mint tokens (owner only)
(define-public (mint (amount uint) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (ft-mint? car-token amount recipient)
  )
)

;; Transfer tokens
(define-public (transfer (amount uint) (sender principal) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender sender) err-not-authorized)
    (ft-transfer? car-token amount sender recipient)
  )
)

;; Get balance
(define-read-only (get-balance (account principal))
  (ok (ft-get-balance car-token account))
)

;; Get total supply
(define-read-only (get-total-supply)
  (ok (ft-get-supply car-token))
)

;; Get token name
(define-read-only (get-name)
  (ok "Car Dealership Token")
)

;; Get token symbol
(define-read-only (get-symbol)
  (ok "CDT")
)

;; Get decimals
(define-read-only (get-decimals)
  (ok u6)
)
