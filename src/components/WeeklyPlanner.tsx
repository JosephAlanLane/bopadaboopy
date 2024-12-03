import React, { useState } from "react";
import { Recipe, DayOfWeek, MealPlan } from "@/types/recipe";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { useToast } from "./ui/use-toast";
import { MealPlanDay } from "./MealPlanDay";
import { SaveMealPlanButton } from "./SaveMealPlanButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { CustomMealPlanList } from "./CustomMealPlanList";
import { GroceryList } from "./GroceryList";

const DAYS: DayOfWeek[] = [
  "Monday", "Tuesday", "Wednesday", "Thursday",
  "Friday", "Saturday", "Sunday"
];

interface WeeklyPlannerProps {
  mealPlan: MealPlan;
  onRemoveMeal: (day: DayOfWeek) => void;
  onUpdateMealPlan: (newMealPlan: MealPlan) => void;
  activeTab: "weekly" | "custom";
  setActiveTab: (tab: "weekly" | "custom") => void;
  customMeals: (Recipe | null)[];
  setCustomMeals: (meals: (Recipe | null)[]) => void;
}

export const WeeklyPlanner = ({ 
  mealPlan, 
  onRemoveMeal, 
  onUpdateMealPlan,
  activeTab,
  setActiveTab,
  customMeals,
  setCustomMeals
}: WeeklyPlannerProps) => {
  const { toast } = useToast();
  const [draggedMeal, setDraggedMeal] = useState<{ day: DayOfWeek | string, recipe: Recipe } | null>(null);

  const handleDrop = (day: DayOfWeek, recipe: Recipe) => {
    if (draggedMeal) {
      const updatedMealPlan = { ...mealPlan };
      if (typeof draggedMeal.day === 'string' && !DAYS.includes(draggedMeal.day as DayOfWeek)) {
        updatedMealPlan[day] = draggedMeal.recipe;
        const customIndex = parseInt(draggedMeal.day.replace('Meal ', '')) - 1;
        const newCustomMeals = [...customMeals];
        newCustomMeals[customIndex] = null;
        setCustomMeals(newCustomMeals);
      } else {
        updatedMealPlan[draggedMeal.day as DayOfWeek] = mealPlan[day];
        updatedMealPlan[day] = draggedMeal.recipe;
      }
      Object.entries(updatedMealPlan).forEach(([d, r]) => {
        if (r === null) delete updatedMealPlan[d as DayOfWeek];
      });
      onUpdateMealPlan(updatedMealPlan);
    } else {
      onUpdateMealPlan({
        ...mealPlan,
        [day]: recipe,
      });
    }
    setDraggedMeal(null);
  };

  const handleCustomDrop = (index: number, recipe: Recipe) => {
    const newMeals = [...customMeals];
    newMeals[index] = recipe;
    setCustomMeals(newMeals);
  };

  const handleAddCustomMeal = () => {
    setCustomMeals([...customMeals, null]);
  };

  const handleRemoveCustomMeal = (index: number) => {
    const newMeals = customMeals.filter((_, i) => i !== index);
    setCustomMeals(newMeals);
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-lg shadow-sm dark:bg-gray-800 w-full mt-4 md:mt-0">
      <div className="flex-1">
        <div className="px-3 pt-3">
          <Tabs value={activeTab} onValueChange={(value: "weekly" | "custom") => setActiveTab(value)} className="flex-1">
            <div className="flex items-center justify-between gap-4">
              <TabsList className="w-[320px]">
                <TabsTrigger value="weekly" className="flex-1">Weekly Meal Plan</TabsTrigger>
                <TabsTrigger value="custom" className="flex-1">Custom</TabsTrigger>
              </TabsList>
              <SaveMealPlanButton mealPlan={mealPlan} />
            </div>

            <div className="mt-4">
              <TabsContent value="weekly" className="m-0">
                <ScrollArea className="h-[calc(100vh-450px)]">
                  <div className="space-y-1">
                    {DAYS.map((day) => (
                      <MealPlanDay
                        key={day}
                        day={day}
                        recipe={mealPlan[day] || null}
                        onRemove={() => onRemoveMeal(day)}
                        onDrop={(recipe) => handleDrop(day, recipe)}
                        onDragStart={(day, recipe) => setDraggedMeal({ day, recipe })}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="custom" className="m-0">
                <CustomMealPlanList
                  meals={customMeals}
                  onAddMeal={handleAddCustomMeal}
                  onRemoveMeal={handleRemoveCustomMeal}
                  onDrop={handleCustomDrop}
                  onDragStart={(index, recipe) => setDraggedMeal({ day: `Meal ${index + 1}`, recipe })}
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>

      <GroceryList 
        mealPlan={mealPlan}
        customMeals={customMeals}
        activeTab={activeTab}
      />
    </div>
  );
};