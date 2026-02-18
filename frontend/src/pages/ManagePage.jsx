import AddCar from '../components/AddCar'
import TokenManager from '../components/TokenManager'
import NFTManager from '../components/NFTManager'

function ManagePage({ userData, userSession, onCarAdded }) {
  if (!userData) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Connect Your Wallet
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Please connect your wallet to manage cars, tokens, and NFTs
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Manage Assets
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Add cars, mint tokens, and create NFTs
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AddCar 
          userSession={userSession}
          onCarAdded={onCarAdded}
        />
        <TokenManager 
          userData={userData}
          userSession={userSession}
        />
      </div>

      <NFTManager 
        userData={userData}
        userSession={userSession}
      />
    </div>
  )
}

export default ManagePage
