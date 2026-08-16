import { NextRequest, NextResponse } from "next/server";
import { applicationSchema } from "@/lib/validation";
import { prisma } from "@/lib/prisma";
import { generateApplicationNumber } from "@/lib/application-number";
import { verifyCaptcha } from "@/lib/captcha";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import {
  sendApplicationConfirmation,
  sendAdminNotification,
} from "@/lib/email";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);

  // Rate-Limit: max. 5 Bewerbungen pro IP und Stunde.
  const limit = rateLimit(`bewerbung:${ip}`, {
    limit: 5,
    windowMs: 60 * 60 * 1000,
  });
  if (!limit.success) {
    return NextResponse.json(
      { error: "Zu viele Anfragen. Bitte versuchen Sie es später erneut." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const data = body as Record<string, unknown>;

  // Honeypot: verstecktes Feld muss leer sein.
  if (typeof data.website === "string" && data.website.length > 0) {
    // Für Bots: Erfolg vortäuschen, aber nichts speichern.
    return NextResponse.json({ applicationNumber: "WS-DE-0000-0000" });
  }

  // Zeitfalle: unrealistisch schnelles Absenden (< 3 Sekunden) ablehnen.
  if (typeof data.elapsed === "number" && data.elapsed < 3000) {
    return NextResponse.json(
      { error: "Bitte nehmen Sie sich einen Moment Zeit für Ihre Bewerbung." },
      { status: 400 },
    );
  }

  // CAPTCHA (nur aktiv, wenn Turnstile konfiguriert ist).
  const captchaOk = await verifyCaptcha(
    typeof data.captchaToken === "string" ? data.captchaToken : undefined,
    ip,
  );
  if (!captchaOk) {
    return NextResponse.json(
      { error: "Die Sicherheitsprüfung ist fehlgeschlagen. Bitte laden Sie die Seite neu." },
      { status: 400 },
    );
  }

  // Serverseitige Validierung.
  const parsed = applicationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Bitte überprüfen Sie Ihre Angaben.",
        details: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  const v = parsed.data;

  try {
    const applicationNumber = await generateApplicationNumber();

    await prisma.application.create({
      data: {
        applicationNumber,
        firstName: v.firstName,
        lastName: v.lastName,
        birthDate: v.birthDate,
        city: v.city,
        state: v.state,
        country: v.country,
        phone: v.phone,
        email: v.email,
        maritalStatus: v.maritalStatus,
        occupation: v.occupation,
        householdSize: v.householdSize,
        hasLicense: v.hasLicense,
        hadMotorhome: v.hadMotorhome,
        motivation: v.motivation,
        plannedUse: v.plannedUse,
        impact: v.impact,
        aboutYou: v.aboutYou,
        canMaintain: v.canMaintain,
        canInsure: v.canInsure,
        willingToTalk: v.willingToTalk,
        canOrganizeHandover: v.canOrganizeHandover,
      },
    });

    // E-Mails versenden (blockiert die Antwort nicht bei Fehlern).
    await Promise.allSettled([
      sendApplicationConfirmation({
        to: v.email,
        firstName: v.firstName,
        applicationNumber,
      }),
      sendAdminNotification({
        applicationNumber,
        firstName: v.firstName,
        lastName: v.lastName,
        city: v.city,
        email: v.email,
      }),
    ]);

    return NextResponse.json({ applicationNumber });
  } catch (err) {
    console.error("[bewerbung] Fehler beim Speichern:", err);
    return NextResponse.json(
      { error: "Beim Speichern ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut." },
      { status: 500 },
    );
  }
}
