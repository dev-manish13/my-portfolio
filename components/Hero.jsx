import Link from "next/link";
import { MapPin, FileText } from "lucide-react";
import Avatar from "@/components/Avatar";
import CompactProjectCard from "@/components/CompactProjectCard";
import projects from "@/data/projects.json";
import { profile } from "@/data/profile";

export default function Hero() {
  return (
    <section id="home" className="px-6 pb-8 pt-16 sm:pt-24 md:pb-16">
      <div className="mx-auto grid w-full max-w-5xl items-center gap-12 lg:grid-cols-2">
        <div className="flex flex-col items-start gap-6">
          <div className="flex items-center gap-4">
            <Avatar size={56} />
            {/* Stacked, like a profile header: each line starts with a 16px marker so the text aligns. */}
            <div className="flex flex-col gap-1 text-label font-normal text-ink-muted">
              <span className="inline-flex items-center gap-2">
                <MapPin size={16} aria-hidden="true" />
                {profile.location}
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="flex h-4 w-4 items-center justify-center" aria-hidden="true">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-live opacity-60 motion-safe:animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-live" />
                  </span>
                </span>
                Available for work
              </span>
            </div>
          </div>

          <h1 className="hero-name text-display-xl text-ink">
            {profile.name}
          </h1>

          <p className="max-w-md text-body text-ink-muted sm:text-lg sm:leading-7">{profile.bio}</p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/projects"
              className="btn-primary"
            >
              View projects
            </Link>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <FileText size={16} aria-hidden="true" />
              Resume
              <span className="sr-only">(PDF, opens in a new tab)</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:gap-4">
          <h2 className="text-caption font-medium uppercase tracking-wider text-ink-muted">Featured projects</h2>
          {projects.map((project) => (
            <CompactProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
