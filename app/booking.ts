import { contact, type Copy, type Occasion, type Pet, type Stay } from "./content";

export type BookingDraft = {
  arrival: string;
  departure: string;
  adults: number;
  children: number;
  stay: Stay;
  occasion: Occasion;
  name: string;
  prefix: string;
  phone: string;
  email: string;
  pet: Pet;
  details: string;
};

export const emptyDraft: BookingDraft = {
  arrival: "",
  departure: "",
  adults: 2,
  children: 0,
  stay: "double",
  occasion: "stay",
  name: "",
  prefix: "+40",
  phone: "",
  email: "",
  pet: "no",
  details: "",
};

export const countryPrefixes: [string, string][] = [
  ["RO", "+40"],
  ["MD", "+373"],
  ["DE", "+49"],
  ["AT", "+43"],
  ["IT", "+39"],
  ["ES", "+34"],
  ["FR", "+33"],
  ["GB", "+44"],
  ["IE", "+353"],
  ["BE", "+32"],
  ["NL", "+31"],
  ["CH", "+41"],
  ["HU", "+36"],
  ["BG", "+359"],
  ["UA", "+380"],
  ["PL", "+48"],
  ["CZ", "+420"],
  ["GR", "+30"],
  ["PT", "+351"],
  ["DK", "+45"],
  ["SE", "+46"],
  ["NO", "+47"],
  ["IL", "+972"],
  ["US/CA", "+1"],
];

export function isoDate(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export function addDays(iso: string, days: number) {
  const [year, month, day] = iso.split("-").map(Number);
  return isoDate(new Date(year, month - 1, day + days));
}

export function nightsBetween(arrival: string, departure: string) {
  if (!arrival || !departure) return 0;
  const diff = (Date.parse(departure) - Date.parse(arrival)) / 86_400_000;
  return Number.isFinite(diff) ? Math.round(diff) : 0;
}

export function formatDate(iso: string) {
  const [year, month, day] = iso.split("-");
  return `${day}.${month}.${year}`;
}

// Returns the number in E.164 form (+40722123456) or null when it can't be valid.
export function normalizePhone(prefix: string, raw: string) {
  let value = raw.trim().replace(/[\s().\-/]/g, "");
  if (value.startsWith("00")) value = `+${value.slice(2)}`;

  if (!value.startsWith("+")) {
    const code = prefix.replace("+", "");
    if (!code || (value.startsWith(code) && value.length - code.length >= 8)) {
      value = `+${value}`;
    } else {
      value = `${prefix}${value.replace(/^0+/, "")}`;
    }
  }

  return /^\+[1-9]\d{7,14}$/.test(value) ? value : null;
}

// For a number typed with + (or 00): the matching code from the list, "" for a country
// that is not in the list, null when the number has no country code yet.
export function detectPrefix(raw: string) {
  let value = raw.trim().replace(/[\s().\-/]/g, "");
  if (value.startsWith("00")) value = `+${value.slice(2)}`;
  if (!value.startsWith("+")) return null;
  const digits = value.slice(1);
  const matches = countryPrefixes
    .map(([, code]) => code)
    .filter((code) => digits.startsWith(code.slice(1)))
    .sort((a, b) => b.length - a.length);
  return matches[0] ?? "";
}

export type BookingErrors = Partial<Record<"arrival" | "departure" | "name" | "phone" | "email", string>>;

export function validate(draft: BookingDraft, today: string, t: Copy["booking"]) {
  const errors: BookingErrors = {};
  const nights = nightsBetween(draft.arrival, draft.departure);

  if (!draft.arrival) errors.arrival = t.errors.arrival;
  else if (today && draft.arrival < today) errors.arrival = t.errors.arrivalPast;

  if (!draft.departure || nights < 1) errors.departure = t.errors.departure;
  else if (nights > 60) errors.departure = t.errors.tooLong;

  if (draft.name.trim().length < 3) errors.name = t.errors.name;
  if (!normalizePhone(draft.prefix, draft.phone)) errors.phone = t.errors.phone;
  if (draft.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(draft.email.trim())) {
    errors.email = t.errors.email;
  }

  return errors;
}

export function buildMessage(draft: BookingDraft, t: Copy["booking"]) {
  const m = t.message;
  const nights = nightsBetween(draft.arrival, draft.departure);
  const guests = [m.adults(draft.adults)];
  if (draft.children > 0) guests.push(m.children(draft.children));
  const phone = normalizePhone(draft.prefix, draft.phone) ?? `${draft.prefix} ${draft.phone}`;

  const lines = [
    m.heading,
    "",
    `${m.period}: ${formatDate(draft.arrival)} - ${formatDate(draft.departure)} (${t.nights(nights)})`,
    `${m.guests}: ${guests.join(", ")}`,
    `${m.stay}: ${t.stayOptions[draft.stay]}`,
    `${m.occasion}: ${t.occasionOptions[draft.occasion]}`,
    `${m.pet}: ${t.petOptions[draft.pet]}`,
    `${m.name}: ${draft.name.trim()}`,
    `${m.phone}: ${phone}`,
  ];
  if (draft.email.trim()) lines.push(`${m.email}: ${draft.email.trim()}`);
  if (draft.details.trim()) lines.push(`${m.details}: ${draft.details.trim()}`);
  return lines.join("\n");
}

export function whatsappLink(text?: string) {
  const base = `https://wa.me/${contact.whatsappNumber}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function emailLink(subject: string, body: string) {
  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
