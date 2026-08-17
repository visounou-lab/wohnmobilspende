import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

const FROM = process.env.EMAIL_FROM ?? "Wohnmobilspende <onboarding@resend.dev>";

// EMAIL_ADMIN kann mehrere Empfänger enthalten (durch Komma getrennt).
// Beispiel: "elisabeth@example.com, info@pro-adresse.de"
const ADMIN_LIST = (process.env.EMAIL_ADMIN ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
// Primäre Adresse (u. a. als Reply-To der Bestätigungs-E-Mail).
const ADMIN = ADMIN_LIST[0];

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
    // Antworten der bewerbenden Person landen direkt bei Elisabeth.
    ...(ADMIN ? { replyTo: ADMIN } : {}),
    subject: "Ihre Bewerbung wurde erhalten",
    html,
  });
}

export interface FullApplicationEmail {
  applicationNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  applicantType: string;
  hasLicense: boolean;
  story: string;
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:6px 12px;background:#F5F0E8;border-radius:6px 0 0 6px;font-weight:600;color:#17324D;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:6px 12px;color:#3F454A;">${value}</td>
  </tr>`;
}

function block(title: string, text: string): string {
  return `<div style="margin:14px 0;">
    <p style="margin:0 0 4px;font-weight:600;color:#17324D;">${escapeHtml(title)}</p>
    <p style="margin:0;white-space:pre-wrap;line-height:1.6;color:#3F454A;">${escapeHtml(text)}</p>
  </div>`;
}

/**
 * Vollständige Bewerbung per E-Mail an Elisabeth. Da die Verwaltung
 * ausschließlich per E-Mail erfolgt, enthält diese Nachricht ALLE Angaben.
 * Antworten geht direkt an die bewerbende Person (Reply-To).
 */
export async function sendAdminNotification(
  a: FullApplicationEmail,
): Promise<void> {
  if (!resend) {
    console.warn("[email] RESEND_API_KEY nicht gesetzt – Bewerbung wird NICHT per E-Mail versendet.");
    return;
  }
  if (ADMIN_LIST.length === 0) {
    console.warn("[email] EMAIL_ADMIN nicht gesetzt – Bewerbung kann nicht zugestellt werden.");
    return;
  }

  const table = `<table style="width:100%;border-collapse:separate;border-spacing:0 4px;font-size:14px;">
    ${row("Bewerbungsnummer", `<strong>${escapeHtml(a.applicationNumber)}</strong>`)}
    ${row("Name", `${escapeHtml(a.firstName)} ${escapeHtml(a.lastName)}`)}
    ${row("Wohnort", `${escapeHtml(a.city)}, ${escapeHtml(a.state)}`)}
    ${row("Telefon", `<a href="tel:${escapeHtml(a.phone)}">${escapeHtml(a.phone)}</a>`)}
    ${row("E-Mail", `<a href="mailto:${escapeHtml(a.email)}">${escapeHtml(a.email)}</a>`)}
    ${row("Bewirbt sich als", escapeHtml(a.applicantType))}
    ${row("Führerschein", a.hasLicense ? "Ja" : "Nein")}
  </table>`;

  const html = baseTemplate(
    `Neue Bewerbung: ${escapeHtml(a.applicationNumber)}`,
    `
      <p>Es ist eine neue Bewerbung eingegangen:</p>
      ${table}
      <hr style="border:none;border-top:1px solid #ece4d6;margin:20px 0;" />
      ${block("Die Geschichte", a.story)}
      <hr style="border:none;border-top:1px solid #ece4d6;margin:20px 0;" />
      <p style="font-size:13px;color:#6a7075;">Um zu antworten, schreiben Sie einfach direkt auf diese E-Mail – sie geht an ${escapeHtml(a.firstName)}.</p>
    `,
  );

  try {
    await resend.emails.send({
      from: FROM,
      to: ADMIN_LIST,
      replyTo: a.email,
      subject: `Neue Bewerbung: ${a.applicationNumber} – ${a.firstName} ${a.lastName}`,
      html,
    });
  } catch (err) {
    console.error("[email] Bewerbungs-E-Mail fehlgeschlagen:", err);
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
  if (!resend || ADMIN_LIST.length === 0) return;

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
      to: ADMIN_LIST,
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
