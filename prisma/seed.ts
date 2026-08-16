/**
 * Optionales Seed-Skript.
 *
 * Legt ein Beispiel für eine weitere Sachspende an – standardmäßig NICHT
 * veröffentlicht (published: false), damit auf der Website nur tatsächlich
 * vorhandene Gegenstände erscheinen. Die Betreiberin kann den Eintrag im
 * Admin-Bereich bzw. direkt in der Datenbank anpassen oder löschen.
 *
 * Ausführen mit:  npm run db:seed
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.donation.count();
  if (existing > 0) {
    console.log(`Es sind bereits ${existing} Sachspenden vorhanden – kein Seed nötig.`);
    return;
  }

  await prisma.donation.create({
    data: {
      title: "Beispiel: Campingausrüstung",
      description:
        "Dies ist ein Beispieleintrag. Er ist nicht veröffentlicht und dient nur zur Veranschaulichung. Bitte im Admin-Bereich bearbeiten oder löschen.",
      category: "Campingausrüstung",
      location: "Beispielort",
      handoverRegion: "Nach Absprache",
      status: "VERFUEGBAR",
      published: false,
      sortOrder: 0,
    },
  });

  console.log("Beispiel-Sachspende angelegt (published: false).");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
