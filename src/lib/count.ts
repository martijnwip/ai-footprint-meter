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

export function formatCount(value: number): string {
  return new Intl.NumberFormat('nl-NL').format(value);
}
