import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { WeeklyMealPlanCard } from '@/components/WeeklyMealPlanCard';
import { recipes } from '@/data/recipes';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const MealPlans = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter Asian recipes (Chinese and Thai)
  const asianRecipes = recipes
    .filter(recipe => 
      recipe.cuisine === 'Chinese' || recipe.cuisine === 'Thai'
    )
    .slice(0, 7);

  // Filter Italian and Mediterranean recipes
  const mediterraneanRecipes = recipes
    .filter(recipe => 
      recipe.cuisine === 'Italian' || recipe.cuisine === 'Mediterranean'
    )
    .slice(0, 7);

  // Ensure we have exactly 7 recipes for each cuisine
  while (asianRecipes.length < 7) {
    asianRecipes.push(asianRecipes[0]); // Duplicate first recipe if needed
  }
  while (mediterraneanRecipes.length < 7) {
    mediterraneanRecipes.push(mediterraneanRecipes[0]); // Duplicate first recipe if needed
  }

  // Filter meal plans based on search query
  const filteredMealPlans = searchQuery.trim() === '' ? [
    { title: "Asian Weekly Meal Plan", recipes: asianRecipes },
    { title: "Italian/Medi Weekly Meal Plan", recipes: mediterraneanRecipes }
  ] : [
    { title: "Asian Weekly Meal Plan", recipes: asianRecipes },
    { title: "Italian/Medi Weekly Meal Plan", recipes: mediterraneanRecipes }
  ].filter(plan => 
    plan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plan.recipes.some(recipe => 
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Weekly Meal Plans
          </h1>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="text"
              placeholder="Search meal plans..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 w-full"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredMealPlans.map((plan, index) => (
            <WeeklyMealPlanCard
              key={index}
              title={plan.title}
              recipes={plan.recipes}
            />
          ))}
          {filteredMealPlans.length === 0 && (
            <div className="col-span-2 text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No meal plans found matching your search.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MealPlans;