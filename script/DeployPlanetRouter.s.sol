// SPDX-License-Identifier: -- VIBE --

pragma solidity =0.8.25;

import "forge-std/Script.sol";
import "../contracts/PlanetRouter.sol";
import "../contracts/PlanetVRF.sol";

contract DeployPlanetRouter is Script {
    function run() external {
        // Example addresses - replace with actual addresses for your network
        address weth = vm.envAddress("WETH_ADDRESS");
        address verseToken = vm.envAddress("VERSE_TOKEN_ADDRESS");

        vm.startBroadcast();

        // Deploy PlanetRouter
        PlanetRouter planetRouter = new PlanetRouter(
            weth,
            verseToken
        );

        console.log("PlanetRouter deployed at:", address(planetRouter));

        vm.stopBroadcast();
    }
}