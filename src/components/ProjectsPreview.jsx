import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { createSlug } from "@/lib/utils";
import { getProjects } from "@/lib/db";

export default async function ProjectsPreview() {
  try {
    // Call database function directly since this is a server component
    const projects = await getProjects();

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
