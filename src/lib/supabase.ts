import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient, User } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  // In production, we'll still throw an error
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Missing required Supabase environment variables');
  }
}

export const supabase: SupabaseClient = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

export async function getUser(): Promise<User | null> {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export async function signOut(): Promise<void> {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}

export async function signInWithEmail(email: string): Promise<void> {
  try {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) throw error;
  } catch (error) {
    console.error('Error signing in with email:', error);
    throw error;
  }
}
