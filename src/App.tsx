import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import About from "./pages/About"; 
import Privacy from "./pages/Privacy";
import MealPlans from "./pages/MealPlans";
import CustomMealPlans from "./pages/CustomMealPlans";
import SubscriptionSuccess from "./pages/subscription/Success";
import SubscriptionCancel from "./pages/subscription/Cancel";
import LoadMealPlan from "./pages/LoadMealPlan";
import { useEffect } from "react";
import { supabase } from "./integrations/supabase/client";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function AuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If we have a code parameter, we're in the auth callback
    const params = new URLSearchParams(location.search);
    if (params.has('code')) {
      console.log('Auth callback detected, handling session...');
      // Handle the callback and redirect to home
      supabase.auth.getSession().then(() => {
        console.log('Session handled, redirecting to home...');
        // Get the current hostname
        const hostname = window.location.hostname;
        // If we're on the portal subdomain, redirect to the main domain
        if (hostname.includes('meal-planner-portal')) {
          const mainDomain = hostname.replace('meal-planner-portal', 'bopadaboopy');
          window.location.href = `https://${mainDomain}/`;
        } else {
          navigate('/', { replace: true });
        }
      });
    }
  }, [location, navigate]);

  return null;
}

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <AuthCallback />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/custom" element={<CustomMealPlans />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/meal-plans" element={<MealPlans />} />
                <Route path="/meal-plans/:slug" element={<LoadMealPlan />} />
                <Route path="/subscription/success" element={<SubscriptionSuccess />} />
                <Route path="/subscription/cancel" element={<SubscriptionCancel />} />
              </Routes>
            </TooltipProvider>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;