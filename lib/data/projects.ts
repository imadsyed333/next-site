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
    name: "CrashLog",
    description:
      "Working repository for CrashLog, a cross-platform mobile app helping drivers report car crashes",
    imageLink: "/images/crashlog-placeholder.svg",
    url: "https://github.com/imadsyed333/crashlog",
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
