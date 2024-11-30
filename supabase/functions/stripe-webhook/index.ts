import Stripe from 'https://esm.sh/stripe@12.18.0?target=deno'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string, {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
})

const cryptoProvider = Stripe.createSubtleCryptoProvider()

const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

console.log('Stripe Webhook Function Started')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (request) => {
  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, { 
      headers: corsHeaders,
      status: 200
    });
  }

  const signature = request.headers.get('Stripe-Signature')

  if (!signature) {
    console.error('No signature found in webhook request');
    return new Response('No signature found', { 
      status: 400,
      headers: corsHeaders 
    });
  }

  try {
    const body = await request.text()
    console.log('Received webhook body:', body);
    
    const event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      Deno.env.get('STRIPE_WEBHOOK_SIGNING_SECRET')!,
      undefined,
      cryptoProvider
    )

    console.log(`🔔 Event received: ${event.type}`, event);

    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('Processing subscription event:', subscription);
        await updateSubscription(subscription);
        break;
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('Processing subscription deletion:', subscription);
        await handleCancelledSubscription(subscription);
        break;
      }
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });

  } catch (err) {
    console.error('Error processing webhook:', err);
    return new Response(
      JSON.stringify({ error: err.message }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        }
      }
    );
  }
})

async function updateSubscription(subscription: Stripe.Subscription) {
  const { customer, id, status, current_period_start, current_period_end, metadata } = subscription;
  
  if (!metadata.user_id || !metadata.tier_id) {
    console.error('Missing metadata in subscription:', subscription);
    throw new Error('Missing user_id or tier_id in subscription metadata');
  }

  console.log('Updating subscription in database:', {
    user_id: metadata.user_id,
    tier_id: metadata.tier_id,
    status
  });

  const { error } = await supabaseAdmin.from('user_subscriptions').upsert({
    user_id: metadata.user_id,
    subscription_tier_id: metadata.tier_id,
    stripe_customer_id: customer as string,
    stripe_subscription_id: id,
    status,
    current_period_start: new Date(current_period_start * 1000).toISOString(),
    current_period_end: new Date(current_period_end * 1000).toISOString(),
  });

  if (error) {
    console.error('Error updating subscription in database:', error);
    throw error;
  }

  console.log('Successfully updated subscription in database');
}

async function handleCancelledSubscription(subscription: Stripe.Subscription) {
  console.log('Handling cancelled subscription:', subscription.id);
  
  const { error } = await supabaseAdmin.from('user_subscriptions')
    .update({
      status: subscription.status,
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString()
    })
    .eq('stripe_subscription_id', subscription.id);

  if (error) {
    console.error('Error updating cancelled subscription:', error);
    throw error;
  }

  console.log('Successfully updated cancelled subscription');
}