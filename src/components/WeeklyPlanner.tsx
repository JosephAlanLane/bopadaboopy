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
    <div className="h-full flex flex-col bg-white rounded-lg shadow-sm">
      <div className="flex-1">
        <h2 className="font-semibold mb-2 px-4 pt-4">Weekly Meal Plan</h2>
        <div className="space-y-1 px-4">
          {DAYS.map((day) => (
            <div
              key={day}
              className="p-2 bg-gray-50 rounded border flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <p className="font-medium w-16 text-sm">{day}</p>
                {mealPlan[day] ? (
                  <p className="text-sm text-gray-600 truncate">{mealPlan[day]?.title}</p>
                ) : (
                  <p className="text-sm text-gray-400 pl-2">No meal planned</p>
                )}
              </div>
              {mealPlan[day] && (
                <button
                  onClick={() => onRemoveMeal(day)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 px-4 pb-4">
        <h2 className="font-semibold mb-2">Grocery List</h2>
        <ScrollArea className="h-40 rounded border bg-gray-50 p-4">
          {Object.entries(generateGroceryList()).map(([item, { amount, unit }]) => (
            <div key={item} className="flex justify-between py-1 text-sm">
              <span>{item}</span>
              <span className="text-gray-600">
                {amount}{unit ? ` ${unit}` : ''}
              </span>
            </div>
          ))}
        </ScrollArea>
        <div className="flex gap-2 mt-4">
          <Button
            variant="outline"
            className="flex-1 bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => handleShare("sms")}
          >
            Text
          </Button>
          <Button
            variant="outline"
            className="flex-1 bg-primary text-white hover:bg-secondary"
            onClick={() => handleShare("email")}
          >
            Email
          </Button>
          <Button
            variant="outline"
            className="flex-1 bg-gray-500 text-white hover:bg-gray-600"
            onClick={() => handleShare("copy")}
          >
            Copy
          </Button>
        </div>
      </div>
    </div>
  );
};