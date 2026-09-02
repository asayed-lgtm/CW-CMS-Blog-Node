import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Aaqib Sayed — Blog & Portfolio",
    template: "%s · Aaqib Sayed"
  },
  description:
    "A statically generated Next.js blog and portfolio, powered by a headless CMS, built to demo deployment on Cloudways."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased">
        <Nav />
        <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
