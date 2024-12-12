import { Recipe } from '@/types/recipe';
import { useInfiniteQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const RECIPES_PER_PAGE = 20;

export const usePaginatedRecipes = () => {
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

    const hasMore = recipes.length === RECIPES_PER_PAGE;
    return {
      recipes: recipesWithPopularity,
      nextPage: hasMore ? pageParam + 1 : undefined,
      hasMore
    };
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch
  } = useInfiniteQuery({
    queryKey: ['recipes'],
    queryFn: fetchRecipesPage,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });

  const recipes = data?.pages.flatMap(page => page.recipes) ?? [];

  return {
    recipes,
    isLoading,
    hasMore: hasNextPage,
    loadMore: () => {
      if (!isFetchingNextPage && hasNextPage) {
        fetchNextPage();
      }
    },
    refetch,
    isFetchingNextPage
  };
};