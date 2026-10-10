import Link from "next/link";
import PostList from "@/components/PostList";
import { posts } from "@/data/posts";

export default function RecentNotes() {
  const latest = [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 2);

  return (
    <section id="notes" className="scroll-mt-14 px-6 py-12 md:py-16">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Recent Notes</h2>
          <Link href="/blog" className="text-sm text-text-muted transition-colors duration-150 hover:text-foreground">
            View all writing ↗
          </Link>
        </div>
        <PostList posts={latest} />
      </div>
    </section>
  );
}
