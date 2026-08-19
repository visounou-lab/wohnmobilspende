import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { Hero } from "@/components/sections/Hero";
import { Story } from "@/components/sections/Story";
import { Vehicle } from "@/components/sections/Vehicle";
import { Gallery } from "@/components/sections/Gallery";
import { Audience } from "@/components/sections/Audience";
import { ApplicationSection } from "@/components/sections/ApplicationSection";
import { Transparency } from "@/components/sections/Transparency";
import { OtherDonations, type DonationItem } from "@/components/sections/OtherDonations";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { getGalleryImages, getFeatureImage } from "@/lib/gallery";
import { prisma } from "@/lib/prisma";

// Alle 60 Minuten neu generieren (ISR). Bleibt bei nicht erreichbarer
// Datenbank (z. B. lokaler Build ohne DB) dank Fehlerbehandlung baubar.
export const revalidate = 3600;

async function getPublishedDonations(): Promise<DonationItem[]> {
  // Ohne konfigurierte Datenbank (z. B. lokaler Build) den Abschnitt leer lassen.
  if (!process.env.DATABASE_URL) return [];
  try {
    const donations = await prisma.donation.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
    return donations.map((d) => ({
      id: d.id,
      title: d.title,
      description: d.description,
      category: d.category,
      location: d.location,
      handoverRegion: d.handoverRegion,
      imageUrl: d.imageUrl,
      status: d.status,
    }));
  } catch {
    // Datenbank nicht erreichbar -> Bereich bleibt leer, Seite baut trotzdem.
    return [];
  }
}

export default async function HomePage() {
  const images = getGalleryImages();
  const donations = await getPublishedDonations();
  const logoSrc = getFeatureImage("logo", "");

  return (
    <>
      <Navbar logoSrc={logoSrc} />
      <main>
        <Hero />
        <Story />
        <Vehicle />
        <Gallery images={images} />
        <Audience />
        <ApplicationSection />
        <Transparency />
        <OtherDonations donations={donations} />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
}
