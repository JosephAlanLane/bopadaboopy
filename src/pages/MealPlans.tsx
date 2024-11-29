import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { WeeklyMealPlanCard } from '@/components/WeeklyMealPlanCard';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { createExampleMealPlans } from '@/data/exampleMealPlans';
import { useNavigate } from 'react-router-dom';

const MealPlans = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [publicMealPlans, setPublicMealPlans] = useState([]);
  const [savedMealPlans, setSavedMealPlans] = useState([]);
  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate('/login');
      return;
    }
    
    createExampleMealPlans();
    fetchMealPlans();
  }, [session, navigate]);

  const fetchMealPlans = async () => {
    try {
      const { data: publicData } = await supabase
        .from('saved_meal_plans')
        .select('*')
        .eq('is_public', true);
      
      setPublicMealPlans(publicData || []);

      if (session?.user) {
        const { data: savedData } = await supabase
          .from('saved_meal_plans')
          .select('*')
          .eq('user_id', session.user.id);
        
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

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Weekly Meal Plans
          </h1>
          <Tabs defaultValue="discover" className="w-auto">
            <TabsList>
              <TabsTrigger value="discover">Discover Meal Plans</TabsTrigger>
              <TabsTrigger value="saved">My ❤️'d Meal Plans</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="relative w-full max-w-md mb-6">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="text"
              placeholder="Search meal plans..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 w-full"
            />
          </div>

          <Tabs defaultValue="discover" className="space-y-6">
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
        </div>
      </main>
    </div>
  );
};

export default MealPlans;