// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// Statisch waar het kan, server-side alleen voor de drie API-routes.
// Die routes zetten zelf `export const prerender = false`.
export default defineConfig({
  site: 'https://aifootprintmeter.eu',
  output: 'static',
  adapter: vercel({
    // Geen beeldoptimalisatie via Vercel: afbeeldingen worden vooraf
    // geoptimaliseerd meegeleverd, scheelt functieaanroepen en stroom.
    imageService: false,
  }),
  vite: {
    plugins: [tailwindcss()],
  },
});
