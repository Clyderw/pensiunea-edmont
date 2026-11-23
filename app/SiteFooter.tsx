/* eslint-disable @next/next/no-img-element -- local WebP logo, pre-sized */

import type { Copy } from "./content";
import { assetPath } from "./site";

export default function SiteFooter({ t }: { t: Copy }) {
  return (
    <footer className="site-footer">
      <span className="footer-logo">
        <img className="logo-ink" src={assetPath("/images/logo-ink.webp")} alt="" width="480" height="180" loading="lazy" />
        <img className="logo-light" src={assetPath("/images/logo-light.webp")} alt="" width="480" height="180" loading="lazy" />
      </span>
      <span>{t.footer}</span>
      <span>© {new Date().getFullYear()}</span>
    </footer>
  );
}
