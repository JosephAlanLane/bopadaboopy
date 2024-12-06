import { createClient } from '@supabase/supabase-js';

// Get environment variables with fallbacks for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://geftfgjlqruwsbqcixxw.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZnRmZ2pscXJ1d3NicWNpeHh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4OTQyMzAsImV4cCI6MjAyMjQ3MDIzMH0.qgZBPp_QWvN7YfGbqKKCWRuE8nzqvyUbQE-ePPFGwto';

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});