import { DayOfWeek, MealPlan } from "@/types/recipe";
import { WeeklyPlanner } from "./WeeklyPlanner";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  mealPlan: MealPlan;
  onRemoveMeal: (day: DayOfWeek) => void;
}

export const Sidebar = ({ sidebarOpen, setSidebarOpen, mealPlan, onRemoveMeal }: SidebarProps) => {
  return (
    <>
      <div 
        className={`
          ${sidebarOpen ? 'w-[380px]' : 'w-0'}
          transition-all duration-300 
          overflow-hidden
          bg-white dark:bg-gray-900
          border-r dark:border-gray-800
          sticky top-[73px]
          h-[calc(100vh-73px)]
        `}
      >
        <div className="p-6">
          <WeeklyPlanner mealPlan={mealPlan} onRemoveMeal={onRemoveMeal} />
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