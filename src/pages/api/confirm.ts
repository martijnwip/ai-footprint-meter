import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';

export const prerender = false;

export const GET: APIRoute = async ({ url, redirect }) => {
  const token = url.searchParams.get('token');

  if (!token || token.length !== 64) {
    return redirect('/bevestigd?status=ongeldig', 303);
  }

  const db = supabase();

  const { data, error } = await db
    .from('signatures')
    .select('id, confirmed_at')
    .eq('confirm_token', token)
    .maybeSingle();

  if (error || !data) {
    return redirect('/bevestigd?status=ongeldig', 303);
  }

  if (data.confirmed_at) {
    return redirect('/bevestigd?status=al', 303);
  }

  const { error: updateError } = await db
    .from('signatures')
    .update({ confirmed_at: new Date().toISOString(), confirm_token: null })
    .eq('id', data.id);

  if (updateError) {
    return redirect('/bevestigd?status=ongeldig', 303);
  }

  return redirect('/bevestigd?status=ok', 303);
};
