/** Zentrale Inhalte & Konstanten der Website (Deutsch). */

export const SITE = {
  name: "Wohnmobilspende",
  domain: "wohnmobilspende.site",
  title: "Wohnmobilspende | Eine karitative Initiative von Elisabeth",
  description:
    "Elisabeth verschenkt ihr Wohnmobil an einen Menschen, für den es eine echte zweite Chance bedeuten kann. Eine private Hilfsinitiative aus Nächstenliebe und Solidarität.",
  tagline: "Eine karitative Initiative von Elisabeth",
};

// Christliche Gemeinschaft (nur im Kontext von Elisabeths persönlichem Weg).
export const COMMUNITY =
  "Evangelische Tochtergemeinde A.B. Neusiedl am See – VaterUnser-Kirche";

// Bewusst schlanke Navigation – nur die wichtigsten Ankerpunkte.
export const NAV_LINKS = [
  { href: "#initiative", label: "Die Initiative" },
  { href: "#geschichte", label: "Elisabeths Geschichte" },
  { href: "#wohnmobil", label: "Das Wohnmobil" },
  { href: "#ablauf", label: "Ablauf" },
  { href: "#faq", label: "Fragen" },
  { href: "#kontakt", label: "Kontakt" },
] as const;

// Vollständige Liste (u. a. für den Footer).
export const FOOTER_LINKS = [
  { href: "#initiative", label: "Die Initiative" },
  { href: "#geschichte", label: "Elisabeths Geschichte" },
  { href: "#wohnmobil", label: "Das Wohnmobil" },
  { href: "#ablauf", label: "Ablauf" },
  { href: "#bewerbung", label: "Bewerbung" },
  { href: "#faq", label: "Fragen & Antworten" },
] as const;

// Auswahl „Ich bewerbe mich als …“ (entspricht dem Abschnitt „Für wen?“).
export const APPLICANT_TYPES = [
  "Familie",
  "Einzelperson",
  "Organisation / Verein",
  "Soziales Projekt",
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
  { label: "Modell", value: "MLT 580" },
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
    title: "Eine Familie in einer schwierigen Phase",
    text: "Eine Familie, für die das Wohnmobil eine echte Entlastung oder eine neue Möglichkeit bedeuten kann.",
  },
  {
    title: "Ein Mensch vor einem Neuanfang",
    text: "Ein Mensch, dessen persönliche Situation nachvollziehbar ist und der einen ehrlichen Neustart sucht.",
  },
  {
    title: "Ein glaubwürdiges Lebensprojekt",
    text: "Ein Vorhaben – auch eines Vereins oder einer Initiative –, bei dem das Wohnmobil sinnvoll und langfristig hilft.",
  },
  {
    title: "Eine besondere soziale Situation",
    text: "Eine menschliche Lage, in der ein Wohnmobil konkret Halt, Freiheit oder einen Zufluchtsort geben kann.",
  },
];

// „Mehr als ein Wohnmobil“ – was das Fahrzeug bedeuten kann.
export const INITIATIVE_MEANINGS = [
  {
    title: "Freiheit",
    text: "Die Möglichkeit, unterwegs zu sein, durchzuatmen und wieder nach vorne zu blicken.",
  },
  {
    title: "Ein Zufluchtsort",
    text: "Ein geschützter Raum – manchmal sogar eine vorübergehende Lösung in einer schweren Zeit.",
  },
  {
    title: "Neue Erinnerungen",
    text: "Gemeinsame Momente, Reisen und Erlebnisse, die bleiben.",
  },
  {
    title: "Ein Neuanfang",
    text: "Die Chance, ein neues Kapitel zu beginnen und Pläne wieder aufzunehmen.",
  },
];

// Werte, die aus Elisabeths Engagement in der Gemeinschaft geblieben sind.
export const VALUES = [
  "Nächstenliebe",
  "Verantwortung",
  "Mitgefühl",
  "Gemeinschaft",
  "Hoffnung",
] as const;

// Ablauf – „Wie wird entschieden?“
export const PROCESS_STEPS = [
  {
    title: "Bewerbung",
    text: "Sie schildern Ihre Situation und was das Wohnmobil für Sie oder Ihre Familie bedeuten würde.",
  },
  {
    title: "Persönliche Prüfung",
    text: "Jede Bewerbung wird einzeln und mit Sorgfalt angesehen – die Geschichte zählt mehr als das Formular.",
  },
  {
    title: "Gespräch",
    text: "Ausgewählte Bewerberinnen und Bewerber können für einen persönlichen Austausch kontaktiert werden.",
  },
  {
    title: "Auswahl",
    text: "Entscheidend sind die menschliche Situation und der geplante Umgang mit dem Wohnmobil – kein finanzielles Gebot.",
  },
  {
    title: "Übergabe",
    text: "Die Übergabe wird transparent organisiert: Eigentumsübertragung, Fahrzeugpapiere, Zulassung, Versicherung und Transport werden ordnungsgemäß geregelt.",
  },
];

export const FAQ_ITEMS = [
  {
    q: "Wird das Wohnmobil wirklich verschenkt?",
    a: "Ja. Aus christlicher Nächstenliebe möchte Elisabeth ihr Wohnmobil nicht verkaufen, sondern einem Menschen oder einer Familie schenken, für die es einen echten Neuanfang bedeuten kann. Diese Hilfsinitiative ist aus vielen Jahren des Engagements in der christlichen Gemeinschaft entstanden. Es handelt sich nicht um einen Verkauf.",
  },
  {
    q: "Steht die Evangelische Kirche hinter dem Projekt?",
    a: "Diese Initiative wird privat von Elisabeth getragen. Sie ist von christlichen Werten und ihrem langjährigen Engagement in der evangelischen Gemeinschaft in Neusiedl am See geprägt – sie ist jedoch kein offizielles Angebot der Evangelischen Kirche, sofern nicht ausdrücklich anders angegeben.",
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

export const DONATION_STATUS_LABELS: Record<string, string> = {
  VERFUEGBAR: "Verfügbar",
  IN_VERMITTLUNG: "In Vermittlung",
  VERGEBEN: "Vergeben",
};
