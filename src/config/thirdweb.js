import { createThirdwebClient } from 'thirdweb'
import { ethereum, base, polygon, arbitrum } from 'thirdweb/chains'

export const client = createThirdwebClient({
  clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID || "YOUR_CLIENT_ID_HERE",
})

export const chains = [ethereum, base, polygon, arbitrum]