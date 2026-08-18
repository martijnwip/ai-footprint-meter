// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

// Statisch waar het kan, server-side alleen voor de drie API-routes.
// Die routes zetten zelf `export const prerender = false`.
export default defineConfig({
  site: "https://aifootprintmeter.org",
  output: "static",
  i18n: {
    defaultLocale: "nl",
    locales: ["nl", "en", "de", "fr", "es"],
    routing: { prefixDefaultLocale: false },
  },
  adapter: vercel({
    // Geen beeldoptimalisatie via Vercel: afbeeldingen worden vooraf
    // geoptimaliseerd meegeleverd, scheelt functieaanroepen en stroom.
    imageService: false,
  }),
  vite: {
    plugins: [tailwindcss()],
  },
});
