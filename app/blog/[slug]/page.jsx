import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, formatDate } from "@/data/posts";
import AntiBotPost from "@/components/posts/AntiBotPost";
import ErTriagePost from "@/components/posts/ErTriagePost";
import InternshipPost from "@/components/posts/InternshipPost";
import TelegramBotPost from "@/components/posts/TelegramBotPost";

// Posts with a written body. Others fall back to a "coming soon" note.
const BODIES = {
  "bypassing-modern-anti-bot-protections": AntiBotPost,
  "algorithmic-er-triage-architecture": ErTriagePost,
  "building-resilient-telegram-bots": TelegramBotPost,
  "what-i-learned-during-my-frontend-internship": InternshipPost,
};

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const Body = BODIES[slug];

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-12 md:py-16">
    <article className="max-w-3xl">
      <Link href="/blog" className="text-sm text-text-muted transition-colors duration-150 hover:text-foreground">
        ← All writing
      </Link>
      <p className="mt-8 font-mono text-xs text-text-muted">
        <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingTime}
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl dark:text-zinc-100 leading-tight">
        {post.title}
      </h1>
      <ul className="mt-5 flex flex-wrap gap-1.5">
        {post.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-md border border-border bg-surface-muted px-2 py-0.5 font-mono text-xs text-zinc-500 dark:text-zinc-400"
          >
            {tag}
          </li>
        ))}
      </ul>
      {Body ? (
        <div className="mt-10">
          <Body />
        </div>
      ) : (
        <>
          <p className="mt-6 text-lg leading-relaxed text-text-muted">{post.excerpt}</p>
          <p className="mt-10 rounded-lg border border-dashed border-border p-5 text-sm text-text-muted">
            The full post is coming soon.
          </p>
        </>
      )}
    </article>
    </div>
  );
}
