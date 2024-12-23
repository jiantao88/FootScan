'use client';

import { useState } from 'react';
import { mockFeaturedRecipes } from '@/mock/exploreData';
import RecipeCard from '@/components/explore/RecipeCard';

const categories = ['全部', '饮料', '零食', '方便食品', '速冻食品', '乳制品'];

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecipes = mockFeaturedRecipes.filter(recipe => {
    const matchesCategory = activeCategory === '全部' || recipe.category === activeCategory;
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 每日奖励卡片 */}
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl p-6 mb-8 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">每日奖励</h2>
              <p className="text-white/80">领取每日代币，保持连续签到！</p>
              <button className="mt-4 bg-white text-orange-500 px-6 py-2 rounded-lg font-medium hover:bg-orange-50 transition-colors">
                领取 100 代币
              </button>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border-4 border-white/20 bg-white/10">
                <span className="text-3xl font-bold">75%</span>
              </div>
              <p className="mt-2 text-white/80">今日进度</p>
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2 text-sm">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z"/>
              </svg>
              连续签到 5 天
            </span>
          </div>
        </div>

        {/* 搜索栏 */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="搜索食品..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-10 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <svg
            className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* 分类标签 */}
        <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
                ${
                  activeCategory === category
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 食品卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
}
