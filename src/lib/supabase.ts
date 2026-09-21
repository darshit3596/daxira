import { createClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL || '';
// Clean URL by stripping trailing slashes or /rest/v1 and ensuring https:// protocol
const cleanedUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '').trim();
const supabaseUrl = cleanedUrl
  ? cleanedUrl.startsWith('http://')
    ? cleanedUrl.replace(/^http:\/\//, 'https://')
    : cleanedUrl.startsWith('https://')
      ? cleanedUrl
      : `https://${cleanedUrl}`
  : '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  !supabaseUrl.includes('your-project-ref') &&
  !supabaseAnonKey.includes('your-anon-publishable-key')
);

// Create standard Supabase client with persistSession enabled
export const supabase = createClient(
  isSupabaseConfigured ? supabaseUrl : 'https://placeholder.supabase.co',
  isSupabaseConfigured ? supabaseAnonKey : 'placeholder-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);
