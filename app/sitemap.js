import { posts } from "@/data/posts";

const BASE = "https://kandelmanish.com.np";

export default function sitemap() {
  const now = new Date();
  return [
    { url: `${BASE}/`, lastModified: now, priority: 1.0 },
    { url: `${BASE}/projects`, lastModified: now, priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: now, priority: 0.8 },
    ...posts.map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      priority: 0.7,
    })),
    { url: `${BASE}/contact`, lastModified: now, priority: 0.6 },
    { url: `${BASE}/resume`, lastModified: now, priority: 0.5 },
  ];
}
