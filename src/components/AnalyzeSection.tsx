'use client';

import { useState } from 'react';
import { Tab } from '@headlessui/react';
import { FaChartBar, FaMicroscope, FaComments, FaStar, FaShieldAlt, FaExclamationTriangle, FaExclamationCircle } from 'react-icons/fa';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

interface AnalyzeSectionProps {
  productId: string;
  verified: boolean;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function AnalyzeSection({ productId, verified }: AnalyzeSectionProps) {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = [
    { name: t('scan.results.overview'), icon: FaChartBar },
    { name: t('scan.results.detailed'), icon: FaMicroscope },
    { name: t('scan.results.community'), icon: FaComments },
  ];

  const safetyStatus = {
    safe: {
      title: t('scan.results.safe'),
      description: t('scan.results.safe_desc'),
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      icon: FaShieldAlt
    },
    warning: {
      title: t('scan.results.warning'),
      description: t('scan.results.warning_desc'),
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
      icon: FaExclamationTriangle
    },
    danger: {
      title: t('scan.results.danger'),
      description: t('scan.results.danger_desc'),
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      icon: FaExclamationCircle
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List className="flex space-x-4 border-b border-gray-200">
          {tabs.map((tab, index) => (
            <Tab
              key={tab.name}
              className={({ selected }) =>
                classNames(
                  'flex items-center space-x-2 px-4 py-2 text-sm font-medium focus:outline-none',
                  selected
                    ? 'border-b-2 border-orange-500 text-orange-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                )
              }
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className="mt-6">
          {/* 概览面板 */}
          <Tab.Panel>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-orange-700 mb-2">{t('scan.results.nutrition_score')}</h3>
                  <div className="text-3xl font-bold text-orange-600">8.5</div>
                  <p className="text-sm text-orange-600 mt-2">{t('scan.results.nutrition_score_desc')}</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-700 mb-2">{t('scan.results.safety_index')}</h3>
                  <div className="text-3xl font-bold text-green-600">9.2</div>
                  <p className="text-sm text-green-600 mt-2">{t('scan.results.safety_index_desc')}</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-700 mb-2">{t('scan.results.community_rating')}</h3>
                  <div className="text-3xl font-bold text-blue-600">4.8</div>
                  <p className="text-sm text-blue-600 mt-2">{t('scan.results.community_rating_desc')}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('scan.results.main_findings')}</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-2 h-2 mt-2 bg-green-500 rounded-full"></span>
                    <span className="ml-3 text-gray-600">{t('scan.results.no_harmful_additives')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-2 h-2 mt-2 bg-yellow-500 rounded-full"></span>
                    <span className="ml-3 text-gray-600">{t('scan.results.high_sodium_content')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-2 h-2 mt-2 bg-blue-500 rounded-full"></span>
                    <span className="ml-3 text-gray-600">{t('scan.results.protein_content_meets_standards')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </Tab.Panel>

          {/* 详细分析面板 */}
          <Tab.Panel>
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold">{t('scan.results.nutrition_analysis')}</h3>
                </div>
                <div className="p-6 space-y-4">
                  {/* 营养成分分析图表或详细数据 */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">{t('scan.results.protein_content')}</span>
                      <div className="flex items-center">
                        <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500" style={{ width: '75%' }}></div>
                        </div>
                        <span className="ml-3 text-sm text-gray-600">75%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">{t('scan.results.fat_content')}</span>
                      <div className="flex items-center">
                        <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-500" style={{ width: '45%' }}></div>
                        </div>
                        <span className="ml-3 text-sm text-gray-600">45%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">{t('scan.results.carbohydrate_content')}</span>
                      <div className="flex items-center">
                        <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500" style={{ width: '60%' }}></div>
                        </div>
                        <span className="ml-3 text-sm text-gray-600">60%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold">{t('scan.results.additives_analysis')}</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">{t('scan.results.preservatives')}</h4>
                        <p className="text-sm text-gray-500">{t('scan.results.preservatives_desc')}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full mt-2"></span>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">{t('scan.results.colorants')}</h4>
                        <p className="text-sm text-gray-500">{t('scan.results.colorants_desc')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Tab.Panel>

          {/* 社区反馈面板 */}
          <Tab.Panel>
            <div className="space-y-6">
              {/* 评分统计 */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">{t('scan.results.community_rating')}</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center">
                      <span className="text-sm text-gray-600 w-8">{rating}星</span>
                      <div className="flex-1 mx-3">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400"
                            style={{
                              width: `${rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 7 : rating === 2 ? 2 : 1}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {rating === 5 ? '70%' : rating === 4 ? '20%' : rating === 3 ? '7%' : rating === 2 ? '2%' : '1%'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 用户评论 */}
              <div className="space-y-4">
                {[
                  {
                    user: '营养师小王',
                    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop',
                    rating: 5,
                    comment: t('scan.results.comment1'),
                    time: '2天前',
                  },
                  {
                    user: '食品检测员张三',
                    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
                    rating: 4,
                    comment: t('scan.results.comment2'),
                    time: '3天前',
                  },
                ].map((review, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="relative w-10 h-10">
                          <Image
                            src={review.avatar}
                            alt={review.user}
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-900">{review.user}</h4>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">{review.comment}</p>
                        <p className="mt-2 text-xs text-gray-500">{review.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {!verified && (
                <div className="flex justify-center">
                  <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                    {t('scan.results.participate_in_verification')}
                  </button>
                </div>
              )}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
