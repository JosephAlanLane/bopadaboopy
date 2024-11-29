import { useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MealPlan } from "@/types/recipe";
import { useSession } from "@supabase/auth-helpers-react";
import { Save } from "lucide-react";

interface SaveMealPlanButtonProps {
  mealPlan: MealPlan;
}

export const SaveMealPlanButton = ({ mealPlan }: SaveMealPlanButtonProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const session = useSession();

  const handleSave = async () => {
    console.log('Save button clicked, session:', session); // Debug log

    if (!session?.user) {
      console.log('No session found'); // Debug log
      toast({
        title: "Please login",
        description: "You need to be logged in to save meal plans",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      console.log('Starting save process for user:', session.user.id); // Debug log
      
      // Convert recipes to a serializable array and remove null values
      const recipes = Object.values(mealPlan)
        .filter(recipe => recipe !== null)
        .map(recipe => ({
          id: recipe!.id,
          title: recipe!.title,
          image: recipe!.image,
          recipeUrl: recipe!.recipeUrl,
          ingredients: recipe!.ingredients.map(ing => ({
            amount: ing.amount,
            unit: ing.unit || null,
            item: ing.item
          })),
          instructions: recipe!.instructions,
          cuisine: recipe!.cuisine,
          allergens: recipe!.allergens,
          cook_time_minutes: recipe!.cook_time_minutes || null,
          servings: recipe!.servings || null,
          rating: recipe!.rating || null,
          category: recipe!.category || null
        }));

      console.log('Prepared recipes for save:', recipes); // Debug log

      const { data, error } = await supabase
        .from('saved_meal_plans')
        .insert({
          user_id: session.user.id,
          title: "My Weekly Meal Plan",
          recipes: recipes as any, // Type assertion needed due to Supabase's JSON type limitations
        })
        .select();

      if (error) {
        console.error('Supabase error:', error); // Debug log
        throw error;
      }

      console.log('Save successful:', data); // Debug log

      toast({
        title: "Meal plan saved!",
        description: "You can find it in your saved meal plans",
      });
    } catch (error) {
      console.error('Error saving meal plan:', error);
      toast({
        title: "Error saving meal plan",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleSave}
      disabled={isSaving}
      className="ml-2"
    >
      <Save className="w-4 h-4 mr-1" />
      Save
    </Button>
  );
};