// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./FoodScanCommunity.sol";
import "./FoodScanToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title FoodScanFactory
 * @dev 用于部署和管理 FoodScan 平台的工厂合约
 */
contract FoodScanFactory is Ownable, Pausable {
    // 合约地址
    address public tokenContract;
    address public communityContract;

    // 事件
    event TokenContractDeployed(address indexed contractAddress);
    event CommunityContractDeployed(address indexed contractAddress);
    event ContractsPaused();
    event ContractsUnpaused();

    constructor() Ownable(msg.sender) {}

    /**
     * @dev 部署代币合约
     */
    function deployTokenContract() external onlyOwner {
        require(tokenContract == address(0), "Token contract already deployed");
        
        FoodScanToken token = new FoodScanToken();
        tokenContract = address(token);
        
        emit TokenContractDeployed(tokenContract);
    }

    /**
     * @dev 部署社区合约
     */
    function deployCommunityContract() external onlyOwner {
        require(communityContract == address(0), "Community contract already deployed");
        require(tokenContract != address(0), "Deploy token contract first");
        
        FoodScanCommunity community = new FoodScanCommunity(tokenContract);
        communityContract = address(community);
        
        // 设置社区合约地址到代币合约
        FoodScanToken(tokenContract).setCommunityContract(communityContract);
        
        emit CommunityContractDeployed(communityContract);
    }

    /**
     * @dev 暂停所有合约
     */
    function pauseContracts() external onlyOwner {
        _pause();
        if (tokenContract != address(0)) {
            Pausable(tokenContract).pause();
        }
        if (communityContract != address(0)) {
            Pausable(communityContract).pause();
        }
        emit ContractsPaused();
    }

    /**
     * @dev 恢复所有合约
     */
    function unpauseContracts() external onlyOwner {
        _unpause();
        if (tokenContract != address(0)) {
            Pausable(tokenContract).unpause();
        }
        if (communityContract != address(0)) {
            Pausable(communityContract).unpause();
        }
        emit ContractsUnpaused();
    }

    /**
     * @dev 获取合约地址
     */
    function getContractAddresses() external view returns (address token, address community) {
        return (tokenContract, communityContract);
    }
}
