"use client";

/* eslint-disable @next/next/no-img-element -- local WebP logo, pre-sized */

import { useEffect, useState } from "react";
import { contact, content, type Language } from "./content";
import { MoonIcon, PhoneIcon, SunIcon } from "./icons";
import { assetPath, homeHref } from "./site";

type Theme = "light" | "dark";

type Props = {
  language: Language;
  onHome: boolean;
  altHref: string;
};

export default function SiteHeader({ language, onHome, altHref }: Props) {
  const t = content[language];
  const [theme, setTheme] = useState<Theme>("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  // On the home page the links are anchors; on other pages they lead back to the home page.
  const base = onHome ? "" : homeHref(language);

  useEffect(() => {
    if (document.documentElement.dataset.theme === "dark") setTheme("dark");
  }, []);

  function toggleTheme() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("edmont-theme", next);
    } catch {
      // Private mode: the choice simply isn't remembered.
    }
  }

  return (
    <header className="site-header">
      <a className="brand" href={onHome ? "#top" : homeHref(language)} aria-label="Pensiunea EdMont" onClick={closeMenu}>
        <img className="logo-ink" src={assetPath("/images/logo-ink.webp")} alt="" width="480" height="180" />
        <img className="logo-light" src={assetPath("/images/logo-light.webp")} alt="" width="480" height="180" />
      </a>

      <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label={t.nav.label}>
        <a href={`${base}#despre`} onClick={closeMenu}>{t.nav.about}</a>
        <a href={`${base}#camere`} onClick={closeMenu}>{t.nav.rooms}</a>
        <a href={`${base}#evenimente`} onClick={closeMenu}>{t.nav.events}</a>
        <a href={`${base}#imprejurimi`} onClick={closeMenu}>{t.nav.around}</a>
        <a href={`${base}#contact`} onClick={closeMenu}>{t.nav.contact}</a>
      </nav>

      <div className="header-actions">
        <a className="header-phone" href={`tel:${contact.phoneValue}`} aria-label={`${t.header.call}: ${contact.phoneDisplay}`}>
          <PhoneIcon />
          <span>{contact.phoneDisplay}</span>
        </a>
        <button
          className="icon-button"
          type="button"
          onClick={toggleTheme}
          aria-label={theme === "dark" ? t.header.themeToLight : t.header.themeToDark}
          title={theme === "dark" ? t.header.themeToLight : t.header.themeToDark}
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>
        <a
          className="icon-button language-switch"
          href={altHref}
          hrefLang={language === "ro" ? "en" : "ro"}
          aria-label={t.header.language}
        >
          {language === "ro" ? "EN" : "RO"}
        </a>
        <a className="btn btn-primary header-book" href={`${base}#rezervare`} onClick={closeMenu}>{t.header.book}</a>
        <button
          type="button"
          className={menuOpen ? "menu-button is-open" : "menu-button"}
          aria-label={menuOpen ? t.header.closeMenu : t.header.openMenu}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
