"use client";

import { useSearchParams } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { PRODUITS, formatPrix } from "@/lib/products";

const CHAMPS = "mt-2 w-full rounded-2xl border border-ssb-ink/10 bg-white px-4 py-3.5 text-sm text-ssb-ink outline-none transition placeholder:text-ssb-ink/35 focus:border-ssb-green focus:ring-4 focus:ring-ssb-green/10";

export default function CommandeForm() {
  const params = useSearchParams();
  const slug = params.get("produit");
  const produit = useMemo(
    () => PRODUITS.find((item) => item.slug === slug),
    [slug],
  );
  const [envoye, setEnvoye] = useState(false);

  const envoyer = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEnvoye(true);
  };

  if (envoye) {
    return (
      <div className="rounded-[2rem] bg-ssb-green p-8 text-white md:p-10">
        <p className="label text-white/70">Demande préparée</p>
        <h2 className="mt-4 font-display text-4xl leading-tight">
          Merci pour votre confiance.
        </h2>
        <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/85 md:text-base">
          Votre demande de commande est prête. Notre équipe confirmera la
          disponibilité, le montant de la livraison et le créneau avec vous.
        </p>
        <a
          href="/boutique"
          className="mt-8 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-ssb-green-deep"
        >
          Continuer mes achats
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={envoyer} className="rounded-[2rem] bg-white p-6 shadow-[0_24px_70px_-36px_rgba(49,54,63,0.32)] md:p-9">
      <div className="flex items-center justify-between gap-4 border-b border-ssb-ink/10 pb-6">
        <div>
          <p className="label text-ssb-green-deep">Vos informations</p>
          <p className="mt-2 text-sm leading-relaxed text-ssb-ink/60">
            Nous les utilisons uniquement pour confirmer votre livraison.
          </p>
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ssb-nude text-ssb-green-deep">
          01
        </span>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-ssb-ink">
          Nom complet
          <input required name="nom" autoComplete="name" className={CHAMPS} placeholder="Votre nom et prénom" />
        </label>
        <label className="block text-sm font-semibold text-ssb-ink">
          Téléphone
          <input required name="telephone" type="tel" autoComplete="tel" className={CHAMPS} placeholder="+225 00 00 00 00 00" />
        </label>
      </div>

      <label className="mt-5 block text-sm font-semibold text-ssb-ink">
        E-mail <span className="font-normal text-ssb-ink/45">(facultatif)</span>
        <input name="email" type="email" autoComplete="email" className={CHAMPS} placeholder="vous@exemple.com" />
      </label>

      <div className="mt-9 flex items-center justify-between gap-4 border-b border-ssb-ink/10 pb-6">
        <div>
          <p className="label text-ssb-green-deep">Votre livraison</p>
          <p className="mt-2 text-sm leading-relaxed text-ssb-ink/60">
            Nous confirmerons le montant et le créneau avec vous.
          </p>
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ssb-nude text-ssb-green-deep">
          02
        </span>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-ssb-ink">
          Commune / quartier
          <input required name="quartier" autoComplete="address-level2" className={CHAMPS} placeholder="Ex. Cocody, Riviera 3" />
        </label>
        <label className="block text-sm font-semibold text-ssb-ink">
          Créneau souhaité
          <select required name="creneau" defaultValue="" className={CHAMPS}>
            <option value="" disabled>Choisir un créneau</option>
            <option>Matin · 9h — 12h</option>
            <option>Après-midi · 13h — 17h</option>
            <option>À convenir avec moi</option>
          </select>
        </label>
      </div>

      <label className="mt-5 block text-sm font-semibold text-ssb-ink">
        Adresse ou point de repère
        <textarea required name="adresse" rows={3} className={CHAMPS} placeholder="Indiquez l'adresse précise, un point de repère et toute précision utile." />
      </label>

      <label className="mt-5 block text-sm font-semibold text-ssb-ink">
        Une précision pour nous ? <span className="font-normal text-ssb-ink/45">(facultatif)</span>
        <textarea name="note" rows={2} className={CHAMPS} placeholder="Ex. appeler avant d'arriver." />
      </label>

      <button
        type="submit"
        className="mt-8 w-full rounded-full bg-ssb-ink px-6 py-4 text-sm font-semibold text-white transition hover:bg-ssb-green"
      >
        Confirmer ma demande de livraison
      </button>
    </form>
  );
}

export function ResumeCommande() {
  const params = useSearchParams();
  const produit = PRODUITS.find((item) => item.slug === params.get("produit"));

  return (
    <aside className="rounded-[2rem] bg-ssb-ink p-7 text-white md:p-8">
      <p className="label text-ssb-green">Votre commande</p>
      {produit ? (
        <div className="mt-7">
          <p className="text-sm text-white/55">{produit.famille}</p>
          <h2 className="mt-2 font-display text-3xl leading-tight">{produit.nom}</h2>
          <p className="mt-5 font-display text-2xl text-ssb-green">{formatPrix(produit.prix)}</p>
        </div>
      ) : (
        <p className="mt-5 text-sm leading-relaxed text-white/70">
          Votre sélection sera confirmée avec un conseiller avant la livraison.
        </p>
      )}

      <div className="mt-8 border-t border-white/10 pt-7">
        <div className="flex gap-3">
          <span className="mt-0.5 text-ssb-green">✓</span>
          <p className="text-sm leading-relaxed text-white/75">
            Aucun paiement en ligne. Vous ne payez qu&apos;après la confirmation de votre commande.
          </p>
        </div>
        <div className="mt-5 flex gap-3">
          <span className="mt-0.5 text-ssb-green">✓</span>
          <p className="text-sm leading-relaxed text-white/75">
            Un conseiller confirme la disponibilité et les frais de livraison avec vous.
          </p>
        </div>
      </div>
    </aside>
  );
}
