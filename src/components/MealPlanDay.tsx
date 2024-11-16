import React from "react";
import { X } from "lucide-react";
import { Recipe, DayOfWeek } from "@/types/recipe";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface MealPlanDayProps {
  day: DayOfWeek;
  recipe: Recipe | null;
  onRemove: () => void;
}

export const MealPlanDay = ({ day, recipe, onRemove }: MealPlanDayProps) => {
  return (
    <div className="p-2 bg-gray-50 rounded border flex items-center justify-between dark:bg-gray-700 dark:border-gray-600">
      <div className="flex items-center gap-4">
        <p className="font-medium w-16 text-sm">{day}</p>
        <HoverCard>
          <HoverCardTrigger asChild>
            <p className="text-sm text-gray-600 truncate dark:text-gray-300 cursor-pointer">
              {recipe ? recipe.title : "No meal planned"}
            </p>
          </HoverCardTrigger>
          {recipe && (
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
          )}
        </HoverCard>
      </div>
      {recipe && (
        <button
          onClick={onRemove}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};