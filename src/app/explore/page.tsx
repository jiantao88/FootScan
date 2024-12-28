'use client';

import { useState, useEffect } from 'react';
import { mockFeaturedRecipes } from '@/mock/exploreData';
import RecipeCard from '@/components/explore/RecipeCard';
import { useActiveAccount, useActiveWallet } from 'thirdweb/react';
import { claimTokens, getTokenBalance, canClaimTokens } from '@/lib/tokenUtils';
import { toast } from 'react-hot-toast';
import { ethers } from 'ethers';
import { useTranslation } from 'react-i18next';

const categories = ['all', 'beverages', 'snacks', 'instant_food', 'frozen_food', 'dairy'];

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [tokenBalance, setTokenBalance] = useState('0');
  const [canClaim, setCanClaim] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

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
      toast.error(t('explore.token.claim.connect_first'));
      return;
    }

    setIsLoading(true);
    try {
      const signer = await wallet.getSigner();
      const success = await claimTokens(signer);
      if (success) {
        toast.success(t('explore.token.claim.success'));
        // 更新余额和领取状态
        const balance = await getTokenBalance(account);
        setTokenBalance(ethers.formatEther(balance));
        setCanClaim(false);
      } else {
        toast.error(t('explore.token.claim.error'));
      }
    } catch (error) {
      console.error('领取代币失败:', error);
      toast.error(t('explore.token.claim.error'));
    } finally {
      setIsLoading(false);
    }
  };

  const filteredRecipes = mockFeaturedRecipes.filter(recipe => {
    const matchesCategory = activeCategory === 'all' || recipe.category === activeCategory;
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
              <h2 className="text-2xl font-bold mb-2">{t('explore.token.title')}</h2>
              <p className="text-white/80">
                {account 
                  ? t('explore.token.balance', { amount: tokenBalance })
                  : t('explore.token.connect_wallet')}
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
                {isLoading 
                  ? t('explore.token.claim.loading')
                  : canClaim 
                    ? t('explore.token.claim.button')
                    : t('explore.token.claim.claimed')}
              </button>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border-4 border-white/20 bg-white/10">
                <span className="text-3xl font-bold">FST</span>
              </div>
              <p className="mt-2 text-white/80">Food Scan Token</p>
            </div>
          </div>
        </div>

        {/* 分类和搜索 */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 mb-4">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full ${
                  activeCategory === category
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-orange-50'
                }`}
              >
                {t(`explore.categories.${category}`)}
              </button>
            ))}
          </div>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('explore.search.placeholder')}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* 食品列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))}
          {filteredRecipes.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">
              {t('explore.search.no_results')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
