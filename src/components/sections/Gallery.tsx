"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { GALLERY_CATEGORIES } from "@/lib/content";
import type { GalleryImage } from "@/lib/gallery";
import { cn } from "@/lib/utils";

export function Gallery({ images }: { images: GalleryImage[] }) {
  const [filter, setFilter] = useState<string>("alle");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const filtered =
    filter === "alle" ? images : images.filter((i) => i.category === filter);

  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(
    () =>
      setLightbox((i) =>
        i === null ? i : (i - 1 + filtered.length) % filtered.length,
      ),
    [filtered.length],
  );
  const next = useCallback(
    () => setLightbox((i) => (i === null ? i : (i + 1) % filtered.length)),
    [filtered.length],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, close, prev, next]);

  if (images.length === 0) return null;

  return (
    <Section id="galerie" className="bg-cream">
      <SectionHeading
        eyebrow="Galerie"
        title="Echte Eindrücke"
        intro="Alle Fotos zeigen das tatsächliche Fahrzeug. Tippen oder klicken Sie ein Bild an, um es in voller Größe zu betrachten."
      />

      {/* Kategorie-Filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        <FilterChip
          active={filter === "alle"}
          onClick={() => setFilter("alle")}
          label="Alle"
        />
        {GALLERY_CATEGORIES.map((c) => {
          const count = images.filter((i) => i.category === c.key).length;
          if (count === 0) return null;
          return (
            <FilterChip
              key={c.key}
              active={filter === c.key}
              onClick={() => setFilter(c.key)}
              label={c.label}
            />
          );
        })}
      </div>

      {/* Raster */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((img, idx) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setLightbox(idx)}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-beige shadow-sm ring-1 ring-beige-deep transition-transform hover:-translate-y-1"
            aria-label={`${img.categoryLabel} vergrößern`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              loading="lazy"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy/70 to-transparent px-3 py-2 text-left text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
              {img.categoryLabel}
            </span>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && filtered[lightbox] && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Bildansicht"
          onClick={close}
          onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            if (dx > 50) prev();
            else if (dx < -50) next();
            touchStartX.current = null;
          }}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
            onClick={close}
            aria-label="Schließen"
          >
            <X size={26} />
          </button>

          {filtered.length > 1 && (
            <>
              <button
                type="button"
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 sm:left-6"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Vorheriges Bild"
              >
                <ChevronLeft size={30} />
              </button>
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20 sm:right-6"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Nächstes Bild"
              >
                <ChevronRight size={30} />
              </button>
            </>
          )}

          <figure
            className="relative flex max-h-[85vh] w-full max-w-4xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[70vh] w-full">
              <Image
                src={filtered[lightbox].src}
                alt={filtered[lightbox].alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <figcaption className="mt-4 text-center text-sm text-beige">
              {filtered[lightbox].categoryLabel} · {lightbox + 1} / {filtered.length}
            </figcaption>
          </figure>
        </div>
      )}
    </Section>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-4 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-navy text-white"
          : "bg-beige text-ink hover:bg-beige-deep",
      )}
    >
      {label}
    </button>
  );
}
