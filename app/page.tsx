"use client";

import { useState } from "react";

type Language = "ro" | "en";

const bookingUrl = "https://www.booking.com/Share-oMcJxW";
const phoneDisplay = "+40 772 210 309";
const phoneValue = "+40772210309";
const whatsappUrl = "https://wa.me/40772210309";
const facebookUrl = "https://www.facebook.com/PensiuneaEdmont/";
const instagramUrl = "https://www.instagram.com/edmont.pensiunea/";

const content = {
  ro: {
    nav: {
      about: "Despre",
      rooms: "Camere",
      experiences: "Experiențe",
      gallery: "Galerie",
      contact: "Contact",
    },
    hero: {
      eyebrow: "Pensiune de 3 stele · Pietroșița",
      title: "Momente. Împreună. În natură.",
      intro:
        "Un loc liniștit pentru familie, prieteni, retreaturi și întâlniri care merită trăite pe îndelete.",
      primary: "Solicită prețul",
      secondary: "Descoperă pensiunea",
      stats: [
        ["9", "camere"],
        ["20", "oaspeți"],
        ["9,6", "pe Booking"],
      ],
    },
    about: {
      eyebrow: "Bine ați venit",
      title: "Aproape de natură. Aproape unii de alții.",
      body:
        "Pensiunea EdMont este un refugiu retras în verdele din Pietroșița — suficient de spațios pentru grupuri, suficient de intim pentru un weekend în doi. Camerele confortabile, spațiile comune și priveliștea către dealuri creează cadrul firesc pentru odihnă și timp petrecut împreună.",
      cardTitle: "Pensiunea întreagă",
      cardBody:
        "Rezervă toate cele 9 camere pentru până la 20 de oaspeți și bucură-te de toate spațiile și dotările, fără costuri suplimentare.",
      cardCta: "Cere o ofertă",
    },
    rooms: {
      eyebrow: "Cazare",
      title: "Camere simple, curate și confortabile",
      intro:
        "Fiecare cameră are baie proprie, televizor, Wi‑Fi și tot ce ai nevoie pentru un sejur liniștit.",
      double: {
        title: "Cameră dublă matrimonială",
        body: "Pentru 2 oaspeți, cu un pat matrimonial generos și o atmosferă calmă.",
        meta: "2 oaspeți · 1 pat matrimonial",
      },
      triple: {
        title: "Cameră triplă",
        body: "Pentru familie sau prieteni, cu un pat matrimonial și un pat de o persoană.",
        meta: "3 oaspeți · 2 paturi",
      },
      whole: {
        title: "Toată pensiunea",
        body: "Libertate, intimitate și toate spațiile la dispoziția grupului tău.",
        meta: "9 camere · până la 20 de oaspeți",
      },
    },
    food: {
      eyebrow: "La masă",
      title: "Dimineți bune și seri împreună",
      intro:
        "Alege micul dejun la cerere, gătește în bucătăria comună sau adună-i pe cei dragi în jurul mesei.",
      items: [
        ["Mic dejun la cerere", "Opțiuni de mic dejun pregătite pentru începuturi de zi fără grabă."],
        ["Bucătărie comună", "Un spațiu utilat pentru cei care preferă să gătească în ritmul lor."],
        ["Restaurant interior", "O sală de mese confortabilă pentru grupuri și momente împreună."],
        ["Terasă, grătar și foc", "Mese în aer liber, zonă de grătar și un loc de adunare în jurul focului."],
      ],
    },
    events: {
      eyebrow: "Retreaturi & evenimente",
      title: "Spațiu pentru idei, oameni și momente importante",
      body:
        "EdMont găzduiește retreaturi, aniversări, botezuri, întâlniri corporate și traininguri pentru grupuri de până la 20 de persoane.",
      included: "Incluse la rezervarea integrală",
      features: [
        "Proiector și ecran",
        "Sistem audio",
        "Wi‑Fi",
        "Bucătărie și sală de mese",
        "Parcare privată",
        "Terasă și spații exterioare",
      ],
      note:
        "La rezervarea întregii pensiuni, toate spațiile și dotările disponibile sunt incluse.",
      cta: "Discută cu noi",
    },
    amenities: {
      eyebrow: "Facilități",
      title: "Tot ce contează pentru un sejur relaxat",
      items: [
        ["Wi‑Fi gratuit", "Conexiune disponibilă în pensiune."],
        ["Parcare privată", "Locuri de parcare în incintă."],
        ["Grădină & terasă", "Spații pentru aer curat și timp împreună."],
        ["Bucătărie comună", "Gătește atunci când dorești."],
        ["Grătar & zonă de foc", "Seri lungi, în aer liber."],
        ["Familii binevenite", "Copiii sunt bineveniți; paturi suplimentare la cerere."],
        ["Animale de talie mică", "Acceptate la cerere."],
        ["Plată flexibilă", "Numerar sau plată fără numerar."],
      ],
      checkin: "Check-in",
      checkout: "Check-out",
      smoking: "Fumatul nu este permis în interior; doar pe balcoane și terase.",
    },
    reviews: {
      eyebrow: "Oaspeții noștri",
      title: "Un loc apreciat pentru lucrurile care contează",
      score: "9,6",
      scoreLabel: "Excepțional pe Booking",
      body:
        "Oaspeții remarcă în mod repetat curățenia impecabilă, liniștea, camerele spațioase, micul dejun și ospitalitatea gazdelor.",
      traits: ["Curățenie impecabilă", "Liniște și natură", "Gazde primitoare"],
      cta: "Vezi recenziile pe Booking",
    },
    gallery: {
      eyebrow: "Galerie",
      title: "Un colț de liniște în Pietroșița",
      alt: [
        "Pensiunea EdMont văzută deasupra dealurilor verzi",
        "Cameră dublă matrimonială la Pensiunea EdMont",
        "Cameră luminoasă cu pat matrimonial",
        "Cameră EdMont cu vedere spre balcon",
        "Detalii și mobilier într-o cameră EdMont",
        "Spațiu comun interior la Pensiunea EdMont",
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Planifică următoarea escapadă",
      body:
        "Sună-ne, scrie-ne pe WhatsApp sau rezervă prin Booking. Îți răspundem cu disponibilitatea și oferta potrivită grupului tău.",
      call: "Sună acum",
      whatsapp: "WhatsApp",
      booking: "Rezervă pe Booking",
      email: "Email",
      social: "Urmărește-ne",
      locationTitle: "Ne găsești în Pietroșița",
      addressPlaceholder: "Adresa completă va fi adăugată în curând.",
      mapTitle: "Pensiunea EdMont pe Google Maps",
    },
    footer: "Pensiunea EdMont · Momente. Împreună. În natură.",
  },
  en: {
    nav: {
      about: "About",
      rooms: "Rooms",
      experiences: "Experiences",
      gallery: "Gallery",
      contact: "Contact",
    },
    hero: {
      eyebrow: "3-star guesthouse · Pietroșița",
      title: "Moments. Together. In nature.",
      intro:
        "A peaceful place for family, friends, retreats and gatherings worth enjoying slowly.",
      primary: "Ask for a quote",
      secondary: "Discover the guesthouse",
      stats: [
        ["9", "rooms"],
        ["20", "guests"],
        ["9.6", "on Booking"],
      ],
    },
    about: {
      eyebrow: "Welcome",
      title: "Close to nature. Close to each other.",
      body:
        "Pensiunea EdMont is a secluded retreat surrounded by the greenery of Pietroșița — spacious enough for groups and intimate enough for a quiet weekend. Comfortable rooms, generous shared spaces and hill views create a natural setting for rest and meaningful time together.",
      cardTitle: "The entire guesthouse",
      cardBody:
        "Book all 9 rooms for up to 20 guests and enjoy every available space and facility with no additional fees.",
      cardCta: "Request an offer",
    },
    rooms: {
      eyebrow: "Stay",
      title: "Simple, clean and comfortable rooms",
      intro:
        "Every room includes a private bathroom, TV, Wi‑Fi and the essentials for a restful stay.",
      double: {
        title: "Double Room",
        body: "For 2 guests, with a generous double bed and a calm, welcoming atmosphere.",
        meta: "2 guests · 1 double bed",
      },
      triple: {
        title: "Triple Room",
        body: "For a family or friends, with one double bed and one single bed.",
        meta: "3 guests · 2 beds",
      },
      whole: {
        title: "Entire guesthouse",
        body: "Freedom, privacy and all shared spaces reserved for your group.",
        meta: "9 rooms · up to 20 guests",
      },
    },
    food: {
      eyebrow: "Dining",
      title: "Good mornings and evenings together",
      intro:
        "Choose breakfast on request, cook in the shared kitchen or bring everyone together around the table.",
      items: [
        ["Breakfast on request", "Breakfast choices prepared for an unhurried start to the day."],
        ["Shared kitchen", "A well-equipped space for guests who prefer to cook at their own pace."],
        ["Indoor dining room", "A comfortable room for group meals and time together."],
        ["Terrace, grill & fire pit", "Outdoor dining, a barbecue area and a place to gather around the fire."],
      ],
    },
    events: {
      eyebrow: "Retreats & events",
      title: "Room for ideas, people and meaningful moments",
      body:
        "EdMont welcomes retreats, birthdays, christenings, corporate meetings and training sessions for groups of up to 20 people.",
      included: "Included with full-property booking",
      features: [
        "Projector and screen",
        "Sound system",
        "Wi‑Fi",
        "Kitchen and dining room",
        "Private parking",
        "Terrace and outdoor spaces",
      ],
      note:
        "When the entire guesthouse is booked, all available shared spaces and equipment are included.",
      cta: "Talk to us",
    },
    amenities: {
      eyebrow: "Amenities",
      title: "Everything that matters for a relaxed stay",
      items: [
        ["Free Wi‑Fi", "Connection available throughout the guesthouse."],
        ["Private parking", "On-site parking for guests."],
        ["Garden & terrace", "Fresh air and room to spend time together."],
        ["Shared kitchen", "Cook whenever you wish."],
        ["Grill & fire pit", "Long evenings outdoors."],
        ["Families welcome", "Children are welcome; extra beds on request."],
        ["Small pets", "Accepted on request."],
        ["Flexible payment", "Cash or cashless payment."],
      ],
      checkin: "Check-in",
      checkout: "Check-out",
      smoking: "Smoking is not permitted indoors; balconies and terraces only.",
    },
    reviews: {
      eyebrow: "Our guests",
      title: "Loved for the things that matter",
      score: "9.6",
      scoreLabel: "Exceptional on Booking",
      body:
        "Guests consistently highlight the spotless cleanliness, peaceful setting, spacious rooms, breakfast and the hosts’ warm hospitality.",
      traits: ["Spotless cleanliness", "Peace and nature", "Welcoming hosts"],
      cta: "Read reviews on Booking",
    },
    gallery: {
      eyebrow: "Gallery",
      title: "A quiet corner of Pietroșița",
      alt: [
        "Aerial view of Pensiunea EdMont among green hills",
        "Double room at Pensiunea EdMont",
        "Bright room with a double bed",
        "EdMont room facing the balcony",
        "Room details and furniture at EdMont",
        "Indoor common area at Pensiunea EdMont",
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Plan your next escape",
      body:
        "Call us, message us on WhatsApp or book through Booking. We’ll reply with availability and the right offer for your group.",
      call: "Call now",
      whatsapp: "WhatsApp",
      booking: "Book on Booking",
      email: "Email",
      social: "Follow us",
      locationTitle: "Find us in Pietroșița",
      addressPlaceholder: "The full address will be added soon.",
      mapTitle: "Pensiunea EdMont on Google Maps",
    },
    footer: "Pensiunea EdMont · Moments. Together. In nature.",
  },
} as const;

const galleryImages = [
  "/images/hero.webp",
  "/images/room-double.webp",
  "/images/room-double-green.webp",
  "/images/room-double-view.webp",
  "/images/room-details.webp",
  "/images/common-area.webp",
];

export default function Home() {
  const [language, setLanguage] = useState<Language>("ro");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = content[language];

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Pensiunea EdMont">
          <span className="logo-frame">
            <img src="/images/logo.webp" alt="EdMont" width="520" height="190" />
          </span>
        </a>

        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Primary">
          <a href="#despre" onClick={closeMenu}>{t.nav.about}</a>
          <a href="#camere" onClick={closeMenu}>{t.nav.rooms}</a>
          <a href="#experiente" onClick={closeMenu}>{t.nav.experiences}</a>
          <a href="#galerie" onClick={closeMenu}>{t.nav.gallery}</a>
          <a href="#contact" onClick={closeMenu}>{t.nav.contact}</a>
        </nav>

        <div className="header-actions">
          <button
            className="language-switch"
            type="button"
            onClick={() => setLanguage(language === "ro" ? "en" : "ro")}
            aria-label={language === "ro" ? "Switch to English" : "Schimbă în română"}
          >
            {language === "ro" ? "EN" : "RO"}
          </button>
          <a className="header-call" href={`tel:${phoneValue}`}>{phoneDisplay}</a>
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
        <div className="hero-shade" />
        <div className="hero-content">
          <div className="star-row" aria-label={language === "ro" ? "Pensiune de trei stele" : "Three-star guesthouse"}>
            ★ ★ ★
          </div>
          <p className="eyebrow light">{t.hero.eyebrow}</p>
          <h1>{t.hero.title}</h1>
          <p className="hero-intro">{t.hero.intro}</p>
          <div className="button-row">
            <a className="button button-primary" href={whatsappUrl} target="_blank" rel="noreferrer">
              {t.hero.primary}
            </a>
            <a className="button button-ghost" href="#despre">{t.hero.secondary}</a>
          </div>
        </div>

        <div className="hero-stats" aria-label="Pensiunea EdMont facts">
          {t.hero.stats.map(([value, label]) => (
            <div className="stat" key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section about-section" id="despre">
        <div className="section-heading">
          <p className="eyebrow">{t.about.eyebrow}</p>
          <h2>{t.about.title}</h2>
        </div>
        <div className="about-grid">
          <p className="lead-copy">{t.about.body}</p>
          <article className="feature-card dark-card">
            <span className="feature-number">9 / 20</span>
            <h3>{t.about.cardTitle}</h3>
            <p>{t.about.cardBody}</p>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">{t.about.cardCta} <span aria-hidden="true">→</span></a>
          </article>
        </div>
      </section>

      <section className="section rooms-section" id="camere">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">{t.rooms.eyebrow}</p>
            <h2>{t.rooms.title}</h2>
          </div>
          <p>{t.rooms.intro}</p>
        </div>

        <div className="room-grid">
          <article className="room-card room-card-large">
            <img src="/images/room-double.webp" alt={t.gallery.alt[1]} width="500" height="281" loading="lazy" />
            <div className="room-card-copy">
              <p className="room-meta">{t.rooms.double.meta}</p>
              <h3>{t.rooms.double.title}</h3>
              <p>{t.rooms.double.body}</p>
            </div>
          </article>
          <article className="room-card">
            <img src="/images/room-double-green.webp" alt={t.gallery.alt[2]} width="300" height="169" loading="lazy" />
            <div className="room-card-copy">
              <p className="room-meta">{t.rooms.triple.meta}</p>
              <h3>{t.rooms.triple.title}</h3>
              <p>{t.rooms.triple.body}</p>
            </div>
          </article>
          <article className="room-card whole-property-card">
            <div className="whole-property-mark">ED</div>
            <div className="room-card-copy">
              <p className="room-meta">{t.rooms.whole.meta}</p>
              <h3>{t.rooms.whole.title}</h3>
              <p>{t.rooms.whole.body}</p>
              <a href={whatsappUrl} target="_blank" rel="noreferrer">{t.about.cardCta} <span aria-hidden="true">→</span></a>
            </div>
          </article>
        </div>
      </section>

      <section className="nature-break" aria-label={language === "ro" ? "Pensiunea în natură" : "Guesthouse in nature"}>
        <div>
          <p>{language === "ro" ? "Retrage-te din agitație" : "Step away from the rush"}</p>
          <strong>{language === "ro" ? "Respiră. Privește. Rămâi." : "Breathe. Look. Stay."}</strong>
        </div>
      </section>

      <section className="section food-section" id="experiente">
        <div className="section-heading centered-heading">
          <p className="eyebrow">{t.food.eyebrow}</p>
          <h2>{t.food.title}</h2>
          <p>{t.food.intro}</p>
        </div>
        <div className="feature-grid">
          {t.food.items.map(([title, description], index) => (
            <article className="simple-feature" key={title}>
              <span className="feature-index">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section events-section">
        <div className="events-photo">
          <img src="/images/common-area.webp" alt={t.gallery.alt[5]} width="300" height="533" loading="lazy" />
        </div>
        <div className="events-copy">
          <p className="eyebrow light">{t.events.eyebrow}</p>
          <h2>{t.events.title}</h2>
          <p className="events-lead">{t.events.body}</p>
          <p className="included-label">{t.events.included}</p>
          <ul>
            {t.events.features.map((feature) => <li key={feature}>{feature}</li>)}
          </ul>
          <p className="events-note">{t.events.note}</p>
          <a className="button button-ivory" href={whatsappUrl} target="_blank" rel="noreferrer">
            {t.events.cta}
          </a>
        </div>
      </section>

      <section className="section amenities-section">
        <div className="section-heading split-heading">
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
          {t.amenities.items.map(([title, description]) => (
            <article className="amenity" key={title}>
              <span className="amenity-dot" aria-hidden="true" />
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="smoking-note">{t.amenities.smoking}</p>
      </section>

      <section className="section reviews-section">
        <div className="review-score">
          <strong>{t.reviews.score}</strong>
          <span>/ 10</span>
          <p>{t.reviews.scoreLabel}</p>
        </div>
        <div className="review-content">
          <p className="eyebrow light">{t.reviews.eyebrow}</p>
          <h2>{t.reviews.title}</h2>
          <p>{t.reviews.body}</p>
          <div className="review-traits">
            {t.reviews.traits.map((trait) => <span key={trait}>{trait}</span>)}
          </div>
          <a href={bookingUrl} target="_blank" rel="noreferrer">
            {t.reviews.cta} <span aria-hidden="true">↗</span>
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
            <figure key={src} className={`gallery-item gallery-item-${index + 1}`}>
              <img
                src={src}
                alt={t.gallery.alt[index]}
                loading={index === 0 ? "eager" : "lazy"}
                width={index === 0 ? 1024 : 500}
                height={index === 0 ? 768 : 281}
              />
            </figure>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-panel">
          <p className="eyebrow light">{t.contact.eyebrow}</p>
          <h2>{t.contact.title}</h2>
          <p className="contact-intro">{t.contact.body}</p>
          <div className="contact-actions">
            <a className="button button-ivory" href={`tel:${phoneValue}`}>{t.contact.call}</a>
            <a className="button button-outline-light" href={whatsappUrl} target="_blank" rel="noreferrer">{t.contact.whatsapp}</a>
          </div>
          <div className="contact-list">
            <a href={`tel:${phoneValue}`}>
              <span>{t.contact.call}</span>
              <strong>{phoneDisplay}</strong>
            </a>
            <a href="mailto:edmont.residence@gmail.com">
              <span>{t.contact.email}</span>
              <strong>edmont.residence@gmail.com</strong>
            </a>
            <a href={bookingUrl} target="_blank" rel="noreferrer">
              <span>Booking.com</span>
              <strong>{t.contact.booking} ↗</strong>
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
    </main>
  );
}
