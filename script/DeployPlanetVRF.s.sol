// SPDX-License-Identifier: -- VIBE --

pragma solidity =0.8.25;

import "forge-std/Script.sol";
import "../contracts/PlanetVRF.sol";

contract DeployPlanetVRF is Script {
    // Polygon addresses and configuration
    address constant VERSE_POLYGON = 0xc708D6F2153933DAA50B2D0758955Be0A93A8FEc;
    address constant LINK_POLYGON = 0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39;
    address constant VRF_COORDINATOR_POLYGON = 0xAE975071Be8F8eE67addBC1A82488F1C24858067;
    bytes32 constant KEY_HASH_POLYGON = 0x6e099d640cde6de9d40ac749b4b594126b0169747122711109c9985d47751f93;
    uint64 constant SUBSCRIPTION_ID_POLYGON = 1274;

    // Base addresses and configuration
    address constant USDC_BASE = 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913; // USDC on Base
    address constant LINK_BASE = 0x88Fb150BDc53A65fe94Dea0c9BA0a6dAf8C6e196;
    address constant VRF_COORDINATOR_BASE = 0xd5D517aBE5cF79B7e95eC98dB0f0277788aFF634;
    bytes32 constant KEY_HASH_BASE = 0x83d1b6e3388bed3d76426974512bb0d270e9542a765cd667242ea26c0cc0b730;
    uint64 constant SUBSCRIPTION_ID_BASE = 0; // 0 to create new subscription

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        uint256 chainId = block.chainid;

        // Network-specific configuration
        address vrfCoordinator;
        address linkToken;
        address verseToken;
        bytes32 gasKeyHash;
        uint64 subscriptionId;

        if (chainId == 137) {
            // Polygon configuration
            vrfCoordinator = VRF_COORDINATOR_POLYGON;
            linkToken = LINK_POLYGON;
            verseToken = VERSE_POLYGON;
            gasKeyHash = KEY_HASH_POLYGON;
            subscriptionId = SUBSCRIPTION_ID_POLYGON;
        } else if (chainId == 8453) {
            // Base configuration
            vrfCoordinator = VRF_COORDINATOR_BASE;
            linkToken = LINK_BASE;
            verseToken = USDC_BASE; // Using USDC as payment token on Base
            gasKeyHash = KEY_HASH_BASE;
            subscriptionId = SUBSCRIPTION_ID_BASE;
        } else {
            revert("Unsupported chain ID");
        }

        // Contract configuration
        string memory name = "Planet VRF";
        string memory symbol = "PVRF";
        uint256 operationCost = 1 ether; // 1 VERSE token as operation cost

        vm.startBroadcast(deployerPrivateKey);

        // Deploy PlanetVRF contract
        PlanetVRF planetVRF = new PlanetVRF(
            name,
            symbol,
            vrfCoordinator,
            operationCost,
            linkToken,
            verseToken,
            gasKeyHash,
            subscriptionId
        );

        console.log("PlanetVRF deployed at:", address(planetVRF));
        console.log("Name:", planetVRF.name());
        console.log("Symbol:", planetVRF.symbol());
        console.log("Operation Cost:", planetVRF.baseCost());
        console.log("VRF Coordinator:", vrfCoordinator);
        console.log("LINK Token:", linkToken);
        console.log("Payment Token:", verseToken);
        console.log("Gas Key Hash:", vm.toString(gasKeyHash));
        console.log("Subscription ID:", subscriptionId);

        if (chainId == 8453) {
            console.log("Note: Using USDC as payment token on Base");
            console.log("Note: Subscription ID is 0 - new subscription will be created");
        }

        vm.stopBroadcast();
    }
}
