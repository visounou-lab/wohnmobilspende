import { z } from "zod";
import { APPLICANT_TYPES } from "@/lib/content";

const jaNein = z.enum(["JA", "NEIN"], {
  errorMap: () => ({ message: "Bitte wählen Sie Ja oder Nein." }),
});

// Hilfsfunktion für Boolean-Felder, die als "JA"/"NEIN" ins Formular kommen.
const jaNeinToBoolean = jaNein.transform((v) => v === "JA");

// Bewusst schlankes Formular – schnell auszufüllen. Im Mittelpunkt steht die
// persönliche Geschichte; alles andere ist auf das Nötigste reduziert.
export const applicationSchema = z.object({
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
  email: z
    .string()
    .trim()
    .min(1, "Bitte geben Sie Ihre E-Mail-Adresse an.")
    .email("Bitte geben Sie eine gültige E-Mail-Adresse an."),
  phone: z
    .string()
    .trim()
    .min(6, "Bitte geben Sie eine gültige Telefonnummer an.")
    .max(40, "Die Telefonnummer ist zu lang.")
    .regex(/^[0-9+()/\s-]+$/, "Die Telefonnummer enthält ungültige Zeichen."),
  city: z
    .string()
    .trim()
    .min(2, "Bitte geben Sie Ihren Wohnort an.")
    .max(120, "Der Wohnort ist zu lang."),
  state: z.string().trim().min(2, "Bitte wählen Sie Ihr Bundesland."),
  applicantType: z.enum(APPLICANT_TYPES, {
    errorMap: () => ({ message: "Bitte treffen Sie eine Auswahl." }),
  }),
  hasLicense: jaNeinToBoolean,

  // Der Kern der Bewerbung: die persönliche Geschichte.
  story: z
    .string()
    .trim()
    .min(50, "Bitte erzählen Sie in ein paar Sätzen mehr über sich (mind. 50 Zeichen).")
    .max(5000, "Der Text ist zu lang (max. 5000 Zeichen)."),

  // Eine gebündelte Pflicht-Einwilligung.
  consent: z.literal(true, {
    errorMap: () => ({
      message: "Bitte bestätigen Sie die Einwilligung, um fortzufahren.",
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
