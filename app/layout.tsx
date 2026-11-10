import type { Metadata, Viewport } from "next";
import { Brygada_1918, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

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

export function generateMetadata(): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://edmont.ro";

  return {
    metadataBase: new URL(siteUrl),
    title: "Pensiunea EdMont Pietroșița | Rezervare directă",
    description:
      "Pensiune de 3 stele în Pietroșița, cu 9 camere și loc pentru 20 de oaspeți. Rezervă direct cu gazdele, pentru sejur, retreat sau eveniment.",
    icons: {
      icon: `${siteUrl}/images/logo.webp`,
      shortcut: `${siteUrl}/images/logo.webp`,
    },
    openGraph: {
      type: "website",
      locale: "ro_RO",
      alternateLocale: "en_GB",
      title: "Pensiunea EdMont Pietroșița",
      description: "Momente. Împreună. În natură. Rezervă direct cu gazdele.",
      images: [
        {
          url: `${siteUrl}/og.png`,
          width: 1200,
          height: 630,
          alt: "Pensiunea EdMont în mijlocul naturii",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Pensiunea EdMont Pietroșița",
      description: "Momente. Împreună. În natură. Rezervă direct cu gazdele.",
      images: [`${siteUrl}/og.png`],
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
      </head>
      <body>{children}</body>
    </html>
  );
}
