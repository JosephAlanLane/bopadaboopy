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
          *,
          subscription_tier_id:subscription_tiers(*)
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
        subscription_tier_id: data.subscription_tier_id[0] // Get the first (and should be only) subscription tier
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