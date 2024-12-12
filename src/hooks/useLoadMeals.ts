import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { Recipe } from '@/types/recipe';

export const useLoadMeals = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleLoadMeals = async (recipes: Recipe[], is_weekly: boolean = true) => {
    if (!user && !location.pathname.includes('/shared/')) {
      navigate('/login');
      return;
    }

    localStorage.setItem('selectedMealPlan', JSON.stringify({
      meals: recipes,
      is_weekly: is_weekly
    }));
    
    navigate('/');
    return true;
  };

  return {
    handleLoadMeals,
  };
};