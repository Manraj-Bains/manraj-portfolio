import MyHeroSection from "@/components/MyHeroSection";
import ProjectsPreview from "@/components/ProjectsPreview";
import GithubCalendar from "@/components/github-calendar";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl space-y-12 px-4 py-10">
        {/* Hero */}
        <section>
          <MyHeroSection />
        </section>

        {/* Project highlights */}
        <section aria-labelledby="projects-heading">
          <div className="mb-4 flex items-center justify-between">
            <h2
              id="projects-heading"
              className="text-xl font-semibold tracking-tight"
            >
              Project highlights
            </h2>
          </div>
          <ProjectsPreview />
        </section>

        {/* GitHub calendar */}
        <section aria-labelledby="github-heading">
          <h2
            id="github-heading"
            className="mb-4 text-xl font-semibold tracking-tight"
          >
            GitHub activity
          </h2>
          <GithubCalendar />
        </section>
      </div>
    </main>
  );
}