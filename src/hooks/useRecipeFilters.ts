import { useState, useCallback } from 'react';
import { Recipe } from '@/types/recipe';

interface FilterOptions {
  search: string;
  cuisines: string[];
  allergens: string[];
  maxIngredients: number;
  category?: string;
}

export const useRecipeFilters = (recipes: Recipe[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [filtersApplied, setFiltersApplied] = useState(false);

  const handleApplyFilters = useCallback(({
    search,
    cuisines,
    allergens,
    maxIngredients,
    category,
  }: FilterOptions) => {
    console.log('Applying filters:', { search, cuisines, allergens, maxIngredients, category });
    setSearchQuery(search);
    
    const shouldApplyFilters = cuisines.length > 0 || allergens.length > 0 || category;
    setFiltersApplied(Boolean(shouldApplyFilters));

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

  return {
    searchQuery,
    filteredRecipes,
    filtersApplied,
    handleApplyFilters
  };
};