import MyHeroSection from "@/components/MyHeroSection";
import ProjectsPreview from "@/components/ProjectsPreview";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <MyHeroSection />
      <ProjectsPreview />
    </main>
  );
}