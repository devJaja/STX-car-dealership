function Header({ userData, onConnect, onDisconnect }) {
  return (
    <header className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">🚗 Car Dealership</h1>
        <div className="flex items-center gap-4">
          {userData ? (
            <>
              <span className="text-sm text-gray-600">
                {userData.profile.stxAddress.mainnet.slice(0, 8)}...
              </span>
              <button
                onClick={onDisconnect}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
              >
                Disconnect
              </button>
            </>
          ) : (
            <button
              onClick={onConnect}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
