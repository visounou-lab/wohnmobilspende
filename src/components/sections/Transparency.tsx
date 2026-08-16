import { ShieldCheck } from "lucide-react";
import { Section } from "@/components/ui/Section";

const points = [
  "Für das Absenden einer Bewerbung wird kein Geld verlangt.",
  "Eine Zahlung erhöht nicht die Chance, ausgewählt zu werden.",
  "Die Auswahl erfolgt aufgrund der persönlichen Situation, der Geschichte und des geplanten Umgangs mit dem Wohnmobil.",
];

export function Transparency() {
  return (
    <Section className="bg-navy" containerClassName="max-w-4xl">
      <div className="text-center">
        <span className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gold/20 text-gold-soft">
          <ShieldCheck size={28} />
        </span>
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Ein Projekt, das auf Vertrauen basiert
        </h2>
        <ul className="mx-auto mt-8 max-w-2xl space-y-4 text-left">
          {points.map((p) => (
            <li
              key={p}
              className="flex items-start gap-3 rounded-xl bg-white/5 px-5 py-4 text-beige"
            >
              <span aria-hidden className="mt-1 text-gold-soft">
                ✓
              </span>
              <span className="leading-relaxed">{p}</span>
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-8 max-w-2xl text-sm leading-relaxed text-beige/70">
          Dieses Projekt ist kein Gewinnspiel, keine Verlosung und keine Lotterie.
          Eine Bewerbung bedeutet nicht automatisch, dass das Wohnmobil zugesprochen
          wird. Elisabeth entscheidet nach Prüfung der Bewerbungen persönlich.
        </p>
      </div>
    </Section>
  );
}
