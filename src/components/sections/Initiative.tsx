import { Compass, Home, Sparkles, Sunrise } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { INITIATIVE_MEANINGS, COMMUNITY } from "@/lib/content";

const icons = [Compass, Home, Sparkles, Sunrise];

export function Initiative() {
  return (
    <Section id="initiative" className="bg-cream">
      <SectionHeading
        eyebrow="Die Initiative"
        title="Mehr als ein Wohnmobil"
        intro="Für Elisabeth war dieses Wohnmobil ein Ort schöner Erinnerungen. Heute soll es dort einen menschlichen Wert entfalten, wo er am meisten gebraucht wird – als echte Hilfe für einen anderen Menschen."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {INITIATIVE_MEANINGS.map((item, i) => {
          const Icon = icons[i];
          return (
            <div
              key={item.title}
              className="flex flex-col rounded-[var(--radius-card)] bg-beige p-7 shadow-[var(--shadow-soft)]"
            >
              <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-green/12 text-green">
                <Icon size={24} />
              </span>
              <h3 className="font-serif text-xl text-navy">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{item.text}</p>
            </div>
          );
        })}
      </div>

      {/* Aus Nächstenliebe entstanden */}
      <div className="mt-10 grid items-center gap-8 rounded-[var(--radius-card)] bg-navy p-8 text-beige sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold-soft">
            Aus Nächstenliebe entstanden
          </p>
          <h3 className="mt-3 font-serif text-2xl text-white sm:text-3xl">
            Hilfe, die konkret wird
          </h3>
        </div>
        <div className="space-y-4 text-lg leading-relaxed text-beige/90">
          <p>
            Viele Jahre lang war Elisabeth in ihrer evangelischen Gemeinschaft
            engagiert. Diese Zeit hat ihre Überzeugung geprägt, dass Hilfe nicht nur
            aus Worten bestehen sollte, sondern dort konkret werden muss, wo Menschen
            Unterstützung brauchen.
          </p>
          <p>
            Aus diesem Gedanken entstand die Wohnmobilspende. Das Fahrzeug soll nicht
            den höchsten finanziellen Wert erzielen, sondern dort einen menschlichen
            Wert entfalten, wo es am meisten gebraucht wird.
          </p>
          <p className="text-sm text-beige/70">
            Eine private karitative Initiative von Elisabeth, inspiriert durch viele
            Jahre des Engagements in der {COMMUNITY}.
          </p>
        </div>
      </div>
    </Section>
  );
}
