"use client";

import { useEffect, useState } from "react";

type Language = "ro" | "en";

const bookingUrl =
  "https://www.booking.com/hotel/ro/pensiunea-edmont-pietrosita.ro.html";
const phoneDisplay = "+40 772 210 309";
const phoneValue = "+40772210309";
const whatsappUrl = "https://wa.me/40772210309";
const facebookUrl = "https://www.facebook.com/PensiuneaEdmont/";
const instagramUrl = "https://www.instagram.com/edmont.pensiunea/";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const assetPath = (path: string) => `${basePath}${path}`;
const fallbackBookingRating = 9.6;

const content = {
  ro: {
    nav: {
      about: "Pensiunea",
      rooms: "Camere",
      spaces: "Spații comune",
      events: "Evenimente",
      gallery: "Galerie",
      contact: "Contact",
    },
    headerBooking: "Rezervă",
    hero: {
      eyebrow: "Pensiune de 3 stele · Pietroșița",
      title: ["Momente.", "Împreună.", "În natură."],
      intro:
        "Retreaturi, prieteni, familie și întâlniri care merită trăite pe îndelete, în liniștea naturii.",
      booking: "Verifică disponibilitatea",
      bookingHint: "Rezervare securizată prin Booking.com",
      directHint: "Ai o întrebare?",
      call: "Sună",
      whatsapp: "WhatsApp",
      stats: [
        ["9", "camere"],
        ["20", "oaspeți"],
        ["9,6", "pe Booking"],
      ],
    },
    about: {
      eyebrow: "Pensiunea EdMont",
      title: "Liniște pentru doi. Spațiu pentru toți.",
      body:
        "Înconjurată de dealurile verzi din Pietroșița, EdMont îmbină camerele confortabile cu spații în care oamenii pot găti, lua masa, lucra sau pur și simplu petrece timp împreună.",
      points: [
        ["Natură", "Priveliști deschise și un ritm mai lent."],
        ["Grupuri", "9 camere pentru până la 20 de oaspeți."],
        ["Flexibilitate", "Rezervă o cameră sau întreaga pensiune."],
      ],
    },
    shared: {
      eyebrow: "Pentru fiecare oaspete",
      title: "Spațiile comune sunt pentru toți",
      intro:
        "Bucătăria comună, sala de mese interioară și terasa cu foișor sunt disponibile tuturor oaspeților — indiferent dacă rezervi o singură cameră sau întreaga pensiune.",
      items: [
        {
          title: "Bucătărie comună",
          text: "Utilată pentru a pregăti mesele în propriul ritm.",
          image: "/images/kitchen.webp",
          alt: "Bucătăria comună utilată de la Pensiunea EdMont",
        },
        {
          title: "Sală de mese",
          text: "Un spațiu luminos pentru micul dejun și mesele împreună.",
          image: "/images/dining.webp",
          alt: "Sala de mese luminoasă de la Pensiunea EdMont",
        },
        {
          title: "Terasă și foișor",
          text: "Aer liber, grătar și seri petrecute în jurul focului.",
          image: "/images/terrace-view.webp",
          alt: "Priveliște de pe terasa Pensiunii EdMont",
        },
      ],
      breakfast: "Micul dejun este disponibil la cerere, dintr-o selecție de opțiuni.",
    },
    rooms: {
      eyebrow: "Cazare",
      title: "Camere curate și confortabile",
      intro:
        "Fiecare cameră are baie proprie, televizor și Wi‑Fi. Paturile suplimentare sunt disponibile la cerere.",
      double: {
        title: "Cameră dublă matrimonială",
        text: "Pentru două persoane, cu un pat matrimonial generos.",
        meta: "2 oaspeți · 1 pat matrimonial",
      },
      triple: {
        title: "Cameră triplă",
        text: "Potrivită pentru familie sau prieteni, cu un pat matrimonial și un pat de o persoană.",
        meta: "3 oaspeți · 1 pat matrimonial + 1 pat individual",
      },
      whole: {
        eyebrow: "Pentru grupuri",
        title: "Rezervă întreaga pensiune",
        text: "Toate cele 9 camere, intimitate pentru grupul tău și acces la toate spațiile și dotările disponibile, fără taxe suplimentare.",
        meta: "Până la 20 de oaspeți",
        cta: "Întreabă despre rezervarea integrală",
      },
    },
    events: {
      eyebrow: "Retreaturi & evenimente",
      title: "Loc pentru idei și momente importante",
      body:
        "EdMont poate găzdui retreaturi, aniversări, botezuri, traininguri și întâlniri corporate pentru grupuri de până la 20 de persoane.",
      label: "Pentru întâlniri și traininguri",
      features: [
        "Proiector și ecran",
        "Sistem audio",
        "Wi‑Fi",
        "Bucătărie și sală de mese",
        "Parcare privată",
        "Terasă și spații exterioare",
      ],
      note:
        "La rezervarea integrală, echipamentele și toate spațiile disponibile sunt incluse, fără costuri suplimentare.",
      cta: "Discută detaliile pe WhatsApp",
    },
    amenities: {
      eyebrow: "Esențial, fără complicații",
      title: "Tot ce ai nevoie pentru un sejur relaxat",
      items: [
        ["Wi‑Fi gratuit", "Disponibil în pensiune."],
        ["Parcare privată", "Locuri în incintă."],
        ["Grădină și terasă", "Spațiu pentru aer liber."],
        ["Grătar și zonă de foc", "Pentru serile împreună."],
        ["Familii binevenite", "Copii și paturi suplimentare la cerere."],
        ["Animale de talie mică", "Acceptate la cerere."],
        ["Plată flexibilă", "Numerar sau plată fără numerar."],
        ["Fără fum în interior", "Fumat doar pe balcoane și terase."],
      ],
      checkin: "Check-in",
      checkout: "Check-out",
    },
    reviews: {
      eyebrow: "Apreciată de oaspeți",
      title: "Liniște, curățenie și gazde primitoare",
      body:
        "Oaspeții evidențiază curățenia, camerele spațioase, priveliștea, micul dejun și ospitalitatea.",
      label: "Scor pe Booking.com",
      cta: "Citește recenziile",
    },
    gallery: {
      eyebrow: "Galerie",
      title: "Vezi cum arată un sejur la EdMont",
      alt: [
        "Pensiunea EdMont între dealurile verzi din Pietroșița",
        "Cameră matrimonială luminoasă la Pensiunea EdMont",
        "Cameră cu vedere spre dealuri la Pensiunea EdMont",
        "Bucătăria comună de la Pensiunea EdMont",
        "Sala de mese interioară de la Pensiunea EdMont",
        "Mese pregătite în sala de mese EdMont",
        "Priveliște de pe balconul Pensiunii EdMont",
        "Cameră în nuanțe verzi la Pensiunea EdMont",
      ],
    },
    contact: {
      eyebrow: "Rezervare & contact",
      title: "Alege perioada și vino la EdMont",
      body:
        "Pentru disponibilitate și rezervare, folosește Booking.com. Dacă ai o întrebare despre grupuri, copii, animale sau evenimente, ne poți suna ori scrie pe WhatsApp.",
      bookingTitle: "Rezervă prin Booking.com",
      bookingText: "Vezi datele disponibile și finalizează rezervarea în siguranță.",
      bookingCta: "Deschide pagina EdMont",
      directTitle: "Contact direct",
      call: "Apelează",
      whatsapp: "Scrie pe WhatsApp",
      email: "Email",
      social: "Urmărește-ne",
      locationTitle: "Ne găsești în Pietroșița",
      addressPlaceholder: "Adresa completă va fi adăugată în curând.",
      mapTitle: "Pensiunea EdMont pe Google Maps",
    },
    mobileBooking: "Rezervă pe Booking.com",
    footer: "Pensiunea EdMont · Momente. Împreună. În natură.",
  },
  en: {
    nav: {
      about: "Guesthouse",
      rooms: "Rooms",
      spaces: "Shared spaces",
      events: "Events",
      gallery: "Gallery",
      contact: "Contact",
    },
    headerBooking: "Book",
    hero: {
      eyebrow: "3-star guesthouse · Pietroșița",
      title: ["Moments.", "Together.", "In nature."],
      intro:
        "Retreats, friends, family and gatherings worth enjoying slowly, surrounded by nature.",
      booking: "Check availability",
      bookingHint: "Secure booking via Booking.com",
      directHint: "Have a question?",
      call: "Call",
      whatsapp: "WhatsApp",
      stats: [
        ["9", "rooms"],
        ["20", "guests"],
        ["9.6", "on Booking"],
      ],
    },
    about: {
      eyebrow: "Pensiunea EdMont",
      title: "Peaceful for two. Spacious for everyone.",
      body:
        "Surrounded by the green hills of Pietroșița, EdMont combines comfortable rooms with places to cook, dine, work or simply spend time together.",
      points: [
        ["Nature", "Open views and a slower pace."],
        ["Groups", "9 rooms for up to 20 guests."],
        ["Flexible stays", "Book one room or the entire guesthouse."],
      ],
    },
    shared: {
      eyebrow: "For every guest",
      title: "Shared spaces are open to everyone",
      intro:
        "The shared kitchen, indoor dining room and terrace with covered seating are available to every guest — whether you book one room or the entire guesthouse.",
      items: [
        {
          title: "Shared kitchen",
          text: "Equipped for preparing meals at your own pace.",
          image: "/images/kitchen.webp",
          alt: "Equipped shared kitchen at Pensiunea EdMont",
        },
        {
          title: "Dining room",
          text: "A bright space for breakfast and meals together.",
          image: "/images/dining.webp",
          alt: "Bright dining room at Pensiunea EdMont",
        },
        {
          title: "Terrace & gazebo",
          text: "Fresh air, a grill and evenings around the fire.",
          image: "/images/terrace-view.webp",
          alt: "View from the terrace at Pensiunea EdMont",
        },
      ],
      breakfast: "Breakfast is available on request, with a selection of options.",
    },
    rooms: {
      eyebrow: "Stay",
      title: "Clean and comfortable rooms",
      intro:
        "Every room has a private bathroom, TV and Wi‑Fi. Extra beds are available on request.",
      double: {
        title: "Double Room",
        text: "For two guests, with a generous double bed.",
        meta: "2 guests · 1 double bed",
      },
      triple: {
        title: "Triple Room",
        text: "Ideal for a family or friends, with one double bed and one single bed.",
        meta: "3 guests · 1 double + 1 single bed",
      },
      whole: {
        eyebrow: "For groups",
        title: "Book the entire guesthouse",
        text: "All 9 rooms, privacy for your group and access to every available space and facility, with no additional fees.",
        meta: "Up to 20 guests",
        cta: "Ask about a full-property stay",
      },
    },
    events: {
      eyebrow: "Retreats & events",
      title: "Room for ideas and meaningful moments",
      body:
        "EdMont welcomes retreats, birthdays, christenings, training sessions and corporate meetings for groups of up to 20 people.",
      label: "For meetings and training",
      features: [
        "Projector and screen",
        "Sound system",
        "Wi‑Fi",
        "Kitchen and dining room",
        "Private parking",
        "Terrace and outdoor areas",
      ],
      note:
        "With a full-property booking, the equipment and all available spaces are included at no extra charge.",
      cta: "Discuss the details on WhatsApp",
    },
    amenities: {
      eyebrow: "The essentials, made easy",
      title: "Everything you need for a relaxed stay",
      items: [
        ["Free Wi‑Fi", "Available throughout the guesthouse."],
        ["Private parking", "On-site spaces."],
        ["Garden and terrace", "Room to enjoy the outdoors."],
        ["Grill and fire area", "For evenings together."],
        ["Families welcome", "Children and extra beds on request."],
        ["Small pets", "Accepted on request."],
        ["Flexible payment", "Cash or cashless payment."],
        ["Smoke-free indoors", "Smoking on balconies and terraces only."],
      ],
      checkin: "Check-in",
      checkout: "Check-out",
    },
    reviews: {
      eyebrow: "Guest favourite",
      title: "Peace, cleanliness and welcoming hosts",
      body:
        "Guests highlight the cleanliness, spacious rooms, hill views, breakfast and warm hospitality.",
      label: "Score on Booking.com",
      cta: "Read the reviews",
    },
    gallery: {
      eyebrow: "Gallery",
      title: "See what a stay at EdMont looks like",
      alt: [
        "Pensiunea EdMont among the green hills of Pietroșița",
        "Bright double room at Pensiunea EdMont",
        "EdMont room overlooking the hills",
        "Shared kitchen at Pensiunea EdMont",
        "Indoor dining room at Pensiunea EdMont",
        "Tables set in the EdMont dining room",
        "View from a balcony at Pensiunea EdMont",
        "Green-accent double room at Pensiunea EdMont",
      ],
    },
    contact: {
      eyebrow: "Booking & contact",
      title: "Choose your dates and come to EdMont",
      body:
        "For availability and reservations, use Booking.com. If you have a question about groups, children, pets or events, call or message us on WhatsApp.",
      bookingTitle: "Book through Booking.com",
      bookingText: "See available dates and complete your reservation securely.",
      bookingCta: "Open the EdMont listing",
      directTitle: "Contact us directly",
      call: "Call",
      whatsapp: "Message on WhatsApp",
      email: "Email",
      social: "Follow us",
      locationTitle: "Find us in Pietroșița",
      addressPlaceholder: "The full address will be added soon.",
      mapTitle: "Pensiunea EdMont on Google Maps",
    },
    mobileBooking: "Book on Booking.com",
    footer: "Pensiunea EdMont · Moments. Together. In nature.",
  },
} as const;

const galleryImages = [
  "/images/hero.webp",
  "/images/room-double.webp",
  "/images/room-view.webp",
  "/images/kitchen.webp",
  "/images/dining.webp",
  "/images/dining-detail.webp",
  "/images/balcony.webp",
  "/images/room-green.webp",
];

export default function Home() {
  const [language, setLanguage] = useState<Language>("ro");
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingRating, setBookingRating] = useState(fallbackBookingRating);
  const [showMobileBooking, setShowMobileBooking] = useState(false);
  const t = content[language];
  const closeMenu = () => setMenuOpen(false);
  const formattedBookingRating = bookingRating.toLocaleString(
    language === "ro" ? "ro-RO" : "en-GB",
    { minimumFractionDigits: 1, maximumFractionDigits: 1 },
  );

  useEffect(() => {
    const controller = new AbortController();

    fetch(assetPath("/booking-rating.json"), {
      cache: "no-store",
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error("Rating unavailable");
        return response.json();
      })
      .then((data: { score?: unknown }) => {
        const score = Number(data.score);
        if (Number.isFinite(score) && score >= 1 && score <= 10) {
          setBookingRating(score);
        }
      })
      .catch(() => {
        // Keep the last verified score when the update endpoint is unavailable.
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    let ticking = false;

    const updateBookingBar = () => {
      setShowMobileBooking(window.scrollY > 90);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateBookingBar);
        ticking = true;
      }
    };

    updateBookingBar();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Pensiunea EdMont">
          <img
            src={assetPath("/images/logo.webp")}
            alt="Pensiunea EdMont"
            width="324"
            height="154"
          />
        </a>

        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Primary">
          <a href="#despre" onClick={closeMenu}>{t.nav.about}</a>
          <a href="#camere" onClick={closeMenu}>{t.nav.rooms}</a>
          <a href="#spatii" onClick={closeMenu}>{t.nav.spaces}</a>
          <a href="#evenimente" onClick={closeMenu}>{t.nav.events}</a>
          <a href="#galerie" onClick={closeMenu}>{t.nav.gallery}</a>
          <a href="#contact" onClick={closeMenu}>{t.nav.contact}</a>
        </nav>

        <div className="header-actions">
          <a
            className="header-booking"
            href={bookingUrl}
            target="_blank"
            rel="noreferrer"
          >
            <span>Booking.com</span>
            {t.headerBooking}
          </a>
          <button
            className="language-switch"
            type="button"
            onClick={() => setLanguage(language === "ro" ? "en" : "ro")}
            aria-label={language === "ro" ? "Switch to English" : "Schimbă în română"}
          >
            {language === "ro" ? "EN" : "RO"}
          </button>
          <button
            type="button"
            className={menuOpen ? "menu-button is-open" : "menu-button"}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <section className="hero" id="top">
        <img
          className="hero-image"
          src={assetPath("/images/hero.webp")}
          alt={t.gallery.alt[0]}
          width="1200"
          height="900"
          fetchPriority="high"
        />
        <div className="hero-overlay" />
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="star-row" aria-label={language === "ro" ? "Pensiune de trei stele" : "Three-star guesthouse"}>
              ★ ★ ★
            </div>
            <p className="eyebrow eyebrow-light">{t.hero.eyebrow}</p>
            <h1>
              {t.hero.title.map((line) => <span key={line}>{line}</span>)}
            </h1>
            <p className="hero-intro">{t.hero.intro}</p>

            <div className="hero-booking-row">
              <a
                className="booking-button"
                href={bookingUrl}
                target="_blank"
                rel="noreferrer"
              >
                <span className="booking-wordmark">Booking.com</span>
                <span>{t.hero.booking} <span aria-hidden="true">↗</span></span>
              </a>
              <small>{t.hero.bookingHint}</small>
            </div>

          </div>

          <div className="hero-footer">
            <div className="direct-line">
              <span>{t.hero.directHint}</span>
              <div className="direct-actions">
                <a href={`tel:${phoneValue}`}>{t.hero.call}: {phoneDisplay}</a>
                <a href={whatsappUrl} target="_blank" rel="noreferrer">{t.hero.whatsapp}</a>
              </div>
            </div>

            <div className="hero-stats" aria-label="Pensiunea EdMont facts">
              {t.hero.stats.map(([value, label], index) => (
                <div className="stat" key={label}>
                  <span>{label}</span>
                  <strong>{index === 2 ? formattedBookingRating : value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section about-section" id="despre">
        <div className="section-heading">
          <p className="eyebrow">{t.about.eyebrow}</p>
          <h2>{t.about.title}</h2>
        </div>
        <div className="about-layout">
          <p className="lead-copy">{t.about.body}</p>
          <div className="about-points">
            {t.about.points.map(([title, text], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section shared-section" id="spatii">
        <div className="section-heading section-heading-wide">
          <div>
            <p className="eyebrow">{t.shared.eyebrow}</p>
            <h2>{t.shared.title}</h2>
          </div>
          <p>{t.shared.intro}</p>
        </div>
        <div className="shared-grid">
          {t.shared.items.map((item) => (
            <article className="shared-card" key={item.title}>
              <img
                src={assetPath(item.image)}
                alt={item.alt}
                width="1280"
                height="853"
                loading="lazy"
                decoding="async"
              />
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="breakfast-note"><span aria-hidden="true">☀</span>{t.shared.breakfast}</p>
      </section>

      <section className="section rooms-section" id="camere">
        <div className="section-heading section-heading-wide">
          <div>
            <p className="eyebrow">{t.rooms.eyebrow}</p>
            <h2>{t.rooms.title}</h2>
          </div>
          <p>{t.rooms.intro}</p>
        </div>

        <div className="room-grid">
          <article className="room-card">
            <img
              src={assetPath("/images/room-double.webp")}
              alt={t.gallery.alt[1]}
              width="1280"
              height="853"
              loading="lazy"
              decoding="async"
            />
            <div className="room-card-copy">
              <p className="room-meta">{t.rooms.double.meta}</p>
              <h3>{t.rooms.double.title}</h3>
              <p>{t.rooms.double.text}</p>
            </div>
          </article>
          <article className="room-card">
            <img
              className="triple-room-image"
              src={assetPath("/images/room-triple.webp")}
              alt={language === "ro"
                ? "Cameră triplă cu pat matrimonial și pat individual"
                : "Triple room with one double and one single bed"}
              width="600"
              height="900"
              loading="lazy"
              decoding="async"
            />
            <div className="room-card-copy">
              <p className="room-meta">{t.rooms.triple.meta}</p>
              <h3>{t.rooms.triple.title}</h3>
              <p>{t.rooms.triple.text}</p>
            </div>
          </article>
        </div>

        <article className="whole-property">
          <img
            src={assetPath("/images/dining-detail.webp")}
            alt={language === "ro"
              ? "Sala de mese pentru grupuri la Pensiunea EdMont"
              : "Dining space for groups at Pensiunea EdMont"}
            width="1280"
            height="853"
            loading="lazy"
            decoding="async"
          />
          <div>
            <p className="eyebrow eyebrow-light">{t.rooms.whole.eyebrow}</p>
            <span className="whole-meta">{t.rooms.whole.meta}</span>
            <h3>{t.rooms.whole.title}</h3>
            <p>{t.rooms.whole.text}</p>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              {t.rooms.whole.cta} <span aria-hidden="true">→</span>
            </a>
          </div>
        </article>
      </section>

      <section className="events-section" id="evenimente">
        <div className="events-photo">
          <img
            src={assetPath("/images/event-room.webp")}
            alt={language === "ro"
              ? "Sala interioară pentru evenimente și întâlniri la EdMont"
              : "Indoor event and meeting space at EdMont"}
            width="1280"
            height="853"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="events-copy">
          <p className="eyebrow eyebrow-light">{t.events.eyebrow}</p>
          <h2>{t.events.title}</h2>
          <p className="events-lead">{t.events.body}</p>
          <p className="included-label">{t.events.label}</p>
          <ul>
            {t.events.features.map((feature) => <li key={feature}>{feature}</li>)}
          </ul>
          <p className="events-note">{t.events.note}</p>
          <a className="button button-light" href={whatsappUrl} target="_blank" rel="noreferrer">
            {t.events.cta}
          </a>
        </div>
      </section>

      <section className="section amenities-section">
        <div className="section-heading section-heading-wide">
          <div>
            <p className="eyebrow">{t.amenities.eyebrow}</p>
            <h2>{t.amenities.title}</h2>
          </div>
          <div className="arrival-card">
            <div><span>{t.amenities.checkin}</span><strong>14:00</strong></div>
            <div><span>{t.amenities.checkout}</span><strong>12:00</strong></div>
          </div>
        </div>
        <div className="amenity-grid">
          {t.amenities.items.map(([title, text]) => (
            <article className="amenity" key={title}>
              <span aria-hidden="true">✓</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="reviews-section">
        <div className="review-score">
          <span>{t.reviews.label}</span>
          <div><strong>{formattedBookingRating}</strong><small>/ 10</small></div>
          <a href={bookingUrl} target="_blank" rel="noreferrer">
            Booking.com <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="review-copy">
          <p className="eyebrow eyebrow-light">{t.reviews.eyebrow}</p>
          <h2>{t.reviews.title}</h2>
          <p>{t.reviews.body}</p>
          <a href={bookingUrl} target="_blank" rel="noreferrer">
            {t.reviews.cta} <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <section className="section gallery-section" id="galerie">
        <div className="section-heading">
          <p className="eyebrow">{t.gallery.eyebrow}</p>
          <h2>{t.gallery.title}</h2>
        </div>
        <div className="gallery-grid">
          {galleryImages.map((src, index) => (
            <figure className={`gallery-item gallery-item-${index + 1}`} key={src}>
              <img
                src={assetPath(src)}
                alt={t.gallery.alt[index]}
                width="1280"
                height="900"
                loading="lazy"
                decoding="async"
              />
            </figure>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-panel">
          <p className="eyebrow eyebrow-light">{t.contact.eyebrow}</p>
          <h2>{t.contact.title}</h2>
          <p className="contact-intro">{t.contact.body}</p>

          <div className="booking-contact-card">
            <span className="booking-contact-brand">Booking.com</span>
            <h3>{t.contact.bookingTitle}</h3>
            <p>{t.contact.bookingText}</p>
            <a href={bookingUrl} target="_blank" rel="noreferrer">
              {t.contact.bookingCta} <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="direct-contact">
            <h3>{t.contact.directTitle}</h3>
            <a href={`tel:${phoneValue}`}>
              <span>{t.contact.call}</span>
              <strong>{phoneDisplay}</strong>
            </a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              <span>WhatsApp</span>
              <strong>{t.contact.whatsapp} ↗</strong>
            </a>
            <a href="mailto:edmont.residence@gmail.com">
              <span>{t.contact.email}</span>
              <strong>edmont.residence@gmail.com</strong>
            </a>
          </div>

          <div className="social-links">
            <span>{t.contact.social}</span>
            <a href={facebookUrl} target="_blank" rel="noreferrer">Facebook</a>
            <a href={instagramUrl} target="_blank" rel="noreferrer">Instagram</a>
          </div>
        </div>

        <div className="map-panel">
          <div className="map-label">
            <p>{t.contact.locationTitle}</p>
            <span>{t.contact.addressPlaceholder}</span>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2812.192248921766!2d25.427684273426642!3d45.18320445214751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b31d7239c08f15%3A0x5d9b5e0e2352f6d1!2sPensiunea%20EdMont!5e0!3m2!1sru!2s!4v1785167920506!5m2!1sru!2s"
            title={t.contact.mapTitle}
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </section>

      <footer>
        <span>{t.footer}</span>
        <span>© {new Date().getFullYear()}</span>
      </footer>

      <a
        className={showMobileBooking
          ? "mobile-booking-bar is-visible"
          : "mobile-booking-bar"}
        href={bookingUrl}
        target="_blank"
        rel="noreferrer"
        aria-hidden={!showMobileBooking}
        tabIndex={showMobileBooking ? 0 : -1}
      >
        <span>Booking.com</span>
        <strong>{t.mobileBooking}</strong>
      </a>
    </main>
  );
}
