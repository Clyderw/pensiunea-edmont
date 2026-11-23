/* eslint-disable @next/next/no-img-element -- local WebP logo, pre-sized */

import type { Copy, Language } from "./content";
import { guidePath, guides } from "./guides";
import { assetPath } from "./site";

export default function SiteFooter({ language, t }: { language: Language; t: Copy }) {
  return (
    <footer className="site-footer">
      <span className="footer-logo">
        <img className="logo-ink" src={assetPath("/images/logo-ink.webp")} alt="" width="480" height="180" loading="lazy" />
        <img className="logo-light" src={assetPath("/images/logo-light.webp")} alt="" width="480" height="180" loading="lazy" />
      </span>
      <nav className="footer-guides" aria-label={t.footerGuides}>
        <span>{t.footerGuides}</span>
        {guides[language].map((guide) => (
          <a key={guide.key} href={assetPath(guidePath(language, guide.slug))}>{guide.title}</a>
        ))}
      </nav>
      <span>{t.footer}</span>
      <span>© {new Date().getFullYear()}</span>
    </footer>
  );
}
