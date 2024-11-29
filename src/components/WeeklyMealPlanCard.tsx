import React from 'react';
import { Recipe } from '@/types/recipe';

interface WeeklyMealPlanCardProps {
  title: string;
  recipes: Recipe[];
}

export const WeeklyMealPlanCard = ({ title, recipes }: WeeklyMealPlanCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02] cursor-pointer border border-gray-200 dark:border-gray-700">
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">{title}</h3>
        <div className="grid grid-cols-7 gap-2">
          {recipes.map((recipe, index) => (
            <div key={index} className="relative aspect-square">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover rounded-md"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-md flex items-center justify-center">
                <p className="text-white text-xs text-center px-1">{recipe.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};