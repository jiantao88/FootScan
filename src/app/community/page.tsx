'use client';

import { useState } from 'react';
import { FaRegCommentDots, FaHeart, FaTrophy, FaCheckCircle, FaRegLightbulb, FaTag } from 'react-icons/fa';
import { ConnectButton } from 'thirdweb/react';
import Link from 'next/link';
import { mockPosts, Post } from '@/mock/communityData';
import Image from 'next/image';

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
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'correction',
    isCorrection: false
  });

  // 创建新帖子
  const handleCreatePost = async () => {
    if (!newPost.title || !newPost.content) {
      alert('请填写完整的帖子内容');
      return;
    }
    
    try {
      // TODO: 实现创建帖子的功能
      setShowNewPostModal(false);
      alert('帖子创建成功！');
    } catch (error) {
      console.error('Failed to create post:', error);
      alert('创建帖子失败，请重试');
    }
  };

  const PostCard = ({ post }: { post: Post }) => (
    <Link href={`/community/${post.id}`}>
      <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={48}
              height={48}
              className="rounded-full"
            />
          </div>
          <div className="flex-grow">
            <div className="flex items-center space-x-2 mb-2">
              <span className="font-semibold text-gray-800">{post.author.name}</span>
              <span className="text-gray-500 text-sm">
                {new Date(post.createdAt).toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900 hover:text-orange-500">
              {post.title}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
            {post.imageUrl && (
              <div className="mb-4">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  width={400}
                  height={300}
                  className="rounded-lg"
                />
              </div>
            )}
            <div className="flex items-center space-x-6 text-gray-500">
              <div className="flex items-center space-x-2">
                <FaHeart className="text-red-500" />
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaRegCommentDots className="text-blue-500" />
                <span>{post.comments.length}</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaTag className="text-green-500" />
                <div className="flex gap-2">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="text-sm bg-gray-100 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">社区讨论</h1>
          <div className="flex space-x-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm ${
                  activeCategory === category.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-4">
        <button
            onClick={() => setShowNewPostModal(true)}
            className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
          >
            发布帖子
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {mockPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* 新建帖子模态框 */}
      {showNewPostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-6">发布新帖子</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">标题</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={e => setNewPost({ ...newPost, title: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="请输入帖子标题"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">内容</label>
                <textarea
                  value={newPost.content}
                  onChange={e => setNewPost({ ...newPost, content: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2 h-40"
                  placeholder="请输入帖子内容"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">分类</label>
                <select
                  value={newPost.category}
                  onChange={e => setNewPost({ ...newPost, category: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={() => setShowNewPostModal(false)}
                className="px-6 py-2 border rounded-lg hover:bg-gray-100"
              >
                取消
              </button>
              <button
                onClick={handleCreatePost}
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                发布
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
