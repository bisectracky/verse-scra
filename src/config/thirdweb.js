import { createThirdwebClient } from 'thirdweb'
import { ethereum, base, polygon, arbitrum } from 'thirdweb/chains'

export const client = createThirdwebClient({
  clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID || "demo", // Using demo for development
})

// Set Polygon as the first/default chain
export const chains = [polygon, ethereum, base, arbitrum]

// Helper function to handle wallet provider conflicts
export const getWalletProvider = () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    return window.ethereum
  }
  return null
}