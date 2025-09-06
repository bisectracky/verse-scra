// SPDX-License-Identifier: -- VIBE --

pragma solidity =0.8.25;

import "forge-std/Script.sol";
import "../contracts/PlanetRouter.sol";
import "../contracts/PlanetVRF.sol";

contract DeployPlanetRouter is Script {
    // Polygon addresses
    address constant WETH_POLYGON = 0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619;
    address constant VERSE_POLYGON = 0xc708D6F2153933DAA50B2D0758955Be0A93A8FEc;
    
    // Ethereum Mainnet addresses
    address constant WETH_MAINNET = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    address constant VERSE_MAINNET = 0x249cA82617eC3DfB2589c4c17ab7EC9765350a18;

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        uint256 chainId = block.chainid;
        
        address weth;
        address verseToken;
        
        if (chainId == 137) {
            // Polygon
            weth = WETH_POLYGON;
            verseToken = VERSE_POLYGON;
        } else if (chainId == 1) {
            // Ethereum Mainnet
            weth = WETH_MAINNET;
            verseToken = VERSE_MAINNET;
        } else {
            revert("Unsupported chain ID");
        }

        vm.startBroadcast(deployerPrivateKey);

        // Deploy PlanetRouter
        PlanetRouter planetRouter = new PlanetRouter(
            weth,
            verseToken
        );

        console.log("PlanetRouter deployed at:", address(planetRouter));

        vm.stopBroadcast();
    }
}