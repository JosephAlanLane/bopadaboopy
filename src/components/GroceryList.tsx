import React, { useState, useEffect, useCallback } from "react";
import { Recipe, MealPlan } from "@/types/recipe";
import { useToast } from "./ui/use-toast";
import { generateGroceryList, getNextDate } from "@/utils/groceryUtils";
import { GroceryListHeader } from "./grocery/GroceryListHeader";
import { GroceryListContent } from "./grocery/GroceryListContent";
import { GroceryListActions } from "./grocery/GroceryListActions";

interface GroceryListProps {
  mealPlan: MealPlan;
  customMeals: (Recipe | null)[];
  activeTab: "weekly" | "custom";
  customServings?: { [key: string]: number };
}

export const GroceryList = ({ 
  mealPlan, 
  customMeals, 
  activeTab,
  customServings = {} 
}: GroceryListProps) => {
  const [globalServings, setGlobalServings] = useState(1);
  const [groceryItems, setGroceryItems] = useState<{[key: string]: any}>({});
  const { toast } = useToast();

  const getGroceryList = useCallback(() => {
    if (activeTab === "weekly") {
      return generateGroceryList(mealPlan, customServings);
    } else {
      const customMealPlan: MealPlan = {};
      customMeals.forEach((meal, index) => {
        if (meal) {
          customMealPlan[`Custom${index}` as any] = meal;
        }
      });
      return generateGroceryList(customMealPlan, customServings);
    }
  }, [mealPlan, customMeals, activeTab, customServings]);

  useEffect(() => {
    console.log('Updating grocery list with customServings:', customServings);
    const list = getGroceryList();
    console.log('Generated grocery list:', list);
    setGroceryItems(list);
  }, [getGroceryList]);

  const calculateAmount = useCallback((amount: number, recipeId: string | undefined) => {
    if (!recipeId) return amount;

    const customServing = customServings[recipeId];
    const recipe = Object.values(mealPlan).find(r => r?.id === recipeId) || 
                  customMeals.find(r => r?.id === recipeId);
    
    if (!recipe) return amount;

    const originalServings = recipe.servings || 1;
    
    if (customServing) {
      const multiplier = customServing / originalServings;
      console.log(`Calculating amount for recipe ${recipeId}:`, {
        amount,
        originalServings,
        customServing,
        multiplier,
        finalAmount: amount * multiplier
      });
      return amount * multiplier;
    }
    
    return amount;
  }, [mealPlan, customMeals, customServings]);

  const handleShare = (method: "sms" | "email" | "copy" | "calendar") => {
    const text = Object.entries(groceryItems)
      .map(([item, { amount, unit, recipeId }]) => {
        const adjustedAmount = calculateAmount(amount, recipeId);
        return `${adjustedAmount.toFixed(1)}${unit ? ` ${unit}` : ''} ${item}`;
      })
      .join("\n");

    switch (method) {
      case "sms": {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const smsUrl = isMobile
          ? `sms:?body=${encodeURIComponent(text)}`
          : `sms:&body=${encodeURIComponent(text)}`;
        window.location.href = smsUrl;
        break;
      }
      case "email": {
        const subject = "Weekly Meal Plan Grocery List";
        const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
        window.location.href = mailtoLink;
        break;
      }
      case "copy": {
        navigator.clipboard.writeText(text);
        toast({
          title: "Copied to clipboard",
          description: "Your grocery list has been copied to your clipboard.",
        });
        break;
      }
      case "calendar": {
        const events = Object.entries(activeTab === "weekly" ? mealPlan : {})
          .filter(([_, recipe]) => recipe !== null)
          .map(([day, recipe]) => {
            if (!recipe) return null;
            const ingredients = recipe.ingredients
              .map(ing => `${ing.amount} ${ing.unit || ''} ${ing.item}`)
              .join('\n');
            const description = `Ingredients:\n${ingredients}\n\nInstructions:\n${recipe.instructions.join('\n')}`;
            return `BEGIN:VEVENT
SUMMARY:${recipe.title}
DESCRIPTION:${description.replace(/\n/g, '\\n')}
DTSTART;VALUE=DATE:${getNextDate(day as any)}
DTEND;VALUE=DATE:${getNextDate(day as any)}
END:VEVENT`;
          })
          .filter(Boolean)
          .join('\n');

        const calendar = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Meal Planner//EN
${events}
END:VCALENDAR`;

        const blob = new Blob([calendar], { type: 'text/calendar' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'meal-plan.ics');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        break;
      }
    }
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
      />
      <GroceryListActions onShare={handleShare} />
    </div>
  );
};
