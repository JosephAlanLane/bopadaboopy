import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { RecipeFilters } from "@/components/RecipeFilters";
import { RecipeGrid } from "@/components/RecipeGrid";
import { Recipe, MealPlan, DayOfWeek } from "@/types/recipe";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Sidebar } from "@/components/Sidebar";
import { Link } from "react-router-dom";
import { useSortedRecipes } from "@/hooks/useSortedRecipes";

const DAYS: DayOfWeek[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const fetchRecipes = async () => {
  console.log('Fetching recipes with usage stats...');
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
    `);

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

  console.log('Usage counts:', usageCount);

  return recipes.map((recipe: any) => ({
    ...recipe,
    popularity: usageCount?.[recipe.id] || 0,
    ingredients: recipe.recipe_ingredients.map((ing: any) => ({
      amount: ing.amount,
      unit: ing.unit || '',
      item: ing.item,
    })),
  }));
};

const trackRecipeUsage = async (recipeId: string) => {
  console.log('Tracking recipe usage:', recipeId);
  const { error } = await supabase
    .from('recipe_usage_stats')
    .insert([{ recipe_id: recipeId }]);
  
  if (error) {
    console.error('Error tracking recipe usage:', error);
  }
};

const Index = () => {
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [mealPlan, setMealPlan] = useState<MealPlan>({});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [activeTab, setActiveTab] = useState<"weekly" | "custom">("weekly");
  const [customMeals, setCustomMeals] = useState<(Recipe | null)[]>([null]);
  const { toast } = useToast();

  const { data: recipes = [], refetch: refetchRecipes } = useQuery({
    queryKey: ['recipes'],
    queryFn: fetchRecipes,
  });

  const {
    sortedRecipes,
    sortBy,
    isAscending,
    handleSortChange,
    handleDirectionChange
  } = useSortedRecipes(filteredRecipes);

  useEffect(() => {
    const savedMealPlan = localStorage.getItem('selectedMealPlan');
    if (savedMealPlan) {
      try {
        const parsedMealPlan = JSON.parse(savedMealPlan);
        setMealPlan(parsedMealPlan);
        localStorage.removeItem('selectedMealPlan'); // Clear it after loading
        
        // Track usage for all recipes in the loaded meal plan
        Object.values(parsedMealPlan).forEach((recipe: Recipe | null) => {
          if (recipe) {
            trackRecipeUsage(recipe.id);
          }
        });

        toast({
          title: "Meal plan loaded",
          description: "Your selected meal plan has been loaded into the planner.",
        });
      } catch (error) {
        console.error('Error loading meal plan:', error);
      }
    }
  }, []); // Only run once on mount

  useEffect(() => {
    if (!filtersApplied) {
      setFilteredRecipes(recipes);
    }
  }, [recipes, filtersApplied]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setSidebarOpen(!isMobile);

    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const handleAddRecipe = async (recipe: Recipe) => {
    console.log('Adding recipe to tab:', activeTab);
    
    if (activeTab === "weekly") {
      const nextAvailableDay = DAYS.find((day) => !mealPlan[day]);
      
      if (!nextAvailableDay) {
        toast({
          title: "Weekly plan is full",
          description: "Remove a meal before adding a new one.",
          variant: "destructive",
        });
        return;
      }

      setMealPlan((prev) => ({
        ...prev,
        [nextAvailableDay]: recipe,
      }));

      toast({
        title: "Meal added",
        description: `${recipe.title} added to ${nextAvailableDay}`,
      });
    } else {
      // Handle custom tab
      const nextAvailableIndex = customMeals.findIndex(meal => meal === null);
      if (nextAvailableIndex === -1) {
        // No empty slot found, add new one
        setCustomMeals([...customMeals, recipe]);
      } else {
        // Fill empty slot
        const newMeals = [...customMeals];
        newMeals[nextAvailableIndex] = recipe;
        setCustomMeals(newMeals);
      }

      toast({
        title: "Meal added",
        description: `${recipe.title} added to custom meal plan`,
      });
    }

    // Track recipe usage
    await trackRecipeUsage(recipe.id);
    await refetchRecipes(); // Refresh recipes to update popularity
  };

  const handleRemoveMeal = (day: DayOfWeek) => {
    setMealPlan((prev) => {
      const newPlan = { ...prev };
      delete newPlan[day];
      return newPlan;
    });
  };

  const handleUpdateMealPlan = (newMealPlan: MealPlan) => {
    setMealPlan(newMealPlan);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-[1800px] mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Sidebar 
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              mealPlan={mealPlan}
              onRemoveMeal={handleRemoveMeal}
              onUpdateMealPlan={handleUpdateMealPlan}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              customMeals={customMeals}
              setCustomMeals={setCustomMeals}
            />
            
            <div className="flex-1 min-w-0 space-y-4">
              <RecipeFilters onApplyFilters={handleApplyFilters} />
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm border-0">
                <RecipeGrid 
                  recipes={sortedRecipes}
                  onAddRecipe={handleAddRecipe}
                  onSortChange={handleSortChange}
                  onDirectionChange={handleDirectionChange}
                  sortBy={sortBy}
                  isAscending={isAscending}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 mt-8">
        <div className="max-w-[1800px] mx-auto py-6 px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} Meal Planner. All rights reserved.
            </div>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">Privacy Policy</Link>
              <Link to="/about" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">About</Link>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;