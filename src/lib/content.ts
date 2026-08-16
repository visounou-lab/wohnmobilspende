/** Zentrale Inhalte & Konstanten der Website (Deutsch). */

export const SITE = {
  name: "Wohnmobilspende",
  domain: "wohnmobilspende.com",
  title: "Hymer Wohnmobil für einen guten Zweck | Wohnmobilspende",
  description:
    "Elisabeth möchte ihrem Hymer Wohnmobil eine zweite Zukunft geben und sucht einen verantwortungsvollen Menschen, eine Familie oder Organisation in Deutschland.",
  tagline: "Ein privates solidarisches Projekt von Elisabeth",
};

export const NAV_LINKS = [
  { href: "#start", label: "Startseite" },
  { href: "#geschichte", label: "Meine Geschichte" },
  { href: "#wohnmobil", label: "Das Wohnmobil" },
  { href: "#galerie", label: "Galerie" },
  { href: "#fuer-wen", label: "Für wen?" },
  { href: "#bewerbung", label: "Bewerbung" },
  { href: "#weitere-spenden", label: "Weitere Spenden" },
  { href: "#faq", label: "Fragen & Antworten" },
  { href: "#kontakt", label: "Kontakt" },
] as const;

export const GERMAN_STATES = [
  "Baden-Württemberg",
  "Bayern",
  "Berlin",
  "Brandenburg",
  "Bremen",
  "Hamburg",
  "Hessen",
  "Mecklenburg-Vorpommern",
  "Niedersachsen",
  "Nordrhein-Westfalen",
  "Rheinland-Pfalz",
  "Saarland",
  "Sachsen",
  "Sachsen-Anhalt",
  "Schleswig-Holstein",
  "Thüringen",
  "Außerhalb Deutschlands",
] as const;

// Grundinformationen zum Fahrzeug – nur bestätigte Angaben.
export const VEHICLE_BASICS = [
  { label: "Hersteller", value: "Hymer" },
  { label: "Baujahr", value: "2014" },
  { label: "Basisfahrzeug", value: "Mercedes-Benz" },
];

// Sichtbare bzw. bestätigte Ausstattung.
export const VEHICLE_FEATURES = [
  "Küche",
  "Kühlschrank",
  "Gefrierfach",
  "Sitz- und Essbereich",
  "Fernseher",
  "Badezimmer",
  "Dusche",
  "Waschbecken",
  "WC",
  "Schlafbereich",
  "Stauraum",
  "Mercedes-Benz Fahrerhaus",
  "Außenstauraum / Heckgarage",
];

// Galerie-Kategorien (Ordner unter /public/images/wohnmobil/<key>/).
export const GALLERY_CATEGORIES = [
  { key: "aussen", label: "Außenansicht" },
  { key: "fahrerhaus", label: "Fahrerhaus" },
  { key: "wohnbereich", label: "Wohnbereich" },
  { key: "kueche", label: "Küche" },
  { key: "schlafbereich", label: "Schlafbereich" },
  { key: "bad", label: "Badezimmer" },
  { key: "stauraum", label: "Stauraum" },
] as const;

export const AUDIENCE = [
  {
    title: "Eine Familie",
    text: "Eine Familie, für die das Wohnmobil eine echte Hilfe oder neue Möglichkeit darstellen kann.",
  },
  {
    title: "Eine Einzelperson",
    text: "Ein Mensch, dessen persönliche Situation und Zukunftspläne nachvollziehbar sind.",
  },
  {
    title: "Eine Organisation",
    text: "Ein Verein, eine Initiative oder gemeinnützige Organisation mit einem konkreten Projekt.",
  },
  {
    title: "Ein soziales Projekt",
    text: "Ein Projekt, bei dem das Wohnmobil sinnvoll und langfristig eingesetzt werden kann.",
  },
];

export const FAQ_ITEMS = [
  {
    q: "Wird das Wohnmobil wirklich verschenkt?",
    a: "Ja. Elisabeth und ihr verstorbener Ehemann hatten den Wunsch, ihr Wohnmobil für einen sozialen und humanitären Zweck einzusetzen. Heute möchte Elisabeth diesem Wunsch nachkommen und das Fahrzeug einem Menschen, einer Familie oder Organisation anvertrauen, die es wirklich benötigt. Es handelt sich nicht um einen Verkauf.",
  },
  {
    q: "Kostet die Bewerbung etwas?",
    a: "Nein. Die Bewerbung selbst ist kostenlos. Für das Absenden einer Bewerbung wird kein Geld verlangt, und eine Zahlung erhöht nicht die Chance, ausgewählt zu werden.",
  },
  {
    q: "Wer entscheidet über die Vergabe?",
    a: "Elisabeth entscheidet nach Prüfung der Bewerbungen persönlich. Die Auswahl erfolgt aufgrund der persönlichen Situation, der Geschichte und des geplanten Umgangs mit dem Wohnmobil – nicht nach dem Prinzip „wer zuerst kommt“.",
  },
  {
    q: "Wann bekomme ich eine Antwort?",
    a: "Elisabeth nimmt sich bewusst Zeit, um alle Bewerbungen in Ruhe zu prüfen. Wir bitten um Verständnis, dass wir keine festen Fristen versprechen können. Sie erhalten nach dem Absenden eine Bestätigung mit Ihrer Bewerbungsnummer.",
  },
  {
    q: "Wo befindet sich das Wohnmobil?",
    a: "Der genaue Standort wird mit ernsthaft interessierten Bewerberinnen und Bewerbern persönlich besprochen. Details zur Übergabe klären wir individuell mit der ausgewählten Person.",
  },
  {
    q: "Kann sich auch ein Verein bewerben?",
    a: "Ja. Vereine, Initiativen und gemeinnützige Organisationen mit einem konkreten Projekt sind ausdrücklich eingeladen, sich zu bewerben.",
  },
  {
    q: "Kann ich mich als Familie bewerben?",
    a: "Ja. Familien, für die das Wohnmobil eine echte Hilfe oder neue Möglichkeit darstellt, sind herzlich willkommen.",
  },
  {
    q: "Wie erfolgt die Übergabe?",
    a: "Die Übergabe wird mit dem ausgewählten Empfänger individuell geklärt. Dabei müssen insbesondere Eigentumsübertragung, Fahrzeugpapiere, Zulassung, Versicherung, Transport und die jeweils geltenden gesetzlichen Anforderungen ordnungsgemäß geregelt werden.",
  },
];

// Statusbezeichnungen für das Admin-Dashboard.
export const APPLICATION_STATUS_LABELS: Record<string, string> = {
  NEU: "Neue Bewerbungen",
  IN_PRUEFUNG: "In Prüfung",
  KONTAKT: "Kontakt aufnehmen",
  VORAUSWAHL: "Vorauswahl",
  NICHT_AUSGEWAEHLT: "Nicht ausgewählt",
  AUSGEWAEHLT: "Ausgewählt",
};

export const APPLICATION_STATUS_ORDER = [
  "NEU",
  "IN_PRUEFUNG",
  "KONTAKT",
  "VORAUSWAHL",
  "AUSGEWAEHLT",
  "NICHT_AUSGEWAEHLT",
] as const;

export const DONATION_STATUS_LABELS: Record<string, string> = {
  VERFUEGBAR: "Verfügbar",
  IN_VERMITTLUNG: "In Vermittlung",
  VERGEBEN: "Vergeben",
};

export const TRISTATE_LABELS: Record<string, string> = {
  JA: "Ja",
  NEIN: "Nein",
  INFO: "Weitere Informationen nötig",
};
