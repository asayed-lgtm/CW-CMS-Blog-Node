export const metadata = {
  title: "About"
};

export default function AboutPage() {
  return (
    <article className="prose-content">
      <h1 className="text-2xl font-bold mb-4">About</h1>
      <p>
        This is a demo blog and portfolio site built to show how a
        statically generated Next.js project — with content coming from a
        headless CMS layer and local MDX files — can be deployed to a
        regular Node.js server instead of a serverless platform.
      </p>
      <p>
        Replace this page with your own bio. The blog posts on this site
        come from <code>src/lib/cms.ts</code>, which currently reads a
        local JSON file standing in for a headless CMS. Swap it for
        Contentful, Sanity, or any other API without touching a single
        page component.
      </p>
    </article>
  );
}
