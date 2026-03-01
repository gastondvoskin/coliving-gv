import { AmenityList } from "@/components/amenity-list";
import { getAmenityGroups, listing } from "@/lib/listing";

export default function AmenitiesPage() {
  const groups = getAmenityGroups(listing.amenities);

  return (
    <div className="pb-10">
      <section className="container-shell mt-10">
        <h1 className="text-3xl font-semibold">Amenities</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">Find what matters for your day-to-day coliving routine.</p>
      </section>
      <AmenityList groups={groups} />
    </div>
  );
}
