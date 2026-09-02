import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-2xl font-bold mb-2">Page not found</h1>
      <p className="text-gray-600 mb-6">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link href="/" className="text-accent underline">
        Back home
      </Link>
    </div>
  );
}
