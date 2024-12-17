import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0'
import { stripe } from './stripe.ts'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') || '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
)

export async function handleInvoicePaid(invoice: any) {
  console.log('Processing invoice.paid event:', invoice)

  const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string)
  console.log('Retrieved subscription:', subscription)

  if (!subscription.metadata?.user_id) {
    throw new Error('No user_id found in subscription metadata')
  }

  const { data: subscriptionTier, error: tierError } = await supabase
    .from('subscription_tiers')
    .select('id')
    .eq('name', 'Premium')
    .single()

  if (tierError || !subscriptionTier) {
    throw new Error(tierError?.message || 'Premium tier not found in database')
  }

  console.log('Found subscription tier:', subscriptionTier)

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
    throw new Error(`Error upserting subscription: ${upsertError.message}`)
  }

  console.log('Successfully created/updated subscription')
}

export async function handleSubscriptionUpdate(subscription: any) {
  console.log('Processing subscription update:', subscription)

  if (!subscription.metadata?.user_id) {
    throw new Error('No user_id found in subscription metadata')
  }

  const { error: updateError } = await supabase
    .from('user_subscriptions')
    .update({
      status: subscription.status,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
    })
    .eq('stripe_subscription_id', subscription.id)

  if (updateError) {
    throw new Error(`Error updating subscription: ${updateError.message}`)
  }

  console.log('Successfully updated subscription status')
}