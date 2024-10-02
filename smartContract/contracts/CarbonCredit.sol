// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CarbonCredit {
    address public admin;
    mapping(address => uint256) public credits;

    event CreditsIssued(address indexed to, uint256 amount);
    event CreditsTransferred(address indexed from, address indexed to, uint256 amount);

    constructor() {
        admin = msg.sender;
    }

    function issueCredits(address to, uint256 amount) external {
        require(msg.sender == admin, "Only admin can issue credits");
        credits[to] += amount;
        emit CreditsIssued(to, amount);
    }

    function transferCredits(address to, uint256 amount) external {
        require(credits[msg.sender] >= amount, "Not enough credits");
        credits[msg.sender] -= amount;
        credits[to] += amount;
        emit CreditsTransferred(msg.sender, to, amount);
    }

    function getCredits(address account) external view returns (uint256) {
        return credits[account];
    }
}
