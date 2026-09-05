import type { Metadata } from "next";
import { HobbyGrid } from "@/components/HobbyGrid";
import { shows } from "@/lib/data/hobbies";

export const metadata: Metadata = { title: "Shows" };

export default function ShowsPage() {
  return <HobbyGrid items={shows} />;
}
