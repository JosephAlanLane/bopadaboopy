import React, { useState, useCallback, useMemo } from 'react';
import { Recipe } from '@/types/recipe';
import { RecipeFilters } from './RecipeFilters';
import { RecipeGrid } from './RecipeGrid';
import { usePaginatedRecipes } from '@/hooks/usePaginatedRecipes';
import { useSortedRecipes } from '@/hooks/useSortedRecipes';
import { useToast } from './ui/use-toast';
import { trackRecipeUsage } from '@/utils/recipeUtils';

interface RecipeSectionProps {
  onAddRecipe: (recipe: Recipe) => void;
}

export const RecipeSection = ({ onAddRecipe }: RecipeSectionProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [sortBy, setSortBy] = useState<string>('rating');
  const [isAscending, setIsAscending] = useState(false);
  const { toast } = useToast();

  const {
    recipes,
    isLoading,
    hasMore,
    loadMore,
    refetch,
    isFetchingNextPage
  } = usePaginatedRecipes(searchQuery, sortBy, isAscending);

  // Memoize filtered recipes to prevent unnecessary recalculations
  const currentFilteredRecipes = useMemo(() => {
    if (!filtersApplied) return recipes;
    return filteredRecipes;
  }, [recipes, filteredRecipes, filtersApplied]);

  // Memoize the filter application function
  const handleApplyFilters = useCallback(({
    search,
    cuisines,
    allergens,
    maxIngredients,
    category,
  }: {
    search: string;
    cuisines: string[];
    allergens: string[];
    maxIngredients: number;
    category?: string;
  }) => {
    console.log('Applying filters:', { search, cuisines, allergens, maxIngredients, category });
    setSearchQuery(search);
    
    const shouldApplyFilters = cuisines.length > 0 || allergens.length > 0 || category;
    setFiltersApplied(shouldApplyFilters);

    if (!shouldApplyFilters) {
      setFilteredRecipes([]);
      return;
    }

    const filtered = recipes.filter(recipe => {
      if (cuisines.length > 0 && (!recipe.cuisine || !cuisines.includes(recipe.cuisine))) {
        return false;
      }
      if (allergens.length > 0 && recipe.allergens?.some(allergen => allergens.includes(allergen))) {
        return false;
      }
      if (category && category !== 'all' && recipe.category !== category) {
        return false;
      }
      if (recipe.ingredients.length > maxIngredients) {
        return false;
      }
      return true;
    });

    console.log('Filtered recipes count:', filtered.length);
    setFilteredRecipes(filtered);
  }, [recipes]);

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

  const handleSortChange = useCallback((value: string) => {
    setSortBy(value);
  }, []);

  const handleDirectionChange = useCallback(() => {
    setIsAscending(prev => !prev);
  }, []);

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