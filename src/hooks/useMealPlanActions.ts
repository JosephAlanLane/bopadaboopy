import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from "@/integrations/supabase/client";
import { Recipe } from '@/types/recipe';

export const useMealPlanActions = (
  id: string,
  title: string,
  recipes: Recipe[],
  is_weekly: boolean = true,
  slug?: string,
  onToggleSave?: () => void,
) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const handleLoadMeals = async () => {
    if (!user && !location.pathname.includes('/shared/')) {
      navigate('/login');
      return;
    }

    localStorage.setItem('selectedMealPlan', JSON.stringify({
      meals: recipes,
      is_weekly: is_weekly
    }));
    
    navigate('/');
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const shareUrl = `${window.location.origin}/shared/${slug}`;
      
      if (navigator.share) {
        await navigator.share({
          title: 'Check out this meal plan!',
          text: `${title} - A meal plan`,
          url: shareUrl
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Link copied to clipboard",
          description: "You can now share this meal plan with others",
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const { error } = await supabase
        .from('saved_meal_plans')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "Meal plan deleted",
        description: "The meal plan has been removed from your saved plans",
      });

      if (onToggleSave) {
        onToggleSave();
      }
    } catch (error) {
      console.error('Error deleting meal plan:', error);
      toast({
        title: "Error deleting meal plan",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  return {
    handleLoadMeals,
    handleShare,
    handleDelete
  };
};