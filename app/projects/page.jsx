import ProjectsGrid from "@/components/ProjectsGrid";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Full-stack web applications, REST APIs and Python automation projects by Manish Kandel.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
      <div>
        <h1 className="text-display-lg text-ink">Projects</h1>
        <p className="mb-8 mt-4 max-w-xl text-body text-ink-muted">
          Full-stack systems and automation scripts that solve specific, real problems.
        </p>
        <ProjectsGrid />
      </div>
    </section>
  );
}
