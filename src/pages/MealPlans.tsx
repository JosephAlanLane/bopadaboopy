import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { WeeklyMealPlanCard } from '@/components/WeeklyMealPlanCard';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@supabase/auth-helpers-react";

const MealPlans = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [publicMealPlans, setPublicMealPlans] = useState([]);
  const [savedMealPlans, setSavedMealPlans] = useState([]);
  const user = useAuth();

  useEffect(() => {
    fetchMealPlans();
  }, [user]);

  const fetchMealPlans = async () => {
    try {
      // Fetch public meal plans
      const { data: publicData } = await supabase
        .from('saved_meal_plans')
        .select('*')
        .eq('is_public', true);
      
      setPublicMealPlans(publicData || []);

      if (user) {
        // Fetch user's saved meal plans
        const { data: savedData } = await supabase
          .from('saved_meal_plans')
          .select('*')
          .eq('user_id', user.id);
        
        setSavedMealPlans(savedData || []);
      }
    } catch (error) {
      console.error('Error fetching meal plans:', error);
    }
  };

  const filterMealPlans = (plans) => {
    if (!searchQuery.trim()) return plans;
    
    return plans.filter(plan => 
      plan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (plan.description && plan.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Weekly Meal Plans
          </h1>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="text"
              placeholder="Search meal plans..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 w-full"
            />
          </div>
        </div>

        <Tabs defaultValue="discover" className="space-y-6">
          <TabsList>
            <TabsTrigger value="discover">Discover Meal Plans</TabsTrigger>
            <TabsTrigger value="saved">My ❤️'d Meal Plans</TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filterMealPlans(publicMealPlans).map((plan) => (
                <WeeklyMealPlanCard
                  key={plan.id}
                  {...plan}
                  onToggleSave={fetchMealPlans}
                  showHeart
                  isSaved={savedMealPlans.some(saved => saved.id === plan.id)}
                />
              ))}
              {filterMealPlans(publicMealPlans).length === 0 && (
                <div className="col-span-2 text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">No meal plans found matching your search.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="saved" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filterMealPlans(savedMealPlans).map((plan) => (
                <WeeklyMealPlanCard
                  key={plan.id}
                  {...plan}
                  onToggleSave={fetchMealPlans}
                />
              ))}
              {filterMealPlans(savedMealPlans).length === 0 && (
                <div className="col-span-2 text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">No saved meal plans yet.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default MealPlans;