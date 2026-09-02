/**
 * Headless CMS access layer.
 *
 * This file is the ONLY place that knows where blog content comes from.
 * Right now it reads `src/data/posts.json` as a stand-in "CMS" so the
 * project runs immediately with zero external accounts. Swap in a real
 * headless CMS by replacing the two functions below — every page
 * (`/blog`, `/blog/[slug]`) calls only `getAllPosts` / `getPostBySlug`
 * and doesn't need to change.
 *
 * --- To swap in Contentful ---
 *   npm install contentful
 *   import { createClient } from "contentful";
 *   const client = createClient({
 *     space: process.env.CONTENTFUL_SPACE_ID!,
 *     accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
 *   });
 *   // then fetch entries of your "post" content type and map fields
 *   // to the Post shape below.
 *
 * --- To swap in Sanity ---
 *   npm install @sanity/client
 *   const client = createClient({
 *     projectId: process.env.SANITY_PROJECT_ID!,
 *     dataset: process.env.SANITY_DATASET ?? "production",
 *     apiVersion: "2024-01-01",
 *     token: process.env.SANITY_TOKEN,
 *   });
 *   // then run a GROQ query and map the result to Post[].
 */

import posts from "@/data/posts.json";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  body: string;
};

export async function getAllPosts(): Promise<Post[]> {
  // Simulates an async CMS fetch so swapping in a real API is a drop-in
  // change (real clients return promises).
  return [...(posts as Post[])].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const all = await getAllPosts();
  return all.find((post) => post.slug === slug);
}
