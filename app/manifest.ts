import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Imad Syed",
    short_name: "Gondolin",
    description:
      "Imad Syed — software developer in Toronto. Tools for cities and small businesses.",
    start_url: "/",
    display: "standalone",
    background_color: "#041e32",
    theme_color: "#24acfd",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
