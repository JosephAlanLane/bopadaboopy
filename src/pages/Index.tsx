import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { RecipeFilters } from "@/components/RecipeFilters";
import { RecipeGrid } from "@/components/RecipeGrid";
import { WeeklyPlanner } from "@/components/WeeklyPlanner";
import { Recipe, MealPlan, DayOfWeek } from "@/types/recipe";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const DAYS: DayOfWeek[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const fetchRecipes = async () => {
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
      recipe_ingredients (
        amount,
        unit,
        item
      )
    `);

  if (error) throw error;

  return recipes.map((recipe: any) => ({
    ...recipe,
    ingredients: recipe.recipe_ingredients.map((ing: any) => ({
      amount: ing.amount,
      unit: ing.unit || '',
      item: ing.item,
    })),
  }));
};

const Index = () => {
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [mealPlan, setMealPlan] = useState<MealPlan>({});
  const [servings, setServings] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { toast } = useToast();

  const { data: recipes = [] } = useQuery({
    queryKey: ['recipes'],
    queryFn: fetchRecipes,
  });

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
    let filtered = recipes;

    if (search) {
      filtered = filtered.filter((recipe) =>
        recipe.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (cuisines.length > 0) {
      filtered = filtered.filter((recipe) => cuisines.includes(recipe.cuisine));
    }

    if (allergens.length > 0) {
      filtered = filtered.filter(
        (recipe) => !allergens.some(allergen => 
          recipe.allergens && recipe.allergens.includes(allergen)
        )
      );
    }

    if (category) {
      filtered = filtered.filter((recipe) => recipe.category === category);
    }

    filtered = filtered.filter(
      (recipe) => recipe.ingredients.length <= maxIngredients
    );

    setFilteredRecipes(filtered);
  };

  const handleAddRecipe = (recipe: Recipe) => {
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
  };

  const handleRemoveMeal = (day: DayOfWeek) => {
    setMealPlan((prev) => {
      const newPlan = { ...prev };
      delete newPlan[day];
      return newPlan;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-[1800px] mx-auto p-4 flex gap-1 relative">
          <aside 
            className={`${
              sidebarOpen ? 'w-[355px]' : 'w-0'
            } transition-all duration-300 overflow-hidden fixed md:static z-10`}
          >
            <div className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
              <WeeklyPlanner mealPlan={mealPlan} onRemoveMeal={handleRemoveMeal} />
            </div>
          </aside>
          
          <Button
            variant="outline"
            size="icon"
            className="fixed left-0 top-1/2 transform -translate-y-1/2 z-20 bg-white dark:bg-gray-800 rounded-l-none"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
          </Button>

          <div className={`flex-1 space-y-4 transition-all duration-300 ${sidebarOpen ? 'md:ml-2' : ''}`}>
            <RecipeFilters onApplyFilters={handleApplyFilters} />
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <RecipeGrid 
                recipes={filteredRecipes.length > 0 ? filteredRecipes : recipes} 
                onAddRecipe={handleAddRecipe}
                servings={servings}
              />
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 mt-8">
        <div className="max-w-[1800px] mx-auto py-6 px-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} Meal Planner. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">Terms of Service</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;