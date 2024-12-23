'use client';

import { useParams } from 'next/navigation';
import { mockFeaturedRecipes } from '@/mock/exploreData';
import AnalyzeSection from '@/components/AnalyzeSection';
import Image from 'next/image';
import { FaStar, FaHeart, FaClock, FaCheckCircle } from 'react-icons/fa';

export default function AnalyzePage() {
  const params = useParams();
  const recipe = mockFeaturedRecipes.find(r => r.id === params.id);

  if (!recipe) {
    return <div>食品不存在</div>;
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
                    已验证 ({recipe.verificationCount})
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
                  <h3 className="text-lg font-semibold mb-2">配料表</h3>
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
              {recipe.nutritionFacts && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">营养成分</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="text-sm text-gray-500">热量</div>
                      <div className="font-semibold">{recipe.nutritionFacts.calories}kcal</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="text-sm text-gray-500">蛋白质</div>
                      <div className="font-semibold">{recipe.nutritionFacts.protein}g</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="text-sm text-gray-500">碳水</div>
                      <div className="font-semibold">{recipe.nutritionFacts.carbs}g</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="text-sm text-gray-500">脂肪</div>
                      <div className="font-semibold">{recipe.nutritionFacts.fat}g</div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="text-sm text-gray-500">钠</div>
                      <div className="font-semibold">{recipe.nutritionFacts.sodium}mg</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 分析部分 */}
        <AnalyzeSection productId={recipe.id} verified={recipe.verified} />
      </div>
    </div>
  );
}
