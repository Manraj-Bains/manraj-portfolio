import { Card } from "@/components/ui/card";

const FALLBACK = {
  avatar: "",
  full_name: "Hi, I'm Manraj.",
  short_description:
    "A full-stack developer focused on clean UI, fast performance, and practical, real-world projects.",
  long_description: "",
};

function getBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.AUTH0_BASE_URL ||
    process.env.APP_BASE_URL ||
    "http://localhost:3000"
  );
}

export default async function HeroSection() {
  let hero = FALLBACK;
  try {
    const res = await fetch(new URL("/api/hero", getBaseUrl()), {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.hero) {
        hero = {
          avatar: data.hero.avatar || "",
          full_name: data.hero.full_name || FALLBACK.full_name,
          short_description:
            data.hero.short_description || FALLBACK.short_description,
          long_description: data.hero.long_description || "",
        };
      }
    }
  } catch (e) {
    // swallow; fallback will render
  }

  return (
    <section className="mx-auto mt-10 max-w-5xl px-4">
      <Card className="flex flex-col gap-6 px-6 py-8 md:flex-row md:items-center">
        {/* Left: Text */}
        <div className="flex-1">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Portfolio
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            {hero.full_name}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            {hero.short_description}
          </p>
          {hero.long_description ? (
            <p className="mt-2 text-sm text-muted-foreground md:text-base">
              {hero.long_description}
            </p>
          ) : null}
        </div>

        {/* Right: Avatar */}
        <div className="flex w-full flex-1 justify-center md:justify-end">
          {hero.avatar ? (
            <img
              src={hero.avatar}
              alt={hero.full_name || "Avatar"}
              className="h-28 w-28 rounded-full object-cover border border-muted-foreground/40"
            />
          ) : (
            <div className="h-28 w-28 rounded-full border border-dashed border-muted-foreground/40 bg-muted" />
          )}
        </div>
      </Card>
    </section>
  );
}
