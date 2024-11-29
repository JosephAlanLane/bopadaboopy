import { useState } from "react";
import { Button } from "./ui/button";
import { Save } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MealPlan } from "@/types/recipe";
import { useSession } from "@supabase/auth-helpers-react";

interface SaveMealPlanButtonProps {
  mealPlan: MealPlan;
}

export const SaveMealPlanButton = ({ mealPlan }: SaveMealPlanButtonProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const session = useSession();

  const handleSave = async () => {
    if (!session?.user) {
      toast({
        title: "Please login",
        description: "You need to be logged in to save meal plans",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    try {
      const { error } = await supabase.from('saved_meal_plans').insert({
        user_id: session.user.id,
        title: "My Weekly Meal Plan",
        recipes: Object.values(mealPlan).filter(recipe => recipe !== null),
      });

      if (error) throw error;

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