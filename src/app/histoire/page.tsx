import type { Metadata } from "next";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Notre histoire",
  description:
    "L’histoire de Sub Saharian Bio : des soins naturels, pensés pour comprendre, soigner et respecter la peau noire.",
};

const IMAGE_HISTOIRE =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3HJdujTPUatDr1wioMxqGRiB5kw/hf_20260919_002543_4567b6dc-76e1-40e3-ab2d-fda5b9c55886.png";

const REPÈRES = [
  { valeur: "2017", label: "premier élan entrepreneurial" },
  { valeur: "30+", label: "personnes qui font vivre la marque" },
  { valeur: "2", label: "boutiques à Abidjan" },
];

export default function Histoire() {
  return (
    <>
      <SiteHeader />

      <main id="top" className="overflow-hidden bg-ssb-nude pt-20">
        <section className="relative bg-ssb-ink px-6 pb-16 pt-14 text-white md:px-12 md:pb-24 md:pt-24">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-24 top-16 h-96 w-96 rounded-full bg-ssb-green/20 blur-3xl" />
            <div className="absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-[#E0A82E]/10 blur-3xl" />
          </div>

          <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
            <Reveal className="max-w-xl pb-2">
              <p className="label text-ssb-green">Notre histoire</p>
              <h1 className="mt-6 font-display text-5xl leading-[0.95] tracking-[-0.045em] md:text-7xl">
                La beauté qui
                <br />
                commence par
                <br />
                <em className="font-normal text-ssb-green">se respecter.</em>
              </h1>
              <p className="mt-8 max-w-md text-base leading-relaxed text-white/70 md:text-lg">
                Sub Saharian Bio est née d&apos;une conviction simple : la peau noire
                mérite des soins qui la comprennent, la protègent et la célèbrent.
              </p>
              <a
                href="#conviction"
                className="mt-10 inline-flex items-center gap-3 text-sm font-semibold text-white transition hover:text-ssb-green"
              >
                Découvrir notre mission
                <span aria-hidden="true" className="text-xl">↓</span>
              </a>
            </Reveal>

            <Reveal delay={0.12} className="relative">
              <div className="relative mx-auto max-w-2xl overflow-hidden rounded-[2.5rem] bg-[#D8C1B2] p-2 shadow-[0_32px_100px_-30px_rgba(0,0,0,0.7)]">
                <Image
                  src={IMAGE_HISTOIRE}
                  alt="Portrait éditorial évoquant l'univers botanique et lumineux de Sub Saharian Bio"
                  width={896}
                  height={1120}
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="aspect-[4/5] w-full rounded-[2rem] object-cover"
                />
                <div className="absolute inset-x-8 bottom-8 flex items-end justify-between text-white">
                  <p className="label max-w-28 leading-relaxed text-white/80">
                    Des racines africaines. Une vision universelle.
                  </p>
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-white/35 bg-black/10 text-lg backdrop-blur-sm">
                    SSB
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="conviction" className="px-6 py-24 md:px-12 md:py-36">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            <Reveal>
              <p className="label text-ssb-green-deep">01 — L&apos;origine</p>
              <p className="mt-5 font-display text-3xl leading-tight text-ssb-green-deep md:text-4xl">
                Une conviction née d&apos;une expérience personnelle.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="font-display text-3xl leading-[1.15] text-ssb-ink md:text-5xl">
                « Comprendre la peau noire.
                <br />
                La soigner. La respecter. »
              </p>
              <div className="mt-10 max-w-2xl space-y-5 text-base leading-relaxed text-ssb-ink/70 md:text-lg">
                <p>
                  Tout commence par une histoire intime. Très tôt, une cicatrice
                  devient le point de départ d&apos;une recherche : trouver des
                  réponses justes à des besoins de peau longtemps négligés.
                </p>
                <p>
                  Cette quête personnelle devient une mission collective. Créer
                  des soins naturels, efficaces et doux, formulés pour les peaux
                  exposées au soleil, à la poussière et à l&apos;humidité.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-[#EDE0D6] px-6 py-20 md:px-12 md:py-28">
          <div className="mx-auto max-w-7xl">
            <Reveal className="max-w-2xl">
              <p className="label text-ssb-green-deep">02 — Le mouvement</p>
              <h2 className="mt-5 font-display text-4xl leading-[1.05] text-ssb-ink md:text-6xl">
                Une marque qui ne transforme pas la peau. Elle la révèle.
              </h2>
            </Reveal>

            <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] bg-ssb-ink/10 md:grid-cols-3">
              {REPÈRES.map((repere, index) => (
                <Reveal key={repere.valeur} delay={0.06 * index}>
                  <article className="min-h-52 bg-[#EDE0D6] p-8 md:p-10">
                    <p className="font-display text-6xl text-ssb-green-deep">
                      {repere.valeur}
                    </p>
                    <p className="mt-6 max-w-40 text-sm leading-relaxed text-ssb-ink/65">
                      {repere.label}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-ssb-nude px-6 py-24 md:px-12 md:py-36">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <Reveal>
              <p className="label text-ssb-green-deep">03 — Notre promesse</p>
              <h2 className="mt-5 max-w-3xl font-display text-4xl leading-[1.06] text-ssb-ink md:text-6xl">
                La nature africaine,
                <br />
                rencontrée par la science dermocosmétique.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-[2rem] bg-ssb-green p-8 text-white md:p-10">
                <p className="font-display text-2xl leading-tight md:text-3xl">
                  Des rituels efficaces, sans décapage ni produits agressifs.
                </p>
                <p className="mt-5 text-sm leading-relaxed text-white/80 md:text-base">
                  Notre laboratoire s&apos;inspire de la richesse des plantes
                  africaines pour réparer, protéger et sublimer la peau — sans
                  jamais lui demander de devenir une autre.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-ssb-ink px-6 py-24 text-center text-white md:px-12 md:py-32">
          <Reveal className="mx-auto max-w-3xl">
            <p className="label text-ssb-green">La suite s&apos;écrit avec vous</p>
            <h2 className="mt-5 font-display text-4xl leading-tight md:text-6xl">
              Prenez soin de votre peau,
              <br />
              sans compromis.
            </h2>
            <a
              href="/boutique"
              className="mt-10 inline-block rounded-full bg-ssb-green px-8 py-4 text-sm font-semibold text-white transition hover:bg-ssb-green-deep"
            >
              Découvrir les soins
            </a>
          </Reveal>
        </section>
      </main>
    </>
  );
}
