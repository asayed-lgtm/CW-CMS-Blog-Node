import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/cms";

// SSG: pre-render every post at build time.
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);
  return { title: post?.title ?? "Post not found" };
}

export default async function BlogPostPage({
  params
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="prose-content">
      <p className="text-xs uppercase tracking-wide text-gray-400 mb-2">
        {new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric"
        })}
      </p>
      <h1 className="text-2xl font-bold mb-6">{post.title}</h1>
      {post.body.split("\n\n").map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </article>
  );
}
