import Image from "next/image";
import type { ListingData } from "@/lib/types";

export function Hero({ listing }: { listing: ListingData }) {
  const heroImage = listing.photos[0];

  return (
    <section className="container-shell mt-8 grid gap-6 lg:grid-cols-2 lg:items-center">
      <div className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Urban coliving</p>
        <h1 className="text-3xl font-semibold leading-tight sm:text-5xl">{listing.title}</h1>
        <p className="text-slate-600 dark:text-slate-300">{listing.locationText}</p>
        <p className="max-w-prose text-slate-700 dark:text-slate-200">{listing.descriptionBlocks[0]}</p>
        <div className="flex flex-wrap gap-2">
          {listing.highlights.map((highlight) => (
            <span key={highlight} className="rounded-full border border-slate-300 px-3 py-1 text-sm dark:border-slate-700">
              {highlight}
            </span>
          ))}
        </div>
      </div>
      <div className="relative h-80 overflow-hidden rounded-3xl sm:h-[28rem]">
        <Image src={heroImage} alt={listing.title} fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 50vw" />
      </div>
    </section>
  );
}
