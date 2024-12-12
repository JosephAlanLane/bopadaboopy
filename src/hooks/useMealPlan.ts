import { Recipe } from '@/types/recipe';
import { useMealPlanState } from './useMealPlanState';
import { useMealPlanActions } from './useMealPlanActions';
import { useMealPlanToggle } from './useMealPlanToggle';

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
  const {
    showDialog,
    setShowDialog,
    isLoading,
    setIsLoading,
    isSaved,
    setIsSaved
  } = useMealPlanState(initialIsSaved);

  const {
    handleLoadMeals,
    handleShare,
    handleDelete
  } = useMealPlanActions(id, title, recipes, is_weekly, slug, onToggleSave);

  const handleToggleSave = useMealPlanToggle(
    title,
    recipes,
    is_weekly,
    onToggleSave,
    setIsLoading,
    setIsSaved
  );

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