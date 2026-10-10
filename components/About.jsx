import { timeline } from "@/data/profile";

export default function About() {
  return (
    <section id="about" className="scroll-mt-14 px-6 py-12 md:py-16">
      <div className="mx-auto w-full max-w-5xl">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Experience & Education</h2>

        <div className="mt-10 flex flex-col gap-12">
          {timeline.map((group) => (
            <div key={group.heading}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                {group.heading}
              </h3>
              <ol className="mt-5 border-l border-border">
                {group.items.map((item) => (
                  <li key={item.title} className="relative pb-8 pl-6 last:pb-0">
                    <span className="absolute -left-[5px] top-[7px] h-[9px] w-[9px] rounded-full border border-border bg-background" />
                    <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                      <p className="font-medium">
                        {item.title}
                        {item.place && (
                          <span className="font-normal text-text-muted"> · {item.place}</span>
                        )}
                      </p>
                      <p className="shrink-0 font-mono text-xs tabular-nums text-text-muted">{item.period}</p>
                    </div>
                    <p className="text-sm text-text-muted">{item.role}</p>
                    {item.points && (
                      <ul className="mt-2 list-disc space-y-1 pl-4 text-sm leading-relaxed text-text-muted marker:text-border">
                        {item.points.map((pt) => (
                          <li key={pt}>{pt}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
