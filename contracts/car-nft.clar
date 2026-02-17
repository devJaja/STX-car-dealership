;; Car NFT

(define-non-fungible-token car-nft uint)

(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-not-found (err u101))
(define-constant err-not-authorized (err u102))

(define-data-var nft-id-nonce uint u0)

(define-map nft-metadata
  { token-id: uint }
  {
    make: (string-ascii 50),
    model: (string-ascii 50),
    year: uint,
    vin: (string-ascii 17),
    uri: (string-ascii 256)
  }
)

;; Mint NFT
(define-public (mint (recipient principal) (make (string-ascii 50)) (model (string-ascii 50)) (year uint) (vin (string-ascii 17)) (uri (string-ascii 256)))
  (let ((token-id (var-get nft-id-nonce)))
    (try! (nft-mint? car-nft token-id recipient))
    (map-set nft-metadata { token-id: token-id }
      { make: make, model: model, year: year, vin: vin, uri: uri })
    (var-set nft-id-nonce (+ token-id u1))
    (ok token-id)
  )
)

;; Transfer NFT
(define-public (transfer (token-id uint) (sender principal) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender sender) err-not-authorized)
    (nft-transfer? car-nft token-id sender recipient)
  )
)

;; Get owner
(define-read-only (get-owner (token-id uint))
  (ok (nft-get-owner? car-nft token-id))
)

;; Get metadata
(define-read-only (get-metadata (token-id uint))
  (ok (map-get? nft-metadata { token-id: token-id }))
)

;; Get last token ID
(define-read-only (get-last-token-id)
  (ok (var-get nft-id-nonce))
)

;; Get token URI
(define-read-only (get-token-uri (token-id uint))
  (ok (get uri (unwrap! (map-get? nft-metadata { token-id: token-id }) err-not-found)))
)
