import Link from "next/link";
import { getAllPosts } from "@/lib/cms";
import { getAllProjects } from "@/lib/mdx";
import PostCard from "@/components/PostCard";
import ProjectCard from "@/components/ProjectCard";

export default async function HomePage() {
  const posts = (await getAllPosts()).slice(0, 2);
  const projects = getAllProjects().slice(0, 2);

  return (
    <div className="space-y-14">
      <section>
        <h1 className="text-3xl font-bold mb-3">Hi, I&apos;m Aaqib.</h1>
        <p className="text-gray-600 leading-relaxed">
          I write about shipping web apps and build small tools on the
          side. This site is statically generated with Next.js, pulls
          blog content from a headless CMS layer, and is deployed on
          Cloudways&apos; Node.js application hosting.
        </p>
      </section>

      <section>
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-xl font-semibold">Latest posts</h2>
          <Link href="/blog" className="text-sm text-accent hover:underline">
            View all
          </Link>
        </div>
        <div className="grid gap-4">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent projects</h2>
          <Link
            href="/projects"
            className="text-sm text-accent hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="grid gap-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              slug={project.slug}
              frontmatter={project.frontmatter}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
