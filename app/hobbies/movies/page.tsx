import type { Metadata } from "next";
import { HobbyGrid } from "@/components/HobbyGrid";
import { movies } from "@/lib/data/hobbies";

export const metadata: Metadata = { title: "Movies" };

export default function MoviesPage() {
  return <HobbyGrid items={movies} />;
}
