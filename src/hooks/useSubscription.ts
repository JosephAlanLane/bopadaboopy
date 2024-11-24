import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/contexts/AuthContext"
import type { UserSubscription } from "@/integrations/supabase/types/subscription"

export function useSubscription() {
  const { user } = useAuth()

  const { data: subscription, isLoading } = useQuery<UserSubscription>({
    queryKey: ['subscription', user?.id],
    queryFn: async () => {
      console.log('Fetching subscription for user:', user?.id)
      const { data, error } = await supabase
        .from('user_subscriptions')
        .select(`
          id,
          user_id,
          status,
          stripe_subscription_id,
          stripe_customer_id,
          current_period_start,
          current_period_end,
          created_at,
          subscription_tiers (
            id,
            name,
            price_id,
            price_amount,
            features,
            created_at
          )
        `)
        .eq('user_id', user?.id)
        .single()

      if (error) {
        console.error('Subscription fetch error:', error)
        throw error
      }
      
      console.log('Fetched subscription data:', data)
      
      // Transform the data to match our UserSubscription type
      const transformedData: UserSubscription = {
        ...data,
        status: data.status as UserSubscription['status'], // Type assertion to ensure status matches the union type
        subscription_tier_id: data.subscription_tiers[0] // Get the first (and should be only) subscription tier
      }

      return transformedData
    },
    enabled: !!user,
  })

  const isSubscribed = subscription?.status === 'active'
  
  return {
    subscription,
    isLoading,
    isSubscribed,
  }
}