import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/LegalShell";

export const metadata: Metadata = {
  title: "Cookie-Einstellungen",
  robots: { index: true, follow: true },
};

export default function CookiesPage() {
  return (
    <LegalShell title="Cookie-Einstellungen">
      <p>
        Diese Website ist bewusst datensparsam gestaltet. Wir verwenden{" "}
        <strong>technisch notwendige Cookies</strong> für den sicheren Betrieb sowie –
        <strong> nur mit Ihrer ausdrücklichen Einwilligung</strong> – Cookies von
        Google (Google Ads) zur Messung des Erfolgs unserer Werbung. Ohne Ihre
        Einwilligung werden diese Google-Cookies nicht gesetzt.
      </p>

      <h2 className="pt-2 font-serif text-xl text-navy">Lokale Speicherung</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>Cookie-Hinweis</strong> – speichert lokal in Ihrem Browser, dass Sie
          diesen Hinweis gesehen haben (kein serverseitiges Cookie).
        </li>
        <li>
          <strong>Formular-Entwurf</strong> – während des Ausfüllens der Bewerbung
          wird Ihr Fortschritt lokal in Ihrem Browser zwischengespeichert, damit
          nichts verloren geht. Diese Daten verlassen Ihren Browser nicht, bis Sie
          die Bewerbung absenden.
        </li>
      </ul>

      <h2 className="pt-2 font-serif text-xl text-navy">
        Cookies mit Einwilligung (Google Ads)
      </h2>
      <p>
        Sofern Sie im Cookie-Hinweis auf „Alle akzeptieren“ klicken, setzen wir die
        Google-Tag (Google Ads) ein, um Conversions (z. B. abgesendete Bewerbungen)
        unserer Werbung zuzuordnen. Erst dann werden entsprechende Cookies gesetzt und
        Daten an Google übertragen. Wählen Sie „Nur notwendige“, unterbleibt dies
        vollständig (Google Consent Mode v2). Ihre Auswahl wird lokal in Ihrem Browser
        gespeichert; Sie können sie durch Löschen der Websitedaten jederzeit
        zurücksetzen.
      </p>
      <p>
        Weitere Informationen finden Sie in unserer{" "}
        <Link href="/datenschutz" className="font-medium text-green underline">
          Datenschutzerklärung
        </Link>
        .
      </p>
    </LegalShell>
  );
}
