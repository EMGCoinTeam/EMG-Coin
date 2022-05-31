// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EmeldiToken is Ownable, ERC20 {

    // Initially there are 500.000.000 tokens pre-minted.
    // After 2 years there CAN be minted additional tokens, but no more than 300.000.000 (total allowed supply is 800.000.000)
    uint256 public constant SUPPLY_BASE_INITIAL = 500000000;
    uint256 public constant SUPPLY_BASE_MAX     = 800000000;
    // amount of days in two years (approx.)
    uint256 public constant MAX_SUPPLY_LOCK_PERIOD = 2 * 365; 

    // Holds the date when the additional supply may be added by mintAdditional function. 
    // This value is immutable, it is set once during construction.
    uint256 public targetSupplyUnlockDate;

    constructor() ERC20("EMG Coin", "EMG") {
        targetSupplyUnlockDate = block.timestamp + MAX_SUPPLY_LOCK_PERIOD * 1 days;

        // pre-mint initial supply
        _mint(_msgSender(), SUPPLY_BASE_INITIAL * 10**decimals());
    }

    function mintAdditional(uint256 amount) external onlyOwner {
        require(amount > 0);

        uint256 amountToMint = amount * 10**decimals();
        require(amountToMint <= SUPPLY_BASE_MAX * 10**decimals() - totalSupply(), 'Too much');

        require(block.timestamp >= targetSupplyUnlockDate, 'Too early');
        
        _mint(_msgSender(), amountToMint);
    }

    function burn(uint256 amount) external {
        _burn(_msgSender(), amount);
    }

    // fallback, accept ETH
    receive() external payable {
        payable(owner()).transfer(msg.value);
    }

}