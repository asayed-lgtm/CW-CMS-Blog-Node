import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" }
];

export default function Nav() {
  return (
    <header className="border-b border-gray-200">
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg">
          aaqib<span className="text-accent">.dev</span>
        </Link>
        <nav className="flex gap-5 text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-600 hover:text-ink transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
