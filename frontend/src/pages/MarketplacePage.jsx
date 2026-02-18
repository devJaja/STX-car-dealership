import CarList from '../components/CarList'

function MarketplacePage({ cars, userData, userSession, onUpdate }) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Marketplace
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Buy and sell cars on the blockchain
        </p>
      </div>
      <CarList 
        cars={cars}
        userData={userData}
        userSession={userSession}
        onUpdate={onUpdate}
      />
    </div>
  )
}

export default MarketplacePage
