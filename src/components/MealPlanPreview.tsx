import React from 'react';
import { Recipe, DayOfWeek } from '@/types/recipe';
import { MealPlanRecipeGrid } from './MealPlanRecipeGrid';

const DAYS: DayOfWeek[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface MealPlanPreviewProps {
  recipes: Recipe[];
  onClick: () => void;
}

export const MealPlanPreview = ({ recipes, onClick }: MealPlanPreviewProps) => {
  return (
    <div 
      onClick={onClick}
      className="p-4 cursor-pointer"
    >
      <MealPlanRecipeGrid recipes={recipes} />
    </div>
  );
};