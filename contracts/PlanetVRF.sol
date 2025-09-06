// SPDX-License-Identifier: -- VIBE --

pragma solidity =0.8.25;

import "./CommonVRF.sol";
import "./PlanetNFT.sol";

error ZeroTickts();
error ZeroAddress();
error NotEnoughFunds();

contract PlanetVRF is PlanetNFT, CommonVRF {
    // ETH price for operations (0.0001 ETH)
    uint256 public constant ETH_OPERATION_COST = 0.0001 ether;

    constructor(
        string memory _name,
        string memory _symbol,
        address _vrfCoordinatorV2Address,
        uint256 _operationCost,
        address _linkTokenAddress,
        address _verseTokenAddress,
        bytes32 _gasKeyHash,
        uint64 _subscriptionId
    )
        ERC721(
            _name,
            _symbol
        )
        CommonVRF(
            _linkTokenAddress,
            _verseTokenAddress,
            _gasKeyHash,
            _subscriptionId,
            _vrfCoordinatorV2Address
        )
    {
        baseCost = _operationCost;
    }

    /**
     * @notice Allows to purchase planet operation as NFT.
     */
    function startOperation()
        external
        whenNotPaused
    {
        _newOperation(
            msg.sender
        );
    }

    /**
     * @notice Allows to purchase planet operation as NFT using ETH.
     */
    function startOperationETH()
        external
        payable
        whenNotPaused
    {
        require(msg.value == ETH_OPERATION_COST, "Incorrect ETH amount");

        _drawOperationRequest(
            msg.sender
        );
    }

    function _newOperation(
        address _receiver
    )
        internal
    {
        _takeTokens(
            VERSE_TOKEN,
            baseCost
        );

        _drawOperationRequest(
            _receiver
        );
    }

    function bulkPurchase(
        address _receiver,
        uint256 _operationCount
    )
        external
    {
        if (_operationCount == 0) {
            revert ZeroTickts();
        }

        if (_operationCount > MAX_LOOPS) {
            revert TooManyOperations();
        }

        _takeTokens(
            VERSE_TOKEN,
            baseCost * _operationCount
        );

        uint256 i;

        while (i < _operationCount) {
            _drawOperationRequest(
                _receiver
            );
            unchecked {
                ++i;
            }
        }
    }

    /**
     * @notice Allows to bulk purchase planet operations using ETH.
     * @param _receiver The address that will receive the NFTs
     * @param _operationCount Number of operations to purchase
     */
    function bulkPurchaseETH(
        address _receiver,
        uint256 _operationCount
    )
        external
        payable
        whenNotPaused
    {
        if (_operationCount == 0) {
            revert ZeroTickts();
        }

        if (_operationCount > MAX_LOOPS) {
            revert TooManyOperations();
        }

        require(msg.value == ETH_OPERATION_COST * _operationCount, "Incorrect ETH amount");

        uint256 i;

        while (i < _operationCount) {
            _drawOperationRequest(
                _receiver
            );
            unchecked {
                ++i;
            }
        }
    }

    function _drawOperationRequest(
        address _receiver
    )
        internal
    {
        uint256 requestId = _requestRandomWords({
            _wordCount: 2
        });

        uint256 latestDrawId = _increaseLatestDrawId();

        Drawing memory newDrawing = Drawing({
            drawId: latestDrawId,
            operationReceiver: _receiver
        });

        drawIdToRequestId[latestDrawId] = requestId;
        requestIdToDrawing[requestId] = newDrawing;

        emit DrawRequest(
            latestDrawId,
            requestId,
            msg.sender
        );
    }

    /**
     * @notice callback function for chainlink VRF.
     * @param _requestId id of the VRF request.
     * @param _randomWords array with random numbers.
    */
    function fulfillRandomWords(
        uint256 _requestId,
        uint256[] memory _randomWords
    )
        internal
        override
    {
        Drawing memory currentDraw = requestIdToDrawing[
            _requestId
        ];

        uint256 randomEdition = uniform(
            _randomWords[1],
            10
        );

        uint256 randomNumber = uniform(
            _randomWords[0],
            1_000
        );

        uint256 prize = _getPrizeTier(
            randomNumber
        );

        uint256 latestOperationtId = _increaseLatestOperationId();

        _mintOperation(
            latestOperationtId,
            randomEdition,
            prize,
            currentDraw.operationReceiver
        );

        emit RequestFulfilled(
            currentDraw.drawId,
            _requestId,
            // @TODO: replace with randomEdition and randomNumber
            _randomWords
        );
    }

    function _increaseLatestOperationId()
        internal
        returns (uint256)
    {
        unchecked {
            return ++latestOperationId;
        }
    }

    function _increaseLatestDrawId()
        internal
        returns (uint256)
    {
        unchecked {
            return ++latestDrawId;
        }
    }

    function _getPrizeTier(
        uint256 _number
    )
        internal
        view
        returns (uint256 prize)
    {
        uint256 i;
        uint256 loops = prizeTiers.length;

        for (i; i < loops;) {

            PrizeTier memory pt = prizeTiers[i];

            if (_number >= pt.drawEdgeA && _number <= pt.drawEdgeB) {
                prize = pt.winAmount;
                return prize;
            }

            unchecked {
                ++i;
            }
        }
    }

    function claimPrize(
        uint256 _operationId
    )
        external
        whenNotPaused
        onlyTokenOwner(_operationId)
    {
        _setClaimed(
            _operationId
        );

        uint256 prizeWei = prizes[
            _operationId
        ];

        uint256 balance = VERSE_TOKEN.balanceOf(
            address(this)
        );

        if (balance < prizeWei) {
            revert NotEnoughFunds();
        }

        _giveTokens(
            VERSE_TOKEN,
            msg.sender,
            prizeWei
        );

        emit PrizeClaimed(
            _operationId,
            msg.sender,
            prizeWei
        );
    }

    function updateBaseURI(
        string calldata _newBaseURI
    )
        external
        onlyOwner
    {
        baseURI = _newBaseURI;
    }

    function addConsumer(
        address _newConsumer
    )
        external
        onlyOwner
    {
        if (_newConsumer == ZERO_ADDRESS) {
            revert ZeroAddress();
        }

        VRF_COORDINATOR.addConsumer(
            SUBSCRIPTION_ID,
            _newConsumer
        );
    }

    function removeConsumer(
        address _oldConsumer
    )
        external
        onlyOwner
    {
        if (_oldConsumer == ZERO_ADDRESS) {
            revert ZeroAddress();
        }

        VRF_COORDINATOR.removeConsumer(
            SUBSCRIPTION_ID,
            _oldConsumer
        );
    }

    /**
     * @notice Allows owner to withdraw collected ETH from operations
     * @param _to Address to send the ETH to
     * @param _amount Amount of ETH to withdraw
     */
    function withdrawETH(
        address payable _to,
        uint256 _amount
    )
        external
        onlyOwner
    {
        if (_to == address(0)) {
            revert ZeroAddress();
        }

        uint256 balance = address(this).balance;
        if (_amount > balance) {
            revert NotEnoughFunds();
        }

        (bool success, ) = _to.call{value: _amount}("");
        require(success, "ETH transfer failed");
    }
}
