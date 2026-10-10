export default function CompactProjectCard({ project }) {
  return (
    <article className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-5 transition-colors duration-150 hover:border-zinc-300 dark:hover:border-zinc-700">
      <h2 className="text-base font-semibold leading-snug tracking-tight">{project.title}</h2>
      <p className="text-sm leading-relaxed text-text-muted">{project.summary}</p>
      <ul className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-md border border-border bg-surface-muted px-2 py-0.5 font-mono text-xs text-zinc-500 dark:text-zinc-400"
          >
            {tag}
          </li>
        ))}
      </ul>
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="w-fit text-sm font-medium transition-colors duration-150 hover:text-text-muted"
      >
        View Project ↗
      </a>
    </article>
  );
}
