import React, { useCallback } from 'react';
import { Recipe } from '@/types/recipe';
import { RecipeFilters } from './RecipeFilters';
import { RecipeGrid } from './RecipeGrid';
import { usePaginatedRecipes } from '@/hooks/usePaginatedRecipes';
import { useRecipeSorting } from '@/hooks/useRecipeSorting';
import { useToast } from './ui/use-toast';
import { trackRecipeUsage } from '@/utils/recipeUtils';
import { AddRecipeDialog } from './AddRecipeDialog';

interface RecipeSectionProps {
  onAddRecipe: (recipe: Recipe) => void;
  className?: string;
}

export const RecipeSection = React.memo(({ onAddRecipe, className = '' }: RecipeSectionProps) => {
  const { toast } = useToast();
  const { sortBy, isAscending, handleSortChange, handleDirectionChange } = useRecipeSorting();
  const [filters, setFilters] = React.useState({
    search: '',
    cuisines: [] as string[],
    allergens: [] as string[],
    maxIngredients: 20,
    category: undefined as string | undefined,
    source: undefined as string | undefined,
  });

  const {
    recipes,
    isLoading,
    hasMore,
    loadMore,
    refetch,
    isFetchingNextPage
  } = usePaginatedRecipes(
    filters.search,
    sortBy,
    isAscending,
    {
      cuisines: filters.cuisines,
      allergens: filters.allergens,
      maxIngredients: filters.maxIngredients,
      category: filters.category,
      source: filters.source,
    }
  );

  const handleAddRecipeWithTracking = useCallback(async (recipe: Recipe) => {
    try {
      await trackRecipeUsage(recipe.id);
      onAddRecipe(recipe);
      await refetch();
    } catch (error) {
      console.error('Error tracking recipe usage:', error);
      onAddRecipe(recipe);
    }
  }, [onAddRecipe, refetch]);

  const handleApplyFilters = useCallback((newFilters: typeof filters) => {
    console.log('Applying filters:', newFilters);
    setFilters(newFilters);
  }, []);

  return (
    <div className={`flex-1 min-w-0 space-y-4 ${className}`}>
      <div className="flex justify-between items-center mt-8 mb-6">
        <h2 className="text-2xl font-semibold">Recipes</h2>
        <AddRecipeDialog />
      </div>
      <RecipeFilters onApplyFilters={handleApplyFilters} />
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm border-0">
        <RecipeGrid 
          recipes={recipes}
          onAddRecipe={handleAddRecipeWithTracking}
          onSortChange={handleSortChange}
          onDirectionChange={handleDirectionChange}
          sortBy={sortBy}
          isAscending={isAscending}
          hasMore={hasMore}
          onLoadMore={loadMore}
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
    </div>
  );
});

RecipeSection.displayName = 'RecipeSection';