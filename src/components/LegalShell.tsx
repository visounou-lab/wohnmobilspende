import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SITE } from "@/lib/content";

export function LegalShell({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="border-b border-beige-deep bg-cream">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="font-serif text-lg font-bold text-navy">
            <span aria-hidden className="mr-2 text-gold">
              ◈
            </span>
            {SITE.name}
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-navy"
          >
            <ArrowLeft size={16} />
            Zurück
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
        <h1 className="font-serif text-3xl font-bold text-navy sm:text-4xl">
          {title}
        </h1>
        {updated && (
          <p className="mt-2 text-sm text-ink-soft">Stand: {updated}</p>
        )}
        <div className="legal-content mt-8 space-y-5 leading-relaxed text-ink">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
