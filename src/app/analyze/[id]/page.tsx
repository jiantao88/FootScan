'use client';

import { useParams } from 'next/navigation';
import { mockFeaturedRecipes } from '@/mock/exploreData';
import AnalyzeSection from '@/components/AnalyzeSection';
import Image from 'next/image';
import { FaStar, FaHeart, FaClock, FaCheckCircle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

export default function AnalyzePage() {
  const { t } = useTranslation();
  const params = useParams();
  const recipe = mockFeaturedRecipes.find(r => r.id === params.id);

  if (!recipe) {
    return <div>{t('analyze.not_found')}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 食品信息卡片 */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="md:flex">
            {/* 图片 */}
            <div className="md:flex-shrink-0">
              <div className="relative h-64 md:h-full md:w-96">
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* 详细信息 */}
            <div className="p-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">{recipe.title}</h2>
                {recipe.verified && (
                  <span className="flex items-center text-green-500">
                    <FaCheckCircle className="mr-1" />
                    {t('analyze.verified')} {t('analyze.verifications', { count: recipe.verificationCount })}
                  </span>
                )}
              </div>

              {/* 作者信息 */}
              <div className="mt-4 flex items-center">
                <div className="relative w-10 h-10">
                  <Image
                    src={recipe.author.avatar}
                    alt={recipe.author.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{recipe.author.name}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <FaStar className="text-yellow-400 mr-1" />
                    {recipe.rating}
                    <FaHeart className="ml-4 mr-1 text-red-400" />
                    {recipe.likes}
                    <FaClock className="ml-4 mr-1" />
                    {recipe.analysisTime}
                  </div>
                </div>
              </div>

              {/* 标签 */}
              <div className="mt-4 flex flex-wrap gap-2">
                {recipe.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm font-medium bg-orange-50 text-orange-600 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* 配料表 */}
              {recipe.ingredients && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">{t('analyze.ingredients.title')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {recipe.ingredients.map((ingredient, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 营养成分 */}
              {recipe.nutritionFacts ? (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">{t('analyze.nutrition.title')}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">{t('analyze.nutrition.serving_size')}</p>
                      <p className="font-medium">{recipe.nutritionFacts.servingSize}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{t('analyze.nutrition.calories')}</p>
                      <p className="font-medium">{recipe.nutritionFacts.calories}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{t('analyze.nutrition.protein')}</p>
                      <p className="font-medium">{recipe.nutritionFacts.protein}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{t('analyze.nutrition.fat')}</p>
                      <p className="font-medium">{recipe.nutritionFacts.fat}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{t('analyze.nutrition.carbs')}</p>
                      <p className="font-medium">{recipe.nutritionFacts.carbs}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{t('analyze.nutrition.sodium')}</p>
                      <p className="font-medium">{recipe.nutritionFacts.sodium}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-6 text-gray-500">
                  {t('analyze.nutrition.not_available')}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 分析结果 */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h3 className="text-xl font-bold mb-6">{t('analyze.analysis.title')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 安全评分 */}
            <div>
              <h4 className="text-lg font-semibold mb-2">{t('analyze.analysis.safety_score')}</h4>
              <div className="flex items-center">
                <div className="text-4xl font-bold text-green-500">{recipe.safetyScore}</div>
                <div className="ml-2 text-sm text-gray-500">/100</div>
              </div>
            </div>

            {/* 风险等级 */}
            <div>
              <h4 className="text-lg font-semibold mb-2">{t('analyze.analysis.risk_level.title')}</h4>
              <div className="flex items-center">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  recipe.riskLevel === 'low' 
                    ? 'bg-green-100 text-green-600'
                    : recipe.riskLevel === 'medium'
                    ? 'bg-yellow-100 text-yellow-600'
                    : 'bg-red-100 text-red-600'
                }`}>
                  {t(`analyze.analysis.risk_level.${recipe.riskLevel}`)}
                </span>
              </div>
            </div>

            {/* 警告提示 */}
            <div>
              <h4 className="text-lg font-semibold mb-2">{t('analyze.analysis.warnings.title')}</h4>
              {recipe.warnings && recipe.warnings.length > 0 ? (
                <ul className="space-y-2">
                  {recipe.warnings.map((warning, index) => (
                    <li key={index} className="flex items-center text-red-500">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      {warning}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-green-500">{t('analyze.analysis.warnings.none')}</p>
              )}
            </div>
          </div>
        </div>

        {/* 社区反馈 */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h3 className="text-xl font-bold mb-6">{t('analyze.community.title')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('analyze.community.verified_count')}</h4>
              <div className="flex items-center space-x-4">
                <div className="text-4xl font-bold text-orange-500">{recipe.verificationCount}</div>
                <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                  {t('analyze.actions.verify')}
                </button>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">{t('analyze.community.comments')}</h4>
              {recipe.comments && recipe.comments.length > 0 ? (
                <div className="space-y-4">
                  {recipe.comments.map((comment, index) => (
                    <div key={index} className="border-b pb-4">
                      <div className="flex items-center mb-2">
                        <Image
                          src={comment.author.avatar}
                          alt={comment.author.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <span className="ml-2 font-medium">{comment.author.name}</span>
                      </div>
                      <p className="text-gray-600">{comment.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">{t('analyze.community.no_comments')}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
