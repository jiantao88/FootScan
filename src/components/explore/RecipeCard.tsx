'use client';

import { Recipe } from '@/types/explore';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaHeart, FaClock, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* 图片容器 */}
      <div className="relative h-48 w-full group">
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
          <Link
            href={`/analyze/${recipe.id}`}
            className="opacity-0 group-hover:opacity-100 bg-orange-500 text-white px-4 py-2 rounded-lg transform translate-y-2 group-hover:translate-y-0 transition-all"
          >
            {recipe.verified ? '查看详情' : '参与分析'}
          </Link>
        </div>
        {/* 验证状态标签 */}
        <div className={`absolute top-2 right-2 px-3 py-1 rounded-full flex items-center gap-1 ${
          recipe.verified ? 'bg-green-500' : 'bg-orange-500'
        } text-white text-sm font-medium`}>
          {recipe.verified ? (
            <>
              <FaCheckCircle className="w-4 h-4" />
              <span>已验证</span>
              <span className="text-xs">({recipe.verificationCount})</span>
            </>
          ) : (
            <>
              <FaExclamationCircle className="w-4 h-4" />
              <span>待验证</span>
            </>
          )}
        </div>
      </div>

      {/* 内容区域 */}
      <div className="p-4">
        {/* 标题和作者 */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {recipe.title}
          </h3>
          <div className="flex items-center space-x-2">
            <div className="relative w-6 h-6">
              <Image
                src={recipe.author.avatar}
                alt={recipe.author.name}
                fill
                className="rounded-full object-cover"
                sizes="24px"
              />
            </div>
            <span className="text-sm text-gray-600">{recipe.author.name}</span>
          </div>
        </div>

        {/* 评分和统计 */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-yellow-400">
              <FaStar className="mr-1" />
              {recipe.rating}
            </span>
            <span className="flex items-center text-gray-500">
              <FaHeart className="mr-1" />
              {recipe.likes}
            </span>
          </div>
          <span className="flex items-center text-gray-500">
            <FaClock className="mr-1" />
            {recipe.analysisTime}
          </span>
        </div>

        {/* 标签 */}
        <div className="mt-3 flex flex-wrap gap-2">
          {recipe.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium bg-orange-50 text-orange-600 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
