import { getAllPosts } from "@/lib/cms";
import PostCard from "@/components/PostCard";

export const metadata = {
  title: "Blog"
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Blog</h1>
      <div className="grid gap-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
