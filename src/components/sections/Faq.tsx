"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FAQ_ITEMS } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" className="bg-beige" containerClassName="max-w-3xl">
      <SectionHeading
        eyebrow="Fragen & Antworten"
        title="Häufige Fragen"
        intro="Transparenz ist uns wichtig. Hier finden Sie Antworten auf die häufigsten Fragen."
        center
      />

      <div className="space-y-3">
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={item.q}
              className="overflow-hidden rounded-xl bg-cream shadow-sm ring-1 ring-beige-deep"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span className="font-serif text-lg font-medium text-navy">
                  {item.q}
                </span>
                <ChevronDown
                  size={22}
                  className={cn(
                    "flex-none text-green transition-transform duration-300",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
              <div
                className={cn(
                  "grid transition-all duration-300 ease-in-out",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 leading-relaxed text-ink">{item.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
