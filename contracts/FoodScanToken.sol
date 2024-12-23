// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title FoodScanToken
 * @dev 基于 Mantle 网络的 FoodScan 平台代币
 * 实现了社区激励机制，包括每日签到、发帖、评论和纠错奖励
 */
contract FoodScanToken is ERC20, Ownable, ReentrancyGuard {
    // 状态变量
    uint256 public constant DAILY_REWARD = 100 * 10**18; // 100 tokens
    uint256 public constant POST_REWARD = 50 * 10**18; // 50 tokens
    uint256 public constant COMMENT_REWARD = 10 * 10**18; // 10 tokens
    uint256 public constant CORRECTION_REWARD = 200 * 10**18; // 200 tokens
    uint256 public constant FAUCET_AMOUNT = 100 * 10**18; // 100 tokens for faucet
    
    // 每个地址的每日奖励限额
    uint256 public constant DAILY_REWARD_LIMIT = 1000 * 10**18; // 1000 tokens
    
    // 用户上次签到时间
    mapping(address => uint256) public lastCheckIn;
    // 用户每日获得的奖励总额
    mapping(address => uint256) public dailyRewards;
    // 每日奖励重置时间戳
    mapping(address => uint256) public rewardResetTime;
    // 社区合约地址
    address public communityContract;
    // 记录用户是否已经领取过水龙头代币
    mapping(address => bool) public hasClaimed;
    
    // 事件
    event CheckIn(address indexed user, uint256 amount);
    event RewardEarned(address indexed user, uint256 amount, string rewardType);
    event CommunityContractUpdated(address indexed oldContract, address indexed newContract);
    event FaucetClaimed(address indexed user, uint256 amount);

    constructor() ERC20("FoodScan Token on Mantle", "FST") Ownable(msg.sender) {
        _mint(msg.sender, 10000000 * 10**18); // 初始发行 10,000,000 tokens
    }

    /**
     * @dev 设置社区合约地址
     * @param _communityContract 新的社区合约地址
     */
    function setCommunityContract(address _communityContract) external onlyOwner {
        require(_communityContract != address(0), "Invalid address");
        emit CommunityContractUpdated(communityContract, _communityContract);
        communityContract = _communityContract;
    }

    /**
     * @dev 从水龙头领取代币
     * 每个地址只能领取一次
     */
    function claimFromFaucet() external nonReentrant {
        require(!hasClaimed[msg.sender], "Already claimed tokens");
        require(balanceOf(address(this)) >= FAUCET_AMOUNT, "Insufficient faucet balance");
        
        hasClaimed[msg.sender] = true;
        _transfer(address(this), msg.sender, FAUCET_AMOUNT);
        
        emit FaucetClaimed(msg.sender, FAUCET_AMOUNT);
    }

    /**
     * @dev 检查地址是否可以从水龙头领取代币
     * @param account 要检查的地址
     * @return bool 是否可以领取
     */
    function canClaimFromFaucet(address account) external view returns (bool) {
        return !hasClaimed[account];
    }

    /**
     * @dev 为水龙头补充代币
     * @param amount 补充的代币数量
     */
    function replenishFaucet(uint256 amount) external onlyOwner {
        require(amount > 0, "Amount must be greater than 0");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        
        _transfer(msg.sender, address(this), amount);
    }

    /**
     * @dev 每日签到领取奖励
     */
    function checkIn() external nonReentrant {
        require(block.timestamp >= lastCheckIn[msg.sender] + 24 hours, "Already checked in today");
        
        // 重置每日奖励
        if (block.timestamp >= rewardResetTime[msg.sender] + 24 hours) {
            dailyRewards[msg.sender] = 0;
            rewardResetTime[msg.sender] = block.timestamp;
        }
        
        require(dailyRewards[msg.sender] + DAILY_REWARD <= DAILY_REWARD_LIMIT, "Daily reward limit exceeded");
        
        lastCheckIn[msg.sender] = block.timestamp;
        dailyRewards[msg.sender] += DAILY_REWARD;
        
        _mint(msg.sender, DAILY_REWARD);
        emit CheckIn(msg.sender, DAILY_REWARD);
    }

    /**
     * @dev 发帖奖励
     * @param user 发帖用户地址
     */
    function rewardForPost(address user) external nonReentrant {
        require(msg.sender == communityContract, "Only community contract can call");
        require(user != address(0), "Invalid user address");
        
        if (block.timestamp >= rewardResetTime[user] + 24 hours) {
            dailyRewards[user] = 0;
            rewardResetTime[user] = block.timestamp;
        }
        
        require(dailyRewards[user] + POST_REWARD <= DAILY_REWARD_LIMIT, "Daily reward limit exceeded");
        
        dailyRewards[user] += POST_REWARD;
        _mint(user, POST_REWARD);
        emit RewardEarned(user, POST_REWARD, "post");
    }

    /**
     * @dev 评论奖励
     * @param user 评论用户地址
     */
    function rewardForComment(address user) external nonReentrant {
        require(msg.sender == communityContract, "Only community contract can call");
        require(user != address(0), "Invalid user address");
        
        if (block.timestamp >= rewardResetTime[user] + 24 hours) {
            dailyRewards[user] = 0;
            rewardResetTime[user] = block.timestamp;
        }
        
        require(dailyRewards[user] + COMMENT_REWARD <= DAILY_REWARD_LIMIT, "Daily reward limit exceeded");
        
        dailyRewards[user] += COMMENT_REWARD;
        _mint(user, COMMENT_REWARD);
        emit RewardEarned(user, COMMENT_REWARD, "comment");
    }

    /**
     * @dev 纠错奖励
     * @param user 纠错用户地址
     */
    function rewardForCorrection(address user) external nonReentrant {
        require(msg.sender == communityContract, "Only community contract can call");
        require(user != address(0), "Invalid user address");
        
        if (block.timestamp >= rewardResetTime[user] + 24 hours) {
            dailyRewards[user] = 0;
            rewardResetTime[user] = block.timestamp;
        }
        
        require(dailyRewards[user] + CORRECTION_REWARD <= DAILY_REWARD_LIMIT, "Daily reward limit exceeded");
        
        dailyRewards[user] += CORRECTION_REWARD;
        _mint(user, CORRECTION_REWARD);
        emit RewardEarned(user, CORRECTION_REWARD, "correction");
    }
}
