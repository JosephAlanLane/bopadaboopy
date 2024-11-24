import { Button } from "./ui/button"
import { useToast } from "./ui/use-toast"
import { useAuth } from "@/contexts/AuthContext"
import { supabase } from "@/integrations/supabase/client"
import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import type { SubscriptionTier } from "@/integrations/supabase/types/subscription"

export function SubscriptionButton() {
  const { user } = useAuth()
  const { toast } = useToast()

  const { data: subscriptionTier, isLoading } = useQuery<SubscriptionTier>({
    queryKey: ['subscriptionTier'],
    queryFn: async () => {
      console.log('Fetching subscription tier')
      const { data, error } = await supabase
        .from('subscription_tiers')
        .select('*')
        .single()
      
      if (error) {
        console.error('Error fetching subscription tier:', error)
        throw error
      }
      console.log('Fetched subscription tier:', data)
      return data as SubscriptionTier
    },
    enabled: !!user,
  })

  const handleSubscribe = async () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to subscribe",
        variant: "destructive",
      })
      return
    }

    try {
      console.log('Creating checkout session for user:', user.id)
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          priceId: subscriptionTier?.price_id,
          userId: user.id,
          tierId: subscriptionTier?.id
        }),
      })

      const responseData = await response.json()
      
      if (!response.ok) {
        console.error('Error response:', responseData)
        throw new Error(responseData.error || 'Failed to create checkout session')
      }

      if (!responseData.url) {
        throw new Error('No checkout URL returned')
      }

      console.log('Redirecting to checkout URL:', responseData.url)
      window.location.href = responseData.url
    } catch (error) {
      console.error('Subscription error:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to start subscription process",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <Button disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Button>
    )
  }

  return (
    <Button 
      onClick={handleSubscribe}
      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
    >
      {user ? "Upgrade to Premium" : "Join the Family for $1/month!"}
    </Button>
  )
}