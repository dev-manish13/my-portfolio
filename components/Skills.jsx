import TechLogo from "@/components/icons/TechLogo";
import { skillGroups } from "@/data/profile";

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-14 px-6 py-8 md:py-16">
      <div className="mx-auto w-full max-w-5xl">
        <h2 className="text-section text-ink">Tech stack</h2>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.category}>
              <h3 className="mb-3 text-caption font-medium uppercase tracking-wider text-ink-muted">
                {group.category}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((name) => (
                  <li
                    key={name}
                    className="inline-flex items-center gap-2 rounded-item border border-border bg-surface-100 py-2 pl-3 pr-4 text-label text-ink"
                  >
                    <TechLogo name={name} className="shrink-0 text-ink-muted" />
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
