import type { Metadata } from "next";
import ProductGrid from "@/components/ProductGrid";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Boutique",
  description:
    "Tous les soins Sub Saharan Bio : visage, corps, gammes complètes et compléments.",
};

export default function Boutique() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-ssb-nude px-6 pb-28 pt-32 md:px-12 md:pt-40">
        <div className="mx-auto max-w-7xl">
          <p className="label text-ssb-green-deep">Boutique</p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl leading-tight text-ssb-ink md:text-6xl">
            Tous nos soins.
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-ssb-ink/70">
            Formulés en Côte d&apos;Ivoire, pensés pour les peaux exposées au
            soleil, à la poussière et à l&apos;humidité.
          </p>

          <p className="label mt-8 inline-block rounded-full bg-ssb-green/12 px-4 py-2 text-ssb-green-deep">
            Livraison offerte dès 25 000 CFA
          </p>

          <div className="mt-12">
            <ProductGrid />
          </div>
        </div>
      </main>
    </>
  );
}
