import { useState, useEffect } from 'react'
import { AppConfig, UserSession, showConnect } from '@stacks/connect'
import * as StacksNetwork from '@stacks/network'
import { uintCV, stringAsciiCV } from '@stacks/transactions'
import Header from './components/Header'
import AddCar from './components/AddCar'
import CarList from './components/CarList'
import TokenManager from './components/TokenManager'
import NFTManager from './components/NFTManager'
import NFTGallery from './components/NFTGallery'

const appConfig = new AppConfig(['store_write', 'publish_data'])
const userSession = new UserSession({ appConfig })

function App() {
  const [userData, setUserData] = useState(null)
  const [cars, setCars] = useState([])
  const [totalCars, setTotalCars] = useState(0)

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData())
    }
  }, [])

  useEffect(() => {
    if (userData) {
      loadCars()
    }
  }, [userData])

  const connectWallet = () => {
    showConnect({
      appDetails: {
        name: 'Car Dealership',
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

  const loadCars = async () => {
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
      setTotalCars(total)
      
      const carPromises = []
      for (let i = 0; i < total; i++) {
        carPromises.push(loadCar(i))
      }
      const loadedCars = await Promise.all(carPromises)
      setCars(loadedCars.filter(car => car !== null))
    } catch (error) {
      console.error('Error loading cars:', error)
    }
  }

  const loadCar = async (carId) => {
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
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700">
      <div className="container mx-auto px-4 py-8">
        <Header 
          userData={userData}
          onConnect={connectWallet}
          onDisconnect={disconnectWallet}
        />
        
        {userData && (
          <>
            <AddCar 
              userData={userData}
              userSession={userSession}
              onCarAdded={loadCars}
            />
            
            <TokenManager 
              userData={userData}
              userSession={userSession}
            />
            
            <NFTManager 
              userData={userData}
              userSession={userSession}
            />
          </>
        )}

        <CarList 
          cars={cars}
          userData={userData}
          userSession={userSession}
          onUpdate={loadCars}
        />

        {userData && (
          <div className="mt-8">
            <NFTGallery 
              userData={userData}
              userSession={userSession}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
