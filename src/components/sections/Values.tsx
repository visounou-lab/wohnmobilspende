import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/Section";
import { VALUES, COMMUNITY } from "@/lib/content";
import { getFeatureImage } from "@/lib/gallery";

export function Values() {
  const communityImage = getFeatureImage("gemeinschaft", "");
  return (
    <Section id="werte" className="bg-cream" containerClassName="max-w-4xl">
      <SectionHeading
        eyebrow="Werte, die bleiben"
        title="Gemeinschaft, die weiterwirkt"
        intro="Die Jahre in der christlichen Gemeinschaft von Neusiedl am See haben Elisabeth geprägt. Ihr Engagement setzt sich heute in einer neuen, ganz persönlichen Form fort: einem Menschen direkt zu helfen."
        center
      />

      {communityImage && (
        <figure className="mb-10 overflow-hidden rounded-[var(--radius-card)] shadow-[var(--shadow-soft)] ring-1 ring-beige-deep">
          <div className="relative aspect-[16/9]">
            <Image
              src={communityImage}
              alt="Gemeindefest der evangelischen Gemeinschaft in Neusiedl am See"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
          </div>
          <figcaption className="bg-beige px-5 py-3 text-center text-sm text-ink-soft">
            Gemeindefest der evangelischen Gemeinschaft in Neusiedl am See – aus
            solchen Momenten der Gemeinschaft ist diese Initiative gewachsen.
          </figcaption>
        </figure>
      )}

      <div className="flex flex-wrap justify-center gap-3">
        {VALUES.map((value) => (
          <span
            key={value}
            className="rounded-full bg-green/12 px-5 py-2.5 font-serif text-lg text-green-deep"
          >
            {value}
          </span>
        ))}
      </div>

      <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-ink-soft">
        Elisabeths Weg ist verbunden mit der {COMMUNITY}. Diese Erwähnung geschieht
        ausschließlich im Zusammenhang mit ihrem persönlichen Werdegang. Die
        Wohnmobilspende ist eine private Initiative und kein offizielles Angebot der
        Evangelischen Kirche, sofern nicht ausdrücklich anders angegeben.
      </p>
    </Section>
  );
}
