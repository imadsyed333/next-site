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
    description: "A formicarium (ant farm) for TTC buses.",
    imageLink: "/images/transitarium-placeholder.svg",
    url: "https://github.com/imadsyed333/bus-ro-dah",
    stack: ["TypeScript", "Vue", "Nuxt", "Leaflet"],
  },
  {
    name: "CrashPad",
    description: "A Next.js app helping drivers accurately report car crashes.",
    imageLink: "/images/crashpad-banner.webp",
    url: "https://github.com/imadsyed333/crashpad",
    stack: ["TypeScript", "Next.js", "Zustand"],
  },
  {
    name: "Cinelytics",
    description:
      "A Next.js app for using AI to understand box office performances.",
    imageLink: "/images/cinelytics-placeholder.svg",
    url: "https://github.com/imadsyed333/cinelytics",
    stack: ["TypeScript", "Next.js", "React", "Ollama"],
  },
  {
    name: "CrashPoint",
    description:
      "An ETL pipeline for validating geospatial data of traffic collisions involving killed or seriously injured (KSI) persons from the City of Toronto",
    imageLink: "/images/crashpoint-placeholder.svg",
    url: "https://github.com/imadsyed333/crashpoint-etl",
    stack: ["Python", "Airflow", "GeoPandas", "Docker"],
  },
];
