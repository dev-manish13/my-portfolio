export const H2 = ({ children }) => (
  <h2 className="mb-3 mt-12 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{children}</h2>
);
export const P = ({ children }) => <p className="mb-5 leading-7 text-text-muted">{children}</p>;
export const Code = ({ children }) => (
  <code className="rounded bg-surface-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
    {children}
  </code>
);
export const Pre = ({ lang, children }) => (
  <figure className="mb-6">
    <pre className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950 p-4 font-mono text-[13px] leading-6 text-zinc-200">
      <code>{children}</code>
    </pre>
    {lang && <figcaption className="mt-1.5 font-mono text-xs text-text-muted">{lang}</figcaption>}
  </figure>
);

