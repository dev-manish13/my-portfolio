import { Soup } from "lucide-react";
import {
  SiReact,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiPython,
  SiGit,
} from "react-icons/si";
import { skillGroups } from "@/data/profile";

const ICONS = {
  React: SiReact,
  JavaScript: SiJavascript,
  "Tailwind CSS": SiTailwindcss,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  MySQL: SiMysql,
  Python: SiPython,
  BeautifulSoup4: Soup, // no brand mark available in the icon set
  Git: SiGit,
};

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-14 px-6 py-12 md:py-16">
      <div className="mx-auto w-full max-w-5xl">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Tech Stack</h2>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.category}>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                {group.category}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((name) => {
                  const Icon = ICONS[name];
                  return (
                    <li
                      key={name}
                      className="inline-flex items-center gap-2.5 rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-800 transition-colors duration-150 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-200 dark:hover:border-zinc-700"
                    >
                      <Icon className="h-4 w-4 text-zinc-400" aria-hidden="true" />
                      {name}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
