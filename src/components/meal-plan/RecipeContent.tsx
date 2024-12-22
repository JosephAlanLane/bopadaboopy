import React from "react";
import { Recipe } from "@/types/recipe";
import { Users, X } from "lucide-react";

interface RecipeContentProps {
  recipe: Recipe;
  localServings: number;
  onOpenServingsDialog: () => void;
  onRemove: () => void;
}

export const RecipeContent = ({
  recipe,
  localServings,
  onOpenServingsDialog,
  onRemove,
}: RecipeContentProps) => {
  return (
    <div className="absolute right-2 flex items-center space-x-2">
      <div className="flex items-center space-x-1">
        <button
          onClick={onOpenServingsDialog}
          className="hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded-full flex items-center gap-1"
        >
          <Users className="w-3 h-3 text-gray-500 dark:text-gray-400" />
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {localServings}
          </span>
        </button>
      </div>
      <button
        onClick={onRemove}
        className="hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded-full"
      >
        <X className="w-3 h-3 text-gray-500 dark:text-gray-400" />
      </button>
    </div>
  );
};