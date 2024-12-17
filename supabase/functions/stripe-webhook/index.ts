import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0'
import Stripe from 'https://esm.sh/stripe@12.18.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
})

const supabaseUrl = Deno.env.get('SUPABASE_URL')
const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

serve(async (req) => {
  try {
    if (req.method === 'OPTIONS') {
      return new Response('ok', { headers: corsHeaders })
    }

    const signature = req.headers.get('stripe-signature')
    if (!signature) {
      console.error('No signature found in webhook request')
      return new Response('No signature', { status: 400 })
    }

    const body = await req.text()
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SIGNING_SECRET')
    
    let event
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret!
      )
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`)
      return new Response(`Webhook Error: ${err.message}`, { status: 400 })
    }

    console.log(`Processing webhook event: ${event.type}`)

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        console.log('Checkout session completed:', session)

        // Get subscription tier ID for premium tier
        const { data: subscriptionTier } = await supabase
          .from('subscription_tiers')
          .select('id')
          .eq('name', 'Premium')
          .single()

        if (!subscriptionTier) {
          console.error('Premium subscription tier not found')
          return new Response('Subscription tier not found', { status: 400 })
        }

        // Create or update user subscription
        const { error: upsertError } = await supabase
          .from('user_subscriptions')
          .upsert({
            user_id: session.client_reference_id,
            subscription_tier_id: subscriptionTier.id,
            stripe_subscription_id: session.subscription,
            stripe_customer_id: session.customer,
            status: 'active',
            current_period_start: new Date(session.subscription_start * 1000).toISOString(),
            current_period_end: new Date(session.subscription_end * 1000).toISOString(),
          }, {
            onConflict: 'user_id'
          })

        if (upsertError) {
          console.error('Error upserting subscription:', upsertError)
          return new Response('Error creating subscription', { status: 500 })
        }

        break
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object
        console.log('Subscription event:', event.type, subscription)
        
        const status = event.type === 'customer.subscription.deleted' ? 'canceled' : subscription.status

        const { error: updateError } = await supabase
          .from('user_subscriptions')
          .update({
            status,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id)

        if (updateError) {
          console.error('Error updating subscription:', updateError)
          return new Response('Error updating subscription', { status: 500 })
        }

        break
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('Error processing webhook:', err)
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }
})