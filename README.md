# Cloudways Blog + Portfolio (Next.js, SSG, headless CMS)

A statically generated Next.js blog and portfolio, built to demonstrate
deploying a Node.js app on Cloudways. Blog posts are modeled as headless
CMS content (mocked with local JSON, swappable for Contentful/Sanity);
portfolio projects are local MDX files.

## Stack

- Next.js 14 (App Router, TypeScript)
- Tailwind CSS
- `generateStaticParams` for static generation of `/blog/[slug]` and
  `/projects/[slug]`
- A pluggable CMS layer (`src/lib/cms.ts`) — mock JSON by default, real
  API in one file swap

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

```
src/
  app/
    page.tsx                # homepage
    blog/page.tsx            # blog index
    blog/[slug]/page.tsx      # blog post (SSG)
    projects/page.tsx         # projects index
    projects/[slug]/page.tsx  # project detail (SSG)
    about/page.tsx
  components/                 # Nav, Footer, PostCard, ProjectCard
  content/projects/*.mdx      # portfolio entries (frontmatter + body)
  data/posts.json             # mock "headless CMS" blog data
  lib/
    cms.ts                    # blog content access — swap this for a real CMS
    mdx.ts                    # reads/parses the local MDX project files
```

## Swapping in a real headless CMS

Everything blog-related goes through `getAllPosts()` / `getPostBySlug()`
in `src/lib/cms.ts`. To point at a real CMS instead of the bundled mock
JSON:

1. Create a free-tier space/project on Contentful or Sanity.
2. Add a content type/schema with fields matching the `Post` type
   (`slug`, `title`, `excerpt`, `date`, `body`).
3. Install the SDK (`npm install contentful` or `npm install
   @sanity/client`) and add your API keys to `.env.local` (see
   `.env.example`).
4. Replace the body of `getAllPosts` / `getPostBySlug` in `src/lib/cms.ts`
   with calls to the SDK, mapping the response to the `Post` shape.

No page component needs to change — they only call the two functions in
`cms.ts`.

## Adding a new portfolio project

Add a new `.mdx` file under `src/content/projects/`, following the
frontmatter shape in the existing files (`title`, `description`, `date`,
`tags`, optional `repo`/`demo`). It's picked up automatically at build
time via `generateStaticParams`.

## Connecting this to GitHub

```bash
cd cloudways-blog-cms
git init                     # already done if you downloaded the zip as-is
git add -A
git commit -m "Initial commit"
gh repo create your-username/cloudways-blog-cms --public --source=. --push
```

If you don't use the `gh` CLI, create an empty repo on github.com instead,
then:

```bash
git remote add origin https://github.com/your-username/cloudways-blog-cms.git
git branch -M main
git push -u origin main
```

## Deploying to Cloudways

See [`CLOUDWAYS_DEPLOY.md`](./CLOUDWAYS_DEPLOY.md) for the full walkthrough.
