import Image from "next/image";
import { MapPin, ArrowRightLeft } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { DONATION_STATUS_LABELS } from "@/lib/content";

export interface DonationItem {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  handoverRegion: string;
  imageUrl: string | null;
  status: string;
}

const statusStyles: Record<string, string> = {
  VERFUEGBAR: "bg-green/15 text-green-deep",
  IN_VERMITTLUNG: "bg-gold/20 text-[#8a6d33]",
  VERGEBEN: "bg-ink/10 text-ink-soft",
};

export function OtherDonations({ donations }: { donations: DonationItem[] }) {
  return (
    <Section id="weitere-spenden" className="bg-cream">
      <SectionHeading
        eyebrow="Weitere Spenden"
        title="Weitere Dinge, die ein neues Zuhause suchen"
        intro="Nach und nach möchten Elisabeth und Menschen aus ihrem Umfeld weitere Gegenstände weitergeben. Hier erscheinen nur tatsächlich vorhandene Sachspenden."
      />

      {donations.length === 0 ? (
        <div className="rounded-[var(--radius-card)] border border-dashed border-beige-deep bg-beige/50 p-10 text-center">
          <p className="text-lg font-medium text-navy">
            Derzeit sind keine weiteren Sachspenden eingetragen.
          </p>
          <p className="mt-2 text-ink-soft">
            Dieser Bereich wird ergänzt, sobald weitere Gegenstände zur Verfügung
            stehen. Schauen Sie gerne später wieder vorbei.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {donations.map((d) => (
            <article
              key={d.id}
              className="flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-beige shadow-[var(--shadow-soft)]"
            >
              <div className="relative aspect-[4/3] bg-beige-deep">
                {d.imageUrl && (
                  <Image
                    src={d.imageUrl}
                    alt={d.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                )}
                <span
                  className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
                    statusStyles[d.status] ?? "bg-ink/10 text-ink-soft"
                  }`}
                >
                  {DONATION_STATUS_LABELS[d.status] ?? d.status}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-green">
                  {d.category}
                </p>
                <h3 className="mt-1 font-serif text-lg text-navy">{d.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                  {d.description}
                </p>
                <dl className="mt-4 space-y-1.5 text-sm text-ink">
                  <div className="flex items-center gap-2">
                    <MapPin size={15} className="text-green" />
                    <span>{d.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowRightLeft size={15} className="text-green" />
                    <span>Übergabe: {d.handoverRegion}</span>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      )}
    </Section>
  );
}
