import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from "@/integrations/supabase/client";
import { Recipe } from '@/types/recipe';
import { MealPlanHookResult } from '@/types/meal-plan';

export const useMealPlan = (
  id: string,
  title: string,
  recipes: Recipe[],
  initialIsSaved: boolean = false,
  is_weekly: boolean = true,
  slug?: string,
  onToggleSave?: () => void,
  onDelete?: () => void,
) => {
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(initialIsSaved);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const checkIfSaved = async () => {
      if (!user) return;
      
      try {
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

        setIsSaved(!!data);
      } catch (error) {
        console.error('Error checking saved status:', error);
      }
    };

    checkIfSaved();
  }, [user, id, title]);

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
    setShowDialog(false);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }

    setIsLoading(true);
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

      if (onDelete) {
        onDelete();
      }
    } catch (error) {
      console.error('Error deleting meal plan:', error);
      toast({
        title: "Error deleting meal plan",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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

  const handleToggleSave = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setIsLoading(true);
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

        setIsSaved(false);
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

        setIsSaved(true);
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
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isSaved,
    showDialog,
    setShowDialog,
    handleLoadMeals,
    handleDelete,
    handleShare,
    handleToggleSave
  };
};