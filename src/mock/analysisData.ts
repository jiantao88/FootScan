import { AnalysisResult } from '@/types/analysis';

export const mockAnalysisResult: AnalysisResult = {
  id: '1234567890',
  timestamp: Date.now(),
  productName: '某品牌饼干',
  overallRisk: 'low',
  ingredients: [
    {
      name: '小麦粉',
      category: 'main',
      riskLevel: 'low',
      description: '主要原料，来源于小麦',
      concerns: ['可能含麸质']
    },
    {
      name: '白砂糖',
      category: 'main',
      riskLevel: 'medium',
      description: '甜味剂',
      concerns: ['高糖分']
    },
    {
      name: '棕榈油',
      category: 'main',
      riskLevel: 'medium',
      description: '植物油',
      concerns: ['饱和脂肪酸含量较高']
    },
    {
      name: '山梨糖醇',
      category: 'additive',
      riskLevel: 'low',
      description: '甜味剂',
      concerns: ['大量食用可能导致腹泻']
    }
  ],
  nutrition: {
    sodium: 120,
    sugar: 25,
    fat: 15,
    protein: 5,
    carbs: 60
  },
  allergens: ['小麦', '大豆'],
  additives: ['山梨糖醇', '香料'],
  complianceStatus: {
    status: 'compliant',
    details: [
      '符合国家食品安全标准',
      '添加剂使用符合规范'
    ]
  },
  healthScore: 75,
  verificationStatus: {
    verified: true,
    verifiedBy: ['营养师小王', '食品安全专家张三'],
    lastVerified: Date.now() - 86400000 // 1天前
  },
  blockchainInfo: {
    ingredientsHash: '0x1234...5678',
    resultHash: '0x9abc...def0',
    timestamp: Date.now() - 3600000, // 1小时前
    transactionId: '0xabcd...1234'
  },
  communityFeedback: {
    corrections: 2,
    verifications: 15,
    lastUpdate: Date.now() - 7200000 // 2小时前
  }
};
