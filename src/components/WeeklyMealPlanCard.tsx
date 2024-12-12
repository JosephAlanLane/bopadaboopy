import React, { useState, useEffect } from 'react';
import { Recipe } from '@/types/recipe';
import { useToast } from "./ui/use-toast";
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from "@/integrations/supabase/client";
import { MealPlanActions } from './MealPlanActions';
import { MealPlanPreview } from './MealPlanPreview';
import { MealPlanDialog } from './MealPlanDialog';

interface WeeklyMealPlanCardProps {
  id: string;
  title: string;
  recipes: Recipe[];
  description?: string;
  showHeart?: boolean;
  isSaved?: boolean;
  onToggleSave?: () => void;
  onDelete?: () => void;
  is_weekly?: boolean;
  slug?: string;
}

export const WeeklyMealPlanCard = ({ 
  id,
  title, 
  recipes,
  description,
  showHeart,
  isSaved: initialIsSaved,
  onToggleSave,
  onDelete,
  is_weekly = true,
  slug
}: WeeklyMealPlanCardProps) => {
  const [showDialog, setShowDialog] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(initialIsSaved || false);
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

  useEffect(() => {
    // Check if there's a meal plan slug in the URL
    const urlSlug = location.pathname.split('/').pop();
    if (urlSlug === slug) {
      handleLoadMeals();
    }
  }, [location]);

  const handleLoadMeals = async () => {
    if (!user && !location.pathname.includes('/shared/')) {
      navigate('/login');
      return;
    }

    const mealPlanObject = {};
    if (is_weekly) {
      recipes.forEach((recipe, index) => {
        if (index < 7) {
          const day = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][index];
          mealPlanObject[day] = recipe;
        }
      });
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

  const handleToggleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
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
            description,
            recipes,
            is_public: false,
            is_weekly: is_weekly
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

  return (
    <>
      <div className="relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02] cursor-pointer border border-gray-200 dark:border-gray-700">
        <MealPlanActions
          showHeart={showHeart}
          isSaved={isSaved}
          isLoading={isLoading}
          onToggleSave={handleToggleSave}
          onShare={handleShare}
          onDelete={handleDelete}
        />
        
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">{title}</h3>
          {description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{description}</p>
          )}
          <MealPlanPreview 
            recipes={recipes}
            onClick={() => setShowDialog(true)}
          />
        </div>
      </div>

      <MealPlanDialog
        title={title}
        recipes={recipes}
        open={showDialog}
        onOpenChange={setShowDialog}
        onLoadMeals={handleLoadMeals}
      />
    </>
  );
};