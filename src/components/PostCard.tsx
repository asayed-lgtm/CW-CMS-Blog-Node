import Link from "next/link";
import type { Post } from "@/lib/cms";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="block border border-gray-200 rounded-lg p-5 hover:border-accent transition-colors"
    >
      <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">
        {new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric"
        })}
      </p>
      <h3 className="text-lg font-semibold mb-1">{post.title}</h3>
      <p className="text-sm text-gray-600">{post.excerpt}</p>
    </Link>
  );
}
