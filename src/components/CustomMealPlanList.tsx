import React from "react";
import { Recipe } from "@/types/recipe";
import { ScrollArea } from "./ui/scroll-area";
import { MealPlanDay } from "./MealPlanDay";

interface CustomMealPlanListProps {
  meals: (Recipe | null)[];
  onRemoveMeal: (index: number) => void;
  onDrop: (index: number, recipe: Recipe) => void;
  onDragStart: (index: number, recipe: Recipe) => void;
}

export const CustomMealPlanList = ({
  meals,
  onRemoveMeal,
  onDrop,
  onDragStart,
}: CustomMealPlanListProps) => {
  return (
    <div className="h-[250px]">
      <ScrollArea className="h-full pr-4">
        <div className="space-y-1">
          {meals.map((meal, index) => (
            <MealPlanDay
              key={index}
              day={`Meal ${index + 1}`}
              recipe={meal}
              onRemove={() => onRemoveMeal(index)}
              onDrop={(recipe) => onDrop(index, recipe)}
              onDragStart={(_, recipe) => onDragStart(index, recipe)}
              className="w-full" // Added to match weekly plan width
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};