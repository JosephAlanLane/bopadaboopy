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
    const handleAuthCallback = async () => {
      const params = new URLSearchParams(location.search);
      if (params.has('code') || params.has('access_token')) {
        console.log('Auth callback detected, handling session...');
        try {
          const { data: { session }, error } = await supabase.auth.getSession();
          if (error) throw error;
          
          console.log('Session obtained:', session);
          
          const hostname = window.location.hostname;
          if (hostname.includes('meal-planner-portal')) {
            console.log('On portal subdomain, preparing redirect to main domain...');
            
            if (session) {
              // Store full session data
              const sessionData = {
                access_token: session.access_token,
                refresh_token: session.refresh_token,
                expires_at: session.expires_at,
                user: session.user
              };
              localStorage.setItem('supabase.auth.token', JSON.stringify(sessionData));
              console.log('Session data stored in localStorage');
            }
            
            const mainDomain = hostname.replace('meal-planner-portal', 'bopadaboopy');
            window.location.href = `https://${mainDomain}/?refresh_session=true`;
          } else {
            console.log('Already on main domain, navigating to home...');
            navigate('/', { replace: true });
          }
        } catch (error) {
          console.error('Error in auth callback:', error);
          navigate('/login', { replace: true });
        }
      }
    };

    const handleSessionRefresh = async () => {
      if (location.search.includes('refresh_session=true')) {
        console.log('Detected refresh_session parameter...');
        try {
          const storedSession = localStorage.getItem('supabase.auth.token');
          if (storedSession) {
            console.log('Found stored session, attempting to restore...');
            const sessionData = JSON.parse(storedSession);
            
            const { error } = await supabase.auth.setSession({
              access_token: sessionData.access_token,
              refresh_token: sessionData.refresh_token
            });
            
            if (error) throw error;
            
            console.log('Session restored successfully');
            localStorage.removeItem('supabase.auth.token');
            navigate('/', { replace: true });
          }
        } catch (error) {
          console.error('Error restoring session:', error);
          navigate('/login', { replace: true });
        }
      }
    };

    handleAuthCallback();
    handleSessionRefresh();
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