import React, { useState, useEffect } from 'react'
import { ConnectButton } from 'thirdweb/react'
import { useActiveAccount, useActiveWallet } from 'thirdweb/react'
import { client, chains } from './config/thirdweb'
import PlanetMenu from './components/PlanetMenu'
import SolarSystem from './components/SolarSystem'
import PlanetDetails from './components/PlanetDetails'
import ErrorBoundary from './components/ErrorBoundary'
import WalletFallback from './components/WalletFallback'
import './App.css'

const App = () => {
  const [selectedPlanet, setSelectedPlanet] = useState('ferrum')
  const [planets, setPlanets] = useState({
    solanium: { name: 'Solanium', miners: 0, owner: null },
    ethereus: { name: 'Ethereus', miners: 0, owner: null },
    zano: { name: 'ZANO', miners: 1, owner: null },
    ferrum: { name: 'Ferrum', miners: 1, owner: null },
    lumina: { name: 'Lumina', miners: 0, owner: null },
    titanox: { name: 'TITANOX', miners: 2, owner: null },
    base: { name: 'Base', miners: 0, owner: null },
    voidara: { name: 'Voidara', miners: 0, owner: null }
  })

  const account = useActiveAccount()
  const wallet = useActiveWallet()
  
  // Handle wallet connection errors gracefully
  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      // Clear any potential conflicts
      const handleAccountsChanged = (accounts) => {
        console.log('Accounts changed:', accounts)
      }
      
      const handleChainChanged = (chainId) => {
        console.log('Chain changed:', chainId)
      }
      
      const handleConnect = (connectInfo) => {
        console.log('Wallet connected:', connectInfo)
      }
      
      const handleDisconnect = (error) => {
        console.log('Wallet disconnected:', error)
      }

      // Add event listeners
      window.ethereum.on('accountsChanged', handleAccountsChanged)
      window.ethereum.on('chainChanged', handleChainChanged)
      window.ethereum.on('connect', handleConnect)
      window.ethereum.on('disconnect', handleDisconnect)

      return () => {
        // Cleanup event listeners
        if (window.ethereum && window.ethereum.removeListener) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
          window.ethereum.removeListener('chainChanged', handleChainChanged)
          window.ethereum.removeListener('connect', handleConnect)
          window.ethereum.removeListener('disconnect', handleDisconnect)
        }
      }
    }
  }, [])

  useEffect(() => {
    const hash = window.location.hash.substring(1)
    if (hash && planets[hash]) {
      setSelectedPlanet(hash)
    }

    const handleHashChange = () => {
      const newHash = window.location.hash.substring(1)
      if (newHash && planets[newHash]) {
        setSelectedPlanet(newHash)
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const handlePlanetSelect = (planetId) => {
    setSelectedPlanet(planetId)
    window.location.hash = planetId
  }


  return (
    <ErrorBoundary>
      <div className="app">
        <div className="wallet-container">
          <ErrorBoundary>
            <ConnectButton 
              client={client}
              chains={chains}
              theme="dark"
              connectButton={{
                label: "Connect Wallet",
              }}
            />
          </ErrorBoundary>
        </div>

      <h1 className='logo'>
        Resource Explorer
        <span>WEB3 Mining System</span>
      </h1>

      {account && (
        <div className="connected-info">
          <div className="wallet-address">
            {`${account.address.slice(0, 6)}...${account.address.slice(-4)}`}
          </div>
          <div className="chain-info">
            Chain: {wallet?.getChain()?.name || 'Unknown'}
          </div>
        </div>
      )}

      <PlanetMenu 
        planets={planets}
        selectedPlanet={selectedPlanet}
        onPlanetSelect={handlePlanetSelect}
      />

      <SolarSystem 
        planets={planets}
        selectedPlanet={selectedPlanet}
        isWalletConnected={!!account}
      />

      <PlanetDetails />
      </div>
    </ErrorBoundary>
  )
}

export default App