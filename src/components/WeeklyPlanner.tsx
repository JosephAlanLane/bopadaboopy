import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomMealPlanList } from './CustomMealPlanList';
import { RecipeSection } from './RecipeSection';
import { GroceryList } from './GroceryList';
import { MealPlan, Recipe } from '@/types/recipe';

export interface WeeklyPlannerProps {
  defaultTab?: string;
  mealPlan: MealPlan;
  onRemoveMeal: (day: string) => void;
  onUpdateMealPlan: (newMealPlan: MealPlan) => void;
  activeTab: "weekly" | "custom";
  setActiveTab: (tab: "weekly" | "custom") => void;
  customMeals: (Recipe | null)[];
  setCustomMeals: (meals: (Recipe | null)[]) => void;
}

export const WeeklyPlanner = ({ 
  defaultTab = "weekly",
  mealPlan,
  onRemoveMeal,
  onUpdateMealPlan,
  activeTab,
  setActiveTab,
  customMeals,
  setCustomMeals
}: WeeklyPlannerProps) => {
  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="weekly">Weekly Meal Plan</TabsTrigger>
        <TabsTrigger value="custom">Custom Tab</TabsTrigger>
        <TabsTrigger value="grocery">Grocery List</TabsTrigger>
      </TabsList>
      <TabsContent value="weekly">
        <RecipeSection onAddRecipe={(recipe) => {
          if (activeTab === "weekly") {
            // Handle weekly meal plan logic
          }
        }} />
      </TabsContent>
      <TabsContent value="custom">
        <CustomMealPlanList 
          meals={customMeals}
          onRemoveMeal={(index) => {
            const newMeals = [...customMeals];
            newMeals[index] = null;
            setCustomMeals(newMeals);
          }}
          onDrop={(index, recipe) => {
            const newMeals = [...customMeals];
            newMeals[index] = recipe;
            setCustomMeals(newMeals);
          }}
          onDragStart={() => {}}
        />
      </TabsContent>
      <TabsContent value="grocery">
        <GroceryList 
          mealPlan={mealPlan}
          customMeals={customMeals}
          activeTab={activeTab}
        />
      </TabsContent>
    </Tabs>
  );
};