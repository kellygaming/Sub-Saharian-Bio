"use client";

import { useEffect, useState } from "react";

const NAV = [
  { label: "Soins", href: "#elixir" },
  { label: "Diagnostic", href: "#diagnostic" },
  { label: "Gammes", href: "#gammes" },
  { label: "Notre histoire", href: "#histoire" },
];

export default function SiteHeader() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    // Le header ne devient opaque qu'une fois le hero franchi : par-dessus la
    // vidéo, un bandeau nude couperait l'image en deux.
    const hero = document.querySelector<HTMLElement>(".hero");
    const threshold = () => (hero ? hero.offsetHeight - 96 : 24);
    const onScroll = () => setSolid(window.scrollY > threshold());
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? "bg-ssb-nude/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 md:px-12">
        <a href="#top" className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logo-ssb.svg"
            alt="Sub Saharan Bio"
            width={40}
            height={40}
            className="h-10 w-10"
          />
          <span
            className={`label hidden sm:block ${
              solid ? "text-ssb-ink" : "text-white"
            }`}
          >
            Sub Saharan Bio
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                solid
                  ? "text-ssb-ink hover:text-ssb-green-deep"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#diagnostic"
          className="rounded-full bg-ssb-green px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-ssb-green-deep"
        >
          Diagnostic gratuit
        </a>
      </div>
    </header>
  );
}
