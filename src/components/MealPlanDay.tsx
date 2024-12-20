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

const MealPlanDay = memo(({ 
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
        py-1 px-2 
        bg-white dark:bg-gray-800 
        rounded-lg border border-gray-200 dark:border-gray-700
        transition-all duration-200
        hover:shadow-sm
        ${className}
        max-w-full
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex items-center space-x-2 w-full">
        <div className="flex-shrink-0">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-700">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
              {typeof day === 'string' && day.startsWith('Meal') ? day.slice(5) : day.slice(0, 2)}
            </span>
          </span>
        </div>
        
        <div className="flex-1 min-w-0 pr-6">
          {recipe ? (
            <div
              draggable
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              className="cursor-move group-hover:bg-gray-50 dark:group-hover:bg-gray-700/50 rounded py-0.5 transition-colors duration-200 overflow-hidden"
            >
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {recipe.title}
              </p>
            </div>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400 italic truncate">
              No meal planned
            </p>
          )}
        </div>

        {recipe && (
          <button
            onClick={onRemove}
            className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                     hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded-full"
          >
            <X className="w-3 h-3 text-gray-500 dark:text-gray-400" />
          </button>
        )}
      </div>
    </div>
  );
});

MealPlanDay.displayName = 'MealPlanDay';

export default MealPlanDay;