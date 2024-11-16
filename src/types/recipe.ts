export interface Recipe {
  id: string;
  title: string;
  image: string;
  recipeUrl: string;
  ingredients: {
    amount: string;
    item: string;
  }[];
  instructions: string[];
  cuisine: string;
  allergens: string[];
}

export interface MealPlan {
  [key: string]: Recipe | null;
}

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';