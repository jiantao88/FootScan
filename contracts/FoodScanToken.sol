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
    
    // 事件
    event CheckIn(address indexed user, uint256 amount);
    event RewardEarned(address indexed user, uint256 amount, string rewardType);
    event CommunityContractUpdated(address indexed oldContract, address indexed newContract);

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
     * @dev 检查并重置每日奖励限额
     * @param user 用户地址
     */
    function checkAndResetDailyReward(address user) internal {
        if (block.timestamp >= rewardResetTime[user]) {
            dailyRewards[user] = 0;
            rewardResetTime[user] = block.timestamp + 24 hours;
        }
    }

    /**
     * @dev 每日签到
     * 用户每24小时可以签到一次获取奖励
     */
    function checkIn() external nonReentrant {
        require(
            block.timestamp >= lastCheckIn[msg.sender] + 24 hours,
            "Already checked in today"
        );
        
        checkAndResetDailyReward(msg.sender);
        require(
            dailyRewards[msg.sender] + DAILY_REWARD <= DAILY_REWARD_LIMIT,
            "Daily reward limit exceeded"
        );

        lastCheckIn[msg.sender] = block.timestamp;
        dailyRewards[msg.sender] += DAILY_REWARD;
        
        _mint(msg.sender, DAILY_REWARD);
        emit CheckIn(msg.sender, DAILY_REWARD);
    }

    /**
     * @dev 奖励发帖
     * @param user 用户地址
     */
    function rewardPost(address user) external nonReentrant {
        require(msg.sender == communityContract, "Only community contract");
        
        checkAndResetDailyReward(user);
        require(
            dailyRewards[user] + POST_REWARD <= DAILY_REWARD_LIMIT,
            "Daily reward limit exceeded"
        );

        dailyRewards[user] += POST_REWARD;
        _mint(user, POST_REWARD);
        emit RewardEarned(user, POST_REWARD, "post");
    }

    /**
     * @dev 奖励评论
     * @param user 用户地址
     */
    function rewardComment(address user) external nonReentrant {
        require(msg.sender == communityContract, "Only community contract");
        
        checkAndResetDailyReward(user);
        require(
            dailyRewards[user] + COMMENT_REWARD <= DAILY_REWARD_LIMIT,
            "Daily reward limit exceeded"
        );

        dailyRewards[user] += COMMENT_REWARD;
        _mint(user, COMMENT_REWARD);
        emit RewardEarned(user, COMMENT_REWARD, "comment");
    }

    /**
     * @dev 奖励成功的纠错
     * @param user 用户地址
     */
    function rewardCorrection(address user) external nonReentrant {
        require(msg.sender == communityContract, "Only community contract");
        
        checkAndResetDailyReward(user);
        require(
            dailyRewards[user] + CORRECTION_REWARD <= DAILY_REWARD_LIMIT,
            "Daily reward limit exceeded"
        );

        dailyRewards[user] += CORRECTION_REWARD;
        _mint(user, CORRECTION_REWARD);
        emit RewardEarned(user, CORRECTION_REWARD, "correction");
    }

    /**
     * @dev 获取用户当日剩余可获得的奖励额度
     * @param user 用户地址
     * @return 剩余额度
     */
    function getRemainingDailyReward(address user) external view returns (uint256) {
        if (block.timestamp >= rewardResetTime[user]) {
            return DAILY_REWARD_LIMIT;
        }
        return DAILY_REWARD_LIMIT - dailyRewards[user];
    }
}
