import Image from "next/image";
import { StackList } from "@/components/StackList";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card glass fade-in h-full overflow-hidden shadow-none">
      <a
        href={project.url}
        target="_blank"
        rel="noreferrer"
        className="flex h-full flex-col text-inherit no-underline"
      >
        {project.imageLink ? (
          <figure className="relative h-40 w-full bg-white/10">
            {project.imageLink.endsWith(".svg") ? (
              <img
                src={project.imageLink}
                alt={project.name}
                className="h-full w-full object-contain p-4"
              />
            ) : (
              <Image
                src={project.imageLink}
                alt={project.name}
                fill
                className="object-contain p-4"
                sizes="(max-width: 600px) 100vw, 25vw"
              />
            )}
          </figure>
        ) : (
          <div
            className="flex h-40 w-full items-center justify-center bg-neutral text-neutral-content"
            aria-hidden
          >
            <span className="text-2xl font-light">{project.name}</span>
          </div>
        )}
        <div className="card-body">
          <h2 className="card-title text-left text-xl font-normal text-white/90">
            {project.name}
          </h2>
          <p className="text-sm leading-relaxed text-white/80">
            {project.description}
          </p>
          <StackList stack={project.stack} />
        </div>
      </a>
    </article>
  );
}
