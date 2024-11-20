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

  const handleUpdateMealPlan = (newMealPlan: MealPlan) => {
    setMealPlan(newMealPlan);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1 relative">
        <div className="max-w-[1800px] mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <Sidebar 
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              mealPlan={mealPlan}
              onRemoveMeal={handleRemoveMeal}
              onUpdateMealPlan={handleUpdateMealPlan}
            />
            
            <div className="flex-1 min-w-0 space-y-4">
              <RecipeFilters onApplyFilters={handleApplyFilters} />
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-sm">
                <RecipeGrid 
                  recipes={filteredRecipes.length > 0 ? filteredRecipes : recipes} 
                  onAddRecipe={handleAddRecipe}
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