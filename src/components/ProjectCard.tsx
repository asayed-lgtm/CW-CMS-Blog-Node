import Link from "next/link";
import type { ProjectFrontmatter } from "@/lib/mdx";

export default function ProjectCard({
  slug,
  frontmatter
}: {
  slug: string;
  frontmatter: ProjectFrontmatter;
}) {
  return (
    <Link
      href={`/projects/${slug}`}
      className="block border border-gray-200 rounded-lg p-5 hover:border-accent transition-colors"
    >
      <h3 className="text-lg font-semibold mb-1">{frontmatter.title}</h3>
      <p className="text-sm text-gray-600 mb-2">{frontmatter.description}</p>
      <div className="flex gap-2 flex-wrap">
        {frontmatter.tags?.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
