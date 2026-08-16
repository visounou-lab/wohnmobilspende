/**
 * Wendet das Prisma-Schema beim Build auf die Datenbank an (`prisma db push`).
 *
 * - Läuft nur, wenn eine Datenbank-URL vorhanden ist (lokale Builds ohne DB
 *   werden übersprungen, damit `npm run build` immer funktioniert).
 * - Für `db push` wird eine DIREKTE (ungepoolte) Verbindung bevorzugt. Die
 *   Neon-Vercel-Integration stellt diese als `DATABASE_URL_UNPOOLED` bereit.
 * - Schlägt der Push fehl (z. B. DB nicht erreichbar), bricht der Build ab.
 */
import { execSync } from "node:child_process";

const pooled =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  process.env.POSTGRES_URL;

if (!pooled) {
  console.log("[db-push] Keine DATABASE_URL gesetzt – Schema-Push übersprungen.");
  process.exit(0);
}

const directUrl =
  process.env.DIRECT_URL ||
  process.env.DATABASE_URL_UNPOOLED ||
  process.env.POSTGRES_URL_NON_POOLING ||
  pooled;

console.log("[db-push] Wende Prisma-Schema auf die Datenbank an …");

try {
  // --accept-data-loss: erlaubt Schemaänderungen (z. B. entfernte Spalten) im
  // nicht-interaktiven Build. Da die Verwaltung per E-Mail erfolgt, ist die
  // Datenbank nur eine Sicherung; kritische Daten liegen in Elisabeths Postfach.
  execSync("prisma db push --skip-generate --accept-data-loss", {
    stdio: "inherit",
    env: {
      ...process.env,
      // Datasource-Env für Prisma CLI setzen.
      DATABASE_URL: pooled,
      DIRECT_URL: directUrl,
    },
  });
  console.log("[db-push] Schema erfolgreich angewendet.");
} catch {
  console.error("[db-push] Fehler beim Anwenden des Schemas.");
  process.exit(1);
}
