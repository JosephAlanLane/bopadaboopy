export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      meal_plans: {
        Row: {
          created_at: string
          day_of_week: string
          id: string
          recipe_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          day_of_week: string
          id?: string
          recipe_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          day_of_week?: string
          id?: string
          recipe_id?: string | null
          user_id?: string | null
        }
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
          },
        ]
      }
      pending_recipes: {
        Row: {
          approval_token: string | null
          created_at: string
          cuisine: string
          id: string
          image: string
          ingredients: Json
          instructions: string[]
          status: string | null
          title: string
          user_id: string | null
        }
        Insert: {
          approval_token?: string | null
          created_at?: string
          cuisine: string
          id?: string
          image: string
          ingredients: Json
          instructions: string[]
          status?: string | null
          title: string
          user_id?: string | null
        }
        Update: {
          approval_token?: string | null
          created_at?: string
          cuisine?: string
          id?: string
          image?: string
          ingredients?: Json
          instructions?: string[]
          status?: string | null
          title?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pending_recipes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
        }
        Relationships: []
      }
      recipe_ingredients: {
        Row: {
          amount: string
          created_at: string
          id: string
          item: string
          recipe_id: string | null
          unit: string | null
        }
        Insert: {
          amount: string
          created_at?: string
          id?: string
          item: string
          recipe_id?: string | null
          unit?: string | null
        }
        Update: {
          amount?: string
          created_at?: string
          id?: string
          item?: string
          recipe_id?: string | null
          unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recipe_ingredients_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipes: {
        Row: {
          allergens: string[] | null
          category: string | null
          cook_time_minutes: number | null
          created_at: string
          cuisine: string
          id: string
          image: string
          instructions: string[]
          rating: number | null
          servings: number | null
          title: string
          user_id: string | null
        }
        Insert: {
          allergens?: string[] | null
          category?: string | null
          cook_time_minutes?: number | null
          created_at?: string
          cuisine: string
          id?: string
          image: string
          instructions: string[]
          rating?: number | null
          servings?: number | null
          title: string
          user_id?: string | null
        }
        Update: {
          allergens?: string[] | null
          category?: string | null
          cook_time_minutes?: number | null
          created_at?: string
          cuisine?: string
          id?: string
          image?: string
          instructions?: string[]
          rating?: number | null
          servings?: number | null
          title?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recipes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_tiers: {
        Row: {
          created_at: string
          features: Json
          id: string
          name: string
          price_amount: number
          price_id: string
        }
        Insert: {
          created_at?: string
          features?: Json
          id?: string
          name: string
          price_amount: number
          price_id: string
        }
        Update: {
          created_at?: string
          features?: Json
          id?: string
          name?: string
          price_amount?: number
          price_id?: string
        }
        Relationships: []
      }
      user_subscriptions: {
        Row: {
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscription_tier_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_tier_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_tier_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_subscriptions_subscription_tier_id_fkey"
            columns: ["subscription_tier_id"]
            isOneToOne: false
            referencedRelation: "subscription_tiers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      insert_recipe_with_ingredients: {
        Args: {
          p_title: string
          p_image: string
          p_cuisine: string
          p_instructions: string[]
          p_ingredients: Json[]
        }
        Returns: string
      }
      update_recipe_images: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
