'use client';

import { useState } from 'react';
import { FaRegCommentDots, FaHeart, FaTrophy, FaCheckCircle, FaRegLightbulb, FaTag } from 'react-icons/fa';
import { ConnectButton } from 'thirdweb/react';
import Link from 'next/link';
import { mockPosts, Post } from '@/mock/communityData';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

// 分类
const categories = [
  { id: 'all', name: 'all' },
  { id: 'correction', name: 'correction' },
  { id: 'education', name: 'education' },
  { id: 'recommendation', name: 'recommendation' }
];

export default function CommunityPage() {
  const { t } = useTranslation();
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
      alert(t('community.post.create.validation'));
      return;
    }
    
    try {
      // TODO: 实现创建帖子的功能
      setShowNewPostModal(false);
      alert(t('community.post.create.success'));
    } catch (error) {
      console.error('Failed to create post:', error);
      alert(t('community.post.create.error'));
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
                {new Date(post.createdAt).toLocaleDateString()}
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
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 顶部操作栏 */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeCategory === category.id
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-orange-50'
                }`}
              >
                {t(`community.categories.${category.name}`)}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowNewPostModal(true)}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            {t('community.post.actions.new_post')}
          </button>
        </div>

        {/* 帖子列表 */}
        <div className="space-y-6">
          {mockPosts
            .filter(post => activeCategory === 'all' || post.category === activeCategory)
            .map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
        </div>
      </div>

      {/* 新建帖子模态框 */}
      {showNewPostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">{t('community.post.create.title')}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">{t('community.post.create.form.title')}</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder={t('community.post.create.form.title_placeholder')}
                  className="w-full px-4 py-2 rounded border focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">{t('community.post.create.form.content')}</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder={t('community.post.create.form.content_placeholder')}
                  rows={6}
                  className="w-full px-4 py-2 rounded border focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">{t('community.post.create.form.category')}</label>
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                  className="w-full px-4 py-2 rounded border focus:ring-2 focus:ring-orange-500 focus:outline-none"
                >
                  {categories.slice(1).map((category) => (
                    <option key={category.id} value={category.id}>
                      {t(`community.categories.${category.name}`)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={newPost.isCorrection}
                  onChange={(e) => setNewPost({ ...newPost, isCorrection: e.target.checked })}
                  className="mr-2"
                />
                <label>{t('community.post.create.form.is_correction')}</label>
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowNewPostModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                {t('community.post.create.form.cancel')}
              </button>
              <button
                onClick={handleCreatePost}
                className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                {t('community.post.create.form.submit')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
