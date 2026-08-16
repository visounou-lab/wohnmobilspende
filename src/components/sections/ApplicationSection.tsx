import { Section, SectionHeading } from "@/components/ui/Section";
import { ApplicationForm } from "@/components/ApplicationForm";

export function ApplicationSection() {
  return (
    <Section id="bewerbung" className="bg-cream" containerClassName="max-w-3xl">
      <SectionHeading
        eyebrow="Bewerbung"
        title="Ihre Bewerbung"
        intro="Nehmen Sie sich Zeit. Ihre Geschichte und Ihre Beweggründe sind wichtiger als ein perfekt ausgefülltes Formular. Alle Angaben werden vertraulich behandelt."
        center
      />
      <div className="mb-8 rounded-xl bg-green/8 px-5 py-4 text-center text-sm text-green-deep">
        Das Wohnmobil steht <strong>nicht zum Verkauf</strong>. Die Bewerbung ist{" "}
        <strong>kostenlos</strong>. Eine Bewerbung bedeutet nicht automatisch, dass das
        Wohnmobil zugesprochen wird.
      </div>
      <ApplicationForm />
    </Section>
  );
}
