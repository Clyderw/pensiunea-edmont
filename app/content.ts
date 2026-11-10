export type Language = "ro" | "en";

export const contact = {
  phoneDisplay: "+40 772 210 309",
  phoneValue: "+40772210309",
  whatsappNumber: "40772210309",
  email: "edmont.residence@gmail.com",
  facebook: "https://www.facebook.com/PensiuneaEdmont/",
  instagram: "https://www.instagram.com/edmont.pensiunea/",
  bookingReviews: "https://www.booking.com/hotel/ro/pensiunea-edmont-pietrosita.ro.html#tab-reviews",
  maps: "https://www.google.com/maps/search/?api=1&query=Pensiunea+EdMont+Pietro%C8%99i%C8%9Ba",
};

export const stayOptions = ["double", "triple", "several", "whole"] as const;
export type Stay = (typeof stayOptions)[number];

export const occasionOptions = ["stay", "birthday", "christening", "retreat", "company", "other"] as const;
export type Occasion = (typeof occasionOptions)[number];

export const petOptions = ["no", "small"] as const;
export type Pet = (typeof petOptions)[number];

export const content = {
  ro: {
    skip: "Sari la conținut",
    nav: {
      label: "Navigare principală",
      about: "Pensiunea",
      rooms: "Camere",
      events: "Evenimente",
      gallery: "Galerie",
      contact: "Contact",
    },
    header: {
      book: "Rezervă",
      call: "Sună la EdMont",
      themeToDark: "Activează tema întunecată",
      themeToLight: "Activează tema luminoasă",
      language: "Switch to English",
      openMenu: "Deschide meniul",
      closeMenu: "Închide meniul",
    },
    hero: {
      stars: "Pensiune de trei stele",
      kicker: "Pensiune de trei stele în Pietroșița, Dâmbovița",
      title: ["Momente.", "Împreună.", "În natură."],
      intro:
        "Nouă camere între dealurile din Pietroșița, cu bucătărie comună, terasă și loc de foc. Pentru familie, prieteni sau echipa ta.",
      barLabel: "Verifică perioada",
      arrival: "Sosire",
      departure: "Plecare",
      guests: "Adulți",
      cta: "Verifică disponibilitatea",
      note: "Rezervi direct cu gazdele, fără intermediari.",
      callPrompt: "Preferi să vorbim?",
      whatsapp: "WhatsApp",
    },
    about: {
      title: "Liniște pentru doi. Spațiu pentru toți.",
      body:
        "Înconjurată de dealurile verzi din Pietroșița, EdMont are camere confortabile și spații în care poți găti, lua masa, lucra sau sta pur și simplu împreună cu ai tăi.",
      factsLabel: "Pe scurt",
      facts: [
        ["9 camere", "fiecare cu baie proprie"],
        ["Până la 20 de oaspeți", "poți rezerva o cameră sau toată pensiunea"],
        ["Check-in de la 14:00", "check-out până la 12:00"],
      ],
    },
    rooms: {
      title: "Camere curate și confortabile",
      intro:
        "Fiecare cameră are baie proprie, televizor și Wi-Fi. La cerere, adăugăm un pat suplimentar.",
      double: {
        title: "Cameră dublă matrimonială",
        text: "Pentru două persoane, cu un pat matrimonial generos.",
        meta: "2 oaspeți, 1 pat matrimonial",
        cta: "Alege camera dublă",
        alt: "Cameră matrimonială luminoasă la Pensiunea EdMont",
      },
      triple: {
        title: "Cameră triplă",
        text: "Pentru familie sau prieteni: un pat matrimonial și un pat de o persoană.",
        meta: "3 oaspeți, 1 pat matrimonial și 1 pat single",
        cta: "Alege camera triplă",
        alt: "Cameră triplă cu pat matrimonial și pat individual",
      },
      whole: {
        title: "Toată pensiunea, doar pentru grupul tău",
        text:
          "Toate cele 9 camere și toate spațiile comune, fără taxe suplimentare. Potrivită pentru reuniuni de familie, prieteni sau echipe de până la 20 de persoane.",
        cta: "Cere ofertă pentru toată pensiunea",
        alt: "Sala de mese pentru grupuri la Pensiunea EdMont",
      },
    },
    shared: {
      title: "Spații comune pentru toți oaspeții",
      intro:
        "Bucătăria, sala de mese și terasa cu foișor sunt deschise tuturor, fie că rezervi o cameră, fie toată pensiunea.",
      items: [
        {
          title: "Bucătărie comună",
          text: "Utilată, ca să gătești în ritmul tău.",
          image: "/images/kitchen.webp",
          alt: "Bucătăria comună utilată de la Pensiunea EdMont",
        },
        {
          title: "Sală de mese",
          text: "Luminoasă, pentru micul dejun și mesele împreună.",
          image: "/images/dining.webp",
          alt: "Sala de mese luminoasă de la Pensiunea EdMont",
        },
        {
          title: "Terasă și foișor",
          text: "Aer liber, grătar și seri în jurul focului.",
          image: "/images/terrace-view.webp",
          alt: "Priveliște de pe terasa Pensiunii EdMont",
        },
      ],
      breakfast: "Micul dejun se servește la cerere, din câteva variante.",
    },
    events: {
      title: "Loc pentru retreaturi și zile importante",
      body:
        "Găzduim retreaturi, aniversări, botezuri, traininguri și întâlniri de firmă pentru grupuri de până la 20 de persoane.",
      label: "Ce găsești la fața locului",
      features: [
        "Proiector și ecran",
        "Sistem audio",
        "Wi-Fi",
        "Bucătărie și sală de mese",
        "Parcare privată",
        "Terasă și spații exterioare",
      ],
      note:
        "Când rezervi toată pensiunea, echipamentele și spațiile sunt incluse, fără costuri în plus.",
      cta: "Cere ofertă pentru eveniment",
      whatsapp: "Sau scrie-ne pe WhatsApp",
      alt: "Sala interioară pentru evenimente și întâlniri la EdMont",
    },
    amenities: {
      title: "Tot ce trebuie pentru un sejur liniștit",
      items: [
        ["Wi-Fi gratuit", "Disponibil în pensiune."],
        ["Parcare privată", "Locuri în curte."],
        ["Grădină și terasă", "Spațiu pentru aer liber."],
        ["Grătar și loc de foc", "Pentru serile împreună."],
        ["Familii binevenite", "Pat suplimentar pentru copii, la cerere."],
        ["Animale de talie mică", "Acceptate la cerere."],
        ["Plată flexibilă", "Numerar sau card."],
        ["Fără fum în interior", "Se fumează doar pe balcoane și terase."],
      ],
    },
    reviews: {
      title: "Liniște, curățenie și gazde primitoare",
      body:
        "Oaspeții scriu des despre curățenie, camerele spațioase, priveliște, micul dejun și ospitalitatea gazdelor.",
      link: "Citește recenziile pe Booking.com",
    },
    gallery: {
      title: "Cum arată un sejur la EdMont",
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
    booking: {
      title: "Rezervă direct la EdMont",
      intro:
        "Completează cererea și o trimitem imediat gazdelor pe WhatsApp. Rezervarea este confirmată după răspunsul lor.",
      formLabel: "Cerere de rezervare",
      arrival: "Sosire",
      departure: "Plecare",
      adults: "Adulți",
      children: "Copii",
      stay: "Cazare",
      stayOptions: {
        double: "Cameră dublă matrimonială",
        triple: "Cameră triplă",
        several: "Mai multe camere",
        whole: "Toată pensiunea",
      },
      occasion: "Ocazie",
      occasionOptions: {
        stay: "Sejur",
        birthday: "Aniversare",
        christening: "Botez",
        retreat: "Retreat sau training",
        company: "Întâlnire de firmă",
        other: "Altceva",
      },
      name: "Nume complet",
      phone: "Telefon",
      prefix: "Prefixul țării",
      phonePlaceholder: "7xx xxx xxx",
      phoneHint: "Ai număr din altă țară? Alege prefixul sau scrie numărul cu + la început.",
      otherPrefix: "Alt prefix",
      email: "Email (opțional)",
      pet: "Animal de companie",
      petOptions: {
        no: "Nu",
        small: "Da, de talie mică",
      },
      details: "Detalii (opțional)",
      detailsPlaceholder: "Ora aproximativă a sosirii, câte camere îți trebuie, întrebări despre animal sau eveniment",
      nights: (n: number) => (n === 1 ? "1 noapte" : n % 100 === 0 || n % 100 >= 20 ? `${n} de nopți` : `${n} nopți`),
      submit: "Trimite cererea",
      sending: "Se trimite...",
      privacy:
        "Folosim datele tale doar ca să-ți răspundem la cerere. Le trimitem gazdelor pe WhatsApp și pe email.",
      recaptcha: {
        text: "Formularul este protejat de Google reCAPTCHA:",
        privacy: "confidențialitate",
        terms: "termeni",
      },
      errors: {
        arrival: "Alege data sosirii.",
        arrivalPast: "Data sosirii nu poate fi în trecut.",
        departure: "Plecarea trebuie să fie după sosire.",
        tooLong: "Pentru mai mult de 60 de nopți, scrie-ne direct pe WhatsApp.",
        name: "Scrie numele complet.",
        phone: "Scrie un număr de telefon valid. Pentru alte țări, alege prefixul potrivit.",
        email: "Adresa de email nu pare corectă.",
      },
      success: {
        title: "Cererea a ajuns la gazde",
        text: (phone: string) =>
          `Îți răspundem pe WhatsApp sau la telefon, la numărul ${phone}. Dacă te grăbești, ne poți scrie și tu direct.`,
        whatsapp: "Scrie pe WhatsApp",
        again: "Trimite altă cerere",
      },
      failure: {
        title: "Cererea nu a putut fi trimisă de pe site",
        text: "Trimite-o pe WhatsApp sau pe email. Textul este deja completat, trebuie doar să apeși trimite.",
        whatsapp: "Trimite pe WhatsApp",
        email: "Trimite pe email",
      },
      steps: {
        title: "Cum funcționează",
        items: [
          ["Trimiți cererea", "Durează un minut. Nu plătești nimic acum."],
          ["Gazdele verifică perioada", "Primesc cererea pe WhatsApp și se uită dacă perioada e liberă."],
          ["Primești răspunsul", "Îți scriem sau te sunăm cu prețul și detaliile. Apoi rezervarea e confirmată."],
        ],
      },
      direct: {
        title: "Preferi să vorbim?",
        call: "Sună",
        whatsapp: "WhatsApp",
        email: "Email",
      },
      message: {
        heading: "Bună ziua! Aș dori să rezerv la Pensiunea EdMont.",
        period: "Perioada",
        guests: "Oaspeți",
        adults: (n: number) => (n === 1 ? "1 adult" : `${n} adulți`),
        children: (n: number) => (n === 1 ? "1 copil" : `${n} copii`),
        stay: "Cazare",
        occasion: "Ocazie",
        pet: "Animal de companie",
        name: "Nume",
        phone: "Telefon",
        email: "Email",
        details: "Detalii",
      },
    },
    contact: {
      title: "Cum ajungi la EdMont",
      address: "Comuna Pietroșița, Str. Dealul Frumos nr. 60A, jud. Dâmbovița",
      directions: "Deschide în Google Maps",
      mapTitle: "Pensiunea EdMont pe Google Maps",
      social: "Ne găsești și pe",
    },
    mobileBar: {
      label: "Contact rapid",
      call: "Sună",
      whatsapp: "WhatsApp",
      book: "Rezervă",
    },
    footer: "Pensiunea EdMont, Pietroșița",
  },
  en: {
    skip: "Skip to content",
    nav: {
      label: "Primary navigation",
      about: "Guesthouse",
      rooms: "Rooms",
      events: "Events",
      gallery: "Gallery",
      contact: "Contact",
    },
    header: {
      book: "Book",
      call: "Call EdMont",
      themeToDark: "Switch to dark theme",
      themeToLight: "Switch to light theme",
      language: "Schimbă în română",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    hero: {
      stars: "Three-star guesthouse",
      kicker: "Three-star guesthouse in Pietroșița, Dâmbovița",
      title: ["Moments.", "Together.", "In nature."],
      intro:
        "Nine rooms among the hills of Pietroșița, with a shared kitchen, a terrace and a fire pit. For family, friends or your team.",
      barLabel: "Check your dates",
      arrival: "Arrival",
      departure: "Departure",
      guests: "Adults",
      cta: "Check availability",
      note: "You book directly with the hosts, no middleman.",
      callPrompt: "Rather talk to us?",
      whatsapp: "WhatsApp",
    },
    about: {
      title: "Peaceful for two. Spacious for everyone.",
      body:
        "Surrounded by the green hills of Pietroșița, EdMont has comfortable rooms and shared spaces where you can cook, dine, work or simply spend time with your people.",
      factsLabel: "At a glance",
      facts: [
        ["9 rooms", "each with a private bathroom"],
        ["Up to 20 guests", "book one room or the whole guesthouse"],
        ["Check-in from 14:00", "check-out by 12:00"],
      ],
    },
    rooms: {
      title: "Clean and comfortable rooms",
      intro: "Every room has a private bathroom, TV and Wi-Fi. Extra beds are available on request.",
      double: {
        title: "Double room",
        text: "For two guests, with a generous double bed.",
        meta: "2 guests, 1 double bed",
        cta: "Choose the double room",
        alt: "Bright double room at Pensiunea EdMont",
      },
      triple: {
        title: "Triple room",
        text: "For a family or friends: one double bed and one single bed.",
        meta: "3 guests, 1 double and 1 single bed",
        cta: "Choose the triple room",
        alt: "Triple room with one double and one single bed",
      },
      whole: {
        title: "The whole guesthouse, just for your group",
        text:
          "All 9 rooms and every shared space, with no extra fees. Right for family reunions, friends or teams of up to 20 people.",
        cta: "Ask for a whole-house quote",
        alt: "Dining space for groups at Pensiunea EdMont",
      },
    },
    shared: {
      title: "Shared spaces for every guest",
      intro:
        "The kitchen, dining room and terrace with gazebo are open to everyone, whether you book one room or the whole guesthouse.",
      items: [
        {
          title: "Shared kitchen",
          text: "Fully equipped, so you can cook at your own pace.",
          image: "/images/kitchen.webp",
          alt: "Equipped shared kitchen at Pensiunea EdMont",
        },
        {
          title: "Dining room",
          text: "Bright, for breakfast and meals together.",
          image: "/images/dining.webp",
          alt: "Bright dining room at Pensiunea EdMont",
        },
        {
          title: "Terrace and gazebo",
          text: "Fresh air, a grill and evenings around the fire.",
          image: "/images/terrace-view.webp",
          alt: "View from the terrace at Pensiunea EdMont",
        },
      ],
      breakfast: "Breakfast is available on request, with a few options to choose from.",
    },
    events: {
      title: "A place for retreats and important days",
      body:
        "We host retreats, birthdays, christenings, training sessions and company meetings for groups of up to 20 people.",
      label: "What you will find here",
      features: [
        "Projector and screen",
        "Sound system",
        "Wi-Fi",
        "Kitchen and dining room",
        "Private parking",
        "Terrace and outdoor areas",
      ],
      note: "When you book the whole guesthouse, the equipment and all spaces are included at no extra cost.",
      cta: "Ask for an event quote",
      whatsapp: "Or message us on WhatsApp",
      alt: "Indoor event and meeting space at EdMont",
    },
    amenities: {
      title: "Everything you need for a quiet stay",
      items: [
        ["Free Wi-Fi", "Available in the guesthouse."],
        ["Private parking", "Spaces in the yard."],
        ["Garden and terrace", "Room to enjoy the outdoors."],
        ["Grill and fire pit", "For evenings together."],
        ["Families welcome", "Extra beds for children on request."],
        ["Small pets", "Welcome on request."],
        ["Flexible payment", "Cash or card."],
        ["Smoke-free indoors", "Smoking on balconies and terraces only."],
      ],
    },
    reviews: {
      title: "Peace, cleanliness and welcoming hosts",
      body:
        "Guests often mention the cleanliness, spacious rooms, the view, breakfast and the hosts' hospitality.",
      link: "Read the reviews on Booking.com",
    },
    gallery: {
      title: "What a stay at EdMont looks like",
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
    booking: {
      title: "Book directly with EdMont",
      intro:
        "Fill in the request and we send it straight to the hosts on WhatsApp. Your booking is confirmed once they reply.",
      formLabel: "Booking request",
      arrival: "Arrival",
      departure: "Departure",
      adults: "Adults",
      children: "Children",
      stay: "Room",
      stayOptions: {
        double: "Double room",
        triple: "Triple room",
        several: "Several rooms",
        whole: "Whole guesthouse",
      },
      occasion: "Occasion",
      occasionOptions: {
        stay: "Holiday",
        birthday: "Birthday",
        christening: "Christening",
        retreat: "Retreat or training",
        company: "Company meeting",
        other: "Something else",
      },
      name: "Full name",
      phone: "Phone",
      prefix: "Country code",
      phonePlaceholder: "Phone number",
      phoneHint: "Not a Romanian number? Pick your country code or type the number starting with +.",
      otherPrefix: "Other code",
      email: "Email (optional)",
      pet: "Pet",
      petOptions: {
        no: "No",
        small: "Yes, a small one",
      },
      details: "Details (optional)",
      detailsPlaceholder: "Approximate arrival time, how many rooms you need, questions about pets or events",
      nights: (n: number) => (n === 1 ? "1 night" : `${n} nights`),
      submit: "Send request",
      sending: "Sending...",
      privacy:
        "We use your details only to reply to your request. We send them to the hosts on WhatsApp and by email.",
      recaptcha: {
        text: "This form is protected by Google reCAPTCHA:",
        privacy: "privacy",
        terms: "terms",
      },
      errors: {
        arrival: "Choose your arrival date.",
        arrivalPast: "The arrival date can't be in the past.",
        departure: "Departure must be after arrival.",
        tooLong: "For stays longer than 60 nights, message us on WhatsApp.",
        name: "Enter your full name.",
        phone: "Enter a valid phone number. For other countries, pick the right country code.",
        email: "This email address doesn't look right.",
      },
      success: {
        title: "Your request reached the hosts",
        text: (phone: string) =>
          `We will reply on WhatsApp or call you at ${phone}. If you're in a hurry, you can message us directly too.`,
        whatsapp: "Message on WhatsApp",
        again: "Send another request",
      },
      failure: {
        title: "The request couldn't be sent from the website",
        text: "Send it on WhatsApp or by email instead. The text is already filled in, you only need to press send.",
        whatsapp: "Send on WhatsApp",
        email: "Send by email",
      },
      steps: {
        title: "How it works",
        items: [
          ["You send the request", "It takes a minute. You don't pay anything now."],
          ["The hosts check your dates", "They get the request on WhatsApp and check availability."],
          ["You get a reply", "We message or call you with the price and details. Then your booking is confirmed."],
        ],
      },
      direct: {
        title: "Rather talk to us?",
        call: "Call",
        whatsapp: "WhatsApp",
        email: "Email",
      },
      message: {
        heading: "Hello! I would like to book a stay at Pensiunea EdMont.",
        period: "Dates",
        guests: "Guests",
        adults: (n: number) => (n === 1 ? "1 adult" : `${n} adults`),
        children: (n: number) => (n === 1 ? "1 child" : `${n} children`),
        stay: "Room",
        occasion: "Occasion",
        pet: "Pet",
        name: "Name",
        phone: "Phone",
        email: "Email",
        details: "Details",
      },
    },
    contact: {
      title: "How to find EdMont",
      address: "Comuna Pietroșița, Str. Dealul Frumos nr. 60A, Dâmbovița county",
      directions: "Open in Google Maps",
      mapTitle: "Pensiunea EdMont on Google Maps",
      social: "Find us on",
    },
    mobileBar: {
      label: "Quick contact",
      call: "Call",
      whatsapp: "WhatsApp",
      book: "Book",
    },
    footer: "Pensiunea EdMont, Pietroșița",
  },
};

export type Copy = (typeof content)["ro"];

export const galleryImages = [
  "/images/hero.webp",
  "/images/room-double.webp",
  "/images/room-view.webp",
  "/images/kitchen.webp",
  "/images/dining.webp",
  "/images/dining-detail.webp",
  "/images/balcony.webp",
  "/images/room-green.webp",
];
