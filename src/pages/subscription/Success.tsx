import React from "react";
import { Navbar } from "@/components/Navbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const SubscriptionSuccess = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="container max-w-2xl mx-auto py-8 px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Welcome to the Family!</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your subscription has been successfully activated. You now have access to all premium features!
          </p>
          <div className="space-y-4">
            <Button
              onClick={() => navigate("/")}
              className="w-full sm:w-auto"
            >
              Start Planning Meals
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSuccess;