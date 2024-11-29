import React from 'react';
import { Recipe, DayOfWeek } from '@/types/recipe';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { ScrollArea } from "@/components/ui/scroll-area";

interface WeeklyMealPlanCardProps {
  title: string;
  recipes: Recipe[];
}

const DAYS: DayOfWeek[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const WeeklyMealPlanCard = ({ title, recipes }: WeeklyMealPlanCardProps) => {
  const [showDialog, setShowDialog] = React.useState(false);
  const navigate = useNavigate();

  const handleLoadMeals = () => {
    // Create a properly structured meal plan object
    const mealPlanObject: { [key in DayOfWeek]?: Recipe } = {};
    
    // Map each recipe to a day of the week
    recipes.forEach((recipe, index) => {
      if (index < DAYS.length) {
        mealPlanObject[DAYS[index]] = recipe;
      }
    });
    
    // Store the meal plan in localStorage
    localStorage.setItem('selectedMealPlan', JSON.stringify(mealPlanObject));
    
    // Navigate to home page
    navigate('/');
  };

  return (
    <>
      <div 
        onClick={() => setShowDialog(true)}
        className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02] cursor-pointer border border-gray-200 dark:border-gray-700"
      >
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">{title}</h3>
          <div className="grid grid-cols-7 gap-2">
            {recipes.map((recipe, index) => (
              <div key={index} className="relative aspect-square">
                <img
                  src={recipe.image || 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop'}
                  alt={recipe.title}
                  className="w-full h-full object-cover rounded-md"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-md flex items-center justify-center">
                  <p className="text-white text-xs text-center px-1">{recipe.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
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
                        {DAYS[index]}: {recipe.cuisine}
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
    </>
  );
};