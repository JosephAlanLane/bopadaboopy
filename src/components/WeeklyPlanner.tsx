import React from "react";
import { Recipe, DayOfWeek, MealPlan } from "@/types/recipe";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { X } from "lucide-react";
import { useToast } from "./ui/use-toast";

interface WeeklyPlannerProps {
  mealPlan: MealPlan;
  onRemoveMeal: (day: DayOfWeek) => void;
}

interface GroceryItem {
  amount: number;
  unit?: string;
}

const DAYS: DayOfWeek[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const WeeklyPlanner = ({ mealPlan, onRemoveMeal }: WeeklyPlannerProps) => {
  const { toast } = useToast();

  const handleShare = (method: "sms" | "email" | "copy") => {
    const list = generateGroceryList();
    const text = Object.entries(list)
      .map(([item, { amount, unit }]) => `${amount}${unit ? ` ${unit}` : ''} ${item}`)
      .join("\n");

    switch (method) {
      case "sms":
        window.open(`sms:?body=${encodeURIComponent(text)}`);
        break;
      case "email":
        window.open(
          `mailto:?subject=Grocery List&body=${encodeURIComponent(text)}`
        );
        break;
      case "copy":
        navigator.clipboard.writeText(text);
        toast({
          title: "Copied to clipboard",
          description: "Your grocery list has been copied to your clipboard.",
          className: "bg-white",
        });
        break;
    }
  };

  const generateGroceryList = () => {
    const groceries: { [key: string]: GroceryItem & { itemName: string } } = {};
    
    Object.values(mealPlan).forEach((recipe) => {
      if (!recipe) return;
      recipe.ingredients.forEach(({ amount, item, unit }) => {
        const key = `${item.toLowerCase()}_${unit || ''}`;
        const numericAmount = parseFloat(amount) || 0;
        
        if (groceries[key]) {
          groceries[key].amount += numericAmount;
        } else {
          groceries[key] = { 
            amount: numericAmount, 
            unit,
            itemName: item 
          };
        }
      });
    });

    const displayList: { [key: string]: GroceryItem } = {};
    Object.entries(groceries).forEach(([_key, value]) => {
      displayList[value.itemName] = {
        amount: Math.round(value.amount * 100) / 100,
        unit: value.unit
      };
    });

    return displayList;
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-lg shadow-sm sticky top-4 max-h-[calc(100vh-2rem)]">
      <div className="flex-1 overflow-auto">
        <h2 className="font-semibold p-3 border-b">Weekly Meal Plan</h2>
        <div className="space-y-1 p-2">
          {DAYS.map((day) => (
            <div
              key={day}
              className="p-2 bg-gray-50 rounded flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-medium w-20">{day}:</span>
                <span className="truncate text-gray-600">
                  {mealPlan[day]?.title || "No meal planned"}
                </span>
              </div>
              {mealPlan[day] && (
                <button
                  onClick={() => onRemoveMeal(day)}
                  className="text-gray-400 hover:text-gray-600 ml-2 flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="p-3 border-t">
        <h2 className="font-semibold mb-2">Grocery List</h2>
        <ScrollArea className="h-32 rounded border bg-gray-50 p-2">
          {Object.entries(generateGroceryList()).map(([item, { amount, unit }]) => (
            <div key={item} className="flex justify-between py-1 text-sm">
              <span>{item}</span>
              <span className="text-gray-600">
                {amount}{unit ? ` ${unit}` : ''}
              </span>
            </div>
          ))}
        </ScrollArea>
        <div className="flex gap-2 mt-3">
          <Button
            variant="outline"
            className="flex-1 bg-primary text-white hover:bg-primary/90"
            onClick={() => handleShare("sms")}
          >
            Text
          </Button>
          <Button
            variant="outline"
            className="flex-1 bg-primary text-white hover:bg-primary/90"
            onClick={() => handleShare("email")}
          >
            Email
          </Button>
          <Button
            variant="outline"
            className="flex-1 bg-primary text-white hover:bg-primary/90"
            onClick={() => handleShare("copy")}
          >
            Copy
          </Button>
        </div>
      </div>
    </div>
  );
};
