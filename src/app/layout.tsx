import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://subsaharianbio.com"),
  title: {
    default: "Sub Saharan Bio — Soins naturels visage & corps",
    template: "%s · Sub Saharan Bio",
  },
  description:
    "Des soins bio formulés pour les peaux africaines. Élixir de Marula, sérums, savons et gammes complètes visage et corps.",
  openGraph: {
    type: "website",
    locale: "fr_CI",
    siteName: "Sub Saharan Bio",
    images: ["/video/hero-desktop-poster.jpg"],
  },
  icons: {
    icon: [
      { url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/logo-ssb.svg", type: "image/svg+xml" },
    ],
    apple: "/brand/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#90af47",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${manrope.variable}`}>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
