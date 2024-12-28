'use client';
import { useActiveAccount } from "thirdweb/react";
import Link from 'next/link';
import { FaSearch, FaShieldAlt, FaUsers, FaChartBar, FaStar, FaClock } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export default function Home() {
  const account = useActiveAccount();
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t('home.title');
  }, [t]);

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
                  <span className="block">{t('hero.title')}</span>
                  <span className="block text-orange-500">{t('hero.subtitle')}</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  {t('hero.description')}
                </p>
                <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left">
                  <Link href="/upload">
                    <button className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-orange-500 to-rose-500 hover:opacity-90">
                      {t('hero.start_button')}
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
              <h3 className="text-lg font-semibold mb-2">{t('features.items.ai_analysis.title')}</h3>
              <p className="text-gray-600">
                {t('features.items.ai_analysis.description')}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-orange-50 p-6 rounded-xl">
              <div className="text-orange-500 mb-4">
                <FaShieldAlt className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{t('features.items.blockchain.title')}</h3>
              <p className="text-gray-600">
                {t('features.items.blockchain.description')}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-orange-50 p-6 rounded-xl">
              <div className="text-orange-500 mb-4">
                <FaUsers className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{t('features.items.community.title')}</h3>
              <p className="text-gray-600">
                {t('features.items.community.description')}
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-orange-50 p-6 rounded-xl">
              <div className="text-orange-500 mb-4">
                <FaChartBar className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{t('features.items.realtime.title')}</h3>
              <p className="text-gray-600">
                {t('features.items.realtime.description')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Analysis Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">{t('analysis.title')}</h2>
            <p className="mt-4 text-xl text-gray-600">
              {t('analysis.description')}
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
                  <h3 className="text-lg font-semibold">{t('analysis.cards.card1.title')}</h3>
                  <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">{t('analysis.status.safe')}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span>4.8</span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="text-gray-400 mr-1" />
                    <span>{t('analysis.time.hours_ago', { hours: 2 })}</span>
                  </div>
                  <div className="flex items-center">
                    <FaUsers className="text-gray-400 mr-1" />
                    <span>{t('analysis.verifications', { count: 15 })}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">{t('analysis.cards.card1.ingredients')}</p>
                <Link href="/analysis/1">
                  <button className="w-full px-4 py-2 bg-orange-50 text-orange-500 rounded-lg hover:bg-orange-100 transition-colors">
                    {t('analysis.view_details')}
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
                  <h3 className="text-lg font-semibold">{t('analysis.cards.card2.title')}</h3>
                  <span className="bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full">{t('analysis.status.warning')}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span>4.5</span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="text-gray-400 mr-1" />
                    <span>{t('analysis.time.hours_ago', { hours: 3 })}</span>
                  </div>
                  <div className="flex items-center">
                    <FaUsers className="text-gray-400 mr-1" />
                    <span>{t('analysis.verifications', { count: 12 })}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">{t('analysis.cards.card2.ingredients')}</p>
                <Link href="/analysis/2">
                  <button className="w-full px-4 py-2 bg-orange-50 text-orange-500 rounded-lg hover:bg-orange-100 transition-colors">
                    {t('analysis.view_details')}
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
                  <h3 className="text-lg font-semibold">{t('analysis.cards.card3.title')}</h3>
                  <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">{t('analysis.status.safe')}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span>4.7</span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="text-gray-400 mr-1" />
                    <span>{t('analysis.time.hours_ago', { hours: 4 })}</span>
                  </div>
                  <div className="flex items-center">
                    <FaUsers className="text-gray-400 mr-1" />
                    <span>{t('analysis.verifications', { count: 10 })}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">{t('analysis.cards.card3.ingredients')}</p>
                <Link href="/analysis/3">
                  <button className="w-full px-4 py-2 bg-orange-50 text-orange-500 rounded-lg hover:bg-orange-100 transition-colors">
                    {t('analysis.view_details')}
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/explore">
              <button className="px-8 py-3 bg-white text-orange-500 border border-orange-500 rounded-full hover:bg-orange-50 transition-colors">
                {t('analysis.view_more')}
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-orange-400 to-rose-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            {t('cta.title')}
          </h2>
          <Link href="/upload">
            <button className="bg-white text-orange-500 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 transition-colors">
              {t('cta.start_button')}
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
