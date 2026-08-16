"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Send, CheckCircle2, Loader2 } from "lucide-react";
import { FieldWrapper, Input, Textarea, Select, RadioGroup } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Turnstile } from "@/components/Turnstile";
import {
  applicationSchema,
  type ApplicationInput,
} from "@/lib/validation";
import { GERMAN_STATES } from "@/lib/content";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "ws-bewerbung-entwurf";

const jaNein = [
  { value: "JA", label: "Ja" },
  { value: "NEIN", label: "Nein" },
];
const jaNeinInfo = [
  { value: "JA", label: "Ja" },
  { value: "NEIN", label: "Nein" },
  { value: "INFO", label: "Ich benötige weitere Informationen" },
];
const jaNeinStandort = [
  { value: "JA", label: "Ja" },
  { value: "NEIN", label: "Nein" },
  { value: "INFO", label: "Abhängig vom Standort" },
];

const STEPS = [
  { title: "Über Sie", fields: ["firstName", "lastName", "birthDate", "city", "state", "country", "phone", "email"] },
  { title: "Ihre Situation", fields: ["maritalStatus", "occupation", "householdSize", "hasLicense", "hadMotorhome"] },
  { title: "Ihre Geschichte", fields: ["motivation", "plannedUse", "impact", "aboutYou"] },
  { title: "Verantwortung", fields: ["canMaintain", "canInsure", "willingToTalk", "canOrganizeHandover", "consentTruth", "consentNoRight"] },
] as const;

type FieldName = keyof ApplicationInput;

export function ApplicationForm() {
  const [step, setStep] = useState(0);
  const [captchaToken, setCaptchaToken] = useState("");
  const [serverError, setServerError] = useState<string | null>(null);
  const [result, setResult] = useState<{ applicationNumber: string; firstName: string } | null>(null);
  const startTime = useRef(Date.now());

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationInput>({
    resolver: zodResolver(applicationSchema),
    mode: "onTouched",
    defaultValues: { country: "Deutschland" },
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
        const { ...rest } = value;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
      } catch {
        /* ignore */
      }
    });
    return () => sub.unsubscribe();
  }, [watch]);

  const motivationValue = watch("motivation") ?? "";

  const goNext = async () => {
    const valid = await trigger([...STEPS[step].fields] as FieldName[]);
    if (valid) {
      setStep((s) => Math.min(s + 1, STEPS.length - 1));
      window.scrollTo({ top: document.getElementById("bewerbung")?.offsetTop ?? 0, behavior: "smooth" });
    }
  };

  const goBack = () => {
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: document.getElementById("bewerbung")?.offsetTop ?? 0, behavior: "smooth" });
  };

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
      window.scrollTo({ top: document.getElementById("bewerbung")?.offsetTop ?? 0, behavior: "smooth" });
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Fehler beim Absenden.");
    }
  };

  if (result) {
    return <SuccessView applicationNumber={result.applicationNumber} firstName={result.firstName} />;
  }

  return (
    <div className="rounded-[var(--radius-card)] bg-cream p-6 shadow-[var(--shadow-soft)] sm:p-9">
      {/* Fortschrittsanzeige */}
      <ol className="mb-8 grid grid-cols-4 gap-2">
        {STEPS.map((s, i) => (
          <li key={s.title} className="flex flex-col gap-2">
            <span
              className={cn(
                "h-1.5 rounded-full transition-colors",
                i <= step ? "bg-green" : "bg-beige-deep",
              )}
            />
            <span
              className={cn(
                "text-xs font-medium sm:text-sm",
                i === step ? "text-navy" : "text-ink-soft",
              )}
            >
              <span className="hidden sm:inline">Schritt {i + 1}: </span>
              {s.title}
            </span>
          </li>
        ))}
      </ol>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Honeypot */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
          {...register("website")}
        />

        {/* Schritt 1 */}
        {step === 0 && (
          <div className="grid gap-5 sm:grid-cols-2">
            <FieldWrapper label="Vorname" htmlFor="firstName" error={errors.firstName?.message} required>
              <Input id="firstName" autoComplete="given-name" {...register("firstName")} />
            </FieldWrapper>
            <FieldWrapper label="Nachname" htmlFor="lastName" error={errors.lastName?.message} required>
              <Input id="lastName" autoComplete="family-name" {...register("lastName")} />
            </FieldWrapper>
            <FieldWrapper label="Geburtsdatum" htmlFor="birthDate" error={errors.birthDate?.message} required>
              <Input id="birthDate" type="date" {...register("birthDate")} />
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
            <FieldWrapper label="Land" htmlFor="country" error={errors.country?.message} required>
              <Input id="country" autoComplete="country-name" {...register("country")} />
            </FieldWrapper>
            <FieldWrapper label="Telefonnummer" htmlFor="phone" error={errors.phone?.message} required>
              <Input id="phone" type="tel" autoComplete="tel" {...register("phone")} />
            </FieldWrapper>
            <FieldWrapper label="E-Mail-Adresse" htmlFor="email" error={errors.email?.message} required>
              <Input id="email" type="email" autoComplete="email" {...register("email")} />
            </FieldWrapper>
          </div>
        )}

        {/* Schritt 2 */}
        {step === 1 && (
          <div className="grid gap-5">
            <FieldWrapper label="Familienstand / Familiensituation" htmlFor="maritalStatus" error={errors.maritalStatus?.message} required>
              <Input id="maritalStatus" placeholder="z. B. verheiratet, Familie mit zwei Kindern …" {...register("maritalStatus")} />
            </FieldWrapper>
            <FieldWrapper label="Beruf oder Tätigkeit" htmlFor="occupation" error={errors.occupation?.message} required>
              <Input id="occupation" {...register("occupation")} />
            </FieldWrapper>
            <FieldWrapper label="Anzahl der Personen im Haushalt" htmlFor="householdSize" error={errors.householdSize?.message} required>
              <Input id="householdSize" type="number" min={1} max={30} className="max-w-[160px]" {...register("householdSize")} />
            </FieldWrapper>
            <FieldWrapper label="Besitzen Sie einen gültigen Führerschein?" error={errors.hasLicense?.message} required>
              <RadioGroup options={jaNein} register={register("hasLicense")} error={errors.hasLicense?.message} />
            </FieldWrapper>
            <FieldWrapper label="Hatten Sie bereits ein Wohnmobil?" error={errors.hadMotorhome?.message} required>
              <RadioGroup options={jaNein} register={register("hadMotorhome")} error={errors.hadMotorhome?.message} />
            </FieldWrapper>
          </div>
        )}

        {/* Schritt 3 */}
        {step === 2 && (
          <div className="grid gap-5">
            <FieldWrapper
              label="Warum möchten Sie dieses Wohnmobil erhalten?"
              htmlFor="motivation"
              error={errors.motivation?.message}
              hint={`${motivationValue.length} Zeichen · empfohlene Mindestlänge 300 Zeichen`}
              required
            >
              <Textarea id="motivation" className="min-h-[180px]" {...register("motivation")} />
            </FieldWrapper>
            <FieldWrapper label="Wie würden Sie das Wohnmobil nutzen?" htmlFor="plannedUse" error={errors.plannedUse?.message} required>
              <Textarea id="plannedUse" {...register("plannedUse")} />
            </FieldWrapper>
            <FieldWrapper label="Was würde das Wohnmobil in Ihrem Leben oder für Ihr Projekt verändern?" htmlFor="impact" error={errors.impact?.message} required>
              <Textarea id="impact" {...register("impact")} />
            </FieldWrapper>
            <FieldWrapper label="Erzählen Sie Elisabeth etwas über sich und Ihre Familie oder Ihr Projekt." htmlFor="aboutYou" error={errors.aboutYou?.message} required>
              <Textarea id="aboutYou" {...register("aboutYou")} />
            </FieldWrapper>
          </div>
        )}

        {/* Schritt 4 */}
        {step === 3 && (
          <div className="grid gap-6">
            <FieldWrapper label="Können Sie sich langfristig um Wartung und Pflege des Wohnmobils kümmern?" error={errors.canMaintain?.message} required>
              <RadioGroup options={jaNein} register={register("canMaintain")} error={errors.canMaintain?.message} />
            </FieldWrapper>
            <FieldWrapper label="Können Sie das Fahrzeug ordnungsgemäß versichern?" error={errors.canInsure?.message} required>
              <RadioGroup options={jaNeinInfo} register={register("canInsure")} error={errors.canInsure?.message} />
            </FieldWrapper>
            <FieldWrapper label="Sind Sie bereit, persönlich mit Elisabeth oder einer von ihr beauftragten Person zu sprechen?" error={errors.willingToTalk?.message} required>
              <RadioGroup options={jaNein} register={register("willingToTalk")} error={errors.willingToTalk?.message} />
            </FieldWrapper>
            <FieldWrapper label="Wären Sie grundsätzlich in der Lage, die Übergabe des Fahrzeugs zu organisieren?" error={errors.canOrganizeHandover?.message} required>
              <RadioGroup options={jaNeinStandort} register={register("canOrganizeHandover")} error={errors.canOrganizeHandover?.message} />
            </FieldWrapper>

            {/* Einwilligungen */}
            <div className="space-y-4 rounded-xl bg-beige/60 p-5">
              <Consent
                id="consentTruth"
                error={errors.consentTruth?.message}
                register={register("consentTruth")}
              >
                Ich bestätige, dass meine Angaben wahrheitsgemäß sind und willige ein,
                dass meine Daten ausschließlich zur Bearbeitung meiner Bewerbung
                verarbeitet werden. Weitere Informationen finden Sie in der{" "}
                <a href="/datenschutz" target="_blank" className="font-medium text-green underline">
                  Datenschutzerklärung
                </a>
                .
              </Consent>
              <Consent
                id="consentNoRight"
                error={errors.consentNoRight?.message}
                register={register("consentNoRight")}
              >
                Mir ist bewusst, dass das Absenden einer Bewerbung keinen Anspruch auf
                das Wohnmobil begründet.
              </Consent>
            </div>

            <Turnstile onVerify={setCaptchaToken} />
          </div>
        )}

        {serverError && (
          <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
            {serverError}
          </p>
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between gap-4">
          {step > 0 ? (
            <Button type="button" variant="secondary" onClick={goBack}>
              <ArrowLeft size={18} />
              Zurück
            </Button>
          ) : (
            <span />
          )}

          {step < STEPS.length - 1 ? (
            <Button type="button" onClick={goNext}>
              Weiter
              <ArrowRight size={18} />
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              {isSubmitting ? "Wird gesendet …" : "Bewerbung absenden"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

function Consent({
  id,
  error,
  register,
  children,
}: {
  id: string;
  error?: string;
  register: React.InputHTMLAttributes<HTMLInputElement>;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink">
        <input
          id={id}
          type="checkbox"
          className="mt-1 h-5 w-5 flex-none accent-green"
          {...register}
        />
        <span>{children}</span>
      </label>
      {error && (
        <p className="ml-8 mt-1 text-xs font-medium text-red-600" role="alert">
          {error}
        </p>
      )}
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
