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
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
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
    
    // Apply global servings multiplier to all items
    const adjustedList: typeof list = {};
    Object.entries(list).forEach(([item, details]) => {
      adjustedList[item] = {
        ...details,
        amount: details.amount * globalServings
      };
    });
    
    setGroceryItems(adjustedList);
    // Initialize all items as selected
    setSelectedItems(new Set(Object.keys(adjustedList)));
  }, [getGroceryList, globalServings]);

  const calculateAmount = useCallback((amount: number) => {
    return amount;
  }, []);

  const handleShare = async (method: "sms" | "email" | "copy" | "calendar") => {
    const groceryText = Object.entries(groceryItems)
      .filter(([item]) => selectedItems.has(item))
      .map(([item, details]) => `${item}: ${details.amount}${details.unit ? ` ${details.unit}` : ''}`)
      .join('\n');

    switch (method) {
      case "copy":
        await navigator.clipboard.writeText(groceryText);
        toast({
          title: "Copied to clipboard",
          description: "Your selected grocery items have been copied to your clipboard",
        });
        break;
      case "email":
        window.location.href = `mailto:?subject=Grocery List&body=${encodeURIComponent(groceryText)}`;
        break;
      case "sms":
        window.location.href = `sms:?body=${encodeURIComponent(groceryText)}`;
        break;
      case "calendar":
        toast({
          title: "Coming soon",
          description: "Calendar integration will be available soon",
        });
        break;
    }
  };

  const handleItemToggle = (item: string) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(item)) {
        newSet.delete(item);
      } else {
        newSet.add(item);
      }
      return newSet;
    });
  };

  return (
    <div className="mt-4 px-3 pb-3">
      <GroceryListHeader 
        globalServings={globalServings}
        setGlobalServings={setGlobalServings}
      />
      <GroceryListContent 
        groceryItems={groceryItems}
        calculateAmount={calculateAmount}
        selectedItems={selectedItems}
        onItemToggle={handleItemToggle}
      />
      <GroceryListActions 
        onShare={handleShare}
        groceryItems={groceryItems}
      />
    </div>
  );
};