import Link from "next/link";
import Image from "next/image";
import { FOOTER_LINKS, SITE } from "@/lib/content";
import { getFeatureImage } from "@/lib/gallery";

export function Footer() {
  const year = new Date().getFullYear();
  const logoSrc = getFeatureImage("logo", "");
  return (
    <footer className="bg-navy text-beige">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            {logoSrc ? (
              <Image
                src={logoSrc}
                alt={SITE.name}
                width={96}
                height={96}
                className="h-16 w-auto rounded-2xl"
              />
            ) : (
              <p className="flex items-center gap-2 font-serif text-xl font-bold text-white">
                <span aria-hidden className="text-gold">
                  ◈
                </span>
                {SITE.name}
              </p>
            )}
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-beige/80">
              Elisabeth möchte ihrem Hymer Wohnmobil eine zweite Zukunft geben und
              sucht einen verantwortungsvollen Menschen, eine Familie oder Organisation.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gold-soft">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {FOOTER_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-beige/80 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gold-soft">
              Rechtliches
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="#kontakt" className="text-beige/80 transition-colors hover:text-white">
                  Kontakt
                </Link>
              </li>
              <li>
                <Link href="/impressum" className="text-beige/80 transition-colors hover:text-white">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="text-beige/80 transition-colors hover:text-white">
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-beige/80 transition-colors hover:text-white">
                  Cookie-Einstellungen
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-beige/70 sm:flex-row">
          <p>
            © {year} {SITE.name}. Ein privates solidarisches Projekt.
          </p>
          <p>Kein Verkauf · Keine Verlosung · Kostenlose Bewerbung</p>
        </div>
      </div>
    </footer>
  );
}
