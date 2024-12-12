import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/meal-plans" element={<MealPlans />} />
                <Route path="/custom" element={<CustomMealPlans />} />
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