import React, { useState } from "react";
import { Recipe, DayOfWeek, MealPlan } from "@/types/recipe";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { useToast } from "./ui/use-toast";
import MealPlanDay from "./MealPlanDay";
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
  const [draggedMeal, setDraggedMeal] = useState<{ day: DayOfWeek | string, recipe: Recipe } | null>(null);
  const [customPortions, setCustomPortions] = useState<{ [key: string]: number }>({});

  const handleDrop = (day: DayOfWeek, recipe: Recipe) => {
    if (draggedMeal) {
      const updatedMealPlan = { ...mealPlan };
      
      // If dragging from custom meals to weekly plan
      if (typeof draggedMeal.day === 'string' && !DAYS.includes(draggedMeal.day as DayOfWeek)) {
        updatedMealPlan[day] = draggedMeal.recipe;
        const customIndex = parseInt(draggedMeal.day.replace('Meal ', '')) - 1;
        const newCustomMeals = [...customMeals];
        newCustomMeals[customIndex] = null;
        setCustomMeals(newCustomMeals);
        
        // Transfer custom portion if it exists
        if (customPortions[draggedMeal.day]) {
          setCustomPortions(prev => ({
            ...prev,
            [day]: prev[draggedMeal.day],
            [draggedMeal.day]: undefined
          }));
        }
      } else {
        // If dragging between weekly plan days
        const sourceDay = draggedMeal.day as DayOfWeek;
        updatedMealPlan[sourceDay] = mealPlan[day];
        updatedMealPlan[day] = draggedMeal.recipe;
        
        // Swap custom portions if they exist
        const updatedPortions = { ...customPortions };
        if (customPortions[sourceDay] || customPortions[day]) {
          const tempPortion = customPortions[sourceDay];
          updatedPortions[sourceDay] = customPortions[day];
          updatedPortions[day] = tempPortion;
          setCustomPortions(updatedPortions);
        }
      }
      
      // Clean up null values
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
    
    // Clean up custom portion when removing a custom meal
    const mealKey = `Meal ${index + 1}`;
    if (customPortions[mealKey]) {
      const updatedPortions = { ...customPortions };
      delete updatedPortions[mealKey];
      setCustomPortions(updatedPortions);
    }
  };

  const handleServingsChange = (day: DayOfWeek | string, servings: number) => {
    console.log('Updating servings for day:', day, 'to:', servings);
    setCustomPortions(prev => ({
      ...prev,
      [day]: servings
    }));
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
              <SaveMealPlanButton mealPlan={mealPlan} customMeals={customMeals} activeTab={activeTab} />
            </div>

            <div className="mt-4">
              <TabsContent value="weekly" className="m-0">
                <div className="space-y-1">
                  {DAYS.map((day) => (
                    <MealPlanDay
                      key={day}
                      day={day}
                      recipe={mealPlan[day] || null}
                      onRemove={() => {
                        onRemoveMeal(day);
                        // Clear custom portion when removing a meal
                        if (customPortions[day]) {
                          const updatedPortions = { ...customPortions };
                          delete updatedPortions[day];
                          setCustomPortions(updatedPortions);
                        }
                      }}
                      onDrop={(recipe) => handleDrop(day, recipe)}
                      onDragStart={(day, recipe) => setDraggedMeal({ day, recipe })}
                      onServingsChange={(servings) => handleServingsChange(day, servings)}
                      customServings={customPortions[day]}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="custom" className="m-0">
                <CustomMealPlanList
                  meals={customMeals}
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
        customPortions={customPortions}
      />
    </div>
  );
};