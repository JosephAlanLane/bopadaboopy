import { Recipe } from './recipe';

export interface MealPlanCardProps {
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

export interface MealPlanHookResult {
  isLoading: boolean;
  isSaved: boolean;
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
  handleLoadMeals: () => Promise<void>;
  handleDelete: (e: React.MouseEvent) => void;
  handleShare: (e: React.MouseEvent) => void;
  handleToggleSave: () => void;
}