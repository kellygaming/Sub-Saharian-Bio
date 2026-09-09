import HeroScrub from "@/components/HeroScrub";
import SiteHeader from "@/components/SiteHeader";
import Reveal from "@/components/Reveal";
import ProductGrid from "@/components/ProductGrid";
import SkinJourney from "@/components/SkinJourney";
import { ETAPES_PEAU, PRODUIT_PARCOURS } from "@/lib/parcours";

const ACTIFS = [
  { nom: "Marula", role: "Régénère et nourrit en profondeur" },
  { nom: "Basilic", role: "Purifie et apaise les peaux fatiguées" },
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="top">
        <HeroScrub />

        {/* ── Le produit ─────────────────────────────────────────── */}
        <section
          id="elixir"
          className="scroll-mt-24 bg-ssb-nude px-6 py-24 md:px-12 md:py-36"
        >
          <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <p className="label text-ssb-green-deep">Le soin signature</p>
              <h2 className="mt-5 font-display text-4xl leading-[1.05] text-ssb-ink md:text-6xl">
                Une seule goutte,
                <br />
                toute la sève du Sahel.
              </h2>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-ssb-ink/75">
                L&apos;huile de Marula est pressée à froid à partir des noyaux
                d&apos;un arbre qui survit aux saisons sèches. Elle porte
                naturellement ce dont une peau exposée au soleil et à la
                poussière a besoin.
              </p>

              <dl className="mt-10 grid gap-6 sm:grid-cols-2">
                {ACTIFS.map((actif) => (
                  <div
                    key={actif.nom}
                    className="border-l-2 border-ssb-green pl-5"
                  >
                    <dt className="font-display text-2xl text-ssb-green-deep">
                      {actif.nom}
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-ssb-ink/70">
                      {actif.role}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-11 flex flex-wrap items-center gap-5">
                <a
                  href="#diagnostic"
                  className="rounded-full bg-ssb-ink px-8 py-4 text-sm font-semibold text-white transition hover:bg-ssb-earth"
                >
                  Ajouter au panier
                </a>
                <span className="font-display text-2xl text-ssb-ink">
                  17 000 CFA
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <figure className="overflow-hidden rounded-[2rem] bg-ssb-nude-deep">
                <video
                  className="aspect-square w-full object-cover"
                  poster="/video/pour-loop-poster.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="Le sérum Élixir de Marula versé"
                >
                  <source src="/video/pour-loop.webm" type="video/webm" />
                  <source src="/video/pour-loop.mp4" type="video/mp4" />
                </video>
              </figure>
            </Reveal>
          </div>
        </section>

        {/* ── Meilleures ventes ──────────────────────────────────── */}
        <section className="bg-ssb-nude px-6 pb-24 md:px-12 md:pb-32">
          <div className="mx-auto max-w-7xl">
            <Reveal className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="label text-ssb-green-deep">Meilleures ventes</p>
                <h2 className="mt-4 font-display text-4xl leading-tight text-ssb-ink md:text-5xl">
                  Ce que nos clientes reprennent.
                </h2>
              </div>
              <a
                href="/boutique"
                className="-mx-2 rounded-full px-2 py-2.5 text-sm font-semibold text-ssb-green-deep underline-offset-4 hover:underline"
              >
                Voir tous les soins →
              </a>
            </Reveal>

            <div className="mt-12">
              <ProductGrid limite={4} />
            </div>
          </div>
        </section>

        {/* ── Parcours peau ──────────────────────────────────────── */}
        <SkinJourney etapes={ETAPES_PEAU} produit={PRODUIT_PARCOURS} />

        {/* ── Diagnostic ─────────────────────────────────────────── */}
        <section
          id="diagnostic"
          className="scroll-mt-24 bg-ssb-green px-6 py-24 md:px-12 md:py-32"
        >
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="label text-white/70">Diagnostic personnalisé</p>
            <h2 className="mt-5 font-display text-4xl leading-tight text-white md:text-6xl">
              Découvrez ce dont votre peau a besoin.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/85">
              Répondez à cinq questions et recevez des recommandations de soins
              personnalisées directement sur WhatsApp.
            </p>
            <a
              href="#"
              className="mt-10 inline-block rounded-full bg-white px-10 py-4 text-sm font-semibold text-ssb-green-dark transition hover:bg-ssb-nude"
            >
              Commencer mon diagnostic
            </a>
          </Reveal>
        </section>
      </main>

      {/* ── Pied de page ─────────────────────────────────────────── */}
      <footer
        id="histoire"
        className="scroll-mt-24 bg-ssb-ink px-6 py-20 md:px-12"
      >
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1fr_auto]">
          <div>
            <div
              className="logo-mono h-14 w-14 text-ssb-nude"
              role="img"
              aria-label="Sub Saharan Bio"
            />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ssb-nude/60">
              Des soins bio pensés pour les peaux africaines, formulés et
              fabriqués en Côte d&apos;Ivoire.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <p className="label text-ssb-green">Nos boutiques</p>
              <ul className="mt-4 space-y-2 text-sm text-ssb-nude/70">
                <li>Riviera 3 — Abidjan</li>
                <li>Latrille — Abidjan</li>
              </ul>
            </div>
            <div>
              <p className="label text-ssb-green">Contact</p>
              <ul className="mt-4 space-y-2 text-sm text-ssb-nude/70">
                <li>
                  <a
                    className="transition hover:text-ssb-nude"
                    href="https://wa.me/2250767424954"
                  >
                    WhatsApp · +225 07 67 42 49 54
                  </a>
                </li>
                <li>
                  <a
                    className="transition hover:text-ssb-nude"
                    href="mailto:support@subsaharianbio.com"
                  >
                    support@subsaharianbio.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-7xl border-t border-white/10 pt-8">
          <p className="text-xs text-ssb-nude/40">
            © {new Date().getFullYear()} Sub Saharan Bio. Tous droits réservés.
          </p>
        </div>
      </footer>
    </>
  );
}
