export type MealPlan = {
  id: string;
  user_id: string | null;
  recipe_id: string | null;
  day_of_week: string;
  created_at: string;
}

export type MealPlanInsert = {
  id?: string;
  user_id?: string | null;
  recipe_id?: string | null;
  day_of_week: string;
  created_at?: string;
}

export type MealPlanUpdate = {
  id?: string;
  user_id?: string | null;
  recipe_id?: string | null;
  day_of_week?: string;
  created_at?: string;
}