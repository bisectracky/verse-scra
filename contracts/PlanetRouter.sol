// SPDX-License-Identifier: -- VIBE --

pragma solidity =0.8.25;

import "./PlanetVRF.sol";

interface IUniswapV2Router02 {

    function WETH()
        external
        pure
        returns (address);

    function getAmountsIn(
        uint256 amountOut,
        address[] calldata path
    )
        external
        view
        returns (uint256[] memory amounts);

    function swapETHForExactTokens(
        uint256 amountOut,
        address[] calldata path,
        address to,
        uint256 deadline
    )
        external
        payable
        returns (uint256[] memory amounts);

    function swapExactTokensForTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    )
        external
        returns (uint256[] memory amounts);
}

contract PlanetRouter {

    address public immutable WETH;
    address public immutable VERSE_TOKEN;

    receive()
        external
        payable
    {}

    fallback()
        external
        payable
    {}

    event TokenPurchase(
        address indexed buyer,
        address indexed token,
        uint256 amount,
        uint256 receivedAmount
    );

    constructor(
        address _weth,
        address _verseToken
    ) {
        WETH = _weth;
        VERSE_TOKEN = _verseToken;
    }

    function getETHPriceForOperations(
        address _planetContract,
        uint256 _operationCount,
        address _uniswapRouter
    )
        public
        view
        returns (uint256 ethAmount)
    {
        PlanetVRF planet = PlanetVRF(
            _planetContract
        );

        uint256 totalCost = planet.baseCost() * _operationCount;

        address[] memory path = new address[](2);
        path[0] = WETH;
        path[1] = VERSE_TOKEN;

        uint256[] memory amounts = IUniswapV2Router02(_uniswapRouter).getAmountsIn(
            totalCost,
            path
        );

        return amounts[0];
    }

    function buyOperationsWithETH(
        address _planetContract,
        uint256 _operationCount,
        address _uniswapRouter
    )
        external
        payable
    {
        PlanetVRF planet = PlanetVRF(
            _planetContract
        );

        uint256 ethRequired = getETHPriceForOperations(
            _planetContract,
            _operationCount,
            _uniswapRouter
        );

        require(
            msg.value >= ethRequired,
            "Insufficient ETH sent"
        );

        // Swap ETH for VERSE tokens
        uint256 totalCost = planet.baseCost() * _operationCount;
        address[] memory path = new address[](2);
        path[0] = WETH;
        path[1] = VERSE_TOKEN;

        uint256[] memory amounts = IUniswapV2Router02(_uniswapRouter).swapETHForExactTokens{
            value: msg.value
        }(
            totalCost,
            path,
            address(this),
            block.timestamp
        );

        uint256 swapAmount = amounts[0];

        if (msg.value > swapAmount) {
            payable(msg.sender).transfer(
                msg.value - swapAmount
            );
        }

        IERC20(VERSE_TOKEN).approve(
            _planetContract,
            totalCost
        );

        planet.bulkPurchase(
            msg.sender,
            _operationCount
        );

        emit TokenPurchase(
            msg.sender,
            WETH,
            msg.value,
            swapAmount
        );
    }

    function buyOperation(
        address _planetContract,
        uint256 _operationCount
    )
        external
    {
        PlanetVRF planet = PlanetVRF(
            _planetContract
        );

        uint256 totalCost = planet.baseCost() * _operationCount;

        IERC20(VERSE_TOKEN).transferFrom(
            msg.sender,
            address(this),
            totalCost
        );

        IERC20(VERSE_TOKEN).approve(
            _planetContract,
            totalCost
        );

        planet.bulkPurchase(
            msg.sender,
            _operationCount
        );

        emit TokenPurchase(
            msg.sender,
            VERSE_TOKEN,
            totalCost,
            totalCost
        );
    }

    function getTokenPriceForOperations(
        address _planetContract,
        uint256 _operationCount,
        address _inputToken,
        address _uniswapRouter
    )
        public
        view
        returns (uint256 tokenAmount)
    {
        PlanetVRF planet = PlanetVRF(
            _planetContract
        );

        uint256 totalCost = planet.baseCost() * _operationCount;

        address[] memory path = new address[](2);
        path[0] = _inputToken;
        path[1] = VERSE_TOKEN;

        uint256[] memory amounts = IUniswapV2Router02(_uniswapRouter).getAmountsIn(
            totalCost,
            path
        );

        return amounts[0];
    }

    function buyWithToken(
        address _planetContract,
        uint256 _operationCount,
        address _inputToken,
        uint256 _maxTokenAmount,
        address _uniswapRouter
    )
        external
    {

        uint256 tokenRequired = getTokenPriceForOperations(
            _planetContract,
            _operationCount,
            _inputToken,
            _uniswapRouter
        );

        require(
            _maxTokenAmount >= tokenRequired,
            "Insufficient token amount sent"
        );

        PlanetVRF planet = PlanetVRF(
            _planetContract
        );

        uint256 totalCost = planet.baseCost() * _operationCount;

        address[] memory path = new address[](2);
        path[0] = _inputToken;
        path[1] = VERSE_TOKEN;

        IERC20(_inputToken).transferFrom(
            msg.sender,
            address(this),
            _maxTokenAmount
        );

        IERC20(_inputToken).approve(
            _uniswapRouter,
            _maxTokenAmount
        );

        uint256[] memory amounts = IUniswapV2Router02(_uniswapRouter).swapExactTokensForTokens(
            _maxTokenAmount,
            totalCost,
            path,
            address(this),
            block.timestamp
        );

        uint256 tokensUsed = amounts[0];

        if (_maxTokenAmount > tokensUsed) {
            IERC20(_inputToken).transfer(
                msg.sender,
                _maxTokenAmount - tokensUsed
            );
        }

        IERC20(VERSE_TOKEN).approve(
            _planetContract,
            totalCost
        );

        planet.bulkPurchase(
            msg.sender,
            _operationCount
        );

        emit TokenPurchase(
            msg.sender,
            _inputToken,
            _maxTokenAmount,
            tokensUsed
        );
    }
}
