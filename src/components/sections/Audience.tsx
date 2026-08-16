import { Users, User, Building2, HeartHandshake } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { AUDIENCE } from "@/lib/content";

const icons = [Users, User, Building2, HeartHandshake];

export function Audience() {
  return (
    <Section id="fuer-wen" className="bg-beige">
      <SectionHeading
        eyebrow="Für wen?"
        title="Ich suche nicht den perfekten Bewerber. Ich suche den richtigen Menschen."
        intro="Es gibt viele Wege, wie das Wohnmobil sinnvoll weiterleben kann. Vielleicht ist einer davon Ihrer."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {AUDIENCE.map((item, i) => {
          const Icon = icons[i];
          return (
            <div
              key={item.title}
              className="flex flex-col rounded-[var(--radius-card)] bg-cream p-7 shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-1"
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
    </Section>
  );
}
