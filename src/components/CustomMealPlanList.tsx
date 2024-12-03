import React from "react";
import { Recipe } from "@/types/recipe";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { MealPlanDay } from "./MealPlanDay";

interface CustomMealPlanListProps {
  meals: (Recipe | null)[];
  onAddMeal: () => void;
  onRemoveMeal: (index: number) => void;
  onDrop: (index: number, recipe: Recipe) => void;
  onDragStart: (index: number, recipe: Recipe) => void;
}

export const CustomMealPlanList = ({
  meals,
  onAddMeal,
  onRemoveMeal,
  onDrop,
  onDragStart,
}: CustomMealPlanListProps) => {
  return (
    <div className="flex flex-col h-[calc(100vh-500px)]">
      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-1">
          {meals.slice(0, 5).map((meal, index) => (
            <MealPlanDay
              key={index}
              day={`Meal ${index + 1}`}
              recipe={meal}
              onRemove={() => onRemoveMeal(index)}
              onDrop={(recipe) => onDrop(index, recipe)}
              onDragStart={(_, recipe) => onDragStart(index, recipe)}
            />
          ))}
        </div>
      </ScrollArea>
      <Button
        variant="outline"
        size="sm"
        onClick={onAddMeal}
        className="w-full mt-2"
        disabled={meals.length >= 5}
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Meal
      </Button>
    </div>
  );
};