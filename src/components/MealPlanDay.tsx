import React from "react";
import { X } from "lucide-react";
import { Recipe, DayOfWeek } from "@/types/recipe";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

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
      className="p-2 bg-gray-50 rounded border flex items-center justify-between dark:bg-gray-700 dark:border-gray-600 transition-colors duration-200"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <p className="font-medium w-16 text-sm">{day}</p>
        {recipe ? (
          <div
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            className="flex-1 cursor-move min-w-0 pl-4 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors duration-200"
          >
            <HoverCard>
              <HoverCardTrigger asChild>
                <p className="text-sm text-gray-600 truncate dark:text-gray-300 pr-8">
                  {recipe.title}
                </p>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 p-4">
                <h3 className="font-semibold mb-2">{recipe.title}</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">Ingredients:</h4>
                    <ul className="text-sm space-y-1">
                      {recipe.ingredients.map((ing, idx) => (
                        <li key={idx}>
                          {ing.amount} {ing.unit} {ing.item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Instructions:</h4>
                    <ol className="text-sm space-y-1 list-decimal list-inside">
                      {recipe.instructions.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        ) : (
          <p className="text-sm text-gray-600 truncate dark:text-gray-300 pl-4">
            No meal planned
          </p>
        )}
      </div>
      {recipe && (
        <button
          onClick={onRemove}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 flex-shrink-0 ml-2"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};