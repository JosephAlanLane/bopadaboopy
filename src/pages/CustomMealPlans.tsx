import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Recipe, MealPlan } from "@/types/recipe";
import { Sidebar } from "@/components/Sidebar";
import { RecipeSection } from "@/components/RecipeSection";

const CustomMealPlans = () => {
  const [mealPlan, setMealPlan] = useState<MealPlan>({});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<"weekly" | "custom">("custom");
  const [customMeals, setCustomMeals] = useState<(Recipe | null)[]>([null]);

  const handleRemoveMeal = (day: string) => {
    setMealPlan(prev => {
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
            <RecipeSection onAddRecipe={(recipe) => {
              if (activeTab === "custom") {
                setCustomMeals(prevMeals => {
                  const emptyIndex = prevMeals.findIndex(meal => meal === null);
                  if (emptyIndex === -1) {
                    return [...prevMeals, recipe];
                  }
                  const newMeals = [...prevMeals];
                  newMeals[emptyIndex] = recipe;
                  return newMeals;
                });
              }
            }} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomMealPlans;