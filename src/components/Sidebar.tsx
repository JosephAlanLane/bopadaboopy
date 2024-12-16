import { DayOfWeek, MealPlan, Recipe } from "@/types/recipe";
import { WeeklyPlanner } from "./WeeklyPlanner";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  mealPlan: MealPlan;
  onRemoveMeal: (day: DayOfWeek) => void;
  onUpdateMealPlan: (newMealPlan: MealPlan) => void;
  activeTab: "weekly" | "custom";
  setActiveTab: (tab: "weekly" | "custom") => void;
  customMeals: (Recipe | null)[];
  setCustomMeals: (meals: (Recipe | null)[]) => void;
  className?: string; // Added className prop
}

export const Sidebar = ({ 
  sidebarOpen, 
  setSidebarOpen, 
  mealPlan, 
  onRemoveMeal,
  onUpdateMealPlan,
  activeTab,
  setActiveTab,
  customMeals,
  setCustomMeals,
  className = '' // Added className with default empty string
}: SidebarProps) => {
  return (
    <>
      <div 
        className={`
          fixed md:sticky md:top-[73px]
          ${sidebarOpen ? 'w-[340px]' : 'w-0'}
          transition-all duration-300 
          overflow-hidden
          bg-white dark:bg-gray-900
          md:border-r dark:md:border-gray-800
          border-r-0
          top-[73px]
          h-[calc(100vh-73px)]
          z-50
          -mr-[1px]
          ${className}
        `}
      >
        <div className="p-4">
          <WeeklyPlanner 
            mealPlan={mealPlan} 
            onRemoveMeal={onRemoveMeal}
            onUpdateMealPlan={onUpdateMealPlan}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            customMeals={customMeals}
            setCustomMeals={setCustomMeals}
          />
        </div>
      </div>
      
      <Button
        variant="outline"
        size="icon"
        className="fixed left-0 top-1/2 transform -translate-y-1/2 z-50 bg-white dark:bg-gray-800 rounded-l-none"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
      </Button>
    </>
  );
};