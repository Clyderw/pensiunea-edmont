import type { Viewport } from "next";
import { Brygada_1918, Hanken_Grotesk } from "next/font/google";
import type { Language } from "./content";
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

// The Romanian and English parts of the site each have their own root layout,
// so every page is served with the right <html lang>.
export default function RootShell({ language, children }: { language: Language; children: React.ReactNode }) {
  return (
    <html lang={language} data-theme="light" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
