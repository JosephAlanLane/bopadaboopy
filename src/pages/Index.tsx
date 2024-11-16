import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { RecipeFilters } from "@/components/RecipeFilters";
import { RecipeGrid } from "@/components/RecipeGrid";
import { WeeklyPlanner } from "@/components/WeeklyPlanner";
import { recipes } from "@/data/recipes";
import { Recipe, MealPlan, DayOfWeek } from "@/types/recipe";
import { useToast } from "@/components/ui/use-toast";

const DAYS: DayOfWeek[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Index = () => {
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [mealPlan, setMealPlan] = useState<MealPlan>({});
  const { toast } = useToast();

  const handleApplyFilters = ({
    search,
    cuisines,
    allergens,
  }: {
    search: string;
    cuisines: string[];
    allergens: string[];
  }) => {
    let filtered = recipes;

    if (search) {
      filtered = filtered.filter((recipe) =>
        recipe.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (cuisines.length > 0) {
      filtered = filtered.filter((recipe) =>
        cuisines.includes(recipe.cuisine)
      );
    }

    if (allergens.length > 0) {
      filtered = filtered.filter(
        (recipe) =>
          !recipe.allergens.some((allergen) => allergens.includes(allergen))
      );
    }

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
        <aside className="w-80 shrink-0 bg-muted rounded-lg p-4">
          <WeeklyPlanner mealPlan={mealPlan} onRemoveMeal={handleRemoveMeal} />
        </aside>
        <div className="flex-1 space-y-4">
          <RecipeFilters onApplyFilters={handleApplyFilters} />
          <RecipeGrid recipes={filteredRecipes} onAddRecipe={handleAddRecipe} />
        </div>
      </main>
    </div>
  );
};

export default Index;