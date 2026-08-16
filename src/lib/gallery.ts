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

    const sorted = files
      .filter((f) => IMAGE_EXTENSIONS.includes(path.extname(f).toLowerCase()))
      // Echte Fotos vor Platzhaltern anzeigen.
      .sort((a, b) => {
        const aPlaceholder = a.startsWith("platzhalter") ? 1 : 0;
        const bPlaceholder = b.startsWith("platzhalter") ? 1 : 0;
        if (aPlaceholder !== bPlaceholder) return aPlaceholder - bPlaceholder;
        return a.localeCompare(b, "de");
      });

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
