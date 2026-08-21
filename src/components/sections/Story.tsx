import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { getFeatureImage } from "@/lib/gallery";

const paragraphs = [
  "Mein Name ist Elisabeth. Ich bin 78 Jahre alt und österreichische Staatsbürgerin.",
  "Viele Jahre lang war ich in unserer christlichen Gemeinschaft in Neusiedl am See engagiert. Diese Zeit hat mich gelehrt, dass Nächstenliebe dann am schönsten ist, wenn sie konkret wird – wenn sie einem einzelnen Menschen wirklich hilft.",
  "Mein verstorbener Ehemann war Deutscher. Gemeinsam hatten wir den Wunsch, unser Wohnmobil für Reisen mit einem sozialen und menschlichen Zweck zu nutzen. Leider kam das Leben anders.",
  "Nach dem Tod meines Mannes und aufgrund persönlicher und gesundheitlicher Umstände konnte ich diesen gemeinsamen Wunsch nicht mehr selbst verwirklichen.",
  "Heute möchte ich nicht, dass unser Wohnmobil einfach ungenutzt bleibt. Ich wünsche mir, dass es einem Menschen oder einer Familie eine echte zweite Chance schenkt.",
  "Deshalb möchte ich es aus christlicher Nächstenliebe einem ehrlichen, verantwortungsbewussten Menschen anvertrauen, für den es einen wirklichen Neuanfang bedeuten kann.",
  "Für mich ist nicht entscheidend, das Wohnmobil möglichst schnell weiterzugeben. Ich möchte wissen, dass es in guten Händen sein wird und dort hilft, wo es am meisten gebraucht wird.",
];

export function Story() {
  const portrait = getFeatureImage("elisabeth", "/images/elisabeth/elisabeth.svg");
  return (
    <Section id="geschichte" className="bg-cream">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="order-2 lg:order-1">
          <div className="relative mx-auto max-w-md overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-soft)]">
            <div className="relative aspect-square">
              <Image
                src={portrait}
                alt="Elisabeth Pillwatsch"
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover object-center"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy/70 to-transparent p-5">
              <p className="font-serif text-lg text-white">Elisabeth Pillwatsch</p>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-green">
            Elisabeths Geschichte
          </p>
          <h2 className="gold-divider text-3xl font-bold sm:text-4xl">
            Ein Leben geprägt von Gemeinschaft und Hilfsbereitschaft
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink">
            {paragraphs.map((p, i) => (
              <p key={i} className={i === 4 || i === 6 ? "font-medium text-navy" : ""}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
