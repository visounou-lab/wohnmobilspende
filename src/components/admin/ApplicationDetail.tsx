"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, Trash2, Loader2, Phone, Mail } from "lucide-react";
import {
  APPLICATION_STATUS_LABELS,
  APPLICATION_STATUS_ORDER,
  TRISTATE_LABELS,
} from "@/lib/content";
import { formatDateTime, calculateAge } from "@/lib/utils";

export interface FullApplication {
  id: string;
  applicationNumber: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  city: string;
  state: string;
  country: string;
  email: string;
  phone: string;
  maritalStatus: string;
  occupation: string;
  householdSize: number;
  hasLicense: boolean;
  hadMotorhome: boolean;
  motivation: string;
  plannedUse: string;
  impact: string;
  aboutYou: string;
  canMaintain: boolean;
  canInsure: string;
  willingToTalk: boolean;
  canOrganizeHandover: string;
  status: string;
  internalNotes: string | null;
  createdAt: string;
}

export function ApplicationDetail({
  application,
}: {
  application: FullApplication;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(application.status);
  const [notes, setNotes] = useState(application.internalNotes ?? "");
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);

  const age = calculateAge(application.birthDate);

  const save = async () => {
    setSaving(true);
    setSavedMsg(null);
    try {
      const res = await fetch(`/api/admin/applications/${application.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, internalNotes: notes }),
      });
      if (!res.ok) throw new Error();
      setSavedMsg("Gespeichert.");
      router.refresh();
    } catch {
      setSavedMsg("Fehler beim Speichern.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!confirm("Diese Bewerbung endgültig löschen? Dies kann nicht rückgängig gemacht werden."))
      return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/applications/${application.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      router.push("/admin");
      router.refresh();
    } catch {
      setSavedMsg("Fehler beim Löschen.");
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Kopf */}
      <div className="rounded-[var(--radius-card)] bg-cream p-6 shadow-sm ring-1 ring-beige-deep">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-sm text-ink-soft">
              {application.applicationNumber}
            </p>
            <h1 className="mt-1 font-serif text-2xl font-bold text-navy">
              {application.firstName} {application.lastName}
              {age !== null && (
                <span className="ml-2 text-base font-normal text-ink-soft">
                  {age} Jahre
                </span>
              )}
            </h1>
            <p className="mt-1 text-sm text-ink-soft">
              Eingegangen am {formatDateTime(application.createdAt)}
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <a
              href={`tel:${application.phone}`}
              className="flex items-center gap-2 text-navy hover:text-green"
            >
              <Phone size={15} /> {application.phone}
            </a>
            <a
              href={`mailto:${application.email}`}
              className="flex items-center gap-2 text-navy hover:text-green"
            >
              <Mail size={15} /> {application.email}
            </a>
          </div>
        </div>
      </div>

      {/* Stammdaten */}
      <Card title="Über die Person">
        <Grid>
          <Item label="Wohnort" value={`${application.city}, ${application.state}`} />
          <Item label="Land" value={application.country} />
          <Item label="Familiensituation" value={application.maritalStatus} />
          <Item label="Beruf / Tätigkeit" value={application.occupation} />
          <Item label="Personen im Haushalt" value={String(application.householdSize)} />
          <Item label="Führerschein" value={application.hasLicense ? "Ja" : "Nein"} />
          <Item label="Bereits ein Wohnmobil?" value={application.hadMotorhome ? "Ja" : "Nein"} />
        </Grid>
      </Card>

      {/* Geschichte */}
      <Card title="Die Geschichte">
        <LongText label="Warum möchten Sie dieses Wohnmobil erhalten?" value={application.motivation} />
        <LongText label="Wie würden Sie das Wohnmobil nutzen?" value={application.plannedUse} />
        <LongText label="Was würde sich verändern?" value={application.impact} />
        <LongText label="Über sich / Familie / Projekt" value={application.aboutYou} />
      </Card>

      {/* Verantwortung */}
      <Card title="Verantwortung">
        <Grid>
          <Item label="Wartung & Pflege langfristig möglich?" value={application.canMaintain ? "Ja" : "Nein"} />
          <Item label="Ordnungsgemäße Versicherung möglich?" value={TRISTATE_LABELS[application.canInsure] ?? application.canInsure} />
          <Item label="Persönliches Gespräch möglich?" value={application.willingToTalk ? "Ja" : "Nein"} />
          <Item label="Übergabe organisierbar?" value={TRISTATE_LABELS[application.canOrganizeHandover] ?? application.canOrganizeHandover} />
        </Grid>
      </Card>

      {/* Verwaltung */}
      <Card title="Verwaltung">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="status" className="text-sm font-medium text-navy">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-beige-deep bg-white px-4 py-3 text-ink focus:border-green focus:outline-none focus:ring-2 focus:ring-green/25"
            >
              {APPLICATION_STATUS_ORDER.map((s) => (
                <option key={s} value={s}>
                  {APPLICATION_STATUS_LABELS[s]}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-5">
          <label htmlFor="notes" className="text-sm font-medium text-navy">
            Interne Notizen
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={5}
            placeholder="Nur intern sichtbar – nicht für Bewerber."
            className="mt-1.5 w-full resize-y rounded-xl border border-beige-deep bg-white px-4 py-3 text-ink focus:border-green focus:outline-none focus:ring-2 focus:ring-green/25"
          />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={remove}
            disabled={saving}
            className="flex items-center gap-2 rounded-full border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-60"
          >
            <Trash2 size={16} />
            Bewerbung löschen
          </button>
          <div className="flex items-center gap-3">
            {savedMsg && <span className="text-sm text-ink-soft">{savedMsg}</span>}
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="flex items-center gap-2 rounded-full bg-navy px-6 py-2.5 font-semibold text-white transition-colors hover:bg-navy-soft disabled:opacity-60"
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              Speichern
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[var(--radius-card)] bg-cream p-6 shadow-sm ring-1 ring-beige-deep">
      <h2 className="mb-4 font-serif text-lg text-navy">{title}</h2>
      {children}
    </section>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <dl className="grid gap-4 sm:grid-cols-2">{children}</dl>;
}

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-ink-soft">{label}</dt>
      <dd className="mt-0.5 text-ink">{value}</dd>
    </div>
  );
}

function LongText({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-5 last:mb-0">
      <p className="text-xs uppercase tracking-wide text-ink-soft">{label}</p>
      <p className="mt-1 whitespace-pre-wrap leading-relaxed text-ink">{value}</p>
    </div>
  );
}
