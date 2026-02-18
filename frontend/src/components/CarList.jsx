import { openContractCall } from '@stacks/connect'
import * as StacksNetwork from '@stacks/network'
import { uintCV } from '@stacks/transactions'

function CarList({ cars, userData, userSession, onUpdate }) {
  const buyCar = async (carId) => {
    await openContractCall({
      network: StacksNetwork.createNetwork("mainnet"),
      contractAddress: 'SP19PS42C7R7BR4VCX2YN8KPHXSB0ZC19K6PFEKTC',
      contractName: 'car-dealership',
      functionName: 'buy-car',
      functionArgs: [uintCV(carId)],
      onFinish: (data) => {
        console.log('Transaction:', data)
        setTimeout(onUpdate, 3000)
      },
      userSession,
    })
  }

  const listCar = async (carId, price) => {
    const newPrice = prompt('Enter new price (microSTX):', price)
    if (!newPrice) return

    await openContractCall({
      network: StacksNetwork.createNetwork("mainnet"),
      contractAddress: 'SP19PS42C7R7BR4VCX2YN8KPHXSB0ZC19K6PFEKTC',
      contractName: 'car-dealership',
      functionName: 'list-car',
      functionArgs: [uintCV(carId), uintCV(newPrice)],
      onFinish: (data) => {
        console.log('Transaction:', data)
        setTimeout(onUpdate, 3000)
      },
      userSession,
    })
  }

  const unlistCar = async (carId) => {
    await openContractCall({
      network: StacksNetwork.createNetwork("mainnet"),
      contractAddress: 'SP19PS42C7R7BR4VCX2YN8KPHXSB0ZC19K6PFEKTC',
      contractName: 'car-dealership',
      functionName: 'unlist-car',
      functionArgs: [uintCV(carId)],
      onFinish: (data) => {
        console.log('Transaction:', data)
        setTimeout(onUpdate, 3000)
      },
      userSession,
    })
  }

  const isOwner = (car) => {
    return userData && car.owner === userData.profile.stxAddress.mainnet
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {cars.length === 0 ? (
        <div className="col-span-full py-16 text-center">
          <div className="inline-block p-6 bg-gray-50 rounded-full mb-4">
            <span className="text-4xl">🏎️</span>
          </div>
          <h3 className="text-xl font-medium text-dark-900 dark:text-white">No vehicles available</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Check back later or add your own vehicle.</p>
        </div>
      ) : (
        cars.map((car) => (
          <div key={car.id} className="bg-white dark:bg-gray-800 dark:bg-dark-800 rounded-2xl shadow-xl overflow-hidden card-hover border border-gray-100 dark:border-gray-700 flex flex-col">
            <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative flex items-center justify-center">
              <span className="text-6xl filter drop-shadow-lg opacity-80">🚗</span>
              <div className="absolute top-4 right-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${car.forSale
                    ? 'bg-green-100 text-green-700 border border-green-200'
                    : 'bg-red-100 text-red-700 border border-red-200'
                    }`}
                >
                  {car.forSale ? 'For Sale' : 'Sold'}
                </span>
              </div>
            </div>

            <div className="p-6 flex-grow flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-bold text-dark-900 dark:text-white leading-tight">
                    {car.make} {car.model}
                  </h3>
                  <p className="text-gray-500 text-sm font-medium">{car.year}</p>
                </div>
              </div>

              <div className="mt-4 mb-6">
                <p className="text-sm text-gray-400 mb-1">Price</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-brand-600">
                    {(car.price / 1000000).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-sm font-medium text-gray-500">STX</span>
                </div>
              </div>

              <div className="mt-auto space-y-3 pt-4 border-t border-gray-50 dark:border-gray-700">
                <div className="text-xs text-gray-400 flex items-center gap-1 overflow-hidden">
                  <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  <span className="truncate">{car.owner}</span>
                </div>

                {userData && (
                  <div className="grid grid-cols-1 gap-2">
                    {car.forSale && !isOwner(car) && (
                      <button
                        onClick={() => buyCar(car.id)}
                        className="btn-primary w-full"
                      >
                        Buy Now
                      </button>
                    )}
                    {isOwner(car) && !car.forSale && (
                      <button
                        onClick={() => listCar(car.id, car.price)}
                        className="btn-secondary w-full"
                      >
                        List for Sale
                      </button>
                    )}
                    {isOwner(car) && car.forSale && (
                      <button
                        onClick={() => unlistCar(car.id)}
                        className="btn-accent w-full bg-orange-500 hover:bg-orange-600 text-white"
                      >
                        Remove Listing
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default CarList
