import React from "react";
import { Recipe, DayOfWeek, MealPlan } from "@/types/recipe";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { X } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { Slider } from "./ui/slider";

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
  const [servings, setServings] = React.useState(1);

  const handleShare = (method: "sms" | "email" | "copy") => {
    const list = generateGroceryList();
    const text = Object.entries(list)
      .map(([item, { amount, unit }]) => `${amount}${unit ? ` ${unit}` : ''} ${item}`)
      .join("\n");

    switch (method) {
      case "sms":
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const isMac = /Mac/i.test(navigator.userAgent);
        const smsUrl = `sms:?body=${encodeURIComponent(text)}`;
        const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(text)}`;
        const messagesUrl = `messages://compose?body=${encodeURIComponent(text)}`;
        
        if (isMobile) {
          // Try SMS first, then WhatsApp as fallback on mobile
          window.location.href = smsUrl;
          setTimeout(() => {
            window.location.href = whatsappUrl;
          }, 300);
        } else if (isMac) {
          // Use Messages app on macOS
          window.location.href = messagesUrl;
        } else {
          toast({
            title: "Device Not Supported",
            description: "Please use a mobile device or a Mac with Messages app to send SMS messages.",
            className: "bg-white",
          });
        }
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
    <div className="h-full flex flex-col bg-white rounded-lg shadow-sm dark:bg-gray-800">
      <div className="flex-1">
        <h2 className="font-semibold mb-2 px-4 pt-4">Weekly Meal Plan</h2>
        <div className="space-y-1 px-4">
          {DAYS.map((day) => (
            <div
              key={day}
              className="p-2 bg-gray-50 rounded border flex items-center justify-between dark:bg-gray-700 dark:border-gray-600"
            >
              <div className="flex items-center gap-4">
                <p className="font-medium w-16 text-sm">{day}</p>
                {mealPlan[day] ? (
                  <p className="text-sm text-gray-600 truncate dark:text-gray-300">{mealPlan[day]?.title}</p>
                ) : (
                  <p className="text-sm text-gray-400 pl-8 dark:text-gray-500">No meal planned</p>
                )}
              </div>
              {mealPlan[day] && (
                <button
                  onClick={() => onRemoveMeal(day)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 px-4 pb-4">
        <div className="flex items-center gap-6 mb-2">
          <h2 className="font-semibold">Grocery List</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Servings:</span>
            <Slider
              value={[servings]}
              onValueChange={(value) => setServings(value[0])}
              min={1}
              max={10}
              step={1}
              className="w-24"
            />
            <span className="text-sm text-gray-500 min-w-[20px] dark:text-gray-400">{servings}x</span>
          </div>
        </div>
        <ScrollArea className="h-40 rounded border bg-gray-50 p-4 dark:bg-gray-700 dark:border-gray-600">
          {Object.entries(generateGroceryList()).map(([item, { amount, unit }]) => (
            <div key={item} className="flex justify-between py-1 text-sm">
              <span className="dark:text-gray-200">{item}</span>
              <span className="text-gray-600 dark:text-gray-400">
                {(parseFloat(amount.toString()) * servings).toFixed(1)}{unit ? ` ${unit}` : ''}
              </span>
            </div>
          ))}
        </ScrollArea>
        <div className="flex gap-2 mt-4">
          <Button
            variant="outline"
            className="flex-1 bg-[#008C45] hover:bg-[#007038] text-gray-200 border-gray-300"
            onClick={() => handleShare("sms")}
          >
            Text
          </Button>
          <Button
            variant="outline"
            className="flex-1 bg-white hover:bg-gray-50 text-gray-600 border-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            onClick={() => handleShare("email")}
          >
            Email
          </Button>
          <Button
            variant="outline"
            className="flex-1 bg-[#CD212A] hover:bg-[#B91C1C] text-gray-200 border-gray-300"
            onClick={() => handleShare("copy")}
          >
            Copy
          </Button>
        </div>
      </div>
    </div>
  );
};
