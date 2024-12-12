import React from 'react';
import { MealPlanActions } from './MealPlanActions';
import { MealPlanPreview } from './MealPlanPreview';
import { MealPlanDialog } from './MealPlanDialog';
import { useMealPlan } from '@/hooks/useMealPlan';
import { MealPlanCardProps } from '@/types/meal-plan';

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
}: MealPlanCardProps) => {
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