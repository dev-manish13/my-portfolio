import Link from "next/link";
import { formatDate } from "@/data/posts";

export default function PostList({ posts }) {
  return (
    <ul className="divide-y divide-border border-y border-border">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            href={`/blog/${post.slug}`}
            className="group grid gap-2 py-6 sm:grid-cols-[10rem_1fr_auto] sm:gap-6"
          >
            <p className="font-mono text-xs text-text-muted sm:pt-1">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span className="block sm:mt-1">{post.readingTime}</span>
            </p>
            <div>
              <h3 className="font-semibold leading-snug tracking-tight decoration-1 underline-offset-4 group-hover:underline">
                {post.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-muted">
                {post.excerpt}
              </p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-md border border-border bg-surface-muted px-2 py-0.5 font-mono text-xs text-zinc-500 dark:text-zinc-400"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
            <span
              aria-hidden="true"
              className="hidden text-text-muted transition-transform group-hover:translate-x-1 sm:block sm:pt-0.5"
            >
              →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
