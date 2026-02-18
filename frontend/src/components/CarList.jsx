import { openContractCall } from '@stacks/connect'
import { StacksTestnet } from '@stacks/network'
import { uintCV } from '@stacks/transactions'

function CarList({ cars, userData, userSession, onUpdate }) {
  const buyCar = async (carId) => {
    await openContractCall({
      network: new StacksTestnet(),
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
      network: new StacksTestnet(),
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
      network: new StacksTestnet(),
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
    return userData && car.owner === userData.profile.stxAddress.testnet
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Cars</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center py-8">No cars available</p>
        ) : (
          cars.map((car) => (
            <div key={car.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <h3 className="text-xl font-bold text-purple-600 mb-2">
                {car.make} {car.model}
              </h3>
              <p className="text-gray-600">Year: {car.year}</p>
              <p className="text-2xl font-bold text-gray-800 my-3">
                {(car.price / 1000000).toFixed(2)} STX
              </p>
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
                  car.forSale
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {car.forSale ? 'For Sale' : 'Not For Sale'}
              </span>
              <p className="text-xs text-gray-500 mb-3">
                Owner: {car.owner.slice(0, 8)}...
              </p>

              {userData && (
                <div className="space-y-2">
                  {car.forSale && !isOwner(car) && (
                    <button
                      onClick={() => buyCar(car.id)}
                      className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
                    >
                      Buy Car
                    </button>
                  )}
                  {isOwner(car) && !car.forSale && (
                    <button
                      onClick={() => listCar(car.id, car.price)}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                    >
                      List for Sale
                    </button>
                  )}
                  {isOwner(car) && car.forSale && (
                    <button
                      onClick={() => unlistCar(car.id)}
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition"
                    >
                      Unlist
                    </button>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default CarList
