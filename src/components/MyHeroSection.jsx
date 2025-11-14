import { Card } from "@/components/ui/card";

export default function HeroSection() {
  return (
    <section className="mx-auto mt-10 max-w-5xl px-4">
      <Card className="flex flex-col gap-6 px-6 py-8 md:flex-row md:items-center">
        {/* Left: Text */}
        <div className="flex-1">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Portfolio
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            Hi, I&apos;m <span className="text-primary">Manraj</span>.
          </h1>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            A full-stack developer focused on clean UI, fast performance,
            and practical, real-world projects.
          </p>
        </div>

        {/* Right: Placeholder / Avatar */}
        <div className="flex w-full flex-1 justify-center md:justify-end">
          <div className="h-28 w-28 rounded-full border border-dashed border-muted-foreground/40 bg-muted" />
        </div>
      </Card>
    </section>
  );
}
