import React from 'react';
import { Recipe } from '@/types/recipe';

interface MealPlanRecipeGridProps {
  recipes: Recipe[];
}

export const MealPlanRecipeGrid = ({ recipes }: MealPlanRecipeGridProps) => {
  return (
    <div className="grid grid-cols-7 gap-2">
      {recipes.map((recipe: Recipe, index: number) => (
        <div key={index} className="relative aspect-square">
          <img
            src={recipe.image || 'https://bopadaboopy.lovable.app/nonna-logo.png'}
            alt={recipe.title}
            className="w-full h-full object-cover rounded-md"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-md flex items-center justify-center">
            <p className="text-white text-xs text-center px-1">{recipe.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};