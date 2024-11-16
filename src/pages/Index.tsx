import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { RecipeFilters } from "@/components/RecipeFilters";
import { RecipeGrid } from "@/components/RecipeGrid";
import { WeeklyPlanner } from "@/components/WeeklyPlanner";
import { Recipe, MealPlan, DayOfWeek } from "@/types/recipe";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
    allergens: [], // You might want to add an allergens table in the future
  }));
};

const Index = () => {
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [mealPlan, setMealPlan] = useState<MealPlan>({});
  const { toast } = useToast();

  const { data: recipes = [] } = useQuery({
    queryKey: ['recipes'],
    queryFn: fetchRecipes,
  });

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
        (recipe) => !allergens.some(allergen => recipe.allergens.includes(allergen))
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
    <div className="min-h-screen flex flex-col bg-gray-200">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-[1800px] mx-auto p-4 flex gap-6">
          <aside className="w-80 shrink-0">
            <div className="sticky top-4">
              <WeeklyPlanner mealPlan={mealPlan} onRemoveMeal={handleRemoveMeal} />
            </div>
          </aside>
          <div className="flex-1 space-y-4">
            <RecipeFilters onApplyFilters={handleApplyFilters} />
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <RecipeGrid recipes={filteredRecipes.length > 0 ? filteredRecipes : recipes} onAddRecipe={handleAddRecipe} />
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-white border-t mt-8">
        <div className="max-w-[1800px] mx-auto py-6 px-4">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              © {new Date().getFullYear()} Meal Planner. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Terms of Service</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;