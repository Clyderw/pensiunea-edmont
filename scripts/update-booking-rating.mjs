import { readFile, writeFile } from "node:fs/promises";

const outputUrl = new URL("../public/booking-rating.json", import.meta.url);
const bookingPages = [
  "https://www.booking.com/hotel/ro/pensiunea-edmont-pietrosita.ro.html",
  "https://www.booking.com/reviews/ro/hotel/pensiunea-edmont-pietrosita.ro.html",
];

const scorePatterns = [
  /"review_score"\s*:\s*"?(\d{1,2}[.,]\d)"?/i,
  /Scor(?:ul comentariilor|:)?[\s\S]{0,500}?(\d{1,2}[.,]\d)/i,
  /(?:review score|guest rating|scored)\D{0,80}(\d{1,2}[.,]\d)/i,
  /data-testid="review-score[^"]*"[^>]*>[\s\S]{0,200}?(\d{1,2}[.,]\d)/i,
];

function validScore(value) {
  const score = Number(String(value).replace(",", "."));
  return Number.isFinite(score) && score >= 1 && score <= 10
    ? Math.round(score * 10) / 10
    : null;
}

function findScore(text) {
  for (const pattern of scorePatterns) {
    const match = text.match(pattern);
    const score = match ? validScore(match[1]) : null;
    if (score !== null) return score;
  }
  return null;
}

async function fetchFromDemandApi() {
  const token = process.env.BOOKING_API_TOKEN;
  const affiliateId = process.env.BOOKING_AFFILIATE_ID;
  const accommodationId = process.env.BOOKING_ACCOMMODATION_ID;
  if (!token || !affiliateId || !accommodationId) return null;

  const response = await fetch(
    "https://demandapi.booking.com/3.2/accommodations/reviews/scores",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "X-Affiliate-Id": affiliateId,
      },
      body: JSON.stringify({
        accommodations: [Number(accommodationId)],
      }),
      signal: AbortSignal.timeout(20_000),
    },
  );

  if (!response.ok) {
    throw new Error(`Booking Demand API returned ${response.status}`);
  }

  const payload = await response.json();
  const candidate = payload?.data?.[0]?.score
    ?? payload?.data?.[0]?.review_score
    ?? payload?.data?.[0]?.scores?.review_score?.score;
  return validScore(candidate);
}

async function fetchFromPublicPages() {
  for (const url of bookingPages) {
    try {
      const response = await fetch(url, {
        headers: {
          "Accept-Language": "ro-RO,ro;q=0.9,en;q=0.8",
          "User-Agent":
            "Mozilla/5.0 (compatible; EdMontRatingUpdater/1.0; +https://clyderw.github.io/pensiunea-edmont/)",
        },
        redirect: "follow",
        signal: AbortSignal.timeout(20_000),
      });
      if (!response.ok) continue;
      const score = findScore(await response.text());
      if (score !== null) return score;
    } catch {
      // Try the next official Booking page.
    }
  }
  return null;
}

async function main() {
  const previous = JSON.parse(await readFile(outputUrl, "utf8"));
  let score = null;

  try {
    score = await fetchFromDemandApi();
  } catch (error) {
    console.warn(error instanceof Error ? error.message : String(error));
  }

  if (score === null) {
    score = await fetchFromPublicPages();
  }

  if (score === null) {
    console.log(`Booking did not return a score; keeping ${previous.score}.`);
    return;
  }

  const next = {
    score,
    source: "Booking.com",
    updatedAt: new Date().toISOString().slice(0, 10),
  };

  if (previous.score === next.score && previous.updatedAt === next.updatedAt) {
    console.log(`Booking score is unchanged at ${score}.`);
    return;
  }

  await writeFile(outputUrl, `${JSON.stringify(next, null, 2)}\n`);
  console.log(`Updated Booking score to ${score}.`);
}

await main();
