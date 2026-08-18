import { supabase } from './supabase';

/**
 * Aantal bevestigde handtekeningen.
 * Wordt op twee momenten gebruikt: tijdens de build (voor het getal in de HTML)
 * en door /api/count (voor de verversing in de browser).
 */
export async function fetchConfirmedCount(): Promise<number> {
  const { count, error } = await supabase()
    .from('signatures')
    .select('id', { count: 'exact', head: true })
    .not('confirmed_at', 'is', null);

  if (error) throw new Error(error.message);
  return count ?? 0;
}

/**
 * Zelfde, maar valt terug op 0 als er geen sleutels zijn.
 * Zo blijft `astro build` werken op een machine zonder .env.
 */
export async function fetchConfirmedCountSafe(): Promise<number> {
  try {
    return await fetchConfirmedCount();
  } catch {
    return 0;
  }
}

const NUMBER_LOCALES: Record<string, string> = {
  nl: 'nl-NL',
  en: 'en-GB',
  de: 'de-DE',
  fr: 'fr-FR',
  es: 'es-ES',
};

export function formatCount(value: number, locale?: string): string {
  return new Intl.NumberFormat(NUMBER_LOCALES[locale ?? 'nl'] ?? 'nl-NL').format(value);
}
