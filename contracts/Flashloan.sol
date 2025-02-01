// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@aave/core-v3/contracts/interfaces/IPool.sol";
import "@aave/core-v3/contracts/flashloan/interfaces/IFlashLoanSimpleReceiver.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FlashLoanPolygon is IFlashLoanSimpleReceiver {
    address private immutable owner;
    IPool private immutable lendingPool;
    IERC20 private immutable usdc;

    constructor(address _lendingPool, address _usdc) {
        owner = msg.sender;
        lendingPool = IPool(_lendingPool);
        usdc = IERC20(_usdc);
    }

    function executeFlashLoan(uint256 amount) external {
        require(msg.sender == owner, "Not authorized");
        lendingPool.flashLoanSimple(address(this), address(usdc), amount, "", 0);
    }

    function executeOperation(
        address asset,
        uint256 amount,
        uint256 premium,
        address initiator,
        bytes calldata params
    ) external override returns (bool) {
        require(msg.sender == address(lendingPool), "Unauthorized");

        uint256 totalDebt = amount + premium;
        usdc.approve(address(lendingPool), totalDebt);
        return true;
    }
}
