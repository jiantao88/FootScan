'use client';

import { useState, useEffect } from 'react';
import { FaRegThumbsUp, FaCheckCircle } from 'react-icons/fa';
import { ConnectButton, useActiveAccount } from 'thirdweb/react';
import { client } from '../../client';
import {
  getPost,
  getPostComments,
  addComment,
  likePost,
  likeComment,
  getUserReputation,
  getUserTokenBalance,
  incrementPostViews
} from '@/lib/web3';
import ReactMarkdown from 'react-markdown';

export default function PostDetailPage({
  params
}: {
  params: { postId: string };
}) {
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  const account = useActiveAccount();
  const postId = parseInt(params.postId);

  // 加载帖子和评论数据
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // 增加浏览量
        await incrementPostViews(postId);
        
        // 获取帖子数据
        const postData = await getPost(postId);
        if (!postData.id) {
          throw new Error('Post not found');
        }
        
        // 获取作者信息
        const reputation = await getUserReputation(postData.author);
        const tokens = await getUserTokenBalance(postData.author);
        
        setPost({
          ...postData,
          author: {
            address: postData.author,
            reputation: reputation.reputation,
            tokens,
            successRate: `${reputation.successRate}%`,
            verified: reputation.isVerified
          }
        });
        
        // 获取评论数据
        const commentsData = await getPostComments(postId);
        const commentsWithAuthorInfo = await Promise.all(
          commentsData.map(async (comment: any) => {
            const authorReputation = await getUserReputation(comment.author);
            const authorTokens = await getUserTokenBalance(comment.author);
            
            return {
              ...comment,
              author: {
                address: comment.author,
                reputation: authorReputation.reputation,
                tokens: authorTokens,
                successRate: `${authorReputation.successRate}%`,
                verified: authorReputation.isVerified
              }
            };
          })
        );
        
        setComments(commentsWithAuthorInfo);
      } catch (error) {
        console.error('Failed to load post data:', error);
      }
      setIsLoading(false);
    };

    loadData();
  }, [postId]);

  // 发表评论
  const handleComment = async () => {
    if (!account || !newComment.trim()) return;
    
    try {
      await addComment(postId, newComment);
      setNewComment('');
      // 重新加载评论
      window.location.reload();
    } catch (error) {
      console.error('Failed to add comment:', error);
      alert('发表评论失败，请重试');
    }
  };

  // 点赞帖子
  const handleLikePost = async () => {
    if (!account) return;
    
    try {
      await likePost(postId);
      // 重新加载帖子数据
      window.location.reload();
    } catch (error) {
      console.error('Failed to like post:', error);
      alert('点赞失败，请重试');
    }
  };

  // 点赞评论
  const handleLikeComment = async (commentId: number) => {
    if (!account) return;
    
    try {
      await likeComment(postId, commentId);
      // 重新加载评论数据
      window.location.reload();
    } catch (error) {
      console.error('Failed to like comment:', error);
      alert('点赞失败，请重试');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-8">加载中...</div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-24 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-8">帖子不存在</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 帖子内容 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <span className="font-medium text-gray-700">
                  {post.author.address.slice(0, 6)}...{post.author.address.slice(-4)}
                </span>
                {post.author.verified && (
                  <FaCheckCircle className="ml-1 text-blue-500" />
                )}
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full text-xs">
                  {post.author.tokens} FST
                </div>
                <div className="bg-green-100 text-green-600 px-2 py-0.5 rounded-full text-xs">
                  成功率 {post.author.successRate}
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {new Date(post.timestamp * 1000).toLocaleString()}
            </div>
          </div>
          <div className="prose max-w-none mb-6">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLikePost}
                className="flex items-center space-x-1 hover:text-orange-500"
              >
                <FaRegThumbsUp />
                <span>{post.likes}</span>
              </button>
            </div>
            <div>{post.views} 次浏览</div>
          </div>
        </div>

        {/* 评论区 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold mb-4">评论 ({comments.length})</h2>
          
          {/* 评论输入框 */}
          {account ? (
            <div className="mb-6">
              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 mb-2"
                placeholder="写下你的评论..."
                rows={3}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                onClick={handleComment}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
              >
                发表评论
              </button>
            </div>
          ) : (
            <div className="mb-6 text-center">
              <ConnectButton client={client} />
              <p className="mt-2 text-sm text-gray-500">连接钱包后即可评论</p>
            </div>
          )}

          {/* 评论列表 */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="border-b border-gray-100 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-700">
                        {comment.author.address.slice(0, 6)}...
                        {comment.author.address.slice(-4)}
                      </span>
                      {comment.author.verified && (
                        <FaCheckCircle className="ml-1 text-blue-500" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full text-xs">
                        {comment.author.tokens} FST
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(comment.timestamp * 1000).toLocaleString()}
                  </div>
                </div>
                <div className="text-gray-700 mb-2">{comment.content}</div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <button
                    onClick={() => handleLikeComment(comment.id)}
                    className="flex items-center space-x-1 hover:text-orange-500"
                  >
                    <FaRegThumbsUp />
                    <span>{comment.likes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
