import type { Metadata } from "next";
import { HobbyGrid } from "@/components/HobbyGrid";
import { games } from "@/lib/data/hobbies";

export const metadata: Metadata = { title: "Games" };

export default function GamesPage() {
  return <HobbyGrid items={games} />;
}
