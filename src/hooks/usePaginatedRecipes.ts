import { Recipe } from '@/types/recipe';
import { useInfiniteQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const RECIPES_PER_PAGE = 20;

interface FetchRecipesParams {
  pageParam?: number;
  searchQuery?: string;
}

export const usePaginatedRecipes = (searchQuery?: string) => {
  const fetchRecipesPage = async ({ pageParam = 0, searchQuery }: FetchRecipesParams) => {
    console.log('Fetching recipes page:', { pageParam, searchQuery });
    const start = pageParam * RECIPES_PER_PAGE;
    
    let query = supabase
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
      `, { count: 'exact' });

    // Add search filter if query exists
    if (searchQuery) {
      query = query.ilike('title', `%${searchQuery}%`);
    }

    // Add pagination
    const { data: recipes, error, count } = await query
      .range(start, start + RECIPES_PER_PAGE - 1)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Fetch recipe usage stats for popularity sorting - using a single query for all recipes
    const { data: usageStats, error: usageError } = await supabase
      .from('recipe_usage_stats')
      .select('recipe_id, used_at')
      .in('recipe_id', recipes.map(r => r.id));

    if (usageError) throw usageError;

    // Create a map of recipe_id to usage count for efficient lookup
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

    const hasMore = (start + RECIPES_PER_PAGE) < (count || 0);
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
    queryKey: ['recipes', searchQuery],
    queryFn: ({ pageParam }) => fetchRecipesPage({ pageParam, searchQuery }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    gcTime: 1000 * 60 * 10, // Keep unused data for 10 minutes
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