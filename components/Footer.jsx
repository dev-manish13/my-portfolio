import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-surface-border px-6 py-5">
      <div className="lowercase mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-3 font-mono text-xs text-text-muted sm:flex-row sm:gap-6">
        <span className="flex flex-nowrap items-center gap-2 whitespace-nowrap">
          <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
          All systems operational. Latency: 12ms
          <span className="text-surface-border" aria-hidden="true">
            |
          </span>
          © {new Date().getFullYear()} {profile.name}
        </span>

        <p className="flex items-center gap-1.5 whitespace-nowrap">
          Press <kbd className="rounded border border-surface-border px-1.5 py-0.5">⌘</kbd>{" "}
          <kbd className="rounded border border-surface-border px-1.5 py-0.5">K</kbd> to open the
          command palette
        </p>
      </div>
    </footer>
  );
}
