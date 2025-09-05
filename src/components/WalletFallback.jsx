import React, { useState, useEffect } from 'react'

const WalletFallback = () => {
  const [account, setAccount] = useState(null)
  const [isConnecting, setIsConnecting] = useState(false)

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('Please install MetaMask or another Ethereum wallet')
      return
    }

    setIsConnecting(true)
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      setAccount(accounts[0])
    } catch (error) {
      console.error('Failed to connect wallet:', error)
      alert('Failed to connect wallet')
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setAccount(null)
  }

  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        setAccount(accounts.length > 0 ? accounts[0] : null)
      }
      
      window.ethereum.on('accountsChanged', handleAccountsChanged)
      return () => window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
    }
  }, [])

  return (
    <div className="wallet-fallback">
      {account ? (
        <div className="connected-wallet">
          <span className="wallet-address">
            {`${account.slice(0, 6)}...${account.slice(-4)}`}
          </span>
          <button onClick={disconnectWallet} className="disconnect-btn">
            Disconnect
          </button>
        </div>
      ) : (
        <button 
          onClick={connectWallet} 
          disabled={isConnecting}
          className="connect-btn"
        >
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      )}
    </div>
  )
}

export default WalletFallback