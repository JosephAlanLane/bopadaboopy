import { supabase } from "@/integrations/supabase/client";
import { Recipe } from '@/types/recipe';
import { Json } from '@/integrations/supabase/types/utils';

// Helper function to get random recipes from database
const getRandomRecipes = async (count: number): Promise<Recipe[]> => {
  const { data: recipes, error } = await supabase
    .from('recipes')
    .select(`
      id,
      title,
      image,
      cuisine,
      instructions,
      allergens,
      cook_time_minutes,
      servings,
      rating,
      category,
      recipe_ingredients (
        amount,
        unit,
        item
      )
    `)
    .limit(count);

  if (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }

  return recipes.map((recipe: any) => ({
    ...recipe,
    recipeUrl: '', // Add a default empty string since it's required by Recipe type
    ingredients: recipe.recipe_ingredients.map((ing: any) => ({
      amount: ing.amount,
      unit: ing.unit || '',
      item: ing.item,
    })),
  }));
};

// Convert Recipe array to JSON-compatible format
const recipesToJson = (recipes: Recipe[]): Json => {
  return recipes.map(recipe => ({
    id: recipe.id,
    title: recipe.title,
    image: recipe.image,
    cuisine: recipe.cuisine,
    ingredients: recipe.ingredients.map(ing => ({
      amount: ing.amount,
      unit: ing.unit || null,
      item: ing.item
    })),
    instructions: recipe.instructions,
    allergens: recipe.allergens || [],
    cook_time_minutes: recipe.cook_time_minutes || null,
    servings: recipe.servings || null,
    rating: recipe.rating || null,
    category: recipe.category || null
  })) as Json;
};

// Create example meal plans
export const createExampleMealPlans = async () => {
  try {
    // Check for existing public plans
    const { data: existingPlans } = await supabase
      .from('saved_meal_plans')
      .select('*')
      .eq('is_public', true);

    // Only create example plans if none exist
    if (!existingPlans || existingPlans.length === 0) {
      console.log('No existing public meal plans found, creating examples...');
      
      const weeklyRecipes = await getRandomRecipes(7);
      const healthyRecipes = (await getRandomRecipes(14))
        .filter(recipe => !recipe.allergens?.includes('dairy'))
        .slice(0, 7);

      const examplePlans = [
        {
          title: "Classic Weekly Menu",
          description: "A balanced mix of different cuisines for the whole week",
          recipes: recipesToJson(weeklyRecipes),
          is_public: true,
          user_id: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'system' : null
        },
        {
          title: "Healthy & Light",
          description: "Dairy-free recipes perfect for a healthy lifestyle",
          recipes: recipesToJson(healthyRecipes),
          is_public: true,
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
  } catch (error) {
    console.error('Error in createExampleMealPlans:', error);
  }
};