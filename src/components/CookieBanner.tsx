"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "ws-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      /* ignore */
    }
  }, []);

  const decide = (value: "accepted" | "essential") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[90] p-4">
      <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-2xl bg-navy p-5 text-beige shadow-2xl sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed">
          Diese Website verwendet ausschließlich technisch notwendige Cookies, um Ihre
          Bewerbung sicher zu verarbeiten. Es findet kein Tracking und keine Werbung
          statt.{" "}
          <Link href="/datenschutz" className="underline">
            Mehr erfahren
          </Link>
          .
        </p>
        <div className="flex flex-none gap-2">
          <button
            type="button"
            onClick={() => decide("essential")}
            className="rounded-full border border-white/30 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white"
          >
            Nur notwendige
          </button>
          <button
            type="button"
            onClick={() => decide("accepted")}
            className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-navy transition-colors hover:bg-gold-soft"
          >
            Verstanden
          </button>
        </div>
      </div>
    </div>
  );
}
