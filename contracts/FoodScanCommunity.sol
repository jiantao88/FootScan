// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./FoodScanToken.sol";

/**
 * @title FoodScanCommunity
 * @dev 基于 Mantle 网络的 FoodScan 社区合约
 * 实现了帖子管理、评论系统、纠错机制和用户声誉系统
 */
contract FoodScanCommunity is Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;

    FoodScanToken public token;
    Counters.Counter private _postIds;
    Counters.Counter private _commentIds;

    // 常量
    uint256 public constant MIN_TOKEN_TO_POST = 10 * 10**18; // 发帖需要持有的最小代币数量
    uint256 public constant REPUTATION_MULTIPLIER = 100; // 声誉值计算乘数

    // 帖子结构
    struct Post {
        uint256 id;
        address author;
        string title;
        string content;
        string category;
        uint256 timestamp;
        bool isPinned;
        uint256 views;
        uint256 likes;
        bool isCorrection;
        bool isCorrectionApproved;
        string ipfsHash; // IPFS 哈希，用于存储长文本内容
    }

    // 评论结构
    struct Comment {
        uint256 id;
        uint256 postId;
        address author;
        string content;
        uint256 timestamp;
        uint256 likes;
        string ipfsHash; // IPFS 哈希，用于存储长文本内容
    }

    // 用户信息
    struct UserInfo {
        uint256 successfulCorrections;
        uint256 totalCorrections;
        bool isVerified;
        uint256 reputation;
        uint256 lastReputationUpdate;
    }

    // 存储
    mapping(uint256 => Post) public posts;
    mapping(uint256 => Comment[]) public postComments;
    mapping(address => UserInfo) public userInfo;
    mapping(uint256 => mapping(address => bool)) public postLikes;
    mapping(uint256 => mapping(address => bool)) public commentLikes;
    mapping(address => uint256[]) public userPosts;
    mapping(address => mapping(uint256 => uint256[])) public userComments;

    // 事件
    event PostCreated(
        uint256 indexed postId,
        address indexed author,
        string title,
        string category,
        string ipfsHash
    );
    event CommentAdded(
        uint256 indexed postId,
        uint256 indexed commentId,
        address indexed author,
        string ipfsHash
    );
    event PostLiked(uint256 indexed postId, address indexed user);
    event CommentLiked(uint256 indexed commentId, address indexed user);
    event CorrectionApproved(uint256 indexed postId, address indexed author);
    event UserVerified(address indexed user, bool verified);
    event ReputationUpdated(address indexed user, uint256 newReputation);

    constructor(address _token) Ownable(msg.sender) {
        require(_token != address(0), "Invalid token address");
        token = FoodScanToken(_token);
    }

    /**
     * @dev 检查用户是否有足够的代币发帖
     * @param user 用户地址
     */
    modifier hasEnoughTokens(address user) {
        require(
            token.balanceOf(user) >= MIN_TOKEN_TO_POST,
            "Insufficient token balance"
        );
        _;
    }

    /**
     * @dev 创建新帖子
     * @param _title 标题
     * @param _content 内容
     * @param _category 分类
     * @param _isCorrection 是否为纠错提案
     * @param _ipfsHash IPFS 哈希
     */
    function createPost(
        string memory _title,
        string memory _content,
        string memory _category,
        bool _isCorrection,
        string memory _ipfsHash
    ) external hasEnoughTokens(msg.sender) nonReentrant {
        _postIds.increment();
        uint256 newPostId = _postIds.current();

        posts[newPostId] = Post({
            id: newPostId,
            author: msg.sender,
            title: _title,
            content: _content,
            category: _category,
            timestamp: block.timestamp,
            isPinned: false,
            views: 0,
            likes: 0,
            isCorrection: _isCorrection,
            isCorrectionApproved: false,
            ipfsHash: _ipfsHash
        });

        userPosts[msg.sender].push(newPostId);
        token.rewardPost(msg.sender);
        
        emit PostCreated(newPostId, msg.sender, _title, _category, _ipfsHash);
    }

    /**
     * @dev 添加评论
     * @param _postId 帖子ID
     * @param _content 评论内容
     * @param _ipfsHash IPFS 哈希
     */
    function addComment(
        uint256 _postId,
        string memory _content,
        string memory _ipfsHash
    ) external nonReentrant {
        require(_postId <= _postIds.current() && _postId > 0, "Invalid post ID");
        
        _commentIds.increment();
        uint256 newCommentId = _commentIds.current();

        Comment memory newComment = Comment({
            id: newCommentId,
            postId: _postId,
            author: msg.sender,
            content: _content,
            timestamp: block.timestamp,
            likes: 0,
            ipfsHash: _ipfsHash
        });

        postComments[_postId].push(newComment);
        userComments[msg.sender][_postId].push(newCommentId);
        token.rewardComment(msg.sender);
        
        emit CommentAdded(_postId, newCommentId, msg.sender, _ipfsHash);
    }

    /**
     * @dev 点赞帖子
     * @param _postId 帖子ID
     */
    function likePost(uint256 _postId) external nonReentrant {
        require(!postLikes[_postId][msg.sender], "Already liked");
        require(_postId <= _postIds.current() && _postId > 0, "Invalid post ID");

        postLikes[_postId][msg.sender] = true;
        posts[_postId].likes++;
        
        // 更新作者声誉值
        updateReputation(posts[_postId].author, 1);
        
        emit PostLiked(_postId, msg.sender);
    }

    /**
     * @dev 点赞评论
     * @param _postId 帖子ID
     * @param _commentId 评论ID
     */
    function likeComment(uint256 _postId, uint256 _commentId) external nonReentrant {
        require(!commentLikes[_commentId][msg.sender], "Already liked");
        require(_commentId <= _commentIds.current() && _commentId > 0, "Invalid comment ID");

        commentLikes[_commentId][msg.sender] = true;
        
        Comment[] storage comments = postComments[_postId];
        for(uint i = 0; i < comments.length; i++) {
            if(comments[i].id == _commentId) {
                comments[i].likes++;
                // 更新评论作者声誉值
                updateReputation(comments[i].author, 1);
                break;
            }
        }
        
        emit CommentLiked(_commentId, msg.sender);
    }

    /**
     * @dev 批准纠错提案
     * @param _postId 帖子ID
     */
    function approveCorrectionProposal(uint256 _postId) external onlyOwner nonReentrant {
        require(posts[_postId].isCorrection, "Not a correction proposal");
        require(!posts[_postId].isCorrectionApproved, "Already approved");

        posts[_postId].isCorrectionApproved = true;
        address author = posts[_postId].author;
        
        userInfo[author].successfulCorrections++;
        userInfo[author].totalCorrections++;
        
        // 更新声誉值
        updateReputation(author, 10);
        
        // 发放奖励
        token.rewardCorrection(author);
        
        emit CorrectionApproved(_postId, author);
    }

    /**
     * @dev 设置用户验证状态
     * @param _user 用户地址
     * @param _verified 验证状态
     */
    function setUserVerification(address _user, bool _verified) external onlyOwner {
        userInfo[_user].isVerified = _verified;
        emit UserVerified(_user, _verified);
    }

    /**
     * @dev 更新用户声誉值
     * @param _user 用户地址
     * @param _points 声誉点数
     */
    function updateReputation(address _user, uint256 _points) internal {
        UserInfo storage user = userInfo[_user];
        
        // 每天最多获得 100 点声誉值
        if (block.timestamp >= user.lastReputationUpdate + 24 hours) {
            user.reputation += _points * REPUTATION_MULTIPLIER;
            user.lastReputationUpdate = block.timestamp;
            emit ReputationUpdated(_user, user.reputation);
        }
    }

    /**
     * @dev 增加帖子浏览量
     * @param _postId 帖子ID
     */
    function incrementViews(uint256 _postId) external {
        require(_postId <= _postIds.current() && _postId > 0, "Invalid post ID");
        posts[_postId].views++;
    }

    /**
     * @dev 设置帖子置顶状态
     * @param _postId 帖子ID
     * @param _isPinned 置顶状态
     */
    function setPinned(uint256 _postId, bool _isPinned) external onlyOwner {
        require(_postId <= _postIds.current() && _postId > 0, "Invalid post ID");
        posts[_postId].isPinned = _isPinned;
    }

    /**
     * @dev 获取用户成功率
     * @param _user 用户地址
     * @return 成功率（百分比）
     */
    function getUserSuccessRate(address _user) external view returns (uint256) {
        if(userInfo[_user].totalCorrections == 0) return 0;
        return (userInfo[_user].successfulCorrections * 100) / userInfo[_user].totalCorrections;
    }

    /**
     * @dev 获取帖子评论
     * @param _postId 帖子ID
     * @return 评论数组
     */
    function getPostComments(uint256 _postId) external view returns (Comment[] memory) {
        return postComments[_postId];
    }

    /**
     * @dev 获取用户发布的所有帖子
     * @param _user 用户地址
     * @return 帖子ID数组
     */
    function getUserPosts(address _user) external view returns (uint256[] memory) {
        return userPosts[_user];
    }

    /**
     * @dev 获取用户在特定帖子下的所有评论
     * @param _user 用户地址
     * @param _postId 帖子ID
     * @return 评论ID数组
     */
    function getUserComments(address _user, uint256 _postId) external view returns (uint256[] memory) {
        return userComments[_user][_postId];
    }
}
