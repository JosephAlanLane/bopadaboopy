export type SubscriptionTier = {
  id: string;
  name: string;
  price_id: string;
  price_amount: number;
  features: {
    features: string[];
  };
  created_at: string;
}

export type UserSubscription = {
  id: string;
  user_id: string;
  subscription_tier_id: SubscriptionTier;
  stripe_subscription_id: string | null;
  stripe_customer_id: string | null;
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  current_period_start: string | null;
  current_period_end: string | null;
  created_at: string;
}