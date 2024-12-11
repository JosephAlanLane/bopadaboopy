import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Initializing Supabase with:', {
  url: supabaseUrl,
  keyLength: supabaseAnonKey?.length || 0
});

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
  },
});

// Add console logs to help with debugging
console.log('Supabase client initialized with URL:', supabaseUrl);
console.log('Testing Supabase connection...');

// Test the connection
Promise.resolve(
  supabase.from('recipes').select('count').single()
).then((result) => {
  if (result.error) {
    console.error('Supabase connection error:', {
      error: result.error,
      status: result.error.status,
      message: result.error.message,
      details: result.error.details
    });
  } else {
    console.log('Supabase connection successful');
  }
}).catch((error: Error) => {
  console.error('Supabase connection error:', error);
});