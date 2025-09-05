import React, { useState, useEffect } from 'react'
import { ConnectButton } from 'thirdweb/react'
import { useActiveAccount, useActiveWallet } from 'thirdweb/react'
import { client, chains } from './config/thirdweb'
import PlanetMenu from './components/PlanetMenu'
import SolarSystem from './components/SolarSystem'
import PlanetDetails from './components/PlanetDetails'
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
  const [readPlanet, setReadPlanet] = useState(null)

  const account = useActiveAccount()
  const wallet = useActiveWallet()

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
    <div className="app">
      <div className="wallet-container">
        <ConnectButton 
          client={client}
          chains={chains}
          theme="dark"
          connectButton={{
            label: "Connect Wallet",
          }}
        />
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
  )
}

export default App