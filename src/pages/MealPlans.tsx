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
  const [isLoading, setIsLoading] = useState(true);
  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    const initializePage = async () => {
      console.log('Initializing meal plans page, session:', session);
      setIsLoading(true);
      
      try {
        if (!session) {
          console.log('No session found, redirecting to login');
          navigate('/login');
          return;
        }

        console.log('Creating example meal plans');
        await createExampleMealPlans();
        await fetchMealPlans();
      } catch (error) {
        console.error('Error initializing page:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializePage();
  }, [session, navigate]);

  const fetchMealPlans = async () => {
    try {
      console.log('Fetching meal plans');
      const { data: publicData, error: publicError } = await supabase
        .from('saved_meal_plans')
        .select('*')
        .eq('is_public', true);
      
      if (publicError) throw publicError;
      console.log('Fetched public meal plans:', publicData);
      setPublicMealPlans(publicData || []);

      if (session?.user) {
        const { data: savedData, error: savedError } = await supabase
          .from('saved_meal_plans')
          .select('*')
          .eq('user_id', session.user.id);
        
        if (savedError) throw savedError;
        console.log('Fetched saved meal plans:', savedData);
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500 dark:text-gray-400">Loading...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Weekly Meal Plans
            </h1>
          </div>
          <div className="flex-1">
            <Tabs defaultValue="discover" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="discover" className="flex-1">Discover Meal Plans</TabsTrigger>
                <TabsTrigger value="saved" className="flex-1">My ❤️'d Meal Plans</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="p-6">
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
        </div>
      </main>
    </div>
  );
};

export default MealPlans;