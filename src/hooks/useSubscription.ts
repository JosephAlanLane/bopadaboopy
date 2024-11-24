import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/contexts/AuthContext"
import type { UserSubscription } from "@/integrations/supabase/types/subscription"

export function useSubscription() {
  const { user } = useAuth()

  const { data: subscription, isLoading } = useQuery<UserSubscription>({
    queryKey: ['subscription', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_subscriptions')
        .select('*, subscription_tier_id(*)')
        .eq('user_id', user?.id)
        .single()

      if (error) throw error
      return data as UserSubscription
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