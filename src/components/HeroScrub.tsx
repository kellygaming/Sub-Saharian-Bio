"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const DESKTOP = {
  webm: "/video/hero-desktop.webm",
  mp4: "/video/hero-desktop.mp4",
  poster: "/video/hero-desktop-poster.jpg",
};
const MOBILE = {
  webm: "/video/hero-mobile.webm",
  mp4: "/video/hero-mobile.mp4",
  poster: "/video/hero-mobile-poster.jpg",
};

export default function HeroScrub() {
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [sources, setSources] = useState<typeof DESKTOP | null>(null);
  const [ready, setReady] = useState(false);

  /* 1. Choix de la source : 9:16 sur mobile, 16:9 au-delà.
        Fait après montage pour ne jamais télécharger les deux. */
  useEffect(() => {
    const isNarrow = window.matchMedia("(max-width: 767px)").matches;
    setSources(isNarrow ? MOBILE : DESKTOP);
  }, []);

  /* 2. Le scrub. */
  useEffect(() => {
    const video = videoRef.current;
    const root = rootRef.current;
    if (!video || !root || !sources) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isNarrow = window.matchMedia("(max-width: 767px)").matches;

    // Mobile et « mouvement réduit » : lecture en boucle, pas de pilotage au scroll.
    // Le seek image par image reste peu fiable sur Safari iOS.
    if (reduced || isNarrow) {
      video.loop = true;
      video.play().catch(() => {});
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const proxy = { t: 0 };

      const build = () => {
        const duration = video.duration;
        if (!Number.isFinite(duration) || duration === 0) return;

        gsap.to(proxy, {
          t: duration,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            // La scène est épinglée par `position: sticky` (CSS natif) :
            // ScrollTrigger n'a plus qu'à piloter le temps de la vidéo.
            end: () => `+=${root.offsetHeight - window.innerHeight}`,
            scrub: 0.45,
            invalidateOnRefresh: true,
          },
          onUpdate: () => {
            // On ne redemande pas de seek tant que le précédent n'a pas abouti :
            // c'est ce qui évite le saccadement sur les molettes rapides.
            if (!video.seeking) video.currentTime = proxy.t;
          },
        });

        // La typo suit le geste : elle s'efface quand l'huile arrive.
        gsap
          .timeline({
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: () => `+=${root.offsetHeight * 0.45}`,
              scrub: 0.6,
            },
          })
          .to(".hero-intro", { y: -60, opacity: 0, ease: "power1.in" }, 0)
          .to(".hero-hint", { opacity: 0, duration: 0.2 }, 0);

        gsap.fromTo(
          ".hero-outro",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: () => `top+=${root.offsetHeight * 0.42} top`,
              end: () => `+=${root.offsetHeight * 0.16}`,
              scrub: 0.6,
            },
          },
        );
      };

      if (video.readyState >= 1) build();
      else video.addEventListener("loadedmetadata", build, { once: true });
    }, root);

    return () => ctx.revert();
  }, [sources]);

  /* 3. Amorçage iOS : un premier play()/pause() débloque le seek. */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const prime = () => {
      video
        .play()
        .then(() => video.pause())
        .catch(() => {});
    };
    window.addEventListener("touchstart", prime, { once: true, passive: true });
    window.addEventListener("pointerdown", prime, { once: true });
    return () => {
      window.removeEventListener("touchstart", prime);
      window.removeEventListener("pointerdown", prime);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="hero relative h-[100svh] md:h-[340vh]"
      aria-label="Élixir de Marula"
    >
      <div className="hero-stage sticky top-0 h-[100svh] w-full overflow-hidden bg-ssb-nude-warm">
        {/* Le poster est peint en fond : quelque chose s'affiche avant même
            que la vidéo ne soit décodée (bon LCP). */}
        <div className="hero-poster absolute inset-0 bg-cover bg-center" />

        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
          style={{ opacity: ready ? 1 : 0 }}
          muted
          playsInline
          preload="auto"
          poster={sources?.poster}
          onLoadedData={() => setReady(true)}
        >
          {sources && (
            <>
              <source src={sources.webm} type="video/webm" />
              <source src={sources.mp4} type="video/mp4" />
            </>
          )}
        </video>

        {/* Voile de lisibilité + raccord vers le nude de la section suivante. */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-black/5 md:bg-gradient-to-r md:from-black/45 md:via-black/10 md:to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent via-transparent to-ssb-nude" />

        <div className="relative flex h-full items-center">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
            <div className="hero-intro max-w-xl">
              <p className="label text-white/80">Sub Saharan Bio</p>
              <h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-8xl">
                Élixir
                <br />
                de Marula
              </h1>
              <p className="mt-6 max-w-sm text-base leading-relaxed text-white/85 sm:text-lg">
                Sérum visage Basilic &amp; Marula. Hydratation maximale, peau
                repulpée dès la première application.
              </p>

              <div className="mt-8 flex flex-wrap gap-3 md:hidden">
                <a
                  href="#elixir"
                  className="rounded-full bg-ssb-green px-7 py-3.5 text-sm font-semibold text-white"
                >
                  Découvrir l&apos;élixir
                </a>
                <a
                  href="#diagnostic"
                  className="rounded-full border border-white/50 px-7 py-3.5 text-sm font-semibold text-white"
                >
                  Mon diagnostic
                </a>
              </div>
            </div>

            <div className="hero-outro absolute inset-x-0 bottom-24 hidden px-6 opacity-0 md:block md:px-12">
              <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-8">
                <ul className="space-y-1.5 text-white/90">
                  {[
                    "Beauté & jeunesse de la peau",
                    "Redonne vie aux peaux fatiguées",
                    "Repulpe immédiatement",
                  ].map((claim) => (
                    <li key={claim} className="label !tracking-[0.14em]">
                      {claim}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="#elixir"
                    className="rounded-full bg-ssb-green px-8 py-4 text-sm font-semibold text-white transition hover:bg-ssb-green-deep"
                  >
                    Découvrir l&apos;élixir
                  </a>
                  <a
                    href="#diagnostic"
                    className="rounded-full border border-white/50 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
                  >
                    Faire mon diagnostic
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-hint pointer-events-none absolute inset-x-0 bottom-8 hidden justify-center md:flex">
          <span className="label text-white/60">Défilez</span>
        </div>
      </div>
    </section>
  );
}
