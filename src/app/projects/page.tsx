import { getAllProjects } from "@/lib/mdx";
import ProjectCard from "@/components/ProjectCard";

export const metadata = {
  title: "Projects"
};

export default function ProjectsIndexPage() {
  const projects = getAllProjects();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Projects</h1>
      <div className="grid gap-4">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            slug={project.slug}
            frontmatter={project.frontmatter}
          />
        ))}
      </div>
    </div>
  );
}
