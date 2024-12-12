import React, { useState } from 'react';
import { WeeklyPlanner } from '@/components/WeeklyPlanner';
import { Sidebar } from '@/components/Sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { MealPlan, Recipe } from '@/types/recipe';

const CustomMealPlans = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mealPlan, setMealPlan] = useState<MealPlan>({});
  const [activeTab, setActiveTab] = useState<"weekly" | "custom">("custom");
  const [customMeals, setCustomMeals] = useState<(Recipe | null)[]>([null]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

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
    <div className="flex min-h-screen">
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
      <main className="flex-1 p-4">
        <WeeklyPlanner 
          defaultTab="custom"
          mealPlan={mealPlan}
          onRemoveMeal={handleRemoveMeal}
          onUpdateMealPlan={handleUpdateMealPlan}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          customMeals={customMeals}
          setCustomMeals={setCustomMeals}
        />
      </main>
    </div>
  );
};

export default CustomMealPlans;