import type { Language } from "./content";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://edmont.ro";
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const assetPath = (path: string) => `${basePath}${path}`;

// Links between pages (the site is exported with trailing slashes: /en/).
export const homePath = (language: Language) => (language === "ro" ? "/" : "/en/");
export const homeHref = (language: Language) => assetPath(homePath(language));
export const absolute = (path: string) => `${siteUrl}${path}`;

// Smaller copies (name-640.webp, name-960.webp) let phones download a lighter photo.
const photoWidths: Record<string, number[]> = {
  hero: [640, 960, 1200],
  "room-lamps": [640, 960, 1280],
  "room-bedside": [640, 960, 1280],
  "room-window": [640, 960, 1280],
  "room-whole": [640, 960, 1280],
  bathroom: [640, 960, 1280],
  "balcony-view": [640, 960, 1280],
  kitchen: [640, 960, 1280],
  dining: [640, 960, 1280],
  "dining-detail": [640, 960, 1280],
  "terrace-view": [640, 1024],
  "event-room": [640, 1024],
};

export function photo(path: string) {
  const name = path.replace("/images/", "").replace(".webp", "");
  const widths = photoWidths[name];
  if (!widths) return { src: assetPath(path) };
  const full = widths[widths.length - 1];
  const srcSet = widths
    .map((width) => `${assetPath(width === full ? path : `/images/${name}-${width}.webp`)} ${width}w`)
    .join(", ");
  return { src: assetPath(path), srcSet };
}
