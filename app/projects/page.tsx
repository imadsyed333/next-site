import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work — civic tools, traffic analytics, a collision app, and a few others.",
};

export default function ProjectsPage() {
  return (
    <section className="page">
      <h1 className="page-title">Projects</h1>
      <p className="lede">Work I can show. Repos open in a new tab.</p>
      <div className="projects-grid mt-4 grid w-full max-w-6xl auto-rows-fr grid-cols-1 gap-8 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
}
