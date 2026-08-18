import { getRelativeLocaleUrl } from 'astro:i18n';
import type { Dictionary } from './nl';
import nl from './nl';
import en from './en';
import de from './de';
import fr from './fr';
import es from './es';

export const locales = [
  { code: 'nl', nativeLabel: 'Nederlands' },
  { code: 'en', nativeLabel: 'English' },
  { code: 'de', nativeLabel: 'Deutsch' },
  { code: 'fr', nativeLabel: 'Français' },
  { code: 'es', nativeLabel: 'Español' },
] as const;

export type Locale = (typeof locales)[number]['code'];

const dictionaries: Record<Locale, Dictionary> = { nl, en, de, fr, es };

export function isLocale(value: string | undefined): value is Locale {
  return !!value && value in dictionaries;
}

export function useTranslations(locale: string | undefined): Dictionary {
  return dictionaries[isLocale(locale) ? locale : 'nl'];
}

export function getLocalizedPath(pathname: string, currentLocale: string | undefined, target: Locale): string {
  const current = isLocale(currentLocale) ? currentLocale : 'nl';
  let path = pathname;

  if (current !== 'nl') {
    path = path === `/${current}` ? '/' : path.replace(`/${current}/`, '/');
  }

  return getRelativeLocaleUrl(target, path.replace(/^\//, ''));
}
