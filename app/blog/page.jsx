import PostList from "@/components/PostList";
import { posts } from "@/data/posts";

export const metadata = {
  title: "Blog",
  description:
    "Thoughts on web scraping pipelines, backend architecture, and lessons from building production tools.",
};

export default function BlogPage() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12 md:py-16">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl dark:text-zinc-100">
        Writing &amp; Technical Notes
      </h1>
      <p className="mb-10 mt-3 max-w-xl text-text-muted">
        Thoughts on web scraping pipelines, backend architecture, and lessons from building
        production tools.
      </p>
      <PostList posts={posts} />
    </section>
  );
}
