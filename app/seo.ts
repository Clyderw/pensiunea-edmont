import type { Metadata } from "next";
import { content, type Language } from "./content";
import { absolute, basePath, homePath, siteUrl } from "./site";
import base from "./structured-data.json";

const googleMaps = "https://maps.google.com/?cid=6745088281732642513";
const ogImage: Record<Language, string> = { ro: "/og-edmont-aerial-ro.jpg", en: "/og-edmont-aerial-en.jpg" };
const ogImageAlt: Record<Language, string> = {
  ro: "Pensiunea EdMont între dealurile verzi din Pietroșița, văzută de sus",
  en: "Pensiunea EdMont among the green hills of Pietroșița, seen from above",
};

const keywords: Record<Language, string[]> = {
  ro: [
    "Pensiunea EdMont",
    "cazare Pietroșița",
    "cazare Moroeni",
    "cazare Runcu",
    "cazare Fieni",
    "pensiuni Dâmbovița",
    "cabană Dâmbovița",
    "cazare Valea Ialomiței",
    "cazare aproape de Bucegi",
    "cazare aproape de Sinaia",
    "pensiune Dâmbovița",
    "cazare grupuri",
    "retreat și team building",
  ],
  en: [
    "Pensiunea EdMont",
    "guesthouse Romania mountains",
    "accommodation near Bucegi",
    "accommodation near Sinaia",
    "Ialomița Valley",
    "group accommodation Romania",
    "team retreat near Bucharest",
  ],
};

type PageSeo = {
  language: Language;
  path: string;
  altPath: string;
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  type?: "website" | "article";
};

// One place for every page's title, description, link-preview card and language links.
export function pageMetadata(page: PageSeo): Metadata {
  const roPath = page.language === "ro" ? page.path : page.altPath;
  const enPath = page.language === "en" ? page.path : page.altPath;
  const ogTitle = page.ogTitle ?? page.title;
  const ogDescription = page.ogDescription ?? page.description;
  const image = absolute(ogImage[page.language]);

  return {
    metadataBase: new URL(siteUrl),
    title: { absolute: page.title },
    description: page.description,
    applicationName: "Pensiunea EdMont",
    manifest: `${basePath}/manifest.webmanifest`,
    keywords: keywords[page.language],
    creator: "Pensiunea EdMont",
    publisher: "Pensiunea EdMont",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    category: "travel",
    alternates: {
      canonical: absolute(page.path),
      languages: {
        "ro-RO": absolute(roPath),
        en: absolute(enPath),
        "x-default": absolute(roPath),
      },
    },
    icons: {
      icon: [
        { url: `${basePath}/favicon.ico`, sizes: "any" },
        { url: `${basePath}/favicon-32x32.png`, type: "image/png", sizes: "32x32" },
      ],
      apple: [{ url: `${basePath}/apple-touch-icon.png`, sizes: "180x180" }],
    },
    openGraph: {
      type: page.type ?? "website",
      url: absolute(page.path),
      siteName: "Pensiunea EdMont",
      locale: page.language === "ro" ? "ro_RO" : "en_GB",
      alternateLocale: page.language === "ro" ? "en_GB" : "ro_RO",
      title: ogTitle,
      description: ogDescription,
      images: [{ url: image, width: 1200, height: 630, alt: ogImageAlt[page.language] }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [image],
    },
  };
}

const home = {
  ro: {
    title: "Pensiunea EdMont Pietroșița | Cazare în Dâmbovița, lângă Moroeni și Fieni",
    description:
      "Pensiune cu 9 camere în Pietroșița, Dâmbovița, la câteva minute de Moroeni și Runcu și aproape de Fieni, Bucegi și Sinaia. Pentru familii, prieteni și grupuri de până la 20. Rezervă direct.",
    ogTitle: "Pensiunea EdMont, Pietroșița",
    ogDescription:
      "Cazare în natură pe Valea Ialomiței, aproape de Bucegi și Sinaia. 9 camere și loc pentru grupuri de până la 20 de persoane. Rezervă direct cu gazdele.",
    business:
      "Pensiune cu 9 camere în Pietroșița, județul Dâmbovița, pe Valea Ialomiței, la câteva minute de Moroeni și Runcu și aproape de Fieni, Munții Bucegi și Sinaia. Spații comune, retreaturi și evenimente pentru grupuri de până la 20 de persoane.",
  },
  en: {
    title: "Pensiunea EdMont | Guesthouse near the Bucegi Mountains and Sinaia",
    description:
      "A 9-room guesthouse in Pietroșița, Dâmbovița county, Romania, in the Ialomița Valley near the Bucegi Mountains and Sinaia. For families, friends and groups of up to 20. Book directly.",
    ogTitle: "Pensiunea EdMont, Pietroșița, Romania",
    ogDescription:
      "A guesthouse in nature in the Ialomița Valley, close to the Bucegi Mountains and Sinaia. 9 rooms and space for groups of up to 20. Book directly with the hosts.",
    business:
      "A 9-room guesthouse in Pietroșița, Romania, in the Ialomița Valley near the Bucegi Mountains and Sinaia. Shared spaces, retreats and events for groups of up to 20.",
  },
};

export function homeMetadata(language: Language): Metadata {
  const other: Language = language === "ro" ? "en" : "ro";
  return pageMetadata({
    language,
    path: homePath(language),
    altPath: homePath(other),
    ...home[language],
  });
}

const amenities = [
  "Free Wi-Fi",
  "Private parking",
  "Shared kitchen",
  "Dining room",
  "Terrace and gazebo",
  "Grill and fire pit",
  "Garden",
  "Projector and screen",
  "Sound system",
  "Family friendly",
  "Small pets on request",
  "Non-smoking rooms",
];

// The guesthouse itself; @context is set once on the page graph.
const { "@context": _schemaContext, ...business } = base;

function lodging(language: Language) {
  return {
    ...business,
    description: home[language].business,
    url: absolute("/"),
    image: [
      absolute("/images/hero.webp"),
      absolute("/images/room-lamps.webp"),
      absolute("/images/balcony-view.webp"),
      absolute("/images/room-triple.webp"),
      absolute("/images/kitchen.webp"),
      absolute("/images/dining.webp"),
      absolute("/images/terrace-view.webp"),
      absolute("/images/event-room.webp"),
    ],
    hasMap: googleMaps,
    sameAs: [...business.sameAs, googleMaps],
    knowsLanguage: ["ro", "en"],
    amenityFeature: amenities.map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
    containsPlace: [
      {
        "@type": "HotelRoom",
        name: language === "ro" ? "Cameră dublă matrimonială" : "Double room",
        bed: { "@type": "BedDetails", typeOfBed: "Double", numberOfBeds: 1 },
        occupancy: { "@type": "QuantitativeValue", maxValue: 2 },
      },
      {
        "@type": "HotelRoom",
        name: language === "ro" ? "Cameră triplă" : "Triple room",
        bed: [
          { "@type": "BedDetails", typeOfBed: "Double", numberOfBeds: 1 },
          { "@type": "BedDetails", typeOfBed: "Single", numberOfBeds: 1 },
        ],
        occupancy: { "@type": "QuantitativeValue", maxValue: 3 },
      },
    ],
  };
}

export function homeSchema(language: Language) {
  const t = content[language];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "Pensiunea EdMont",
        alternateName: "EdMont",
        url: absolute("/"),
        inLanguage: ["ro", "en"],
      },
      lodging(language),
      {
        "@type": "FAQPage",
        "@id": `${absolute(homePath(language))}#intrebari`,
        inLanguage: language,
        mainEntity: t.faq.items.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  };
}
