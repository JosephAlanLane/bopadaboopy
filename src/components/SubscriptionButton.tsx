import { Button } from "./ui/button"
import { useToast } from "./ui/use-toast"
import { useAuth } from "@/contexts/AuthContext"
import { supabase } from "@/integrations/supabase/client"
import { SubscriptionTier } from "@/integrations/supabase/types/subscription"

export function SubscriptionButton() {
  const { user } = useAuth()
  const { toast } = useToast()

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
      const { data, error } = await supabase
        .from('subscription_tiers')
        .select('*')
        .single() as { data: SubscriptionTier | null, error: Error | null }

      if (error) throw error

      if (!data) {
        throw new Error('No subscription tier found')
      }

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: data.price_id,
          userId: user.id,
          tierId: data.id
        }),
      })

      if (!response.ok) throw new Error('Failed to create checkout session')

      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Error",
        description: "Failed to start subscription process",
        variant: "destructive",
      })
    }
  }

  return (
    <Button 
      onClick={handleSubscribe}
      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
    >
      Subscribe for $1/month
    </Button>
  )
}