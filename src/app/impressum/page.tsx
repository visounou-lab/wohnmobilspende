import type { Metadata } from "next";
import { LegalShell } from "@/components/LegalShell";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: true, follow: true },
};

export default function ImpressumPage() {
  return (
    <LegalShell title="Impressum">
      <p className="rounded-lg bg-gold/10 px-4 py-3 text-sm text-[#8a6d33]">
        Hinweis für die Betreiberin: Bitte ergänzen Sie die mit
        <strong> [BITTE ERGÄNZEN] </strong> markierten Angaben mit Ihren echten
        Kontaktdaten. Ein vollständiges Impressum ist in Deutschland gesetzlich
        vorgeschrieben (§ 5 DDG / § 18 MStV).
      </p>

      <h2 className="pt-2 font-serif text-xl text-navy">Angaben gemäß § 5 DDG</h2>
      <p>
        Elisabeth [BITTE ERGÄNZEN: vollständiger Name]
        <br />
        [BITTE ERGÄNZEN: Straße und Hausnummer]
        <br />
        [BITTE ERGÄNZEN: PLZ, Ort, Land]
      </p>

      <h2 className="pt-2 font-serif text-xl text-navy">Kontakt</h2>
      <p>
        E-Mail: [BITTE ERGÄNZEN: kontakt@wohnmobilspende.com]
        <br />
        Telefon: [BITTE ERGÄNZEN, optional]
      </p>

      <h2 className="pt-2 font-serif text-xl text-navy">
        Verantwortlich für den Inhalt
      </h2>
      <p>Elisabeth [BITTE ERGÄNZEN: Name und Anschrift wie oben]</p>

      <h2 className="pt-2 font-serif text-xl text-navy">Art des Projekts</h2>
      <p>
        Es handelt sich um ein privates, solidarisches Projekt. Das auf dieser
        Website vorgestellte Wohnmobil steht nicht zum Verkauf. Die Bewerbung ist
        kostenlos. Das Projekt ist kein Gewerbe, kein Gewinnspiel, keine Verlosung
        und keine Lotterie.
      </p>

      <h2 className="pt-2 font-serif text-xl text-navy">Streitschlichtung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur
        Online-Streitbeilegung (OS) bereit. Zur Teilnahme an einem
        Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle sind wir
        nicht verpflichtet und grundsätzlich nicht bereit.
      </p>

      <h2 className="pt-2 font-serif text-xl text-navy">Haftung für Inhalte</h2>
      <p>
        Die Inhalte dieser Seiten wurden mit größter Sorgfalt erstellt. Für die
        Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann jedoch keine
        Gewähr übernommen werden.
      </p>
    </LegalShell>
  );
}
