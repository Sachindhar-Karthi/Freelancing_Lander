import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Studio | Creative Developer & UI/UX Designer",
    short_name: "Studio",
    description: "Portfolio of a creative developer and UI/UX designer blending code and design.",
    start_url: "/",
    display: "standalone",
    background_color: "#F8F9F6",
    theme_color: "#F8F9F6",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
