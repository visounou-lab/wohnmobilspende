"use client";

import { useEffect } from "react";

/**
 * Aktiviert das sanfte Einblenden von Elementen mit der Klasse `.reveal`
 * beim Scrollen. Setzt `.reveal-on` am <html>, damit ohne JavaScript nichts
 * versteckt bleibt (Barrierefreiheit).
 */
export function RevealInit() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) return;

    root.classList.add("reveal-on");
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
