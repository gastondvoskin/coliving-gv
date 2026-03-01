import { listing } from "@/lib/listing";

export function Footer() {
  const updated = new Date(listing.lastUpdated).toLocaleString();

  return (
    <footer className="mt-16 border-t border-slate-200 py-8 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">
      <div className="container-shell space-y-3">
        <p>{listing.title}</p>
        <p>{listing.locationText}</p>
        <p className="text-xs">Last updated: {updated}</p>
      </div>
    </footer>
  );
}
