import React from "react";
import { Recipe, DayOfWeek, MealPlan } from "@/types/recipe";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Calendar as CalendarIcon } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { Slider } from "./ui/slider";
import { MealPlanDay } from "./MealPlanDay";
import { generateGroceryList, getNextDate } from "@/utils/groceryUtils";

interface WeeklyPlannerProps {
  mealPlan: MealPlan;
  onRemoveMeal: (day: DayOfWeek) => void;
}

const DAYS: DayOfWeek[] = [
  "Monday", "Tuesday", "Wednesday", "Thursday",
  "Friday", "Saturday", "Sunday"
];

export const WeeklyPlanner = ({ mealPlan, onRemoveMeal }: WeeklyPlannerProps) => {
  const { toast } = useToast();
  const [servings, setServings] = React.useState(1);
  const [draggedMeal, setDraggedMeal] = React.useState<{ day: DayOfWeek, recipe: Recipe } | null>(null);

  const handleDrop = (day: DayOfWeek, recipe: Recipe) => {
    if (draggedMeal) {
      // If we're dragging from another day, swap the meals
      const updatedMealPlan = { ...mealPlan };
      updatedMealPlan[draggedMeal.day] = mealPlan[day];
      updatedMealPlan[day] = draggedMeal.recipe;
      Object.entries(updatedMealPlan).forEach(([d, r]) => {
        if (r === null) delete updatedMealPlan[d as DayOfWeek];
      });
      setMealPlan(updatedMealPlan);
    } else {
      // If we're dragging from the recipe grid
      setMealPlan((prev) => ({
        ...prev,
        [day]: recipe,
      }));
    }
    setDraggedMeal(null);
  };

  const handleDragStart = (day: DayOfWeek, recipe: Recipe) => {
    setDraggedMeal({ day, recipe });
  };

  const handleShare = (method: "sms" | "email" | "copy" | "calendar") => {
    const list = generateGroceryList(mealPlan);
    const text = Object.entries(list)
      .map(([item, { amount, unit }]) => {
        const adjustedAmount = (amount * servings).toFixed(1);
        return `${adjustedAmount}${unit ? ` ${unit}` : ''} ${item}`;
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
        const events = Object.entries(mealPlan)
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
DTSTART;VALUE=DATE:${getNextDate(day)}
DTEND;VALUE=DATE:${getNextDate(day)}
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
    <div className="h-full flex flex-col bg-white rounded-lg shadow-sm dark:bg-gray-800 w-[380px] mt-4 md:mt-0">
      <div className="flex-1">
        <h2 className="font-semibold mb-2 px-4 pt-4">Weekly Meal Plan</h2>
        <div className="space-y-1 px-4">
          {DAYS.map((day) => (
            <MealPlanDay
              key={day}
              day={day}
              recipe={mealPlan[day] || null}
              onRemove={() => onRemoveMeal(day)}
              onDrop={(recipe) => handleDrop(day, recipe)}
              onDragStart={handleDragStart}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 px-4 pb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold inline-flex items-center">Grocery List</h2>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">Servings:</span>
            <Slider
              value={[servings]}
              onValueChange={(value) => setServings(value[0])}
              min={1}
              max={10}
              step={1}
              className="w-24"
            />
            <span className="text-xs text-gray-500 min-w-[20px] dark:text-gray-400">{servings}x</span>
          </div>
        </div>
        <ScrollArea className="h-40 rounded border bg-gray-50 p-4 dark:bg-gray-700 dark:border-gray-600">
          {Object.entries(generateGroceryList(mealPlan)).map(([item, { amount, unit }]) => (
            <div key={item} className="flex justify-between py-1 text-sm">
              <span className="dark:text-gray-200">{item}</span>
              <span className="text-gray-600 dark:text-gray-400">
                {(amount * servings).toFixed(1)}{unit ? ` ${unit}` : ''}
              </span>
            </div>
          ))}
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
    </div>
  );
};
