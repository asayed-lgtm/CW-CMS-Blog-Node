import fs from "fs";
import path from "path";
import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "src/content/projects");

export type ProjectFrontmatter = {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  repo?: string;
  demo?: string;
};

export type Project = {
  slug: string;
  frontmatter: ProjectFrontmatter;
  content: string;
};

export function getAllProjectSlugs(): string[] {
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getAllProjects(): Project[] {
  return getAllProjectSlugs()
    .map((slug) => getProjectBySlug(slug))
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

export function getProjectBySlug(slug: string): Project {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    frontmatter: data as ProjectFrontmatter,
    content
  };
}
