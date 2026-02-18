import { useState, useEffect, useCallback } from 'react'
import { AppConfig, UserSession, showConnect } from '@stacks/connect'
import * as StacksNetwork from '@stacks/network'
import { uintCV } from '@stacks/transactions'
import Header from './components/Header'
import AddCar from './components/AddCar'
import CarList from './components/CarList'
import TokenManager from './components/TokenManager'
import NFTManager from './components/NFTManager'
import NFTGallery from './components/NFTGallery'
import Footer from './components/Footer'

const appConfig = new AppConfig(['store_write', 'publish_data'])
const userSession = new UserSession({ appConfig })

function App() {
  const [userData, setUserData] = useState(null)
  const [cars, setCars] = useState([])

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUserData(userSession.loadUserData())
    }
  }, [])

  const connectWallet = () => {
    showConnect({
      appDetails: {
        name: 'LuxeDrive',
        icon: window.location.origin + '/logo.png',
      },
      redirectTo: '/',
      onFinish: () => {
        setUserData(userSession.loadUserData())
      },
      userSession,
    })
  }

  const disconnectWallet = () => {
    userSession.signUserOut()
    setUserData(null)
  }

  const loadCar = useCallback(async (carId) => {
    try {
      const network = StacksNetwork.createNetwork("mainnet")
      const result = await network.callReadOnlyFunction({
        contractAddress: 'SP19PS42C7R7BR4VCX2YN8KPHXSB0ZC19K6PFEKTC',
        contractName: 'car-dealership',
        functionName: 'get-car',
        functionArgs: [uintCV(carId)],
        senderAddress: userData?.profile?.stxAddress?.mainnet || 'SP19PS42C7R7BR4VCX2YN8KPHXSB0ZC19K6PFEKTC',
      })

      if (result.type === 'some') {
        const carData = result.value.data
        return {
          id: carId,
          make: carData.make.data,
          model: carData.model.data,
          year: parseInt(carData.year.value),
          price: parseInt(carData.price.value),
          owner: carData.owner.address,
          forSale: carData['for-sale'].type === 'true',
        }
      }
      return null
    } catch (error) {
      console.error(`Error loading car ${carId}:`, error)
      return null
    }
  }, [userData])

  const loadCars = useCallback(async () => {
    try {
      const network = StacksNetwork.createNetwork("mainnet")
      const result = await network.callReadOnlyFunction({
        contractAddress: 'SP19PS42C7R7BR4VCX2YN8KPHXSB0ZC19K6PFEKTC',
        contractName: 'car-dealership',
        functionName: 'get-total-cars',
        functionArgs: [],
        senderAddress: userData?.profile?.stxAddress?.mainnet || 'SP19PS42C7R7BR4VCX2YN8KPHXSB0ZC19K6PFEKTC',
      })

      const total = parseInt(result.value)

      const carPromises = []
      for (let i = 0; i < total; i++) {
        carPromises.push(loadCar(i))
      }
      const loadedCars = await Promise.all(carPromises)
      setCars(loadedCars.filter(car => car !== null))
    } catch (error) {
      console.error('Error loading cars:', error)
    }
  }, [userData, loadCar])

  useEffect(() => {
    if (userData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      loadCars()
    }
  }, [userData, loadCars])

  return (
    <div className="flex flex-col min-h-screen selection:bg-brand-500 selection:text-white">
      <Header
        userData={userData}
        onConnect={connectWallet}
        onDisconnect={disconnectWallet}
      />

      <main className="flex-grow container mx-auto px-6 py-12 space-y-16">
        {userData && (
          <section className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <AddCar
                userSession={userSession}
                onCarAdded={loadCars}
              />
              <TokenManager
                userData={userData}
                userSession={userSession}
              />
            </div>

            <NFTManager
              userSession={userSession}
            />
          </section>
        )}

        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-dark-900 dark:text-white">Showroom</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Discover our collection of premium vehicles</p>
            </div>
            {/* Filter controls could go here */}
          </div>

          <CarList
            cars={cars}
            userData={userData}
            userSession={userSession}
            onUpdate={loadCars}
          />
        </section>

        {userData && (
          <section className="pt-8 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-3xl font-bold text-dark-900 dark:text-white mb-8">Your Digital Assets</h2>
            <NFTGallery
              userData={userData}
              userSession={userSession}
            />
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default App
