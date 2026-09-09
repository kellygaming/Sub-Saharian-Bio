"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export type EtapePeau = {
  titre: string;
  sousTitre: string;
  texte: string;
  image: string;
};

const JOURS = 14;

/** Jour du calendrier → index d'étape (0 : départ, 1 : une semaine, 2 : deux semaines). */
const etapeDuJour = (jour: number) => (jour >= JOURS ? 2 : jour >= 7 ? 1 : 0);

export default function SkinJourney({
  etapes,
  produit,
}: {
  etapes: [EtapePeau, EtapePeau, EtapePeau];
  produit: {
    nom: string;
    famille: string;
    prix: string;
    image: string;
  };
}) {
  const [jour, setJour] = useState(1);
  const [manuel, setManuel] = useState(false);
  const etape = etapeDuJour(jour);
  const timer = useRef<number | null>(null);

  // Tant que le visiteur n'a pas touché au calendrier, les jours défilent
  // seuls : la section vit, et on comprend le principe sans lire.
  useEffect(() => {
    if (manuel) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer.current = window.setInterval(
      () => setJour((j) => (j >= JOURS ? 1 : j + 1)),
      jour === JOURS ? 2600 : 900,
    );
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [manuel, jour]);

  const choisir = (j: number) => {
    setManuel(true);
    setJour(j);
  };

  return (
    <section
      id="parcours"
      className="scroll-mt-24 bg-ssb-nude-warm px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:gap-10 lg:grid-cols-[1.05fr_1fr] lg:grid-rows-[auto_auto] lg:gap-x-20 lg:gap-y-6">
        {/* ── Le titre ──────────────────────────────────────────── */}
        <div className="min-w-0 lg:col-start-2 lg:row-start-1 lg:self-end">
          <p className="label text-ssb-green-deep">Résultats visibles</p>
          <h2 className="mt-4 font-display text-[2rem] leading-[1.05] text-ssb-ink sm:text-4xl md:text-5xl">
            Votre peau,
            <br />
            semaine après semaine.
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ssb-ink/70">
            Touchez un jour du calendrier pour voir l&apos;évolution d&apos;une
            peau à tendance acnéique avec la routine Sub Saharan Bio.
          </p>
        </div>

        {/* ── Le visage ─────────────────────────────────────────── */}
        <figure className="relative min-w-0 aspect-square overflow-hidden rounded-[2rem] sm:aspect-[4/5] lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:self-center bg-ssb-nude-deep shadow-[0_40px_80px_-40px_rgba(49,54,63,0.45)]">
          {etapes.map((e, i) => (
            <Image
              key={e.image}
              src={e.image}
              alt={i === etape ? `${e.titre} — ${e.sousTitre}` : ""}
              fill
              priority={i === 0}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-opacity duration-[900ms] ease-brand"
              style={{ opacity: i === etape ? 1 : 0 }}
              aria-hidden={i !== etape}
            />
          ))}

          <figcaption className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-white/85 py-2 pl-3 pr-4 backdrop-blur-md">
            <span
              className="h-2 w-2 rounded-full transition-colors duration-500"
              style={{
                backgroundColor: ["#C9856B", "#E0A82E", "#90AF47"][etape],
              }}
            />
            <span className="label text-ssb-ink">
              {jour === 1 ? "Jour 1" : `Jour ${jour}`}
            </span>
          </figcaption>

          {/* Barre de progression — le geste est lisible même sans lire. */}
          <div className="absolute inset-x-5 bottom-5 h-1 overflow-hidden rounded-full bg-white/40">
            <div
              className="h-full rounded-full bg-ssb-green transition-[width] duration-700 ease-brand"
              style={{ width: `${(jour / JOURS) * 100}%` }}
            />
          </div>
        </figure>

        {/* ── Le calendrier ─────────────────────────────────────── */}
        <div className="min-w-0 lg:col-start-2 lg:row-start-2 lg:self-start">
          <div
            role="group"
            aria-label="Choisir un jour de la routine"
            className="grid grid-cols-7 gap-1.5 sm:gap-2"
          >
            {Array.from({ length: JOURS }, (_, i) => i + 1).map((j) => {
              const actif = j === jour;
              const memeEtape = etapeDuJour(j) === etape;
              return (
                <button
                  key={j}
                  type="button"
                  onClick={() => choisir(j)}
                  aria-pressed={actif}
                  aria-label={`Jour ${j}`}
                  className={`aspect-square rounded-2xl text-sm font-semibold transition-all duration-300 ease-brand ${
                    actif
                      ? "scale-105 bg-ssb-ink text-white shadow-lg"
                      : memeEtape
                        ? "bg-white text-ssb-ink hover:bg-ssb-green hover:text-white"
                        : "bg-white/50 text-ssb-ink/50 hover:bg-white hover:text-ssb-ink"
                  }`}
                >
                  {j}
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex gap-2">
            {etapes.map((e, i) => (
              <button
                key={e.titre}
                type="button"
                onClick={() => choisir([1, 7, 14][i])}
                className={`rounded-full px-4 py-2.5 text-xs font-semibold transition ${
                  i === etape
                    ? "bg-ssb-green text-white"
                    : "bg-white/60 text-ssb-ink/70 hover:bg-white"
                }`}
              >
                {e.titre}
              </button>
            ))}
          </div>

          <div className="mt-6 min-h-[4.5rem]" aria-live="polite">
            <p className="font-display text-2xl text-ssb-ink">
              {etapes[etape].sousTitre}
            </p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-ssb-ink/70">
              {etapes[etape].texte}
            </p>
          </div>

          {/* ── Le produit ────────────────────────────────────── */}
          <div className="mt-10 flex flex-wrap items-center gap-4 rounded-[1.75rem] bg-white p-4 sm:gap-5 sm:pr-6">
            <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-2xl bg-ssb-nude sm:h-28 sm:w-24">
              <Image
                src={produit.image}
                alt={produit.nom}
                fill
                sizes="(max-width: 640px) 80px, 96px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1 basis-40">
              <p className="label text-ssb-green-deep">{produit.famille}</p>
              <p className="mt-1 font-display text-lg leading-tight text-ssb-ink break-words sm:text-xl">
                {produit.nom}
              </p>
              <p className="mt-1 text-sm text-ssb-ink/60">{produit.prix}</p>
            </div>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="w-full shrink-0 rounded-full bg-ssb-ink px-6 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-ssb-green sm:w-auto"
            >
              Acheter
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
