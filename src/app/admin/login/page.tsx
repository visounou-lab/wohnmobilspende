"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Anmeldung fehlgeschlagen.");
      }
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Anmeldung fehlgeschlagen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-beige px-5">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-[var(--radius-card)] bg-cream p-8 shadow-[var(--shadow-soft)]"
      >
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-navy text-white">
            <Lock size={22} />
          </span>
          <h1 className="font-serif text-2xl text-navy">Admin-Bereich</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Geschützter Zugang zur Bewerbungsverwaltung
          </p>
        </div>

        <label htmlFor="password" className="text-sm font-medium text-navy">
          Passwort
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-beige-deep bg-white px-4 py-3 text-ink focus:border-green focus:outline-none focus:ring-2 focus:ring-green/25"
          required
        />

        {error && (
          <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-navy px-6 py-3 font-semibold text-white transition-colors hover:bg-navy-soft disabled:opacity-60"
        >
          {loading && <Loader2 size={18} className="animate-spin" />}
          Anmelden
        </button>
      </form>
    </div>
  );
}
