# Wohnmobilspende

Website für Elisabeths Herzensprojekt: Sie möchte ihr **Hymer Wohnmobil (Baujahr 2014, Basis Mercedes-Benz)** einem ehrlichen, verantwortungsbewussten Menschen, einer Familie oder einer gemeinnützigen Organisation anvertrauen – kostenlos, ohne Verkauf, ohne Verlosung.

Die Seite erzählt zuerst Elisabeths Geschichte, stellt dann das Wohnmobil vor und bietet erst danach die Bewerbung an:

> **Geschichte → Vertrauen → Wohnmobil → Projekt → Bewerbung**

---

## Inhalt

- [Technischer Überblick](#technischer-überblick)
- [Projektstruktur](#projektstruktur)
- [Lokale Einrichtung](#lokale-einrichtung)
- [Environment Variables](#environment-variables)
- [Datenbank – Neon (Postgres)](#datenbank--neon-postgres)
- [E-Mail – Resend](#e-mail--resend)
- [Anti-Spam – Cloudflare Turnstile](#anti-spam--cloudflare-turnstile)
- [Verwaltung per E-Mail](#verwaltung-per-e-mail)
- [Echte Fotos einfügen](#echte-fotos-einfügen)
- [Deployment auf Vercel](#deployment-auf-vercel)
- [DNS-Konfiguration (wohnmobilspende.com)](#dns-konfiguration-wohnmobilspendecom)
- [Sicherheit & Datenschutz](#sicherheit--datenschutz)

---

## Technischer Überblick

| Bereich        | Technologie                                   |
| -------------- | --------------------------------------------- |
| Framework      | Next.js 15 (App Router) · TypeScript          |
| Styling        | Tailwind CSS v4                               |
| Datenbank      | **Neon (Postgres)** über Prisma ORM           |
| E-Mail         | Resend                                        |
| Formulare      | React Hook Form + Zod (Client- & Server-Validierung) |
| Anti-Spam      | Cloudflare Turnstile + Honeypot + Zeitfalle + Rate-Limiting |
| Verwaltung     | Vollständig per E-Mail (jede Bewerbung geht an Elisabeth) |
| Bilder         | next/image (AVIF/WebP)                         |
| Hosting        | Vercel                                         |

Die gesamte öffentliche Oberfläche ist auf **Deutsch**. Variablennamen und diese Dokumentation sind auf Englisch bzw. gemischt.

---

## Projektstruktur

```
src/
├── app/
│   ├── page.tsx                 # One-Page-Startseite (alle Sektionen)
│   ├── layout.tsx               # Metadaten, SEO, Open Graph, JSON-LD
│   ├── sitemap.ts / robots.ts   # SEO
│   ├── impressum, datenschutz, cookies/   # Rechtsseiten
│   └── api/
│       ├── bewerbung/           # Bewerbung entgegennehmen (speichert + mailt)
│       └── kontakt/             # Kontaktformular
├── components/                  # UI & Sektionen
└── lib/                         # prisma, email, validation, captcha, …
prisma/
├── schema.prisma                # Datenmodell (Neon/Postgres)
└── seed.ts                      # optionales Seed
public/images/                   # Fotos (Platzhalter -> echte Fotos)
scripts/db-push.mjs              # wendet das Schema beim Build an
```

---

## Lokale Einrichtung

Voraussetzung: **Node.js 20+**.

```bash
# 1. Abhängigkeiten installieren
npm install

# 2. Environment-Datei anlegen
cp .env.example .env
#    -> Werte eintragen (siehe unten)

# 3. Datenbankschema anwenden (Neon)
npm run db:push

# 4. Entwicklungsserver starten
npm run dev
```

Produktionsbuild lokal prüfen:

```bash
npm run build   # muss fehlerfrei durchlaufen
npm start
```

> Der Build läuft auch **ohne** Datenbank fehlerfrei durch – der Bereich „Weitere Spenden“ bleibt dann leer.

---

## Environment Variables

Alle Variablen sind in [`.env.example`](./.env.example) dokumentiert.

| Variable                          | Pflicht | Beschreibung |
| --------------------------------- | :-----: | ------------ |
| `DATABASE_URL`                    | ✅ | Neon Pooled-Verbindung (mit `-pooler`) für die Laufzeit |
| `DIRECT_URL`                      | ✅ | Neon Direktverbindung (ohne `-pooler`) für `prisma db push` |
| `NEXT_PUBLIC_SITE_URL`            | ✅ | Öffentliche URL, z. B. `https://wohnmobilspende.com` |
| `RESEND_API_KEY`                  | ✅ | API-Key für den E-Mail-Versand (ohne: keine Bewerbungs-Mails) |
| `EMAIL_FROM`                      | ✅ | Absenderadresse (verifizierte Resend-Domain) |
| `EMAIL_ADMIN`                     | ✅ | Adresse von Elisabeth – hierhin geht jede Bewerbung |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`  | ⬜ | Cloudflare-Turnstile Site-Key |
| `TURNSTILE_SECRET_KEY`            | ⬜ | Cloudflare-Turnstile Secret-Key |

Die Verwaltung erfolgt vollständig per E-Mail: Jede Bewerbung wird gespeichert
**und** vollständig an `EMAIL_ADMIN` gesendet. Daher sind die Resend-Variablen
für den produktiven Betrieb erforderlich.

**Niemals** echte Secrets committen. In Produktion werden alle Werte in den **Vercel Environment Variables** gepflegt.

---

## Datenbank – Neon (Postgres)

1. Bei [neon.tech](https://neon.tech) ein Projekt erstellen (Region z. B. **EU / Frankfurt** für DSGVO).
2. Im Neon-Dashboard unter **Connection Details** zwei Verbindungsstrings kopieren:
   - **Pooled connection** (Host enthält `-pooler`) → `DATABASE_URL`
   - **Direct connection** (ohne `-pooler`) → `DIRECT_URL`
   - Jeweils mit `?sslmode=require`.
3. Schema anwenden:
   ```bash
   npm run db:push
   ```
4. Optionaler Beispiel-Seed: `npm run db:seed`

> **Vercel-Integration (empfohlen):** Im Vercel-Projekt unter **Storage → Neon** eine Datenbank verbinden. Vercel legt `DATABASE_URL` / `DIRECT_URL` automatisch an. Diese Website ist genau darauf ausgelegt.

Datenmodell (Auszug): `Application` (Bewerbungen), `ContactMessage`, `Donation` (weitere Sachspenden), `Counter` (fortlaufende Bewerbungsnummer).

---

## E-Mail – Resend

1. Konto bei [resend.com](https://resend.com) anlegen.
2. Domain `wohnmobilspende.com` verifizieren (DNS-Einträge setzen).
3. API-Key erstellen → `RESEND_API_KEY`.
4. `EMAIL_FROM` (z. B. `Wohnmobilspende <bewerbung@wohnmobilspende.com>`) und `EMAIL_ADMIN` setzen.

Ohne konfiguriertes Resend funktioniert die Bewerbung weiterhin (sie wird gespeichert), es werden lediglich keine E-Mails versendet. Die Bestätigungs-E-Mail enthält **niemals** eine automatische Zusage.

---

## Anti-Spam – Cloudflare Turnstile

Optional, aber empfohlen. Bei [dash.cloudflare.com](https://dash.cloudflare.com) → **Turnstile** ein Widget anlegen und Keys in `NEXT_PUBLIC_TURNSTILE_SITE_KEY` und `TURNSTILE_SECRET_KEY` eintragen.

Ist Turnstile **nicht** konfiguriert, greifen automatisch die eingebauten Schutzmechanismen: verstecktes Honeypot-Feld, Zeitfalle (zu schnelles Absenden) und Rate-Limiting pro IP.

---

## Verwaltung per E-Mail

Es gibt **bewusst keinen Admin-Bereich**. Die gesamte Verwaltung läuft über
Elisabeths E-Mail-Postfach:

- Jede abgesendete Bewerbung wird **vollständig** (alle Angaben inkl. Geschichte,
  Kontaktdaten, Bewerbungsnummer) an `EMAIL_ADMIN` gesendet.
- Die **Reply-To**-Adresse ist die der bewerbenden Person – Elisabeth kann also
  direkt aus ihrem E-Mail-Programm antworten.
- Kontaktnachrichten gehen ebenfalls an `EMAIL_ADMIN`.
- Zusätzlich wird jede Bewerbung in der Neon-Datenbank gespeichert (Sicherung +
  fortlaufende Bewerbungsnummer). Ein Zugriff darauf ist bei Bedarf über die
  Neon-Konsole oder `npx prisma studio` möglich.

---

## Echte Fotos einfügen

Die Platzhalterbilder liegen unter `public/images/`. Echte Fotos einfach in die passenden Ordner legen – die Galerie liest die Ordner automatisch aus und zeigt echte Fotos **vor** Platzhaltern.

```
public/images/wohnmobil/aussen/         # Außenansicht
public/images/wohnmobil/fahrerhaus/     # Fahrerhaus
public/images/wohnmobil/wohnbereich/    # Wohnbereich
public/images/wohnmobil/kueche/         # Küche
public/images/wohnmobil/schlafbereich/  # Schlafbereich
public/images/wohnmobil/bad/            # Badezimmer
public/images/wohnmobil/stauraum/       # Stauraum
public/images/elisabeth/                # Foto von Elisabeth (elisabeth.svg ersetzen)
public/images/hero/                     # Hauptbild (hymer-hero.svg ersetzen)
```

Empfohlen: Fotos als `.webp` oder `.jpg`, Querformat ~1600 px Breite. Anschließend die `platzhalter-*.svg` löschen. Für das Hero- und Elisabeth-Bild die gleichnamige Datei ersetzen **oder** den Dateipfad in `src/components/sections/Hero.tsx` bzw. `Story.tsx` anpassen.

---

## Deployment auf Vercel

1. Repository zu GitHub pushen.
2. Auf [vercel.com](https://vercel.com) **New Project** → GitHub-Repo importieren.
3. Framework wird automatisch als **Next.js** erkannt. Build Command `npm run build`, Output Directory Standard.
4. **Environment Variables** aus `.env.example` im Vercel-Dashboard eintragen (Production + Preview).
5. **Storage → Neon** verbinden (setzt `DATABASE_URL`/`DIRECT_URL`) **oder** die Werte manuell eintragen.
6. Deployen. Beim ersten Deploy wird das Schema über Prisma erwartet – falls nötig einmalig lokal `npm run db:push` gegen die Produktionsdatenbank ausführen.

---

## DNS-Konfiguration (wohnmobilspende.com)

Domain in Vercel unter **Settings → Domains** hinzufügen: sowohl `wohnmobilspende.com` als auch `www.wohnmobilspende.com`.

Beim Domain-Registrar folgende Einträge setzen (Vercel zeigt die exakten Werte an):

| Typ   | Name  | Wert                     | Zweck                     |
| ----- | ----- | ------------------------ | ------------------------- |
| A     | `@`   | `76.76.21.21`            | Root-Domain → Vercel      |
| CNAME | `www` | `cname.vercel-dns.com`   | www → Vercel              |

In Vercel eine der beiden Varianten als primär festlegen; die andere wird automatisch per **301** weitergeleitet (z. B. `www` → Root). **HTTPS** wird von Vercel automatisch per Let’s-Encrypt-Zertifikat bereitgestellt.

---

## Sicherheit & Datenschutz

- **HTTPS** erzwungen (HSTS-Header), strenge Security-Header inkl. Content-Security-Policy (`next.config.ts`).
- **Server-seitige Validierung** aller Formulare mit Zod.
- **Rate-Limiting**, Honeypot, Zeitfalle und optional CAPTCHA.
- **Kein öffentlich zugänglicher Verwaltungsbereich** – keine Angriffsfläche über ein Login.
- **Datenminimierung:** keine Ausweiskopien bei der Erstbewerbung.
- Bewerbungen werden **nicht** öffentlich angezeigt und per `robots.txt` von der Indexierung ausgeschlossen.
- Löschung von Bewerbungen jederzeit möglich (Neon-Konsole / `prisma studio`, DSGVO Art. 17).
- **Impressum** und **Datenschutzerklärung** sind als Vorlagen enthalten und müssen von der Betreiberin mit echten Angaben vervollständigt werden (mit `[BITTE ERGÄNZEN]` markiert).

---

_Ein privates solidarisches Projekt. Kein Verkauf · Keine Verlosung · Kostenlose Bewerbung._
