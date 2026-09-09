import type { EtapePeau } from "@/components/SkinJourney";

const CDN =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3HJdujTPUatDr1wioMxqGRiB5kw";

/** Visuels générés sur Higgsfield — même modèle sur les trois étapes. */
export const ETAPES_PEAU: [EtapePeau, EtapePeau, EtapePeau] = [
  {
    titre: "Jour 1",
    sousTitre: "On commence.",
    texte:
      "Boutons, taches et brillance : une peau à tendance acnéique, comme beaucoup d'entre nous.",
    image: `${CDN}/hf_20260909_080410_19239bec-610d-4704-97f2-13d700446004.png`,
  },
  {
    titre: "Semaine 1",
    sousTitre: "Ça s'apaise.",
    texte:
      "Le savon de Neem assainit, le sérum cible les boutons. Les rougeurs s'estompent, le grain s'affine.",
    image: `${CDN}/hf_20260909_080409_917d362b-d4b8-41d2-9929-e042e24df900.png`,
  },
  {
    titre: "Semaine 2",
    sousTitre: "Elle rayonne.",
    texte:
      "Teint unifié, taches atténuées, peau nette. La routine devient un geste plaisir.",
    image: `${CDN}/hf_20260909_080005_e553e7c3-db41-4275-9699-f2db1a54d77f.png`,
  },
];

export const PRODUIT_PARCOURS = {
  nom: "Savon de Neem + Sérum Anti-Imperfections",
  famille: "Routine anti-acné",
  prix: "À partir de 5 000 CFA",
  image: "/produits/duo-neem-serum.jpg",
};
