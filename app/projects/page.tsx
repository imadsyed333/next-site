import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected projects. Click to view on GitHub.",
};

export default function ProjectsPage() {
  return (
    <section className="page">
      <h1 className="page-title">Projects</h1>
      <p className="lede">Click to view on GitHub.</p>
      <div className="projects-grid mt-4 grid w-full max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
}
