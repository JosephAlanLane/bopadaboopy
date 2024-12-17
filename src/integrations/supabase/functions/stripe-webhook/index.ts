import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@12.0.0";

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
});

const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

serve(async (req) => {
  try {
    const signature = req.headers.get('stripe-signature');
    if (!signature) {
      return new Response('No signature', { status: 400 });
    }

    const body = await req.text();
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SIGNING_SECRET');
    
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret!
      );
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    console.log(`Event type: ${event.type}`);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        console.log('Checkout session completed:', session);

        // Get or create subscription tier
        const { data: subscriptionTier } = await supabase
          .from('subscription_tiers')
          .select()
          .eq('price_id', session.subscription)
          .single();

        if (!subscriptionTier) {
          console.error('Subscription tier not found');
          return new Response('Subscription tier not found', { status: 400 });
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
          });

        if (upsertError) {
          console.error('Error upserting subscription:', upsertError);
          return new Response('Error creating subscription', { status: 500 });
        }

        break;
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        
        const status = event.type === 'customer.subscription.deleted' ? 'canceled' : subscription.status;

        const { error: updateError } = await supabase
          .from('user_subscriptions')
          .update({
            status,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id);

        if (updateError) {
          console.error('Error updating subscription:', updateError);
          return new Response('Error updating subscription', { status: 500 });
        }

        break;
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error processing webhook:', err);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }
});