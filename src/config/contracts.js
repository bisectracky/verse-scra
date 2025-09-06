import { polygon } from 'thirdweb/chains'

// Contract addresses
export const PLANET_VRF_ADDRESS = '0x999010daEf449c2cfCf36cB698047D1a7798EAd6' // Polygon contract

// Contract ABIs
export const PLANET_VRF_ABI = [
    {
        "type": "function",
        "name": "startOperationETH",
        "inputs": [],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "ETH_OPERATION_COST",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "event",
        "name": "DrawRequest",
        "inputs": [
            {
                "name": "drawId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "requestId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "requestAddress",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "MintCompleted",
        "inputs": [
            {
                "name": "operationId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "edition",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "recipient",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "prize",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    },
    {
        "type": "event",
        "name": "PrizeClaimed",
        "inputs": [
            {
                "name": "operationId",
                "type": "uint256",
                "indexed": true,
                "internalType": "uint256"
            },
            {
                "name": "receiver",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "amount",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    }
]

// Default chain configuration
export const DEFAULT_CHAIN = polygon
export const OPERATION_COST = '0.0001' // ETH amount for startOperationETH
