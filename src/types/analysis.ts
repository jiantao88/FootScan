export type RiskLevel = 'low' | 'medium' | 'high';
export type IngredientCategory = 'main' | 'additive' | 'allergen' | 'preservative';

export interface Ingredient {
  name: string;
  category: IngredientCategory;
  riskLevel: RiskLevel;
  description: string;
  concerns?: string[];
}

export interface NutritionMetrics {
  sodium: number;
  sugar: number;
  fat: number;
  protein: number;
  carbs: number;
}

export interface AnalysisResult {
  id: string;
  timestamp: number;
  productName: string;
  overallRisk: RiskLevel;
  ingredients: Ingredient[];
  nutrition: NutritionMetrics;
  allergens: string[];
  additives: string[];
  complianceStatus: {
    status: 'compliant' | 'warning' | 'violation';
    details: string[];
  };
  healthScore: number;
  verificationStatus: {
    verified: boolean;
    verifiedBy: string[];
    lastVerified: number;
  };
  blockchainInfo: {
    ingredientsHash: string;
    resultHash: string;
    timestamp: number;
    transactionId: string;
  };
  communityFeedback: {
    corrections: number;
    verifications: number;
    lastUpdate: number;
  };
}
