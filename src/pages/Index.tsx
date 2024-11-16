import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { RecipeFilters } from "@/components/RecipeFilters";
import { RecipeGrid } from "@/components/RecipeGrid";
import { WeeklyPlanner } from "@/components/WeeklyPlanner";
import { recipes } from "@/data/recipes";
import { Recipe, MealPlan, DayOfWeek } from "@/types/recipe";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const DAYS: DayOfWeek[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const Index = () => {
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [mealPlan, setMealPlan] = useState<MealPlan>({});
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate]);

  const handleApplyFilters = ({
    search,
    cuisines,
    allergens,
    maxIngredients,
  }: {
    search: string;
    cuisines: string[];
    allergens: string[];
    maxIngredients: number;
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
        (recipe) => !recipe.allergens.some((allergen) => allergens.includes(allergen))
      );
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-[1800px] mx-auto p-4 flex gap-4">
        <aside className="w-80 shrink-0 bg-white rounded-lg p-4 shadow-sm">
          <WeeklyPlanner mealPlan={mealPlan} onRemoveMeal={handleRemoveMeal} />
        </aside>
        <div className="flex-1 space-y-4">
          <RecipeFilters onApplyFilters={handleApplyFilters} />
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <RecipeGrid recipes={filteredRecipes} onAddRecipe={handleAddRecipe} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
