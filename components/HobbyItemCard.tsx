import Image from "next/image";
import type { HobbyItem } from "@/lib/types";

export function HobbyItemCard({ item }: { item: HobbyItem }) {
  return (
    <article className="card glass fade-in h-full overflow-hidden shadow-none">
      <figure className="relative h-56 w-full bg-white/40">
        <Image
          src={item.imageLink}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 600px) 100vw, 25vw"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-left text-lg font-normal text-[#111]">
          {item.name}
        </h2>
        <p className="text-sm leading-relaxed text-[#111]">{item.description}</p>
      </div>
    </article>
  );
}
