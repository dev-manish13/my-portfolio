import {
  siReact,
  siNextdotjs,
  siJavascript,
  siTailwindcss,
  siNodedotjs,
  siExpress,
  siMysql,
  siGit,
  siPython,
} from "simple-icons";
import { CodeXml } from "lucide-react";

// Monochrome brand marks (Simple Icons, CC0) tinted with the text colour, so they
// stay single-colour like Ember asks. Named imports keep only these in the bundle.
const LOGOS = {
  React: siReact,
  "Next.js": siNextdotjs,
  JavaScript: siJavascript,
  "Tailwind CSS": siTailwindcss,
  "Node.js": siNodedotjs,
  Express: siExpress,
  MySQL: siMysql,
  Git: siGit,
  Python: siPython,
};

export default function TechLogo({ name, size = 16, className }) {
  const icon = LOGOS[name];
  // No brand mark exists (e.g. BeautifulSoup4): fall back to a Lucide outline icon.
  if (!icon) return <CodeXml size={size} className={className} aria-hidden="true" />;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d={icon.path} />
    </svg>
  );
}
