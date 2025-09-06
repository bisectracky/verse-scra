# Verse-Scra Smart Contracts

This directory contains the smart contracts for the Verse-Scra planet mining game.

## Core Contracts

- **PlanetRouter.sol** - Main router contract for purchasing mining tickets with ETH or tokens
- **PlanetVRF.sol** - VRF-powered planet mining contract for mining operations
- **CommonVRF.sol** - Base VRF implementation for randomness
- **PlanetNFT.sol** - NFT implementation for mining tickets
- **CommonNFT.sol** - Base NFT functionality

## Setup

1. Install dependencies:
```bash
forge install
```

2. Compile contracts:
```bash
forge build
```

3. Run tests:
```bash
forge test
```

## Deployment

1. Set up environment variables:
```bash
export WETH_ADDRESS=<WETH_CONTRACT_ADDRESS>
export VERSE_TOKEN_ADDRESS=<VERSE_TOKEN_ADDRESS>
export PRIVATE_KEY=<YOUR_DEPLOYMENT_PRIVATE_KEY>
```

2. Deploy PlanetRouter:
```bash
forge script script/DeployPlanetRouter.s.sol --rpc-url <YOUR_RPC_URL> --broadcast --private-key $PRIVATE_KEY
```

### Network Addresses

#### Ethereum Mainnet
- WETH: 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
- VERSE: [Add VERSE token address]

#### Polygon
- WETH: 0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619
- VERSE: [Add VERSE token address]

#### Base
- WETH: 0x4200000000000000000000000000000000000006
- VERSE: [Add VERSE token address]