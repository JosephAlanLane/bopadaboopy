import { useState } from 'react';
import { Recipe } from '@/types/recipe';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const RECIPES_PER_PAGE = 20;

export const usePaginatedRecipes = () => {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchRecipesPage = async ({ pageParam = 0 }) => {
    console.log('Fetching recipes page:', pageParam);
    const start = pageParam * RECIPES_PER_PAGE;
    
    const { data: recipes, error } = await supabase
      .from('recipes')
      .select(`
        id,
        title,
        image,
        cuisine,
        instructions,
        allergens,
        cook_time_minutes,
        servings,
        rating,
        category,
        created_at,
        recipe_ingredients (
          amount,
          unit,
          item
        )
      `)
      .range(start, start + RECIPES_PER_PAGE - 1)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Fetch recipe usage stats for popularity sorting
    const { data: usageStats, error: usageError } = await supabase
      .from('recipe_usage_stats')
      .select('recipe_id, used_at');

    if (usageError) throw usageError;

    // Create a map of recipe_id to usage count
    const usageCount = usageStats?.reduce((acc: { [key: string]: number }, stat) => {
      acc[stat.recipe_id] = (acc[stat.recipe_id] || 0) + 1;
      return acc;
    }, {});

    const recipesWithPopularity = recipes.map((recipe: any) => ({
      ...recipe,
      popularity: usageCount?.[recipe.id] || 0,
      ingredients: recipe.recipe_ingredients.map((ing: any) => ({
        amount: ing.amount,
        unit: ing.unit || '',
        item: ing.item,
      })),
    }));

    setHasMore(recipes.length === RECIPES_PER_PAGE);
    return recipesWithPopularity;
  };

  const {
    data: recipes = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['recipes', page],
    queryFn: () => fetchRecipesPage({ pageParam: page }),
  });

  const loadMore = () => {
    if (hasMore) {
      setPage(prev => prev + 1);
    }
  };

  return {
    recipes,
    isLoading,
    error,
    hasMore,
    loadMore,
    refetch
  };
};