import { z } from "zod";

// Auswahloptionen für die "Ja / Nein / Info"-Felder.
export const triStateValues = ["JA", "NEIN", "INFO"] as const;

const jaNein = z.enum(["JA", "NEIN"], {
  errorMap: () => ({ message: "Bitte wählen Sie Ja oder Nein." }),
});

const triState = z.enum(triStateValues, {
  errorMap: () => ({ message: "Bitte treffen Sie eine Auswahl." }),
});

// Hilfsfunktion für Boolean-Felder, die als "JA"/"NEIN" ins Formular kommen.
const jaNeinToBoolean = jaNein.transform((v) => v === "JA");

export const applicationSchema = z.object({
  // Schritt 1 – Über Sie
  firstName: z
    .string()
    .trim()
    .min(2, "Bitte geben Sie Ihren Vornamen an.")
    .max(80, "Der Vorname ist zu lang."),
  lastName: z
    .string()
    .trim()
    .min(2, "Bitte geben Sie Ihren Nachnamen an.")
    .max(80, "Der Nachname ist zu lang."),
  birthDate: z
    .string()
    .trim()
    .min(1, "Bitte geben Sie Ihr Geburtsdatum an.")
    .refine((v) => {
      const d = new Date(v);
      if (Number.isNaN(d.getTime())) return false;
      const now = new Date();
      const age = now.getFullYear() - d.getFullYear();
      return age >= 18 && age <= 110;
    }, "Bitte geben Sie ein gültiges Geburtsdatum an (Mindestalter 18 Jahre)."),
  city: z
    .string()
    .trim()
    .min(2, "Bitte geben Sie Ihren Wohnort an.")
    .max(120, "Der Wohnort ist zu lang."),
  state: z.string().trim().min(2, "Bitte geben Sie Ihr Bundesland an."),
  country: z.string().trim().min(2, "Bitte geben Sie Ihr Land an."),
  phone: z
    .string()
    .trim()
    .min(6, "Bitte geben Sie eine gültige Telefonnummer an.")
    .max(40, "Die Telefonnummer ist zu lang.")
    .regex(/^[0-9+()/\s-]+$/, "Die Telefonnummer enthält ungültige Zeichen."),
  email: z
    .string()
    .trim()
    .min(1, "Bitte geben Sie Ihre E-Mail-Adresse an.")
    .email("Bitte geben Sie eine gültige E-Mail-Adresse an."),

  // Schritt 2 – Ihre Situation
  maritalStatus: z
    .string()
    .trim()
    .min(2, "Bitte beschreiben Sie Ihre Familiensituation.")
    .max(120),
  occupation: z
    .string()
    .trim()
    .min(2, "Bitte geben Sie Ihren Beruf oder Ihre Tätigkeit an.")
    .max(160),
  householdSize: z.coerce
    .number({ invalid_type_error: "Bitte geben Sie eine Zahl an." })
    .int("Bitte geben Sie eine ganze Zahl an.")
    .min(1, "Bitte geben Sie die Anzahl der Personen an.")
    .max(30, "Bitte geben Sie eine realistische Anzahl an."),
  hasLicense: jaNeinToBoolean,
  hadMotorhome: jaNeinToBoolean,

  // Schritt 3 – Ihre Geschichte
  motivation: z
    .string()
    .trim()
    .min(300, "Bitte erzählen Sie ausführlicher – empfohlen sind mindestens 300 Zeichen.")
    .max(5000, "Der Text ist zu lang (max. 5000 Zeichen)."),
  plannedUse: z
    .string()
    .trim()
    .min(20, "Bitte beschreiben Sie kurz, wie Sie das Wohnmobil nutzen würden.")
    .max(3000),
  impact: z
    .string()
    .trim()
    .min(20, "Bitte beschreiben Sie kurz, was sich verändern würde.")
    .max(3000),
  aboutYou: z
    .string()
    .trim()
    .min(20, "Bitte erzählen Sie Elisabeth etwas über sich.")
    .max(3000),

  // Schritt 4 – Verantwortung
  canMaintain: jaNeinToBoolean,
  canInsure: triState,
  willingToTalk: jaNeinToBoolean,
  canOrganizeHandover: triState,

  // Einwilligung
  consentTruth: z.literal(true, {
    errorMap: () => ({
      message: "Bitte bestätigen Sie diese Einwilligung, um fortzufahren.",
    }),
  }),
  consentNoRight: z.literal(true, {
    errorMap: () => ({
      message: "Bitte bestätigen Sie diesen Hinweis, um fortzufahren.",
    }),
  }),

  // Anti-Spam
  captchaToken: z.string().optional(),
  // Honeypot – muss leer bleiben.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ApplicationInput = z.input<typeof applicationSchema>;
export type ApplicationParsed = z.output<typeof applicationSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Bitte geben Sie Ihren Namen an.").max(120),
  email: z
    .string()
    .trim()
    .min(1, "Bitte geben Sie Ihre E-Mail-Adresse an.")
    .email("Bitte geben Sie eine gültige E-Mail-Adresse an."),
  subject: z.string().trim().min(2, "Bitte geben Sie einen Betreff an.").max(160),
  message: z
    .string()
    .trim()
    .min(10, "Bitte formulieren Sie Ihre Nachricht etwas ausführlicher.")
    .max(3000),
  captchaToken: z.string().optional(),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
