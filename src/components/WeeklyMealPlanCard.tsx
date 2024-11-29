import React from 'react';
import { Recipe, DayOfWeek } from '@/types/recipe';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heart } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@supabase/auth-helpers-react";

interface WeeklyMealPlanCardProps {
  id: string;
  title: string;
  recipes: any;
  description?: string;
  showHeart?: boolean;
  isSaved?: boolean;
  onToggleSave?: () => void;
}

const DAYS: DayOfWeek[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const WeeklyMealPlanCard = ({ 
  id,
  title, 
  recipes,
  description,
  showHeart,
  isSaved,
  onToggleSave
}: WeeklyMealPlanCardProps) => {
  const [showDialog, setShowDialog] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = useAuth();

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

  const handleToggleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to be logged in to save meal plans",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      if (isSaved) {
        const { error } = await supabase
          .from('saved_meal_plans')
          .delete()
          .eq('id', id)
          .eq('user_id', user.id);

        if (error) throw error;

        toast({
          title: "Meal plan removed from saved",
        });
      } else {
        const { error } = await supabase
          .from('saved_meal_plans')
          .insert({
            id,
            user_id: user.id,
            title,
            description,
            recipes,
          });

        if (error) throw error;

        toast({
          title: "Meal plan saved!",
        });
      }
      
      onToggleSave?.();
    } catch (error) {
      console.error('Error toggling save:', error);
      toast({
        title: "Error saving meal plan",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div 
        onClick={() => setShowDialog(true)}
        className="relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02] cursor-pointer border border-gray-200 dark:border-gray-700"
      >
        {showHeart && (
          <button
            onClick={handleToggleSave}
            disabled={isLoading}
            className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 transition-colors"
          >
            <Heart 
              className={`w-5 h-5 transition-colors ${
                isSaved 
                  ? 'text-red-500 fill-red-500' 
                  : 'text-gray-400 dark:text-gray-500'
              }`} 
            />
          </button>
        )}
        
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">{title}</h3>
          {description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{description}</p>
          )}
          <div className="grid grid-cols-7 gap-2">
            {Object.values(recipes).map((recipe: Recipe, index: number) => (
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