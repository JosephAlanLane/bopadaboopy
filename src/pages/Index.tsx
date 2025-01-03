import React, { useState, useEffect, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { Recipe, MealPlan, DayOfWeek } from "@/types/recipe";
import { useToast } from "@/components/ui/use-toast";
import { Sidebar } from "@/components/Sidebar";
import { Link } from "react-router-dom";
import { RecipeSection } from "@/components/RecipeSection";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const DAYS: DayOfWeek[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface UserSettings {
  default_servings?: number;
  enforce_servings?: boolean;
}

const Index = () => {
  const [mealPlan, setMealPlan] = useState<MealPlan>({});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<"weekly" | "custom">("weekly");
  const [customMeals, setCustomMeals] = useState<(Recipe | null)[]>([null]);
  const [userSettings, setUserSettings] = useState<UserSettings>({});
  const { toast } = useToast();
  const { user } = useAuth();

  // Fetch user settings once when component mounts
  useEffect(() => {
    const fetchUserSettings = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('default_servings, enforce_servings')
          .eq('id', user.id)
          .single();

        if (!error && data) {
          console.log('Fetched user settings:', data);
          setUserSettings(data);
        }
      }
    };

    fetchUserSettings();
  }, [user]);

  useEffect(() => {
    const savedMealPlan = localStorage.getItem('selectedMealPlan');
    if (savedMealPlan) {
      try {
        const { meals, is_weekly, title, tab_context } = JSON.parse(savedMealPlan);
        console.log('Loading meal plan:', { meals, is_weekly, title, tab_context, mealsLength: meals.length });
        
        // Set the active tab based on the tab_context
        setActiveTab(tab_context || (is_weekly ? "weekly" : "custom"));
        
        if (is_weekly) {
          console.log('Loading weekly meal plan');
          const weeklyPlan: MealPlan = {};
          meals.forEach((recipe: Recipe, index: number) => {
            if (index < DAYS.length) {
              weeklyPlan[DAYS[index]] = recipe;
            }
          });
          setMealPlan(weeklyPlan);
          // Reset custom meals when loading a weekly plan
          setCustomMeals([null]);

          toast({
            title: "Weekly meal plan loaded",
            description: `"${title}" has been loaded into the weekly planner.`,
          });
        } else {
          console.log('Loading custom meal plan');
          // For custom plans, create an array of the exact size needed
          const customPlanMeals = Array(meals.length).fill(null);
          meals.forEach((recipe: Recipe, index: number) => {
            customPlanMeals[index] = recipe;
          });
          console.log('Setting custom meals:', customPlanMeals);
          setCustomMeals(customPlanMeals);
          // Reset weekly plan when loading a custom plan
          setMealPlan({});

          toast({
            title: "Custom meal plan loaded",
            description: `"${title}" has been loaded into the custom planner.`,
          });
        }
        
        localStorage.removeItem('selectedMealPlan');
      } catch (error) {
        console.error('Error loading meal plan:', error);
        toast({
          title: "Error loading meal plan",
          description: "There was an error loading your meal plan. Please try again.",
          variant: "destructive",
        });
      }
    }
  }, [toast]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setSidebarOpen(!isMobile);

    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAddRecipe = useCallback((recipe: Recipe) => {
    console.log('Adding recipe to tab:', activeTab);
    
    if (activeTab === "weekly") {
      setMealPlan(prevPlan => {
        // Find the first empty slot without modifying state
        const emptyDay = DAYS.find(day => !prevPlan[day]);
        
        if (!emptyDay) {
          toast({
            title: "Weekly plan is full",
            description: "Remove a meal before adding a new one.",
            variant: "destructive",
          });
          return prevPlan;
        }

        // Create new plan only if we found an empty slot
        const newPlan = { ...prevPlan };
        newPlan[emptyDay] = recipe;
        
        toast({
          title: "Meal added",
          description: `${recipe.title} added to ${emptyDay}`,
        });
        
        return newPlan;
      });
    } else {
      setCustomMeals(prevMeals => {
        if (prevMeals.length >= 50) {
          toast({
            title: "Custom plan is full",
            description: "Maximum of 50 meals reached.",
            variant: "destructive",
          });
          return prevMeals;
        }

        const emptyIndex = prevMeals.findIndex(meal => meal === null);
        if (emptyIndex === -1) {
          return [...prevMeals, recipe];
        }
        
        const newMeals = [...prevMeals];
        newMeals[emptyIndex] = recipe;
        
        toast({
          title: "Meal added",
          description: `${recipe.title} added to custom meal plan`,
        });
        
        return newMeals;
      });
    }
  }, [activeTab, toast]);

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
              userSettings={userSettings}
              className="[&_button]:py-1.5"
            />
            
            <RecipeSection 
              onAddRecipe={handleAddRecipe}
              className="[&_button]:py-1.5"
            />
          </div>
        </div>
      </main>
      <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 mt-8">
        <div className="max-w-[1800px] mx-auto py-6 px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} Bopada Boopy. All rights reserved.
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <Link 
                to="/privacy" 
                className="text-sm text-primary hover:text-primary/80 dark:text-primary-foreground font-medium underline"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/about" 
                className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              >
                About
              </Link>
              <a 
                href="mailto:support@bopadaboopy.com" 
                className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
