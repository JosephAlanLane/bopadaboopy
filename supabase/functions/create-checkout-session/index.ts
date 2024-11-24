import Stripe from 'https://esm.sh/stripe@12.18.0?target=deno'
import { corsHeaders } from '../_shared/cors.ts'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string, {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
})

console.log('Create Checkout Session Function Started')

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Parse the request body
    const { priceId, userId, tierId } = await req.json()
    
    console.log('Received request:', { priceId, userId, tierId })
    
    if (!priceId || !userId || !tierId) {
      console.error('Missing required fields:', { priceId, userId, tierId })
      throw new Error('Missing required fields: priceId, userId, or tierId')
    }

    if (!Deno.env.get('STRIPE_SECRET_KEY')) {
      console.error('STRIPE_SECRET_KEY is not set')
      throw new Error('Stripe secret key is not configured')
    }

    console.log('Creating Stripe checkout session...')
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${req.headers.get('origin')}/subscription/success`,
      cancel_url: `${req.headers.get('origin')}/subscription/cancel`,
      metadata: {
        user_id: userId,
        tier_id: tierId
      }
    })

    console.log('Checkout session created:', session.id)

    return new Response(
      JSON.stringify({ url: session.url }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error in create-checkout-session:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'If you are seeing this error, please check the Edge Function logs'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})