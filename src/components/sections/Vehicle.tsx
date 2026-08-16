import { Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { VEHICLE_BASICS, VEHICLE_FEATURES } from "@/lib/content";

export function Vehicle() {
  return (
    <Section id="wohnmobil" className="bg-beige">
      <SectionHeading
        eyebrow="Das Fahrzeug"
        title="Unser Hymer"
        intro="Ein Reisemobil, das viele schöne Momente ermöglicht hat – und bereit ist für ein neues Kapitel."
      />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        {/* Grundinformationen */}
        <div className="rounded-[var(--radius-card)] bg-navy p-8 text-white shadow-[var(--shadow-soft)]">
          <h3 className="font-serif text-xl text-white">Grundinformationen</h3>
          <dl className="mt-6 space-y-4">
            {VEHICLE_BASICS.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between border-b border-white/10 pb-4 last:border-0"
              >
                <dt className="text-beige/80">{item.label}</dt>
                <dd className="font-semibold text-gold-soft">{item.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm leading-relaxed text-beige/70">
            Weitere Fahrzeugdaten wie Kilometerstand, Motorleistung, Maße oder
            zulässiges Gesamtgewicht werden erst veröffentlicht, wenn sie
            zuverlässig bestätigt wurden.
          </p>
        </div>

        {/* Ausstattung */}
        <div className="rounded-[var(--radius-card)] bg-cream p-8 shadow-[var(--shadow-soft)]">
          <h3 className="font-serif text-xl text-navy">Ausstattung</h3>
          <p className="mt-2 text-sm text-ink-soft">
            Sichtbare beziehungsweise bestätigte Ausstattung:
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {VEHICLE_FEATURES.map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-green/15 text-green">
                  <Check size={15} strokeWidth={3} />
                </span>
                <span className="text-ink">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
