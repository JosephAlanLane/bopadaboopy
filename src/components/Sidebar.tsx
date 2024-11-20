import { DayOfWeek, MealPlan } from "@/types/recipe";
import { WeeklyPlanner } from "./WeeklyPlanner";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  mealPlan: MealPlan;
  onRemoveMeal: (day: DayOfWeek) => void;
  onUpdateMealPlan: (newMealPlan: MealPlan) => void;
}

export const Sidebar = ({ 
  sidebarOpen, 
  setSidebarOpen, 
  mealPlan, 
  onRemoveMeal,
  onUpdateMealPlan
}: SidebarProps) => {
  return (
    <>
      <div 
        className={`
          fixed md:relative
          ${sidebarOpen ? 'w-[340px]' : 'w-0'}
          transition-all duration-300 
          overflow-hidden
          bg-white dark:bg-gray-900
          border-r dark:border-gray-800
          top-[73px]
          h-[calc(100vh-73px)]
          z-50
        `}
      >
        <div className="p-4">
          <WeeklyPlanner 
            mealPlan={mealPlan} 
            onRemoveMeal={onRemoveMeal}
            onUpdateMealPlan={onUpdateMealPlan}
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