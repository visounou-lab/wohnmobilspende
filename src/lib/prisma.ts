import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Ermittelt die Laufzeit-Verbindungs-URL.
 *
 * Die Neon-Vercel-Integration stellt `DATABASE_URL` (gepoolt) bereit. Prisma
 * benötigt beim gepoolten Neon-Endpunkt (`-pooler`) den Parameter
 * `pgbouncer=true`, damit keine Prepared-Statement-Konflikte auftreten. Dieser
 * wird hier bei Bedarf automatisch ergänzt.
 */
function resolveDatabaseUrl(): string | undefined {
  const base =
    process.env.DATABASE_URL ??
    process.env.POSTGRES_PRISMA_URL ??
    process.env.POSTGRES_URL;
  if (!base) return undefined;

  if (base.includes("-pooler") && !base.includes("pgbouncer")) {
    return base + (base.includes("?") ? "&" : "?") + "pgbouncer=true";
  }
  return base;
}

const datasourceUrl = resolveDatabaseUrl();

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    ...(datasourceUrl ? { datasourceUrl } : {}),
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
