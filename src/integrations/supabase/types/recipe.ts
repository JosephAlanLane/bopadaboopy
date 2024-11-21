import { Json } from './utils';

export type Recipe = {
  id: string;
  user_id: string | null;
  title: string;
  image: string;
  cuisine: string;
  instructions: string[];
  created_at: string;
  allergens: string[] | null;
  cook_time_minutes: number | null;
  servings: number | null;
  rating: number | null;
  category: string | null;
}

export type RecipeInsert = {
  id?: string;
  user_id?: string | null;
  title: string;
  image: string;
  cuisine: string;
  instructions: string[];
  created_at?: string;
  allergens?: string[] | null;
  cook_time_minutes?: number | null;
  servings?: number | null;
  rating?: number | null;
  category?: string | null;
}

export type RecipeUpdate = {
  id?: string;
  user_id?: string | null;
  title?: string;
  image?: string;
  cuisine?: string;
  instructions?: string[];
  created_at?: string;
  allergens?: string[] | null;
  cook_time_minutes?: number | null;
  servings?: number | null;
  rating?: number | null;
  category?: string | null;
}

export type PendingRecipe = {
  id: string;
  user_id: string | null;
  title: string;
  image: string;
  cuisine: string;
  instructions: string[];
  ingredients: Json;
  status: string | null;
  approval_token: string | null;
  created_at: string;
}

export type PendingRecipeInsert = {
  id?: string;
  user_id?: string | null;
  title: string;
  image: string;
  cuisine: string;
  instructions: string[];
  ingredients: Json;
  status?: string | null;
  approval_token?: string | null;
  created_at?: string;
}

export type PendingRecipeUpdate = {
  id?: string;
  user_id?: string | null;
  title?: string;
  image?: string;
  cuisine?: string;
  instructions?: string[];
  ingredients?: Json;
  status?: string | null;
  approval_token?: string | null;
  created_at?: string;
}