import Contact from "@/components/Contact";
import { profile } from "@/data/profile";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description: `Get in touch with ${profile.name} — email, GitHub and LinkedIn.`,
  path: "/contact",
});

export default function ContactPage() {
  return <Contact />;
}
