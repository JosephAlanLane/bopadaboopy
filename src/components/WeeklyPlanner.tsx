import { Recipe, DayOfWeek, MealPlan } from "@/types/recipe";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { X } from "lucide-react";
import { useToast } from "./ui/use-toast";

interface WeeklyPlannerProps {
  mealPlan: MealPlan;
  onRemoveMeal: (day: DayOfWeek) => void;
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
      .map(([item, amount]) => `${amount} ${item}`)
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
        });
        break;
    }
  };

  const generateGroceryList = () => {
    const groceries: { [key: string]: string } = {};
    
    Object.values(mealPlan).forEach((recipe) => {
      if (!recipe) return;
      recipe.ingredients.forEach(({ amount, item }) => {
        if (groceries[item]) {
          // For this example, we'll just keep the larger amount
          groceries[item] = amount;
        } else {
          groceries[item] = amount;
        }
      });
    });

    return groceries;
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1">
        <h2 className="font-semibold mb-4">Weekly Meal Plan</h2>
        <div className="space-y-2">
          {DAYS.map((day) => (
            <div
              key={day}
              className="p-2 bg-white rounded border flex items-center justify-between"
            >
              <div>
                <p className="font-medium">{day}</p>
                {mealPlan[day] ? (
                  <p className="text-sm text-gray-600">{mealPlan[day]?.title}</p>
                ) : (
                  <p className="text-sm text-gray-400">No meal planned</p>
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

      <div className="mt-4">
        <h2 className="font-semibold mb-4">Grocery List</h2>
        <ScrollArea className="h-48 rounded border p-4">
          {Object.entries(generateGroceryList()).map(([item, amount]) => (
            <div key={item} className="flex justify-between py-1">
              <span>{item}</span>
              <span className="text-gray-600">{amount}</span>
            </div>
          ))}
        </ScrollArea>
        <div className="flex gap-2 mt-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => handleShare("sms")}
          >
            Text
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => handleShare("email")}
          >
            Email
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => handleShare("copy")}
          >
            Copy
          </Button>
        </div>
      </div>
    </div>
  );
};
