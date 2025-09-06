// SPDX-License-Identifier: -- VIBE --

pragma solidity =0.8.25;

contract Counter {
    uint256 public number;
    address public owner;

    event CounterIncremented(uint256 newValue);
    event CounterDecremented(uint256 newValue);
    event CounterReset(uint256 newValue);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    constructor() {
        owner = msg.sender;
        number = 0;
    }

    function setNumber(uint256 newNumber) public onlyOwner {
        number = newNumber;
    }

    function increment() public {
        number++;
        emit CounterIncremented(number);
    }

    function decrement() public {
        require(number > 0, "Counter cannot go below zero");
        number--;
        emit CounterDecremented(number);
    }

    function reset() public onlyOwner {
        number = 0;
        emit CounterReset(number);
    }

    function getNumber() public view returns (uint256) {
        return number;
    }
}