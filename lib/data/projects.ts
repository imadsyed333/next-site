import type { Project } from "../types";

export const projects: Project[] = [
  {
    name: "MOVE",
    description:
      "Working repository for MOVE, a project to modernize transportation data systems at the City of Toronto.",
    imageLink: "/images/toronto-logo.png",
    url: "https://github.com/CityofToronto/bdit_flashcrow",
    stack: ["JavaScript", "Vue", "Vuex / Pinia", "PostgreSQL"],
  },
  {
    name: "Civic Dashboard",
    description: "Making Toronto's democracy more accessible.",
    imageLink: "/images/civic-dashboard.svg",
    url: "https://github.com/civic-dashboard/civic-dashboard-web",
    stack: ["TypeScript", "Next.js", "React", "PostgreSQL"],
  },
  {
    name: "Transitarium",
    description:
      "Working repository for Transitarium, a formicarium (ant farm) for TTC buses.",
    imageLink: "/images/transitarium-placeholder.svg",
    url: "https://github.com/imadsyed333/bus-ro-dah",
    stack: ["TypeScript", "Vue", "Nuxt", "Leaflet"],
  },
  {
    name: "CrashPad",
    description:
      "Working repository for CrashPad, a Next.js PWA helping drivers report car crashes.",
    imageLink: "/images/crashpad-banner.webp",
    url: "https://github.com/imadsyed333/crashpad",
    stack: ["TypeScript", "React Native", "Zustand", "Expo"],
  },
  {
    name: "Cinelytics",
    description:
      "Working repository for Cinelytics, a full-stack web app for movie analytics, and home to Kowalski, an AI movie analyst.",
    imageLink: "/images/cinelytics-placeholder.svg",
    url: "https://github.com/imadsyed333/cinelytics",
    stack: ["TypeScript", "Next.js", "React", "Ollama"],
  },
  {
    name: "CrashPoint",
    description:
      "Working repository for CrashPoint ETL, a pipeline for processing and analyzing traffic collisions involving killed or seriously injured (KSI) persons from the City of Toronto",
    imageLink: "/images/crashpoint-placeholder.svg",
    url: "https://github.com/imadsyed333/crashpoint-etl",
    stack: ["Python", "Airflow", "GeoPandas", "Docker"],
  },
];
