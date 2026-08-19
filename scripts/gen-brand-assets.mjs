/**
 * Erzeugt Favicon, Apple-Touch-Icon und Open-Graph-Bild aus dem Logo.
 * Einmalig ausführen: node scripts/gen-brand-assets.mjs
 */
import sharp from "sharp";

const LOGO = "public/images/logo/logo.png";

// Hintergrundfarbe aus der Ecke des Logos übernehmen (nahtloser Übergang).
const raw = await sharp(LOGO).extract({ left: 0, top: 0, width: 4, height: 4 }).raw().toBuffer();
const bg = { r: raw[0], g: raw[1], b: raw[2], alpha: 1 };
console.log("[brand] Ecke des Logos:", bg);

// Favicon (Browser-Tab)
await sharp(LOGO).resize(256, 256).png().toFile("src/app/icon.png");
// Apple-Touch-Icon
await sharp(LOGO).resize(180, 180).png().toFile("src/app/apple-icon.png");

// Open-Graph-Bild 1200x630 – Logo mittig auf passender Hintergrundfarbe.
const logo = await sharp(LOGO)
  .resize(560, 560, { fit: "contain", background: bg })
  .toBuffer();
await sharp({
  create: { width: 1200, height: 630, channels: 3, background: bg },
})
  .composite([{ input: logo, gravity: "centre" }])
  .png()
  .toFile("src/app/opengraph-image.png");

console.log("[brand] icon.png, apple-icon.png, opengraph-image.png erzeugt.");
