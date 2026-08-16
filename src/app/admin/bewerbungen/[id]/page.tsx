import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ApplicationDetail } from "@/components/admin/ApplicationDetail";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const a = await prisma.application.findUnique({ where: { id } }).catch(() => null);
  if (!a) notFound();

  return (
    <>
      <AdminHeader />
      <main className="mx-auto max-w-4xl px-5 py-8 sm:px-8">
        <Link
          href="/admin"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-navy"
        >
          <ArrowLeft size={16} />
          Zurück zur Übersicht
        </Link>

        <ApplicationDetail
          application={{
            id: a.id,
            applicationNumber: a.applicationNumber,
            firstName: a.firstName,
            lastName: a.lastName,
            birthDate: a.birthDate,
            city: a.city,
            state: a.state,
            country: a.country,
            email: a.email,
            phone: a.phone,
            maritalStatus: a.maritalStatus,
            occupation: a.occupation,
            householdSize: a.householdSize,
            hasLicense: a.hasLicense,
            hadMotorhome: a.hadMotorhome,
            motivation: a.motivation,
            plannedUse: a.plannedUse,
            impact: a.impact,
            aboutYou: a.aboutYou,
            canMaintain: a.canMaintain,
            canInsure: a.canInsure,
            willingToTalk: a.willingToTalk,
            canOrganizeHandover: a.canOrganizeHandover,
            status: a.status,
            internalNotes: a.internalNotes,
            createdAt: a.createdAt.toISOString(),
          }}
        />
      </main>
    </>
  );
}
