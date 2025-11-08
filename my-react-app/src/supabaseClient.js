import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://itaolvwazcwybrikayku.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0YW9sdndhemN3eWJyaWtheWt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MDU5NDMsImV4cCI6MjA3ODE4MTk0M30.-f8x3232ICRYu-133vRaICRdjRv_sOkdwAGn9_X2-q8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
