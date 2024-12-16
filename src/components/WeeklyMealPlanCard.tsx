import React from 'react';
import { MealPlanActions } from './MealPlanActions';
import { MealPlanPreview } from './MealPlanPreview';
import { MealPlanDialog } from './MealPlanDialog';
import { useMealPlan } from '@/hooks/useMealPlan';
import { MealPlanCardProps } from '@/types/meal-plan';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

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
  slug,
  is_public = false
}: MealPlanCardProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const {
    isLoading,
    isSaved,
    showDialog,
    setShowDialog,
    handleLoadMeals,
    handleDelete,
    handleShare,
    handleToggleSave
  } = useMealPlan(
    id,
    title,
    recipes,
    initialIsSaved,
    is_weekly,
    slug,
    onToggleSave,
    onDelete
  );

  // Only show heart in discover tab (when showHeart is true and not saved)
  const shouldShowHeart = showHeart && !isSaved;
  
  // Only show delete button for saved plans
  const shouldShowDelete = isSaved;

  // Only show public toggle for user's own meal plans in the saved tab
  const shouldShowPublicToggle = isSaved && user?.id === recipes[0]?.user_id;

  const handlePublicToggle = async () => {
    try {
      const { error } = await supabase
        .from('saved_meal_plans')
        .update({ is_public: !is_public })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: !is_public ? "Meal plan shared publicly" : "Meal plan is now private",
        description: !is_public 
          ? "Others can now discover your meal plan" 
          : "Your meal plan is no longer visible to others",
      });

      if (onToggleSave) {
        onToggleSave();
      }
    } catch (error) {
      console.error('Error toggling meal plan visibility:', error);
      toast({
        title: "Error updating meal plan",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02] border border-gray-200 dark:border-gray-700">
        <div className="p-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
              {description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{description}</p>
              )}
            </div>
            <div className="flex items-center gap-4">
              {shouldShowPublicToggle && (
                <div className="flex items-center gap-2">
                  <Switch
                    id={`public-${id}`}
                    checked={is_public}
                    onCheckedChange={handlePublicToggle}
                  />
                  <Label htmlFor={`public-${id}`} className="text-sm">
                    Share Publicly
                  </Label>
                </div>
              )}
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleLoadMeals}
              >
                Load
              </Button>
            </div>
          </div>
          <MealPlanPreview 
            recipes={recipes}
            onClick={() => setShowDialog(true)}
          />
        </div>
        <MealPlanActions
          showHeart={shouldShowHeart}
          isSaved={isSaved}
          isLoading={isLoading}
          onToggleSave={handleToggleSave}
          onShare={handleShare}
          onDelete={shouldShowDelete ? handleDelete : undefined}
        />
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