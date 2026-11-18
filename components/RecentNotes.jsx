import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PostList from "@/components/PostList";
import { posts } from "@/data/posts";

export default function RecentNotes() {
  const latest = [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 2);

  return (
    <section id="notes" className="scroll-mt-14 px-6 pb-16 pt-8 md:pb-24 md:pt-16">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="text-section text-ink">Recent notes</h2>
          <Link href="/blog" className="link min-h-11 text-label md:min-h-0">
            View all writing
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <PostList posts={latest} />
      </div>
    </section>
  );
}
