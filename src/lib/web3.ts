import { getContract } from "thirdweb";
import { client } from "@/app/client";
import { chain } from "@/app/constants/chains";

// 合约地址（部署后需要更新）
export const FOODSCAN_TOKEN = "YOUR_TOKEN_CONTRACT_ADDRESS";
export const FOODSCAN_COMMUNITY = "YOUR_COMMUNITY_CONTRACT_ADDRESS";

// 获取代币合约实例
export function getTokenContract() {
  return getContract({
    client,
    chain,
    address: FOODSCAN_TOKEN,
  });
}

// 获取社区合约实例
export function getCommunityContract() {
  return getContract({
    client,
    chain,
    address: FOODSCAN_COMMUNITY,
  });
}

// 格式化代币数量（从 wei 转换为标准单位）
export function formatTokenAmount(amount: bigint): string {
  return (Number(amount) / 1e18).toFixed(2);
}

// 获取用户声誉信息
export async function getUserReputation(address: string) {
  const contract = getCommunityContract();
  const userInfo = await contract.read("userInfo", [address]);
  const successRate = await contract.read("getUserSuccessRate", [address]);
  
  return {
    successfulCorrections: Number(userInfo.successfulCorrections),
    totalCorrections: Number(userInfo.totalCorrections),
    isVerified: userInfo.isVerified,
    reputation: Number(userInfo.reputation),
    successRate: Number(successRate),
  };
}

// 获取用户代币余额
export async function getUserTokenBalance(address: string) {
  const contract = getTokenContract();
  const balance = await contract.read("balanceOf", [address]);
  return formatTokenAmount(balance);
}

// 每日签到
export async function checkIn() {
  const contract = getTokenContract();
  return await contract.write.checkIn();
}

// 创建帖子
export async function createPost(
  title: string,
  content: string,
  category: string,
  isCorrection: boolean
) {
  const contract = getCommunityContract();
  return await contract.write.createPost([title, content, category, isCorrection]);
}

// 添加评论
export async function addComment(postId: number, content: string) {
  const contract = getCommunityContract();
  return await contract.write.addComment([postId, content]);
}

// 点赞帖子
export async function likePost(postId: number) {
  const contract = getCommunityContract();
  return await contract.write.likePost([postId]);
}

// 点赞评论
export async function likeComment(postId: number, commentId: number) {
  const contract = getCommunityContract();
  return await contract.write.likeComment([postId, commentId]);
}

// 获取帖子详情
export async function getPost(postId: number) {
  const contract = getCommunityContract();
  const post = await contract.read("posts", [postId]);
  return {
    id: Number(post.id),
    author: post.author,
    title: post.title,
    content: post.content,
    category: post.category,
    timestamp: Number(post.timestamp),
    isPinned: post.isPinned,
    views: Number(post.views),
    likes: Number(post.likes),
    isCorrection: post.isCorrection,
    isCorrectionApproved: post.isCorrectionApproved,
  };
}

// 获取帖子评论
export async function getPostComments(postId: number) {
  const contract = getCommunityContract();
  const comments = await contract.read("getPostComments", [postId]);
  return comments.map((comment: any) => ({
    id: Number(comment.id),
    postId: Number(comment.postId),
    author: comment.author,
    content: comment.content,
    timestamp: Number(comment.timestamp),
    likes: Number(comment.likes),
  }));
}

// 增加帖子浏览量
export async function incrementPostViews(postId: number) {
  const contract = getCommunityContract();
  return await contract.write.incrementViews([postId]);
}
