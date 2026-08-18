export interface QuoteItem {
  text: string;
  source: string;
}

export interface SourceItem {
  text: string;
  em: string;
  tail: string;
  href: string;
  label: string;
}

export interface Dictionary {
  html: { lang: string; ogLocale: string; skipLink: string };
  footer: { initiativeBy: string };
  cookieBadge: { message: string; dismissAria: string };
  stickyBar: { brand: string };
  seo: {
    homeTitle: string;
    homeDescription: string;
    privacyTitle: string;
    privacyDescription: string;
    bijnaKlaarTitle: string;
    bijnaKlaarDescription: string;
    bevestigdTitle: string;
    bevestigdDescription: string;
  };
  hero: { ariaLabel: string; title: string; intro: string; cta: string; meterCaption: string };
  meterCard: {
    label: string;
    meta: string;
    total: string;
    unit: string;
    caption: string;
    rows: { label: string; value: string }[];
    comparisonLabel: string;
    comparisons: { value: string; label: string }[];
  };
  chatMockup: {
    ariaLabel: string;
    caption: string;
    sidebarBrand: string;
    newChat: string;
    recentLabel: string;
    chatTitle1: string;
    chatUsage1: string;
    chatTitle2: string;
    chatUsage2: string;
    userMessage: string;
    assistantReply: string;
    attachmentTitle: string;
    attachmentMeta: string;
    statLabel: string;
    statMeta: string;
    rows: { label: string; value: string }[];
    sustainabilityNote: string;
  };
  eveningSum: {
    ariaLabel: string;
    heading: string;
    intro: string;
    steps: string[];
    sumTerms: string[];
    sumResult: string;
    sumConclusion: string;
    sourcePrefix: string;
    sourceLabel: string;
  };
  afterMath: { ariaLabel: string; p1: string; p2: string; p3: string };
  beats: { ariaLabel: string; beat1: string; beat2: string };
  noAccident: {
    ariaLabel: string;
    heading: string;
    p1: string;
    p2: string;
    p3: string;
    quotes: QuoteItem[];
    p4: string;
    p5: string;
  };
  notNew: {
    ariaLabel: string;
    heading: string;
    p1: string;
    p2: string;
    p3: string;
    euLabel: string;
    euSince: string;
    nutriScore: string;
    nutriSince: string;
    flightLabel: string;
    flightSince: string;
  };
  midCta: { ariaLabel: string; heading: string; cta: string; countSuffix: string };
  theAsk: {
    ariaLabel: string;
    heading: string;
    introPrefix: string;
    introStrong: string;
    asks: string[];
    whoLabel: string;
    whoText: string;
    whyLabel: string;
    whyText: string;
    conclusion: string;
  };
  signForm: {
    heading: string;
    nameLabel: string;
    emailLabel: string;
    newsletterLabel: string;
    honeypotLabel: string;
    submit: string;
    submitting: string;
    privacyPrefix: string;
    privacyLink: string;
    successHeading: string;
    successBody: string;
    successHelpPrefix: string;
    errors: {
      GENERIC: string;
      NETWORK: string;
      TOO_FAST: string;
      INVALID_NAME: string;
      INVALID_EMAIL: string;
      RATE_LIMITED: string;
      BOT_DETECTED: string;
      SAVE_FAILED: string;
      MAIL_FAILED: string;
    };
  };
  objections: { ariaLabel: string; heading: string; faqs: { q: string; a: string }[] };
  whoWeAre: {
    ariaLabel: string;
    heading: string;
    intro: string;
    sourcesLabel: string;
    sources: SourceItem[];
    outroPrefix: string;
  };
  timeline: {
    ariaLabel: string;
    heading: string;
    steps: { title: string; body: string }[];
    footer: string;
  };
  bijnaKlaar: { heading: string; body: string; helpPrefix: string; back: string };
  bevestigd: {
    okHeading: string;
    okBody: string;
    alHeading: string;
    alBody: string;
    ongeldigHeading: string;
    ongeldigBody: string;
    copy: string;
    copied: string;
    copyFailed: string;
    shareEmail: string;
    shareSubject: string;
    shareBody: string;
    back: string;
  };
  privacy: {
    heading: string;
    concept: string;
    storedHeading: string;
    stored: string[];
    whereHeading: string;
    whereText: string;
    purposeHeading: string;
    purposeText: string;
    durationHeading: string;
    durationText: string;
    deleteHeading: string;
    deletePrefix: string;
    back: string;
  };
  email: {
    subject: string;
    greetingPrefix: string;
    confirmLine: string;
    buttonText: string;
    buttonFallback: string;
    body1: string;
    body2: string;
  };
}

const nl: Dictionary = {
  html: { lang: 'nl', ogLocale: 'nl_NL', skipLink: 'Naar de inhoud' },
  footer: { initiativeBy: 'Initiatief van' },
  cookieBadge: { message: 'Dit is een cookie-vrije omgeving.', dismissAria: 'Melding sluiten' },
  stickyBar: { brand: 'The AI Footprint Meter' },
  seo: {
    homeTitle: 'Je wasmachine heeft een energielabel. Je AI-chat niet.',
    homeDescription:
      'Wij vragen de Europese Unie om AI-aanbieders te verplichten het energieverbruik van elk antwoord te tonen. In de app. Op het moment zelf.',
    privacyTitle: 'Privacyverklaring — The AI Footprint Meter',
    privacyDescription: 'Wat er met je gegevens gebeurt als je deze oproep tekent.',
    bijnaKlaarTitle: 'Bijna klaar — The AI Footprint Meter',
    bijnaKlaarDescription: 'Er staat één link in je mail. Klik erop en je naam staat eronder.',
    bevestigdTitle: 'Getekend. Dank je. — The AI Footprint Meter',
    bevestigdDescription: 'Je handtekening staat eronder.',
  },
  hero: {
    ariaLabel: 'Introductie',
    title: 'Je wasmachine heeft een energielabel. Je AI-chat niet.',
    intro:
      'Wij vragen de Europese Unie om AI-aanbieders te verplichten het energieverbruik van elk chat te tonen. In de app. Op het moment zelf.',
    cta: 'Teken de oproep',
    meterCaption: 'Zo zou dat eruit kunnen zien:',
  },
  meterCard: {
    label: 'Gespreksverbruik',
    meta: '24 berichten · sinds 20:02',
    total: '2,9',
    unit: 'kWh',
    caption: 'deze avond, tot nu toe',
    rows: [
      { label: '15 tekstvragen', value: '0,01 kWh (0,3%)' },
      { label: '3 flyerafbeeldingen', value: '0,15 kWh (5%)' },
      { label: '1 video van 5 seconden', value: '2,74 kWh (95%)' },
    ],
    comparisonLabel: 'Ongeveer gelijk aan',
    comparisons: [
      { value: '3×', label: 'wasmachine op 40°C' },
      { value: '15 km', label: 'rijden, elektrische auto' },
      { value: '2 dagen', label: 'koelkast aan' },
    ],
  },
  chatMockup: {
    ariaLabel: 'In de chat zelf',
    caption: 'Voorbeeld vanuit de Chat zelf',
    sidebarBrand: 'verda',
    newChat: '+ Nieuwe chat',
    recentLabel: 'Recent',
    chatTitle1: 'Sponsoractie halve marathon',
    chatUsage1: '2,9 kWh',
    chatTitle2: 'Teamuitje ideeën',
    chatUsage2: '0,4 kWh',
    userMessage: 'Maak een filmpje van 5 seconden van de flyer voor Instagram Stories.',
    assistantReply: 'Klaar — hier is een clip van 5 seconden, 1080×1920.',
    attachmentTitle: 'Sponsorflyer — Stories',
    attachmentMeta: '5s · 1080×1920',
    statLabel: 'Gespreksverbruik',
    statMeta: '24 berichten',
    rows: [
      { label: '15 tekstvragen', value: '0,3%' },
      { label: '3 flyerafbeeldingen', value: '5%' },
      { label: '1 video van 5 seconden', value: '95%' },
    ],
    sustainabilityNote: '41% liep op duurzame energie',
  },
  eveningSum: {
    ariaLabel: 'Eén avond',
    heading: 'Voorbeeld:',
    intro: 'Stel iemand wil meedoen aan de halve marathon en zoekt sponsors.',
    steps: [
      'Vijftien vragen aan de chatbot: hoe je sponsors benadert, wat een realistisch streefbedrag is, hoe je een appje schrijft dat mensen niet wegklikken.',
      'Dan de flyer. Drie afbeeldingen voordat er een versie is die goed genoeg is.',
      'En tot slot één filmpje van vijf seconden voor Instagram.',
    ],
    sumTerms: ['15 vragen', '10 pogingen voor een afbeelding', '3 pogingen voor een filmpje van 5 sec'],
    sumResult: '2,9 kilowattuur',
    sumConclusion: '3x wasbeurten op 40 graden.',
    sourcePrefix: 'Bron: ',
    sourceLabel: 'MIT technologyreview.com',
  },
  afterMath: {
    ariaLabel: 'Drie keer wassen',
    p1: 'Dat is wat die avond kostte.',
    p2: 'Dat getal was nergens te zien. Niet tijdens het werken, niet achteraf. Het stond niet in de app, niet in een instelling, niet in een maandoverzicht. Nergens.',
    p3: 'Niemand wist dat het filmpje het duurste was. Niemand wist dat vijftien vragen stellen bijna niets kost. Er was geen enkele reden om er iets van te vinden, want er was niets om iets van te vinden.',
  },
  beats: {
    ariaLabel: 'Tussenzin',
    beat1: 'Hoeveel wasmachines heb jij vanavond aangezet?',
    beat2: 'Alleen bij het snelst groeiende stroomverbruik van dit moment weet niemand iets.',
  },
  noAccident: {
    ariaLabel: 'Geen toeval',
    heading: 'Je weet het niet. En dat is geen toeval.',
    p1: 'De cijfers hierboven komen uit metingen aan open modellen — software die onderzoekers zelf kunnen downloaden en doormeten.',
    p2: 'De chatbots die honderden miljoenen mensen dagelijks gebruiken zijn niet open. ChatGPT, Claude, Gemini en Grok geven geen cijfers. Niet aan gebruikers, niet aan toezichthouders, niet aan onderzoekers.',
    p3: 'MIT Technology Review vroeg het OpenAI, Google en Microsoft rechtstreeks. Alle drie weigerden getallen te geven.',
    quotes: [
      {
        text: '"De aanbieders van gesloten AI-modellen serveren een volledige zwarte doos."',
        source: '— Boris Gamazaychikov, Salesforce',
      },
      {
        text: '"We moeten ophouden met het terugrekenen van getallen op basis van geruchten, en meer druk zetten op deze bedrijven om de echte cijfers te delen."',
        source: '— Sasha Luccioni, Hugging Face',
      },
    ],
    p4: 'Het Lawrence Berkeley National Laboratory, dat in opdracht van het Amerikaanse energieministerie de vraag naar stroom voorspelt, kwam tot dezelfde conclusie: er wordt zo weinig vrijgegeven dat een fatsoenlijke prognose niet te maken is. Datacenters worden gebouwd zonder dat iemand kan berekenen wat ze het stroomnet gaan kosten.',
    p5: 'Dit is geen technisch probleem. De bedrijven meten dit intern tot op de kilowattuur nauwkeurig — ze moeten de rekening zelf betalen. Ze publiceren het alleen niet.',
  },
  notNew: {
    ariaLabel: 'Dit is niet nieuw',
    heading: 'Dit is al eerder gedaan',
    p1: "In Europa staat er al meer dan dertig jaar een energielabel op je koelkast. Later kwam het op wasmachines, lampen, televisies, auto's en huizen. Bij een vliegticket staat de CO₂-uitstoot erbij. Op je pak koekjes staat wat erin zit.",
    p2: 'Elke keer was het argument hetzelfde: wie iets gebruikt, mag weten wat het kost. En elke keer bleek het te kunnen.',
    p3: 'Niemand vindt het vandaag nog onredelijk dat er een label op een koelkast zit.',
    euLabel: 'EU-energielabel',
    euSince: 'sinds 1994',
    nutriScore: 'Nutri-Score',
    nutriSince: 'sinds 2017',
    flightLabel: 'Op je vliegticket',
    flightSince: 'sinds 2021',
  },
  midCta: {
    ariaLabel: 'Tussen-CTA',
    heading: 'Wij vragen de EU om AI-aanbieders te verplichten het energieverbruik van elk chat te tonen.',
    cta: 'Teken de oproep',
    countSuffix: 'mensen gingen je voor',
  },
  theAsk: {
    ariaLabel: 'Wat wij vragen',
    heading: 'Wat wij vragen',
    introPrefix: 'Eén ding, en niet meer dan dat: ',
    introStrong: 'maak het verbruik zichtbaar op het moment dat het gebeurt.',
    asks: [
      'Het verbruik van dit antwoord en van dit gesprek, in kilowattuur',
      'Een vergelijking die iets zegt — wassen, rijden, koelkast. Een kaal getal helpt niemand, zoals hierboven bleek',
      'Waar de stroom vandaan kwam: welk deel duurzaam was',
      'Standaard aan. Niet verstopt in een instellingenmenu',
    ],
    whoLabel: 'Aan wie:',
    whoText:
      'aan de aanbieders zelf — OpenAI, Anthropic, Google, Meta en xAI — en aan de Europese Commissie en het Europees Parlement, die de regels kunnen vastleggen. Deze oproep loopt buiten een formeel petitietraject: het gewicht komt van aantallen en aandacht, niet van een procedure.',
    whyLabel: 'Waarom een wet en geen vriendelijk verzoek:',
    whyText:
      'dit is drie jaar lang vrijwillig geprobeerd. De AI Energy Score, een keurmerk waarmee bedrijven hun modellen vrijwillig kunnen laten beoordelen, bestaat sinds 2024. Vrijwel geen enkel groot bedrijf doet mee. Zolang niemand het hoeft, doet niemand het, want het eerste bedrijf dat opendoet, staat er als enige slecht op.',
    conclusion: 'Een verplichting haalt dat nadeel weg. Iedereen tegelijk, of niemand.',
  },
  signForm: {
    heading: 'Steun je dit? Zet je naam eronder.',
    nameLabel: 'Naam',
    emailLabel: 'E-mailadres',
    newsletterLabel: 'Houd mij op de hoogte van deze campagne',
    honeypotLabel: 'Laat dit veld leeg',
    submit: 'Zet mijn naam eronder',
    submitting: 'Bezig…',
    privacyPrefix:
      'Je gegevens worden alleen gebruikt voor deze oproep, staan op servers in de EU en worden niet gedeeld of verkocht.',
    privacyLink: 'Privacyverklaring',
    successHeading: 'Bijna klaar. Kijk in je mail.',
    successBody: 'Er staat één link in. Klik erop en je naam staat eronder.',
    successHelpPrefix: 'Niets ontvangen? Kijk in de map ongewenste mail, of mail',
    errors: {
      GENERIC: 'Er ging iets mis. Probeer het zo nog eens.',
      NETWORK: 'Geen verbinding. Probeer het zo nog eens.',
      TOO_FAST: 'Dat ging wel erg snel. Probeer het nog eens.',
      INVALID_NAME: 'Vul een naam in.',
      INVALID_EMAIL: 'Dit e-mailadres klopt niet.',
      RATE_LIMITED: 'Te veel pogingen. Wacht een minuut.',
      BOT_DETECTED: 'Toegang geweigerd.',
      SAVE_FAILED: 'Opslaan lukte niet. Probeer het zo nog eens.',
      MAIL_FAILED: 'De bevestigingsmail kwam niet weg. Probeer het zo nog eens.',
    },
  },
  objections: {
    ariaLabel: 'Tegenwerpingen',
    heading: '"Ja maar…"',
    faqs: [
      {
        q: '"AI is toch niets vergeleken met vliegen of de vleesindustrie?"',
        a: 'Klopt, vandaag. Datacenters gebruiken nu 4,4% van alle stroom in de Verenigde Staten. In 2028 is dat naar schatting 12%, en meer dan de helft daarvan gaat naar AI. Dit is de enige post op de energierekening die in vier jaar tijd verdrievoudigt. Juist daarom is het moment om het meetbaar te maken nu, en niet als het al gebeurd is.',
      },
      {
        q: '"Een cijfertje in beeld verandert toch niets aan wat mensen doen?"',
        a: 'Misschien niet meteen. Maar het energielabel op de koelkast veranderde vooral wat fabrikanten bouwden, niet wat kopers kozen. Zichtbaarheid maakt vergelijken mogelijk, en vergelijken maakt zuiniger zijn de moeite waard. Nu is er geen enkele beloning voor een efficiënt model, want niemand ziet het verschil.',
      },
      {
        q: '"Dit is bedrijfsgeheim, hier gaat innovatie aan onderdoor."',
        a: 'De vraag gaat niet over hoe een model werkt of hoeveel parameters het heeft. Alleen over hoeveel stroom er door de meter ging. Dat is geen bedrijfsgeheim, dat is een rekening. Autofabrikanten publiceren hun verbruik ook zonder hun motoren uit elkaar te leggen.',
      },
    ],
  },
  whoWeAre: {
    ariaLabel: 'Wie hier achter staat',
    heading: 'Wie hier achter staat',
    intro:
      'Deze oproep komt van The AI Footprint Meter — een onafhankelijk initiatief van mensen die willen dat AI-gebruik net zo meetbaar wordt als elk ander stroomverbruik.',
    sourcesLabel: 'Bronnen',
    sources: [
      {
        text: 'MIT Technology Review, ',
        em: 'Power Hungry: AI and our energy future',
        tail: ', mei 2025 — ',
        href: 'https://www.technologyreview.com',
        label: 'technologyreview.com',
      },
      {
        text: 'Lawrence Berkeley National Laboratory, ',
        em: 'United States Data Center Energy Usage Report',
        tail: ', december 2024 — ',
        href: 'https://eta.lbl.gov',
        label: 'eta.lbl.gov',
      },
      {
        text: 'ML.Energy leaderboard, Universiteit van Michigan — ',
        em: '',
        tail: '',
        href: 'https://ml.energy',
        label: 'ml.energy',
      },
      {
        text: 'AI Energy Score, Hugging Face en Salesforce — ',
        em: '',
        tail: '',
        href: 'https://huggingface.co',
        label: 'huggingface.co',
      },
    ],
    outroPrefix: 'Alle cijfers op deze pagina zijn na te rekenen. Klopt er iets niet?',
  },
  timeline: {
    ariaLabel: 'Wat er daarna gebeurt',
    heading: 'Wat er met je handtekening gebeurt',
    steps: [
      {
        title: 'Nu — verzamelen',
        body: 'Doel: zo veel mogelijk handtekeningen, zichtbaar op deze pagina.',
      },
      {
        title: 'Daarna — de bedrijven',
        body: 'De oproep gaat, met alle namen, naar OpenAI, Anthropic, Google, Meta en xAI. Wat zij antwoorden komt op deze pagina te staan. Ook als zij niet antwoorden.',
      },
      {
        title: 'Doorlopend — persdruk en aantallen',
        body: 'Zonder formeel petitietraject werkt deze oproep via zichtbaarheid: media, andere organisaties en herhaalde druk op de aanbieders.',
      },
      {
        title: 'Doorlopend — de lijst',
        body: 'Elk bedrijf dat dit invoert, staat hier.',
      },
    ],
    footer: 'Deze pagina wordt bijgewerkt. Wie tekent, hoort wat er gebeurt.',
  },
  bijnaKlaar: {
    heading: 'Bijna klaar. Kijk in je mail.',
    body: 'Er staat één link in. Klik erop en je naam staat eronder.',
    helpPrefix: 'Niets ontvangen? Kijk in de map ongewenste mail, of mail',
    back: 'Terug naar de pagina',
  },
  bevestigd: {
    okHeading: 'Getekend. Dank je.',
    okBody: 'Deze oproep werkt alleen bij aantallen. Eén gedeelde link is meer waard dan één handtekening.',
    alHeading: 'Die stond er al.',
    alBody: 'Je handtekening was al bevestigd. Delen helpt wel verder.',
    ongeldigHeading: 'Deze link werkt niet meer.',
    ongeldigBody: 'De link is al gebruikt of verlopen. Teken opnieuw, dan komt er een verse mail.',
    copy: 'Kopieer link',
    copied: 'Link gekopieerd',
    copyFailed: 'Kopiëren mislukt',
    shareEmail: 'Deel via e-mail',
    shareSubject: 'Teken de oproep',
    shareBody: 'Je wasmachine heeft een energielabel. Je AI-chat niet.',
    back: 'Terug naar de pagina',
  },
  privacy: {
    heading: 'Privacyverklaring',
    concept: '[CONCEPT — laat dit nakijken voordat de pagina live gaat.]',
    storedHeading: 'Wat wordt er opgeslagen',
    stored: [
      'Je naam, zoals je die zelf invult',
      'Je e-mailadres',
      'Of je op de hoogte gehouden wil worden',
      'Het moment van tekenen en bevestigen',
      'Een versleutelde afdruk van je IP-adres en je browsertype, alleen om misbruik te herkennen',
    ],
    whereHeading: 'Waar het staat',
    whereText:
      'In een database bij Supabase, regio Frankfurt. De pagina zelf draait bij Vercel; het formulierendpoint staat in Frankfurt. De bevestigingsmail gaat via Brevo, een Franse aanbieder.',
    purposeHeading: 'Waarvoor het gebruikt wordt',
    purposeText:
      'Alleen voor deze oproep: je handtekening meetellen, je naam meesturen naar de aanbieders en de Europese instellingen, en je op de hoogte houden als je dat hebt aangevinkt. Niets wordt gedeeld met of verkocht aan derden.',
    durationHeading: 'Hoe lang',
    durationText: 'Handtekeningen blijven staan tot de oproep is afgerond. Wie niet bevestigt, wordt na 48 uur verwijderd.',
    deleteHeading: 'Weghalen',
    deletePrefix: 'Eén mail naar',
    back: 'Terug naar de pagina',
  },
  email: {
    subject: 'Bevestig je handtekening',
    greetingPrefix: 'Hoi',
    confirmLine: 'Nog één klik en je naam staat eronder. Bevestig hier:',
    buttonText: 'Bevestig mijn handtekening',
    buttonFallback: 'Werkt de knop niet? Plak deze link in je browser:',
    body1: 'Wij vragen de Europese Unie om AI-aanbieders te verplichten het energieverbruik van elk antwoord te tonen. In de app. Op het moment zelf.',
    body2: 'Heb je dit niet aangevraagd? Doe dan niets. Zonder bevestiging wordt je gegeven binnen 48 uur verwijderd.',
  },
};

export default nl;
