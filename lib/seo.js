import { profile, SITE_URL } from "@/data/profile";

export const SITE_TITLE = `${profile.name} — ${profile.role}`;
export const SITE_NAME = `${profile.name} Portfolio`;
export const RSS_PATH = "/rss.xml";

// Served by app/opengraph-image.js. Listed explicitly because a page that sets
// its own `openGraph` no longer inherits the root segment's generated image.
const ogImage = { url: "/opengraph-image", width: 1200, height: 630, alt: SITE_TITLE };

const feeds = { "application/rss+xml": [{ url: RSS_PATH, title: `${profile.name} — Blog` }] };

export const absoluteUrl = (path = "/") => new URL(path, SITE_URL).toString();

/**
 * Per-page metadata. A page that sets `alternates`, `openGraph` or `twitter`
 * replaces the root layout's object wholesale (Next merges metadata shallowly),
 * so every page builds the full set here to keep canonical, RSS and social
 * tags consistent. Paths are resolved against `metadataBase`.
 */
export function pageMetadata({ title, description, path, type = "website", openGraph = {} }) {
  const socialTitle = title ? `${title} | ${profile.name}` : SITE_TITLE;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path, types: feeds },
    openGraph: {
      type,
      locale: "en_US",
      siteName: SITE_NAME,
      url: path,
      title: socialTitle,
      description,
      images: [ogImage],
      ...openGraph,
    },
    twitter: { card: "summary_large_image", title: socialTitle, description, images: [ogImage] },
  };
}

export const rootAlternates = { types: feeds };
