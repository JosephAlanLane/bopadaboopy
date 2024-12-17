import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { corsHeaders, stripe } from '../_shared/stripe.ts'
import { handleInvoicePaid, handleSubscriptionUpdate } from '../_shared/stripe-handlers.ts'

serve(async (req) => {
  try {
    console.log('Received request method:', req.method)
    
    if (req.method === 'OPTIONS') {
      return new Response('ok', { headers: corsHeaders })
    }

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
        error: 'Missing stripe-signature header'
      }), { 
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SIGNING_SECRET')
    if (!webhookSecret) {
      console.error('Webhook secret not configured')
      return new Response(JSON.stringify({
        error: 'Webhook secret not configured'
      }), { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const body = await req.text()
    console.log('Processing webhook request, body length:', body.length)
    
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    )

    console.log(`Processing webhook event: ${event.type}`)

    switch (event.type) {
      case 'invoice.paid':
        await handleInvoicePaid(event.data.object)
        break

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        await handleSubscriptionUpdate(event.data.object)
        break
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