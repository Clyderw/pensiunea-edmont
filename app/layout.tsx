import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "edmont.ro";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const metadataBase = new URL(`${protocol}://${host}`);

  return {
    metadataBase,
    title: "Pensiunea EdMont Pietroșița",
    description:
      "Pensiune de 3 stele în Pietroșița, cu 9 camere, spațiu pentru 20 de oaspeți, retreaturi, evenimente și natură.",
    icons: {
      icon: "/images/logo.webp",
      shortcut: "/images/logo.webp",
    },
    openGraph: {
      type: "website",
      locale: "ro_RO",
      alternateLocale: "en_GB",
      title: "Pensiunea EdMont Pietroșița",
      description: "Momente. Împreună. În natură.",
      images: [
        {
          url: "/og.png",
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
      images: ["/og.png"],
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
