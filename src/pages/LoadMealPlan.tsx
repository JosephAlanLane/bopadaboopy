import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

const LoadMealPlan = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const loadMealPlan = async () => {
      try {
        console.log('Loading meal plan with slug:', slug);
        
        const { data: mealPlan, error } = await supabase
          .from('saved_meal_plans')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) {
          console.error('Error fetching meal plan:', error);
          throw error;
        }

        if (!mealPlan) {
          console.log('No meal plan found for slug:', slug);
          toast({
            title: "Meal plan not found",
            description: "The requested meal plan could not be found.",
            variant: "destructive",
          });
          navigate('/');
          return;
        }

        console.log('Successfully loaded meal plan:', mealPlan);

        // Store the meal plan data in localStorage with the is_weekly flag
        localStorage.setItem('selectedMealPlan', JSON.stringify({
          meals: mealPlan.recipes,
          is_weekly: mealPlan.is_weekly,
          title: mealPlan.title
        }));

        // Navigate to home page where the meal plan will be loaded
        navigate('/');

        toast({
          title: "Meal plan loaded",
          description: `"${mealPlan.title}" has been loaded into the ${mealPlan.is_weekly ? 'weekly' : 'custom'} planner.`,
        });
      } catch (error) {
        console.error('Error loading meal plan:', error);
        toast({
          title: "Error loading meal plan",
          description: "There was an error loading the meal plan. Please try again.",
          variant: "destructive",
        });
        navigate('/');
      }
    };

    if (slug) {
      loadMealPlan();
    }
  }, [slug, navigate, toast]);

  return null;
};

export default LoadMealPlan;