import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-beige px-5 text-center">
      <p className="font-serif text-6xl font-bold text-gold">404</p>
      <h1 className="mt-4 font-serif text-2xl text-navy">Seite nicht gefunden</h1>
      <p className="mt-2 max-w-md text-ink-soft">
        Die gewünschte Seite existiert nicht oder wurde verschoben.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-navy px-6 py-3 font-semibold text-white transition-colors hover:bg-navy-soft"
      >
        Zur Startseite
      </Link>
    </main>
  );
}
