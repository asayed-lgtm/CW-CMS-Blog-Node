import { notFound } from "next/navigation";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/mdx";

// SSG: pre-render every project page at build time.
export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const project = getProjectBySlug(params.slug);
    return { title: project.frontmatter.title };
  } catch {
    return { title: "Project not found" };
  }
}

export default function ProjectPage({
  params
}: {
  params: { slug: string };
}) {
  let project;
  try {
    project = getProjectBySlug(params.slug);
  } catch {
    notFound();
  }

  const { frontmatter, content } = project!;

  return (
    <article className="prose-content">
      <h1 className="text-2xl font-bold mb-2">{frontmatter.title}</h1>
      <p className="text-gray-600 mb-4">{frontmatter.description}</p>
      <div className="flex gap-2 flex-wrap mb-6">
        {frontmatter.tags?.map((tag) => (
          <span
            key={tag}
            className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
      {(frontmatter.repo || frontmatter.demo) && (
        <p className="mb-6 text-sm">
          {frontmatter.repo && (
            <a
              href={frontmatter.repo}
              className="text-accent underline mr-4"
            >
              Source
            </a>
          )}
          {frontmatter.demo && (
            <a href={frontmatter.demo} className="text-accent underline">
              Live demo
            </a>
          )}
        </p>
      )}
      {/* This project renders raw MDX body text as plain paragraphs/headings
          to avoid an extra runtime dependency. Swap in <MDXRemote> from
          next-mdx-remote if you need rich MDX components. */}
      {content
        .trim()
        .split("\n\n")
        .map((block, i) => {
          if (block.startsWith("## ")) {
            return (
              <h2 key={i} className="text-lg font-semibold">
                {block.replace("## ", "")}
              </h2>
            );
          }
          if (block.startsWith("- ")) {
            return (
              <ul key={i}>
                {block
                  .split("\n")
                  .map((line) => line.replace(/^- /, ""))
                  .map((item, j) => <li key={j}>{item}</li>)}
              </ul>
            );
          }
          return <p key={i}>{block}</p>;
        })}
    </article>
  );
}
