import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { SITE } from "@/lib/content";
import { getFeatureImage } from "@/lib/gallery";

export function Hero() {
  const heroImage = getFeatureImage("hero", "/images/hero/hymer-front.jpg");
  return (
    <section
      id="start"
      className="relative overflow-hidden bg-beige pt-28 pb-16 sm:pt-32 sm:pb-20"
    >
      {/* dezenter warmer Verlauf im Hintergrund */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-cream to-beige"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        {/* Text */}
        <div className="animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink shadow-sm ring-1 ring-beige-deep">
            <span aria-hidden className="text-gold">
              ✦
            </span>
            {SITE.tagline}
          </p>
          <h1 className="mt-5 font-serif text-4xl font-bold leading-[1.1] text-navy sm:text-5xl lg:text-[3.4rem]">
            Ein Wohnmobil.
            <br />
            Eine Geschichte.
            <br />
            <span className="text-green-deep">Eine zweite Chance.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink">
            Ich möchte unser Wohnmobil einem Menschen anvertrauen, der es wirklich
            braucht, verantwortungsvoll damit umgeht und ihm eine neue Zukunft geben
            kann.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#bewerbung" variant="primary">
              Jetzt bewerben
            </ButtonLink>
            <ButtonLink href="#geschichte" variant="secondary">
              Meine Geschichte lesen
            </ButtonLink>
          </div>
          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
            {["Kostenlose Bewerbung", "Kein Verkauf", "Persönliche Auswahl"].map(
              (item) => (
                <li key={item} className="flex items-center gap-2">
                  <span aria-hidden className="text-green">
                    ✓
                  </span>
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>

        {/* Bild – sauber gerahmt */}
        <div className="animate-fade-up">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-soft)] ring-1 ring-beige-deep">
              <Image
                src={heroImage}
                alt="Der Hymer MLT 580 – Frontansicht"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
            </div>
            {/* dezenter goldener Akzent */}
            <div
              aria-hidden
              className="absolute -bottom-3 -right-3 -z-10 hidden h-full w-full rounded-[var(--radius-card)] bg-gold/15 lg:block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
