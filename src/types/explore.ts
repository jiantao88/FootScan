export interface Recipe {
  id: string;
  title: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  rating: number;
  likes: number;
  analysisTime: string;
  tags: string[];
  category: string;
  verified: boolean;
  verificationCount: number;
  ingredients?: string[];
  nutritionFacts?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    sodium: number;
  };
}

export interface ExpertChef {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  rating: number;
  recipesCount: number;
  studentsCount: number;
}
