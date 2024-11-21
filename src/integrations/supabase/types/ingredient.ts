export type RecipeIngredient = {
  id: string;
  recipe_id: string | null;
  amount: string;
  item: string;
  unit: string | null;
  created_at: string;
}

export type RecipeIngredientInsert = {
  id?: string;
  recipe_id?: string | null;
  amount: string;
  item: string;
  unit?: string | null;
  created_at?: string;
}

export type RecipeIngredientUpdate = {
  id?: string;
  recipe_id?: string | null;
  amount?: string;
  item?: string;
  unit?: string | null;
  created_at?: string;
}