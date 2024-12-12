import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://geftfgjlqruwsbqcixxw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlZnRmZ2pscXJ1d3NicWNpeHh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc3NTQ3NzUsImV4cCI6MjAyMzMzMDc3NX0.vxMKpLMK0ZhxQG_RasEFwVDO8Fd8Xl5b_xF5XobXxZM',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
)