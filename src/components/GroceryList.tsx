import React, { useState, useEffect, useCallback } from "react";
import { Recipe, MealPlan } from "@/types/recipe";
import { useToast } from "./ui/use-toast";
import { generateGroceryList } from "@/utils/groceryUtils";
import { GroceryListHeader } from "./grocery/GroceryListHeader";
import { GroceryListContent } from "./grocery/GroceryListContent";
import { GroceryListActions } from "./grocery/GroceryListActions";

interface GroceryListProps {
  mealPlan: MealPlan;
  customMeals: (Recipe | null)[];
  activeTab: "weekly" | "custom";
  customPortions: { [key: string]: number };
}

export const GroceryList = ({ 
  mealPlan, 
  customMeals, 
  activeTab,
  customPortions
}: GroceryListProps) => {
  const [globalServings, setGlobalServings] = useState(1);
  const [groceryItems, setGroceryItems] = useState<{[key: string]: any}>({});
  const { toast } = useToast();

  const getGroceryList = useCallback(() => {
    if (activeTab === "weekly") {
      return generateGroceryList(mealPlan, customPortions);
    } else {
      const customMealPlan: MealPlan = {};
      customMeals.forEach((meal, index) => {
        if (meal) {
          customMealPlan[`Custom${index}` as any] = meal;
        }
      });
      return generateGroceryList(customMealPlan, customPortions);
    }
  }, [mealPlan, customMeals, activeTab, customPortions]);

  useEffect(() => {
    console.log('Updating grocery list with customPortions:', customPortions);
    const list = getGroceryList();
    console.log('Generated grocery list:', list);
    setGroceryItems(list);
  }, [getGroceryList]);

  const calculateAmount = useCallback((amount: number, recipeId: string | undefined) => {
    return amount;
  }, []);

  return (
    <div className="mt-4 px-3 pb-3">
      <GroceryListHeader 
        globalServings={globalServings}
        setGlobalServings={setGlobalServings}
      />
      <GroceryListContent 
        groceryItems={groceryItems}
        calculateAmount={calculateAmount}
      />
      <GroceryListActions onShare={handleShare} />
    </div>
  );
};