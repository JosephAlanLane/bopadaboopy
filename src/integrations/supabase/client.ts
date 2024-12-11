import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Initializing Supabase with:', {
  url: supabaseUrl,
  keyLength: supabaseAnonKey?.length || 0
});

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Environment variables:', {
    VITE_SUPABASE_URL: supabaseUrl,
    VITE_SUPABASE_ANON_KEY_LENGTH: supabaseAnonKey?.length || 0
  });
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
void (async () => {
  try {
    const result = await supabase.from('recipes').select('count').single();
    if (result.error) {
      console.error('Supabase connection error:', {
        error: result.error,
        message: result.error.message,
        details: result.error.details,
        hint: result.error.hint
      });
    } else {
      console.log('Supabase connection successful');
    }
  } catch (error) {
    console.error('Supabase connection error:', error);
  }
})();