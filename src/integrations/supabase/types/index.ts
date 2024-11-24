import { Json } from './utils';
import { Profile, ProfileInsert, ProfileUpdate } from './auth';
import { Recipe, RecipeInsert, RecipeUpdate, PendingRecipe, PendingRecipeInsert, PendingRecipeUpdate } from './recipe';
import { RecipeIngredient, RecipeIngredientInsert, RecipeIngredientUpdate } from './ingredient';
import { MealPlan, MealPlanInsert, MealPlanUpdate } from './meal-plan';
import { SubscriptionTier, UserSubscription } from './subscription';

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: ProfileInsert;
        Update: ProfileUpdate;
        Relationships: [];
      };
      recipes: {
        Row: Recipe;
        Insert: RecipeInsert;
        Update: RecipeUpdate;
        Relationships: [
          {
            foreignKeyName: "recipes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ];
      };
      recipe_ingredients: {
        Row: RecipeIngredient;
        Insert: RecipeIngredientInsert;
        Update: RecipeIngredientUpdate;
        Relationships: [
          {
            foreignKeyName: "recipe_ingredients_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          }
        ];
      };
      pending_recipes: {
        Row: PendingRecipe;
        Insert: PendingRecipeInsert;
        Update: PendingRecipeUpdate;
        Relationships: [
          {
            foreignKeyName: "pending_recipes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ];
      };
      meal_plans: {
        Row: MealPlan;
        Insert: MealPlanInsert;
        Update: MealPlanUpdate;
        Relationships: [
          {
            foreignKeyName: "meal_plans_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meal_plans_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ];
      };
      subscription_tiers: {
        Row: SubscriptionTier;
        Insert: SubscriptionTier;
        Update: SubscriptionTier;
        Relationships: [];
      };
      user_subscriptions: {
        Row: UserSubscription;
        Insert: UserSubscription;
        Update: UserSubscription;
        Relationships: [
          {
            foreignKeyName: "user_subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_subscriptions_subscription_tier_id_fkey"
            columns: ["subscription_tier_id"]
            isOneToOne: false
            referencedRelation: "subscription_tiers"
            referencedColumns: ["id"]
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      insert_recipe_with_ingredients: {
        Args: {
          p_title: string;
          p_image: string;
          p_cuisine: string;
          p_instructions: string[];
          p_ingredients: Json[];
        };
        Returns: string;
      };
      update_recipe_images: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type { Json };
export * from './auth';
export * from './recipe';
export * from './ingredient';
export * from './meal-plan';
export * from './subscription';