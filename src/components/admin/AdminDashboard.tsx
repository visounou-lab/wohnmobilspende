"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MapPin, Mail, ChevronRight } from "lucide-react";
import {
  APPLICATION_STATUS_LABELS,
  APPLICATION_STATUS_ORDER,
} from "@/lib/content";
import { formatDate, calculateAge } from "@/lib/utils";
import { cn } from "@/lib/utils";

export interface AdminApplication {
  id: string;
  applicationNumber: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  city: string;
  state: string;
  email: string;
  phone: string;
  motivation: string;
  plannedUse: string;
  status: string;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  NEU: "bg-green/15 text-green-deep",
  IN_PRUEFUNG: "bg-gold/20 text-[#8a6d33]",
  KONTAKT: "bg-sky-100 text-sky-700",
  VORAUSWAHL: "bg-indigo-100 text-indigo-700",
  AUSGEWAEHLT: "bg-emerald-100 text-emerald-700",
  NICHT_AUSGEWAEHLT: "bg-ink/10 text-ink-soft",
};

export function AdminDashboard({
  applications,
}: {
  applications: AdminApplication[];
}) {
  const [active, setActive] = useState<string>("ALLE");

  const counts = useMemo(() => {
    const c: Record<string, number> = { ALLE: applications.length };
    for (const s of APPLICATION_STATUS_ORDER) c[s] = 0;
    for (const a of applications) c[a.status] = (c[a.status] ?? 0) + 1;
    return c;
  }, [applications]);

  const filtered =
    active === "ALLE"
      ? applications
      : applications.filter((a) => a.status === active);

  return (
    <div className="mt-8">
      {/* Status-Tabs */}
      <div className="flex flex-wrap gap-2">
        <Tab
          label="Alle"
          count={counts.ALLE}
          active={active === "ALLE"}
          onClick={() => setActive("ALLE")}
        />
        {APPLICATION_STATUS_ORDER.map((s) => (
          <Tab
            key={s}
            label={APPLICATION_STATUS_LABELS[s]}
            count={counts[s] ?? 0}
            active={active === s}
            onClick={() => setActive(s)}
          />
        ))}
      </div>

      {/* Liste */}
      {filtered.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-beige-deep bg-cream/60 p-10 text-center text-ink-soft">
          Keine Bewerbungen in dieser Kategorie.
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {filtered.map((a) => {
            const age = calculateAge(a.birthDate);
            return (
              <li key={a.id}>
                <Link
                  href={`/admin/bewerbungen/${a.id}`}
                  className="flex items-center gap-4 rounded-xl bg-cream p-4 shadow-sm ring-1 ring-beige-deep transition-transform hover:-translate-y-0.5 sm:p-5"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs text-ink-soft">
                        {a.applicationNumber}
                      </span>
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                          statusColors[a.status] ?? "bg-ink/10 text-ink-soft",
                        )}
                      >
                        {APPLICATION_STATUS_LABELS[a.status] ?? a.status}
                      </span>
                    </div>
                    <p className="mt-1 font-serif text-lg text-navy">
                      {a.firstName} {a.lastName}
                      {age !== null && (
                        <span className="ml-2 text-sm font-normal text-ink-soft">
                          {age} Jahre
                        </span>
                      )}
                    </p>
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-soft">
                      <span className="flex items-center gap-1">
                        <MapPin size={13} /> {a.city}, {a.state}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail size={13} /> {a.email}
                      </span>
                      <span>{formatDate(a.createdAt)}</span>
                    </div>
                  </div>
                  <ChevronRight className="flex-none text-ink-soft" size={20} />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function Tab({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
        active ? "bg-navy text-white" : "bg-cream text-ink ring-1 ring-beige-deep hover:bg-white",
      )}
    >
      {label}
      <span
        className={cn(
          "rounded-full px-2 py-0.5 text-xs",
          active ? "bg-white/20" : "bg-beige text-ink-soft",
        )}
      >
        {count}
      </span>
    </button>
  );
}
