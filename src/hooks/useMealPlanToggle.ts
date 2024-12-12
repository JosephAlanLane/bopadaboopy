import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from "@/integrations/supabase/client";
import { Recipe } from '@/types/recipe';

export const useMealPlanToggle = (
  title: string,
  recipes: Recipe[],
  is_weekly: boolean = true,
  onToggleSave?: () => void,
  setIsLoading?: (loading: boolean) => void,
  setIsSaved?: (saved: boolean) => void,
) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const handleToggleSave = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setIsLoading?.(true);
    try {
      const { data: existingPlan, error: checkError } = await supabase
        .from('saved_meal_plans')
        .select('id')
        .eq('user_id', user.id)
        .eq('title', title)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError;
      }

      if (existingPlan) {
        const { error: deleteError } = await supabase
          .from('saved_meal_plans')
          .delete()
          .eq('user_id', user.id)
          .eq('title', title);

        if (deleteError) throw deleteError;

        setIsSaved?.(false);
        toast({
          title: "Meal plan removed from saved",
        });
      } else {
        const { error: insertError } = await supabase
          .from('saved_meal_plans')
          .insert({
            user_id: user.id,
            title,
            recipes,
            is_public: false,
            is_weekly
          });

        if (insertError) throw insertError;

        setIsSaved?.(true);
        toast({
          title: "Meal plan saved!",
        });
      }
      
      if (onToggleSave) {
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
      setIsLoading?.(false);
    }
  };

  return handleToggleSave;
};