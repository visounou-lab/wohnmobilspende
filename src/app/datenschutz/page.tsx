import type { Metadata } from "next";
import { LegalShell } from "@/components/LegalShell";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  robots: { index: true, follow: true },
};

export default function DatenschutzPage() {
  return (
    <LegalShell title="Datenschutzerklärung" updated="August 2026">
      <p className="rounded-lg bg-gold/10 px-4 py-3 text-sm text-[#8a6d33]">
        Hinweis für die Betreiberin: Bitte ergänzen Sie die mit
        <strong> [BITTE ERGÄNZEN] </strong> markierten Angaben. Diese Erklärung ist
        eine sorgfältig vorbereitete Vorlage und ersetzt keine individuelle
        Rechtsberatung.
      </p>

      <h2 className="pt-2 font-serif text-xl text-navy">1. Verantwortliche Stelle</h2>
      <p>
        Verantwortlich für die Datenverarbeitung auf dieser Website ist:
        <br />
        Elisabeth [BITTE ERGÄNZEN: Name, Anschrift, E-Mail].
      </p>

      <h2 className="pt-2 font-serif text-xl text-navy">
        2. Grundsatz der Datenminimierung
      </h2>
      <p>
        Wir erheben nur die Daten, die für die Bearbeitung Ihrer Bewerbung oder
        Kontaktanfrage erforderlich sind. Bei der ersten Bewerbung verlangen wir
        insbesondere keine Ausweiskopien oder sonstige sensible Dokumente. Zusätzliche
        Nachweise werden – falls überhaupt – erst bei einer ernsthaften Vorauswahl und
        nur dann angefragt, wenn sie tatsächlich erforderlich sind.
      </p>

      <h2 className="pt-2 font-serif text-xl text-navy">3. Bewerbungsformular</h2>
      <p>
        Wenn Sie eine Bewerbung absenden, verarbeiten wir die von Ihnen angegebenen
        Daten (Name, Geburtsdatum, Kontaktdaten, Wohnort, Angaben zu Ihrer Situation
        sowie Ihre Geschichte). Diese Daten werden ausschließlich zur Prüfung und
        Bearbeitung Ihrer Bewerbung verwendet.
      </p>
      <p>
        Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sowie die
        Durchführung vorvertraglicher Maßnahmen (Art. 6 Abs. 1 lit. b DSGVO).
      </p>

      <h2 className="pt-2 font-serif text-xl text-navy">4. Kontaktformular</h2>
      <p>
        Bei einer Kontaktanfrage verarbeiten wir Ihren Namen, Ihre E-Mail-Adresse und
        Ihre Nachricht, um Ihr Anliegen zu beantworten (Art. 6 Abs. 1 lit. a und f
        DSGVO).
      </p>

      <h2 className="pt-2 font-serif text-xl text-navy">5. Empfänger / Auftragsverarbeiter</h2>
      <p>Zur Bereitstellung der Website und ihrer Funktionen nutzen wir:</p>
      <ul className="list-disc space-y-1 pl-6">
        <li>
          <strong>Vercel Inc.</strong> – Hosting der Website.
        </li>
        <li>
          <strong>Neon</strong> – Datenbank zur Speicherung der Bewerbungen (Server
          innerhalb der EU, sofern entsprechend konfiguriert).
        </li>
        <li>
          <strong>Resend</strong> – Versand von Bestätigungs- und
          Benachrichtigungs-E-Mails.
        </li>
        <li>
          <strong>Cloudflare Turnstile</strong> – Schutz der Formulare vor
          automatisiertem Missbrauch (sofern aktiviert).
        </li>
      </ul>
      <p>
        Mit diesen Anbietern werden, soweit erforderlich, Verträge zur
        Auftragsverarbeitung (Art. 28 DSGVO) geschlossen.
      </p>

      <h2 className="pt-2 font-serif text-xl text-navy">6. Speicherdauer</h2>
      <p>
        Bewerbungsdaten werden nur so lange gespeichert, wie es für die Durchführung
        und Abwicklung des Projekts erforderlich ist. Nicht ausgewählte Bewerbungen
        werden anschließend gelöscht, spätestens jedoch nach [BITTE ERGÄNZEN: z. B. 12]
        Monaten. Sie können die Löschung Ihrer Daten jederzeit verlangen.
      </p>

      <h2 className="pt-2 font-serif text-xl text-navy">7. Cookies</h2>
      <p>
        Diese Website verwendet keine Tracking-, Analyse- oder Werbe-Cookies.
        Während des Ausfüllens der Bewerbung wird Ihr Fortschritt ausschließlich
        lokal in Ihrem Browser zwischengespeichert. Es findet kein Tracking statt.
      </p>

      <h2 className="pt-2 font-serif text-xl text-navy">8. Ihre Rechte</h2>
      <p>Sie haben jederzeit das Recht auf:</p>
      <ul className="list-disc space-y-1 pl-6">
        <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
        <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
        <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerruf einer erteilten Einwilligung (Art. 7 Abs. 3 DSGVO)</li>
        <li>Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
      </ul>
      <p>
        Zur Ausübung Ihrer Rechte oder zur Löschung Ihrer Bewerbung genügt eine
        formlose Nachricht an [BITTE ERGÄNZEN: E-Mail-Adresse].
      </p>

      <h2 className="pt-2 font-serif text-xl text-navy">9. Datensicherheit</h2>
      <p>
        Die Übertragung erfolgt verschlüsselt über HTTPS. Bewerbungen werden
        vertraulich per E-Mail an Elisabeth übermittelt und nicht öffentlich
        angezeigt oder durch Suchmaschinen indexiert. Wir treffen angemessene
        technische und organisatorische Maßnahmen zum Schutz Ihrer Daten.
      </p>
    </LegalShell>
  );
}
