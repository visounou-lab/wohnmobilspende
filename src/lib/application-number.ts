import { prisma } from "@/lib/prisma";

/**
 * Erzeugt die nächste fortlaufende Bewerbungsnummer im Format
 * `WS-DE-<Jahr>-0001`. Der Zähler wird pro Jahr in der Tabelle `Counter`
 * geführt. Die atomare Erhöhung verhindert doppelte Nummern.
 */
export async function generateApplicationNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const key = `application-${year}`;

  const counter = await prisma.counter.upsert({
    where: { key },
    create: { key, value: 1 },
    update: { value: { increment: 1 } },
  });

  const padded = String(counter.value).padStart(4, "0");
  return `WS-DE-${year}-${padded}`;
}
