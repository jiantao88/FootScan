'use client';
import { useState } from 'react';
import { AnalysisResult } from '@/types/analysis';
import { FaShieldAlt, FaExclamationTriangle, FaSkull, FaChartPie, FaCheckCircle, FaHistory, FaUsers } from 'react-icons/fa';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

interface Props {
  result: AnalysisResult;
}

const AnalysisResultView = ({ result }: Props) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'community'>('overview');

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low':
        return <FaShieldAlt className="text-green-500" />;
      case 'medium':
        return <FaExclamationTriangle className="text-yellow-500" />;
      case 'high':
        return <FaSkull className="text-red-500" />;
      default:
        return null;
    }
  };

  const nutritionData = {
    labels: ['碳水化合物', '蛋白质', '脂肪', '糖分', '钠'],
    datasets: [
      {
        data: [
          result.nutrition.carbs,
          result.nutrition.protein,
          result.nutrition.fat,
          result.nutrition.sugar,
          result.nutrition.sodium / 1000, // 转换为克
        ],
        backgroundColor: [
          'rgba(255, 159, 64, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(255, 99, 132, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(54, 162, 235, 0.8)',
        ],
      },
    ],
  };

  const healthScoreData = {
    labels: ['健康评分'],
    datasets: [
      {
        label: '评分',
        data: [result.healthScore],
        backgroundColor: result.healthScore > 80 
          ? 'rgba(34, 197, 94, 0.8)' 
          : result.healthScore > 60 
            ? 'rgba(234, 179, 8, 0.8)' 
            : 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgba(255, 255, 255, 0.8)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8">
      {/* 标题和基本信息 */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">{result.productName}</h2>
        <div className="flex items-center justify-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm ${
            result.overallRisk === 'low' 
              ? 'bg-green-100 text-green-800'
              : result.overallRisk === 'medium'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
          }`}>
            {result.overallRisk === 'low' ? '低风险' : result.overallRisk === 'medium' ? '中等风险' : '高风险'}
          </span>
          <span className="text-gray-500 text-sm">
            分析时间: {new Date(result.timestamp).toLocaleString()}
          </span>
        </div>
      </div>

      {/* 标签页切换 */}
      <div className="flex justify-center mb-6">
        <div className="bg-gray-100 p-1 rounded-lg inline-flex">
          <button
            className={`px-6 py-2 rounded-lg transition-colors ${
              activeTab === 'overview'
                ? 'bg-white shadow text-orange-500'
                : 'text-gray-600 hover:text-orange-500'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            概览
          </button>
          <button
            className={`px-6 py-2 rounded-lg transition-colors ${
              activeTab === 'details'
                ? 'bg-white shadow text-orange-500'
                : 'text-gray-600 hover:text-orange-500'
            }`}
            onClick={() => setActiveTab('details')}
          >
            详细分析
          </button>
          <button
            className={`px-6 py-2 rounded-lg transition-colors ${
              activeTab === 'community'
                ? 'bg-white shadow text-orange-500'
                : 'text-gray-600 hover:text-orange-500'
            }`}
            onClick={() => setActiveTab('community')}
          >
            社区反馈
          </button>
        </div>
      </div>

      {/* 概览 */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* 健康评分 */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">健康评分</h3>
            <div className="flex items-center justify-between">
              <div className="w-1/3">
                <Bar
                  data={healthScoreData}
                  options={{
                    indexAxis: 'y',
                    scales: {
                      x: {
                        beginAtZero: true,
                        max: 100,
                      },
                    },
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                  }}
                />
              </div>
              <div className="w-2/3 pl-6">
                <p className="text-gray-600">
                  该产品的健康评分为 {result.healthScore} 分，
                  {result.healthScore > 80 
                    ? '属于健康食品范畴。' 
                    : result.healthScore > 60 
                      ? '营养较为均衡。' 
                      : '建议适量食用。'}
                </p>
              </div>
            </div>
          </div>

          {/* 营养成分 */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">营养成分</h3>
            <div className="flex items-center justify-between">
              <div className="w-1/3">
                <Doughnut data={nutritionData} />
              </div>
              <div className="w-2/3 pl-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">碳水化合物</p>
                    <p className="font-semibold">{result.nutrition.carbs}g</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">蛋白质</p>
                    <p className="font-semibold">{result.nutrition.protein}g</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">脂肪</p>
                    <p className="font-semibold">{result.nutrition.fat}g</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">糖分</p>
                    <p className="font-semibold">{result.nutrition.sugar}g</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">钠</p>
                    <p className="font-semibold">{result.nutrition.sodium}mg</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 风险提示 */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">风险提示</h3>
            <div className="space-y-4">
              {result.allergens.length > 0 && (
                <div className="flex items-start gap-2">
                  <FaExclamationTriangle className="text-yellow-500 mt-1" />
                  <div>
                    <p className="font-semibold">过敏原</p>
                    <p className="text-gray-600">{result.allergens.join('、')}</p>
                  </div>
                </div>
              )}
              {result.additives.length > 0 && (
                <div className="flex items-start gap-2">
                  <FaExclamationTriangle className="text-yellow-500 mt-1" />
                  <div>
                    <p className="font-semibold">食品添加剂</p>
                    <p className="text-gray-600">{result.additives.join('、')}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 详细分析 */}
      {activeTab === 'details' && (
        <div className="space-y-6">
          {/* 成分列表 */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">成分详细分析</h3>
            <div className="space-y-4">
              {result.ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-lg">
                  <div className="mt-1">{getRiskIcon(ingredient.riskLevel)}</div>
                  <div>
                    <h4 className="font-semibold">{ingredient.name}</h4>
                    <p className="text-gray-600 text-sm">{ingredient.description}</p>
                    {ingredient.concerns && ingredient.concerns.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm text-yellow-600">注意事项：</p>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {ingredient.concerns.map((concern, idx) => (
                            <li key={idx}>{concern}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 合规性分析 */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">合规性分析</h3>
            <div className={`p-4 rounded-lg ${
              result.complianceStatus.status === 'compliant'
                ? 'bg-green-50'
                : result.complianceStatus.status === 'warning'
                  ? 'bg-yellow-50'
                  : 'bg-red-50'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <FaCheckCircle className={
                  result.complianceStatus.status === 'compliant'
                    ? 'text-green-500'
                    : result.complianceStatus.status === 'warning'
                      ? 'text-yellow-500'
                      : 'text-red-500'
                } />
                <span className="font-semibold">
                  {result.complianceStatus.status === 'compliant' ? '完全合规' :
                   result.complianceStatus.status === 'warning' ? '需要注意' : '不合规'}
                </span>
              </div>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {result.complianceStatus.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* 区块链信息 */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">区块链存证信息</h3>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-gray-500">配料表哈希：</span>
                <span className="font-mono">{result.blockchainInfo.ingredientsHash}</span>
              </p>
              <p>
                <span className="text-gray-500">分析结果哈希：</span>
                <span className="font-mono">{result.blockchainInfo.resultHash}</span>
              </p>
              <p>
                <span className="text-gray-500">交易 ID：</span>
                <span className="font-mono">{result.blockchainInfo.transactionId}</span>
              </p>
              <p>
                <span className="text-gray-500">上链时间：</span>
                {new Date(result.blockchainInfo.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 社区反馈 */}
      {activeTab === 'community' && (
        <div className="space-y-6">
          {/* 验证状态 */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">验证状态</h3>
            <div className="flex items-center gap-4 mb-4">
              <FaCheckCircle className="text-green-500 text-xl" />
              <div>
                <p className="font-semibold">已通过专业验证</p>
                <p className="text-sm text-gray-600">
                  最后验证时间：{new Date(result.verificationStatus.lastVerified).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">验证人：</p>
              <div className="flex flex-wrap gap-2">
                {result.verificationStatus.verifiedBy.map((verifier, index) => (
                  <span key={index} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                    {verifier}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 社区数据 */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4">社区反馈数据</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FaHistory className="text-orange-500" />
                  <span className="font-semibold">纠错记录</span>
                </div>
                <p className="text-2xl font-bold text-orange-500">
                  {result.communityFeedback.corrections}
                </p>
                <p className="text-sm text-gray-500">历史纠错次数</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FaUsers className="text-blue-500" />
                  <span className="font-semibold">社区验证</span>
                </div>
                <p className="text-2xl font-bold text-blue-500">
                  {result.communityFeedback.verifications}
                </p>
                <p className="text-sm text-gray-500">社区验证次数</p>
              </div>
            </div>
          </div>

          {/* 参与按钮 */}
          <div className="flex justify-center gap-4">
            <button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
              提交纠错
            </button>
            <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              参与验证
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisResultView;
