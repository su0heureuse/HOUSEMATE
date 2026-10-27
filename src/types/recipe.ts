export interface RecipeFridgeItem {
  id: string | number;
  name: string;
  category: string;
  storage: string;
  quantity: string;
  expiryDays: number;
}

export interface RecipeDetailStep {
  title: string;
  instruction: string;
  timerSeconds: number | null;
}

export interface RecipeDetail {
  steps: RecipeDetailStep[];
  tips: string[];
  storage: string;
}

export interface RescueRecipe {
  id: string;
  title: string;
  summary: string;
  timeMinutes: number;
  difficulty: '초간단' | '쉬움' | '보통';
  servings: number;
  usedItemIds: Array<string | number>;
  extraIngredients: string[];
  tools: string[];
  source: 'ai' | 'fallback';
}

export interface StoredRecipeList {
  ingredientsHash: string;
  recipes: RescueRecipe[];
  recentTitles: string[];
  refreshCount: number;
  generatedAt: string;
}
