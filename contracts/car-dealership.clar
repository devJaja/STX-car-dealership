;; Car Dealership Smart Contract

(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-not-found (err u101))
(define-constant err-not-for-sale (err u102))

(define-data-var car-id-nonce uint u0)

(define-map cars
  { car-id: uint }
  {
    make: (string-ascii 50),
    model: (string-ascii 50),
    year: uint,
    price: uint,
    owner: principal,
    for-sale: bool
  }
)

(define-public (add-car (make (string-ascii 50)) (model (string-ascii 50)) (year uint) (price uint))
  (let ((car-id (var-get car-id-nonce)))
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (map-set cars { car-id: car-id }
      { make: make, model: model, year: year, price: price, owner: contract-owner, for-sale: true })
    (var-set car-id-nonce (+ car-id u1))
    (ok car-id)
  )
)

(define-public (buy-car (car-id uint))
  (let (
    (car (unwrap! (map-get? cars { car-id: car-id }) err-not-found))
    (price (get price car))
    (seller (get owner car))
  )
    (asserts! (get for-sale car) err-not-for-sale)
    (try! (stx-transfer? price tx-sender seller))
    (map-set cars { car-id: car-id } (merge car { owner: tx-sender, for-sale: false }))
    (ok true)
  )
)

(define-public (list-car (car-id uint) (price uint))
  (let ((car (unwrap! (map-get? cars { car-id: car-id }) err-not-found)))
    (asserts! (is-eq tx-sender (get owner car)) err-owner-only)
    (map-set cars { car-id: car-id } (merge car { price: price, for-sale: true }))
    (ok true)
  )
)

(define-public (unlist-car (car-id uint))
  (let ((car (unwrap! (map-get? cars { car-id: car-id }) err-not-found)))
    (asserts! (is-eq tx-sender (get owner car)) err-owner-only)
    (map-set cars { car-id: car-id } (merge car { for-sale: false }))
    (ok true)
  )
)

(define-read-only (get-car (car-id uint))
  (map-get? cars { car-id: car-id })
)

(define-read-only (get-total-cars)
  (ok (var-get car-id-nonce))
)
