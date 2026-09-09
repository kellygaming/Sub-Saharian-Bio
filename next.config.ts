import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // Visuels générés sur Higgsfield, servis depuis leur CDN en attendant
    // d'être rapatriés dans /public.
    remotePatterns: [
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
