import React, { useCallback, memo, useState, useEffect } from "react";
import { Recipe, DayOfWeek } from "@/types/recipe";
import { ServingsDialog } from "./meal-plan/ServingsDialog";
import { RecipeContent } from "./meal-plan/RecipeContent";

interface MealPlanDayProps {
  day: DayOfWeek | string;
  recipe: Recipe | null;
  onRemove: () => void;
  onDrop: (recipe: Recipe) => void;
  onDragStart: (day: DayOfWeek | string, recipe: Recipe) => void;
  onServingsChange?: (servings: number) => void;
  customServings?: number;
  className?: string;
}

const MealPlanDay = memo(({ 
  day, 
  recipe, 
  onRemove, 
  onDrop,
  onDragStart,
  onServingsChange,
  customServings,
  className = ''
}: MealPlanDayProps) => {
  const [localServings, setLocalServings] = useState<number>(
    customServings || (recipe?.servings || 1)
  );
  const [isServingsDialogOpen, setIsServingsDialogOpen] = useState(false);

  useEffect(() => {
    if (recipe?.servings) {
      setLocalServings(customServings || recipe.servings);
    }
  }, [recipe, customServings]);

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

  const handleServingsChange = (value: string) => {
    const newServings = parseInt(value);
    if (!isNaN(newServings) && newServings > 0) {
      setLocalServings(newServings);
    }
  };

  const handleUpdateServings = () => {
    if (onServingsChange && recipe) {
      onServingsChange(localServings);
      setIsServingsDialogOpen(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleUpdateServings();
    }
  };

  const handleResetServings = () => {
    if (recipe?.servings) {
      setLocalServings(recipe.servings);
      if (onServingsChange) {
        onServingsChange(recipe.servings);
      }
      setIsServingsDialogOpen(false);
    }
  };

  return (
    <>
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
          
          <div className="flex-1 min-w-0 pr-16">
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
            <RecipeContent
              recipe={recipe}
              localServings={localServings}
              onOpenServingsDialog={() => setIsServingsDialogOpen(true)}
              onRemove={onRemove}
            />
          )}
        </div>
      </div>

      <ServingsDialog
        isOpen={isServingsDialogOpen}
        onOpenChange={setIsServingsDialogOpen}
        localServings={localServings}
        onServingsChange={handleServingsChange}
        onUpdateServings={handleUpdateServings}
        onResetServings={handleResetServings}
        onKeyPress={handleKeyPress}
      />
    </>
  );
});

MealPlanDay.displayName = 'MealPlanDay';

export default MealPlanDay;