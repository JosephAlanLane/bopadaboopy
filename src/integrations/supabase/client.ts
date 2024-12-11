import { createClient } from '@supabase/supabase-js';

// Get environment variables with fallbacks for development
const supabaseUrl = 'https://geftfgjlqruwsbqcixxw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZnRmZ2pscXJ1d3NicWNpeHh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4OTQyMzAsImV4cCI6MjAyMjQ3MDIzMH0.qgZBPp_QWvN7YfGbqKKCWRuE8nzqvyUbQE-ePPFGwto';

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

// Test the connection and properly handle the Promise chain
supabase.from('recipes').select('count').single()
  .then((result) => {
    if (result.error) {
      console.error('Supabase connection error:', result.error);
    } else {
      console.log('Supabase connection successful');
    }
  })
  .catch((error) => {
    console.error('Supabase connection error:', error);
  });