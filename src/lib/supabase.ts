import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

/**
 * Server-side client met de service_role sleutel.
 * Deze sleutel omzeilt row level security en mag de browser nooit bereiken.
 */
export function supabase(): SupabaseClient {
  if (client) return client;

  const url = import.meta.env.SUPABASE_URL;
  const key = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      'SUPABASE_URL of SUPABASE_SERVICE_ROLE_KEY ontbreekt. Zie .env.example.',
    );
  }

  client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  return client;
}
