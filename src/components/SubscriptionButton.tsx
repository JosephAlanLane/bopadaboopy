import React from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export function SubscriptionButton() {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleUpgradeClick = async () => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to upgrade to premium.",
        variant: "destructive"
      });
      navigate("/login");
      return;
    }

    // Redirect to Stripe checkout
    window.location.href = "https://buy.stripe.com/00g3g96ZXbiKeME3cc";
  };

  return (
    <Button 
      onClick={handleUpgradeClick}
      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
    >
      Upgrade to Premium
    </Button>
  );
}