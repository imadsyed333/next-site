import { HobbyItemCard } from "@/components/HobbyItemCard";
import type { HobbyItem } from "@/lib/types";

export function HobbyGrid({ items }: { items: HobbyItem[] }) {
  return (
    <div className="mt-6 grid w-full max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => (
        <HobbyItemCard key={item.name} item={item} />
      ))}
    </div>
  );
}
