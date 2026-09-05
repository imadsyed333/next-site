import type { Project } from "../types";

export const projects: Project[] = [
  {
    name: "MOVE",
    description:
      "A full-stack, end-to-end, web app for modernizing transportation data systems at the City of Toronto.",
    imageLink: "/images/toronto-logo.png",
    url: "https://github.com/CityofToronto/bdit_flashcrow",
    stack: ["JavaScript", "Vue", "Vuex / Pinia", "PostgreSQL"],
  },
  {
    name: "CrashLog",
    description:
      "A cross-platform mobile app to simplify self-reporting vehicle collisions.",
    imageLink: "",
    url: "https://github.com/imadsyed333/crashlog",
    stack: ["TypeScript", "React Native", "Zustand", "Expo"],
  },
  {
    name: "Samosa Stuff",
    description:
      "A full-stack, end-to-end e-commerce app for a small business selling samosas. And other stuff.",
    imageLink: "/images/samosa-logo.svg",
    url: "https://github.com/imadsyed333/samosa-stuff-mono",
    stack: ["TypeScript", "React", "React Query", "Express", "Prisma"],
  },
  {
    name: "EasyChef",
    description:
      "A full-stack, end-to-end social media app for creating and sharing your favorite recipes.",
    imageLink: "/images/easychef-logo.png",
    url: "https://github.com/imadsyed333/EasyChef",
    stack: ["JavaScript", "React", "Django", "SQLite"],
  },
];
