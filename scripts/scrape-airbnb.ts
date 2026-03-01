import { chromium } from "playwright";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { ListingData } from "../src/lib/types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");
const seedPath = path.join(ROOT, "src", "data", "listing.seed.json");
const listingPath = path.join(ROOT, "src", "data", "listing.json");

const AIRBNB_URL =
  "https://www.airbnb.com.ar/rooms/1055939742360175909?adults=1&viralityEntryPoint=1&s=76&unique_share_id=5E677DD2-7F06-46CB-AEDD-056C0A2B38C4&_branch_match_id=1269276833450168697&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXT0zKS9LLTdW3zEt0CrBw8g5xSwIAtTou%2BxsAAAA%3D&source_impression_id=p3_1703857527_g3aVqTN0NmdIp2BI";

type PartialListing = Partial<ListingData>;

function uniq(items: string[]) {
  return [...new Set(items.map((item) => item.trim()).filter(Boolean))];
}

function parseSummary(summary: string) {
  const valueOf = (pattern: RegExp) => {
    const match = summary.match(pattern);
    return match ? Number(match[1]) : 0;
  };

  return {
    guests: valueOf(/(\d+)\s*(?:hu[eé]sped|guest)/i),
    bedrooms: valueOf(/(\d+)\s*(?:dormitorio|bedroom)/i),
    beds: valueOf(/(\d+)\s*(?:cama|bed)/i),
    baths: valueOf(/(\d+)\s*(?:ba[nñ]o|bath)/i)
  };
}

async function scrape(): Promise<PartialListing> {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(AIRBNB_URL, { waitUntil: "domcontentloaded", timeout: 90000 });
    await page.waitForTimeout(3500);

    const title = (await page.locator("h1").first().textContent())?.trim();

    const rawBodyText = await page.locator("body").innerText();
    const bodyText = rawBodyText.replace(/\s+/g, " ").trim();

    const summaryMatch = bodyText.match(
      /\d+\s*(?:hu[eé]spedes?|guests?).{0,40}?\d+\s*(?:dormitorios?|bedrooms?).{0,40}?\d+\s*(?:camas?|beds?).{0,40}?\d+\s*(?:ba[nñ]os?|baths?)/i
    );
    const summary = summaryMatch?.[0];

    const ratingMatch = bodyText.match(/(\d\.\d{1,2})\s*\((\d+)\s*(?:resenas?|reviews?)\)/i);

    const descriptionBlocks = uniq(
      await page
        .locator("[data-section-id='DESCRIPTION_DEFAULT'] p, [data-section-id='DESCRIPTION_DEFAULT'] span")
        .allTextContents()
    );

    const amenities = uniq(
      await page
        .locator("[data-section-id='AMENITIES_DEFAULT'] li span, [data-section-id='AMENITIES_DEFAULT'] li")
        .allTextContents()
    );

    const houseRules = uniq(
      (
        await page
          .locator("[data-section-id='POLICIES_DEFAULT'] li, [data-section-id='HOUSE_RULES_DEFAULT'] li")
          .allTextContents()
      ).filter((x) => /no|permit|party|fiesta|smok|fumar|pet|mascota/i.test(x))
    );

    const hostName =
      (await page.locator("[data-section-id='HOST_PROFILE_DEFAULT'] h2").first().textContent())
        ?.replace(/(anfitrion|hosted by|conoce a)/gi, "")
        .trim() ?? undefined;

    const hostTags = uniq(
      (
        await page
          .locator("[data-section-id='HOST_PROFILE_DEFAULT'] span, [data-section-id='HOST_PROFILE_DEFAULT'] div")
          .allTextContents()
      ).filter((x) => /(superhost|superanfitrion|anfitrion|host)/i.test(x))
    ).slice(0, 3);

    const locationText =
      (await page.locator("[data-section-id='LOCATION_DEFAULT'] h2, [data-section-id='LOCATION_DEFAULT'] span").first().textContent())?.trim() ??
      undefined;

    const bedroomRows = uniq(
      await page
        .locator("[data-section-id='SLEEPING_ARRANGEMENT_DEFAULT'] li, [data-section-id='SLEEPING_ARRANGEMENT_DEFAULT'] div")
        .allTextContents()
    );

    const bedrooms = bedroomRows
      .map((row) => row.replace(/\s+/g, " ").trim())
      .filter((row) => /(dormitorio|bedroom)/i.test(row) && /(cama|bed)/i.test(row))
      .slice(0, 8)
      .map((row, idx) => {
        const [name, ...rest] = row.split(/\s{2,}|\s·\s|,/);
        return {
          name: name?.trim() || `Dormitorio ${idx + 1}`,
          beds: (rest.join(" ").trim() || row).trim()
        };
      });

    const photoCandidates = uniq(
      await page.evaluate(() => {
        const urls: string[] = [];
        const images = Array.from(document.querySelectorAll("img"));

        for (const image of images) {
          const src = image.getAttribute("src");
          if (src && src.includes("muscache")) {
            urls.push(src.replace(/im_w=\d+/g, "im_w=1600"));
          }
          const srcset = image.getAttribute("srcset");
          if (srcset && srcset.includes("muscache")) {
            const first = srcset.split(",").map((chunk) => chunk.trim().split(" ")[0]).pop();
            if (first) {
              urls.push(first.replace(/im_w=\d+/g, "im_w=1600"));
            }
          }
        }

        return urls;
      })
    ).slice(0, 30);

    const highlights = uniq(
      (
        await page
          .locator("[data-section-id='HIGHLIGHTS_DEFAULT'] li, [data-section-id='HIGHLIGHTS_DEFAULT'] span")
          .allTextContents()
      ).slice(0, 6)
    );

    const scraped: PartialListing = {
      sourceUrl: AIRBNB_URL,
      title,
      summary,
      stats: summary ? parseSummary(summary) : undefined,
      rating: ratingMatch
        ? {
            value: Number(ratingMatch[1]),
            reviewCount: Number(ratingMatch[2])
          }
        : undefined,
      descriptionBlocks,
      bedrooms,
      amenities,
      host: hostName
        ? {
            name: hostName,
            tags: hostTags
          }
        : undefined,
      locationText,
      photos: photoCandidates,
      highlights,
      houseRules
    };

    return scraped;
  } finally {
    await page.close();
    await browser.close();
  }
}

function mergeListing(seed: ListingData, scraped: PartialListing): ListingData {
  const summary = scraped.summary || seed.summary;
  const stats = scraped.stats && Object.values(scraped.stats).some((x) => x > 0) ? scraped.stats : seed.stats;

  return {
    ...seed,
    ...scraped,
    summary,
    stats,
    rating: scraped.rating ?? seed.rating,
    descriptionBlocks: scraped.descriptionBlocks?.length ? scraped.descriptionBlocks : seed.descriptionBlocks,
    houseRules: scraped.houseRules?.length ? scraped.houseRules : seed.houseRules,
    bedrooms: scraped.bedrooms?.length ? scraped.bedrooms : seed.bedrooms,
    sharedAreas: seed.sharedAreas,
    amenities: scraped.amenities?.length ? scraped.amenities : seed.amenities,
    host: {
      name: scraped.host?.name || seed.host.name,
      tags: scraped.host?.tags?.length ? scraped.host.tags : seed.host.tags
    },
    highlights: scraped.highlights?.length ? scraped.highlights : seed.highlights,
    photos: scraped.photos?.length ? scraped.photos : seed.photos,
    lastUpdated: new Date().toISOString()
  };
}

async function main() {
  const seed = JSON.parse(await readFile(seedPath, "utf8")) as ListingData;
  let merged: ListingData;

  try {
    const scraped = await scrape();
    merged = mergeListing(seed, scraped);
    console.log("Scrape completed.");
  } catch (error) {
    merged = { ...seed, lastUpdated: new Date().toISOString() };
    console.error("Scrape failed. Writing fallback seed data.");
    console.error(error instanceof Error ? error.message : String(error));
  }

  await writeFile(listingPath, `${JSON.stringify(merged, null, 2)}\n`, "utf8");
  console.log(`Saved ${listingPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
