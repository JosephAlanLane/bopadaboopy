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
          {meals.map((meal, index) => {
            // If there's a meal, create a new recipe object with truncated title
            const truncatedMeal = meal ? {
              ...meal,
              title: meal.title.length > 20 ? `${meal.title.slice(0, 20)}...` : meal.title
            } : null;

            return (
              <MealPlanDay
                key={index}
                day={`Meal ${index + 1}`}
                recipe={truncatedMeal}
                onRemove={() => onRemoveMeal(index)}
                onDrop={(recipe) => onDrop(index, recipe)}
                onDragStart={(_, recipe) => onDragStart(index, recipe)}
                className="w-full"
              />
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};