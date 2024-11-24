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

Deno.serve(async (request) => {
  const signature = request.headers.get('Stripe-Signature')

  if (!signature) {
    return new Response('No signature found', { status: 400 })
  }

  const body = await request.text()
  let event

  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature!,
      Deno.env.get('STRIPE_WEBHOOK_SIGNING_SECRET')!,
      undefined,
      cryptoProvider
    )
  } catch (err) {
    console.error(`⚠️ Webhook signature verification failed.`, err.message)
    return new Response(err.message, { status: 400 })
  }

  console.log(`🔔 Event received: ${event.type}`)

  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        const subscription = event.data.object as Stripe.Subscription
        await updateSubscription(subscription)
        break
      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object as Stripe.Subscription
        await handleCancelledSubscription(deletedSubscription)
        break
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (err) {
    console.error(`❌ Error processing event ${event.type}:`, err)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})

async function updateSubscription(subscription: Stripe.Subscription) {
  const { customer, id, status, current_period_start, current_period_end, metadata } = subscription
  
  if (!metadata.user_id || !metadata.tier_id) {
    throw new Error('Missing user_id or tier_id in subscription metadata')
  }

  await supabaseAdmin.from('user_subscriptions').upsert({
    user_id: metadata.user_id,
    subscription_tier_id: metadata.tier_id,
    stripe_customer_id: customer as string,
    stripe_subscription_id: id,
    status,
    current_period_start: new Date(current_period_start * 1000).toISOString(),
    current_period_end: new Date(current_period_end * 1000).toISOString(),
  })
}

async function handleCancelledSubscription(subscription: Stripe.Subscription) {
  await supabaseAdmin.from('user_subscriptions')
    .update({
      status: subscription.status,
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString()
    })
    .eq('stripe_subscription_id', subscription.id)
}