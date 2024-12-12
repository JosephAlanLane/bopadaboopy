import React from 'react';
import { WeeklyPlanner } from '@/components/WeeklyPlanner';
import { Sidebar } from '@/components/Sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const CustomMealPlans = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4">
        <WeeklyPlanner defaultTab="custom" />
      </main>
    </div>
  );
};

export default CustomMealPlans;