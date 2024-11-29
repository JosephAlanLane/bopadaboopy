import React from 'react';
import { Navbar } from '@/components/Navbar';
import { WeeklyMealPlanCard } from '@/components/WeeklyMealPlanCard';
import { recipes } from '@/data/recipes';

const MealPlans = () => {
  // Filter Asian recipes (Chinese and Thai)
  const asianRecipes = recipes.filter(recipe => 
    recipe.cuisine === 'Chinese' || recipe.cuisine === 'Thai'
  ).slice(0, 7);

  // Filter Italian and Mediterranean recipes
  const mediterraneanRecipes = recipes.filter(recipe => 
    recipe.cuisine === 'Italian' || recipe.cuisine === 'Mediterranean'
  ).slice(0, 7);

  console.log('Asian recipes:', asianRecipes.length);
  console.log('Mediterranean recipes:', mediterraneanRecipes.length);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
          Weekly Meal Plans
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <WeeklyMealPlanCard
            title="Asian Weekly Meal Plan"
            recipes={asianRecipes}
          />
          <WeeklyMealPlanCard
            title="Italian/Medi Weekly Meal Plan"
            recipes={mediterraneanRecipes}
          />
        </div>
      </main>
    </div>
  );
};

export default MealPlans;