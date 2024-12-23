'use client';

import { useState, useEffect } from 'react';
import { mockFeaturedRecipes } from '@/mock/exploreData';
import RecipeCard from '@/components/explore/RecipeCard';
import { useActiveAccount, useActiveWallet } from 'thirdweb/react';
import { claimTokens, getTokenBalance, canClaimTokens } from '@/lib/tokenUtils';
import { toast } from 'react-hot-toast';
import { ethers } from 'ethers';

const categories = ['全部', '饮料', '零食', '方便食品', '速冻食品', '乳制品'];

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');
  const [tokenBalance, setTokenBalance] = useState('0');
  const [canClaim, setCanClaim] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const account = useActiveAccount();
  const wallet = useActiveWallet();

  useEffect(() => {
    const fetchTokenInfo = async () => {
      if (account) {
        const balance = await getTokenBalance(account);
        setTokenBalance(ethers.formatEther(balance));
        const claimStatus = await canClaimTokens(account);
        setCanClaim(claimStatus);
      }
    };

    fetchTokenInfo();
  }, [account]);

  const handleClaimTokens = async () => {
    if (!wallet) {
      toast.error('请先连接钱包');
      return;
    }

    setIsLoading(true);
    try {
      const signer = await wallet.getSigner();
      const success = await claimTokens(signer);
      if (success) {
        toast.success('成功领取 100 FST 代币！');
        // 更新余额和领取状态
        const balance = await getTokenBalance(account);
        setTokenBalance(ethers.formatEther(balance));
        setCanClaim(false);
      } else {
        toast.error('领取失败，请稍后重试');
      }
    } catch (error) {
      console.error('领取代币失败:', error);
      toast.error('领取失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

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
              <h2 className="text-2xl font-bold mb-2">代币奖励</h2>
              <p className="text-white/80">
                {account 
                  ? `当前余额: ${tokenBalance} FST`
                  : '连接钱包以查看余额'}
              </p>
              <button
                onClick={handleClaimTokens}
                disabled={!canClaim || isLoading || !account}
                className={`mt-4 px-6 py-2 rounded-lg font-medium transition-colors ${
                  canClaim && account
                    ? 'bg-white text-orange-500 hover:bg-orange-50'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isLoading ? '领取中...' : canClaim ? '领取 100 代币' : '已领取'}
              </button>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border-4 border-white/20 bg-white/10">
                <span className="text-3xl font-bold">FST</span>
              </div>
              <p className="mt-2 text-white/80">Food Scan Token</p>
            </div>
          </div>
          {account && (
            <div className="mt-4 flex items-center space-x-2 text-sm">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z"/>
                </svg>
                {canClaim ? '可领取代币' : '今日已领取'}
              </span>
            </div>
          )}
        </div>

        {/* 搜索栏 */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="搜索食品..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
        </div>

        {/* 分类标签 */}
        <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                activeCategory === category
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-orange-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 食品列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
}
