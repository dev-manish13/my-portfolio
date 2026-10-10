// NOTE: placeholder entries — replace with real posts (and add content) before relying on them.
export const posts = [
  {
    slug: "bypassing-modern-anti-bot-protections",
    title: "Bypassing Modern Anti-Bot Protections in Python: Beyond Simple Headers",
    date: "2026-03-15",
    readingTime: "7 min read",
    tags: ["Python", "Web Scraping", "Automation"],
    excerpt:
      "A breakdown of handling dynamic JavaScript rendering, TLS fingerprinting, and proxy rotation when scraping modern e-commerce targets.",
  },
  {
    slug: "algorithmic-er-triage-architecture",
    title: "Designing the Algorithmic ER Triage Queue: Why Rules Beat Complex ML for Initial Dispatch",
    date: "2026-01-22",
    readingTime: "6 min read",
    tags: ["Architecture", "Node.js", "MySQL"],
    excerpt:
      "How vital-sign scoring and deterministic priority queues provided predictable, low-latency triage recommendations under simulated emergency load.",
  },
  {
    slug: "building-resilient-telegram-bots",
    title: "Building Resilient Telegram Alert Bots with Webhooks and Python",
    date: "2025-11-10",
    readingTime: "4 min read",
    tags: ["Python", "Telegram API", "Automation"],
    excerpt:
      "Patterns for setting up reliable webhook receivers, error retries, and rate-limit backoffs for automated price and stock alerts.",
  },
  {
    slug: "what-i-learned-during-my-frontend-internship",
    title: "What I Learned During My Frontend Internship at Birgunj Bazar",
    date: "2025-09-28",
    readingTime: "4 min read",
    tags: ["Career", "React", "Frontend"],
    excerpt:
      "Key takeaways from moving beyond personal projects to maintaining production web catalogs, handling edge-case UI states, and working in a real codebase.",
  },
];

export const formatDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
