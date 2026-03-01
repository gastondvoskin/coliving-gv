import type { ListingData } from "@/lib/types";

const labels = [
  { key: "guests", label: "Guests" },
  { key: "bedrooms", label: "Bedrooms" },
  { key: "beds", label: "Beds" },
  { key: "baths", label: "Baths" }
] as const;

export function StatsRow({ listing }: { listing: ListingData }) {
  return (
    <section className="container-shell mt-8">
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {labels.map((item) => (
          <li key={item.key} className="card p-4">
            <p className="text-2xl font-semibold">{listing.stats[item.key]}</p>
            <p className="text-sm text-slate-600 dark:text-slate-300">{item.label}</p>
          </li>
        ))}
      </ul>
      {listing.rating ? (
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
          Rating {listing.rating.value} ({listing.rating.reviewCount} reviews)
        </p>
      ) : null}
    </section>
  );
}
