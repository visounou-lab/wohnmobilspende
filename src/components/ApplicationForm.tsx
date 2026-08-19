"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { FieldWrapper, Input, Textarea, Select, RadioGroup } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Turnstile } from "@/components/Turnstile";
import { reportBewerbungConversion } from "@/components/GoogleTag";
import { applicationSchema, type ApplicationInput } from "@/lib/validation";
import { GERMAN_STATES, APPLICANT_TYPES } from "@/lib/content";

const STORAGE_KEY = "ws-bewerbung-entwurf";

const jaNein = [
  { value: "JA", label: "Ja" },
  { value: "NEIN", label: "Nein" },
];

export function ApplicationForm() {
  const [captchaToken, setCaptchaToken] = useState("");
  const [serverError, setServerError] = useState<string | null>(null);
  const [result, setResult] = useState<{ applicationNumber: string; firstName: string } | null>(null);
  const startTime = useRef(Date.now());

  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationInput>({
    resolver: zodResolver(applicationSchema),
    mode: "onTouched",
  });

  // Formularfortschritt automatisch speichern / wiederherstellen.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) reset({ ...JSON.parse(saved) });
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const sub = watch((value) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
      } catch {
        /* ignore */
      }
    });
    return () => sub.unsubscribe();
  }, [watch]);

  // Google-Ads-Conversion melden, sobald die Bestätigung angezeigt wird.
  useEffect(() => {
    if (result) reportBewerbungConversion();
  }, [result]);

  const storyValue = watch("story") ?? "";

  const onSubmit = async () => {
    setServerError(null);
    const raw = getValues();
    try {
      const res = await fetch("/api/bewerbung", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...raw,
          captchaToken,
          elapsed: Date.now() - startTime.current,
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(body.error ?? "Beim Absenden ist ein Fehler aufgetreten.");
      }
      localStorage.removeItem(STORAGE_KEY);
      setResult({
        applicationNumber: body.applicationNumber,
        firstName: raw.firstName ?? "",
      });
      window.scrollTo({
        top: document.getElementById("bewerbung")?.offsetTop ?? 0,
        behavior: "smooth",
      });
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Fehler beim Absenden.");
    }
  };

  if (result) {
    return <SuccessView applicationNumber={result.applicationNumber} firstName={result.firstName} />;
  }

  return (
    <div className="rounded-[var(--radius-card)] bg-cream p-6 shadow-[var(--shadow-soft)] sm:p-9">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5">
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
          <FieldWrapper label="Vorname" htmlFor="firstName" error={errors.firstName?.message} required>
            <Input id="firstName" autoComplete="given-name" {...register("firstName")} />
          </FieldWrapper>
          <FieldWrapper label="Nachname" htmlFor="lastName" error={errors.lastName?.message} required>
            <Input id="lastName" autoComplete="family-name" {...register("lastName")} />
          </FieldWrapper>
          <FieldWrapper label="E-Mail-Adresse" htmlFor="email" error={errors.email?.message} required>
            <Input id="email" type="email" autoComplete="email" {...register("email")} />
          </FieldWrapper>
          <FieldWrapper label="Telefonnummer" htmlFor="phone" error={errors.phone?.message} required>
            <Input id="phone" type="tel" autoComplete="tel" {...register("phone")} />
          </FieldWrapper>
          <FieldWrapper label="Wohnort" htmlFor="city" error={errors.city?.message} required>
            <Input id="city" autoComplete="address-level2" {...register("city")} />
          </FieldWrapper>
          <FieldWrapper label="Bundesland" htmlFor="state" error={errors.state?.message} required>
            <Select id="state" defaultValue="" {...register("state")}>
              <option value="" disabled>
                Bitte wählen …
              </option>
              {GERMAN_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </FieldWrapper>
        </div>

        <FieldWrapper label="Ich bewerbe mich als" error={errors.applicantType?.message} required>
          <RadioGroup
            options={APPLICANT_TYPES.map((t) => ({ value: t, label: t }))}
            register={register("applicantType")}
            error={errors.applicantType?.message}
          />
        </FieldWrapper>

        <FieldWrapper label="Besitzen Sie einen gültigen Führerschein?" error={errors.hasLicense?.message} required>
          <RadioGroup options={jaNein} register={register("hasLicense")} error={errors.hasLicense?.message} />
        </FieldWrapper>

        <FieldWrapper
          label="Ihre Geschichte"
          htmlFor="story"
          error={errors.story?.message}
          hint={`Warum möchten Sie das Wohnmobil, und wie würden Sie es nutzen? Erzählen Sie Elisabeth gern etwas über sich. · ${storyValue.length} Zeichen`}
          required
        >
          <Textarea id="story" className="min-h-[170px]" {...register("story")} />
        </FieldWrapper>

        {/* Einwilligung – gebündelt */}
        <div className="rounded-xl bg-beige/60 p-5">
          <label htmlFor="consent" className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink">
            <input
              id="consent"
              type="checkbox"
              className="mt-1 h-5 w-5 flex-none accent-green"
              {...register("consent")}
            />
            <span>
              Ich bestätige, dass meine Angaben wahrheitsgemäß sind, willige in die
              Verarbeitung meiner Daten zur Bearbeitung meiner Bewerbung ein (siehe{" "}
              <a href="/datenschutz" target="_blank" className="font-medium text-green underline">
                Datenschutzerklärung
              </a>
              ) und mir ist bewusst, dass das Absenden keinen Anspruch auf das
              Wohnmobil begründet.
            </span>
          </label>
          {errors.consent?.message && (
            <p className="ml-8 mt-1 text-xs font-medium text-red-600" role="alert">
              {errors.consent.message}
            </p>
          )}
        </div>

        <Turnstile onVerify={setCaptchaToken} />

        {serverError && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
            {serverError}
          </p>
        )}

        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto sm:justify-self-end">
          {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          {isSubmitting ? "Wird gesendet …" : "Bewerbung absenden"}
        </Button>
      </form>
    </div>
  );
}

function SuccessView({
  applicationNumber,
  firstName,
}: {
  applicationNumber: string;
  firstName: string;
}) {
  return (
    <div className="rounded-[var(--radius-card)] bg-cream p-8 text-center shadow-[var(--shadow-soft)] sm:p-12">
      <CheckCircle2 className="mx-auto mb-5 text-green" size={56} />
      <h3 className="font-serif text-2xl text-navy sm:text-3xl">
        Vielen Dank für Ihre Geschichte{firstName ? `, ${firstName}` : ""}.
      </h3>
      <p className="mx-auto mt-4 max-w-xl leading-relaxed text-ink">
        Ihre Bewerbung wurde erfolgreich übermittelt. Elisabeth kann Ihre Angaben nun
        in Ruhe prüfen und sich bei Ihnen melden, wenn weitere Informationen benötigt
        werden.
      </p>
      <div className="mx-auto mt-6 inline-block rounded-xl bg-beige px-6 py-4">
        <p className="text-sm text-ink-soft">Ihre Bewerbungsnummer</p>
        <p className="mt-1 font-serif text-2xl font-bold text-navy">{applicationNumber}</p>
      </div>
      <p className="mx-auto mt-6 max-w-xl text-sm text-ink-soft">
        Bitte bewahren Sie diese Nummer auf. Eine Bestätigung wurde zusätzlich an Ihre
        E-Mail-Adresse gesendet. Das Absenden einer Bewerbung begründet keinen Anspruch
        auf das Wohnmobil.
      </p>
    </div>
  );
}
