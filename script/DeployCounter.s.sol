// SPDX-License-Identifier: -- VIBE --

pragma solidity =0.8.25;

import "forge-std/Script.sol";
import "../contracts/Counter.sol";

contract DeployCounter is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        vm.startBroadcast(deployerPrivateKey);
        
        // Deploy Counter contract
        Counter counter = new Counter();
        
        console.log("Counter deployed at:", address(counter));
        console.log("Initial counter value:", counter.getNumber());
        console.log("Owner:", counter.owner());
        
        vm.stopBroadcast();
    }
}