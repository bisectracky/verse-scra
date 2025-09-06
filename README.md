# 🌌 PlanetVRF - Web3 Resource Explorer

A decentralized lottery system built on Polygon and Base chains, featuring verifiable randomness through Chainlink VRF and NFT-based ticket system.

## 🚀 Overview

PlanetVRF is a Web3 mining/lottery system where users can start "planet operations" to win rewards ranging from 100 to 1,000,000 VERSE tokens (or USDC on Base). Each operation is minted as an NFT, providing transparency and ownership of lottery tickets.

## 🎯 Features

- **Verifiable Randomness**: Uses Chainlink VRF for provably fair random number generation
- **NFT Tickets**: Each lottery entry is minted as an NFT (ERC-721)
- **Multi-Chain**: Deployed on Polygon and Base networks
- **8 Prize Tiers**: Win from 100 to 1,000,000 tokens based on luck
- **Web3 Integration**: Full integration with Web3 wallets and smart contracts
- **Beautiful UI**: Space-themed interactive interface with planet exploration

## 📋 Deployed Contracts

### Polygon Network
- **PlanetVRF Contract**: [`0x999010daEf449c2cfCf36cB698047D1a7798EAd6`](https://polygonscan.com/address/0x999010daEf449c2cfCf36cB698047D1a7798EAd6)
- **Payment Token**: VERSE Token
- **Operation Cost**: 1 VERSE

### Base Network
- **PlanetVRF Contract**: [`0x66b0fbbeb420b63155d61ec5922293148bb796ec`](https://basescan.org/address/0x66b0fbbeb420b63155d61ec5922293148bb796ec)
- **Payment Token**: USDC
- **Operation Cost**: 1 USDC

## 🎰 Prize Tiers

| RNG Range | Prize Amount | Probability |
|-----------|--------------|-------------|
| 1         | 1,000,000 tokens | 0.1% |
| 2-3       | 100,000 tokens   | 0.2% |
| 4-9       | 50,000 tokens    | 0.6% |
| 10-29     | 10,000 tokens    | 2.0% |
| 30-79     | 5,000 tokens     | 5.0% |
| 80-279    | 1,000 tokens     | 20.0% |
| 280-799   | 500 tokens       | 52.0% |
| 800-1000  | 100 tokens       | 20.1% |

## 🏗️ Smart Contract Architecture

```
PlanetVRF.sol
├── PlanetNFT.sol (ERC-721 NFT functionality)
│   └── CommonNFT.sol (Base NFT implementation)
└── CommonVRF.sol (Chainlink VRF integration)
    └── PrizeTiers.sol (Prize distribution logic)
```

### Core Contracts

- **PlanetVRF.sol**: Main contract handling operations and prize distribution
- **CommonVRF.sol**: Base implementation for Chainlink VRF integration
- **PlanetNFT.sol**: NFT functionality for minting operation tickets
- **PrizeTiers.sol**: Prize tier configuration and calculation logic

## 🛠️ Technology Stack

- **Smart Contracts**: Solidity 0.8.25
- **Development Framework**: Foundry
- **Frontend**: React + Vite
- **Web3 Integration**: ThirdWeb SDK
- **Randomness**: Chainlink VRF v2
- **Networks**: Polygon & Base
- **Package Manager**: Bun

## 💻 Development Setup

### Prerequisites

- [Bun](https://bun.sh/) (JavaScript runtime & package manager)
- [Foundry](https://book.getfoundry.sh/getting-started/installation) (Solidity development toolkit)
- Node.js 18+ (if not using Bun)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd verse-scra
```

2. Install dependencies:
```bash
bun install
```

3. Install Foundry dependencies:
```bash
forge install
```

### Environment Setup

Create a `.env` file in the root directory:
```bash
# Private key for deployments
PRIVATE_KEY=your_private_key_here

# RPC URLs
POLYGON_RPC_URL=https://polygon-rpc.com
BASE_RPC_URL=https://base-mainnet.public.blastapi.io

# Etherscan API keys for verification
POLYGONSCAN_API_KEY=your_polygonscan_api_key
BASESCAN_API_KEY=your_basescan_api_key
```

## 🧪 Testing

Run the smart contract tests:
```bash
forge test
```

Run tests with gas reporting:
```bash
forge test --gas-report
```

## 🚀 Deployment

### Deploy to Polygon
```bash
bun run deploy:planetvrf:polygon
```

### Deploy to Base
```bash
bun run deploy:planetvrf:base
```

### Verify Contracts
Contracts are automatically verified during deployment if API keys are configured.

## 🌐 Frontend Development

Start the development server:
```bash
bun run dev
```

Build for production:
```bash
bun run build
```

Preview production build:
```bash
bun run preview
```

## 📝 Contract Interaction

### Starting an Operation

Users can start a planet operation by:
1. Approving the contract to spend VERSE/USDC tokens
2. Calling `startOperation()` function
3. Receiving an NFT representing their operation
4. Waiting for VRF callback to determine prize

### Claiming Prizes

Prizes are automatically distributed after the VRF callback is processed. Winners receive their tokens directly to their wallet.

## 🔧 Configuration

### Chainlink VRF Settings

**Polygon:**
- VRF Coordinator: `0xAE975071Be8F8eE67addBC1A82488F1C24858067`
- Key Hash: `0x6e099d640cde6de9d40ac749b4b594126b0169747122711109c9985d47751f93`
- Subscription ID: 1274

**Base:**
- VRF Coordinator: `0xd5D517aBE5cF79B7e95eC98dB0f0277788aFF634`
- Key Hash: `0x83d1b6e3388bed3d76426974512bb0d270e9542a765cd667242ea26c0cc0b730`

## 🔐 Security

- Contracts use Chainlink VRF for verifiable randomness
- Pausable functionality for emergency stops
- Owner-only administrative functions
- Reentrancy guards on critical functions

## 📄 License

This project is licensed under the VIBE License.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For questions and support, please open an issue in the GitHub repository.

---

Built with ❤️ for the Web3 community