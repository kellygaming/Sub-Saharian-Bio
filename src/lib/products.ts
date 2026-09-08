export type Categorie = "visage" | "corps" | "gammes" | "complements";

export type Produit = {
  slug: string;
  nom: string;
  categorie: Categorie;
  /** Sous-catégorie affichée en surtitre de carte. */
  famille: string;
  prix: number;
  /** Prix barré, pour les promotions. */
  prixBarre?: number;
  image: string;
  /** 2 à 4 actifs ou bénéfices, affichés en pastilles. */
  tags: string[];
  badge?: "Best-seller" | "Nouveau" | "Édition limitée";
  epuise?: boolean;
};

/**
 * Catalogue provisoire relevé sur subsaharianbio.com — prix à confirmer.
 * Les visuels sont des placeholders en attendant les pack-shots.
 */
export const PRODUITS: Produit[] = [
  {
    slug: "elixir-de-marula",
    nom: "Élixir de Marula",
    categorie: "visage",
    famille: "Sérums & lotions",
    prix: 17000,
    image: "/produits/elixir-marula.jpg",
    tags: ["Marula", "Basilic", "Anti-âge"],
    badge: "Best-seller",
  },
  {
    slug: "matte-plus",
    nom: "Matte Plus",
    categorie: "visage",
    famille: "Peau mixte à grasse",
    prix: 6000,
    image: "/produits/matte-plus.jpg",
    tags: ["Matifiant", "Anti-brillance"],
  },
  {
    slug: "hydra-matte",
    nom: "Hydra Matte",
    categorie: "visage",
    famille: "Peau mixte à grasse",
    prix: 6000,
    image: "/produits/hydra-matte.jpg",
    tags: ["Hydratation", "Sébo-régulateur"],
    badge: "Best-seller",
  },
  {
    slug: "peeling-peau-neuve",
    nom: "Peeling Peau Neuve",
    categorie: "visage",
    famille: "Gommages",
    prix: 4900,
    image: "/produits/peeling-peau-neuve.jpg",
    tags: ["Éclat", "Exfoliant doux"],
  },
  {
    slug: "duo-hydra-repare-visage",
    nom: "Duo Hydra Répare",
    categorie: "gammes",
    famille: "Visage",
    prix: 11000,
    image: "/produits/duo-hydra-repare.jpg",
    tags: ["Duo", "Réparation"],
  },
  {
    slug: "savon-de-neem-125g",
    nom: "Savon de Neem 125 g",
    categorie: "corps",
    famille: "Savons & gels douches",
    prix: 5000,
    image: "/produits/savon-neem.jpg",
    tags: ["Neem", "Antiseptique", "Antibactérien"],
  },
  {
    slug: "savon-d-algues-125g",
    nom: "Savon d'Algues 125 g",
    categorie: "corps",
    famille: "Savons & gels douches",
    prix: 5000,
    image: "/produits/savon-algues.jpg",
    tags: ["Algues", "Purifiant"],
  },
  {
    slug: "tisane-anti-acne-hormonale",
    nom: "Tisane Anti-Acné Hormonale",
    categorie: "complements",
    famille: "Compléments & tisanes",
    prix: 6000,
    image: "/produits/tisane-anti-acne.jpg",
    tags: ["Bardane", "Sauge"],
    badge: "Nouveau",
  },
  {
    slug: "beaute-minerale",
    nom: "Beauté Minérale",
    categorie: "complements",
    famille: "Compléments & tisanes",
    prix: 7000,
    image: "/produits/beaute-minerale.jpg",
    tags: ["Minéraux", "Peau & cheveux"],
  },
  {
    slug: "gamme-hydra-matifiante",
    nom: "Gamme Hydra-Matifiante",
    categorie: "gammes",
    famille: "Routine complète",
    prix: 23000,
    prixBarre: 26000,
    image: "/produits/gamme-hydra-matifiante.jpg",
    tags: ["4 soins", "Peau mixte"],
    badge: "Best-seller",
  },
];

export const FILTRES: { id: Categorie | "tous"; label: string }[] = [
  { id: "tous", label: "Tous les soins" },
  { id: "visage", label: "Visage" },
  { id: "corps", label: "Corps" },
  { id: "gammes", label: "Gammes" },
  { id: "complements", label: "Compléments" },
];

export const formatPrix = (v: number) =>
  `${v.toLocaleString("fr-FR").replace(/ | /g, " ")} CFA`;
