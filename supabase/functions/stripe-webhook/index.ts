import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0'
import Stripe from 'https://esm.sh/stripe@12.18.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
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
    // Log headers for debugging (excluding sensitive data)
    console.log('Received request method:', req.method)
    
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
      return new Response('ok', { headers: corsHeaders })
    }

    // Verify it's a POST request
    if (req.method !== 'POST') {
      console.error('Invalid request method:', req.method)
      return new Response('Method not allowed', { 
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const signature = req.headers.get('stripe-signature')
    if (!signature) {
      console.error('Missing stripe-signature header')
      return new Response(JSON.stringify({
        error: 'Missing stripe-signature header. Please ensure webhook is configured correctly in Stripe dashboard.'
      }), { 
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SIGNING_SECRET')
    if (!webhookSecret) {
      console.error('Webhook secret not configured')
      return new Response(JSON.stringify({
        error: 'Webhook secret not configured in environment variables'
      }), { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const body = await req.text()
    console.log('Processing webhook request, body length:', body.length)
    
    let event
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret
      )
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`)
      return new Response(JSON.stringify({
        error: 'Webhook signature verification failed',
        details: err instanceof Error ? err.message : 'Unknown error'
      }), { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    console.log(`Processing webhook event: ${event.type}`)

    switch (event.type) {
      case 'invoice.paid': {
        const invoice = event.data.object
        console.log('Processing invoice.paid event:', invoice)

        // Get subscription details
        const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string)
        console.log('Retrieved subscription:', subscription)

        if (!subscription.metadata?.user_id) {
          console.error('No user_id found in subscription metadata')
          return new Response(JSON.stringify({
            error: 'No user_id found in subscription metadata',
            details: 'Please ensure user_id is included in subscription metadata when creating checkout session'
          }), { 
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          })
        }

        // Get subscription tier ID for premium tier
        const { data: subscriptionTier, error: tierError } = await supabase
          .from('subscription_tiers')
          .select('id')
          .eq('name', 'Premium')
          .single()

        if (tierError || !subscriptionTier) {
          console.error('Error fetching Premium subscription tier:', tierError)
          return new Response(JSON.stringify({
            error: 'Subscription tier not found',
            details: tierError?.message || 'Premium tier not found in database'
          }), { 
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          })
        }

        console.log('Found subscription tier:', subscriptionTier)

        // Create or update user subscription
        const { error: upsertError } = await supabase
          .from('user_subscriptions')
          .upsert({
            user_id: subscription.metadata.user_id,
            subscription_tier_id: subscriptionTier.id,
            stripe_subscription_id: subscription.id,
            stripe_customer_id: invoice.customer,
            status: subscription.status,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          }, {
            onConflict: 'user_id'
          })

        if (upsertError) {
          console.error('Error upserting subscription:', upsertError)
          return new Response(JSON.stringify({
            error: 'Error creating subscription',
            details: upsertError.message
          }), { 
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          })
        }

        console.log('Successfully created/updated subscription')
        break
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object
        console.log('Subscription event:', event.type, subscription)
        
        if (!subscription.metadata?.user_id) {
          console.error('No user_id found in subscription metadata')
          return new Response(JSON.stringify({
            error: 'No user_id in subscription metadata',
            details: 'Please ensure user_id is included in subscription metadata'
          }), { 
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          })
        }

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
          return new Response(JSON.stringify({
            error: 'Error updating subscription',
            details: updateError.message
          }), { 
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          })
        }

        console.log('Successfully updated subscription status to:', status)
        break
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('Error processing webhook:', err)
    return new Response(JSON.stringify({
      error: 'Webhook processing failed',
      details: err instanceof Error ? err.message : 'Unknown error occurred'
    }), { 
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})