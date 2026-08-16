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
        Diese Website ist bewusst datensparsam gestaltet. Wir verwenden
        <strong> ausschließlich technisch notwendige Cookies</strong>, die für den
        sicheren Betrieb der Website erforderlich sind. Es gibt kein Tracking, keine
        Analyse-Cookies und keine Werbung.
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

      <p>
        Da wir keine optionalen oder werblichen Cookies einsetzen, ist keine weitere
        Einwilligung erforderlich. Weitere Informationen finden Sie in unserer{" "}
        <Link href="/datenschutz" className="font-medium text-green underline">
          Datenschutzerklärung
        </Link>
        .
      </p>
    </LegalShell>
  );
}
