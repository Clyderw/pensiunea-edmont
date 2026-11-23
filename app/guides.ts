import type { Language } from "./content";

export type GuideKey = "bucegi" | "day-trips" | "retreat";

export type Guide = {
  key: GuideKey;
  slug: string;
  image: string;
  imageAlt: string;
  title: string;
  metaTitle: string;
  description: string;
  card: string;
  lead: string;
  facts: [string, string][];
  sections: { heading: string; paragraphs: string[] }[];
};

export const guidePath = (language: Language, slug: string) =>
  language === "ro" ? `/ghid/${slug}/` : `/en/guide/${slug}/`;

export const guides: Record<Language, Guide[]> = {
  ro: [
    {
      key: "bucegi",
      slug: "bucegi-valea-ialomitei",
      image: "/images/guide-bucegi.webp",
      imageAlt: "Priveliște spre munți de pe balconul Pensiunii EdMont",
      title: "Bucegi și Valea Ialomiței, pornind de la EdMont",
      metaTitle: "Bucegi și Valea Ialomiței: Bolboci, Cheile Tătarului, Peștera Ialomiței",
      description:
        "Ce vezi pe Valea Ialomiței și în Bucegi pornind de la Pensiunea EdMont: Lacul Bolboci, Cheile Tătarului, Padina, Peștera Ialomiței, Babele și Sfinxul. Distanțe și sfaturi practice.",
      card: "Lacul Bolboci, Cheile Tătarului, Peștera Ialomiței, Babele și Sfinxul.",
      lead:
        "Din Pietroșița, Valea Ialomiței urcă spre inima Munților Bucegi. În aceeași zi poți vedea un lac de munte, chei de calcar și o peșteră cu un schit la intrare, iar seara te întorci la liniștea pensiunii.",
      facts: [
        ["Lacul Bolboci", "aprox. 38 km, 1 oră"],
        ["Cheile Tătarului", "aprox. 41 km, 1 oră și 10 min"],
        ["Peștera Ialomiței", "aprox. 46 km, 1 oră și 15 min"],
        ["Bușteni, telecabina spre Babele", "aprox. 39 km, 55 min"],
      ],
      sections: [
        {
          heading: "Lacul Bolboci",
          paragraphs: [
            "Primul popas pe drumul spre munte este Lacul Bolboci, un lac de acumulare pe râul Ialomița, înconjurat de pădure. E un loc bun pentru o plimbare pe mal și pentru primele fotografii cu Bucegii în fundal.",
          ],
        },
        {
          heading: "Cheile Tătarului și Padina",
          paragraphs: [
            "Mai sus pe vale, Ialomița trece printre pereți înalți de calcar: Cheile Tătarului. Drumul continuă apoi spre Padina, de unde pornesc mai multe trasee marcate prin Bucegi.",
            "Ia-ți încălțăminte bună. Chiar și o plimbare scurtă trece pe poteci de munte.",
          ],
        },
        {
          heading: "Peștera Ialomiței",
          paragraphs: [
            "Peștera Ialomiței este una dintre cele mai cunoscute peșteri din România. Se află la peste 1.500 de metri altitudine, iar chiar la intrarea ei este un schit. Traseul amenajat pentru vizitare are câteva sute de metri.",
            "Înăuntru e răcoare tot anul, așa că ia o haină în plus și vara.",
          ],
        },
        {
          heading: "Babele și Sfinxul",
          paragraphs: [
            "Stâncile Babele și Sfinxul sunt pe Platoul Bucegi, la peste 2.000 de metri. Cel mai simplu ajungi cu telecabina din Bușteni, la aproximativ o oră de mers cu mașina de la EdMont. De la stația de sus până la Sfinx e o plimbare scurtă pe platou.",
          ],
        },
        {
          heading: "Când să mergi",
          paragraphs: [
            "Vara și începutul toamnei sunt cele mai bune perioade pentru Valea Ialomiței. Iarna, drumul spre Bolboci, Padina și Peștera poate fi greu de circulat sau închis.",
            "Programul telecabinelor și al peșterii, ca și prețurile, se schimbă de la un sezon la altul. Verifică-le înainte să pleci.",
          ],
        },
      ],
    },
    {
      key: "day-trips",
      slug: "excursii-sinaia-targoviste-brasov",
      image: "/images/guide-day-trips.webp",
      imageAlt: "Pensiunea EdMont și dealurile din Pietroșița",
      title: "Excursii de o zi: Sinaia, Târgoviște, Brașov și Bran",
      metaTitle: "Excursii de o zi de la EdMont: Sinaia și Peleș, Târgoviște, Brașov, Bran",
      description:
        "Idei de excursii de o zi pornind din Pietroșița: Castelul Peleș și Sinaia, Curtea Domnească din Târgoviște, centrul vechi al Brașovului și Castelul Bran. Distanțe și timpi aproximativi.",
      card: "Castelul Peleș, Curtea Domnească, centrul vechi al Brașovului și Castelul Bran.",
      lead:
        "Pietroșița e la jumătatea drumului dintre dealurile Dâmboviței și Valea Prahovei. Dimineața poți fi la un castel regal sau într-o fostă capitală, iar seara la masă pe terasa pensiunii.",
      facts: [
        ["Sinaia", "aprox. 33 km, 50 min"],
        ["Târgoviște", "aprox. 35 km, 50 min"],
        ["Brașov", "aprox. 75 km, 1 oră și 40 min"],
        ["Castelul Bran", "aprox. 79 km, 1 oră și 45 min"],
      ],
      sections: [
        {
          heading: "Sinaia și Castelul Peleș",
          paragraphs: [
            "Castelul Peleș a fost construit pentru Regele Carol I și este unul dintre cele mai vizitate monumente din România. În Sinaia mai vezi Mănăstirea Sinaia, care a dat numele orașului, și poți urca cu telecabina spre Bucegi.",
          ],
        },
        {
          heading: "Târgoviște",
          paragraphs: [
            "Târgoviște a fost aproape trei secole capitala Țării Românești. La Curtea Domnească vezi ruinele palatului și Turnul Chindiei, din care se vede tot orașul. E o excursie bună pentru o după-amiază, și cu copiii.",
          ],
        },
        {
          heading: "Brașov",
          paragraphs: [
            "Centrul vechi al Brașovului, cu Piața Sfatului și Biserica Neagră, se vede bine pe jos în câteva ore. Dacă ai timp, urcă pe Tâmpa pentru priveliștea de sus asupra orașului.",
          ],
        },
        {
          heading: "Castelul Bran",
          paragraphs: [
            "Castelul Bran e cunoscut în toată lumea datorită legendei lui Dracula. Îl poți combina cu Brașovul în aceeași zi, dar pleacă devreme: în sezon se stă la coadă la intrare.",
          ],
        },
        {
          heading: "Cum îți planifici ziua",
          paragraphs: [
            "Pentru Sinaia sau Târgoviște ajunge o jumătate de zi. Brașovul și Branul cer o zi întreagă.",
            "Programul muzeelor și prețurile biletelor se schimbă, așa că verifică-le pe site-urile oficiale înainte să pleci.",
          ],
        },
      ],
    },
    {
      key: "retreat",
      slug: "retreat-team-building-langa-bucuresti",
      image: "/images/event-room.webp",
      imageAlt: "Sala interioară pentru întâlniri și evenimente de la EdMont",
      title: "Retreat sau team building, la 2 ore și jumătate de București",
      metaTitle: "Retreat și team building în natură, aproape de București",
      description:
        "Toată pensiunea doar pentru echipa ta: 9 camere pentru până la 20 de persoane, proiector, sistem audio, bucătărie, terasă și loc de foc, în Pietroșița, la aproximativ 2 ore și jumătate de București.",
      card: "Toată pensiunea pentru echipa ta, cu proiector, terasă și loc de foc.",
      lead:
        "Pentru o echipă mică, un retreat reușit înseamnă un loc doar al vostru, liniște și spațiu în care să lucrați și să stați împreună. La EdMont închiriați toată pensiunea, cu toate spațiile comune incluse.",
      facts: [
        ["Capacitate", "9 camere, până la 20 de persoane"],
        ["De la București", "aprox. 145 km, 2 ore și jumătate"],
        ["Pentru întâlniri", "proiector și ecran, sistem audio, Wi-Fi"],
        ["Incluse", "bucătărie, sală de mese, terasă, parcare privată"],
      ],
      sections: [
        {
          heading: "Toată pensiunea, doar pentru voi",
          paragraphs: [
            "Când rezervați integral, primiți toate cele 9 camere și acces la toate spațiile și dotările, fără taxe suplimentare. Nu împărțiți terasa sau sala de mese cu alți oaspeți, așa că lucrați și petreceți serile în ritmul vostru.",
          ],
        },
        {
          heading: "Spațiu pentru lucru",
          paragraphs: [
            "Pentru sesiuni de lucru, prezentări sau traininguri aveți la dispoziție sala interioară, proiector și ecran, sistem audio și Wi-Fi.",
            "Bucătăria comună este utilată, așa că puteți găti singuri sau organiza mesele cum vă convine. Micul dejun se poate servi la cerere.",
          ],
        },
        {
          heading: "După program",
          paragraphs: [
            "Serile se petrec pe terasă și în jurul focului, cu grătarul la îndemână. Pentru o zi liberă, Sinaia, Lacul Bolboci și Târgoviște sunt la aproximativ o oră de mers cu mașina.",
          ],
        },
        {
          heading: "Cum ajungeți și cum cereți o ofertă",
          paragraphs: [
            "Din București drumul durează în jur de 2 ore și jumătate, iar pensiunea are parcare privată în curte.",
            "Completați formularul de rezervare, alegeți „Toată pensiunea” și ocazia, apoi scrieți la detalii câte persoane sunteți și ce vă trebuie. Gazdele vă răspund cu prețul și disponibilitatea.",
          ],
        },
      ],
    },
  ],
  en: [
    {
      key: "bucegi",
      slug: "bucegi-ialomita-valley",
      image: "/images/guide-bucegi.webp",
      imageAlt: "View of the mountains from a balcony at Pensiunea EdMont",
      title: "The Bucegi Mountains and the Ialomița Valley from EdMont",
      metaTitle: "Bucegi Mountains and Ialomița Valley: Bolboci Lake, Gorges and Cave",
      description:
        "What to see in the Ialomița Valley and the Bucegi Mountains from Pensiunea EdMont: Bolboci Lake, the Tătarului Gorges, Padina, Ialomița Cave, Babele and the Sphinx. Distances and practical tips.",
      card: "Bolboci Lake, the Tătarului Gorges, Ialomița Cave, Babele and the Sphinx.",
      lead:
        "From Pietroșița, the Ialomița Valley climbs into the heart of the Bucegi Mountains. In one day you can see a mountain lake, limestone gorges and a cave with a small monastery at its entrance, and still be back for a quiet evening at the guesthouse.",
      facts: [
        ["Bolboci Lake", "about 38 km, 1 hour"],
        ["Tătarului Gorges", "about 41 km, 1 h 10 min"],
        ["Ialomița Cave", "about 46 km, 1 h 15 min"],
        ["Bușteni, cable car to Babele", "about 39 km, 55 min"],
      ],
      sections: [
        {
          heading: "Bolboci Lake",
          paragraphs: [
            "The first stop on the way up is Bolboci Lake, a reservoir on the Ialomița River surrounded by forest. It is a good place for a walk along the shore and the first photos with the Bucegi behind you.",
          ],
        },
        {
          heading: "The Tătarului Gorges and Padina",
          paragraphs: [
            "Higher up the valley, the Ialomița runs between tall limestone walls: the Tătarului Gorges. The road then continues to Padina, where several marked trails into the Bucegi begin.",
            "Bring good shoes. Even a short walk here follows mountain paths.",
          ],
        },
        {
          heading: "Ialomița Cave",
          paragraphs: [
            "Ialomița Cave is one of the best-known caves in Romania. It lies above 1,500 metres, with a small monastery right at its entrance. The visitor route inside is a few hundred metres long.",
            "It stays cool inside all year, so bring an extra layer even in summer.",
          ],
        },
        {
          heading: "Babele and the Sphinx",
          paragraphs: [
            "The Babele and Sphinx rock formations stand on the Bucegi Plateau, above 2,000 metres. The easiest way up is the cable car from Bușteni, about an hour's drive from EdMont. From the top station the Sphinx is a short walk across the plateau.",
          ],
        },
        {
          heading: "When to go",
          paragraphs: [
            "Summer and early autumn are the best time for the Ialomița Valley. In winter, the road to Bolboci, Padina and the cave can be hard to drive or closed.",
            "Cable car and cave opening hours and prices change from season to season. Check them before you set off.",
          ],
        },
      ],
    },
    {
      key: "day-trips",
      slug: "day-trips-sinaia-targoviste-brasov",
      image: "/images/guide-day-trips.webp",
      imageAlt: "Pensiunea EdMont among the hills of Pietroșița",
      title: "Day trips: Sinaia, Târgoviște, Brașov and Bran",
      metaTitle: "Day trips from EdMont: Sinaia and Peleș Castle, Târgoviște, Brașov, Bran",
      description:
        "Day trip ideas from Pietroșița, Romania: Peleș Castle and Sinaia, the Princely Court in Târgoviște, Brașov's old town and Bran Castle. Approximate distances and driving times.",
      card: "Peleș Castle, the Princely Court, Brașov's old town and Bran Castle.",
      lead:
        "Pietroșița sits halfway between the hills of Dâmbovița and the Prahova Valley. In the morning you can be at a royal castle or in an old capital, and in the evening back at dinner on the guesthouse terrace.",
      facts: [
        ["Sinaia", "about 33 km, 50 min"],
        ["Târgoviște", "about 35 km, 50 min"],
        ["Brașov", "about 75 km, 1 h 40 min"],
        ["Bran Castle", "about 79 km, 1 h 45 min"],
      ],
      sections: [
        {
          heading: "Sinaia and Peleș Castle",
          paragraphs: [
            "Peleș Castle was built for King Carol I and is one of the most visited sights in Romania. In Sinaia you can also see Sinaia Monastery, which gave the town its name, and take the cable car up into the Bucegi.",
          ],
        },
        {
          heading: "Târgoviște",
          paragraphs: [
            "Târgoviște was the capital of Wallachia for almost three centuries. At the Princely Court you can walk through the palace ruins and climb Chindia Tower for a view over the whole town. It makes a good afternoon out, also with children.",
          ],
        },
        {
          heading: "Brașov",
          paragraphs: [
            "Brașov's old town, with the Council Square and the Black Church, is easy to see on foot in a few hours. If you have time, go up Tâmpa for the view over the city.",
          ],
        },
        {
          heading: "Bran Castle",
          paragraphs: [
            "Bran Castle is known around the world for the Dracula legend. You can combine it with Brașov on the same day, but leave early: in season there are queues at the entrance.",
          ],
        },
        {
          heading: "Planning your day",
          paragraphs: [
            "Sinaia or Târgoviște need half a day. Brașov and Bran take a full day.",
            "Museum hours and ticket prices change, so check the official websites before you go.",
          ],
        },
      ],
    },
    {
      key: "retreat",
      slug: "team-retreat-near-bucharest",
      image: "/images/event-room.webp",
      imageAlt: "Indoor meeting and event room at EdMont",
      title: "A team retreat 2.5 hours from Bucharest",
      metaTitle: "Team retreat and team building in nature near Bucharest",
      description:
        "The whole guesthouse just for your team: 9 rooms for up to 20 people, a projector, sound system, kitchen, terrace and fire pit in Pietroșița, about 2.5 hours from Bucharest.",
      card: "The whole guesthouse for your team, with a projector, terrace and fire pit.",
      lead:
        "For a small team, a good retreat means a place of your own, quiet, and room to work and spend time together. At EdMont you rent the whole guesthouse, with every shared space included.",
      facts: [
        ["Capacity", "9 rooms, up to 20 people"],
        ["From Bucharest", "about 145 km, 2.5 hours"],
        ["For meetings", "projector and screen, sound system, Wi-Fi"],
        ["Included", "kitchen, dining room, terrace, private parking"],
      ],
      sections: [
        {
          heading: "The whole guesthouse, just for you",
          paragraphs: [
            "When you book the whole house, you get all 9 rooms and access to every space and facility at no extra cost. You don't share the terrace or the dining room with other guests, so you can work and spend the evenings at your own pace.",
          ],
        },
        {
          heading: "Room to work",
          paragraphs: [
            "For work sessions, presentations or training you have the indoor room, a projector and screen, a sound system and Wi-Fi.",
            "The shared kitchen is fully equipped, so you can cook yourselves or organise meals the way you like. Breakfast is available on request.",
          ],
        },
        {
          heading: "After hours",
          paragraphs: [
            "Evenings happen on the terrace and around the fire, with the grill close at hand. For a free day, Sinaia, Bolboci Lake and Târgoviște are about an hour's drive away.",
          ],
        },
        {
          heading: "Getting here and asking for a quote",
          paragraphs: [
            "The drive from Bucharest takes around 2.5 hours, and there is private parking in the yard.",
            "Fill in the booking form, choose “Whole guesthouse” and the occasion, then add how many people you are and what you need. The hosts reply with the price and availability.",
          ],
        },
      ],
    },
  ],
};

export function findGuide(language: Language, slug: string) {
  return guides[language].find((guide) => guide.slug === slug);
}

export function counterpartPath(language: Language, key: GuideKey) {
  const other: Language = language === "ro" ? "en" : "ro";
  const guide = guides[other].find((item) => item.key === key);
  return guide ? guidePath(other, guide.slug) : other === "ro" ? "/" : "/en/";
}
