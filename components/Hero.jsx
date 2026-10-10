import Link from "next/link";
import { MapPin } from "lucide-react";
import Avatar from "@/components/Avatar";
import CompactProjectCard from "@/components/CompactProjectCard";
import projects from "@/data/projects.json";
import { profile } from "@/data/profile";

export default function Hero() {
  return (
    <section id="home" className="px-6 pb-16 pt-16 sm:pt-24">
      <div className="mx-auto grid w-full max-w-5xl items-center gap-12 lg:grid-cols-2">
        <div className="flex flex-col items-start gap-6">
          <div className="flex items-center gap-4">
            <Avatar size={56} />
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-text-muted">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-zinc-400" aria-hidden="true" />
                {profile.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 motion-safe:animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Available for work
              </span>
            </div>
          </div>

          <h1 className="text-5xl font-semibold leading-[1.05] tracking-tighter sm:text-6xl">
            {profile.name}
          </h1>

          <p className="max-w-md text-lg leading-relaxed text-text-muted">{profile.bio}</p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              View Projects ↗
            </Link>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors duration-150 hover:bg-surface-muted"
            >
              Resume ↗
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Featured Projects</p>
          {projects.map((project) => (
            <CompactProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
