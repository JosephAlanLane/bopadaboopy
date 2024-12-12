import React, { useCallback, useMemo } from 'react';
import { Recipe } from '@/types/recipe';
import { RecipeFilters } from './RecipeFilters';
import { RecipeGrid } from './RecipeGrid';
import { usePaginatedRecipes } from '@/hooks/usePaginatedRecipes';
import { useRecipeFilters } from '@/hooks/useRecipeFilters';
import { useRecipeSorting } from '@/hooks/useRecipeSorting';
import { useToast } from './ui/use-toast';
import { trackRecipeUsage } from '@/utils/recipeUtils';

interface RecipeSectionProps {
  onAddRecipe: (recipe: Recipe) => void;
}

export const RecipeSection = ({ onAddRecipe }: RecipeSectionProps) => {
  const { toast } = useToast();
  const { sortBy, isAscending, handleSortChange, handleDirectionChange } = useRecipeSorting();

  const {
    recipes,
    isLoading,
    hasMore,
    loadMore,
    refetch,
    isFetchingNextPage
  } = usePaginatedRecipes(searchQuery, sortBy, isAscending);

  const {
    searchQuery,
    filteredRecipes,
    filtersApplied,
    handleApplyFilters
  } = useRecipeFilters(recipes);

  // Memoize filtered recipes to prevent unnecessary recalculations
  const currentFilteredRecipes = useMemo(() => {
    if (!filtersApplied) return recipes;
    return filteredRecipes;
  }, [recipes, filteredRecipes, filtersApplied]);

  // Memoize the add recipe handler
  const handleAddRecipeWithTracking = useCallback(async (recipe: Recipe) => {
    try {
      await trackRecipeUsage(recipe.id);
      onAddRecipe(recipe);
      await refetch();
    } catch (error) {
      console.error('Error tracking recipe usage:', error);
      // Still add the recipe even if tracking fails
      onAddRecipe(recipe);
    }
  }, [onAddRecipe, refetch]);

  return (
    <div className="flex-1 min-w-0 space-y-4">
      <RecipeFilters onApplyFilters={handleApplyFilters} />
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm border-0">
        <RecipeGrid 
          recipes={currentFilteredRecipes}
          onAddRecipe={handleAddRecipeWithTracking}
          onSortChange={handleSortChange}
          onDirectionChange={handleDirectionChange}
          sortBy={sortBy}
          isAscending={isAscending}
          hasMore={!filtersApplied && hasMore}
          onLoadMore={loadMore}
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
    </div>
  );
};