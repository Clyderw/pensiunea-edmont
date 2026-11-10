import type { Metadata, Viewport } from "next";
import { Brygada_1918, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import structuredData from "./structured-data.json";

const display = Brygada_1918({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
});

const body = Hanken_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});

// Runs before the first paint so a saved dark theme does not flash light.
const themeScript = `try{if(localStorage.getItem("edmont-theme")==="dark")document.documentElement.dataset.theme="dark"}catch(e){}`;

export const viewport: Viewport = {
  themeColor: "#f1f4ef",
};

// Same SEO tags as the version that was live on edmont.ro before the redesign.
export function generateMetadata(): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://edmont.ro";
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  return {
    metadataBase: new URL(siteUrl),
    title: "Pensiunea EdMont Pietroșița | Cazare, retreaturi și evenimente",
    description:
      "Pensiune de 3 stele în Pietroșița, Dâmbovița: 9 camere pentru până la 20 de oaspeți, spații comune, retreaturi și evenimente în natură.",
    applicationName: "Pensiunea EdMont",
    manifest: `${basePath}/manifest.webmanifest`,
    keywords: [
      "Pensiunea EdMont",
      "cazare Pietroșița",
      "pensiune Dâmbovița",
      "cazare Valea Ialomiței",
      "retreat România",
      "pensiune pentru grupuri",
      "evenimente Pietroșița",
    ],
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
    alternates: { canonical: siteUrl },
    icons: {
      icon: [
        { url: `${basePath}/favicon.ico`, sizes: "any" },
        { url: `${basePath}/favicon-32x32.png`, type: "image/png", sizes: "32x32" },
      ],
      apple: [{ url: `${basePath}/apple-touch-icon.png`, sizes: "180x180" }],
    },
    openGraph: {
      type: "website",
      url: siteUrl,
      siteName: "Pensiunea EdMont",
      locale: "ro_RO",
      alternateLocale: "en_GB",
      title: "Pensiunea EdMont Pietroșița | Momente împreună, în natură",
      description:
        "Cazare de 3 stele pentru cupluri, familii și grupuri de până la 20 de persoane, cu spații comune, retreaturi și evenimente.",
      images: [
        {
          url: `${siteUrl}/og.jpg`,
          width: 1200,
          height: 630,
          alt: "Pensiunea EdMont între dealurile verzi din Pietroșița",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Pensiunea EdMont Pietroșița",
      description: "Momente. Împreună. În natură.",
      images: [`${siteUrl}/og.jpg`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" data-theme="light" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
