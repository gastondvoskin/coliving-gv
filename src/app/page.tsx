import Link from "next/link";
import { CTASection } from "@/components/cta-section";
import { Gallery } from "@/components/gallery";
import { Hero } from "@/components/hero";
import { StatsRow } from "@/components/stats-row";
import { listing } from "@/lib/listing";

export default function HomePage() {
  return (
    <>
      <Hero listing={listing} />
      <StatsRow listing={listing} />

      <section className="container-shell mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {listing.highlights.map((fact) => (
          <article key={fact} className="card p-4">
            <p className="text-sm text-slate-700 dark:text-slate-200">{fact}</p>
          </article>
        ))}
        <article className="card p-4">
          <p className="text-sm text-slate-700 dark:text-slate-200">{listing.summary}</p>
        </article>
      </section>

      <section>
        <h2 className="container-shell mt-12 text-2xl font-semibold">Photo gallery</h2>
        <Gallery photos={listing.photos} title={listing.title} previewCount={6} />
      </section>

      <section className="container-shell mt-12">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Spaces preview</h2>
          <Link href="/spaces" className="focus-ring rounded-md text-sm text-accent">
            View all spaces
          </Link>
        </div>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {listing.bedrooms.slice(0, 4).map((room) => (
            <li key={room.name} className="card p-4">
              <p className="font-medium">{room.name}</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">{room.beds}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-shell mt-12">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Amenities preview</h2>
          <Link href="/amenities" className="focus-ring rounded-md text-sm text-accent">
            Explore amenities
          </Link>
        </div>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {listing.amenities.slice(0, 6).map((amenity) => (
            <li key={amenity} className="card p-4 text-sm">
              {amenity}
            </li>
          ))}
        </ul>
      </section>

      <section className="container-shell mt-12">
        <article className="card p-6">
          <h2 className="text-2xl font-semibold">Neighborhood</h2>
          <p className="mt-3 text-slate-700 dark:text-slate-200">{listing.locationText}</p>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            {listing.descriptionBlocks[1] ?? listing.descriptionBlocks[0]}
          </p>
        </article>
      </section>

      <section className="container-shell mt-12 grid gap-4 md:grid-cols-2">
        <CTASection
          title="Apply to live here"
          description="Share your profile and preferred dates. We review applications manually."
          href="/apply"
          actionLabel="Start application"
        />
        <CTASection
          title="Request a tour"
          description="Send your availability and we will coordinate a visit."
          href="/apply"
          actionLabel="Request tour"
        />
      </section>
    </>
  );
}
