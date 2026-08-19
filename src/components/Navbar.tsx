"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Navbar({ logoSrc }: { logoSrc?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-cream/95 shadow-[0_4px_20px_-12px_rgba(23,50,77,0.4)] backdrop-blur"
          : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <Link
          href="#start"
          className="flex items-center gap-2 font-serif text-lg font-bold text-navy"
          onClick={() => setOpen(false)}
          aria-label={SITE.name}
        >
          {logoSrc ? (
            <>
              <Image
                src={logoSrc}
                alt=""
                width={48}
                height={48}
                priority
                className="h-10 w-auto sm:h-11"
              />
              <span>{SITE.name}</span>
            </>
          ) : (
            <>
              <span aria-hidden className="text-gold">
                ◈
              </span>
              {SITE.name}
            </>
          )}
        </Link>

        <ul className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-ink transition-colors hover:text-green"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="#bewerbung"
          className="hidden rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-soft lg:inline-flex"
        >
          Jetzt bewerben
        </Link>

        <button
          type="button"
          className="text-navy lg:hidden"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile-Menü */}
      {open && (
        <div className="border-t border-beige-deep bg-cream lg:hidden">
          <ul className="flex flex-col gap-1 px-5 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-ink hover:bg-beige"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <Link
                href="#bewerbung"
                className="block rounded-full bg-navy px-5 py-3 text-center text-base font-semibold text-white"
                onClick={() => setOpen(false)}
              >
                Jetzt bewerben
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
