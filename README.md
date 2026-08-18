# The AI Footprint Meter — campagnepagina

Statische campagnepagina met een tekenformulier. Astro + Tailwind, gehost op Vercel,
handtekeningen in Supabase (regio Frankfurt).

De pagina is één op één overgezet uit `design.html` — dat bestand is het Claude-prototype
waaruit het ontwerp komt en wordt niet gepubliceerd. De tekst volgt het ontwerp, niet
`Copy Website.md`.

## Snel starten

```bash
npm install
cp .env.example .env      # vul de waarden in
npm run dev               # http://localhost:4321
```

Zonder `.env` draait de pagina gewoon: de teller blijft dan verborgen en het formulier
geeft een foutmelding bij verzenden.

## Opzet

| Onderdeel | Keuze |
| --- | --- |
| Framework | Astro 7, statische output, geen UI-framework |
| Styling | Tailwind 4, tokens uit `design.html` in `src/styles/global.css` |
| Hosting | Vercel, functies in `fra1` (zie `vercel.json`) |
| Database | Supabase Postgres, regio Frankfurt |
| Mail | Brevo, transactioneel, dubbele opt-in |
| Interactie | Geen React. `<details>` voor de accordeon, twee kleine scripts |

De hele pagina komt op ongeveer 13 kB over de lijn, gecomprimeerd, zonder webfonts.
Dat is een bewuste keuze: een oproep over stroomverbruik die zelf megabytes verstookt,
overtuigt niemand.

## Supabase

1. Maak een project aan in regio **Central EU (Frankfurt)**.
2. Draai `supabase/schema.sql` in de SQL-editor.
3. Zet `SUPABASE_URL` en `SUPABASE_SERVICE_ROLE_KEY` in `.env`.

Row level security staat aan zonder policies. Alleen de `service_role` sleutel komt bij de
tabel, en die blijft server-side. Zet hem nooit achter `PUBLIC_`.

Onbevestigde handtekeningen ouder dan 48 uur worden opgeruimd door `public.prune_unconfirmed()`.
Koppel die aan pg_cron (voorbeeld staat onderin het SQL-bestand).

## Brevo

1. Maak een account, verifieer het afzenderdomein en zet SPF, DKIM en DMARC goed.
   Zonder dat komt de bevestigingsmail in de spammap en zakt de conversie in.
2. Maak een API-sleutel en zet die in `BREVO_API_KEY`.
3. `MAIL_FROM_EMAIL` moet op het geverifieerde domein staan.

## Vercel

1. Koppel de repo. Framework wordt herkend als Astro.
2. Zet alle variabelen uit `.env.example` in Project Settings → Environment Variables.
   `PUBLIC_SITE_URL` moet de echte domeinnaam zijn, anders wijst de bevestigingslink verkeerd.
3. `vercel.json` zet `regions: ["fra1"]`, zodat het formulierendpoint naast de database draait.

Let op: `fra1` verplaatst de compute naar Duitsland, maar Vercel Inc. blijft een Amerikaanse
partij met toegang tot omgeving, logs en sleutels. De persoonsgegevens staan daarom bij
Supabase in Frankfurt en niet bij Vercel. De zin op de pagina — "staan op servers in de EU" —
dekt daarmee de lading.

## Routes

| Route | Type | Functie |
| --- | --- | --- |
| `/` | statisch | de campagnepagina |
| `/bijna-klaar` | statisch | na verzenden: kijk in je mail |
| `/bevestigd` | statisch | na de klik in de mail (`?status=ok\|al\|ongeldig`) |
| `/privacy` | statisch | privacyverklaring — **nog concept** |
| `/api/sign` | server | opslaan plus bevestigingsmail |
| `/api/confirm` | server | token verzilveren |
| `/api/count` | server | aantal bevestigde handtekeningen, één minuut gecacht |

Het formulier werkt ook zonder JavaScript: dan wordt het een gewone POST met een
doorverwijzing naar `/bijna-klaar`.

## Spam

Nu ingebouwd: een verborgen invulveld, een minimale invultijd van twee seconden, een
teller per IP-adres en dubbele opt-in. Dat laatste is de echte drempel.

Bij serieuze aanvallen: Altcha ervoor zetten (proof-of-work, zelf te hosten, geen derde
partij) en de teller verplaatsen naar Upstash Redis in een EU-regio. De huidige teller zit
in het geheugen van één functie-instantie en werkt dus niet over meerdere instanties heen.

## Wat nog open staat

- **De cijfers spreken elkaar tegen.** De meterkaart toont `15 tekstvragen 0,01 · 3
  flyerafbeeldingen 0,15 · 1 video 2,74`. De optelsom eronder rekent met `15 vragen + 10
  pogingen voor een afbeelding + 3 pogingen voor een filmpje`. Dit stond ook al in
  `Copy Website.md` en is nog niet opgelost. Eén van beide moet wijken.
- **Privacyverklaring** is een concept en moet nagekeken worden voor livegang.
- **`og.png`** ontbreekt nog in `public/`. Zonder deelafbeelding ziet een gedeelde link er
  kaal uit, en delen is bij deze oproep het hele werk.
- **`npm audit`** meldt drie keer `path-to-regexp`, via `@astrojs/vercel` →
  `@vercel/routing-utils`. Dat zit in het buildproces, niet in wat de bezoeker krijgt.
  Verdwijnt zodra de adapter meegaat; niet zelf forceren.
- **Analytics** zit er niet in. Plausible of Simple Analytics past hier: cookieloos,
  EU-gehost, geen cookiebanner.
# ai-footprint-meter
