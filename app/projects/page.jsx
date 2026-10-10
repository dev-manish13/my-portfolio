import ProjectsGrid from "@/components/ProjectsGrid";

export const metadata = {
  title: "Projects",
  description:
    "Full-stack web applications, REST APIs and Python automation projects by Manish Kandel.",
};

export default function ProjectsPage() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12 md:py-16">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl dark:text-zinc-100">Projects</h1>
        <p className="mb-8 mt-3 max-w-xl text-text-muted">
          Full-stack systems and automation scripts that solve specific, real problems.
        </p>
        <ProjectsGrid />
      </div>
    </section>
  );
}
