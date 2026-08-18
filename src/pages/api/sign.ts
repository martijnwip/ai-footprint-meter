import type { APIRoute } from 'astro';
import { checkBotId } from 'botid/server';
import { supabase } from '../../lib/supabase';
import { sendConfirmationMail } from '../../lib/email';
import { isLocale, type Locale } from '../../i18n/utils';

export const prerender = false;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_FILL_MS = 2000;

// Simpele teller per instantie. Voor echte bescherming: Upstash Redis (EU).
const hits = new Map<string, { count: number; until: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(key: string) {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || entry.until < now) {
    hits.set(key, { count: 1, until: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

async function hashIp(ip: string) {
  const secret = import.meta.env.IP_HASH_SECRET ?? '';
  const bytes = new TextEncoder().encode(`${secret}:${ip}`);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function token() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function localePath(lang: Locale, path: string) {
  return lang === 'nl' ? path : `/${lang}${path}`;
}

export const POST: APIRoute = async ({ request, clientAddress, url }) => {
  const contentType = request.headers.get('content-type') ?? '';
  const wantsJson = request.headers.get('accept')?.includes('application/json') ?? false;

  const payload: Record<string, unknown> = contentType.includes('application/json')
    ? await request.json().catch(() => ({}))
    : Object.fromEntries(await request.formData());

  const lang: Locale = isLocale(payload.lang as string | undefined) ? (payload.lang as Locale) : 'nl';
  const bijnaKlaarPath = localePath(lang, '/bijna-klaar');

  const respond = (status: number, body: Record<string, unknown>, redirect?: string) => {
    if (!wantsJson && redirect) {
      return new Response(null, { status: 303, headers: { location: redirect } });
    }
    return new Response(JSON.stringify(body), {
      status,
      headers: { 'content-type': 'application/json' },
    });
  };

  const { isBot } = await checkBotId();
  if (isBot) {
    return respond(403, { error: 'BOT_DETECTED' });
  }

  // Spamval en invultijd
  if (typeof payload.website === 'string' && payload.website.trim() !== '') {
    return respond(200, { ok: true }, bijnaKlaarPath);
  }

  const renderedAt = Number(payload.renderedAt);
  if (Number.isFinite(renderedAt) && renderedAt > 0 && Date.now() - renderedAt < MIN_FILL_MS) {
    return respond(400, { error: 'TOO_FAST' });
  }

  const name = String(payload.name ?? '').trim();
  const email = String(payload.email ?? '')
    .trim()
    .toLowerCase();
  const newsletter = payload.newsletter === 'ja' || payload.newsletter === true;

  if (name.length < 2 || name.length > 120) {
    return respond(400, { error: 'INVALID_NAME' });
  }
  if (!EMAIL.test(email) || email.length > 200) {
    return respond(400, { error: 'INVALID_EMAIL' });
  }

  if (rateLimited(clientAddress ?? 'onbekend')) {
    return respond(429, { error: 'RATE_LIMITED' });
  }

  const db = supabase();
  const confirmToken = token();

  const { data: existing } = await db
    .from('signatures')
    .select('id, confirmed_at')
    .eq('email', email)
    .maybeSingle();

  if (existing?.confirmed_at) {
    return respond(200, { ok: true, already: true }, bijnaKlaarPath);
  }

  const record = {
    name,
    email,
    newsletter,
    confirm_token: confirmToken,
    ip_hash: await hashIp(clientAddress ?? ''),
    user_agent: (request.headers.get('user-agent') ?? '').slice(0, 300),
  };

  const { error } = existing
    ? await db.from('signatures').update(record).eq('id', existing.id)
    : await db.from('signatures').insert(record);

  if (error) {
    console.error('Opslaan mislukt', error);
    return respond(500, { error: 'SAVE_FAILED' });
  }

  const base = import.meta.env.PUBLIC_SITE_URL ?? url.origin;
  const confirmUrl = `${base.replace(/\/$/, '')}/api/confirm?token=${confirmToken}&lang=${lang}`;

  try {
    await sendConfirmationMail({ to: email, name, confirmUrl, lang });
  } catch (mailError) {
    console.error('Mail versturen mislukt', mailError);
    return respond(500, { error: 'MAIL_FAILED' });
  }

  return respond(200, { ok: true }, bijnaKlaarPath);
};
