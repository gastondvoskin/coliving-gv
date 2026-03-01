import Image from "next/image";
import type { Bedroom } from "@/lib/types";

export function BedroomCards({ bedrooms, fallbackPhoto }: { bedrooms: Bedroom[]; fallbackPhoto?: string }) {
  return (
    <section className="container-shell mt-8 grid gap-4 md:grid-cols-2">
      {bedrooms.map((room, index) => (
        <article key={room.name} className="card overflow-hidden">
          {room.photo || fallbackPhoto ? (
            <div className="relative h-48">
              <Image
                src={room.photo ?? fallbackPhoto!}
                alt={room.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ) : null}
          <div className="p-5">
            <h2 className="text-xl font-semibold">{room.name}</h2>
            <p className="mt-1 text-slate-600 dark:text-slate-300">{room.beds}</p>
            <p className="mt-3 text-xs uppercase tracking-wide text-slate-500">Space {index + 1}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
