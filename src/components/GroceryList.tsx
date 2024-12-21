import React, { useState, useEffect } from "react";
import { Recipe, MealPlan } from "@/types/recipe";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { Slider } from "./ui/slider";
import { generateGroceryList, getNextDate } from "@/utils/groceryUtils";
import { useToast } from "./ui/use-toast";

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

  useEffect(() => {
    console.log('Updating grocery list with custom servings:', customServings);
    const list = getGroceryList();
    setGroceryItems(list);
  }, [mealPlan, customMeals, customServings, globalServings]);

  const getGroceryList = () => {
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
  };

  const handleShare = (method: "sms" | "email" | "copy" | "calendar") => {
    const text = Object.entries(groceryItems)
      .map(([item, { amount, unit, recipeId }]) => {
        const recipe = Object.values(mealPlan).find(r => r?.id === recipeId) || 
                      customMeals.find(r => r?.id === recipeId);
        const originalServings = recipe?.servings || 1;
        const hasCustomServing = recipeId && customServings[recipeId];
        const customMultiplier = hasCustomServing ? 
          (customServings[recipeId] / originalServings) : 1;
        const multiplier = hasCustomServing ? customMultiplier : globalServings;
        const adjustedAmount = (amount * multiplier).toFixed(1);
        const itemName = hasCustomServing ? `${item}*` : item;
        return `${adjustedAmount}${unit ? ` ${unit}` : ''} ${itemName}`;
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
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-semibold inline-flex items-center">Grocery List</h2>
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-500 dark:text-gray-400">Servings:</span>
          <Slider
            value={[globalServings]}
            onValueChange={(value) => setGlobalServings(value[0])}
            min={1}
            max={10}
            step={1}
            className="w-20"
          />
          <span className="text-xs text-gray-500 min-w-[20px] dark:text-gray-400">{globalServings}x</span>
        </div>
      </div>
      <ScrollArea className="h-40 rounded border bg-gray-50 p-4 dark:bg-gray-700 dark:border-gray-600">
        {Object.entries(groceryItems).map(([item, { amount, unit, recipeId }]) => {
          const recipe = Object.values(mealPlan).find(r => r?.id === recipeId) || 
                        customMeals.find(r => r?.id === recipeId);
          const originalServings = recipe?.servings || 1;
          const hasCustomServing = recipeId && customServings[recipeId];
          const customMultiplier = hasCustomServing ? 
            (customServings[recipeId] / originalServings) : 1;
          const multiplier = hasCustomServing ? customMultiplier : globalServings;
          
          return (
            <div key={item} className="flex justify-between py-1 text-sm">
              <span className="dark:text-gray-200">
                {item}
                {hasCustomServing && (
                  <span className="text-primary dark:text-primary-foreground">*</span>
                )}
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                {(amount * multiplier).toFixed(1)}{unit ? ` ${unit}` : ''}
              </span>
            </div>
          );
        })}
      </ScrollArea>
      <div className="flex flex-col gap-2 mt-4">
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1 bg-[#008C45] hover:bg-[#007038] text-gray-200 border border-gray-300"
            onClick={() => handleShare("sms")}
          >
            Text
          </Button>
          <Button
            variant="outline"
            className="flex-1 bg-white hover:bg-gray-50 text-gray-600 border border-gray-300 dark:bg-gray-200 dark:hover:bg-gray-300 dark:text-gray-700"
            onClick={() => handleShare("email")}
          >
            Email
          </Button>
          <Button
            variant="outline"
            className="flex-1 bg-[#CD212A] hover:bg-[#B91C1C] text-gray-200 border border-gray-300"
            onClick={() => handleShare("copy")}
          >
            Copy
          </Button>
        </div>
        <Button
          variant="outline"
          className="w-full border border-gray-300 dark:border-gray-600"
          onClick={() => handleShare("calendar")}
        >
          <CalendarIcon className="w-4 h-4 mr-2" />
          Add to Calendar
        </Button>
      </div>
    </div>
  );
};