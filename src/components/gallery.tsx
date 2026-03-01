"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type GalleryProps = {
  photos: string[];
  title: string;
  previewCount?: number;
};

export function Gallery({ photos, title, previewCount }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const list = previewCount ? photos.slice(0, previewCount) : photos;

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (activeIndex === null) {
        return;
      }
      if (event.key === "Escape") {
        setActiveIndex(null);
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((prev) => (prev === null ? 0 : (prev + 1) % photos.length));
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev === null ? 0 : (prev - 1 + photos.length) % photos.length));
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, photos.length]);

  return (
    <section className="container-shell mt-10">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {list.map((photo, index) => (
          <button
            key={`${photo}-${index}`}
            type="button"
            className="focus-ring relative h-36 overflow-hidden rounded-xl sm:h-52"
            onClick={() => setActiveIndex(index)}
            aria-label={`Open image ${index + 1}`}
          >
            <Image src={photo} alt={`${title} photo ${index + 1}`} fill className="object-cover" sizes="(max-width: 768px) 50vw, 33vw" />
          </button>
        ))}
      </div>
      {activeIndex !== null ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4" role="dialog" aria-modal="true">
          <button className="focus-ring absolute right-4 top-4 rounded-full bg-white px-3 py-1 text-black" onClick={() => setActiveIndex(null)}>
            Close
          </button>
          <div className="relative h-[80vh] w-full max-w-5xl">
            <Image
              src={photos[activeIndex]}
              alt={`${title} expanded ${activeIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
