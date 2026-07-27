import type { Metadata } from "next";
import "./globals.css";

export function generateMetadata(): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://edmont.ro";

  return {
    metadataBase: new URL(siteUrl),
    title: "Pensiunea EdMont Pietroșița",
    description:
      "Pensiune de 3 stele în Pietroșița, cu 9 camere, spațiu pentru 20 de oaspeți, retreaturi, evenimente și natură.",
    icons: {
      icon: `${siteUrl}/images/logo.webp`,
      shortcut: `${siteUrl}/images/logo.webp`,
    },
    openGraph: {
      type: "website",
      locale: "ro_RO",
      alternateLocale: "en_GB",
      title: "Pensiunea EdMont Pietroșița",
      description: "Momente. Împreună. În natură.",
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
      description: "Momente. Împreună. În natură.",
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
    <html lang="ro">
      <body>{children}</body>
    </html>
  );
}
