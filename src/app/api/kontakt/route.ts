import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { prisma } from "@/lib/prisma";
import { verifyCaptcha } from "@/lib/captcha";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { sendContactNotification } from "@/lib/email";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);

  const limit = rateLimit(`kontakt:${ip}`, {
    limit: 8,
    windowMs: 60 * 60 * 1000,
  });
  if (!limit.success) {
    return NextResponse.json(
      { error: "Zu viele Anfragen. Bitte versuchen Sie es später erneut." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const data = body as Record<string, unknown>;

  if (typeof data.website === "string" && data.website.length > 0) {
    return NextResponse.json({ ok: true }); // Honeypot: Bot still ablehnen.
  }
  if (typeof data.elapsed === "number" && data.elapsed < 2000) {
    return NextResponse.json({ error: "Bitte versuchen Sie es erneut." }, { status: 400 });
  }

  const captchaOk = await verifyCaptcha(
    typeof data.captchaToken === "string" ? data.captchaToken : undefined,
    ip,
  );
  if (!captchaOk) {
    return NextResponse.json(
      { error: "Die Sicherheitsprüfung ist fehlgeschlagen." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Bitte überprüfen Sie Ihre Angaben." },
      { status: 422 },
    );
  }

  const v = parsed.data;

  try {
    await prisma.contactMessage.create({
      data: {
        name: v.name,
        email: v.email,
        subject: v.subject,
        message: v.message,
      },
    });
    await sendContactNotification({
      name: v.name,
      email: v.email,
      subject: v.subject,
      message: v.message,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[kontakt] Fehler:", err);
    return NextResponse.json(
      { error: "Ihre Nachricht konnte nicht gesendet werden." },
      { status: 500 },
    );
  }
}
