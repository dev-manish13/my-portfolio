import Link from "next/link";
import { JetBrains_Mono } from "next/font/google";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { posts, formatDate } from "@/data/posts";
import AntiBotPost from "@/components/posts/AntiBotPost";
import ErTriagePost from "@/components/posts/ErTriagePost";
import InternshipPost from "@/components/posts/InternshipPost";
import TelegramBotPost from "@/components/posts/TelegramBotPost";
import JsonLd from "@/components/JsonLd";
import { profile, SITE_URL } from "@/data/profile";
import { pageMetadata, absoluteUrl } from "@/lib/seo";

// Posts with a written body. Others fall back to a "coming soon" note.
const BODIES = {
  "bypassing-modern-anti-bot-protections": AntiBotPost,
  "algorithmic-er-triage-architecture": ErTriagePost,
  "building-resilient-telegram-bots": TelegramBotPost,
  "what-i-learned-during-my-frontend-internship": InternshipPost,
};

// Code blocks only appear in posts, so the mono face is loaded (and preloaded) here only.
const mono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: "article",
    openGraph: { publishedTime: post.date, authors: [profile.name], tags: post.tags },
  });
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const Body = BODIES[slug];
  const url = absoluteUrl(`/blog/${post.slug}`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: profile.name, url: SITE_URL },
    url,
    mainEntityOfPage: url,
    keywords: post.tags.join(", "),
  };

  return (
    <div className={`${mono.variable} mx-auto w-full max-w-5xl px-6 py-16 md:py-24`}>
    <JsonLd data={jsonLd} />
    <article className="max-w-3xl">
      <Link href="/blog" className="inline-flex items-center gap-1 text-label text-ink-muted transition-colors duration-150 hover:text-brand-ink">
        <ArrowLeft size={16} aria-hidden="true" />
        All writing
      </Link>
      <p className="mt-8 text-caption text-ink-muted">
        <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingTime}
      </p>
      <h1 className="mt-3 text-display-lg text-ink">
        {post.title}
      </h1>
      <ul className="mt-5 flex flex-wrap gap-1.5">
        {post.tags.map((tag) => (
          <li key={tag} className="tag">
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
          <p className="mt-6 text-lead text-ink-muted">{post.excerpt}</p>
          <p className="card mt-10 p-5 text-label font-normal text-ink-muted">
            The full post is coming soon.
          </p>
        </>
      )}
    </article>
    </div>
  );
}
