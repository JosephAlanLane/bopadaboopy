import { recipes } from './recipes';
import { supabase } from "@/integrations/supabase/client";
import { Recipe } from '@/types/recipe';

// Helper function to get random recipes
const getRandomRecipes = (count: number) => {
  const shuffled = [...recipes].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Convert Recipe array to JSON-compatible format
const recipesToJson = (recipes: Recipe[]) => {
  return recipes.map(recipe => ({
    id: recipe.id,
    title: recipe.title,
    image: recipe.image,
    recipeUrl: recipe.recipeUrl,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
    cuisine: recipe.cuisine,
    allergens: recipe.allergens,
    cook_time_minutes: recipe.cook_time_minutes,
    servings: recipe.servings,
    rating: recipe.rating,
    category: recipe.category
  }));
};

// Create example meal plans
export const createExampleMealPlans = async () => {
  const { data: existingPlans } = await supabase
    .from('saved_meal_plans')
    .select('*')
    .eq('is_public', true);

  // Only create example plans if none exist
  if (!existingPlans || existingPlans.length === 0) {
    console.log('No existing public meal plans found, creating examples...');
    
    const weeklyRecipes = getRandomRecipes(7);
    const healthyRecipes = recipes
      .filter(recipe => !recipe.allergens?.includes('dairy'))
      .slice(0, 7);

    const examplePlans = [
      {
        title: "Classic Weekly Menu",
        description: "A balanced mix of different cuisines for the whole week",
        recipes: recipesToJson(weeklyRecipes),
        is_public: true,
        // Set a default user_id for public example plans
        user_id: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'system' : null
      },
      {
        title: "Healthy & Light",
        description: "Dairy-free recipes perfect for a healthy lifestyle",
        recipes: recipesToJson(healthyRecipes),
        is_public: true,
        // Set a default user_id for public example plans
        user_id: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'system' : null
      }
    ];

    // Insert example plans
    for (const plan of examplePlans) {
      try {
        const { error } = await supabase
          .from('saved_meal_plans')
          .insert(plan);
        
        if (error) {
          console.error('Error creating example meal plan:', error);
        } else {
          console.log('Successfully created example meal plan:', plan.title);
        }
      } catch (err) {
        console.error('Failed to create example meal plan:', err);
      }
    }
  } else {
    console.log('Public meal plans already exist, skipping example creation');
  }
};