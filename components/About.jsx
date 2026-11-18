import { timeline } from "@/data/profile";

// Work and education sit side by side from lg up (each with its own timeline
// rail) and stack on smaller screens. Dates and places sit under the role so
// the eye stays in one column.
export default function About() {
  return (
    <section id="about" className="scroll-mt-14 px-6 py-8 md:py-16">
      <div className="mx-auto w-full max-w-5xl">
        <h2 className="text-section text-ink">Experience &amp; education</h2>

        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {timeline.map((group) => (
            <div key={group.heading}>
              <h3 className="text-caption font-medium uppercase tracking-wider text-ink-muted">
                {group.heading}
              </h3>
              <ol className="mt-5 border-l border-border">
                {group.items.map((item) => {
                  const meta = [item.period, item.place].filter(Boolean).join(" · ");
                  return (
                    <li key={item.title} className="relative pb-8 pl-6 last:pb-0">
                      <span
                        className="absolute -left-[5px] top-[7px] h-[9px] w-[9px] rounded-full border border-border-strong bg-surface-0"
                        aria-hidden="true"
                      />
                      <p className="font-semibold text-ink">{item.title}</p>
                      <p className="text-label font-normal text-ink-muted">{item.role}</p>
                      {meta && (
                        <p className="mt-1 text-caption tabular-nums text-ink-muted">{meta}</p>
                      )}
                      {item.points && (
                        <ul className="mt-2 list-disc space-y-1 pl-4 text-label font-normal text-ink-muted marker:text-border-strong">
                          {item.points.map((pt) => (
                            <li key={pt}>{pt}</li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
