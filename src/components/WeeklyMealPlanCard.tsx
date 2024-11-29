import React, { useEffect } from 'react';
import { Recipe, DayOfWeek } from '@/types/recipe';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from '@/contexts/AuthContext';
import { HeartButton } from './HeartButton';
import { MealPlanRecipeGrid } from './MealPlanRecipeGrid';

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
  isSaved: initialIsSaved,
  onToggleSave
}: WeeklyMealPlanCardProps) => {
  const [showDialog, setShowDialog] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(initialIsSaved || false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const checkIfSaved = async () => {
      if (!user) return;
      
      try {
        console.log('Checking if meal plan is saved:', id);
        const { data, error } = await supabase
          .from('saved_meal_plans')
          .select('id')
          .eq('user_id', user.id)
          .eq('title', title)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error checking saved status:', error);
          return;
        }

        const saved = !!data;
        console.log('Meal plan saved status:', saved);
        setIsSaved(saved);
      } catch (error) {
        console.error('Error checking saved status:', error);
      }
    };

    checkIfSaved();
  }, [user, id, title]);

  const handleLoadMeals = async () => {
    console.log('Loading meals, user:', user);
    if (!user) {
      console.log('No user, redirecting to login');
      navigate('/login');
      return;
    }

    const mealPlanObject: { [key in DayOfWeek]?: Recipe } = {};
    recipes.forEach((recipe, index) => {
      if (index < DAYS.length) {
        mealPlanObject[DAYS[index]] = recipe;
      }
    });
    
    localStorage.setItem('selectedMealPlan', JSON.stringify(mealPlanObject));
    navigate('/');
  };

  const handleToggleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Toggle save clicked, user:', user);
    
    if (!user) {
      console.log('No user, redirecting to login');
      navigate('/login');
      return;
    }

    setIsLoading(true);
    try {
      // Check if the meal plan is already saved
      const { data: existingPlan, error: checkError } = await supabase
        .from('saved_meal_plans')
        .select('id')
        .eq('user_id', user.id)
        .eq('title', title)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('Error checking existing plan:', checkError);
        throw checkError;
      }

      if (existingPlan) {
        // If the plan exists, delete it
        console.log('Removing meal plan:', existingPlan.id);
        const { error: deleteError } = await supabase
          .from('saved_meal_plans')
          .delete()
          .eq('user_id', user.id)
          .eq('title', title);

        if (deleteError) {
          console.error('Delete error:', deleteError);
          throw deleteError;
        }

        setIsSaved(false);
        toast({
          title: "Meal plan removed from saved",
        });
      } else {
        // If the plan doesn't exist, save it
        console.log('Saving meal plan with data:', {
          user_id: user.id,
          title,
          description,
          recipes,
        });
        
        const { error: insertError } = await supabase
          .from('saved_meal_plans')
          .insert({
            user_id: user.id,
            title,
            description,
            recipes,
            is_public: false
          });

        if (insertError) {
          console.error('Insert error:', insertError);
          throw insertError;
        }

        setIsSaved(true);
        toast({
          title: "Meal plan saved!",
        });
      }
      
      if (onToggleSave) {
        console.log('Calling onToggleSave callback');
        onToggleSave();
      }
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
          <HeartButton 
            isSaved={isSaved}
            isLoading={isLoading}
            onClick={handleToggleSave}
          />
        )}
        
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">{title}</h3>
          {description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{description}</p>
          )}
          <MealPlanRecipeGrid recipes={recipes} />
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