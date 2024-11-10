import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gidqmlgtgcpzjlybsgrd.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpZHFtbGd0Z2NwempseWJzZ3JkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk5MDMxNTMsImV4cCI6MjA0NTQ3OTE1M30.tp2ybrXARJX78a5oKVHAcXxiy99-sxN8NE35hfchGSA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})