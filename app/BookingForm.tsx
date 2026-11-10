"use client";

import { useEffect, useRef, useState, type Dispatch, type FormEvent, type SetStateAction } from "react";
import {
  addDays,
  buildMessage,
  countryPrefixes,
  emailLink,
  emptyDraft,
  formatDate,
  nightsBetween,
  normalizePhone,
  validate,
  whatsappLink,
  type BookingDraft,
  type BookingErrors,
} from "./booking";
import { occasionOptions, petOptions, stayOptions, type Copy, type Language } from "./content";
import { ChatIcon, CheckIcon, MailIcon } from "./icons";
import { loadRecaptcha, prepareGuard, recaptchaToken, type Guard } from "./antispam";

type Status = "idle" | "sending" | "sent" | "failed";

type Props = {
  t: Copy["booking"];
  language: Language;
  draft: BookingDraft;
  setDraft: Dispatch<SetStateAction<BookingDraft>>;
  today: string;
  endpoint: string;
};

const fieldOrder: (keyof BookingErrors)[] = ["arrival", "departure", "name", "phone", "email"];

export default function BookingForm({ t, language, draft, setDraft, today, endpoint }: Props) {
  const [errors, setErrors] = useState<BookingErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [honeypot, setHoneypot] = useState("");
  const openedAt = useRef(0);
  const resultRef = useRef<HTMLDivElement>(null);
  const guardRef = useRef<Promise<Guard> | null>(null);
  const [recaptchaKey, setRecaptchaKey] = useState("");

  useEffect(() => {
    openedAt.current = Date.now();
  }, []);

  // Anti-spam work starts only when the guest begins filling in the form,
  // so it never slows down the first load of the page.
  function startGuard() {
    if (guardRef.current) return;
    const guard = prepareGuard(endpoint);
    guardRef.current = guard;
    guard.then((result) => {
      setRecaptchaKey(result.recaptchaKey);
      if (result.recaptchaKey) loadRecaptcha(result.recaptchaKey).catch(() => undefined);
    });
  }

  useEffect(() => {
    if (status === "sent" || status === "failed") resultRef.current?.focus();
  }, [status]);

  const nights = nightsBetween(draft.arrival, draft.departure);
  const message = draft.arrival && draft.departure ? buildMessage(draft, t) : "";

  function update<K extends keyof BookingDraft>(key: K, value: BookingDraft[K]) {
    setDraft((current) => {
      const next = { ...current, [key]: value };
      if (key === "arrival" && typeof value === "string" && value && (!next.departure || next.departure <= value)) {
        next.departure = addDays(value, 1);
      }
      return next;
    });
    if (errors[key as keyof BookingErrors]) {
      setErrors((current) => ({ ...current, [key]: undefined }));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(draft, today, t);
    setErrors(found);
    const firstInvalid = fieldOrder.find((key) => found[key]);
    if (firstInvalid) {
      document.getElementById(`booking-${firstInvalid}`)?.focus();
      return;
    }

    setStatus("sending");
    const guard = await (guardRef.current ?? prepareGuard(endpoint));
    guardRef.current = null;
    const recaptcha = await recaptchaToken(guard.recaptchaKey);
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          arrival: draft.arrival,
          departure: draft.departure,
          adults: draft.adults,
          children: draft.children,
          stay: draft.stay,
          occasion: draft.occasion,
          pet: draft.pet,
          name: draft.name.trim(),
          phone: normalizePhone(draft.prefix, draft.phone),
          email: draft.email.trim(),
          details: draft.details.trim(),
          lang: language,
          elapsed: Date.now() - openedAt.current,
          website: honeypot,
          pow: guard.pow,
          recaptcha,
        }),
      });
      const result = await response.json().catch(() => null);
      setStatus(response.ok && result?.ok ? "sent" : "failed");
    } catch {
      setStatus("failed");
    } finally {
      window.clearTimeout(timer);
    }
  }

  function reset() {
    setDraft(emptyDraft);
    setErrors({});
    setStatus("idle");
    openedAt.current = Date.now();
    guardRef.current = null;
    startGuard();
  }

  if (status === "sent") {
    const phone = normalizePhone(draft.prefix, draft.phone) ?? draft.phone;
    return (
      <div className="booking-result is-success" ref={resultRef} tabIndex={-1} role="status">
        <span className="result-mark" aria-hidden="true"><CheckIcon /></span>
        <h3>{t.success.title}</h3>
        <p>{t.success.text(phone)}</p>
        <p className="result-summary">
          {formatDate(draft.arrival)} - {formatDate(draft.departure)}, {t.nights(nights)}, {t.stayOptions[draft.stay]}
        </p>
        <div className="result-actions">
          <a className="btn btn-secondary" href={whatsappLink()} target="_blank" rel="noreferrer">
            <ChatIcon /> {t.success.whatsapp}
          </a>
          <button className="btn btn-quiet" type="button" onClick={reset}>{t.success.again}</button>
        </div>
      </div>
    );
  }

  return (
    <form className="booking-form" aria-label={t.formLabel} noValidate onSubmit={handleSubmit} onFocus={startGuard} onPointerDown={startGuard}>
      {status === "failed" && (
        <div className="booking-result is-failure" ref={resultRef} tabIndex={-1} role="alert">
          <h3>{t.failure.title}</h3>
          <p>{t.failure.text}</p>
          <div className="result-actions">
            <a className="btn btn-primary" href={whatsappLink(message)} target="_blank" rel="noreferrer">
              <ChatIcon /> {t.failure.whatsapp}
            </a>
            <a className="btn btn-secondary" href={emailLink(t.formLabel, message)}>
              <MailIcon /> {t.failure.email}
            </a>
          </div>
        </div>
      )}

      <div className="form-grid">
        <div className={errors.arrival ? "field has-error" : "field"}>
          <label htmlFor="booking-arrival">{t.arrival}</label>
          <input
            id="booking-arrival"
            type="date"
            min={today || undefined}
            value={draft.arrival}
            onChange={(event) => update("arrival", event.target.value)}
            aria-invalid={Boolean(errors.arrival)}
            aria-describedby={errors.arrival ? "booking-arrival-error" : undefined}
            required
          />
          {errors.arrival && <p className="field-error" id="booking-arrival-error">{errors.arrival}</p>}
        </div>

        <div className={errors.departure ? "field has-error" : "field"}>
          <label htmlFor="booking-departure">
            {t.departure}
            {nights > 0 && <span className="nights">{t.nights(nights)}</span>}
          </label>
          <input
            id="booking-departure"
            type="date"
            min={draft.arrival ? addDays(draft.arrival, 1) : today || undefined}
            value={draft.departure}
            onChange={(event) => update("departure", event.target.value)}
            aria-invalid={Boolean(errors.departure)}
            aria-describedby={errors.departure ? "booking-departure-error" : undefined}
            required
          />
          {errors.departure && <p className="field-error" id="booking-departure-error">{errors.departure}</p>}
        </div>

        <div className="field field-third">
          <label htmlFor="booking-adults">{t.adults}</label>
          <select
            id="booking-adults"
            value={draft.adults}
            onChange={(event) => update("adults", Number(event.target.value))}
          >
            {Array.from({ length: 20 }, (_, index) => index + 1).map((count) => (
              <option key={count} value={count}>{count}</option>
            ))}
          </select>
        </div>

        <div className="field field-third">
          <label htmlFor="booking-children">{t.children}</label>
          <select
            id="booking-children"
            value={draft.children}
            onChange={(event) => update("children", Number(event.target.value))}
          >
            {Array.from({ length: 11 }, (_, index) => index).map((count) => (
              <option key={count} value={count}>{count}</option>
            ))}
          </select>
        </div>

        <div className="field field-third">
          <label htmlFor="booking-stay">{t.stay}</label>
          <select
            id="booking-stay"
            value={draft.stay}
            onChange={(event) => update("stay", event.target.value as BookingDraft["stay"])}
          >
            {stayOptions.map((option) => (
              <option key={option} value={option}>{t.stayOptions[option]}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="booking-occasion">{t.occasion}</label>
          <select
            id="booking-occasion"
            value={draft.occasion}
            onChange={(event) => update("occasion", event.target.value as BookingDraft["occasion"])}
          >
            {occasionOptions.map((option) => (
              <option key={option} value={option}>{t.occasionOptions[option]}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="booking-pet">{t.pet}</label>
          <select
            id="booking-pet"
            value={draft.pet}
            onChange={(event) => update("pet", event.target.value as BookingDraft["pet"])}
          >
            {petOptions.map((option) => (
              <option key={option} value={option}>{t.petOptions[option]}</option>
            ))}
          </select>
        </div>

        <div className={errors.name ? "field field-full has-error" : "field field-full"}>
          <label htmlFor="booking-name">{t.name}</label>
          <input
            id="booking-name"
            type="text"
            autoComplete="name"
            maxLength={80}
            value={draft.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "booking-name-error" : undefined}
            required
          />
          {errors.name && <p className="field-error" id="booking-name-error">{errors.name}</p>}
        </div>

        <div className={errors.phone ? "field has-error" : "field"}>
          <label htmlFor="booking-phone">{t.phone}</label>
          <div className="phone-row">
            <select
              aria-label={t.prefix}
              value={draft.prefix}
              onChange={(event) => update("prefix", event.target.value)}
            >
              {countryPrefixes.map(([country, code]) => (
                <option key={country} value={code}>{country} {code}</option>
              ))}
            </select>
            <input
              id="booking-phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel-national"
              placeholder={t.phonePlaceholder}
              maxLength={24}
              value={draft.phone}
              onChange={(event) => update("phone", event.target.value)}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "booking-phone-error booking-phone-hint" : "booking-phone-hint"}
              required
            />
          </div>
          <p className="field-hint" id="booking-phone-hint">{t.phoneHint}</p>
          {errors.phone && <p className="field-error" id="booking-phone-error">{errors.phone}</p>}
        </div>

        <div className={errors.email ? "field has-error" : "field"}>
          <label htmlFor="booking-email">{t.email}</label>
          <input
            id="booking-email"
            type="email"
            autoComplete="email"
            maxLength={120}
            value={draft.email}
            onChange={(event) => update("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "booking-email-error" : undefined}
          />
          {errors.email && <p className="field-error" id="booking-email-error">{errors.email}</p>}
        </div>

        <div className="field field-full">
          <label htmlFor="booking-details">{t.details}</label>
          <textarea
            id="booking-details"
            rows={4}
            maxLength={1000}
            placeholder={t.detailsPlaceholder}
            value={draft.details}
            onChange={(event) => update("details", event.target.value)}
          />
        </div>

        <div className="trap" aria-hidden="true">
          <label htmlFor="booking-website">Website</label>
          <input
            id="booking-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />
        </div>
      </div>

      <div className="form-footer">
        <button className="btn btn-primary btn-large" type="submit" disabled={status === "sending"}>
          {status === "sending" ? t.sending : t.submit}
        </button>
        <p className="privacy-note">
          {t.privacy}
          {recaptchaKey && (
            <>
              {" "}{t.recaptcha.text}{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">{t.recaptcha.privacy}</a>,{" "}
              <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">{t.recaptcha.terms}</a>.
            </>
          )}
        </p>
      </div>
    </form>
  );
}
