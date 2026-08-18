import type { APIRoute } from 'astro';
import { fetchConfirmedCount } from '../../lib/count';

export const prerender = false;

let cache: { value: number; until: number } | null = null;
const TTL_MS = 60_000;

export const GET: APIRoute = async () => {
  const now = Date.now();

  if (!cache || cache.until < now) {
    try {
      cache = { value: await fetchConfirmedCount(), until: now + TTL_MS };
    } catch (error) {
      console.error('Tellen mislukt', error);
      return new Response(JSON.stringify({ error: 'UNAVAILABLE' }), {
        status: 503,
        headers: { 'content-type': 'application/json' },
      });
    }
  }

  return new Response(JSON.stringify({ count: cache.value }), {
    headers: {
      'content-type': 'application/json',
      // Vercel serveert het antwoord een minuut uit de rand-cache.
      'cache-control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  });
};
