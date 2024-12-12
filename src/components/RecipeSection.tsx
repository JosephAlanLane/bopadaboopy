import React, { useState } from 'react';
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
  const { toast } = useToast();

  const {
    recipes,
    isLoading,
    hasMore,
    loadMore,
    refetch,
    isFetchingNextPage
  } = usePaginatedRecipes(searchQuery);

  const {
    sortedRecipes,
    sortBy,
    isAscending,
    handleSortChange,
    handleDirectionChange
  } = useSortedRecipes(filtersApplied ? filteredRecipes : recipes);

  React.useEffect(() => {
    if (!filtersApplied) {
      setFilteredRecipes(recipes);
    }
  }, [recipes, filtersApplied]);

  const handleApplyFilters = ({
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
    
    let filtered = [...recipes];
    setFiltersApplied(Boolean(cuisines.length || allergens.length || category));

    if (cuisines.length > 0) {
      filtered = filtered.filter((recipe) => 
        recipe.cuisine && cuisines.includes(recipe.cuisine)
      );
    }

    if (allergens.length > 0) {
      filtered = filtered.filter(
        (recipe) => !allergens.some(allergen => 
          recipe.allergens && recipe.allergens.includes(allergen)
        )
      );
    }

    if (category && category !== 'all') {
      filtered = filtered.filter((recipe) => recipe.category === category);
    }

    filtered = filtered.filter(
      (recipe) => recipe.ingredients.length <= maxIngredients
    );

    console.log('Filtered recipes count:', filtered.length);
    setFilteredRecipes(filtered);
  };

  const handleAddRecipeWithTracking = async (recipe: Recipe) => {
    await trackRecipeUsage(recipe.id);
    await refetch();
    onAddRecipe(recipe);
  };

  return (
    <div className="flex-1 min-w-0 space-y-4">
      <RecipeFilters onApplyFilters={handleApplyFilters} />
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm border-0">
        <RecipeGrid 
          recipes={sortedRecipes}
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