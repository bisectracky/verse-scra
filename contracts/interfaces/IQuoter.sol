// SPDX-License-Identifier: -- VIBE --

pragma solidity =0.8.25;

interface IQuoter {

    function quoteExactOutput(
        bytes memory path,
        uint256 amountOut
    )
        external
        returns (uint256 amountIn);
}