'use client';

import { useState, useEffect } from 'react';
import { FaRegCommentDots, FaEye, FaTrophy, FaCheckCircle, FaRegLightbulb } from 'react-icons/fa';
import { ConnectButton, useActiveAccount } from 'thirdweb/react';
import { client } from '../client';
import { createPost, getUserReputation, getUserTokenBalance, getPost } from '@/lib/web3';
import Link from 'next/link';

// 分类
const categories = [
  { id: 'all', name: '全部' },
  { id: 'correction', name: '纠错与验证' },
  { id: 'education', name: '食品安全科普' },
  { id: 'recommendation', name: '产品推荐/避坑' }
];

export default function CommunityPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'correction',
    isCorrection: false
  });
  
  const account = useActiveAccount();

  // 加载帖子数据
  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      try {
        // TODO: 实现分页加载
        const postIds = Array.from({ length: 10 }, (_, i) => i + 1);
        const postsData = await Promise.all(
          postIds.map(async (id) => {
            const post = await getPost(id);
            if (!post.id) return null;
            
            // 获取作者信息
            const reputation = await getUserReputation(post.author);
            const tokens = await getUserTokenBalance(post.author);
            
            return {
              ...post,
              author: {
                address: post.author,
                reputation: reputation.reputation,
                tokens,
                successRate: `${reputation.successRate}%`,
                verified: reputation.isVerified
              }
            };
          })
        );
        
        setPosts(postsData.filter(Boolean));
      } catch (error) {
        console.error('Failed to load posts:', error);
      }
      setIsLoading(false);
    };

    loadPosts();
  }, []);

  // 创建新帖子
  const handleCreatePost = async () => {
    if (!account) return;
    
    try {
      await createPost(
        newPost.title,
        newPost.content,
        newPost.category,
        newPost.isCorrection
      );
      
      setShowNewPostModal(false);
      // 重新加载帖子列表
      window.location.reload();
    } catch (error) {
      console.error('Failed to create post:', error);
      alert('创建帖子失败，请重试');
    }
  };

  const PostCard = ({ post }: { post: any }) => (
    <Link href={`/community/${post.id}`}>
      <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
        {post.isPinned && (
          <div className="text-orange-500 text-sm mb-2 flex items-center">
            <FaTrophy className="mr-1" /> 置顶
          </div>
        )}
        <h3 className="text-lg font-semibold mb-2 hover:text-orange-500">
          {post.title}
        </h3>
        <div className="flex items-center justify-between text-sm text-gray-500">
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
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <FaEye className="mr-1" /> {post.views}
            </span>
            <span className="flex items-center">
              <FaRegCommentDots className="mr-1" /> {post.comments?.length || 0}
            </span>
            <span>
              {new Date(post.timestamp * 1000).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 顶部操作栏 */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-orange-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          {account ? (
            <button
              onClick={() => setShowNewPostModal(true)}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center"
            >
              <FaRegLightbulb className="mr-2" /> 发布新帖子
            </button>
          ) : (
            <ConnectButton client={client} />
          )}
        </div>

        {/* 帖子列表 */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8">加载中...</div>
          ) : posts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">暂无帖子</div>
          ) : (
            posts
              .filter(
                (post) =>
                  activeCategory === 'all' || post.category === activeCategory
              )
              .map((post) => <PostCard key={post.id} post={post} />)
          )}
        </div>
      </div>

      {/* 新帖子模态框 */}
      {showNewPostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">发布新帖子</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  选择分类
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={newPost.category}
                  onChange={(e) =>
                    setNewPost({
                      ...newPost,
                      category: e.target.value,
                      isCorrection: e.target.value === 'correction'
                    })
                  }
                >
                  {categories.slice(1).map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  标题
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="请输入帖子标题"
                  value={newPost.title}
                  onChange={(e) =>
                    setNewPost({ ...newPost, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  内容
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg p-2 h-40"
                  placeholder="请输入帖子内容（支持 Markdown 格式）"
                  value={newPost.content}
                  onChange={(e) =>
                    setNewPost({ ...newPost, content: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowNewPostModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  取消
                </button>
                <button
                  onClick={handleCreatePost}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                  发布
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
