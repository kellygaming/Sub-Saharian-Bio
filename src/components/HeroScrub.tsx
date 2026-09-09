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

    const lireEnBoucle = () => {
      video.loop = true;
      video.play().catch(() => {});
    };

    if (reduced) {
      lireEnBoucle();
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    let objectUrl: string | null = null;
    let annule = false;

    const ctx = gsap.context(() => {
      const proxy = { t: 0 };
      // Nombre d'images consécutives où la vidéo n'a pas suivi le scroll :
      // au-delà d'un seuil, le téléphone ne sait pas seeker → repli en boucle.
      let retards = 0;

      const build = () => {
        const duration = video.duration;
        if (!Number.isFinite(duration) || duration === 0) return;

        const trigger = ScrollTrigger.create({
          trigger: root,
          start: "top top",
          // La scène est épinglée par `position: sticky` (CSS natif) :
          // ScrollTrigger n'a plus qu'à piloter le temps de la vidéo.
          end: () => `+=${root.offsetHeight - window.innerHeight}`,
          scrub: 0.45,
          invalidateOnRefresh: true,
          animation: gsap.to(proxy, {
            t: duration,
            ease: "none",
            onUpdate: () => {
              // On ne redemande pas de seek tant que le précédent n'a pas
              // abouti : c'est ce qui évite le saccadement sur les molettes
              // rapides. Le `seeked` ci-dessous rattrape la dernière valeur.
              if (!video.seeking) video.currentTime = proxy.t;

              if (Math.abs(video.currentTime - proxy.t) > 1.2) {
                if (++retards > 40) {
                  trigger.kill();
                  lireEnBoucle();
                }
              } else {
                retards = 0;
              }
            },
          }),
        });

        video.addEventListener("seeked", () => {
          if (Math.abs(video.currentTime - proxy.t) > 0.05) {
            video.currentTime = proxy.t;
          }
        });

        // Toute la typo est pilotée par UNE timeline : deux tweens séparés se
        // disputaient l'opacité du bloc final et le fondu de sortie ne passait
        // jamais. Les positions sont des fractions de la plage d'épinglage.
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => `+=${root.offsetHeight - window.innerHeight}`,
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });
        tl.to({}, { duration: 1 }, 0); // référentiel 0 → 1
        tl.to(
          ".hero-intro",
          { y: -60, opacity: 0, ease: "power1.in", duration: 0.42 },
          0,
        );
        tl.to(".hero-hint", { opacity: 0, duration: 0.1 }, 0);
        tl.fromTo(
          ".hero-outro",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.16, ease: "none" },
          0.42,
        );
        // Disparaît avant la fin de l'épinglage : sinon la scène glisse sous le
        // header fixe et les boutons chevauchent le logo.
        tl.to(".hero-outro", { opacity: 0, duration: 0.1, ease: "none" }, 0.88);
      };

      const demarrer = () => {
        if (video.readyState >= 1) build();
        else video.addEventListener("loadedmetadata", build, { once: true });
      };

      if (!isNarrow) {
        demarrer();
        return;
      }

      // Mobile : Safari iOS ne sait seeker que dans les plages déjà
      // téléchargées, et bufferise par petits morceaux. On charge donc la
      // vidéo entière en mémoire (blob) avant de la piloter : le seek devient
      // instantané. En cas d'échec réseau on garde les <source> et on tente
      // quand même.
      const lisibleMp4 = video.canPlayType('video/mp4; codecs="avc1.64001F"');
      const url = lisibleMp4 ? sources.mp4 : sources.webm;
      fetch(url)
        .then((r) => (r.ok ? r.blob() : Promise.reject(r.status)))
        .then((blob) => {
          if (annule) return;
          objectUrl = URL.createObjectURL(blob);
          video.src = objectUrl;
          video.load();
        })
        .catch(() => {})
        .finally(() => {
          if (!annule) demarrer();
        });
    }, root);

    return () => {
      annule = true;
      ctx.revert();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
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
      className="hero relative h-[300svh] md:h-[340vh]"
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

            <div className="hero-outro absolute inset-x-0 bottom-10 px-6 opacity-0 md:bottom-24 md:px-12">
              <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-8">
                <ul className="hidden space-y-1.5 text-white/90 md:block">
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
