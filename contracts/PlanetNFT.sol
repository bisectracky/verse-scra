// SPDX-License-Identifier: -- VIBE --

pragma solidity =0.8.25;

import "./CommonNFT.sol";
import "./helpers/PrizeTiers.sol";

error AlreadyClaimed();

abstract contract PlanetNFT is CommonNFT, PrizeTiers  {

    using Strings for uint256;

    uint256 public latestOperationId;

    mapping(uint256 => bool) public claimed;
    mapping(uint256 => uint256) public prizes;
    mapping(uint256 => uint256) public editions;

    struct Drawing {
        uint256 drawId;
        address operationReceiver;
    }

    mapping(uint256 => Drawing) public requestIdToDrawing;

    event SetClaimed(
        uint256 indexed operationId
    );

    event MintCompleted(
        uint256 indexed operationId,
        uint256 indexed edition,
        address indexed recipient,
        uint256 prize
    );

    event PrizeClaimed(
        uint256 indexed operationId,
        address indexed receiver,
        uint256 amount
    );

    function _mintOperation(
        uint256 _operationId,
        uint256 _editionId,
        uint256 _prize,
        address _receiver
    )
        internal
    {
        prizes[_operationId] = _prize;
        editions[_operationId] = _editionId;

        _mintNoCallBack(
            _receiver,
            _operationId
        );

        emit MintCompleted(
            _operationId,
            _editionId,
            _receiver,
            _prize
        );
    }

    function tokenURI(
        uint256 _operationId
    )
        public
        view
        override
        returns (string memory)
    {
        if (_ownerOf(_operationId) == ZERO_ADDRESS) {
            revert InvalidId();
        }

        string memory claimDone = claimed[_operationId]
            ? "true"
            : "false";

        return string(
            abi.encodePacked(
                baseURI,
                _operationId.toString(),
                "/",
                claimDone,
                ".json"
            )
        );
    }

    function _setClaimed(
        uint256 _operationId
    )
        internal
    {
        if (claimed[_operationId] == true) {
            revert AlreadyClaimed();
        }

        claimed[_operationId] = true;

        emit SetClaimed(
            _operationId
        );
    }
}
