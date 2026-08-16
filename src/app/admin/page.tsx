import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminDashboard, type AdminApplication } from "@/components/admin/AdminDashboard";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  let applications: AdminApplication[] = [];
  let dbError = false;

  try {
    const rows = await prisma.application.findMany({
      orderBy: { createdAt: "desc" },
    });
    applications = rows.map((a) => ({
      id: a.id,
      applicationNumber: a.applicationNumber,
      firstName: a.firstName,
      lastName: a.lastName,
      birthDate: a.birthDate,
      city: a.city,
      state: a.state,
      email: a.email,
      phone: a.phone,
      motivation: a.motivation,
      plannedUse: a.plannedUse,
      status: a.status,
      createdAt: a.createdAt.toISOString(),
    }));
  } catch {
    dbError = true;
  }

  return (
    <>
      <AdminHeader />
      <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <h1 className="font-serif text-2xl font-bold text-navy sm:text-3xl">
          Bewerbungen
        </h1>
        <p className="mt-1 text-ink-soft">
          Übersicht aller eingegangenen Bewerbungen. Elisabeth entscheidet nach
          persönlicher Prüfung.
        </p>

        {dbError ? (
          <div className="mt-8 rounded-xl bg-red-50 px-5 py-4 text-red-700">
            Die Datenbank ist derzeit nicht erreichbar. Bitte prüfen Sie die
            Umgebungsvariablen (DATABASE_URL).
          </div>
        ) : (
          <AdminDashboard applications={applications} />
        )}
      </main>
    </>
  );
}
