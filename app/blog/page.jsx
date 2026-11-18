import PostList from "@/components/PostList";
import { posts } from "@/data/posts";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Blog",
  description:
    "Thoughts on web scraping pipelines, backend architecture, and lessons from building production tools.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
      <h1 className="text-display-lg text-ink">
        Writing &amp; Technical Notes
      </h1>
      <p className="mb-10 mt-4 max-w-xl text-body text-ink-muted">
        Thoughts on web scraping pipelines, backend architecture, and lessons from building
        production tools.
      </p>
      <PostList posts={posts} titleAs="h2" />
    </section>
  );
}
