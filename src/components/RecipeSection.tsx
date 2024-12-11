import React from 'react';
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
  const [filteredRecipes, setFilteredRecipes] = React.useState<Recipe[]>([]);
  const [filtersApplied, setFiltersApplied] = React.useState(false);
  const { toast } = useToast();

  const {
    recipes,
    isLoading,
    hasMore,
    loadMore,
    refetch
  } = usePaginatedRecipes();

  const {
    sortedRecipes,
    sortBy,
    isAscending,
    handleSortChange,
    handleDirectionChange
  } = useSortedRecipes(filteredRecipes);

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
    let filtered = [...recipes];
    setFiltersApplied(true);

    if (search) {
      filtered = filtered.filter((recipe) =>
        recipe.title.toLowerCase().includes(search.toLowerCase())
      );
    }

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
          hasMore={hasMore}
          onLoadMore={loadMore}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};