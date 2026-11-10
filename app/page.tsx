"use client";

/* eslint-disable @next/next/no-img-element -- local WebP files are pre-sized and pre-compressed for static cPanel hosting */

import { useEffect, useState, type MouseEvent } from "react";
import BookingForm from "./BookingForm";
import { emptyDraft, isoDate, whatsappLink, type BookingDraft } from "./booking";
import { contact, content, galleryImages, type Language, type Stay } from "./content";
import { ChatIcon, CheckIcon, MailIcon, MoonIcon, PeakIcon, PhoneIcon, PinIcon, SunIcon } from "./icons";

type Theme = "light" | "dark";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const assetPath = (path: string) => `${basePath}${path}`;
const endpoint = `${basePath}/api/rezervare.php`;

// Smaller copies (name-640.webp, name-960.webp) let phones download a lighter photo.
const photoWidths: Record<string, number[]> = {
  hero: [640, 960, 1200],
  "room-double": [640, 960, 1280],
  "room-view": [640, 960, 1125],
  "room-green": [640, 960, 1280],
  kitchen: [640, 960, 1280],
  dining: [640, 960, 1280],
  "dining-detail": [640, 960, 1280],
  balcony: [640, 720],
  "terrace-view": [640, 1024],
  "event-room": [640, 1024],
};

function photo(path: string) {
  const name = path.replace("/images/", "").replace(".webp", "");
  const widths = photoWidths[name];
  if (!widths) return { src: assetPath(path) };
  const full = widths[widths.length - 1];
  const srcSet = widths
    .map((width) => `${assetPath(width === full ? path : `/images/${name}-${width}.webp`)} ${width}w`)
    .join(", ");
  return { src: assetPath(path), srcSet };
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("ro");
  const [theme, setTheme] = useState<Theme>("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMobileBar, setShowMobileBar] = useState(false);
  const [draft, setDraft] = useState<BookingDraft>(emptyDraft);
  const [today, setToday] = useState("");
  const t = content[language];
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    setToday(isoDate(new Date()));
    if (document.documentElement.dataset.theme === "dark") setTheme("dark");
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      setShowMobileBar(window.scrollY > 520);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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

  function goToBooking(focusId?: string) {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("rezervare")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    if (focusId) {
      window.setTimeout(() => document.getElementById(focusId)?.focus({ preventScroll: true }), reduce ? 0 : 450);
    }
  }

  function chooseStay(stay: Stay) {
    setDraft((current) => ({ ...current, stay }));
    goToBooking(draft.arrival ? "booking-name" : "booking-arrival");
  }

  function startBooking(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    goToBooking(draft.arrival ? "booking-name" : "booking-arrival");
  }

  return (
    <main>
      <a className="skip-link" href="#despre">{t.skip}</a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Pensiunea EdMont" onClick={closeMenu}>
          <img className="logo-ink" src={assetPath("/images/logo-ink.webp")} alt="" width="480" height="180" />
          <img className="logo-light" src={assetPath("/images/logo-light.webp")} alt="" width="480" height="180" />
        </a>

        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label={t.nav.label}>
          <a href="#despre" onClick={closeMenu}>{t.nav.about}</a>
          <a href="#camere" onClick={closeMenu}>{t.nav.rooms}</a>
          <a href="#evenimente" onClick={closeMenu}>{t.nav.events}</a>
          <a href="#galerie" onClick={closeMenu}>{t.nav.gallery}</a>
          <a href="#contact" onClick={closeMenu}>{t.nav.contact}</a>
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
          <button
            className="icon-button language-switch"
            type="button"
            onClick={() => setLanguage(language === "ro" ? "en" : "ro")}
            aria-label={t.header.language}
          >
            {language === "ro" ? "EN" : "RO"}
          </button>
          <a className="btn btn-primary header-book" href="#rezervare" onClick={closeMenu}>{t.header.book}</a>
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

      <section className="hero" id="top">
        <div className="hero-media">
          <img
            src={assetPath("/images/hero.webp")}
            alt={t.gallery.alt[0]}
            width="1200"
            height="900"
            fetchPriority="high"
          />
        </div>
        <div className="hero-copy">
          <h1>
            {t.hero.title.map((line) => <span key={line}>{line}</span>)}
          </h1>
          <p className="hero-intro">{t.hero.intro}</p>
          <div className="hero-actions">
            <a className="btn btn-light btn-large" href="#rezervare" onClick={startBooking}>{t.hero.cta}</a>
            <a className="hero-link" href={`tel:${contact.phoneValue}`}>
              <PhoneIcon />
              {contact.phoneDisplay}
            </a>
            <a className="hero-link" href={whatsappLink()} target="_blank" rel="noreferrer">
              <ChatIcon />
              {t.hero.whatsapp}
            </a>
          </div>
          <p className="hero-note">{t.hero.note}</p>
        </div>

      </section>

      <section className="section about" id="despre">
        <div className="about-copy">
          <h2>{t.about.title}</h2>
          <p className="lead">{t.about.body}</p>
        </div>
        <dl className="facts" aria-label={t.about.factsLabel}>
          {t.about.facts.map(([title, text]) => (
            <div key={title}>
              <dt>{title}</dt>
              <dd>{text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section rooms" id="camere">
        <div className="section-head">
          <h2>{t.rooms.title}</h2>
          <p>{t.rooms.intro}</p>
        </div>

        <div className="room-grid">
          <article className="room">
            <img
              {...photo("/images/room-double.webp")}
              sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1100px) 50vw, 600px"
              alt={t.rooms.double.alt}
              width="1280"
              height="853"
              loading="lazy"
              decoding="async"
            />
            <div className="room-copy">
              <h3>{t.rooms.double.title}</h3>
              <p className="room-meta">{t.rooms.double.meta}</p>
              <p>{t.rooms.double.text}</p>
              <button className="btn btn-secondary" type="button" onClick={() => chooseStay("double")}>
                {t.rooms.double.cta}
              </button>
            </div>
          </article>
          <article className="room">
            <img
              className="room-triple"
              src={assetPath("/images/room-triple.webp")}
              alt={t.rooms.triple.alt}
              width="600"
              height="900"
              loading="lazy"
              decoding="async"
            />
            <div className="room-copy">
              <h3>{t.rooms.triple.title}</h3>
              <p className="room-meta">{t.rooms.triple.meta}</p>
              <p>{t.rooms.triple.text}</p>
              <button className="btn btn-secondary" type="button" onClick={() => chooseStay("triple")}>
                {t.rooms.triple.cta}
              </button>
            </div>
          </article>
        </div>

        <article className="whole-house">
          <img
            {...photo("/images/dining-detail.webp")}
            sizes="(max-width: 920px) calc(100vw - 32px), 560px"
            alt={t.rooms.whole.alt}
            width="1280"
            height="853"
            loading="lazy"
            decoding="async"
          />
          <div>
            <h3>{t.rooms.whole.title}</h3>
            <p>{t.rooms.whole.text}</p>
            <button className="btn btn-light" type="button" onClick={() => chooseStay("whole")}>
              {t.rooms.whole.cta}
            </button>
          </div>
        </article>
      </section>

      <section className="section shared" id="spatii">
        <div className="section-head">
          <h2>{t.shared.title}</h2>
          <p>{t.shared.intro}</p>
        </div>
        <div className="shared-grid">
          {t.shared.items.map((item) => (
            <figure className="shared-item" key={item.title}>
              <img
                {...photo(item.image)}
                sizes="(max-width: 640px) 82vw, (max-width: 920px) 50vw, 400px"
                alt={item.alt}
                width="1280"
                height="853"
                loading="lazy"
                decoding="async"
              />
              <figcaption>
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="breakfast">{t.shared.breakfast}</p>
      </section>

      <section className="events" id="evenimente">
        <div className="events-media">
          <img
            {...photo("/images/event-room.webp")}
            sizes="(max-width: 920px) 100vw, 50vw"
            alt={t.events.alt}
            width="1280"
            height="853"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="events-copy">
          <h2>{t.events.title}</h2>
          <p className="events-lead">{t.events.body}</p>
          <h3>{t.events.label}</h3>
          <ul>
            {t.events.features.map((feature) => (
              <li key={feature}><CheckIcon />{feature}</li>
            ))}
          </ul>
          <p className="events-note">{t.events.note}</p>
          <button className="btn btn-light" type="button" onClick={() => chooseStay("whole")}>
            {t.events.cta}
          </button>
        </div>
      </section>

      <section className="section amenities">
        <h2>{t.amenities.title}</h2>
        <ul className="amenity-list">
          {t.amenities.items.map(([title, text]) => (
            <li key={title}>
              <CheckIcon />
              <div>
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="section gallery" id="galerie">
        <h2>{t.gallery.title}</h2>
        <div className="gallery-grid">
          {galleryImages.map((src, index) => (
            <figure className={`gallery-item gallery-item-${index + 1}`} key={src}>
              <img
                {...photo(src)}
                sizes={index === 0 ? "(max-width: 640px) 84vw, (max-width: 920px) 100vw, 720px" : "(max-width: 640px) 84vw, (max-width: 920px) 50vw, 620px"}
                alt={t.gallery.alt[index]}
                width="1280"
                height="900"
                loading="lazy"
                decoding="async"
              />
            </figure>
          ))}
        </div>
        <div className="reviews">
          <PeakIcon className="reviews-mark" />
          <div>
            <h3>{t.reviews.title}</h3>
            <p>{t.reviews.body}</p>
            <a className="text-link" href={contact.bookingReviews} target="_blank" rel="noreferrer">
              {t.reviews.link}
            </a>
          </div>
        </div>
      </section>

      <section className="section booking" id="rezervare">
        <div className="booking-head">
          <h2>{t.booking.title}</h2>
          <p>{t.booking.intro}</p>
        </div>

        <div className="booking-layout">
          <div className="booking-panel">
            <BookingForm
              t={t.booking}
              language={language}
              draft={draft}
              setDraft={setDraft}
              today={today}
              endpoint={endpoint}
            />
          </div>

          <aside className="booking-aside">
            <h3>{t.booking.steps.title}</h3>
            <ol className="steps">
              {t.booking.steps.items.map(([title, text]) => (
                <li key={title}>
                  <strong>{title}</strong>
                  <span>{text}</span>
                </li>
              ))}
            </ol>

            <div className="direct">
              <h3>{t.booking.direct.title}</h3>
              <div className="direct-phone">
                <strong>{contact.phoneDisplay}</strong>
                <div>
                  <a className="btn btn-secondary btn-small" href={`tel:${contact.phoneValue}`}>
                    <PhoneIcon /> {t.booking.direct.call}
                  </a>
                  <a className="btn btn-secondary btn-small" href={whatsappLink()} target="_blank" rel="noreferrer">
                    <ChatIcon /> {t.booking.direct.whatsapp}
                  </a>
                </div>
              </div>
              <a className="direct-mail" href={`mailto:${contact.email}`}>
                <MailIcon />
                <strong>{contact.email}</strong>
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-copy">
          <h2>{t.contact.title}</h2>
          <p className="address"><PinIcon /><span>{t.contact.address}</span></p>
          <a className="btn btn-secondary" href={contact.maps} target="_blank" rel="noreferrer">
            {t.contact.directions}
          </a>
          <p className="social">
            <span>{t.contact.social}</span>
            <a className="text-link" href={contact.facebook} target="_blank" rel="noreferrer">Facebook</a>
            <a className="text-link" href={contact.instagram} target="_blank" rel="noreferrer">Instagram</a>
          </p>
        </div>
        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2812.192248921766!2d25.427684273426642!3d45.18320445214751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b31d7239c08f15%3A0x5d9b5e0e2352f6d1!2sPensiunea%20EdMont!5e0!3m2!1sro!2sro!4v1785167920506!5m2!1sro!2sro"
            title={t.contact.mapTitle}
            width="600"
            height="450"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </section>

      <footer className="site-footer">
        <span className="footer-logo">
          <img className="logo-ink" src={assetPath("/images/logo-ink.webp")} alt="" width="480" height="180" loading="lazy" />
          <img className="logo-light" src={assetPath("/images/logo-light.webp")} alt="" width="480" height="180" loading="lazy" />
        </span>
        <span>{t.footer}</span>
        <span>© {new Date().getFullYear()}</span>
      </footer>

      <nav
        className={showMobileBar ? "mobile-bar is-visible" : "mobile-bar"}
        aria-label={t.mobileBar.label}
        aria-hidden={!showMobileBar}
      >
        <a href={`tel:${contact.phoneValue}`} tabIndex={showMobileBar ? 0 : -1}>
          <PhoneIcon /> {t.mobileBar.call}
        </a>
        <a href={whatsappLink()} target="_blank" rel="noreferrer" tabIndex={showMobileBar ? 0 : -1}>
          <ChatIcon /> {t.mobileBar.whatsapp}
        </a>
        <a className="mobile-book" href="#rezervare" tabIndex={showMobileBar ? 0 : -1}>
          {t.mobileBar.book}
        </a>
      </nav>
    </main>
  );
}
