import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';
import { isLocale, type Locale } from '../../i18n/utils';

export const prerender = false;

function bevestigdPath(lang: Locale, status: 'ok' | 'al' | 'ongeldig') {
  const prefix = lang === 'nl' ? '' : `/${lang}`;
  return `${prefix}/bevestigd?status=${status}`;
}

export const GET: APIRoute = async ({ url, redirect }) => {
  const token = url.searchParams.get('token');
  const lang: Locale = isLocale(url.searchParams.get('lang') ?? undefined)
    ? (url.searchParams.get('lang') as Locale)
    : 'nl';

  if (!token || token.length !== 64) {
    return redirect(bevestigdPath(lang, 'ongeldig'), 303);
  }

  const db = supabase();

  const { data, error } = await db
    .from('signatures')
    .select('id, confirmed_at')
    .eq('confirm_token', token)
    .maybeSingle();

  if (error || !data) {
    return redirect(bevestigdPath(lang, 'ongeldig'), 303);
  }

  if (data.confirmed_at) {
    return redirect(bevestigdPath(lang, 'al'), 303);
  }

  const { error: updateError } = await db
    .from('signatures')
    .update({ confirmed_at: new Date().toISOString(), confirm_token: null })
    .eq('id', data.id);

  if (updateError) {
    return redirect(bevestigdPath(lang, 'ongeldig'), 303);
  }

  return redirect(bevestigdPath(lang, 'ok'), 303);
};
