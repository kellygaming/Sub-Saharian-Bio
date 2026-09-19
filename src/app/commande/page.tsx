import type { Metadata } from "next";
import { Suspense } from "react";
import SiteHeader from "@/components/SiteHeader";
import { ResumeCommande, default as CommandeForm } from "@/components/CommandeForm";

export const metadata: Metadata = {
  title: "Commander",
  description: "Demandez votre livraison Sub Saharian Bio, sans paiement en ligne.",
};

export default function Commande() {
  return (
    <>
      <SiteHeader />
      <main id="top" className="min-h-screen bg-ssb-nude px-6 pb-24 pt-32 md:px-12 md:pb-32 md:pt-40">
        <div className="mx-auto max-w-7xl">
          <p className="label text-ssb-green-deep">Commande & livraison</p>
          <div className="mt-5 grid gap-10 lg:grid-cols-[1fr_0.75fr] lg:items-end">
            <div>
              <h1 className="max-w-3xl font-display text-5xl leading-[0.98] text-ssb-ink md:text-7xl">
                Votre rituel,
                <br />
                bientôt chez vous.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ssb-ink/70">
                Pas de paiement en ligne. Laissez vos coordonnées : nous vous
                contactons pour confirmer votre commande et organiser la livraison.
              </p>
            </div>
            <p className="rounded-3xl border border-ssb-green/20 bg-ssb-green/10 p-5 text-sm leading-relaxed text-ssb-green-deep">
              Une expérience simple, humaine et sécurisante — de votre sélection
              jusqu&apos;à votre porte.
            </p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <Suspense fallback={<div className="h-[720px] rounded-[2rem] bg-white" />}>
              <CommandeForm />
            </Suspense>
            <div className="space-y-5 lg:sticky lg:top-28">
              <Suspense fallback={<div className="h-72 rounded-[2rem] bg-ssb-ink" />}>
                <ResumeCommande />
              </Suspense>
              <p className="px-2 text-center text-xs leading-relaxed text-ssb-ink/45">
                En validant, vous demandez à être recontacté(e) pour votre livraison.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
