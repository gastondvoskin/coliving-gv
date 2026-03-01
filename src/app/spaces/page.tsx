import { BedroomCards } from "@/components/bedroom-cards";
import { listing } from "@/lib/listing";

export default function SpacesPage() {
  return (
    <div className="pb-10">
      <section className="container-shell mt-10">
        <h1 className="text-3xl font-semibold">Spaces</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">Bedrooms and shared areas designed for comfortable coliving.</p>
      </section>
      <BedroomCards bedrooms={listing.bedrooms} fallbackPhoto={listing.photos[1] ?? listing.photos[0]} />
      <section className="container-shell mt-10">
        <h2 className="text-2xl font-semibold">Shared areas</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {listing.sharedAreas.map((area) => (
            <li key={area} className="card p-4">
              {area}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
