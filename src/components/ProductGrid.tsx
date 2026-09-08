"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import ProductCard from "./ProductCard";
import { FILTRES, PRODUITS, type Categorie } from "@/lib/products";

type Filtre = Categorie | "tous";

export default function ProductGrid({
  variante = "clair",
  limite,
}: {
  variante?: "clair" | "sombre";
  limite?: number;
}) {
  const [filtre, setFiltre] = useState<Filtre>("tous");
  const grille = useRef<HTMLDivElement>(null);
  const etat = useRef<Flip.FlipState | null>(null);

  const visibles = PRODUITS.filter(
    (p) => filtre === "tous" || p.categorie === filtre,
  ).slice(0, limite);

  // On capture la position des cartes AVANT le rendu du nouveau filtre,
  // puis Flip anime l'écart : les cartes glissent au lieu de sauter.
  const changerFiltre = (id: Filtre) => {
    if (id === filtre || !grille.current) return;
    gsap.registerPlugin(Flip);
    etat.current = Flip.getState(grille.current.children);
    setFiltre(id);
  };

  useLayoutEffect(() => {
    if (!etat.current || !grille.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      etat.current = null;
      return;
    }
    Flip.from(etat.current, {
      duration: 0.55,
      ease: "power3.inOut",
      scale: true,
      absolute: true,
      stagger: 0.03,
      onEnter: (els) =>
        gsap.fromTo(
          els,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.45, stagger: 0.04 },
        ),
      onLeave: (els) =>
        gsap.to(els, { opacity: 0, scale: 0.9, duration: 0.25 }),
    });
    etat.current = null;
  }, [filtre]);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filtrer les soins"
        className="flex flex-wrap gap-2"
      >
        {FILTRES.map((f) => {
          const actif = f.id === filtre;
          return (
            <button
              key={f.id}
              role="tab"
              aria-selected={actif}
              onClick={() => changerFiltre(f.id)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition duration-300 ${
                actif
                  ? "bg-ssb-ink text-white"
                  : "bg-white/70 text-ssb-ink/70 hover:bg-white hover:text-ssb-ink"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <div
        ref={grille}
        className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4"
      >
        {visibles.map((p, i) => (
          <ProductCard
            key={p.slug}
            produit={p}
            variante={variante}
            priority={i < 4}
          />
        ))}
      </div>
    </div>
  );
}
