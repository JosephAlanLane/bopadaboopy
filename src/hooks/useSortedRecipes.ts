import { useState, useEffect } from 'react';
import { Recipe } from '@/types/recipe';

export const useSortedRecipes = (recipes: Recipe[]) => {
  const [sortBy, setSortBy] = useState<string>('popular');
  const [isAscending, setIsAscending] = useState(false);
  const [sortedRecipes, setSortedRecipes] = useState<Recipe[]>(recipes);

  useEffect(() => {
    console.log('Sorting recipes:', { sortBy, isAscending, count: recipes.length });
    const sorted = [...recipes].sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'popular':
          comparison = ((b.popularity || 0) - (a.popularity || 0));
          break;
        case 'rating':
          comparison = ((b.rating || 0) - (a.rating || 0));
          break;
        case 'cookTime':
          comparison = ((a.cook_time_minutes || 0) - (b.cook_time_minutes || 0));
          break;
        case 'servings':
          comparison = ((b.servings || 0) - (a.servings || 0));
          break;
        case 'name':
          comparison = a.title.localeCompare(b.title);
          break;
        default:
          comparison = ((b.popularity || 0) - (a.popularity || 0));
      }
      return isAscending ? comparison : -comparison;
    });
    
    console.log('Sorted recipes count:', sorted.length);
    setSortedRecipes(sorted);
  }, [recipes, sortBy, isAscending]);

  const handleSortChange = (value: string) => {
    console.log('Sort changed to:', value, 'Direction:', isAscending);
    setSortBy(value);
  };

  const handleDirectionChange = () => {
    console.log('Direction changed from:', isAscending, 'to:', !isAscending);
    setIsAscending(!isAscending);
  };

  return {
    sortedRecipes,
    sortBy,
    isAscending,
    handleSortChange,
    handleDirectionChange
  };
};