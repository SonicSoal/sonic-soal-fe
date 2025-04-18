import { MetadataRoute } from "next";


// const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SonicSoal",
    short_name: "SonicSoal",
    description:
      "Experience the power of frequency-optimized audio designed to enhance focus, relaxation, and spiritual alignment.",
    start_url: "/",
    display: "standalone",
    theme_color: "#ffffff",
    background_color: "#ffffff",
    icons: [
      {
        src: "/manifest-icon-192.maskable.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/manifest-icon-512.maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}