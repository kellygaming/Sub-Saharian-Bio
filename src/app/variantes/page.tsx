import ProductCard from "@/components/ProductCard";
import { PRODUITS } from "@/lib/products";

/** Page de travail : comparer les deux traitements de carte côte à côte. */
export default function Variantes() {
  const echantillon = PRODUITS.slice(0, 4);
  return (
    <main className="min-h-screen bg-ssb-nude px-8 py-16">
      <div className="mx-auto max-w-7xl space-y-16">
        <section>
          <h2 className="mb-8 font-display text-3xl text-ssb-ink">
            Variante A — carte claire
          </h2>
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {echantillon.map((p) => (
              <ProductCard key={p.slug} produit={p} variante="clair" />
            ))}
          </div>
        </section>
        <section>
          <h2 className="mb-8 font-display text-3xl text-ssb-ink">
            Variante B — carte sombre
          </h2>
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {echantillon.map((p) => (
              <ProductCard key={p.slug} produit={p} variante="sombre" />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
