export interface Recipe {
  id: string;
  title: string;
  image: string;
  recipeUrl: string;
  ingredients: Ingredient[];
  instructions: string[];
  cuisine: string;
  allergens: string[];
  cook_time_minutes?: number;
  servings?: number;
  rating?: number;
  reviews_count?: number;
  category?: string;
  created_at?: string;
  popularity?: number;
  user_id?: string;
}

export interface Ingredient {
  amount: string;
  item: string;
  unit?: string;
}

export interface MealPlan {
  [key: string]: Recipe | null;
}

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';