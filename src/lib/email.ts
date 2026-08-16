import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

const FROM = process.env.EMAIL_FROM ?? "Wohnmobilspende <onboarding@resend.dev>";
const ADMIN = process.env.EMAIL_ADMIN;

function baseTemplate(title: string, bodyHtml: string): string {
  return `<!doctype html>
  <html lang="de">
  <body style="margin:0;background:#F5F0E8;font-family:Helvetica,Arial,sans-serif;color:#3F454A;">
    <div style="max-width:560px;margin:0 auto;padding:24px;">
      <div style="background:#17324D;color:#ffffff;padding:24px;border-radius:12px 12px 0 0;">
        <h1 style="margin:0;font-size:20px;">Wohnmobilspende</h1>
      </div>
      <div style="background:#ffffff;padding:28px;border-radius:0 0 12px 12px;line-height:1.6;">
        <h2 style="margin-top:0;color:#17324D;font-size:18px;">${title}</h2>
        ${bodyHtml}
      </div>
      <p style="text-align:center;color:#8a8f94;font-size:12px;margin-top:16px;">
        Ein privates solidarisches Projekt von Elisabeth.
      </p>
    </div>
  </body>
  </html>`;
}

interface ConfirmationParams {
  to: string;
  firstName: string;
  applicationNumber: string;
}

/** Bestätigungs-E-Mail an die bewerbende Person. Keine automatische Zusage. */
export async function sendApplicationConfirmation({
  to,
  firstName,
  applicationNumber,
}: ConfirmationParams): Promise<void> {
  const html = baseTemplate(
    "Ihre Bewerbung wurde erhalten",
    `
      <p>Liebe/r ${escapeHtml(firstName)},</p>
      <p>vielen Dank für Ihre Bewerbung und dafür, dass Sie Ihre Geschichte mit
      Elisabeth geteilt haben.</p>
      <p>Ihre Bewerbung wurde erfolgreich übermittelt. Ihre Bewerbungsnummer lautet:</p>
      <p style="font-size:20px;font-weight:bold;color:#17324D;background:#F5F0E8;padding:12px 16px;border-radius:8px;display:inline-block;">
        ${escapeHtml(applicationNumber)}
      </p>
      <p>Bitte bewahren Sie diese Nummer auf. Elisabeth kann Ihre Angaben nun in
      Ruhe prüfen und sich bei Ihnen melden, wenn weitere Informationen benötigt
      werden.</p>
      <p><strong>Bitte beachten Sie:</strong> Das Absenden einer Bewerbung
      begründet keinen Anspruch auf das Wohnmobil. Elisabeth entscheidet nach
      Prüfung aller Bewerbungen persönlich, wem sie das Fahrzeug anvertrauen
      möchte.</p>
      <p>Herzliche Grüße<br />im Namen von Elisabeth</p>
    `,
  );

  if (!resend) {
    console.warn(
      "[email] RESEND_API_KEY nicht gesetzt – Bestätigungs-E-Mail wird nicht versendet.",
    );
    return;
  }

  await resend.emails.send({
    from: FROM,
    to,
    subject: "Ihre Bewerbung wurde erhalten",
    html,
  });
}

interface AdminNotifyParams {
  applicationNumber: string;
  firstName: string;
  lastName: string;
  city: string;
  email: string;
}

/** Interne Benachrichtigung an Elisabeth/Team über eine neue Bewerbung. */
export async function sendAdminNotification(
  params: AdminNotifyParams,
): Promise<void> {
  if (!resend || !ADMIN) return;

  const html = baseTemplate(
    "Neue Bewerbung eingegangen",
    `
      <p>Es ist eine neue Bewerbung eingegangen:</p>
      <ul>
        <li><strong>Nummer:</strong> ${escapeHtml(params.applicationNumber)}</li>
        <li><strong>Name:</strong> ${escapeHtml(params.firstName)} ${escapeHtml(params.lastName)}</li>
        <li><strong>Wohnort:</strong> ${escapeHtml(params.city)}</li>
        <li><strong>E-Mail:</strong> ${escapeHtml(params.email)}</li>
      </ul>
      <p>Die vollständige Bewerbung finden Sie im geschützten Admin-Bereich.</p>
    `,
  );

  try {
    await resend.emails.send({
      from: FROM,
      to: ADMIN,
      subject: `Neue Bewerbung: ${params.applicationNumber}`,
      html,
    });
  } catch (err) {
    console.error("[email] Admin-Benachrichtigung fehlgeschlagen:", err);
  }
}

interface ContactNotifyParams {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/** Weiterleitung einer Kontaktnachricht an Elisabeth/Team. */
export async function sendContactNotification(
  params: ContactNotifyParams,
): Promise<void> {
  if (!resend || !ADMIN) return;

  const html = baseTemplate(
    "Neue Nachricht über das Kontaktformular",
    `
      <ul>
        <li><strong>Name:</strong> ${escapeHtml(params.name)}</li>
        <li><strong>E-Mail:</strong> ${escapeHtml(params.email)}</li>
        <li><strong>Betreff:</strong> ${escapeHtml(params.subject)}</li>
      </ul>
      <p style="white-space:pre-wrap;">${escapeHtml(params.message)}</p>
    `,
  );

  try {
    await resend.emails.send({
      from: FROM,
      to: ADMIN,
      replyTo: params.email,
      subject: `Kontakt: ${params.subject}`,
      html,
    });
  } catch (err) {
    console.error("[email] Kontakt-Benachrichtigung fehlgeschlagen:", err);
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
