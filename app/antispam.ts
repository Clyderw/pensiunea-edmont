// Anti-spam for the booking form.
// 1. Proof of work: find the number whose SHA-256(salt + number) equals the server's
//    challenge. About a second in a browser, so it runs while the guest types.
// 2. Optional Google reCAPTCHA v3, used only when the server config has keys.

export type PowSolution = {
  algorithm: string;
  salt: string;
  challenge: string;
  maxnumber: number;
  signature: string;
  number: number;
};

export type Guard = {
  pow: PowSolution | null;
  recaptchaKey: string;
};

type Grecaptcha = {
  ready(callback: () => void): void;
  execute(key: string, options: { action: string }): Promise<string>;
};

const toHex = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer), (byte) => byte.toString(16).padStart(2, "0")).join("");

async function solve(challenge: Omit<PowSolution, "number">): Promise<PowSolution | null> {
  if (!challenge?.salt || !challenge?.challenge || !window.crypto?.subtle) return null;
  const encoder = new TextEncoder();
  const batch = 1000;
  for (let start = 0; start <= challenge.maxnumber; start += batch) {
    const end = Math.min(start + batch, challenge.maxnumber + 1);
    const work: Promise<ArrayBuffer>[] = [];
    for (let number = start; number < end; number += 1) {
      work.push(crypto.subtle.digest("SHA-256", encoder.encode(`${challenge.salt}${number}`)));
    }
    const hashes = await Promise.all(work);
    const found = hashes.findIndex((hash) => toHex(hash) === challenge.challenge);
    if (found >= 0) return { ...challenge, number: start + found };
  }
  return null;
}

export async function prepareGuard(endpoint: string): Promise<Guard> {
  try {
    const response = await fetch(`${endpoint}?challenge=1`, { cache: "no-store" });
    if (!response.ok) return { pow: null, recaptchaKey: "" };
    const challenge = await response.json();
    const recaptchaKey = typeof challenge?.recaptcha === "string" ? challenge.recaptcha : "";
    return { pow: await solve(challenge), recaptchaKey };
  } catch {
    return { pow: null, recaptchaKey: "" };
  }
}

let recaptchaScript: Promise<void> | null = null;

// Google's script is loaded only once the guest starts filling in the form.
export function loadRecaptcha(key: string) {
  if (!key) return Promise.resolve();
  if (!recaptchaScript) {
    recaptchaScript = new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(key)}`;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => {
        recaptchaScript = null;
        reject(new Error("reCAPTCHA failed to load"));
      };
      document.head.appendChild(script);
    });
  }
  return recaptchaScript;
}

export async function recaptchaToken(key: string): Promise<string | null> {
  if (!key) return null;
  try {
    await loadRecaptcha(key);
    const grecaptcha = (window as unknown as { grecaptcha?: Grecaptcha }).grecaptcha;
    if (!grecaptcha) return null;
    return await new Promise<string | null>((resolve) => {
      grecaptcha.ready(() => {
        grecaptcha.execute(key, { action: "booking" }).then(resolve, () => resolve(null));
      });
    });
  } catch {
    return null;
  }
}
