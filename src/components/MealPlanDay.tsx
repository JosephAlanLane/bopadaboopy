import React from "react";
import { X } from "lucide-react";
import { Recipe, DayOfWeek } from "@/types/recipe";

interface MealPlanDayProps {
  day: DayOfWeek | string;
  recipe: Recipe | null;
  onRemove: () => void;
  onDrop: (recipe: Recipe) => void;
  onDragStart: (day: DayOfWeek | string, recipe: Recipe) => void;
}

export const MealPlanDay = ({ 
  day, 
  recipe, 
  onRemove, 
  onDrop,
  onDragStart 
}: MealPlanDayProps) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('bg-gray-100', 'dark:bg-gray-600');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('bg-gray-100', 'dark:bg-gray-600');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('bg-gray-100', 'dark:bg-gray-600');
    const recipeData = JSON.parse(e.dataTransfer.getData("recipe"));
    onDrop(recipeData);
  };

  const handleDragStart = (e: React.DragEvent) => {
    if (recipe) {
      e.dataTransfer.setData("recipe", JSON.stringify(recipe));
      onDragStart(day, recipe);
      e.currentTarget.classList.add('opacity-50');
    }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('opacity-50');
  };

  return (
    <div 
      className="py-1 px-2 bg-gray-50 rounded border flex items-center justify-between dark:bg-gray-700 dark:border-gray-600 transition-colors duration-200 w-full max-w-full"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex items-center gap-1 min-w-0 w-full">
        <p className="font-medium w-20 text-sm shrink-0 overflow-hidden text-ellipsis">{day}</p>
        <div className="flex-1 min-w-0 flex items-center overflow-hidden">
          {recipe ? (
            <div
              draggable
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              className="flex-1 cursor-move min-w-0 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors duration-200 flex items-center overflow-hidden"
            >
              <p className="text-sm text-gray-600 truncate dark:text-gray-300 flex-1 overflow-hidden text-ellipsis">
                {recipe.title}
              </p>
            </div>
          ) : (
            <p className="text-sm text-gray-600 truncate dark:text-gray-300 flex-1 overflow-hidden text-ellipsis">
              No meal planned
            </p>
          )}
          {recipe && (
            <button
              onClick={onRemove}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 flex-shrink-0 ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};