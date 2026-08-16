/**
 * Anti-Spam-Prüfung.
 *
 * Wenn Cloudflare Turnstile konfiguriert ist (TURNSTILE_SECRET_KEY), wird das
 * Token serverseitig verifiziert. Ist Turnstile nicht konfiguriert, greift der
 * eingebaute Honeypot-/Zeitfallen-Schutz (siehe API-Routen), und diese Funktion
 * lässt die Anfrage passieren.
 */
export async function verifyCaptcha(
  token: string | undefined,
  remoteIp?: string,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  // Turnstile nicht konfiguriert -> auf Honeypot-Schutz verlassen.
  if (!secret) return true;

  if (!token) return false;

  try {
    const body = new URLSearchParams();
    body.append("secret", secret);
    body.append("response", token);
    if (remoteIp) body.append("remoteip", remoteIp);

    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      },
    );
    const data = (await res.json()) as { success: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

/** Ist Turnstile aktiv (Site-Key vorhanden)? Für die Client-Anzeige. */
export const isTurnstileEnabled = Boolean(
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
);
