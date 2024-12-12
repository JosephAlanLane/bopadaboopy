import React, { useCallback, memo } from "react";
import { X } from "lucide-react";
import { Recipe, DayOfWeek } from "@/types/recipe";

interface MealPlanDayProps {
  day: DayOfWeek | string;
  recipe: Recipe | null;
  onRemove: () => void;
  onDrop: (recipe: Recipe) => void;
  onDragStart: (day: DayOfWeek | string, recipe: Recipe) => void;
  className?: string;
}

export const MealPlanDay = memo(({ 
  day, 
  recipe, 
  onRemove, 
  onDrop,
  onDragStart,
  className = ''
}: MealPlanDayProps) => {
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('bg-gray-100', 'dark:bg-gray-600');
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.currentTarget.classList.remove('bg-gray-100', 'dark:bg-gray-600');
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('bg-gray-100', 'dark:bg-gray-600');
    const recipeData = JSON.parse(e.dataTransfer.getData("recipe"));
    onDrop(recipeData);
  }, [onDrop]);

  const handleDragStart = useCallback((e: React.DragEvent) => {
    if (recipe) {
      e.dataTransfer.setData("recipe", JSON.stringify(recipe));
      onDragStart(day, recipe);
      e.currentTarget.classList.add('opacity-50');
    }
  }, [recipe, day, onDragStart]);

  const handleDragEnd = useCallback((e: React.DragEvent) => {
    e.currentTarget.classList.remove('opacity-50');
  }, []);

  return (
    <div 
      className={`
        relative group
        py-2 px-3 
        bg-white dark:bg-gray-800 
        rounded-lg border border-gray-200 dark:border-gray-700
        transition-all duration-200
        hover:shadow-sm
        ${className}
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/20">
            <span className="text-xs font-medium text-primary">
              {typeof day === 'string' && day.startsWith('Meal') ? day.slice(5) : day.slice(0, 2)}
            </span>
          </span>
        </div>
        
        <div className="flex-1 min-w-0">
          {recipe ? (
            <div
              draggable
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              className="cursor-move group-hover:bg-gray-50 dark:group-hover:bg-gray-700/50 rounded-md py-1 px-2 transition-colors duration-200"
            >
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {recipe.title}
              </p>
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400 italic px-2">
              No meal planned
            </p>
          )}
        </div>

        {recipe && (
          <button
            onClick={onRemove}
            className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                     hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded-full"
          >
            <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </button>
        )}
      </div>
    </div>
  );
});

MealPlanDay.displayName = 'MealPlanDay';