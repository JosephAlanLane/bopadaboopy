import React from 'react';
import { Recipe, DayOfWeek } from '@/types/recipe';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { useNavigate } from 'react-router-dom';

const DAYS: DayOfWeek[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface MealPlanDialogProps {
  title: string;
  recipes: Recipe[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoadMeals: () => void;
  slug?: string;
  is_weekly?: boolean;
}

export const MealPlanDialog = ({
  title,
  recipes,
  open,
  onOpenChange,
  onLoadMeals,
  slug,
  is_weekly = true,
}: MealPlanDialogProps) => {
  const navigate = useNavigate();

  const handleLoadMeals = () => {
    if (slug) {
      // If we have a slug, use the new URL format
      console.log('Loading meal plan with slug:', slug);
      navigate(`/meal-plans/${slug}`);
    } else {
      // Otherwise, use the existing direct loading mechanism
      console.log('Using direct loading mechanism');
      onLoadMeals();
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh] px-1">
          <div className="space-y-4">
            <div className="grid gap-4">
              {recipes.map((recipe, index) => (
                <div key={index} className="flex items-center gap-4 p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <img 
                    src={recipe.image || 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop'} 
                    alt={recipe.title} 
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <h4 className="font-medium">{recipe.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {is_weekly && index < DAYS.length ? DAYS[index] : `Meal ${index + 1}`}: {recipe.cuisine}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end pt-4">
              <Button onClick={handleLoadMeals}>
                Load Meals into Planner
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};