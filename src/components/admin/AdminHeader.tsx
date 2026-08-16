"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function AdminHeader() {
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <header className="border-b border-beige-deep bg-cream">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/admin" className="font-serif text-lg font-bold text-navy">
          <span aria-hidden className="mr-2 text-gold">
            ◈
          </span>
          Wohnmobilspende · Admin
        </Link>
        <button
          type="button"
          onClick={logout}
          className="flex items-center gap-2 rounded-full border border-beige-deep px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-navy hover:text-navy"
        >
          <LogOut size={16} />
          Abmelden
        </button>
      </div>
    </header>
  );
}
