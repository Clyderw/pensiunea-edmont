// Anti-spam for the booking form.
// 1. Proof of work: find the number whose SHA-256(salt + number) equals the server's
//    challenge. It starts when the guest begins filling in the form and runs in a
//    Web Worker, so page loading and scrolling are not slowed down.
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

type Task = { salt: string; challenge: string; maxnumber: number };

// The same search runs in a Web Worker (off the main thread) or, as a fallback,
// on the page itself with a pause between batches so scrolling stays smooth.
async function search({ salt, challenge, maxnumber }: Task, pause?: () => Promise<void>) {
  const target = new Uint8Array((challenge.match(/../g) ?? []).map((hex) => parseInt(hex, 16)));
  const matches = (buffer: ArrayBuffer) => {
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < target.length; i += 1) if (bytes[i] !== target[i]) return false;
    return true;
  };
  const encoder = new TextEncoder();
  for (let start = 0; start <= maxnumber; start += 1000) {
    const end = Math.min(start + 1000, maxnumber + 1);
    const work: Promise<ArrayBuffer>[] = [];
    for (let number = start; number < end; number += 1) {
      work.push(crypto.subtle.digest("SHA-256", encoder.encode(`${salt}${number}`)));
    }
    const found = (await Promise.all(work)).findIndex(matches);
    if (found >= 0) return start + found;
    if (pause) await pause();
  }
  return -1;
}

// Plain string on purpose: the bundler must not rewrite the code that runs inside the worker.
const workerSource = `
self.onmessage = async (event) => {
  const { salt, challenge, maxnumber } = event.data;
  const target = new Uint8Array((challenge.match(/../g) || []).map((hex) => parseInt(hex, 16)));
  const matches = (buffer) => {
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < target.length; i += 1) if (bytes[i] !== target[i]) return false;
    return true;
  };
  const encoder = new TextEncoder();
  for (let start = 0; start <= maxnumber; start += 1000) {
    const end = Math.min(start + 1000, maxnumber + 1);
    const work = [];
    for (let number = start; number < end; number += 1) {
      work.push(crypto.subtle.digest("SHA-256", encoder.encode(salt + number)));
    }
    const found = (await Promise.all(work)).findIndex(matches);
    if (found >= 0) { self.postMessage(start + found); return; }
  }
  self.postMessage(-1);
};`;

function searchInWorker(task: Task) {
  return new Promise<number>((resolve, reject) => {
    const url = URL.createObjectURL(new Blob([workerSource], { type: "text/javascript" }));
    const worker = new Worker(url);
    const finish = () => {
      worker.terminate();
      URL.revokeObjectURL(url);
    };
    worker.onmessage = (event) => {
      finish();
      resolve(Number(event.data));
    };
    worker.onerror = () => {
      finish();
      reject(new Error("worker failed"));
    };
    worker.postMessage(task);
  });
}

async function solve(challenge: Omit<PowSolution, "number">): Promise<PowSolution | null> {
  if (!challenge?.salt || !challenge?.challenge || !window.crypto?.subtle) return null;
  const task = { salt: challenge.salt, challenge: challenge.challenge, maxnumber: challenge.maxnumber };
  let number: number;
  try {
    number = await searchInWorker(task);
  } catch {
    number = await search(task, () => new Promise((resolve) => setTimeout(resolve, 0)));
  }
  return number >= 0 ? { ...challenge, number } : null;
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
