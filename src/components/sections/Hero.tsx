import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { SITE } from "@/lib/content";

export function Hero() {
  return (
    <section
      id="start"
      className="relative flex min-h-[92vh] items-center overflow-hidden pt-24"
    >
      {/* Hintergrundbild – echte Außenaufnahme des Hymer (Platzhalter bis Fotos vorliegen). */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero/hymer-hero.svg"
          alt="Hymer Wohnmobil in ruhiger Landschaft"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/60 to-navy/25" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl animate-fade-up text-white">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
            <span aria-hidden className="text-gold-soft">
              ✦
            </span>
            {SITE.tagline}
          </p>
          <h1 className="font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Ein Wohnmobil. Eine Geschichte. Eine zweite Chance.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-beige">
            Ich möchte unser Wohnmobil einem Menschen anvertrauen, der es wirklich
            braucht, verantwortungsvoll damit umgeht und ihm eine neue Zukunft geben
            kann.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href="#bewerbung" variant="primary" className="bg-gold text-navy hover:bg-gold-soft">
              Jetzt bewerben
            </ButtonLink>
            <ButtonLink
              href="#geschichte"
              variant="secondary"
              className="border-white/40 bg-white/10 text-white backdrop-blur hover:border-white"
            >
              Meine Geschichte lesen
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
