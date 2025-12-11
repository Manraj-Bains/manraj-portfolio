import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { createSlug } from "@/lib/utils";

function getBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.AUTH0_BASE_URL ||
    process.env.APP_BASE_URL ||
    "http://localhost:3000"
  );
}

export default async function ProjectsPreview() {
  try {
    const res = await fetch(new URL("/api/projects", getBaseUrl()), {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Projects API failed: ${res.status}`);
    }
    const data = await res.json();
    const projects = data.projects || [];

    return (
      <section className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Project highlights</h2>

          <Button asChild variant="outline" size="sm">
            <Link href="/projects">View all projects</Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((p) => {
            const slug = createSlug(p.title);

            return (
              <Card key={slug} className="p-4 flex flex-col gap-3">
                <Image
                  src={p.image}
                  alt={p.title}
                  width={300}
                  height={300}
                  className="h-40 w-full rounded-md object-cover"
                />

                <h3 className="text-sm font-semibold">{p.title}</h3>

                <p className="text-xs text-muted-foreground line-clamp-2">
                  {p.description}
                </p>

                <Button asChild size="sm" className="mt-auto">
                  <Link href={`/projects/${p.id}`}>View project</Link>
                </Button>
              </Card>
            );
          })}
          {projects.length === 0 && (
            <p className="text-sm text-muted-foreground col-span-full">
              No projects found.
            </p>
          )}
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error loading projects:", error);
    return (
      <section className="mx-auto max-w-5xl px-4 py-8">
        <p className="text-muted-foreground">Unable to load projects at this time.</p>
      </section>
    );
  }
}
