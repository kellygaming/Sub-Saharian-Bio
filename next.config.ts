import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // Les photos officielles des produits sont actuellement servies par
    // la boutique Sub Saharian Bio ; les pack-shots locaux restent supportés.
    remotePatterns: [
      { protocol: "https", hostname: "www.subsaharianbio.com" },
      { protocol: "https", hostname: "d8j0ntlcm91z4.cloudfront.net" },
    ],
  },
  headers: async () => [
    {
      // Les vidéos et le logo sont immuables : on les met en cache un an.
      source: "/:dir(video|brand)/:file*",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ],
    },
  ],
};

export default nextConfig;
