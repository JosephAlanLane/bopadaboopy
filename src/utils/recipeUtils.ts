import { supabase } from "@/integrations/supabase/client";

export const trackRecipeUsage = async (recipeId: string) => {
  console.log('Tracking recipe usage:', recipeId);
  const { error } = await supabase
    .from('recipe_usage_stats')
    .insert([{ recipe_id: recipeId }]);
  
  if (error) {
    console.error('Error tracking recipe usage:', error);
  }
};