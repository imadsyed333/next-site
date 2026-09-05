import type { Project } from "../types";

export const projects: Project[] = [
  {
    name: "MOVE",
    description:
      "Toronto's traffic analytics app. Pagination, map–table linking, and report metadata — work I owned across the stack.",
    imageLink: "/images/toronto-logo.png",
    url: "https://github.com/CityofToronto/bdit_flashcrow",
    stack: ["JavaScript", "Vue", "Vuex / Pinia", "PostgreSQL"],
    featured: true,
  },
  {
    name: "Civic Dashboard",
    description:
      "Open-source Next.js tools so Torontonians can follow City Council and act on what is coming up. Cached data fetching and empty states were the pieces I owned.",
    imageLink: "/images/civic-dashboard.svg",
    url: "https://github.com/civic-dashboard/civic-dashboard-web",
    stack: ["TypeScript", "Next.js", "React", "PostgreSQL"],
  },
  {
    name: "CrashLog",
    description:
      "A mobile app for logging what matters after a collision — the project I'm building now.",
    imageLink: "/images/crashlog-placeholder.svg",
    url: "https://github.com/imadsyed333/crashlog",
    stack: ["TypeScript", "React Native", "Zustand", "Expo"],
  },
  {
    name: "Samosa Stuff",
    description:
      "Shop and checkout for a small business that sells samosas. And other stuff.",
    imageLink: "/images/samosa-logo.svg",
    url: "https://github.com/imadsyed333/samosa-stuff-mono",
    stack: ["TypeScript", "React", "React Query", "Express", "Prisma"],
  },
  {
    name: "EasyChef",
    description:
      "A recipe-sharing app from school: accounts, posts, and a Django API.",
    imageLink: "/images/easychef-logo.png",
    url: "https://github.com/imadsyed333/EasyChef",
    stack: ["JavaScript", "React", "Django", "SQLite"],
  },
];
