import type { Metadata } from "next";
import { HobbyGrid } from "@/components/HobbyGrid";
import { books } from "@/lib/data/hobbies";

export const metadata: Metadata = { title: "Books" };

export default function BooksPage() {
  return <HobbyGrid items={books} />;
}
