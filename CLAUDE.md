# Verse-Scra: Web3 Space Mining Game

## Project Overview

Verse-Scra is a blockchain-based space mining game where players can mine resources from different planets across a fictional solar system called the Zephyr System. Each planet represents a different blockchain network and contains unique resources that players can mine through a lottery-style smart contract system.

## Game Concept

### Core Mechanics
- **Planet-based Mining**: 8 unique planets, each connected to specific smart contracts on different blockchain networks
- **Lottery Mining System**: Players purchase mining tickets/operations rather than guaranteed rewards
- **Chainlink Oracle Integration**: Uses Chainlink VRF (Verifiable Random Function) to determine mining success rates
- **Token Rewards**: Each planet's contract holds various token resources that can be won
- **Guaranteed Returns**: Contracts always return some reward, but amounts vary based on luck and oracle results

### Planets & Networks
1. **Solanium** (Solana-themed) - Fast transaction processing world
2. **Ethereus** (Ethereum-themed) - Storm world with lightning networks  
3. **ZANO** (Privacy-focused) - Stealth and anonymity features
4. **Ferrum** (Iron/Metal-themed) - Volcanic mining world
5. **Lumina** (Light-themed) - Ocean world with ether islands
6. **TITANOX** (Forest world) - Merkle tree structures
7. **Base** (Base chain) - Shell world foundation
8. **Voidara** (Phase-shifting) - Quantum mechanics world

## Technical Architecture

### Frontend Stack
- **React 19** - Modern UI framework
- **Vite** - Fast build tool and dev server
- **Bun** - Package manager and runtime
- **Thirdweb SDK v5** - Web3 integration and wallet connections
- **CSS3** - Custom animations and 3D planet visualizations
- **React Error Boundaries** - Graceful error handling

### Blockchain Integration
- **Multi-chain Support**: Ethereum, Base, Polygon, Arbitrum
- **Smart Contracts**: Each planet has dedicated mining contracts
- **Chainlink Oracles**: VRF for randomness in mining outcomes
- **Token Standards**: ERC-20 tokens as mining rewards
- **Wallet Integration**: MetaMask, Coinbase Wallet, WalletConnect

### Smart Contract Flow
1. **Purchase Mining Operation**: User pays fee to start mining
2. **Oracle Request**: Contract requests randomness from Chainlink
3. **Wait for Callback**: Frontend polls contract for oracle response
4. **Determine Rewards**: Oracle result determines token payout amount
5. **Claim Rewards**: User receives tokens (always some amount, never zero)

## File Structure
```
verse-scra/
├── src/
│   ├── components/
│   │   ├── PlanetMenu.jsx       # Planet selection interface
│   │   ├── SolarSystem.jsx      # 3D solar system visualization
│   │   ├── PlanetDetails.jsx    # Planet information panels
│   │   ├── ErrorBoundary.jsx    # Error handling
│   │   └── WalletFallback.jsx   # Backup wallet connection
│   ├── config/
│   │   └── thirdweb.js         # Web3 client configuration
│   ├── images/                 # Planet and UI assets
│   ├── hooks/                  # Custom React hooks (future)
│   ├── App.jsx                 # Main application component
│   ├── main.jsx               # React entry point
│   └── index.css              # Global styles
├── css/                       # Legacy CSS (being migrated)
├── package.json              # Dependencies and scripts
├── vite.config.js           # Build configuration
└── CLAUDE.md               # This documentation file
```

## Development Setup

### Prerequisites
- Node.js 18+ or Bun runtime
- MetaMask or compatible Web3 wallet
- Thirdweb account for client ID

### Installation
```bash
bun install
```

### Environment Variables
Create `.env` file:
```env
VITE_THIRDWEB_CLIENT_ID=your_thirdweb_client_id_here
```

### Development Server
```bash
bun run dev
```

### Build for Production
```bash
bun run build
```

## Game Features

### Current Implementation
- ✅ 8 Interactive planets with unique designs
- ✅ Wallet connection via Thirdweb
- ✅ 3D CSS animations and planet rotations
- ✅ Planet selection and detailed information panels
- ✅ Multi-chain support configuration
- ✅ Error handling and fallback systems
- ✅ Responsive design with space theme

### Planned Features
- 🔲 Smart contract deployment for each planet
- 🔲 Chainlink VRF integration
- 🔲 Mining operation purchasing system
- 🔲 Token reward distribution
- 🔲 Mining history and statistics
- 🔲 Planet ownership mechanics
- 🔲 Leaderboards and competitive features
- 🔲 NFT integration for special mining equipment
- 🔲 Cross-chain token bridging
- 🔲 Governance token for game decisions

### Smart Contract Requirements

#### Mining Contract Interface
```solidity
// Each planet will have a contract implementing this interface
interface IPlanetMining {
    function startMiningOperation(uint256 ticketPrice) external payable;
    function checkMiningResult(address miner) external view returns (bool completed, uint256 reward);
    function claimRewards() external;
    function getPlanetResources() external view returns (address[] memory tokens, uint256[] memory amounts);
    function getMinerCount() external view returns (uint256);
}
```

#### Oracle Integration
- Use Chainlink VRF for randomness
- Callback function to determine win amounts
- Minimum and maximum payout ratios
- Gas-efficient random number generation

## UI/UX Design

### Visual Theme
- **Space/Cosmic**: Dark backgrounds with glowing elements
- **Sci-fi Aesthetic**: Futuristic fonts and UI components
- **Planet Animations**: CSS 3D transforms and rotations
- **Color Coding**: Each planet has unique color scheme
- **Responsive**: Works on desktop and mobile devices

### User Flow
1. **Connect Wallet** - Thirdweb connect button
2. **Select Planet** - Choose from 8 available planets  
3. **View Resources** - Check available tokens in planet contract
4. **Purchase Mining Ticket** - Pay for chance to mine
5. **Wait for Oracle** - Chainlink determines outcome
6. **Claim Rewards** - Receive won tokens
7. **View Statistics** - Track mining history

## Error Handling

### Robust Error Management
- **React Error Boundaries**: Catch component errors gracefully
- **Wallet Connection Issues**: Fallback to direct MetaMask connection
- **Network Failures**: Retry mechanisms and user notifications
- **Smart Contract Errors**: Clear error messages and recovery options
- **Oracle Delays**: Timeout handling and status updates

## Security Considerations

### Frontend Security
- Input validation for all user interactions
- Secure wallet connection practices
- Protection against common Web3 vulnerabilities
- Rate limiting for contract interactions

### Smart Contract Security
- Reentrancy guards on all external calls
- Access control for administrative functions
- Oracle manipulation protection
- Economic security through proper tokenomics

## Testing Strategy

### Frontend Testing
- Unit tests for React components
- Integration tests for Web3 interactions
- E2E tests for complete user flows
- Cross-browser compatibility testing

### Smart Contract Testing
- Comprehensive unit tests with Hardhat/Foundry
- Integration tests with Chainlink mocks
- Gas optimization testing
- Security audits before mainnet deployment

## Deployment Strategy

### Development Environment
- Local development with Hardhat network
- Testnet deployment on Sepolia/Mumbai
- Staging environment for integration testing

### Production Deployment
- Multi-chain deployment across supported networks
- Frontend deployment on decentralized hosting (IPFS)
- Smart contract verification and documentation
- Monitoring and analytics setup

## Future Expansions

### Phase 2 Features
- **Mining Guilds**: Team-based mining operations
- **Planet Terraforming**: Upgrade planets for better rewards  
- **Equipment NFTs**: Special tools for enhanced mining
- **Seasonal Events**: Limited-time planets and rewards

### Phase 3 Features
- **Planet Conquest**: PvP mechanics for planet control
- **Cross-chain Bridges**: Move resources between planets
- **DAO Governance**: Community-driven game development
- **Mobile App**: Native mobile experience

## Contributing

This project is designed to be AI-agent friendly for development assistance. All major components are well-documented and follow React best practices. The codebase is structured for easy expansion and modification.

### Development Notes for AI Agents
- Use Bun for package management (not npm/yarn)
- Follow existing component patterns in `/src/components/`
- Maintain the space/cosmic theme in any new UI elements
- All new smart contract interactions should go through Thirdweb SDK
- Error handling is critical - always wrap risky operations in try/catch
- CSS animations are important to the game feel - preserve existing animations

### Key Commands
- `bun run dev` - Start development server
- `bun run build` - Build for production  
- `bun run preview` - Preview production build
- `bun install` - Install dependencies
- `bun add <package>` - Add new dependencies

---

*This documentation serves as a comprehensive guide for AI agents and developers working on the Verse-Scra mining game project.*