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
          ${sidebarOpen ? 'w-[355px]' : 'w-0'}
          transition-all duration-300 
          overflow-hidden
          md:sticky md:top-4
          fixed left-0 top-0 h-screen
          bg-background
          z-40
        `}
      >
        <div className="h-full overflow-y-auto px-4 pt-4">
          <WeeklyPlanner mealPlan={mealPlan} onRemoveMeal={onRemoveMeal} />
        </div>
      </div>
      
      <Button
        variant="outline"
        size="icon"
        className="fixed left-0 top-1/2 transform -translate-y-1/2 z-50 bg-white dark:bg-gray-800 rounded-l-none md:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
      </Button>
    </>
  );
};