import { Section, SectionHeading } from "@/components/ui/Section";
import { PROCESS_STEPS } from "@/lib/content";

export function Process() {
  return (
    <Section id="ablauf" className="bg-beige">
      <SectionHeading
        eyebrow="Ablauf"
        title="Wie wird entschieden?"
        intro="Ein menschlicher und transparenter Weg – Schritt für Schritt. Es handelt sich nicht um eine Lotterie und nicht um ein Gewinnspiel."
        center
      />

      <ol className="mx-auto max-w-3xl space-y-5">
        {PROCESS_STEPS.map((step, i) => (
          <li
            key={step.title}
            className="flex gap-5 rounded-[var(--radius-card)] bg-cream p-6 shadow-sm ring-1 ring-beige-deep"
          >
            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-navy font-serif text-lg font-bold text-white">
              {i + 1}
            </span>
            <div>
              <h3 className="font-serif text-lg text-navy">{step.title}</h3>
              <p className="mt-1 leading-relaxed text-ink-soft">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
