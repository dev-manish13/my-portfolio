export const H2 = ({ children }) => (
  <h2 className="mb-3 mt-12 text-card-title text-ink">{children}</h2>
);
export const P = ({ children }) => <p className="mb-5 text-body text-ink-muted">{children}</p>;
export const Code = ({ children }) => (
  <code className="rounded-sm bg-surface-100 px-1.5 py-0.5 font-mono text-[0.85em] text-ink">
    {children}
  </code>
);
export const Pre = ({ lang, children }) => (
  <figure className="mb-6">
    <pre className="overflow-x-auto rounded-lg bg-surface-100 p-4 font-mono text-[13px] leading-6 text-ink">
      <code>{children}</code>
    </pre>
    {lang && <figcaption className="mt-1.5 text-caption text-ink-muted">{lang}</figcaption>}
  </figure>
);

