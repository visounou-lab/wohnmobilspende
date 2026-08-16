import fs from "node:fs";
import path from "node:path";
import { GALLERY_CATEGORIES } from "@/lib/content";

export interface GalleryImage {
  src: string;
  category: string;
  categoryLabel: string;
  alt: string;
}

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".svg"];

/**
 * Liest die vorhandenen Bilder aus /public/images/wohnmobil/<kategorie>.
 * Wird zur Build-Zeit (statisches Rendering) ausgeführt. Sobald echte Fotos
 * in die Ordner gelegt werden, erscheinen sie automatisch in der Galerie;
 * die mitgelieferten Platzhalter können dann entfernt werden.
 */
export function getGalleryImages(): GalleryImage[] {
  const baseDir = path.join(process.cwd(), "public", "images", "wohnmobil");
  const images: GalleryImage[] = [];

  for (const category of GALLERY_CATEGORIES) {
    const dir = path.join(baseDir, category.key);
    let files: string[] = [];
    try {
      files = fs.readdirSync(dir);
    } catch {
      continue;
    }

    const imageFiles = files.filter((f) =>
      IMAGE_EXTENSIONS.includes(path.extname(f).toLowerCase()),
    );

    // Sobald echte Fotos vorhanden sind, Platzhalter automatisch ausblenden.
    const realPhotos = imageFiles.filter((f) => !f.startsWith("platzhalter"));
    const sorted = (realPhotos.length > 0 ? realPhotos : imageFiles).sort((a, b) =>
      a.localeCompare(b, "de"),
    );

    for (const file of sorted) {
      images.push({
        src: `/images/wohnmobil/${category.key}/${file}`,
        category: category.key,
        categoryLabel: category.label,
        alt: `${category.label} – Hymer Wohnmobil`,
      });
    }
  }

  return images;
}

/**
 * Liefert das erste Bild in /public/images/<subPath> (echte Fotos vor
 * Platzhaltern). So genügt es, ein Foto in den Ordner zu legen – ohne Code
 * anzufassen. Fällt auf `fallback` zurück, falls der Ordner leer/fehlt.
 */
export function getFeatureImage(subPath: string, fallback: string): string {
  const dir = path.join(process.cwd(), "public", "images", subPath);
  try {
    const files = fs
      .readdirSync(dir)
      .filter((f) => IMAGE_EXTENSIONS.includes(path.extname(f).toLowerCase()))
      .sort((a, b) => {
        const ap = a.startsWith("platzhalter") ? 1 : 0;
        const bp = b.startsWith("platzhalter") ? 1 : 0;
        if (ap !== bp) return ap - bp;
        return a.localeCompare(b, "de");
      });
    if (files.length > 0) return `/images/${subPath}/${files[0]}`;
  } catch {
    /* Ordner fehlt – Fallback verwenden. */
  }
  return fallback;
}
