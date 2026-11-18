import { posts } from "@/data/posts";
import { profile } from "@/data/profile";
import { absoluteUrl, RSS_PATH } from "@/lib/seo";

// Built once at build time; the feed only changes when posts do.
export const dynamic = "force-static";

const escapeXml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const rfc822 = (iso) => new Date(`${iso}T00:00:00Z`).toUTCString();

export function GET() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  const items = sorted
    .map((post) => {
      const url = absoluteUrl(`/blog/${post.slug}`);
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rfc822(post.date)}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
${post.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`).join("\n")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${profile.name} — Blog`)}</title>
    <link>${absoluteUrl("/blog")}</link>
    <description>${escapeXml(
      "Notes on web scraping pipelines, backend architecture, and lessons from building production tools."
    )}</description>
    <language>en</language>
    <atom:link href="${absoluteUrl(RSS_PATH)}" rel="self" type="application/rss+xml" />
${sorted[0] ? `    <lastBuildDate>${rfc822(sorted[0].date)}</lastBuildDate>\n` : ""}${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
