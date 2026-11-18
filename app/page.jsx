import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import RecentNotes from "@/components/RecentNotes";
import JsonLd from "@/components/JsonLd";
import { profile, SITE_URL } from "@/data/profile";
import { pageMetadata, absoluteUrl, SITE_NAME } from "@/lib/seo";

export const metadata = pageMetadata({
  description:
    "Full-stack developer building React web applications, Node.js REST APIs, and automated Python data pipelines in Kathmandu, Nepal.",
  path: "/",
});

const personId = `${SITE_URL}/#person`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": personId,
  name: profile.name,
  jobTitle: profile.role,
  url: SITE_URL,
  image: absoluteUrl(profile.avatar),
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.locality,
    addressCountry: profile.country,
  },
  sameAs: [profile.github, profile.linkedin],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "en",
  author: { "@id": personId },
};

export default function Home() {
  return (
    <>
      <JsonLd data={personJsonLd} />
      <JsonLd data={websiteJsonLd} />
      <Hero />
      <About />
      <Skills />
      <RecentNotes />
    </>
  );
}
