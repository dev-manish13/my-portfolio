import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatDate } from "@/data/posts";

// `titleAs` keeps the outline valid: h2 directly under a page h1, h3 inside a titled section.
export default function PostList({ posts, titleAs: Title = "h3" }) {
  return (
    <ul className="divide-y divide-border border-y border-border">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            href={`/blog/${post.slug}`}
            className="group grid gap-2 py-6 sm:grid-cols-[10rem_1fr_auto] sm:gap-6"
          >
            <p className="text-caption tabular-nums text-ink-muted sm:pt-1">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span className="block sm:mt-1">{post.readingTime}</span>
            </p>
            <div>
              <Title className="text-card-title text-ink decoration-brand decoration-2 underline-offset-4 group-hover:underline">
                {post.title}
              </Title>
              <p className="mt-2 line-clamp-2 text-label font-normal text-ink-muted">
                {post.excerpt}
              </p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <li key={tag} className="tag">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
            <span
              aria-hidden="true"
              className="hidden text-ink-muted transition-[transform,color] group-hover:translate-x-1 group-hover:text-brand-ink sm:block sm:pt-0.5"
            >
              <ArrowRight size={20} />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
