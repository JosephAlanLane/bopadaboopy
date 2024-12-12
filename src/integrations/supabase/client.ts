import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  throw new Error('Missing Supabase environment variables');
}

// Create the Supabase client with global error handling
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
  },
  global: {
    headers: {
      'x-my-custom-header': 'my-app-name',
    },
  },
  // Add default error handling through callbacks
  db: {
    schema: 'public',
  },
});

// Add error logging middleware
supabase.rest.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Supabase error:', error);
    return Promise.reject(error);
  }
);