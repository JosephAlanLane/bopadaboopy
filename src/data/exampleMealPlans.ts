import { recipes } from './recipes';
import { supabase } from "@/integrations/supabase/client";

// Helper function to get random recipes
const getRandomRecipes = (count: number) => {
  const shuffled = [...recipes].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Create example meal plans
export const createExampleMealPlans = async () => {
  const { data: existingPlans } = await supabase
    .from('saved_meal_plans')
    .select('*')
    .eq('is_public', true);

  // Only create example plans if none exist
  if (!existingPlans || existingPlans.length === 0) {
    const weeklyRecipes = getRandomRecipes(7);
    const healthyRecipes = recipes
      .filter(recipe => !recipe.allergens?.includes('dairy'))
      .slice(0, 7);

    const examplePlans = [
      {
        title: "Classic Weekly Menu",
        description: "A balanced mix of different cuisines for the whole week",
        recipes: weeklyRecipes,
        is_public: true
      },
      {
        title: "Healthy & Light",
        description: "Dairy-free recipes perfect for a healthy lifestyle",
        recipes: healthyRecipes,
        is_public: true
      }
    ];

    // Insert example plans
    for (const plan of examplePlans) {
      await supabase
        .from('saved_meal_plans')
        .insert(plan)
        .select();
    }
  }
};