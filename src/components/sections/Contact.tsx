"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FieldWrapper, Input, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Turnstile } from "@/components/Turnstile";
import { contactSchema, type ContactInput } from "@/lib/validation";

export function Contact() {
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState("");
  const startTime = useRef(Date.now());

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    setServerError(null);
    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          captchaToken,
          elapsed: Date.now() - startTime.current,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Es ist ein Fehler aufgetreten.");
      }
      setDone(true);
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Es ist ein Fehler aufgetreten.",
      );
    }
  };

  return (
    <Section id="kontakt" className="bg-beige" containerClassName="max-w-3xl">
      <SectionHeading
        eyebrow="Kontakt"
        title="Haben Sie eine Frage?"
        intro="Wenn Sie etwas wissen möchten, bevor Sie sich bewerben, schreiben Sie uns gerne."
        center
      />

      {done ? (
        <div className="rounded-[var(--radius-card)] bg-cream p-10 text-center shadow-[var(--shadow-soft)]">
          <CheckCircle2 className="mx-auto mb-4 text-green" size={48} />
          <h3 className="font-serif text-2xl text-navy">Vielen Dank!</h3>
          <p className="mt-3 text-ink-soft">
            Ihre Nachricht wurde übermittelt. Wir melden uns, sobald es möglich ist.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-[var(--radius-card)] bg-cream p-7 shadow-[var(--shadow-soft)] sm:p-9"
          noValidate
        >
          {/* Honeypot */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
            {...register("website")}
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <FieldWrapper label="Name" htmlFor="c-name" error={errors.name?.message} required>
              <Input id="c-name" autoComplete="name" {...register("name")} />
            </FieldWrapper>
            <FieldWrapper
              label="E-Mail"
              htmlFor="c-email"
              error={errors.email?.message}
              required
            >
              <Input id="c-email" type="email" autoComplete="email" {...register("email")} />
            </FieldWrapper>
          </div>
          <div className="mt-5">
            <FieldWrapper
              label="Betreff"
              htmlFor="c-subject"
              error={errors.subject?.message}
              required
            >
              <Input id="c-subject" {...register("subject")} />
            </FieldWrapper>
          </div>
          <div className="mt-5">
            <FieldWrapper
              label="Nachricht"
              htmlFor="c-message"
              error={errors.message?.message}
              required
            >
              <Textarea id="c-message" {...register("message")} />
            </FieldWrapper>
          </div>

          <div className="mt-5">
            <Turnstile onVerify={setCaptchaToken} />
          </div>

          {serverError && (
            <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {serverError}
            </p>
          )}

          <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-sm text-ink-soft">
              <Mail size={16} className="text-green" />
              Ihre Daten werden ausschließlich zur Beantwortung genutzt.
            </p>
            <Button type="submit" disabled={isSubmitting}>
              <Send size={18} />
              {isSubmitting ? "Wird gesendet …" : "Nachricht senden"}
            </Button>
          </div>
        </form>
      )}
    </Section>
  );
}
