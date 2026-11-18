import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Renders inside the root layout, so the 404 keeps the nav, footer and theme.
export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col items-start px-6 py-24 md:py-32">
      <p className="text-caption font-medium uppercase tracking-wider text-ink-muted">Error 404</p>
      <h1 className="mt-3 text-display-lg text-ink">Page not found</h1>
      <p className="mt-4 max-w-md text-body text-ink-muted">
        The link may be broken or the page may have moved. Try one of these instead.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn-primary">
          <ArrowLeft size={16} aria-hidden="true" />
          Back home
        </Link>
        <Link href="/projects" className="btn-secondary">
          View projects
        </Link>
      </div>
    </section>
  );
}
