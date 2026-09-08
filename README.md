# Sub Saharan Bio

Site vitrine et e-commerce de Sub Saharan Bio — soins bio visage et corps,
formulés en Côte d'Ivoire.

## Stack

- **Next.js 16** (App Router, Turbopack) + TypeScript
- **Tailwind CSS v4** — jetons de marque déclarés dans `src/app/globals.css`
- **GSAP ScrollTrigger** + **Lenis** — animation au défilement

## Démarrer

```bash
npm install
npm run dev
```

## Charte

| Jeton | Valeur | Usage |
| --- | --- | --- |
| `ssb-green` | `#90AF47` | Logo, CTA (échantillonné sur le logo officiel) |
| `ssb-green-deep` | `#5A7A2E` | Titres de marque |
| `ssb-nude` | `#F3E3DA` | Fond principal |
| `ssb-nude-warm` | `#EFE2D6` | Fond du hero — calé sur le fond de la vidéo |
| `ssb-gold` | `#E0A82E` | Accents premium |
| `ssb-ink` | `#31363F` | Texte, pied de page |

Typographie : **Fraunces** (display) + **Manrope** (texte), servies par `next/font`.

## Le hero

`src/components/HeroScrub.tsx` pilote la vidéo produit au défilement :

- la scène est épinglée par `position: sticky` (CSS natif, pas de pin GSAP) ;
- ScrollTrigger ne fait que déplacer `video.currentTime` ;
- les vidéos sont encodées avec une image-clé toutes les 8 frames
  (`-g 8 -sc_threshold 0`), ce qui rend le `seek` fluide ;
- sous 768 px et en `prefers-reduced-motion`, la vidéo passe en lecture
  bouclée : le `seek` image par image reste peu fiable sur Safari iOS.

## Médias

`public/video/` contient les rendus web (muets, `+faststart`, WebM + MP4).
Les masters ne sont pas versionnés.
