import { useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { Recipe, MealPlan, DayOfWeek } from "@/types/recipe";
import { useToast } from "@/components/ui/use-toast";
import { Sidebar } from "@/components/Sidebar";
import { Link } from "react-router-dom";
import { RecipeSection } from "@/components/RecipeSection";

const DAYS: DayOfWeek[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const Index = () => {
  const [mealPlan, setMealPlan] = useState<MealPlan>({});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<"weekly" | "custom">("weekly");
  const [customMeals, setCustomMeals] = useState<(Recipe | null)[]>([null]);
  const { toast } = useToast();

  useEffect(() => {
    const savedMealPlan = localStorage.getItem('selectedMealPlan');
    if (savedMealPlan) {
      try {
        const { meals, is_weekly } = JSON.parse(savedMealPlan);
        
        if (is_weekly) {
          const weeklyPlan: MealPlan = {};
          meals.forEach((recipe: Recipe, index: number) => {
            if (index < DAYS.length) {
              weeklyPlan[DAYS[index]] = recipe;
            }
          });
          setMealPlan(weeklyPlan);
          setActiveTab("weekly");
        } else {
          setCustomMeals(meals.map((recipe: Recipe) => recipe));
          setActiveTab("custom");
        }
        
        localStorage.removeItem('selectedMealPlan');
        
        toast({
          title: "Meal plan loaded",
          description: "Your selected meal plan has been loaded into the planner.",
        });
      } catch (error) {
        console.error('Error loading meal plan:', error);
      }
    }
  }, []);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setSidebarOpen(!isMobile);

    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAddRecipe = useCallback(async (recipe: Recipe) => {
    console.log('Adding recipe to tab:', activeTab);
    
    if (activeTab === "weekly") {
      // Find the first available day that doesn't have a meal
      const availableDays = DAYS.filter(day => !mealPlan[day]);
      const nextAvailableDay = availableDays[0];
      
      if (!nextAvailableDay) {
        toast({
          title: "Weekly plan is full",
          description: "Remove a meal before adding a new one.",
          variant: "destructive",
        });
        return;
      }

      setMealPlan(prev => ({
        ...prev,
        [nextAvailableDay]: recipe
      }));

      toast({
        title: "Meal added",
        description: `${recipe.title} added to ${nextAvailableDay}`,
      });
    } else {
      if (customMeals.length >= 50) {
        toast({
          title: "Custom plan is full",
          description: "Maximum of 50 meals reached.",
          variant: "destructive",
        });
        return;
      }

      setCustomMeals(prevMeals => {
        const nextAvailableIndex = prevMeals.findIndex(meal => meal === null);
        if (nextAvailableIndex === -1) {
          return [...prevMeals, recipe];
        }
        const newMeals = [...prevMeals];
        newMeals[nextAvailableIndex] = recipe;
        return newMeals;
      });

      toast({
        title: "Meal added",
        description: `${recipe.title} added to custom meal plan`,
      });
    }
  }, [activeTab, mealPlan, customMeals, toast]);

  const handleRemoveMeal = useCallback((day: DayOfWeek) => {
    setMealPlan(prev => {
      const newPlan = { ...prev };
      delete newPlan[day];
      return newPlan;
    });
  }, []);

  const handleUpdateMealPlan = useCallback((newMealPlan: MealPlan) => {
    setMealPlan(newMealPlan);
  }, []);

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
            
            <RecipeSection onAddRecipe={handleAddRecipe} />
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