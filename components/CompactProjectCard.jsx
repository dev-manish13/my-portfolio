import { ArrowUpRight } from "lucide-react";

// Whole card is clickable (stretched link). Below lg it collapses to a compact
// row: title, a one-line summary and an arrow, so the hero stays short on phones
// and the sections below are one scroll away. Tags and the text link return at lg.
export default function CompactProjectCard({ project }) {
  return (
    <article className="card card-link relative flex flex-col gap-1 p-4 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-focus lg:gap-3 lg:p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-body font-semibold text-ink lg:text-card-title">{project.title}</h3>
        <ArrowUpRight size={20} className="mt-0.5 shrink-0 text-ink-muted lg:hidden" aria-hidden="true" />
      </div>
      <p className="line-clamp-1 text-label font-normal text-ink-muted lg:line-clamp-none">
        {project.summary}
      </p>
      <ul className="hidden flex-wrap gap-1.5 lg:flex">
        {project.tags.map((tag) => (
          <li key={tag} className="tag">
            {tag}
          </li>
        ))}
      </ul>
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="link w-fit text-label outline-none after:absolute after:inset-0 after:rounded-[inherit]"
      >
        <span className="max-lg:sr-only">View project</span>
        <ArrowUpRight size={16} className="max-lg:hidden" aria-hidden="true" />
        <span className="sr-only">: {project.title} on GitHub (opens in a new tab)</span>
      </a>
    </article>
  );
}
