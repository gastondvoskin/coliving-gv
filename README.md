# Coliving Frontend (Next.js)

Front-end-only coliving marketing + availability inquiry app powered by local JSON data.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Playwright scraper (build-time script)
- No backend, no database, no booking logic

## Install

```bash
npm install
```

## Run dev server

```bash
npm run dev
```

Open `http://localhost:3000`.

## Run scraper

```bash
npm run scrape
```

The scraper attempts to load the Airbnb listing and extract listing details, then writes:

- `src/data/listing.json`

## Fallback behavior

If scraping fails or fields are missing, data is merged over:

- `src/data/listing.seed.json`

This guarantees `src/data/listing.json` remains valid and the app always renders.

## Pages

- `/` landing
- `/spaces`
- `/amenities`
- `/community`
- `/apply` (mock inquiry form with validation + success state)
- `/faq`

## Notes

- Runtime UI reads from `src/data/listing.json` only.
- No reservation, calendar, payment, account, or pricing engine logic is implemented.
- Footer shows `lastUpdated` from listing JSON.
