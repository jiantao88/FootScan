'use client';
import { useActiveAccount } from "thirdweb/react";
import Link from 'next/link';
import { FaSearch, FaShieldAlt, FaUsers, FaChartBar, FaStar, FaClock } from 'react-icons/fa';

export default function Home() {
  const account = useActiveAccount();

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-orange-50">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-rose-100 opacity-50"></div>
        <div className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                <h1 className="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">食品安全</span>
                  <span className="block text-orange-500">从配料表开始</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  使用 AI + Web3 技术，智能分析食品配料表，确保食品安全。
                  社区共建，让每一份食品都透明可信。
                </p>
                <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left">
                  <Link href="/upload">
                    <button className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-orange-500 to-rose-500 hover:opacity-90">
                      开始分析
                    </button>
                  </Link>
                </div>
              </div>
              <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                  <img
                    className="w-full rounded-lg"
                    src="/images/hero-food-safety.jpg"
                    alt="Food Safety"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-orange-50 p-6 rounded-xl">
              <div className="text-orange-500 mb-4">
                <FaSearch className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">智能识别</h3>
              <p className="text-gray-600">
                自动识别配料表图片，快速提取文字信息
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-orange-50 p-6 rounded-xl">
              <div className="text-orange-500 mb-4">
                <FaShieldAlt className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">安全分析</h3>
              <p className="text-gray-600">
                AI 分析配料成分，评估潜在风险
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-orange-50 p-6 rounded-xl">
              <div className="text-orange-500 mb-4">
                <FaUsers className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">社区共治</h3>
              <p className="text-gray-600">
                用户参与评价，共同维护食品安全
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-orange-50 p-6 rounded-xl">
              <div className="text-orange-500 mb-4">
                <FaChartBar className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">数据透明</h3>
              <p className="text-gray-600">
                分析结果上链存证，确保数据可信
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Analysis Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">热门分析</h2>
            <p className="mt-4 text-xl text-gray-600">
              发现社区最新分析的食品配料，获取安全评估报告
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Analysis Card 1 */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <img
                src="/images/food-1.jpg"
                alt="Food 1"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">某品牌饼干</h3>
                  <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">安全</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span>4.8</span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="text-gray-400 mr-1" />
                    <span>2小时前</span>
                  </div>
                  <div className="flex items-center">
                    <FaUsers className="text-gray-400 mr-1" />
                    <span>15次验证</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">主要成分：面粉、糖、植物油...</p>
                <Link href="/analysis/1">
                  <button className="w-full px-4 py-2 bg-orange-50 text-orange-500 rounded-lg hover:bg-orange-100 transition-colors">
                    查看详情
                  </button>
                </Link>
              </div>
            </div>

            {/* Analysis Card 2 */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <img
                src="/images/food-2.jpg"
                alt="Food 2"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">某品牌饮料</h3>
                  <span className="bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full">需注意</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span>4.5</span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="text-gray-400 mr-1" />
                    <span>3小时前</span>
                  </div>
                  <div className="flex items-center">
                    <FaUsers className="text-gray-400 mr-1" />
                    <span>12次验证</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">主要成分：水、糖、果汁、防腐剂...</p>
                <Link href="/analysis/2">
                  <button className="w-full px-4 py-2 bg-orange-50 text-orange-500 rounded-lg hover:bg-orange-100 transition-colors">
                    查看详情
                  </button>
                </Link>
              </div>
            </div>

            {/* Analysis Card 3 */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <img
                src="/images/food-3.jpg"
                alt="Food 3"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">某品牌零食</h3>
                  <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">安全</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span>4.7</span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="text-gray-400 mr-1" />
                    <span>4小时前</span>
                  </div>
                  <div className="flex items-center">
                    <FaUsers className="text-gray-400 mr-1" />
                    <span>18次验证</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">主要成分：玉米、植物油、调味料...</p>
                <Link href="/analysis/3">
                  <button className="w-full px-4 py-2 bg-orange-50 text-orange-500 rounded-lg hover:bg-orange-100 transition-colors">
                    查看详情
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/explore">
              <button className="px-8 py-3 bg-white text-orange-500 border border-orange-500 rounded-full hover:bg-orange-50 transition-colors">
                查看更多分析
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-orange-400 to-rose-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            加入我们，共建食品安全社区
          </h2>
          <Link href="/upload">
            <button className="bg-white text-orange-500 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 transition-colors">
              开始分析
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
