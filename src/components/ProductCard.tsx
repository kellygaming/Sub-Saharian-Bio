"use client";

import { useState } from "react";
import Image from "next/image";
import { formatPrix, type Produit } from "@/lib/products";

type Variante = "clair" | "sombre";

/** Étiquettes abrégées : en 2 colonnes sur mobile, « Best-seller » déborde. */
const BADGE_COURT: Record<NonNullable<Produit["badge"]>, string> = {
  "Best-seller": "Top",
  Nouveau: "Nouveau",
  "Édition limitée": "Limitée",
};

const T = {
  clair: {
    carte: "bg-white",
    titre: "text-ssb-ink",
    surtitre: "text-ssb-green-deep",
    texte: "text-ssb-ink/55",
    tag: "bg-ssb-nude text-ssb-ink/70",
    prix: "text-ssb-ink",
    bouton: "bg-ssb-ink text-white hover:bg-ssb-green",
    coeur: "bg-white/85 text-ssb-ink hover:bg-white",
  },
  sombre: {
    carte: "bg-ssb-ink",
    titre: "text-white",
    surtitre: "text-ssb-green",
    texte: "text-white/50",
    tag: "bg-white/10 text-white/70",
    prix: "text-white",
    bouton: "bg-white text-ssb-ink hover:bg-ssb-green hover:text-white",
    coeur: "bg-black/40 text-white hover:bg-black/60",
  },
} as const;

export default function ProductCard({
  produit,
  variante = "clair",
  priority = false,
}: {
  produit: Produit;
  variante?: Variante;
  priority?: boolean;
}) {
  const [aime, setAime] = useState(false);
  const t = T[variante];

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-[1.75rem] p-2.5 transition-[transform,box-shadow] duration-500 ease-brand hover:-translate-y-1.5 hover:shadow-[0_24px_60px_-24px_rgba(49,54,63,0.35)] ${t.carte}`}
    >
      {/* ── Visuel ─────────────────────────────────────────────── */}
      <div className="relative aspect-square overflow-hidden rounded-[1.35rem] bg-[#F7E4DD]">
        <Image
          src={produit.image}
          alt={produit.nom}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={priority}
          className="object-cover transition-transform duration-700 ease-brand group-hover:scale-[1.06]"
        />

        {produit.badge && (
          <span className="label absolute left-2.5 top-2.5 rounded-full bg-ssb-green px-2 py-1 text-[9px] text-white sm:left-3 sm:top-3 sm:px-3 sm:py-1.5 sm:text-[11px]">
            <span className="sm:hidden">{BADGE_COURT[produit.badge]}</span>
            <span className="hidden sm:inline">{produit.badge}</span>
          </span>
        )}

        <button
          type="button"
          onClick={() => setAime((v) => !v)}
          aria-pressed={aime}
          aria-label={
            aime
              ? `Retirer ${produit.nom} des favoris`
              : `Ajouter ${produit.nom} aux favoris`
          }
          className={`absolute right-2.5 top-2.5 grid h-8 w-8 place-items-center rounded-full backdrop-blur-sm transition sm:right-3 sm:top-3 sm:h-9 sm:w-9 ${t.coeur}`}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
            <path
              d="M12 20.4 3.9 12.6a4.8 4.8 0 0 1 6.8-6.8l1.3 1.3 1.3-1.3a4.8 4.8 0 1 1 6.8 6.8Z"
              fill={aime ? "#90AF47" : "none"}
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Bandeau incurvé repris de la référence, mais révélé au survol :
            répété sur chaque carte, il saturait la grille de vert. Sur les
            appareils tactiles (sans survol) il reste affiché. */}
        <a
          href={`/boutique/${produit.slug}`}
          className="quick-add absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 rounded-t-[1.1rem] bg-ssb-green/95 py-2 backdrop-blur-sm sm:rounded-t-[1.35rem] sm:py-2.5"
        >
          <span className="label text-[9px] text-white sm:text-[11px]">
            {produit.epuise ? "Bientôt de retour" : "Voir le produit"}
          </span>
          <svg
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5 text-white"
            aria-hidden="true"
          >
            <path
              d="M7 17 17 7m0 0H8m9 0v9"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>

      {/* ── Informations ───────────────────────────────────────── */}
      <div className="flex flex-1 flex-col px-2.5 pb-1.5 pt-3 sm:px-3 sm:pt-4">
        <p className={`label ${t.surtitre}`}>{produit.famille}</p>

        <h3
          className={`mt-1.5 font-display text-base leading-tight sm:mt-2 sm:text-xl ${t.titre}`}
          title={produit.nom}
        >
          {produit.nom}
        </h3>

        <ul className="mt-3 hidden flex-wrap gap-1.5 sm:flex">
          {produit.tags.map((tag) => (
            <li
              key={tag}
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${t.tag}`}
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-end justify-between gap-2 pt-1 sm:mt-5 sm:gap-3">
          <div>
            {produit.prixBarre && (
              <p className={`text-xs line-through ${t.texte}`}>
                {formatPrix(produit.prixBarre)}
              </p>
            )}
            <p
              className={`whitespace-nowrap font-display text-[15px] leading-none sm:text-2xl ${t.prix}`}
            >
              {formatPrix(produit.prix)}
            </p>
          </div>

          <button
            type="button"
            disabled={produit.epuise}
            aria-label={`Ajouter ${produit.nom} au panier`}
            className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition duration-300 ease-brand disabled:cursor-not-allowed disabled:opacity-40 group-hover:scale-105 sm:h-12 sm:w-12 ${t.bouton}`}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path
                d="M5.5 8h13l-1 11.5a1.5 1.5 0 0 1-1.5 1.4H8a1.5 1.5 0 0 1-1.5-1.4Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
              <path
                d="M12 17.5v-6m0 0-2.2 2.2M12 11.5l2.2 2.2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
