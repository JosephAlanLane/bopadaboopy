import React from 'react';
import { Share2, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { HeartButton } from './HeartButton';

interface MealPlanActionsProps {
  showHeart?: boolean;
  isSaved?: boolean;
  isLoading?: boolean;
  onToggleSave: () => void;
  onShare: (e: React.MouseEvent) => void;
  onDelete?: (e: React.MouseEvent) => void;
}

export const MealPlanActions = ({
  showHeart,
  isSaved,
  isLoading,
  onToggleSave,
  onShare,
  onDelete
}: MealPlanActionsProps) => {
  return (
    <div className="absolute top-2 right-2 z-10 flex gap-2">
      {showHeart && (
        <HeartButton 
          isSaved={isSaved}
          isLoading={isLoading}
          onClick={onToggleSave}
        />
      )}
      <Button
        variant="outline"
        size="icon"
        className="bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800"
        onClick={onShare}
      >
        <Share2 className="w-4 h-4" />
      </Button>
      {isSaved && onDelete && (
        <Button
          variant="outline"
          size="icon"
          className="bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 hover:text-red-500"
          onClick={onDelete}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};