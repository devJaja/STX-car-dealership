import { useState, useEffect, useCallback } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppConfig, UserSession, showConnect } from '@stacks/connect'
import * as StacksNetwork from '@stacks/network'
import { uintCV } from '@stacks/transactions'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import MarketplacePage from './pages/MarketplacePage'
import ManagePage from './pages/ManagePage'
import GalleryPage from './pages/GalleryPage'

const appConfig = new AppConfig(['store_write', 'publish_data'])
const userSession = new UserSession({ appConfig })

function App() {
  const [userData, setUserData] = useState(null)
  const [cars, setCars] = useState([])

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData())
    }
  }, [])

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

  const loadCars = useCallback(async () => {
    // Load cars logic here
  }, [])

  return (
    <Router>
      <div className="flex flex-col min-h-screen selection:bg-brand-500 selection:text-white">
        <Header
          userData={userData}
          onConnect={connectWallet}
          onDisconnect={disconnectWallet}
        />

        <main className="flex-grow container mx-auto px-6 py-12">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route 
              path="/marketplace" 
              element={
                <MarketplacePage 
                  cars={cars}
                  userData={userData}
                  userSession={userSession}
                  onUpdate={loadCars}
                />
              } 
            />
            <Route 
              path="/manage" 
              element={
                <ManagePage 
                  userData={userData}
                  userSession={userSession}
                  onCarAdded={loadCars}
                />
              } 
            />
            <Route 
              path="/gallery" 
              element={
                <GalleryPage 
                  userData={userData}
                  userSession={userSession}
                />
              } 
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  )
}

export default App
