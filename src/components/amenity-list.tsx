"use client";

import { useMemo, useState } from "react";

type AmenityListProps = {
  groups: [string, string[]][];
};

export function AmenityList({ groups }: AmenityListProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return groups;
    }
    return groups
      .map(([name, items]) => [name, items.filter((item) => item.toLowerCase().includes(q))] as [string, string[]])
      .filter(([, items]) => items.length > 0);
  }, [groups, query]);

  return (
    <section className="container-shell mt-8 space-y-6">
      <label className="block">
        <span className="mb-2 block text-sm font-medium">Search amenities</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="focus-ring w-full rounded-xl border border-slate-300 bg-white px-4 py-2 dark:border-slate-700 dark:bg-slate-900"
          placeholder="wifi, kitchen, workspace..."
        />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map(([name, items]) => (
          <article key={name} className="card p-5">
            <h2 className="text-lg font-semibold">{name}</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-200">
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
