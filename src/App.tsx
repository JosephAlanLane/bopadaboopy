import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Login from "./pages/Login";
import MealPlans from "./pages/MealPlans";
import Privacy from "./pages/Privacy";
import Success from "./pages/subscription/Success";
import Cancel from "./pages/subscription/Cancel";
import { Toaster } from "./components/ui/toaster";
import { useEffect } from "react";
import { supabase } from "./integrations/supabase/client";

const SharedMealPlanLoader = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadSharedMealPlan = async () => {
      if (!slug) return;

      try {
        console.log('Loading shared meal plan with slug:', slug);
        const { data: mealPlan, error } = await supabase
          .from('saved_meal_plans')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;

        if (mealPlan) {
          console.log('Found meal plan:', mealPlan);
          localStorage.setItem('selectedMealPlan', JSON.stringify({
            meals: mealPlan.recipes,
            is_weekly: mealPlan.is_weekly
          }));
          navigate('/');
        }
      } catch (error) {
        console.error('Error loading shared meal plan:', error);
        navigate('/');
      }
    };

    loadSharedMealPlan();
  }, [slug, navigate]);

  return null;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/meal-plans" element={<MealPlans />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/subscription/success" element={<Success />} />
        <Route path="/subscription/cancel" element={<Cancel />} />
        <Route path="/shared/:slug" element={<SharedMealPlanLoader />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;